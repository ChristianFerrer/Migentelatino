"use client";

import { useState } from "react";
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
      <Values />
      <HowItWorks />
      <FinalCta />
      <Faq />
      <Footer />
    </main>
  );
}

/* ───────────────────────── Nav ───────────────────────── */
function Nav() {
  const { t } = useLocale();
  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" aria-label="Mi Gente Latino home">
          <Logo className="text-lg" />
        </a>
        <div className="hidden items-center gap-7 text-sm font-semibold text-ink-soft md:flex">
          <a href="#products" className="transition hover:text-coral">{t.nav.product}</a>
          <a href="#how" className="transition hover:text-coral">{t.nav.how}</a>
          <a href="#faq" className="transition hover:text-coral">{t.nav.faq}</a>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#join"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-ink-soft sm:inline-block"
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
    <section id="top" className="dotted relative">
      <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-sun/30 blur-3xl" aria-hidden />
      <div className="absolute -right-20 top-40 h-72 w-72 rounded-full bg-grape/20 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-coral/20 bg-coral-50 px-4 py-1.5 text-sm font-semibold text-coral-600">
            {t.hero.badge}
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            {t.hero.title1}
            <br />
            <span className="bg-gradient-to-r from-coral via-sun to-mint bg-clip-text text-transparent">
              {t.hero.title2}
            </span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink-soft">{t.hero.subtitle}</p>
          <div className="mt-7 max-w-md" id="join">
            <SignupForm source="hero" placeholder={t.hero.emailPlaceholder} cta={t.hero.cta} />
            <p className="mt-2.5 px-2 text-sm text-ink-soft/80">🔒 {t.hero.privacy}</p>
          </div>
          <p className="mt-6 text-sm font-medium text-ink-soft">{t.hero.socialProof}</p>
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
    { icon: "grocery", c: "bg-coral-50", d: "0s" },
    { icon: "drink", c: "bg-mint-100", d: "0.8s" },
    { icon: "snack", c: "bg-sun-100", d: "1.6s" },
    { icon: "spice", c: "bg-grape-100", d: "0.4s" },
    { icon: "fresh", c: "bg-mint-100", d: "1.2s" },
    { icon: "frozen", c: "bg-coral-50", d: "2s" },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-6 rounded-[3rem] bg-gradient-to-br from-coral via-sun to-mint opacity-90 shadow-glow" />
      <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4">
        {tiles.map((tile, i) => (
          <div
            key={i}
            className={`grid place-items-center rounded-3xl ${tile.c} shadow-soft animate-float-slow`}
            style={{ animationDelay: tile.d }}
          >
            <Icon name={tile.icon} className="h-16 w-16" />
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
    <div className="border-y border-ink/5 bg-ink py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap px-5">
        {items.map((word, i) => (
          <span key={i} className="flex items-center gap-10 text-lg font-bold text-cream/90">
            {word}
            <span className="text-coral" aria-hidden>✦</span>
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
    <section id="products" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading title={t.categories.title} subtitle={t.categories.subtitle} />
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {t.categories.items.map((item, i) => (
          <div
            key={i}
            className="group flex flex-col items-center gap-3 rounded-3xl border border-ink/5 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
          >
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-cream transition group-hover:scale-110">
              <Icon name={item.icon} className="h-10 w-10" />
            </span>
            <span className="text-sm font-semibold text-ink">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Values ───────────────────────── */
function Values() {
  const { t } = useLocale();
  const accents = ["bg-coral-50", "bg-mint-100", "bg-sun-100"];
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading title={t.value.title} subtitle={t.value.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.value.items.map((item, i) => (
            <div key={i} className="rounded-4xl border border-ink/5 bg-cream p-8 shadow-sm">
              <span className={`grid h-16 w-16 place-items-center rounded-2xl ${accents[i % 3]}`}>
                <Icon name={item.icon} className="h-10 w-10" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-ink-soft">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── How it works ───────────────────────── */
function HowItWorks() {
  const { t } = useLocale();
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading title={t.how.title} subtitle={t.how.subtitle} />
      <div className="relative mt-12 grid gap-6 md:grid-cols-3">
        <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-gradient-to-r from-coral via-sun to-mint md:block" aria-hidden />
        {t.how.steps.map((step, i) => (
          <div key={i} className="relative flex flex-col items-center rounded-4xl bg-white p-8 text-center shadow-sm">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-cream ring-8 ring-white">
              <Icon name={step.icon} className="h-11 w-11" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Final CTA ───────────────────────── */
function FinalCta() {
  const { t } = useLocale();
  return (
    <section className="px-5 py-12">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-coral via-coral-600 to-grape px-6 py-14 text-center shadow-glow sm:px-12">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-sun/30 blur-2xl" aria-hidden />
        <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-mint/30 blur-2xl" aria-hidden />
        <div className="relative">
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">{t.signup.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-white/90">{t.signup.subtitle}</p>
          <div className="mx-auto mt-8 max-w-lg">
            <SignupForm source="final-cta" variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */
function Faq() {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
      <SectionHeading title={t.faq.title} />
      <div className="mt-10 space-y-3">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display text-base font-bold text-ink">{item.q}</span>
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-coral-50 text-coral transition ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              {isOpen && <p className="px-6 pb-5 text-ink-soft">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */
function Footer() {
  const { t } = useLocale();
  const year = 2026;
  return (
    <footer className="border-t border-ink/5 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Logo className="text-base" />
          <p className="mt-2 text-sm text-ink-soft">{t.footer.tagline}</p>
        </div>
        <div className="text-sm text-ink-soft/80">
          <p>© {year} Mi Gente Latino. {t.footer.rights}</p>
          <p className="mt-1">{t.footer.madeWith} 🌮</p>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── Shared ───────────────────────── */
function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-ink-soft">{subtitle}</p>}
    </div>
  );
}
