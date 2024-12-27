export interface ProcessingProgress {
  ratio: number;
  time: number;
  speed: number;
}

export interface ProcessingResult {
  audio?: {
    url: string;
    path: string;
  };
  thumbnail?: {
    url: string;
    path: string;
  };
}