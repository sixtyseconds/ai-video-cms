import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface FilterOption {
  label: string;
  value: string;
}

const statusOptions: FilterOption[] = [
  { label: 'Draft', value: 'draft' },
  { label: 'In Review', value: 'in-review' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

export function VideoFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFilter = (value: string) => {
    setActiveFilters(prev =>
      prev.includes(value)
        ? prev.filter(f => f !== value)
        : [...prev, value]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchTerm('');
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-8 hover:bg-[#1A1D23] hover:text-white group">
            <Filter className="w-4 h-4 mr-2 transition-colors group-hover:text-white" />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div>
              <Label>Search</Label>
              <Input
                placeholder="Search in title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-8 mt-1.5"
              />
            </div>
            
            <div>
              <Label>Status</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                {statusOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={activeFilters.includes(option.value) ? "default" : "outline"}
                    size="sm"
                    className="w-full group"
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

      {(activeFilters.length > 0 || searchTerm) && (
        <>
          <div className="h-4 border-l border-neutral-700" />
          <div className="flex items-center gap-2">
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="h-6 px-2 text-xs group"
              >
                {statusOptions.find(o => o.value === filter)?.label}
                <button
                  className="ml-1 group"
                  onClick={() => toggleFilter(filter)}
                >
                  <X className="w-3 h-3 transition-colors group-hover:text-white" />
                </button>
              </Badge>
            ))}
            {(activeFilters.length > 0 || searchTerm) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs hover:bg-[#1A1D23] hover:text-white"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}