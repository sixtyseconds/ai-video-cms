import { uploadVideoToStorage } from './storage/video-upload';

export async function uploadVideo(
  file: File, 
  onProgress?: (progress: number) => void
): Promise<{ path: string; url: string }> {
  return uploadVideoToStorage(file, onProgress);
}