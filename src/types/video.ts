export interface Video {
  id: string;  // UUID stored as string
  title: string;
  description?: string;
  thumbnail: string;
  thumbnail_url?: string;
  video_url?: string;
  audio_file_url?: string;
  duration: string;
  status: VideoStatus;
  author: string;
  date: string;
  processing_status?: 'pending' | 'extracting_audio' | 'generating_thumbnail' | 'transcribing' | 'analyzing' | 'completed' | 'error';
  processing_step?: string;
  processing_error?: string;
}

export type VideoStatus = 'In Review' | 'Approved' | 'Draft' | 'Rejected';