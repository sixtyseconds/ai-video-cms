import { z } from 'zod';

// Schema for environment variables
export const envSchema = z.object({
  // Supabase
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  
  // OpenAI
  OPENAI_API_KEY: z.string().optional(),
  
  // Apify
  APIFY_API_KEY: z.string().optional(),
  
  // FFmpeg
  FFMPEG_CORE_URL: z.string().optional(),
  FFMPEG_WORKER_URL: z.string().optional()
});

export type Env = z.infer<typeof envSchema>;