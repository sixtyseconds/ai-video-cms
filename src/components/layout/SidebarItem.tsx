import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number;
}

export function SidebarItem({ icon, label, active, count }: SidebarItemProps) {
  return (
    <button
      className={cn(
        'w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium',
        'hover:bg-white/10 transition-colors duration-200 group',
        active ? 'bg-white/15 text-white' : 'text-neutral-400'
      )}
    >
      <span className="flex items-center flex-1">
        <span className={cn(
          'w-5 h-5 mr-3 transition-colors duration-200',
          'group-hover:text-white'
        )}>
          {icon}
        </span>
        <span className="group-hover:text-white transition-colors duration-200">
          {label}
        </span>
      </span>
      {count !== undefined && (
        <span className="ml-auto text-xs text-neutral-400 group-hover:text-white transition-colors duration-200">
          {count}
        </span>
      )}
    </button>
  );
}