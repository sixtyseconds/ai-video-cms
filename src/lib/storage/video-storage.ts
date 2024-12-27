import { supabase } from '../supabase';
import { StorageError } from '../types/errors';
import { extractFilenameFromPath } from './utils/filename';
import { validateFileExists } from './utils/validation';
import { STORAGE_PATHS, STORAGE_BUCKET } from './constants';

interface VideoFiles {
  videoPath?: string;
  audioPath?: string;
  thumbnailPath?: string;
}

function cleanStoragePath(path?: string): string | undefined {
  if (!path) return undefined;
  
  if (path.startsWith('http')) {
    try {
      const url = new URL(path);
      const parts = url.pathname.split('/');
      // Find the index after 'videos' in the path
      const startIndex = parts.findIndex(part => part === 'videos') + 1;
      if (startIndex > 0) {
        return parts.slice(startIndex).join('/');
      }
      return undefined;
    } catch {
      return undefined;
    }
  }
  
  return path;
}

async function deleteFile(path: string): Promise<void> {
  if (!path || typeof path !== 'string') return;

  const cleanPath = cleanStoragePath(path);
  if (!cleanPath) {
    // Skip if path is invalid - file may not exist yet
    return;
  }

  try {
    const filename = extractFilenameFromPath(cleanPath);
    if (!filename) {
      // Skip if filename can't be extracted
      return;
    }

    const folder = cleanPath.split('/')[0];
    if (!Object.values(STORAGE_PATHS).includes(folder)) {
      // Skip if folder is invalid
      return;
    }

    // Attempt to delete even if file doesn't exist
    const { error: deleteError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([cleanPath]);

    if (deleteError) {
      // Ignore 404 errors (file not found)
      if (!deleteError.message.includes('Not Found')) {
        console.warn('Failed to delete file:', deleteError.message);
      }
    }
  } catch (error) {
    console.warn('Error deleting file:', error);
  }
}

export async function deleteVideoFiles(files: VideoFiles): Promise<void> {
  const deletionPromises = Object.values(files)
    .filter((path): path is string => Boolean(path))
    .map(path => deleteFile(path));

  const results = await Promise.allSettled(deletionPromises);
  
  // Log any failures but don't throw
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.warn(`Failed to delete file ${index + 1}:`, result.reason);
    }
  });
}