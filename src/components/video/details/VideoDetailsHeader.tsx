import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Trash2 } from 'lucide-react';

interface VideoDetailsHeaderProps {
  title: string;
  onDeleteClick: () => void;
}

export function VideoDetailsHeader({ title, onDeleteClick }: VideoDetailsHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10">
      <h2 className="text-lg font-semibold text-white">Details</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-white/10"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end"
          className="w-48 bg-[#1A1D23] border-white/10"
        >
          <DropdownMenuItem
            className="text-red-400 focus:text-red-400 focus:bg-red-400/10"
            onClick={onDeleteClick}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}