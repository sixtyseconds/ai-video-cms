import { Share2, Lock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function VideoActionButtons() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button
        variant="outline"
        className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
      <Button
        variant="outline"
        className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white"
      >
        <Lock className="w-4 h-4 mr-2" />
        Permissions
      </Button>
      <Button
        variant="outline"
        className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Comments
      </Button>
    </div>
  );
}