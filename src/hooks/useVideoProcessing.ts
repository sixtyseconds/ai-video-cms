import { useState } from 'react';
import { useToast } from './use-toast';
import { generateThumbnail } from '@/lib/ffmpeg/processors';
import { uploadVideo } from '@/lib/storage/video-upload';

interface ProcessingResult {
  thumbnail: {
    url: string;
    path: string;
  };
}

export function useVideoProcessing() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const processVideo = async (file: File): Promise<ProcessingResult> => {
    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Generate thumbnail
      setProgress(50);
      const thumbnailBlob = await generateThumbnail(file);
      const thumbnailFile = new File([thumbnailBlob], 'thumbnail.jpg', { type: 'image/jpeg' });
      const { url: thumbnailUrl, path: thumbnailPath } = await uploadVideo({
        file: thumbnailFile,
        folder: 'thumbnails',
        onProgress: (p) => setProgress(50 + (p.percentage * 0.5))
      });

      setProgress(100);
      
      return {
        thumbnail: { url: thumbnailUrl, path: thumbnailPath }
      };
    } catch (error) {
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "An error occurred during processing",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processVideo,
    isProcessing,
    progress
  };
}