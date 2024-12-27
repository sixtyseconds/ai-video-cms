import { 
  Folder, 
  Video, 
  CheckCircle, 
  Music, 
  Image, 
  Share, 
  Network,
  ChevronDown 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarItem } from './SidebarItem';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <div
      className={cn(
        'w-64 bg-[#13151A] border-r border-[#2A2F38] flex flex-col transition-all duration-300',
        !isOpen && 'w-0'
      )}
    >
      <div className="p-4">
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white mb-6 hover:bg-white/5 rounded-lg">
          Project Name
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        </button>
        
        <div className="space-y-1">
          <h2 className="text-[11px] font-semibold text-neutral-400 px-3 mb-2">ASSETS</h2>
          <SidebarItem icon={<Folder className="w-4 h-4" />} label="All Assets" active />
          
          <h2 className="text-[11px] font-semibold text-neutral-400 px-3 mt-6 mb-2">COLLECTIONS</h2>
          <SidebarItem icon={<Video className="w-4 h-4" />} label="Videos" count={12} />
          <SidebarItem icon={<CheckCircle className="w-4 h-4" />} label="Needs Review" count={3} />
          <SidebarItem icon={<Music className="w-4 h-4" />} label="Audio" count={5} />
          <SidebarItem icon={<CheckCircle className="w-4 h-4" />} label="Approved" count={8} />
          <SidebarItem icon={<Image className="w-4 h-4" />} label="Images" count={15} />
          
          <h2 className="text-[11px] font-semibold text-neutral-400 px-3 mt-6 mb-2">SHARING</h2>
          <SidebarItem icon={<Share className="w-4 h-4" />} label="Shares" />
          <SidebarItem icon={<Network className="w-4 h-4" />} label="C2C Connections" />
        </div>
      </div>
    </div>
  );
}