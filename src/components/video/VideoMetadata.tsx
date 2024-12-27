import { MoreVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface VideoMetadataProps {
  title: string;
  author: string;
  date: string;
  status: string;
  onDeleteClick: (e: React.MouseEvent) => void;
}

export function VideoMetadata({ 
  title, 
  author, 
  date, 
  status,
  onDeleteClick 
}: VideoMetadataProps) {
  return (
    <div className="p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-medium text-sm text-white">{title}</h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
            <span>{author}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-white/10"
            >
              <MoreVertical className="w-4 h-4" />
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
      
      <div className="mt-2 flex items-center gap-2">
        <span className={cn(
          'px-2 py-0.5 rounded-full text-xs font-medium',
          status === 'Approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
        )}>
          {status}
        </span>
      </div>
    </div>
  );
}