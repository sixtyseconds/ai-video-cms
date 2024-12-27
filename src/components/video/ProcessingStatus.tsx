import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVideoRestart } from '@/hooks/useVideoRestart';
import type { Video } from '@/types/video';

interface ProcessingStatusProps {
  video: Video;
}

export function ProcessingStatus({ video }: ProcessingStatusProps) {
  const restart = useVideoRestart();

  const handleRestart = () => {
    if (video.processing_status === 'pending') {
      // For pending videos, just reset the status
      restart.mutate({ id: video.id });
    } else {
      // For other states, try to restart with original file if available
      restart.mutate({ 
        id: video.id,
        videoUrl: video.video_url 
      });
    }
  };

  const renderContent = () => {
    if (video.processing_status === 'error') {
      return (
        <>
          <AlertCircle className="w-8 h-8 text-red-500" />
          <div className="text-center">
            <span className="text-sm font-medium text-white block mb-1">
              Processing Failed
            </span>
            <span className="text-xs text-red-400 block mb-3">
              {video.processing_error || 'An error occurred during processing'}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 hover:bg-white/20"
              onClick={handleRestart}
              disabled={restart.isPending}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {restart.isPending ? 'Restarting...' : 'Restart Processing'}
            </Button>
          </div>
        </>
      );
    }

    if (video.processing_status === 'pending') {
      return (
        <>
          <AlertCircle className="w-8 h-8 text-yellow-500" />
          <div className="text-center">
            <span className="text-sm font-medium text-white block mb-1">
              Processing Stuck
            </span>
            <span className="text-xs text-red-400 block mb-3">
              Processing appears to be stuck. Click below to try again.
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 hover:bg-white/20"
              onClick={handleRestart}
              disabled={restart.isPending}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {restart.isPending ? 'Restarting...' : 'Try Again'}
            </Button>
          </div>
        </>
      );
    }

    const statusMessages = {
      'generating_thumbnail': 'Generating Thumbnail...',
      'pending': 'Preparing Processing...'
    };

    return (
      <>
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <div className="text-center">
          <span className="text-sm font-medium text-white block">
            {statusMessages[video.processing_status as keyof typeof statusMessages]}
          </span>
          {video.processing_step && (
            <span className="text-xs text-gray-300 block mt-1">
              {video.processing_step}
            </span>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="flex flex-col items-center gap-3 p-4">
        {renderContent()}
      </div>
    </div>
  );
}