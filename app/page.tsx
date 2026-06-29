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
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="#top" aria-label="Mi Gente Latino home">
          <Logo className="text-lg" />
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
    <section id="top" className="relative overflow-hidden bg-coral">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-10 text-center md:pb-20 md:pt-14">
        {/* Product poster as background + the localized question overlaid on the teal center */}
        <div className="relative mx-auto w-full max-w-2xl [container-type:inline-size]">
          <Image
            src="/hero-bg.webp"
            alt=""
            width={1344}
            height={896}
            priority
            sizes="(max-width: 768px) 100vw, 672px"
            className="w-full rounded-3xl shadow-soft"
          />
          <div className="absolute inset-x-[19%] inset-y-[23%] flex items-center justify-center text-center">
            <h1 className="font-display uppercase leading-[0.9] tracking-tight text-cream [text-shadow:0_2px_10px_rgba(10,40,35,0.45)] text-[8cqw]">
              {t.hero.title1} <span className="text-sun">{t.hero.title2}</span>
            </h1>
          </div>
        </div>
        <p className="mx-auto mt-7 max-w-xl text-lg font-medium leading-relaxed text-cream/90">
          {t.hero.subtitle}
        </p>

        <div id="join" className="mx-auto mt-8 max-w-2xl">
          <SignupForm source="hero" cta={t.hero.cta} />
          <p className="mt-3 text-sm font-medium text-cream/80">🔒 {t.hero.privacy}</p>
        </div>
      </div>

      {/* Torn cream edge into the next section */}
      <svg className="absolute inset-x-0 bottom-0 z-10 h-6 w-full text-cream sm:h-8" viewBox="0 0 1200 30" preserveAspectRatio="none" fill="currentColor" aria-hidden>
        <path d="M0,20 C100,6 200,30 300,17 C400,5 500,29 600,16 C700,6 800,30 900,16 C1000,6 1100,27 1200,15 L1200,31 L0,31 Z" />
      </svg>
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
    <footer className="relative bg-mint pt-10">
      {/* Torn top edge */}
      <svg className="absolute inset-x-0 top-0 h-6 w-full -translate-y-[99%] text-mint sm:h-8" viewBox="0 0 1200 30" preserveAspectRatio="none" fill="currentColor" aria-hidden>
        <path d="M0,16 C100,28 200,4 300,16 C400,28 500,6 600,17 C700,28 800,5 900,16 C1000,28 1100,8 1200,18 L1200,31 L0,31 Z" />
      </svg>
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay" aria-hidden />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 pb-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Logo className="text-base" light />
          <p className="mt-2 text-sm font-medium text-cream/80">{t.footer.tagline}</p>
        </div>
        <div className="text-sm font-medium text-cream/70">
          <p>© {year} Mi Gente Latino. {t.footer.rights}</p>
          <p className="mt-1">{t.footer.madeWith} 🌶️</p>
        </div>
      </div>
    </footer>
  );
}
