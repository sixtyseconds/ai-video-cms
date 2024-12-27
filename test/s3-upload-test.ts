import { config } from 'dotenv';
import { resolve } from 'path';
import { uploadToS3 } from '../src/lib/s3/upload';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });

// Test file content
const testFile = new File(
  ['Test content for S3 upload'],
  'test.txt',
  { type: 'text/plain' }
);

async function runTest() {
  console.log('🚀 Starting S3 upload test...');
  
  try {
    const url = await uploadToS3({
      file: testFile,
      key: `test/test-${Date.now()}.txt`,
      contentType: 'text/plain',
      onProgress: (progress) => {
        console.log(`Upload progress: ${progress}%`);
      }
    });
    
    console.log('✅ Test file uploaded successfully!');
    console.log('📍 File URL:', url);
    process.exit(0);
  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

runTest();