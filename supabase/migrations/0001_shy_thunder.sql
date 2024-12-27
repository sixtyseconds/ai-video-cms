/*
  # Initial Schema Setup

  1. New Tables
    - `videos`
      - Core video asset management table
      - Includes metadata, processing status, and version tracking
      - RLS enabled for user-specific access

  2. Security
    - Enable RLS on videos table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  description text,
  category text,
  sub_tags text[],
  hook text,
  main_points text[],
  video_url text,
  thumbnail_url text,
  audio_file_url text,
  status text DEFAULT 'Draft',
  share_settings jsonb DEFAULT '{"public": false}'::jsonb,
  version_number integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own videos"
  ON videos
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own videos"
  ON videos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own videos"
  ON videos
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);