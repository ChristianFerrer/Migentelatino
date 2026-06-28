"use client";

import { useLocale } from "@/components/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SignupForm } from "@/components/SignupForm";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icons";

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Categories />
      <Footer />
    </main>
  );
}

/* ───────────────────────── Nav ───────────────────────── */
function Nav() {
  const { t } = useLocale();
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-cream/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" aria-label="Mi Gente Latino home">
          <Logo className="text-lg" />
        </a>
        <div className="flex items-center gap-3">
          <a
            href="#products"
            className="hidden text-sm font-bold text-ink transition hover:opacity-70 sm:inline-block"
          >
            {t.nav.product}
          </a>
          <LanguageSwitcher />
          <a
            href="#join"
            className="hidden rounded-full border-2 border-ink bg-sun px-4 py-2 text-sm font-extrabold text-ink shadow-brutalsm transition hover:-translate-y-0.5 sm:inline-block"
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
  const chipDots = ["bg-coral", "bg-mint", "bg-grape"];
  return (
    <section id="top" className="dotted relative">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-sun px-4 py-1.5 text-sm font-extrabold text-ink shadow-brutalsm">
            {t.hero.badge}
          </span>
          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {t.hero.title1}
            <br />
            <span className="text-white" style={{ WebkitTextStroke: "2px #141414" }}>
              {t.hero.title2}
            </span>
          </h1>
          <p className="mt-5 max-w-md text-lg font-medium text-ink">{t.hero.subtitle}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {t.hero.chips.map((chip, i) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3.5 py-1.5 text-sm font-bold text-ink"
              >
                <span className={`h-2.5 w-2.5 rounded-full ${chipDots[i % 3]}`} aria-hidden />
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-7 max-w-md" id="join">
            <SignupForm source="hero" placeholder={t.hero.emailPlaceholder} cta={t.hero.cta} />
            <p className="mt-2.5 px-2 text-sm font-semibold text-ink/70">🔒 {t.hero.privacy}</p>
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
    { icon: "grocery", c: "bg-sun", d: "0s" },
    { icon: "drink", c: "bg-mint", d: "0.8s" },
    { icon: "snack", c: "bg-coral", d: "1.6s" },
    { icon: "spice", c: "bg-grape", d: "0.4s" },
    { icon: "fresh", c: "bg-mint", d: "1.2s" },
    { icon: "frozen", c: "bg-sun", d: "2s" },
  ];
  return (
    <div className="mx-auto aspect-square w-full max-w-md rounded-[2rem] border-4 border-ink bg-white p-4 shadow-brutal">
      <div className="grid h-full grid-cols-2 gap-4">
        {tiles.map((tile, i) => (
          <div
            key={i}
            className={`grid place-items-center rounded-2xl border-2 border-ink ${tile.c}`}
          >
            <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-ink bg-white animate-float-slow" style={{ animationDelay: tile.d }}>
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
          <span key={i} className="flex items-center gap-10 text-lg font-extrabold uppercase tracking-wide text-sun">
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
      <h2 className="text-center font-display text-3xl font-extrabold text-white sm:text-4xl" style={{ WebkitTextStroke: "1.5px #141414" }}>
        {t.categories.title}
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {t.categories.items.map((item, i) => (
          <div
            key={i}
            className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-ink bg-white p-5 text-center shadow-brutalsm transition hover:-translate-y-1 hover:shadow-brutal"
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

/* ───────────────────────── Footer ───────────────────────── */
function Footer() {
  const { t } = useLocale();
  const year = 2026;
  return (
    <footer className="border-t-2 border-ink bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Logo className="text-base" />
          <p className="mt-2 text-sm font-medium text-ink">{t.footer.tagline}</p>
        </div>
        <div className="text-sm font-medium text-ink/70">
          <p>© {year} Mi Gente Latino. {t.footer.rights}</p>
          <p className="mt-1">{t.footer.madeWith} 🌶️</p>
        </div>
      </div>
    </footer>
  );
}
