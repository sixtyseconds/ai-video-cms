import { supabase } from '../supabase';
import { StorageError } from '../types/errors';
import { generateUniqueFilename } from './utils/filename';
import { STORAGE_PATHS, STORAGE_BUCKETS } from './constants';
import type { UploadProgress } from '../upload/progress';

interface VideoUploadOptions {
  file: File;
  folder?: keyof typeof STORAGE_PATHS;
  onProgress?: (progress: UploadProgress) => void;
}

export async function uploadVideo({
  file,
  folder = 'VIDEO',
  onProgress
}: VideoUploadOptions): Promise<{ url: string; path: string }> {
  try {
    const filename = generateUniqueFilename(file.name);
    const filePath = `${folder}/${filename}`;

    const { data, error: uploadError } = await supabase.storage
      .from(folder === 'thumbnails' ? STORAGE_BUCKETS.THUMBNAILS : STORAGE_BUCKETS.VIDEOS)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        onUploadProgress: ({ loaded, total }) => {
          if (onProgress) {
            onProgress({
              loaded,
              total,
              percentage: Math.round((loaded / total) * 100)
            });
          }
        },
      });

    if (uploadError) {
      throw new StorageError(`Upload failed: ${uploadError.message}`);
    }

    if (!data?.path) {
      throw new StorageError('Upload succeeded but no path returned');
    }

    const { data: { publicUrl } } = supabase.storage
      .from(folder === 'thumbnails' ? 'thumbnails' : 'videos')
      .getPublicUrl(data.path);

    return {
      url: publicUrl,
      path: data.path
    };
  } catch (error) {
    if (error instanceof StorageError) {
      throw error;
    }
    throw new StorageError(`Unexpected error during upload: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}