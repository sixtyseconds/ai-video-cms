import { config } from 'dotenv';
import { resolve } from 'path';
import { uploadTestImage } from '../src/lib/s3/test-image-upload';

// Load environment variables before any imports that might use them
config({ path: resolve(process.cwd(), '.env') });

// Verify environment variables are loaded
const requiredVars = [
  'AWS_REGION',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_BUCKET_NAME'
];

const missing = requiredVars.filter(key => !process.env[key]);
if (missing.length > 0) {
  console.error('❌ Missing required environment variables:', missing.join(', '));
  process.exit(1);
}

const TEST_IMAGE_URL = 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80';

async function runTest() {
  console.log('Starting S3 image upload test...');
  console.log('Using bucket:', process.env.AWS_BUCKET_NAME);
  
  try {
    const url = await uploadTestImage(TEST_IMAGE_URL);
    console.log('✅ Test image uploaded successfully!');
    console.log('Image URL:', url);
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

runTest();