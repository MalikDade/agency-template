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

// Reads every row from mpm_settings into a flat { key: value } object.
export async function getSettings() {
  try {
    const sb = getSupabase()
    const { data, error } = await sb.from('mpm_settings').select('key, value')
    if (error) throw error
    const out = {}
    for (const row of data || []) out[row.key] = row.value
    return out
  } catch (e) {
    console.error('[getSettings]', e.message)
    return {}
  }
}

// Reads a single setting, falling back if unset/unreachable.
export async function getSetting(key, fallback = null) {
  try {
    const sb = getSupabase()
    const { data, error } = await sb.from('mpm_settings').select('value').eq('key', key).maybeSingle()
    if (error) throw error
    return data ? data.value : fallback
  } catch (e) {
    console.error('[getSetting]', key, e.message)
    return fallback
  }
}

// Upserts multiple key/value pairs at once.
export async function upsertSettings(obj) {
  const sb = getSupabase()
  const rows = Object.entries(obj).map(([key, value]) => ({ key, value: String(value), updated_at: new Date().toISOString() }))
  const { error } = await sb.from('mpm_settings').upsert(rows, { onConflict: 'key' })
  if (error) throw error
  return true
}
