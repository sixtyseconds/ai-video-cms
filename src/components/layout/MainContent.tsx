import { useState } from 'react';
import { VideoGrid } from '@/components/video/VideoGrid';
import { VideoDetails } from '@/components/video/VideoDetails';
import { UploadDialog } from '@/components/video/UploadDialog';
import { ActiveFiltersBar } from '@/components/layout/ActiveFiltersBar';
import { useVideos } from '@/hooks/useVideos';
import { placeholderVideos } from '@/lib/mock-data';

export function MainContent() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { videos, isLoading } = useVideos();

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId === selectedVideo ? null : videoId);
  };

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  // Use placeholder videos if no videos are loaded
  const displayVideos = (videos && videos.length > 0) ? videos : placeholderVideos;

  // Find the selected video
  const selectedVideoData = selectedVideo 
    ? displayVideos.find(v => v.id === selectedVideo)
    : null;

  return (
    <div className="flex-1 overflow-hidden">
      <ActiveFiltersBar 
        filters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearFilters}
      />
      
      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-neutral-400">Loading videos...</div>
          </div>
        ) : (
          <div className="flex gap-6">
            <div className={`flex-1 transition-all ${selectedVideo ? 'w-2/3' : 'w-full'}`}>
              <VideoGrid 
                videos={displayVideos}
                selectedId={selectedVideo}
                onVideoSelect={handleVideoSelect}
              />
            </div>
            
            {selectedVideoData && (
              <div className="w-1/3">
                <VideoDetails video={selectedVideoData} />
              </div>
            )}
          </div>
        )}
      </div>

      <UploadDialog 
        open={showUploadDialog} 
        onOpenChange={setShowUploadDialog} 
      />
    </div>
  );
}