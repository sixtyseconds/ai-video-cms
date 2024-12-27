/*
  # Add tags column to videos table

  1. Changes
    - Add tags array column to videos table
    - Add index on tags for better query performance
*/

-- Add tags column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'videos' AND column_name = 'tags'
  ) THEN
    ALTER TABLE videos ADD COLUMN tags text[] DEFAULT '{}';
    
    -- Create a GIN index for faster tag searches
    CREATE INDEX IF NOT EXISTS idx_videos_tags ON videos USING GIN (tags);
  END IF;
END $$;