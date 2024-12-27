import { X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface UploadProgressProps {
  progress: number;
  onCancel: () => void;
}

export function UploadProgress({ progress, onCancel }: UploadProgressProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
      <div className="w-64 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">
            Uploading video...
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-neutral-400 hover:text-white"
            onClick={onCancel}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <span className="text-xs text-neutral-400 mt-2 block">
          {Math.round(progress)}% complete
        </span>
      </div>
    </div>
  );
}