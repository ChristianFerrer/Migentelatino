"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/components/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SignupForm } from "@/components/SignupForm";
import { Logo } from "@/components/Logo";
import { Flag } from "@/components/Flags";
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
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-[5px] pl-[5px] pr-4">
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

      {/* Multicolor line (logo colors) at the start of the image */}
      <div className="logo-line h-1 w-full" />

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

      {/* Multicolor line (logo colors) at the end of the image */}
      <div className="logo-line h-1 w-full" />

      {/* Orange → pink (#fd79a8) gradient */}
      <div className="relative z-10 bg-[linear-gradient(180deg,#D24702_0px,#D24702_6px,#fd79a8_100%)]">
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
  const [pulse, setPulse] = useState(-1);

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

  const max = Math.max(...votes);
  const ticks = [max, Math.round(max * 0.66), Math.round(max * 0.33), 0];
  const cols = { gridTemplateColumns: `repeat(${TOP10.length}, minmax(0, 1fr))` };

  return (
    <section id="popular" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center font-display text-4xl uppercase tracking-tight text-ink sm:text-5xl">
          {t.popular.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-ink/70">{t.popular.subtitle}</p>

        {/* live indicator */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide text-mint">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
          </span>
          Live
        </div>

        <div className="mt-8 overflow-x-auto rounded-3xl border border-ink/10 bg-white p-4 pt-14 shadow-card sm:p-8 sm:pt-16">
          <div className="flex min-w-[680px] gap-3">
            {/* Y axis (quantities) */}
            <div className="flex h-64 w-9 shrink-0 flex-col justify-between text-right text-[10px] font-semibold text-ink/40 sm:text-xs">
              {ticks.map((tk, i) => (
                <span key={i}>{tk.toLocaleString()}</span>
              ))}
            </div>

            {/* Plot — bars and labels share identical grids so they line up */}
            <div className="flex-1">
              <div className="grid h-64 items-end gap-3 border-b border-l border-ink/15 pl-3" style={cols}>
                {TOP10.map((b, i) => (
                  <div key={b.name} className="flex h-full items-end justify-center">
                    <div
                      className={`relative w-full max-w-[44px] rounded-t-lg transition-[height] duration-700 ease-out ${CHART_COLORS[i % CHART_COLORS.length]}`}
                      style={{ height: `${(votes[i] / max) * 100}%` }}
                    >
                      {/* Flag + number on top of the bar */}
                      <div className="absolute inset-x-0 -top-11 flex flex-col items-center gap-1">
                        <Flag code={b.country} className="h-4 w-6 rounded shadow-sm" />
                        <span
                          className={`text-[11px] font-extrabold leading-none text-ink transition-transform ${
                            pulse === i ? "scale-125" : "scale-100"
                          }`}
                        >
                          {votes[i].toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* X axis (product) */}
              <div className="grid gap-3 pl-3" style={cols}>
                {TOP10.map((b) => (
                  <span
                    key={b.name}
                    className="px-0.5 pt-2 text-center text-[10px] font-semibold leading-tight text-ink/70"
                  >
                    {b.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
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
