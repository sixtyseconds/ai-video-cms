import { config } from 'dotenv';
import { resolve } from 'path';
import { configureBucket } from '../src/lib/s3/bucket-setup';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });

// Verify required environment variables
const requiredVars = [
  'VITE_AWS_REGION',
  'VITE_AWS_ACCESS_KEY_ID',
  'VITE_AWS_SECRET_ACCESS_KEY',
  'VITE_AWS_BUCKET_NAME'
];

const missing = requiredVars.filter(key => !process.env[key]);
if (missing.length > 0) {
  console.error('❌ Missing required environment variables:', missing.join(', '));
  process.exit(1);
}

async function configureS3() {
  console.log('🚀 Configuring S3 bucket...');
  console.log('Using region:', process.env.VITE_AWS_REGION);
  console.log('Using bucket:', process.env.VITE_AWS_BUCKET_NAME);
  
  try {
    await configureBucket();
    console.log('✅ S3 bucket configured successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Configuration failed:', error);
    process.exit(1);
  }
}

configureS3();