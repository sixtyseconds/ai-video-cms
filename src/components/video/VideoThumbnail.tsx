import { Play } from 'lucide-react';

interface VideoThumbnailProps {
  src: string;
  alt: string;
  duration: string;
}

export function VideoThumbnail({ src, alt, duration }: VideoThumbnailProps) {
  return (
    <div className="relative aspect-video bg-[#1A1D23]">
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-neutral-500">
          <span>No thumbnail</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-90 hover:scale-100 transition-transform">
            <Play className="w-6 h-6 text-white" fill="white" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 text-xs font-medium backdrop-blur-sm">
        {duration}
      </div>
    </div>
  );
}