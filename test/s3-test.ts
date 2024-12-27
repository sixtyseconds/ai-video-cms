import { config } from 'dotenv';
import { resolve } from 'path';
import { uploadToS3 } from '../src/lib/s3/upload';
import { Buffer } from 'buffer';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

// Create a test file using Buffer for Node.js environment
const testContent = Buffer.from('Test content for S3 upload');

async function runTest() {
  console.log('🚀 Starting S3 upload test...');
  console.log('Using region:', process.env.VITE_AWS_REGION);
  console.log('Using bucket:', process.env.VITE_AWS_BUCKET_NAME);
  
  try {
    const url = await uploadToS3({
      file: testContent,
      key: `test/test-${Date.now()}.txt`,
      contentType: 'text/plain'
    });
    
    console.log('✅ Test file uploaded successfully!');
    console.log('📍 File URL:', url);
    process.exit(0);
  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}