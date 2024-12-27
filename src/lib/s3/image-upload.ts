import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, s3Config } from './config';

interface UploadImageOptions {
  file: File | ArrayBuffer;
  filename: string;
  contentType?: string;
  folder?: string;
}

export async function uploadImage({
  file,
  filename,
  contentType = 'image/jpeg',
  folder = 'images'
}: UploadImageOptions): Promise<string> {
  const key = `${folder}/${filename}`;

  const command = new PutObjectCommand({
    Bucket: s3Config.bucketName,
    Key: key,
    Body: file,
    ContentType: contentType,
    CacheControl: 'max-age=31536000' // 1 year cache
  });

  await s3Client.send(command);
  return `${s3Config.baseUrl}/${key}`;
}