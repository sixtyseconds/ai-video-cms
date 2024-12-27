import { getFFmpeg } from './client';
import { fetchFile } from '@ffmpeg/util';
import { VideoProcessingError } from '../types/errors';

const PROCESSING_TIMEOUT = 30000; // 30 seconds timeout

export async function generateThumbnail(videoFile: File, timeInSeconds: number = 3): Promise<Blob> {
  const ffmpeg = await getFFmpeg();
  
  try {
    // Write input file
    await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));
    
    // Generate thumbnail
    await Promise.race([
      ffmpeg.exec([
        '-i', 'input.mp4',
        '-ss', timeInSeconds.toString(),
        '-vframes', '1',
        '-q:v', '2',
        'output.jpg'
      ]),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Thumbnail generation timed out')), PROCESSING_TIMEOUT)
      )
    ]);
    
    // Read output file
    const data = await ffmpeg.readFile('output.jpg');
    
    return new Blob([data], { type: 'image/jpeg' });
  } catch (error) {
    throw new VideoProcessingError(
      'Failed to generate thumbnail: ' + (error instanceof Error ? error.message : 'Unknown error')
    );
  } finally {
    // Cleanup
    try {
      await ffmpeg.deleteFile('input.mp4');
      await ffmpeg.deleteFile('output.jpg');
    } catch {
      // Ignore cleanup errors
    }
  }
}