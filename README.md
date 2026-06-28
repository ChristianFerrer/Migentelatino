# Mi Gente Latino 🌮🇦🇹

Landing page for **Mi Gente Latino** — a Latin American products store coming to
Austria. Its purpose is **market validation**: visitors leave their email to join
the waitlist, which lets us measure conversion and demand before launching.

- ⚡ **Next.js 14** (App Router) + **TypeScript**
- 🎨 **Tailwind CSS** — youthful, friendly, vibrant Latino design with flat icons
- 🌍 **Trilingual** — English 🇬🇧 / Español 🇪🇸 / Deutsch 🇦🇹 (auto-detected, switchable)
- 🗄️ **Supabase** email capture (optional — runs in demo mode without it)
- ▲ Deploy-ready for **Vercel**

---

## 1. Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The site works out of the box in **demo mode**:
the email form behaves normally but submissions are only logged to the console,
not stored. To actually persist emails, set up Supabase (next section).

## 2. Connect Supabase (to store emails)

1. Create a project at <https://supabase.com>.
2. In the **SQL Editor**, run [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql).
   It creates a `signups` table with Row Level Security that allows anonymous
   inserts only (the public key can write, but **cannot read** the list back).
3. Copy your keys from **Project Settings → API** into `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```

4. Restart `npm run dev`. Emails now land in the `signups` table.

**Reading your signups:** view them in the Supabase **Table Editor**, or export
to CSV from there. The anon key deliberately can't read them, so the list stays
private.

## 3. Deploy to Vercel

1. Push this repo to GitHub (already done if you're reading this on GitHub).
2. Import the repo at <https://vercel.com/new>.
3. Add the two `NEXT_PUBLIC_SUPABASE_*` environment variables in the Vercel
   project settings.
4. Deploy. That's it — Vercel auto-detects Next.js.

---

## Project structure

```
app/
  layout.tsx          # Fonts, metadata, locale provider
  page.tsx            # All landing sections
  globals.css         # Tailwind + animations
  api/subscribe/      # POST endpoint → inserts into Supabase
components/            # Logo, language switcher, signup form, flat icons
lib/
  i18n.ts             # All EN/ES/DE copy lives here (edit text here)
  supabase.ts         # Supabase client (graceful demo-mode fallback)
supabase/migrations/  # Database schema
```

### Editing the copy

All marketing text for the three languages lives in [`lib/i18n.ts`](lib/i18n.ts).
Edit a string once per language and it updates everywhere.

---

## Roadmap idea: gamification (not yet implemented)

A "request a product" feature where visitors vote on what we should import next,
with a live leaderboard of the most-requested product. See the notes shared with
the brief — it's a strong fit for boosting engagement and gathering richer
demand signals, recommended as a fast-follow after the basic waitlist validates.
