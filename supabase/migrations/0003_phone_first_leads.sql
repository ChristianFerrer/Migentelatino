-- ─────────────────────────────────────────────────────────────
-- Mi Gente Latino — phone-first leads
-- The waitlist now captures name + phone + missed_product (we follow up
-- on WhatsApp), so email is no longer collected. Make it optional.
-- ─────────────────────────────────────────────────────────────

alter table public.signups alter column email drop not null;
