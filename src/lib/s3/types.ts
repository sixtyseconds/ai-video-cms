export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadOptions {
  file: File | ArrayBuffer;
  filename: string;
  contentType?: string;
  folder?: string;
  onProgress?: (progress: UploadProgress) => void;
}

export interface UploadResult {
  url: string;
  key: string;
}