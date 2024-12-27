import { config } from 'dotenv';
import { resolve } from 'path';
import { generateThumbnail } from '../src/lib/ffmpeg/processors';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });

// Test video URL (10 seconds, 1MB)
const TEST_VIDEO_URL = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4';

async function runVideoTest() {
  console.log('🚀 Starting video processing test...');
  
  try {
    // 1. Download test video
    console.log('📥 Downloading test video...');
    const response = await fetch(TEST_VIDEO_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch test video: ${response.statusText}`);
    }
    const blob = await response.blob();
    const videoFile = new File([blob], 'test.mp4', { type: 'video/mp4' });
    console.log('✅ Test video downloaded');

    // 2. Generate thumbnail
    console.log('🖼️ Generating thumbnail...');
    const thumbnailBlob = await generateThumbnail(videoFile);
    console.log('✅ Thumbnail generated');
    
    // 3. Verify thumbnail
    if (!(thumbnailBlob instanceof Blob)) {
      throw new Error('Invalid thumbnail generated');
    }
    if (thumbnailBlob.type !== 'image/jpeg') {
      throw new Error(`Invalid thumbnail type: ${thumbnailBlob.type}`);
    }
    console.log('✅ Thumbnail verified');

    console.log('✨ Test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run the test
runVideoTest();