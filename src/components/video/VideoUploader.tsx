import { useCallback, useState } from 'react';
import { VideoDropzone } from './upload/VideoDropzone';
import { UploadProgress } from './upload/UploadProgress';
import { useVideoUpload } from '@/hooks/useVideoUpload';
import { useToast } from '@/hooks/use-toast';

interface VideoMetadata {
  title: string;
  description?: string;
  tags?: string[];
}

interface VideoUploaderProps {
  metadata?: VideoMetadata;
  onUploadComplete?: (url: string) => void;
}

export function VideoUploader({ metadata, onUploadComplete }: VideoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { upload } = useVideoUpload();
  const { toast } = useToast();

  const handleFileSelect = useCallback(async (file: File) => {
    setIsUploading(true);
    try {
      const url = await upload({
        file,
        metadata,
        onProgress: (progressData) => {
          setProgress(progressData.percentage);
        }
      });
      
      if (url && onUploadComplete) {
        onUploadComplete(url);
        toast({
          title: "Upload complete",
          description: "Your video is now processing. You'll be notified when it's ready."
        });
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred during upload",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  }, [upload, metadata, onUploadComplete, toast]);

  return (
    <div className="relative">
      <VideoDropzone 
        onFileSelect={handleFileSelect}
        isUploading={isUploading}
      />
      
      {isUploading && (
        <UploadProgress 
          progress={progress}
          onCancel={() => setIsUploading(false)}
        />
      )}
    </div>
  );
}