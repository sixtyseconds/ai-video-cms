// Upload configuration constants
export const UPLOAD_CONFIG = {
  VIDEO: {
    MAX_SIZE: 500 * 1024 * 1024, // 500MB
    ALLOWED_TYPES: [
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo',
      'video/x-matroska',
      'video/webm'
    ]
  },
  IMAGE: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ]
  }
} as const;