import { 
  S3Client, 
  PutBucketCorsCommand,
  PutBucketPolicyCommand,
  PutPublicAccessBlockCommand
} from '@aws-sdk/client-s3';
import { env } from '../config/env';
import { corsConfig } from './cors-config';
import { bucketPolicy } from './bucket-policy';

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY
  }
});

export async function configureBucket() {
  try {
    // 1. Disable Block Public Access
    const blockPublicAccessCommand = new PutPublicAccessBlockCommand({
      Bucket: env.AWS_BUCKET_NAME,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
        IgnorePublicAcls: false,
        BlockPublicPolicy: false,
        RestrictPublicBuckets: false
      }
    });
    await s3Client.send(blockPublicAccessCommand);
    console.log('✅ Public access block disabled');

    // 2. Set CORS configuration
    const corsCommand = new PutBucketCorsCommand({
      Bucket: env.AWS_BUCKET_NAME,
      CORSConfiguration: { CORSRules: corsConfig }
    });
    await s3Client.send(corsCommand);
    console.log('✅ CORS configuration applied');

    // 3. Apply bucket policy
    const policyCommand = new PutBucketPolicyCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Policy: JSON.stringify(bucketPolicy)
    });
    await s3Client.send(policyCommand);
    console.log('✅ Bucket policy applied');

  } catch (error) {
    console.error('Failed to configure bucket:', error);
    throw error;
  }
}