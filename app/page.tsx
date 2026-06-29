"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/components/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SignupForm } from "@/components/SignupForm";
import { Logo } from "@/components/Logo";
import { Flag } from "@/components/Flags";
import { ProductImage } from "@/components/ProductImage";
import { COUNTRIES } from "@/lib/products";

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <RankingByCountry />
      <Footer />
    </main>
  );
}

/* ───────────────────────── Nav ───────────────────────── */
function Nav() {
  const { t } = useLocale();
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-2 pl-6 pr-5 sm:pl-8">
        <a href="#top" aria-label="Mi Gente Latino home">
          <Logo className="h-20" />
        </a>
        <div className="flex items-center gap-4">
          <a
            href="#popular"
            className="hidden text-sm font-medium text-ink/70 transition hover:text-ink sm:inline-block"
          >
            {t.nav.product}
          </a>
          <LanguageSwitcher />
          <a
            href="#join"
            className="hidden rounded-full bg-ink px-5 py-2 text-sm font-semibold text-cream transition hover:opacity-90 sm:inline-block"
          >
            {t.nav.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ───────────────────────── Hero ───────────────────────── */
function Hero() {
  const { t } = useLocale();
  return (
    <section id="top" className="relative overflow-hidden">

      {/* Full-bleed product poster + the localized question overlaid on the teal center */}
      <div className="relative w-full [container-type:inline-size]">
        <Image
          src="/hero-bg.webp"
          alt=""
          width={1344}
          height={896}
          priority
          sizes="100vw"
          className="block h-auto w-full"
        />
        <div className="absolute inset-x-[6%] inset-y-[8%] flex flex-col items-center justify-center text-center [text-shadow:0_3px_14px_rgba(10,40,35,0.5)]">
          <h1 className="leading-[0.84] text-cream">
            <span className="block -rotate-1 font-display uppercase tracking-tight text-[clamp(2rem,16cqw,9rem)]">
              {t.hero.title1}
            </span>
            <span className="mt-1 block rotate-2 font-script text-sun text-[clamp(2.1rem,17cqw,9.5rem)] leading-[1.05]">
              {t.hero.title2}
            </span>
          </h1>
        </div>
      </div>

      {/* Image orange continues ~5px, then a soft orange→pink gradient */}
      <div className="relative z-10 bg-[linear-gradient(180deg,#D24702_0px,#D24702_5px,#E8567B_100%)]">
        <div className="mx-auto max-w-2xl px-6 pb-16 pt-6 text-center md:pb-20">
          <p className="mx-auto max-w-md text-sm font-light leading-relaxed text-white [text-shadow:0_1px_4px_rgba(45,12,0,0.85)] sm:text-base">
            {t.hero.subtitle}
          </p>

          <div id="join" className="mx-auto mt-7 max-w-2xl">
            <SignupForm source="hero" cta={t.hero.cta} />
            <p className="mt-3 text-sm font-medium text-white [text-shadow:0_1px_4px_rgba(45,12,0,0.85)]">🔒 {t.hero.privacy}</p>
          </div>
        </div>
      </div>

    </section>
  );
}

/* ───────────────────────── Marquee ───────────────────────── */
function Marquee() {
  const { t } = useLocale();
  const items = [...COUNTRIES, ...COUNTRIES];
  return (
    <div className="relative bg-mint py-3.5">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay" aria-hidden />
      <div className="relative flex w-max animate-marquee items-center gap-10 whitespace-nowrap px-5">
        {items.map((c, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg uppercase tracking-wide text-cream/95">
            <span className="flex items-center gap-2.5">
              <Flag code={c.key} className="h-5 w-[30px] rounded shadow-sm" />
              {t.popular.countries[c.key]}
            </span>
            <span className="text-cream/40" aria-hidden>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────── Ranking by country ──────────────────── */
function RankingByCountry() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const country = COUNTRIES[active];
  const ranked = [...country.products].sort((a, b) => b.votes - a.votes);
  const maxVotes = ranked[0].votes;

  const badge = (i: number) =>
    i === 0 ? "bg-sun text-ink" : i === 1 ? "bg-mint text-cream" : i === 2 ? "bg-grape text-cream" : "bg-ink/10 text-ink";

  return (
    <section id="popular" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center font-display text-4xl uppercase tracking-tight text-ink sm:text-6xl">
          {t.popular.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-ink/70">{t.popular.subtitle}</p>

        {/* Big country flag cards */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {COUNTRIES.map((c, i) => (
            <button
              key={c.key}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`flex flex-col items-center gap-3 rounded-3xl border-2 bg-surface p-5 transition ${
                active === i
                  ? "border-coral shadow-soft -translate-y-0.5"
                  : "border-ink/5 shadow-card hover:-translate-y-0.5 hover:border-coral/40"
              }`}
            >
              <Flag code={c.key} className="h-14 w-[84px] rounded-lg shadow-card" />
              <span className="font-display text-xl uppercase tracking-tight text-ink">{t.popular.countries[c.key]}</span>
            </button>
          ))}
        </div>

        {/* Live ranking for the selected country */}
        <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-ink/5 bg-surface p-3 shadow-card sm:p-4">
          <ul className="divide-y divide-ink/5">
            {ranked.map((p, i) => (
              <li key={p.name} className="flex items-center gap-4 px-2 py-3 sm:px-3">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-extrabold ${badge(i)}`}>
                  {i + 1}
                </span>
                <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-cream">
                  <ProductImage product={p} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink sm:text-base">{p.name}</p>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink/5">
                    <div className="h-full rounded-full bg-coral" style={{ width: `${(p.votes / maxVotes) * 100}%` }} />
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-extrabold text-coral sm:text-base">{p.votes.toLocaleString()}</p>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-ink/45">{t.popular.votesLabel}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */
function Footer() {
  const { t } = useLocale();
  const year = 2026;
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Logo className="h-12" />
          <p className="mt-2 text-sm font-medium text-ink/70">{t.footer.tagline}</p>
        </div>
        <div className="text-sm font-medium text-ink/60">
          <p>© {year} Mi Gente Latino. {t.footer.rights}</p>
          <p className="mt-1">{t.footer.madeWith} 🌶️</p>
        </div>
      </div>
    </footer>
  );
}
