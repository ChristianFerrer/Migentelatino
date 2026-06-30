"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "./LocaleProvider";
import { track } from "@/lib/track";

type Status = "idle" | "loading" | "success" | "error";

const EXTRA_COUNTRIES = ["Chile", "Ecuador", "Bolivia", "Uruguay", "Paraguay"];

export function SignupForm({ source, cta }: { source: string; cta?: string }) {
  const { t, locale } = useLocale();
  const [form, setForm] = useState({ missed: "", name: "", phone: "", country: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const started = useRef(false);

  const countries = [...Object.values(t.popular.countries), ...EXTRA_COUNTRIES, t.signup.countryOther];

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

  const fieldClass =
    "w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-[15px] font-medium text-ink outline-none transition placeholder:text-ink/40 focus:border-coral/50 focus:ring-4 focus:ring-coral/10";

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
        className="w-full rounded-2xl border-2 border-ink/10 bg-white px-5 py-4 text-lg font-semibold text-ink shadow-card outline-none transition placeholder:font-medium placeholder:text-ink/35 focus:border-coral focus:ring-4 focus:ring-coral/15 sm:text-xl"
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
        <select
          value={form.country}
          onChange={(e) => update("country", e.target.value)}
          aria-label={t.signup.countryPlaceholder}
          className={`${fieldClass} ${form.country ? "" : "text-ink/40"}`}
        >
          <option value="" disabled>
            {t.signup.countryPlaceholder}
          </option>
          {countries.map((c) => (
            <option key={c} value={c} className="text-ink">
              {c}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 w-full rounded-full bg-[linear-gradient(180deg,#81ecec,#00cec9)] px-7 py-4 text-base font-bold text-ink shadow-card transition hover:brightness-[1.04] active:scale-[0.99] disabled:opacity-70"
      >
        {status === "loading" ? t.signup.sending : cta ?? t.signup.cta}
      </button>

      {status === "error" && <p className="mt-2 px-1 text-sm font-semibold text-grape-600">{message}</p>}
    </form>
  );
}
