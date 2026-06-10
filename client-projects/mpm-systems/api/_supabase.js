import { createClient } from '@supabase/supabase-js'

/*
  Run this SQL in your Supabase SQL editor before using the admin dashboard:

  CREATE TABLE IF NOT EXISTS mpm_leads (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id text UNIQUE,
    name text,
    phone text,
    email text,
    business_type text,
    budget text,
    message text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS mpm_chats (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id text UNIQUE NOT NULL,
    messages jsonb DEFAULT '[]'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS mpm_settings (
    key text PRIMARY KEY,
    value text,
    updated_at timestamptz DEFAULT now()
  );

  INSERT INTO mpm_settings (key, value) VALUES
    ('business_hours', 'Mon–Fri 9am–6pm CST'),
    ('dan_title', 'Director of Client Solutions'),
    ('contact_email', 'makingpowermovesllc@gmail.com'),
    ('contact_phone', '')
  ON CONFLICT (key) DO NOTHING;
*/

export function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase env vars not set: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required')
  return createClient(url, key, { auth: { persistSession: false } })
}
