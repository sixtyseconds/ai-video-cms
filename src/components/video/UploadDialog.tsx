import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoUploader } from './VideoUploader';
import { VideoProcessingStatus } from './VideoProcessingStatus';
import { useVideoProcessing } from '@/hooks/useVideoProcessing';

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
  const [activeTab, setActiveTab] = useState('upload');
  const { status, progress, startProcessing } = useVideoProcessing();

  const handleFileSelected = async (file: File) => {
    setActiveTab('processing');
    await startProcessing(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Video</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-4">
            <VideoUploader onFileSelected={handleFileSelected} />
          </TabsContent>

          <TabsContent value="processing" className="mt-4">
            <VideoProcessingStatus 
              status={status} 
              progress={progress} 
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}