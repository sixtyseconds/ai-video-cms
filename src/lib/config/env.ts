import { z } from 'zod';

// Environment schema
const envSchema = z.object({
  AWS_REGION: z.string().min(1, "AWS Region is required"),
  AWS_ACCESS_KEY_ID: z.string().min(1, "AWS Access Key ID is required"),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, "AWS Secret Access Key is required"),
  AWS_BUCKET_NAME: z.string().min(1, "AWS Bucket Name is required"),
  SUPABASE_URL: z.string().url("Invalid Supabase URL"),
  SUPABASE_ANON_KEY: z.string().min(1, "Supabase Anon Key is required")
});

// Get environment variable with proper prefix handling
function getEnvVar(key: string): string {
  // Always use VITE_ prefix
  const viteKey = `VITE_${key}`;
  const value = import.meta.env[viteKey];
  
  if (!value) {
    console.warn(`Missing environment variable: ${viteKey}`);
  }
  
  return value || '';
}

// Get and validate environment configuration
function validateEnv() {
  const env = {
    AWS_REGION: getEnvVar('AWS_REGION'),
    AWS_ACCESS_KEY_ID: getEnvVar('AWS_ACCESS_KEY_ID'),
    AWS_SECRET_ACCESS_KEY: getEnvVar('AWS_SECRET_ACCESS_KEY'),
    AWS_BUCKET_NAME: getEnvVar('AWS_BUCKET_NAME'),
    SUPABASE_URL: getEnvVar('SUPABASE_URL'),
    SUPABASE_ANON_KEY: getEnvVar('SUPABASE_ANON_KEY')
  };

  const result = envSchema.safeParse(env);
  
  if (!result.success) {
    console.error('Environment validation failed:', result.error.format());
    throw new Error('Invalid environment configuration');
  }

  return result.data;
}

export const env = validateEnv();