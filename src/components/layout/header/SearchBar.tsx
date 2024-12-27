import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function SearchBar() {
  return (
    <div className="relative w-96 group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-colors group-hover:text-white" />
      <Input
        placeholder="Search assets..."
        className="pl-10 bg-[#1A1D23] border-[#2A2F38] text-sm h-9 focus:ring-blue-500 hover:border-neutral-600 transition-colors"
      />
    </div>
  );
}