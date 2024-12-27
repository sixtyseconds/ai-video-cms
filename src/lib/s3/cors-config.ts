// S3 CORS Configuration
export const corsConfig = [
  {
    AllowedHeaders: ["*"],
    AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
    AllowedOrigins: ["*"],
    ExposeHeaders: ["ETag"],
    MaxAgeSeconds: 3600
  }
] as const;