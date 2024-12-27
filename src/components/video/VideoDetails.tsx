import { useState } from 'react';
import { VideoDetailsHeader } from './details/VideoDetailsHeader';
import { VideoMetadataSection } from './details/VideoMetadataSection';
import { VideoTagsSection } from './details/VideoTagsSection';
import { VideoActionButtons } from './details/VideoActionButtons';
import { DeleteVideoDialog } from './DeleteVideoDialog';
import { useVideoDelete } from '@/hooks/useVideoDelete';

interface VideoDetailsProps {
  video: {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    duration: string;
    tags: string[];
    video_url?: string;
    audio_file_url?: string;
    thumbnail_url?: string;
  };
}

export function VideoDetails({ video }: VideoDetailsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteVideo = useVideoDelete();

  if (!video) {
    return null;
  }

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
    <div className="h-full flex flex-col bg-[#13151A] border-l border-white/10">
      <VideoDetailsHeader 
        title={video.title} 
        onDeleteClick={() => setShowDeleteDialog(true)} 
      />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <VideoMetadataSection
            title={video.title}
            description={video.description || 'No description available'}
            duration={video.duration || '0:00'}
            createdAt={video.createdAt}
          />
          
          <VideoTagsSection tags={video.tags || []} />
        </div>
      </div>

      <div className="p-4 border-t border-white/10">
        <VideoActionButtons />
      </div>
      
      <DeleteVideoDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        videoTitle={video.title}
      />
    </div>
  );
}