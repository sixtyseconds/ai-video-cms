export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${random}.${extension}`;
}

export function extractFilenameFromPath(path: string): string {
  return path.includes('/') ? path.split('/').pop() || '' : path;
}