/*
  # Add Storage Bucket for Videos

  1. New Storage
    - Create 'videos' bucket for storing video files
    - Set up public access policy
  
  2. Security
    - Enable authenticated uploads
    - Allow public read access
*/

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'videos');

-- Allow public read access to files
CREATE POLICY "Allow public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'videos');