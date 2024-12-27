import { supabase } from '../supabase';
import { generateThumbnail } from './processors';
import { uploadVideo } from '../storage/video-upload';
import { VideoProcessingError } from '../types/errors';

const PROCESSING_TIMEOUT = 10 * 60 * 1000; // 10 minutes

export async function startVideoProcessing(file: File, videoId: string) {
  const startTime = Date.now();
  
  // Check if video is already being processed
  const { data: existingVideo } = await supabase
    .from('videos')
    .select('processing_status, processing_started_at')
    .eq('id', videoId)
    .single();

  if (existingVideo?.processing_status === 'pending' && existingVideo.processing_started_at) {
    const startedAt = new Date(existingVideo.processing_started_at).getTime();
    if (Date.now() - startedAt > PROCESSING_TIMEOUT) {
      await supabase
        .from('videos')
        .update({
          processing_status: 'error',
          processing_error: 'Processing timed out - please try again',
          processing_step: null
        })
        .eq('id', videoId);
    }
    return;
  }

  try {
    // Update status to processing
    await supabase
      .from('videos')
      .update({ 
        processing_status: 'generating_thumbnail',
        processing_started_at: new Date().toISOString(),
        processing_step: 'Generating thumbnail...',
        processing_error: null
      })
      .eq('id', videoId);

    // Generate and upload thumbnail
    let thumbnailUrl;
    try {
      const thumbnailBlob = await generateThumbnail(file);
      const thumbnailFile = new File([thumbnailBlob], 'thumbnail.jpg', { type: 'image/jpeg' });
      const result = await uploadVideo({
        file: thumbnailFile,
        folder: 'thumbnails'
      });
      thumbnailUrl = result.url;
    } catch (error) {
      throw new VideoProcessingError(
        'Failed to generate thumbnail: ' + (error instanceof Error ? error.message : 'Unknown error')
      );
    }

    // Update video record with thumbnail
    const { error: updateError } = await supabase
      .from('videos')
      .update({
        thumbnail_url: thumbnailUrl,
        processing_status: 'completed',
        processing_step: null,
        processing_completed_at: new Date().toISOString()
      })
      .eq('id', videoId);

    if (updateError) {
      throw new VideoProcessingError('Failed to update video with thumbnail');
    }
  } catch (error) {
    console.error('Video processing failed:', error);
    
    await supabase
      .from('videos')
      .update({
        processing_status: 'error',
        processing_step: null,
        processing_error: error instanceof Error ? error.message : 'Unknown error occurred'
      })
      .eq('id', videoId);
  }
}