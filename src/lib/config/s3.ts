import { env } from './env';

export const s3Config = {
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY
  },
  bucket: env.AWS_BUCKET_NAME,
  baseUrl: `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com`
} as const;