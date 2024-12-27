/*
  # Create initial user account

  1. Creates a new user account with:
    - Email: andrew.bryce@sixtyseconds.video
    - Password: J7571qJ7571q (hashed)
  
  2. Security
    - Uses secure password hashing
    - Creates verified user account
*/

-- First ensure the email column has a unique index
CREATE UNIQUE INDEX IF NOT EXISTS users_email_idx ON auth.users (email);

-- Create the user account with a securely hashed password
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'andrew.bryce@sixtyseconds.video',
  crypt('J7571qJ7571q', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;