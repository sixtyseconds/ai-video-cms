import { S3_CONFIG, API_CONFIG } from './constants';

export function validateConfig() {
  // Validate S3 configuration
  const requiredS3Vars = [
    'REGION',
    'ACCESS_KEY_ID',
    'SECRET_ACCESS_KEY',
    'BUCKET_NAME'
  ] as const;

  for (const key of requiredS3Vars) {
    if (!S3_CONFIG[key]) {
      throw new Error(`Missing required S3 configuration: ${key}`);
    }
  }

  // Validate API configuration
  const requiredApiVars = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY'
  ] as const;

  for (const key of requiredApiVars) {
    if (!API_CONFIG[key]) {
      throw new Error(`Missing required API configuration: ${key}`);
    }
  }
}