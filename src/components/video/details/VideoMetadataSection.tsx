import { Clock, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface VideoMetadataSectionProps {
  title: string;
  description: string;
  duration: string;
  createdAt: string;
}

export function VideoMetadataSection({ title, description, duration, createdAt }: VideoMetadataSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
      </div>

      <Separator className="bg-white/10" />

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <Clock className="w-4 h-4 text-neutral-400" />
          <span className="text-neutral-300">{duration}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Calendar className="w-4 h-4 text-neutral-400" />
          <span className="text-neutral-300">{createdAt}</span>
        </div>
      </div>
    </div>
  );
}