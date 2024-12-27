import { uploadFile } from './upload';

export async function uploadTestFile(): Promise<string> {
  const testContent = 'This is a test file';
  const fileName = `test-${Date.now()}.txt`;
  
  try {
    return await uploadFile(
      testContent,
      fileName,
      'text/plain'
    );
  } catch (error) {
    console.error('Test upload failed:', error);
    throw error;
  }
}