import { VideoCard } from './VideoCard';
import { useUI } from '@/contexts/UIContext';
import { cn } from '@/lib/utils';
import type { Video } from '@/types/video';

interface VideoGridProps {
  videos: Video[];
  selectedId: string | null;
  onVideoSelect: (id: string) => void;
}

export function VideoGrid({ videos, selectedId, onVideoSelect }: VideoGridProps) {
  const { viewMode } = useUI();
  
  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-400">No videos found</div>
      </div>
    );
  }
  
  return (
    <div className={cn(
      viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
        : 'space-y-2'
    )}>
      {videos.map((video) => (
        <VideoCard 
          key={video.id} 
          video={video}
          selected={video.id === selectedId}
          onClick={() => onVideoSelect(video.id)}
        />
      ))}
    </div>
  );
}