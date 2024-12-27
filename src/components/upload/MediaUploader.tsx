import { useState } from 'react';
import { FileUploader } from './FileUploader';
import { UploadProgress } from './UploadProgress';
import { useVideoUpload } from '@/hooks/useVideoUpload';
import { validateVideoFile } from '@/lib/upload/validators';

export function MediaUploader({ onUploadComplete }: { onUploadComplete: (url: string) => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { uploadVideo } = useVideoUpload();

  const handleFileSelect = async (file: File) => {
    const validation = validateVideoFile(file);
    if (!validation.valid) {
      // Handle validation error
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadVideo({
        file,
        filename: `${Date.now()}-${file.name}`,
        onProgress: (progress) => setUploadProgress(progress)
      });
      
      if (url) {
        onUploadComplete(url);
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="relative">
      <FileUploader 
        onFileSelect={handleFileSelect}
        isUploading={isUploading}
        accept="video/*"
        maxSize={500 * 1024 * 1024} // 500MB
      />
      
      {isUploading && (
        <UploadProgress 
          progress={uploadProgress}
          onCancel={() => setIsUploading(false)}
        />
      )}
    </div>
  );
}