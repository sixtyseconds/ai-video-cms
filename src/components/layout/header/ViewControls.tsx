import { SlidersHorizontal, Grid3X3, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useUI } from '@/contexts/UIContext';
import { cn } from '@/lib/utils';

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'In Review', value: 'in-review' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

export function ViewControls() {
  const { viewMode, setViewMode, activeFilters, setActiveFilters } = useUI();

  const toggleFilter = (value: string) => {
    setActiveFilters(prev =>
      prev.includes(value)
        ? prev.filter(f => f !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "text-neutral-400 hover:bg-[#1A1D23] hover:text-white group",
              activeFilters.length > 0 && "bg-[#1A1D23] text-white"
            )}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2 transition-colors group-hover:text-white" />
            Filters
            <ChevronDown className="w-4 h-4 ml-1 transition-colors group-hover:text-white" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 bg-[#1A1D23] border-[#2A2F38]">
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-neutral-400">Search in title</Label>
              <Input
                placeholder="Type to search..."
                className="h-8 mt-1.5 bg-[#13151A] border-[#2A2F38]"
              />
            </div>
            
            <div>
              <Label className="text-sm text-neutral-400">Status</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                {statusOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={activeFilters.includes(option.value) ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "w-full",
                      activeFilters.includes(option.value)
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "hover:bg-[#13151A] hover:text-white border-[#2A2F38]"
                    )}
                    onClick={() => toggleFilter(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="h-4 border-l border-white/10" />
      
      <Button 
        variant="ghost" 
        size="icon" 
        className={cn(
          "text-neutral-400 hover:bg-[#1A1D23] group",
          viewMode === 'grid' && "bg-[#1A1D23] text-white"
        )}
        onClick={() => setViewMode('grid')}
      >
        <Grid3X3 className="w-4 h-4 transition-colors group-hover:text-white" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className={cn(
          "text-neutral-400 hover:bg-[#1A1D23] group",
          viewMode === 'list' && "bg-[#1A1D23] text-white"
        )}
        onClick={() => setViewMode('list')}
      >
        <List className="w-4 h-4 transition-colors group-hover:text-white" />
      </Button>
    </div>
  );
}