"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { type Locale, LOCALES, translations } from "@/lib/i18n";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (typeof translations)[Locale];
};

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Detect a sensible default from the saved choice or the browser language.
  useEffect(() => {
    const saved = window.localStorage.getItem("mgl-locale") as Locale | null;
    if (saved && LOCALES.includes(saved)) {
      setLocaleState(saved);
      return;
    }
    const nav = window.navigator.language.slice(0, 2).toLowerCase();
    if (LOCALES.includes(nav as Locale)) setLocaleState(nav as Locale);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("mgl-locale", l);
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<Ctx>(
    () => ({ locale, setLocale, t: translations[locale] }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
