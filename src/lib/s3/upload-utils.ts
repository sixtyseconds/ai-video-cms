import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from './client';
import { s3Config } from '../config/s3';
import type { UploadOptions, UploadResult } from './types';

export async function uploadToS3({
  file,
  filename,
  contentType,
  folder = 'uploads',
  onProgress
}: UploadOptions): Promise<UploadResult> {
  const key = `${folder}/${filename}`;

  const command = new PutObjectCommand({
    Bucket: s3Config.bucket,
    Key: key,
    Body: file,
    ContentType: contentType,
    CacheControl: 'max-age=31536000'
  });

  try {
    await s3Client.send(command);
    return {
      url: `${s3Config.baseUrl}/${key}`,
      key
    };
  } catch (error) {
    console.error('Upload failed:', error);
    throw new Error('Failed to upload file to S3');
  }
}