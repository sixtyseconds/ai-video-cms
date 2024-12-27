import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, s3Config } from './config';

export async function uploadTestImage(imageUrl: string): Promise<string> {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    
    const filename = `test-${Date.now()}.jpg`;
    const key = `test-uploads/${filename}`;

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
      Body: buffer,
      ContentType: 'image/jpeg'
    });

    await s3Client.send(command);
    return `${s3Config.baseUrl}/${key}`;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}