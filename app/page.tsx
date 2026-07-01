"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/components/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SignupForm } from "@/components/SignupForm";
import { Logo } from "@/components/Logo";
import { Flag } from "@/components/Flags";
import { COUNTRIES } from "@/lib/products";
import type { Locale } from "@/lib/i18n";
import { track } from "@/lib/track";

/* Per-language hero sizing so the overlaid question always fits the box.
   Longer languages (DE/EN) get a smaller cap than the short ES/PT. */
const HERO_SIZE: Record<Locale, { t1: string; t2: string }> = {
  es: { t1: "text-[clamp(1.9rem,15cqw,8.4rem)]", t2: "text-[clamp(2rem,16cqw,9rem)]" },
  pt: { t1: "text-[clamp(1.55rem,12.2cqw,6.8rem)]", t2: "text-[clamp(1.7rem,13.6cqw,7.6rem)]" },
  en: { t1: "text-[clamp(1.45rem,11.2cqw,6.2rem)]", t2: "text-[clamp(1.6rem,12.8cqw,7rem)]" },
  de: { t1: "text-[clamp(1.15rem,8.9cqw,4.9rem)]", t2: "text-[clamp(1.45rem,11.5cqw,6.3rem)]" },
};

export default function Page() {
  const { locale } = useLocale();
  useEffect(() => {
    track("pageview", { locale });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
        <a href="#top" aria-label="Mi Gente Latino home" className="block leading-none">
          <Logo className="h-11" />
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
  const { t, locale } = useLocale();
  const size = HERO_SIZE[locale];
  return (
    <section id="top" className="relative overflow-hidden">

      {/* Multicolor line (logo colors) at the start of the image */}
      <div className="logo-line h-[5px] w-full" />

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
            <span className={`block -rotate-1 text-balance font-display uppercase tracking-tight ${size.t1}`}>
              {t.hero.title1}
            </span>
            <span className={`mt-1 block rotate-2 text-balance font-script leading-[1.05] text-sun ${size.t2}`}>
              {t.hero.title2}
            </span>
          </h1>
        </div>
      </div>

      {/* Multicolor line (logo colors) at the end of the image */}
      <div className="logo-line h-[5px] w-full" />

      {/* #e17055 → pink (#fd79a8) gradient */}
      <div className="relative z-10 bg-[linear-gradient(180deg,#e17055_0%,#fd79a8_100%)]">
        <div className="mx-auto max-w-2xl px-6 pb-16 pt-6 text-center md:pb-20">
          <p className="mx-auto max-w-md text-sm font-light leading-relaxed text-white [text-shadow:0_1px_4px_rgba(45,12,0,0.85)] sm:text-base">
            {t.hero.subtitle}
          </p>

          <div id="join" className="mx-auto mt-7 max-w-2xl">
            <SignupForm source="hero" cta={t.hero.cta} />
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

/* ──────────────────── Most-requested chart (Top 10, live) ──────────────────── */
const TOP10 = COUNTRIES.flatMap((c) =>
  c.products.map((p) => ({ country: c.key, name: p.name, votes: p.votes }))
)
  .sort((a, b) => b.votes - a.votes)
  .slice(0, 10);

const CHART_COLORS = ["bg-coral", "bg-grape", "bg-mint", "bg-sun", "bg-olive"];

function RankingByCountry() {
  const { t } = useLocale();
  const [votes, setVotes] = useState<number[]>(TOP10.map((b) => b.votes));
  const [realCounts, setRealCounts] = useState<Record<string, number>>({});
  const [pulse, setPulse] = useState(-1);

  // Overlay real, normalized demand from the database (grouped by canonical
  // product) on top of the seed baseline. Different spellings already count
  // together server-side, so each product is a single bar here.
  useEffect(() => {
    fetch("/api/ranking")
      .then((r) => r.json())
      .then((d) => setRealCounts(d?.counts ?? {}))
      .catch(() => {});
  }, []);

  // Simulate live voting: every ~1.8s a random product gets a few votes.
  useEffect(() => {
    const id = setInterval(() => {
      const i = Math.floor(Math.random() * TOP10.length);
      setVotes((prev) => {
        const next = [...prev];
        next[i] += 1 + Math.floor(Math.random() * 4);
        return next;
      });
      setPulse(i);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  // Displayed value = seed baseline + live simulation + real DB demand.
  const display = votes.map((v, i) => v + (realCounts[TOP10[i].name] ?? 0));
  const max = Math.max(...display);
  const total = display.reduce((a, b) => a + b, 0);

  return (
    <section id="popular" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-center font-display text-4xl uppercase tracking-tight text-ink sm:text-5xl">
          {t.popular.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-ink/70">{t.popular.subtitle}</p>

        {/* Live dot/word beside the total-votes counter (top-right) */}
        <div className="mt-6 flex items-end justify-end gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-red-600">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-80" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
            Live
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-wide text-ink/45">
              {t.popular.votesLabel}
            </div>
            <div className="font-display text-2xl leading-none tabular-nums text-ink sm:text-3xl">
              {total.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Full-width horizontal bar chart — no borders */}
        <div className="mt-8 space-y-2.5 sm:space-y-3">
          {TOP10.map((b, i) => (
            <div key={b.name} className="flex items-center gap-3">
              {/* Product name (y-axis) */}
              <span className="w-24 shrink-0 text-right text-[11px] font-semibold leading-tight text-ink/70 sm:w-36 sm:text-xs">
                {b.name}
              </span>
              {/* Horizontal bar with flag + number at its tip */}
              <div className="h-7 flex-1 sm:h-8">
                <div
                  className={`flex h-full items-center justify-end gap-1.5 rounded-r-md pr-2 transition-[width] duration-700 ease-out ${CHART_COLORS[i % CHART_COLORS.length]}`}
                  style={{ width: `${(display[i] / max) * 100}%` }}
                >
                  <Flag code={b.country} className="h-3.5 w-5 shrink-0 rounded shadow-sm" />
                  <span
                    className={`text-[11px] font-extrabold leading-none text-white transition-transform [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] ${
                      pulse === i ? "scale-125" : "scale-100"
                    }`}
                  >
                    {display[i].toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Top 10 caption below the chart */}
          <p className="pt-4 text-center text-xs font-bold uppercase tracking-wide text-ink/55 sm:text-sm">
            {t.popular.top10}
          </p>
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
          <Logo className="h-9" />
          <p className="mt-2 text-sm font-medium text-ink/70">{t.footer.tagline}</p>
        </div>
        <div className="text-sm font-medium text-ink/60">
          <p>© {year} Mi Gente Latino. {t.footer.rights}</p>
          <p className="mt-1">{t.footer.madeWith} 🌶️</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-semibold text-ink/40 sm:justify-start">
            <a href="/privacidad" className="transition hover:text-ink/70">{t.legal.privacy}</a>
            <a href="/aviso-legal" className="transition hover:text-ink/70">{t.legal.imprint}</a>
            <a href="/crm" className="transition hover:text-ink/70">{t.footer.crm} →</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
