/*
  # Add thumbnails storage bucket

  1. New Storage
    - Creates thumbnails bucket for storing video thumbnails
    - Enables public access for thumbnail URLs
  
  2. Security
    - Allows authenticated users to upload thumbnails
    - Allows public read access to thumbnails
*/

-- Create the thumbnails bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload thumbnails
CREATE POLICY "Allow authenticated thumbnail uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'thumbnails');

-- Allow public read access to thumbnails
CREATE POLICY "Allow public thumbnail read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'thumbnails');