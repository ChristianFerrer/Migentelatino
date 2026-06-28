"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "./LocaleProvider";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur transition hover:border-grape/50 hover:bg-white/15"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
      >
        <span aria-hidden>{LOCALE_LABELS[locale].flag}</span>
        <span className="uppercase">{locale}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" className={`transition ${open ? "rotate-180" : ""}`}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-white/15 bg-surface p-1 shadow-soft"
        >
          {LOCALES.map((l: Locale) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  l === locale ? "bg-grape/20 text-white" : "text-lavender hover:bg-white/10 hover:text-white"
                }`}
              >
                <span aria-hidden>{LOCALE_LABELS[l].flag}</span>
                {LOCALE_LABELS[l].name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
