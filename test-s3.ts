import { uploadTestFile } from './src/lib/s3';

async function runTest() {
  try {
    const url = await uploadTestFile();
    console.log('Test file uploaded successfully!');
    console.log('File URL:', url);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTest();