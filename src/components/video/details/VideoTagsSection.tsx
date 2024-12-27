import { Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface VideoTagsSectionProps {
  tags: string[];
}

export function VideoTagsSection({ tags }: VideoTagsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Tag className="w-4 h-4 text-neutral-400" />
        <span className="text-sm font-medium text-white">Tags</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-white/5 hover:bg-white/10 text-neutral-200"
          >
            {tag}
          </Badge>
        ))}
      </div>
      <Separator className="bg-white/10" />
    </div>
  );
}