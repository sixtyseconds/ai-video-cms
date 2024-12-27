import { env } from '../config/env';

export const bucketPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicReadGetObject",
      Effect: "Allow",
      Principal: "*",
      Action: [
        "s3:GetObject"
      ],
      Resource: [
        `arn:aws:s3:::${env.AWS_BUCKET_NAME}/*`
      ]
    }
  ]
} as const;