import { S3Client, PutBucketCorsCommand, PutBucketPolicyCommand } from '@aws-sdk/client-s3';
import { env } from '../config/env';

// Create S3 client
export const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY
  }
});

// CORS configuration
export const corsConfig = {
  CORSRules: [
    {
      AllowedHeaders: ["*"],
      AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
      AllowedOrigins: ["*"],
      ExposeHeaders: ["ETag"],
      MaxAgeSeconds: 3600
    }
  ]
};

// Bucket policy for public read access
export const bucketPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicReadGetObject",
      Effect: "Allow",
      Principal: "*",
      Action: ["s3:GetObject"],
      Resource: [`arn:aws:s3:::${env.AWS_BUCKET_NAME}/*`]
    }
  ]
};

// Function to configure bucket CORS and policy
export async function configureBucket() {
  try {
    // Set CORS configuration
    const corsCommand = new PutBucketCorsCommand({
      Bucket: env.AWS_BUCKET_NAME,
      CORSConfiguration: corsConfig
    });
    await s3Client.send(corsCommand);
    console.log('✅ CORS configuration applied successfully');

    // Set bucket policy
    const policyCommand = new PutBucketPolicyCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Policy: JSON.stringify(bucketPolicy)
    });
    await s3Client.send(policyCommand);
    console.log('✅ Bucket policy applied successfully');
  } catch (error) {
    console.error('Failed to configure bucket:', error);
    throw error;
  }
}

// Export S3 configuration
export const s3Config = {
  bucket: env.AWS_BUCKET_NAME,
  region: env.AWS_REGION,
  baseUrl: `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com`
} as const;