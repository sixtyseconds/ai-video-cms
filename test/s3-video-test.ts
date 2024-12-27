import { config } from 'dotenv';
import { resolve } from 'path';
import { uploadVideo } from '../src/lib/s3/video-upload';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });

// Sample video for testing (small MP4 file)
const TEST_VIDEO_URL = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4';

async function runVideoTest() {
  console.log('🚀 Starting S3 video upload test...');
  
  try {
    // Fetch test video
    const response = await fetch(TEST_VIDEO_URL);
    const videoBuffer = await response.arrayBuffer();
    
    const filename = `test-${Date.now()}.mp4`;
    
    const url = await uploadVideo({
      file: videoBuffer,
      filename,
      folder: 'test-uploads',
      onProgress: (progress) => {
        console.log(`Upload progress: ${progress}%`);
      }
    });
    
    console.log('✅ Video uploaded successfully!');
    console.log('📍 Video URL:', url);
    process.exit(0);
  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

runVideoTest();