import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from './client';
import { env } from '../config/env';

interface UploadOptions {
  file: Buffer | Uint8Array | string;
  key: string;
  contentType?: string;
}

export async function uploadToS3({
  file,
  key,
  contentType = 'application/octet-stream'
}: UploadOptions): Promise<string> {
  try {
    const command = new PutObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: contentType,
      CacheControl: 'max-age=31536000' // 1 year cache
    });

    await s3Client.send(command);
    
    // Return the public URL
    return `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error('Failed to upload file to S3');
  }
}