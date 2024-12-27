export const STORAGE_PATHS = {
  videos: 'videos',
  thumbnails: 'thumbnails',
  audio: 'audio'
} as const;

export const STORAGE_BUCKETS = {
  VIDEOS: 'videos',
  THUMBNAILS: 'thumbnails',
  AUDIO: 'audio'
} as const;

// For backward compatibility
export const STORAGE_BUCKET = STORAGE_BUCKETS.VIDEOS;