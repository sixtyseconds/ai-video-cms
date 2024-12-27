export const VIDEO_STATUSES = {
  UPLOADING: 'uploading',
  PROCESSING: 'processing',
  IN_REVIEW: 'in_review',
  APPROVED: 'approved',
  DRAFT: 'draft',
  REJECTED: 'rejected',
} as const;

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
} as const;

export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
  'video/webm'
];

export const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB