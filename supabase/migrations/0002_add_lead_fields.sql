-- ─────────────────────────────────────────────────────────────
-- Mi Gente Latino — richer lead capture for marketing campaigns
-- Adds name, phone, country of origin and the "most missed product"
-- to the signups table. All nullable so older inserts keep working.
-- ─────────────────────────────────────────────────────────────

alter table public.signups add column if not exists name           text;
alter table public.signups add column if not exists phone          text;
alter table public.signups add column if not exists country        text;
alter table public.signups add column if not exists missed_product text;
