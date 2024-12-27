import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ActiveFiltersBarProps {
  filters: string[];
  onRemoveFilter: (filter: string) => void;
  onClearAll: () => void;
}

export function ActiveFiltersBar({ filters, onRemoveFilter, onClearAll }: ActiveFiltersBarProps) {
  if (filters.length === 0) return null;

  return (
    <div className="h-12 px-4 border-b border-white/10 bg-[#13151A] flex items-center gap-2">
      {filters.map((filter) => (
        <Badge
          key={filter}
          variant="secondary"
          className={cn(
            "h-6 px-2 text-xs bg-[#1A1D23] hover:bg-[#2A2F38] group",
            "flex items-center gap-1"
          )}
        >
          {filter}
          <button
            className="ml-1"
            onClick={() => onRemoveFilter(filter)}
          >
            <X className="w-3 h-3 transition-colors group-hover:text-white" />
          </button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-2 text-xs hover:bg-[#1A1D23] hover:text-white ml-2"
        onClick={onClearAll}
      >
        Clear all
      </Button>
    </div>
  );
}