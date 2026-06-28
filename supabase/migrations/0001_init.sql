-- ─────────────────────────────────────────────────────────────
-- Mi Gente Latino — waitlist / market-validation schema
-- Run this in the Supabase SQL Editor (or via the CLI/MCP) to
-- create the table that stores email signups.
-- ─────────────────────────────────────────────────────────────

create table if not exists public.signups (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  locale      text not null default 'en',
  source      text not null default 'landing',
  created_at  timestamptz not null default now(),
  constraint signups_email_unique unique (email)
);

create index if not exists signups_created_at_idx on public.signups (created_at desc);

-- Row Level Security: lock the table down, then allow ONLY anonymous
-- inserts from the public landing form. No one can read the list with
-- the public anon key — you read it from the Supabase dashboard or with
-- the service-role key.
alter table public.signups enable row level security;

drop policy if exists "anon can insert signups" on public.signups;
create policy "anon can insert signups"
  on public.signups
  for insert
  to anon
  with check (true);

-- (No select policy on purpose → the anon key cannot read emails back.)
