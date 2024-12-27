import { uploadToS3 } from './upload';
import type { UploadProgress } from '../upload/progress';

interface VideoUploadOptions {
  file: File;
  filename?: string;
  onProgress?: (progress: UploadProgress) => void;
}

export async function uploadVideo({
  file,
  filename = `${Date.now()}-${file.name}`,
  onProgress
}: VideoUploadOptions): Promise<string> {
  // Ensure filename is URL-safe
  const safeName = encodeURIComponent(filename.replace(/[^a-zA-Z0-9.-]/g, '_'));
  const key = `videos/${safeName}`;
  
  return uploadToS3({
    file,
    key,
    contentType: file.type,
    onProgress
  });
}