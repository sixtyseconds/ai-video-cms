import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION || 'eu-west-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadTestFile(): Promise<string> {
  const testContent = 'This is a test file';
  const fileName = `test-${Date.now()}.txt`;
  
  const command = new PutObjectCommand({
    Bucket: 'talk-to-video-application',
    Key: fileName,
    Body: testContent,
    ContentType: 'text/plain',
  });

  try {
    await s3Client.send(command);
    return `https://talk-to-video-application.s3.eu-west-2.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}