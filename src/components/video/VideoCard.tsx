import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { VideoThumbnail } from './VideoThumbnail';
import { VideoMetadata } from './VideoMetadata';
import { ProcessingStatus } from './ProcessingStatus';
import { Checkbox } from '@/components/ui/checkbox';
import { DeleteVideoDialog } from './DeleteVideoDialog';
import { useVideoDelete } from '@/hooks/useVideoDelete';
import { cn } from '@/lib/utils';
import type { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
  selected?: boolean;
  onClick?: () => void;
}

export function VideoCard({ video, selected, onClick }: VideoCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteVideo = useVideoDelete();

  const handleDelete = async () => {
    try {
      await deleteVideo.mutateAsync({
        id: video.id,
        files: {
          videoPath: video.video_url,
          audioPath: video.audio_file_url,
          thumbnailPath: video.thumbnail_url
        }
      });
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Failed to delete video:', error);
    }
  };

  return (
    <>
      <div 
        className={cn(
          "group relative bg-[#13151A] rounded-lg overflow-hidden border transition-colors cursor-pointer",
          selected 
            ? "border-blue-500" 
            : "border-[#2A2F38] hover:border-[#3B4048]"
        )}
        onClick={onClick}
      >
        {video.processing_status && video.processing_status !== 'completed' && (
          <ProcessingStatus video={video} />
        )}
        
        <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <Checkbox 
            checked={selected}
            className="bg-black/50 border-white/50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
          />
        </div>
        
        <VideoThumbnail
          src={video.thumbnail_url || video.thumbnail}
          alt={video.title}
          duration={video.duration}
        />
        
        <VideoMetadata
          title={video.title}
          author={video.author}
          date={video.date}
          status={video.status}
          onDeleteClick={(e) => {
            e.stopPropagation();
            setShowDeleteDialog(true);
          }}
        />
      </div>

      <DeleteVideoDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        videoTitle={video.title}
      />
    </>
  );
}