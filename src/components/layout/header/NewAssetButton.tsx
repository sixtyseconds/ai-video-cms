import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewAssetDialog } from '@/components/video/NewAssetDialog';

export function NewAssetButton() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button 
        className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white group"
        onClick={() => setShowDialog(true)}
      >
        <Plus className="w-4 h-4 mr-2 transition-colors group-hover:text-white" />
        New Asset
      </Button>

      <NewAssetDialog 
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
}