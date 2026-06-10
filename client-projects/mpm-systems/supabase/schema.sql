-- Run in Supabase SQL editor before deploying.

create table if not exists public.mpm_leads (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  name text not null,
  email text not null,
  summary text,
  source text not null default 'chat',
  created_at timestamptz not null default now()
);

create table if not exists public.mpm_chats (
  id uuid primary key default gen_random_uuid(),
  session_id text not null unique,
  lead_name text,
  lead_email text,
  summary text,
  messages jsonb,
  lead_notified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists mpm_leads_created_at_idx on public.mpm_leads (created_at desc);
create index if not exists mpm_chats_updated_at_idx on public.mpm_chats (updated_at desc);
