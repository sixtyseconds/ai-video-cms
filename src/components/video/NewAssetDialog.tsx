import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoUploader } from './VideoUploader';
import { VideoMetadataForm } from './upload/VideoMetadataForm';
import { cn } from '@/lib/utils';

interface NewAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewAssetDialog({ open, onOpenChange }: NewAssetDialogProps) {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>();

  const handleUploadComplete = (url: string) => {
    setUploadedVideoUrl(url);
    setActiveTab('metadata');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 bg-[#13151A] border-white/10">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-white">
            New Asset
          </DialogTitle>
        </DialogHeader>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mt-6"
        >
          <div className="px-6">
            <TabsList className="w-full bg-[#1A1D23] p-1 rounded-lg">
              <TabsTrigger 
                value="upload" 
                disabled={activeTab === 'metadata'}
                className={cn(
                  "w-full rounded-md py-3 text-sm font-medium ring-offset-[#13151A]",
                  "transition-all duration-200",
                  "data-[state=active]:bg-blue-600 data-[state=active]:text-white",
                  "data-[state=inactive]:text-neutral-300 data-[state=inactive]:hover:bg-white/5 data-[state=inactive]:hover:text-white",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                Upload
              </TabsTrigger>
              <TabsTrigger 
                value="metadata" 
                disabled={!uploadedVideoUrl}
                className={cn(
                  "w-full rounded-md py-3 text-sm font-medium ring-offset-[#13151A]",
                  "transition-all duration-200",
                  "data-[state=active]:bg-blue-600 data-[state=active]:text-white",
                  "data-[state=inactive]:text-neutral-300 data-[state=inactive]:hover:bg-white/5 data-[state=inactive]:hover:text-white",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                Details
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent 
            value="upload" 
            className="mt-6 mx-6 mb-6 focus-visible:outline-none focus-visible:ring-0"
          >
            <div className="rounded-lg border border-white/10 bg-[#1A1D23] p-1">
              <VideoUploader onUploadComplete={handleUploadComplete} />
            </div>
          </TabsContent>

          <TabsContent 
            value="metadata" 
            className="mt-6 focus-visible:outline-none focus-visible:ring-0"
          >
            <div className="border-t border-white/10 bg-[#1A1D23] p-6">
              <VideoMetadataForm 
                videoUrl={uploadedVideoUrl!}
                onComplete={() => onOpenChange(false)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}