"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SignupForm } from "@/components/SignupForm";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icons";
import { COUNTRIES } from "@/lib/products";

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Categories />
      <PopularByCountry />
      <Footer />
    </main>
  );
}

/* ───────────────────────── Nav ───────────────────────── */
function Nav() {
  const { t } = useLocale();
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" aria-label="Mi Gente Latino home">
          <Logo className="text-lg" />
        </a>
        <div className="flex items-center gap-3">
          <a
            href="#products"
            className="hidden text-sm font-semibold text-ink-soft transition hover:text-ink sm:inline-block"
          >
            {t.nav.product}
          </a>
          <LanguageSwitcher />
          <a
            href="#join"
            className="hidden rounded-full bg-mint px-4 py-2 text-sm font-bold text-white shadow-glow-cool transition hover:-translate-y-0.5 hover:bg-mint-600 sm:inline-block"
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
  const chipDots = ["bg-coral", "bg-mint", "bg-sun"];
  return (
    <section id="top" className="dotted relative">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-sun/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-mint/20 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div className="animate-fade-up">
          <span className="chip-gradient inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-white shadow-glow-cool">
            {t.hero.badge}
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {t.hero.title1}
            <br />
            <span className="bg-gradient-to-r from-coral via-[#FB7A2E] to-sun bg-clip-text pb-1 text-transparent">
              {t.hero.title2}
            </span>
          </h1>
          <p className="mt-5 max-w-md text-lg font-medium text-ink-soft">{t.hero.subtitle}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {t.hero.chips.map((chip, i) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink/10 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink"
              >
                <span className={`h-2.5 w-2.5 rounded-full ${chipDots[i % 3]}`} aria-hidden />
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-7 max-w-md" id="join">
            <SignupForm source="hero" placeholder={t.hero.emailPlaceholder} cta={t.hero.cta} />
            <p className="mt-2.5 px-2 text-sm font-medium text-ink-soft/80">🔒 {t.hero.privacy}</p>
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
    { icon: "bottle", c: "bg-grape", d: "0.8s" },
    { icon: "can", c: "bg-coral", d: "1.6s" },
    { icon: "jar", c: "bg-sun", d: "0.4s" },
    { icon: "coffee", c: "bg-grape", d: "1.2s" },
    { icon: "cookies", c: "bg-mint", d: "2s" },
  ];
  return (
    <div className="mx-auto aspect-square w-full max-w-md rounded-[2rem] border-2 border-ink/10 bg-white p-4 shadow-soft">
      <div className="grid h-full grid-cols-2 gap-4">
        {tiles.map((tile, i) => (
          <div key={i} className={`grid place-items-center rounded-2xl ${tile.c}`}>
            <span
              className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-soft animate-float-slow"
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
  const items = [...t.marquee, ...t.marquee];
  return (
    <div className="border-y-2 border-ink bg-ink py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap px-5">
        {items.map((word, i) => (
          <span key={i} className="flex items-center gap-10 text-lg font-bold uppercase tracking-wide text-sun">
            {word}
            <span className="text-mint" aria-hidden>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Categories ───────────────────────── */
function Categories() {
  const { t } = useLocale();
  return (
    <section id="products" className="mx-auto max-w-6xl px-5 py-16">
      <h2 className="text-center font-display text-3xl font-bold text-ink sm:text-4xl">
        {t.categories.title}
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {t.categories.items.map((item, i) => (
          <div
            key={i}
            className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-ink/10 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-coral/40 hover:shadow-soft"
          >
            <span className="grid h-16 w-16 place-items-center transition group-hover:scale-110">
              <Icon name={item.icon} className="h-12 w-12" />
            </span>
            <span className="text-sm font-bold text-ink">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────── Popular products by country ──────────────────── */
function PopularByCountry() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const country = COUNTRIES[active];
  const tints = ["bg-sun-100", "bg-mint-100", "bg-coral-50", "bg-grape-100", "bg-sun-100"];

  return (
    <section className="border-t border-ink/10 bg-white/60 py-16">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-center font-display text-3xl font-bold text-ink sm:text-4xl">
          {t.popular.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-ink-soft">{t.popular.subtitle}</p>

        {/* Country tabs */}
        <div role="tablist" aria-label={t.popular.hint} className="mt-8 flex flex-wrap justify-center gap-2">
          {COUNTRIES.map((c, i) => (
            <button
              key={c.key}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                active === i
                  ? "bg-ink text-white shadow-soft"
                  : "border-2 border-ink/10 bg-white text-ink hover:border-coral/40"
              }`}
            >
              <span className="text-base" aria-hidden>{c.flag}</span>
              {t.popular.countries[c.key]}
            </button>
          ))}
        </div>

        {/* Product cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {country.products.map((p, idx) => (
            <div
              key={p.name}
              className="flex flex-col items-center gap-3 rounded-2xl border-2 border-ink/10 bg-white p-5 text-center transition hover:-translate-y-1 hover:shadow-soft"
            >
              <span className={`grid h-20 w-20 place-items-center rounded-2xl ${tints[idx % tints.length]}`}>
                <Icon name={p.pack} className="h-12 w-12" />
              </span>
              <span className="text-sm font-bold leading-tight text-ink">{p.name}</span>
              <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                {t.popular.packs[p.pack]}
              </span>
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
    <footer className="border-t-2 border-ink/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Logo className="text-base" />
          <p className="mt-2 text-sm font-medium text-ink-soft">{t.footer.tagline}</p>
        </div>
        <div className="text-sm font-medium text-ink-soft/70">
          <p>© {year} Mi Gente Latino. {t.footer.rights}</p>
          <p className="mt-1">{t.footer.madeWith} 🌶️</p>
        </div>
      </div>
    </footer>
  );
}
