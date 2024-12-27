import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface VideoProcessingStatusProps {
  status: 'processing' | 'complete' | 'error';
  progress?: number;
  errorMessage?: string;
}

export function VideoProcessingStatus({ 
  status, 
  progress = 0, 
  errorMessage 
}: VideoProcessingStatusProps) {
  const statusConfig = {
    processing: {
      icon: Clock,
      text: 'Processing video...',
      color: 'text-yellow-500'
    },
    complete: {
      icon: CheckCircle,
      text: 'Processing complete',
      color: 'text-green-500'
    },
    error: {
      icon: AlertCircle,
      text: errorMessage || 'Processing failed',
      color: 'text-red-500'
    }
  };

  const { icon: Icon, text, color } = statusConfig[status];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-sm font-medium">{text}</span>
      </div>
      
      {status === 'processing' && (
        <div className="space-y-1">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-neutral-400">
            <span>Processing video</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}
    </div>
  );
}