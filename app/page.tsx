"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/components/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SignupForm, type ResolvedProduct } from "@/components/SignupForm";
import { Logo } from "@/components/Logo";
import { Flag, OriginFlag } from "@/components/Flags";
import { COUNTRIES, type CountryKey } from "@/lib/products";
import { CATALOG } from "@/lib/catalog";
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
  // The product the visitor just submitted — used to point them to their
  // spot in the ranking (or tell them it's under review).
  const [mine, setMine] = useState<ResolvedProduct | null>(null);
  useEffect(() => {
    track("pageview", { locale });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero onResolved={setMine} />
      <Marquee />
      <RankingByCountry mine={mine} />
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
function Hero({ onResolved }: { onResolved: (r: ResolvedProduct) => void }) {
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
        <div className="absolute inset-x-[6%] inset-y-[8%] flex flex-col items-center justify-center text-center">
          <h1 className="leading-[0.84] text-cream [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
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
          <p className="mx-auto max-w-xl text-lg text-white">
            {t.hero.subtitle}
          </p>

          <div id="join" className="mx-auto mt-7 max-w-2xl">
            <SignupForm source="hero" cta={t.hero.cta} onResolved={onResolved} />
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

/* ──────────────────── Most-requested ranking (full universe, live) ──────────────────── */

/* Seed baseline: the demo votes from products.ts, keyed by product name. */
const SEED_BY_NAME: Record<string, number> = {};
COUNTRIES.forEach((c) => c.products.forEach((p) => (SEED_BY_NAME[p.name] = p.votes)));

/* Modest, deterministic baseline for catalog products without an explicit seed
   (keeps the chart from looking lopsided; no Math.random → SSR-safe). */
function baselineFor(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return 24 + (h % 30); // ~24–53
}

/* The whole universe the ranking can show: the canonical catalog (what real
   demand is grouped by) plus its seed baseline. */
const UNIVERSE = CATALOG.map((p) => ({
  slug: p.slug,
  name: p.name,
  country: p.country as CountryKey,
  seed: SEED_BY_NAME[p.name] ?? baselineFor(p.slug),
}));

/* Logo palette (red, orange, teal, green, purple) for the chart bars. */
const CHART_COLORS = ["bg-[#e94b3b]", "bg-[#f39b2d]", "bg-[#19b4ae]", "bg-[#7fb23a]", "bg-[#a22d93]"];

const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").trim();

function RankingByCountry({ mine }: { mine: ResolvedProduct | null }) {
  const { t } = useLocale();
  const [sim, setSim] = useState<Record<string, number>>({});
  const [realCounts, setRealCounts] = useState<Record<string, number>>({});
  const [pulse, setPulse] = useState<string>("");
  const [query, setQuery] = useState("");
  const [areaW, setAreaW] = useState(0); // px width available for the bars
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Measure the bar track so we can tell when a bar is too small to hold the
  // number + flag inside (then they pop just outside its right edge).
  useEffect(() => {
    const measure = () => {
      const el = listRef.current;
      if (!el) return;
      const offset = window.innerWidth >= 640 ? 208 : 144; // rank + name cols + gaps
      setAreaW(Math.max(el.clientWidth - offset, 0));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const loadReal = () =>
    fetch("/api/ranking")
      .then((r) => r.json())
      .then((d) => setRealCounts(d?.counts ?? {}))
      .catch(() => {});

  // Real, normalized demand from the DB (different spellings already grouped).
  useEffect(() => {
    loadReal();
  }, []);

  // Live voting, kept plausible: every ~2s one product ticks up by 1, picked
  // weighted by current standing (popular ones move more — like real demand).
  useEffect(() => {
    const id = setInterval(() => {
      setSim((prev) => {
        const totals = UNIVERSE.map((u) => u.seed + (prev[u.slug] ?? 0) + (realCounts[u.name] ?? 0));
        const sum = totals.reduce((a, b) => a + b, 0);
        let r = Math.random() * sum;
        let idx = 0;
        for (let i = 0; i < totals.length; i++) {
          r -= totals[i];
          if (r <= 0) {
            idx = i;
            break;
          }
        }
        const slug = UNIVERSE[idx].slug;
        setPulse(slug);
        return { ...prev, [slug]: (prev[slug] ?? 0) + 1 };
      });
    }, 2000);
    return () => clearInterval(id);
  }, [realCounts]);

  // When the visitor submits, reflect their vote and bring them to their spot.
  const matched = !!mine && (mine.status === "auto" || mine.status === "confirmed") && !!mine.slug;
  useEffect(() => {
    if (!mine) return;
    if (matched && mine.name) {
      setRealCounts((c) => ({ ...c, [mine.name!]: (c[mine.name!] ?? 0) + 1 }));
    }
    loadReal();
    const to = setTimeout(() => {
      const target = matched && mine.slug ? rowRefs.current[mine.slug] : sectionRef.current;
      target?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 350);
    return () => clearTimeout(to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mine]);

  // Live-ranked universe (seed + simulation + real demand), plus any real
  // canonical that isn't in the static catalog.
  const known = new Set(UNIVERSE.map((u) => u.name));
  const rows: { slug: string; name: string; country: CountryKey | null; votes: number }[] = UNIVERSE.map(
    (u) => ({
      slug: u.slug,
      name: u.name,
      country: u.country,
      votes: u.seed + (sim[u.slug] ?? 0) + (realCounts[u.name] ?? 0),
    })
  );
  Object.keys(realCounts).forEach((n) => {
    if (!known.has(n)) rows.push({ slug: `x-${n}`, name: n, country: null, votes: realCounts[n] });
  });
  rows.sort((a, b) => b.votes - a.votes);
  const ranked = rows.map((r, i) => ({ ...r, rank: i + 1 }));
  const max = ranked[0]?.votes || 1;
  const total = ranked.reduce((a, b) => a + b.votes, 0);

  const q = fold(query);
  const visible = q ? ranked.filter((r) => fold(r.name).includes(q)) : ranked;
  const myRank = matched ? ranked.find((r) => r.slug === mine!.slug)?.rank : undefined;

  return (
    <section ref={sectionRef} id="popular" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-center font-display text-4xl uppercase tracking-tight text-ink sm:text-5xl">
          {t.popular.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-ink/70">{t.popular.subtitle}</p>

        {/* Post-submit banner: your rank, or "under review" if it didn't match */}
        {mine &&
          (myRank ? (
            <div className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-2 rounded-2xl bg-mint/10 px-4 py-3 text-center text-sm font-semibold text-mint-600">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint text-white">✓</span>
              <span>
                {t.popular.yourProduct}: <span className="text-ink">{mine.name}</span> — {t.popular.rankWord} #{myRank} 🎉
              </span>
            </div>
          ) : (
            <div className="mx-auto mt-6 max-w-xl rounded-2xl bg-sun/15 px-4 py-3 text-center text-sm font-medium text-ink/75">
              {t.popular.pendingReview.replace("{product}", mine.raw)}
            </div>
          ))}

        {/* Search + live total-votes counter */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <label className="relative block w-full sm:max-w-xs">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.popular.searchPlaceholder}
              className="w-full rounded-full border border-ink/10 bg-white py-2.5 pl-9 pr-4 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-[#19b4ae]/60 focus:ring-4 focus:ring-[#19b4ae]/15"
            />
          </label>
          <div className="flex items-end justify-end gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-red-600">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-80" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              Live
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-wide text-ink/45">{t.popular.votesLabel}</div>
              <div className="font-display text-2xl leading-none tabular-nums text-ink sm:text-3xl">
                {total.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable full-universe ranking */}
        <div
          ref={listRef}
          className="mt-6 max-h-[420px] space-y-2.5 overflow-y-auto pr-1 sm:max-h-[460px] sm:space-y-3"
        >
          {visible.length === 0 && <p className="py-10 text-center text-sm text-ink/50">{t.popular.noResults}</p>}
          {visible.map((b) => {
            const isMine = matched && b.slug === mine!.slug;
            // Is the bar wide enough to hold the number + flag inside it?
            const barPx = (b.votes / max) * areaW;
            const inside = areaW ? barPx >= 68 : b.votes / max >= 0.18;
            const flag = b.country ? (
              <Flag code={b.country} className="h-3.5 w-5 shrink-0 rounded shadow-sm" />
            ) : (
              <OriginFlag code="other" className="h-3.5 w-5 shrink-0 rounded shadow-sm" />
            );
            return (
              <div
                key={b.slug}
                ref={(el) => {
                  rowRefs.current[b.slug] = el;
                }}
                className={`flex items-center gap-2 rounded-lg sm:gap-3 ${
                  isMine ? "bg-mint/10 ring-2 ring-mint/50" : ""
                }`}
              >
                {/* Rank */}
                <span className="w-7 shrink-0 text-right text-xs font-bold tabular-nums text-ink/45 sm:w-9 sm:text-sm">
                  #{b.rank}
                </span>
                {/* Product name (y-axis) */}
                <span className="w-24 shrink-0 text-right text-[11px] font-semibold leading-tight text-ink/70 sm:w-36 sm:text-xs">
                  {b.name}
                </span>
                {/* Bar: number then flag (flag on the right). Both sit inside the
                    bar, or pop just outside its right edge when it's too small. */}
                <div className="flex h-7 flex-1 items-center sm:h-8">
                  <div
                    className={`flex h-full min-w-0 items-center justify-end gap-1.5 rounded-r-md pr-2 transition-[width] duration-700 ease-out ${CHART_COLORS[(b.rank - 1) % CHART_COLORS.length]}`}
                    style={{ width: `${Math.max((b.votes / max) * 100, 4)}%` }}
                  >
                    {inside && (
                      <>
                        <span
                          className={`text-[11px] font-extrabold leading-none text-white transition-transform ${
                            pulse === b.slug ? "scale-125" : "scale-100"
                          }`}
                        >
                          {b.votes.toLocaleString()}
                        </span>
                        {flag}
                      </>
                    )}
                  </div>
                  {!inside && (
                    <div className="flex shrink-0 items-center gap-1.5 pl-1.5">
                      <span
                        className={`text-[11px] font-extrabold leading-none text-ink transition-transform ${
                          pulse === b.slug ? "scale-125" : "scale-100"
                        }`}
                      >
                        {b.votes.toLocaleString()}
                      </span>
                      {flag}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Caption below the chart */}
        <p className="pt-4 text-center text-xs font-bold uppercase tracking-wide text-ink/55 sm:text-sm">
          {ranked.length} {t.popular.productsWord} · {t.popular.rankingCaption}
        </p>
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
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo flush left with its tagline beside it */}
        <div className="flex items-center gap-3">
          <Logo className="h-9" />
          <p className="text-sm font-medium text-ink/70">{t.footer.tagline}</p>
        </div>
        {/* All the extra text on one horizontal row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-semibold text-ink/50">
          <a href="/privacidad" className="transition hover:text-ink/80">{t.legal.privacy}</a>
          <a href="/aviso-legal" className="transition hover:text-ink/80">{t.legal.imprint}</a>
          <a href="/crm" className="transition hover:text-ink/80">{t.footer.crm} →</a>
          <span className="text-ink/40">© {year} Mi Gente Latino. {t.footer.rights}</span>
          <span className="text-ink/40">{t.footer.madeWith} 🌶️</span>
        </div>
      </div>
    </footer>
  );
}
