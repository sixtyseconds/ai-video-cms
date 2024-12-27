/*
  # Add processing step field
  
  1. Changes
    - Add processing_step field to store detailed status messages
    - Add index for faster processing status queries
*/

-- Add processing_step column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'videos' AND column_name = 'processing_step'
  ) THEN
    ALTER TABLE videos ADD COLUMN processing_step text;
  END IF;
END $$;

-- Create an index for faster processing status queries
CREATE INDEX IF NOT EXISTS idx_videos_processing_status_step 
ON videos (processing_status, processing_step);