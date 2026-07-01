"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "./LocaleProvider";
import { OriginFlag } from "./Flags";
import { track } from "@/lib/track";

type Status = "idle" | "loading" | "success" | "error";

const EXTRA_COUNTRIES = ["Chile", "Ecuador", "Bolivia", "Uruguay", "Paraguay"];

/* Flag code per extra country (the six main ones use their CountryKey directly). */
const EXTRA_CODES: Record<string, string> = {
  Chile: "cl",
  Ecuador: "ec",
  Bolivia: "bo",
  Uruguay: "uy",
  Paraguay: "py",
};

type CountryOption = { value: string; label: string; code: string };

export function SignupForm({ source, cta }: { source: string; cta?: string }) {
  const { t, locale } = useLocale();
  const [form, setForm] = useState({ missed: "", name: "", phone: "", country: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const started = useRef(false);

  // Country options, each carrying a flag code for the custom picker.
  const countryOptions: CountryOption[] = [
    ...(Object.keys(t.popular.countries) as (keyof typeof t.popular.countries)[]).map((k) => ({
      value: t.popular.countries[k],
      label: t.popular.countries[k],
      code: k as string,
    })),
    ...EXTRA_COUNTRIES.map((c) => ({ value: c, label: c, code: EXTRA_CODES[c] })),
    { value: t.signup.countryOther, label: t.signup.countryOther, code: "other" },
  ];

  // Fire form_view once when the form scrolls into view.
  useEffect(() => {
    const el = formRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          track("form_view", { locale });
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [locale]);

  function onFirstInteraction() {
    if (started.current) return;
    started.current = true;
    track("form_start", { locale });
  }

  function update(field: keyof typeof form, value: string) {
    onFirstInteraction();
    setForm((f) => ({ ...f, [field]: value }));
    if (status === "error") setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.missed.trim() || !form.name.trim() || form.phone.trim().length < 6 || !form.country) {
      setStatus("error");
      setMessage(t.signup.errorRequired);
      track("form_error", { locale });
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          missed_product: form.missed.trim(),
          name: form.name.trim(),
          phone: form.phone.trim(),
          country: form.country,
          locale,
          source,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(t.signup.success);
        setForm({ missed: "", name: "", phone: "", country: "" });
        track("form_submit", { locale });
      } else {
        setStatus("error");
        setMessage(t.signup.errorGeneric);
        track("form_error", { locale });
      }
    } catch {
      setStatus("error");
      setMessage(t.signup.errorGeneric);
      track("form_error", { locale });
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl border border-mint/30 bg-mint-100 px-5 py-4 text-base font-semibold text-mint-600 shadow-card"
        role="status"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mint font-bold text-white">✓</span>
        {message}
      </div>
    );
  }

  // One shared style so every field has the same font family, size and weight.
  const fieldClass =
    "w-full rounded-xl bg-white/20 px-4 py-3.5 text-base font-medium text-white outline-none transition placeholder:font-light placeholder:text-white/70 focus:bg-white/30 focus:ring-4 focus:ring-white/25";

  return (
    <form ref={formRef} onSubmit={handleSubmit} onFocusCapture={onFirstInteraction} className="w-full" noValidate>
      {/* Big "missed product" field — the headline question's answer */}
      <input
        type="text"
        value={form.missed}
        onChange={(e) => update("missed", e.target.value)}
        placeholder={t.signup.missedPlaceholder}
        maxLength={120}
        aria-label={t.signup.missedLabel}
        className={fieldClass}
      />

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <input
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder={t.signup.namePlaceholder}
          aria-label={t.signup.namePlaceholder}
          className={fieldClass}
        />
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder={t.signup.phonePlaceholder}
          aria-label={t.signup.phonePlaceholder}
          className={fieldClass}
        />
        <CountrySelect
          value={form.country}
          options={countryOptions}
          placeholder={t.signup.countryPlaceholder}
          onChange={(v) => update("country", v)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(180deg,#81ecec,#00cec9)] px-7 py-4 text-base font-bold text-white shadow-card transition hover:brightness-[1.04] active:scale-[0.99] disabled:opacity-70"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {status === "loading" ? t.signup.sending : cta ?? t.signup.cta}
      </button>

      {status === "error" && <p className="mt-2 px-1 text-sm font-semibold text-grape-600">{message}</p>}

      <p className="mt-3 px-1 text-center text-[11px] leading-snug text-white/90">
        {t.legal.formNotice}{" "}
        <a href="/privacidad" className="font-semibold underline">
          {t.legal.privacy}
        </a>
      </p>
    </form>
  );
}

/* Country-of-origin picker with SVG flag icons (native <select> can't render SVG),
   styled to match the translucent form fields. */
function CountrySelect({
  value,
  options,
  placeholder,
  onChange,
}: {
  value: string;
  options: CountryOption[];
  placeholder: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

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
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={placeholder}
        className="flex w-full items-center gap-2 rounded-xl bg-white/20 px-4 py-3.5 text-base font-medium text-white outline-none transition focus:bg-white/30 focus:ring-4 focus:ring-white/25"
      >
        {selected ? (
          <>
            <OriginFlag code={selected.code} className="h-3.5 w-5 shrink-0 rounded-[3px]" />
            <span className="truncate">{selected.label}</span>
          </>
        ) : (
          <span className="truncate font-light text-white/70">{placeholder}</span>
        )}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={`ml-auto shrink-0 transition ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-50 mb-2 bottom-full max-h-60 overflow-auto rounded-2xl border border-ink/10 bg-white p-1 shadow-soft"
        >
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={o.value === value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  o.value === value ? "bg-ink/[0.06] text-ink" : "text-ink/70 hover:bg-ink/[0.04] hover:text-ink"
                }`}
              >
                <OriginFlag code={o.code} className="h-3.5 w-5 shrink-0 rounded-[3px]" />
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
