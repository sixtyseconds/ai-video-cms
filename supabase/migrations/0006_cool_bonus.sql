/*
  # Fix RLS policies for videos table

  1. Changes
    - Drop existing RLS policies
    - Create new policies with proper user_id checks
    - Add policy for authenticated users to create videos
    - Add policy for authenticated users to read their own videos
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view their own videos" ON videos;
  DROP POLICY IF EXISTS "Users can create their own videos" ON videos;
  DROP POLICY IF EXISTS "Users can update their own videos" ON videos;
END $$;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users"
ON videos FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for authenticated users"
ON videos FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update access for authenticated users"
ON videos FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);