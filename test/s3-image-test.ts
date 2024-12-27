import { config } from 'dotenv';
import { resolve } from 'path';
import { uploadImage } from '../src/lib/s3/image-upload';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });

const TEST_IMAGE_URL = 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80';

async function runImageTest() {
  console.log('🚀 Starting S3 image upload test...');
  
  try {
    // Fetch test image
    const response = await fetch(TEST_IMAGE_URL);
    const imageBuffer = await response.arrayBuffer();
    
    const filename = `test-${Date.now()}.jpg`;
    
    const url = await uploadImage({
      file: imageBuffer,
      filename,
      folder: 'test-uploads'
    });
    
    console.log('✅ Image uploaded successfully!');
    console.log('📍 Image URL:', url);
    process.exit(0);
  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

runImageTest();