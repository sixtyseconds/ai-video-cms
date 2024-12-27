import { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UPLOAD_CONFIG } from '@/lib/config/upload';

interface VideoDropzoneProps {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
}

export function VideoDropzone({ onFileSelect, isUploading }: VideoDropzoneProps) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="relative p-8 border-2 border-dashed rounded-lg border-white/10 hover:border-white/20 transition-colors"
    >
      <input
        type="file"
        accept={UPLOAD_CONFIG.VIDEO.ALLOWED_TYPES.join(',')}
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isUploading}
      />
      
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="p-4 rounded-full bg-blue-500/10">
          <Upload className="w-8 h-8 text-blue-500" />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white">
            {isUploading ? 'Uploading...' : 'Drop your video here'}
          </h3>
          <p className="text-sm text-neutral-400 mt-1">
            or click to browse your files
          </p>
          <p className="text-xs text-neutral-400 mt-2">
            Maximum file size: {UPLOAD_CONFIG.VIDEO.MAX_SIZE / (1024 * 1024)}MB
          </p>
        </div>

        <Button 
          variant="outline" 
          className="mt-2 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white"
          disabled={isUploading}
        >
          Select Video
        </Button>
      </div>
    </div>
  );
}