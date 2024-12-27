// Application configuration constants
import { getEnvVar } from './env-utils';

// Supabase Configuration
export const SUPABASE_CONFIG = {
  url: getEnvVar('SUPABASE_URL'),
  anonKey: getEnvVar('SUPABASE_ANON_KEY')
} as const;

// Upload Configuration
export const UPLOAD_CONFIG = {
  maxFileSize: 500 * 1024 * 1024, // 500MB
  allowedVideoTypes: [
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska',
    'video/webm'
  ],
  allowedImageTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ]
} as const;

// FFmpeg Configuration
export const FFMPEG_CONFIG = {
  coreUrl: getEnvVar('FFMPEG_CORE_URL'),
  workerUrl: getEnvVar('FFMPEG_WORKER_URL')
} as const;