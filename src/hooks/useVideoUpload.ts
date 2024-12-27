import { useState, useCallback } from 'react';
import { useToast } from './use-toast';
import { uploadVideo } from '@/lib/storage/video-upload';
import { validateVideoFile } from '@/lib/upload/validators';
import type { UploadProgress } from '@/lib/upload/progress';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { startVideoProcessing } from '@/lib/ffmpeg/background-processor';

interface UploadOptions {
  file: File;
  metadata?: {
    title: string;
    description?: string;
    tags?: string[];
  };
  onProgress?: (progress: UploadProgress) => void;
}

export function useVideoUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const upload = useCallback(async ({ 
    file, 
    metadata,
    onProgress 
  }: UploadOptions): Promise<string | null> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to upload videos",
        variant: "destructive"
      });
      return null;
    }

    const validation = validateVideoFile(file);
    if (!validation.valid) {
      toast({
        title: "Invalid file",
        description: validation.error,
        variant: "destructive"
      });
      return null;
    }

    setIsUploading(true);
    try {
      // Upload video file first
      const { url: videoUrl, path: videoPath } = await uploadVideo({
        file,
        folder: 'videos' as keyof typeof STORAGE_PATHS,
        onProgress
      });

      // Create initial video record
      const { data: video, error } = await supabase
        .from('videos')
        .insert({
          user_id: user.id, 
          title: metadata?.title || file.name, 
          description: metadata?.description, 
          tags: metadata?.tags || [], 
          video_url: videoUrl, 
          status: 'Draft', 
          processing_status: 'pending', 
          author: user.email || 'Unknown User', 
          date: new Date().toISOString(), 
          duration: '0:00' // Will be updated during processing
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to save video: ${error.message}`);
      }

      // Start background processing
      startVideoProcessing(file, video.id);
      
      toast({
        title: "Upload successful",
        description: "Your video is being processed. You'll be notified when it's ready."
      });

      return videoUrl;
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [toast, user]);

  return {
    upload,
    isUploading
  };
}