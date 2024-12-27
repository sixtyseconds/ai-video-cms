/*
  # Add Video Processing Fields

  1. New Columns
    - processing_status: Track the current processing state
    - processing_progress: Numerical progress indicator
    - processing_error: Store any error messages
    - processed_url: URL of the processed video
    - thumbnail_urls: Array of generated thumbnail URLs
    - duration: Video length in seconds
    - metadata: JSON field for additional video data
    - processing timestamps: Track when processing started/completed

  2. Indexes
    - Add index on processing_status for faster queries

  3. Triggers
    - Add updated_at timestamp trigger
*/

-- Add new columns to videos table for processing status
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'videos' AND column_name = 'processing_status'
  ) THEN
    ALTER TABLE videos 
      ADD COLUMN processing_status text DEFAULT 'pending',
      ADD COLUMN processing_progress integer DEFAULT 0,
      ADD COLUMN processing_error text,
      ADD COLUMN processed_url text,
      ADD COLUMN thumbnail_urls text[],
      ADD COLUMN duration integer,
      ADD COLUMN metadata jsonb DEFAULT '{}'::jsonb,
      ADD COLUMN processing_started_at timestamptz,
      ADD COLUMN processing_completed_at timestamptz;
  END IF;
END $$;

-- Create an index on processing_status for faster queries
CREATE INDEX IF NOT EXISTS idx_videos_processing_status 
ON videos (processing_status);

-- Add a trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_videos_updated_at'
  ) THEN
    CREATE TRIGGER update_videos_updated_at
      BEFORE UPDATE ON videos
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;