"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SignupForm } from "@/components/SignupForm";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icons";
import { Flag } from "@/components/Flags";
import { ProductImage } from "@/components/ProductImage";
import { COUNTRIES } from "@/lib/products";

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <PopularByCountry />
      <Footer />
    </main>
  );
}

/* ───────────────────────── Nav ───────────────────────── */
function Nav() {
  const { t } = useLocale();
  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-white/50 backdrop-blur-xl">
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
            className="hidden rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90 sm:inline-block"
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
  const chipDots = ["bg-coral", "bg-sun", "bg-grape"];
  return (
    <section id="top" className="relative">
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            {t.hero.badge}
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.03] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
            {t.hero.title1}
            <br />
            <span className="bg-gradient-to-r from-sun via-coral to-grape bg-clip-text pb-1 text-transparent">
              {t.hero.title2}
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg font-normal leading-relaxed text-white/85">{t.hero.subtitle}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {t.hero.chips.map((chip, i) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur"
              >
                <span className={`h-2 w-2 rounded-full ${chipDots[i % 3]}`} aria-hidden />
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-8 max-w-xl" id="join">
            <SignupForm source="hero" cta={t.hero.cta} />
            <p className="mt-3 px-1 text-sm font-medium text-white/70">🔒 {t.hero.privacy}</p>
          </div>
        </div>

        <div className="relative hidden md:block">
          <HeroArt />
        </div>
      </div>
    </section>
  );
}

function HeroArt() {
  const tiles = [
    { icon: "grocery", c: "bg-mint", d: "0s" },
    { icon: "bottle", c: "bg-olive", d: "0.8s" },
    { icon: "can", c: "bg-coral", d: "1.6s" },
    { icon: "jar", c: "bg-sun", d: "0.4s" },
    { icon: "coffee", c: "bg-grape", d: "1.2s" },
    { icon: "cookies", c: "bg-mint", d: "2s" },
  ];
  return (
    <div className="mx-auto aspect-square w-full max-w-md rounded-[2rem] border border-white/60 bg-white/75 p-4 shadow-soft backdrop-blur-xl">
      <div className="grid h-full grid-cols-2 gap-4">
        {tiles.map((tile, i) => (
          <div key={i} className={`grid place-items-center rounded-3xl ${tile.c}`}>
            <span
              className="grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-card animate-float-slow"
              style={{ animationDelay: tile.d }}
            >
              <Icon name={tile.icon} className="h-10 w-10" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Marquee ───────────────────────── */
function Marquee() {
  const { t } = useLocale();
  const items = [...COUNTRIES, ...COUNTRIES];
  return (
    <div className="bg-grape/90 py-3.5 backdrop-blur">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap px-5">
        {items.map((c, i) => (
          <span key={i} className="flex items-center gap-10 text-base font-semibold tracking-wide text-white/95">
            <span className="flex items-center gap-2.5">
              <Flag code={c.key} className="h-5 w-[30px] rounded shadow-sm" />
              {t.popular.countries[c.key]}
            </span>
            <span className="text-white/40" aria-hidden>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────── Popular products by country ──────────────────── */
function PopularByCountry() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const country = COUNTRIES[active];

  return (
    <section id="popular" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-display text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl">
          {t.popular.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg font-normal text-ink/70">{t.popular.subtitle}</p>

        {/* Country segmented control */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label={t.popular.hint}
            className="flex flex-wrap justify-center gap-1 rounded-full border border-white/50 bg-white/50 p-1.5 backdrop-blur-xl"
          >
            {COUNTRIES.map((c, i) => (
              <button
                key={c.key}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active === i ? "bg-white text-ink shadow-card" : "text-ink/60 hover:text-ink"
                }`}
              >
                <Flag code={c.key} className="h-4 w-6 rounded-[3px]" />
                {t.popular.countries[c.key]}
              </button>
            ))}
          </div>
        </div>

        {/* Product cards */}
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {country.products.map((p) => (
            <div
              key={p.name}
              className="flex flex-col items-center gap-4 rounded-3xl border border-ink/5 bg-white p-6 text-center shadow-card transition hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-ink/[0.04]">
                <ProductImage product={p} />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight text-ink">{p.name}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink/45">
                  {t.popular.packs[p.pack]}
                </p>
              </div>
            </div>
          ))}
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
    <footer className="border-t border-white/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Logo className="text-base" />
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
