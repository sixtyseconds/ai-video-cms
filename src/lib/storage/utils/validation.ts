import { supabase } from '../../supabase';
import { StorageError } from '../../types/errors';

export async function validateFileExists(
  bucket: string,
  path: string,
  filename: string
): Promise<void> {
  const { data: files, error } = await supabase.storage
    .from(bucket)
    .list(path, {
      search: filename,
      limit: 1
    });

  if (error) {
    throw new StorageError(`Failed to verify file existence: ${error.message}`);
  }

  if (!files || files.length === 0) {
    throw new StorageError(`File not found: ${filename}`);
  }
}