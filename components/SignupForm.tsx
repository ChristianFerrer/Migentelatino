"use client";

import { useState } from "react";
import { useLocale } from "./LocaleProvider";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Extra origin countries (names identical enough across locales) appended
// after the six localized ones.
const EXTRA_COUNTRIES = ["Chile", "Ecuador", "Bolivia", "Uruguay", "Paraguay"];

export function SignupForm({ source, cta }: { source: string; cta?: string }) {
  const { t, locale } = useLocale();
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", missed: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const countries = [...Object.values(t.popular.countries), ...EXTRA_COUNTRIES, t.signup.countryOther];

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (status === "error") setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.country) {
      setStatus("error");
      setMessage(t.signup.errorRequired);
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setStatus("error");
      setMessage(t.signup.errorEmail);
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          country: form.country,
          missed_product: form.missed.trim(),
          locale,
          source,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(t.signup.success);
        setForm({ name: "", email: "", phone: "", country: "", missed: "" });
      } else {
        setStatus("error");
        setMessage(data.error === "invalid_email" ? t.signup.errorEmail : t.signup.errorGeneric);
      }
    } catch {
      setStatus("error");
      setMessage(t.signup.errorGeneric);
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl border border-mint/30 bg-mint-100 px-5 py-4 text-base font-bold text-mint-600 shadow-soft"
        role="status"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mint font-extrabold text-white">✓</span>
        {message}
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-xl border border-ink/10 bg-white/80 px-4 py-3 text-[15px] font-normal text-ink outline-none transition placeholder:text-ink/40 focus:border-ink/25 focus:bg-white focus:ring-4 focus:ring-ink/5";

  return (
    <form onSubmit={handleSubmit} className="w-full rounded-3xl border border-white/60 bg-white/80 p-5 shadow-soft backdrop-blur-xl" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
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
          type="email"
          inputMode="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder={t.signup.emailPlaceholder}
          aria-label={t.signup.emailPlaceholder}
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
          className={`${fieldClass} ${form.country ? "" : "text-ink-soft/50"}`}
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

      <label className="mt-3 block text-sm font-semibold text-ink">{t.signup.missedLabel}</label>
      <textarea
        value={form.missed}
        onChange={(e) => update("missed", e.target.value)}
        placeholder={t.signup.missedPlaceholder}
        rows={2}
        maxLength={280}
        aria-label={t.signup.missedLabel}
        className={`${fieldClass} mt-1.5 resize-none`}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="cta-gradient mt-4 w-full rounded-full px-7 py-3.5 text-base font-semibold text-ink shadow-glow transition hover:brightness-[1.03] active:scale-[0.99] disabled:opacity-70"
      >
        {status === "loading" ? t.signup.sending : cta ?? t.signup.cta}
      </button>

      {status === "error" && <p className="mt-2 px-1 text-sm font-bold text-coral-600">{message}</p>}
    </form>
  );
}
