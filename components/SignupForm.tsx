"use client";

import { useState } from "react";
import { useLocale } from "./LocaleProvider";

type Status = "idle" | "loading" | "success" | "error";

export function SignupForm({ source, cta }: { source: string; cta?: string }) {
  const { t, locale } = useLocale();
  const [form, setForm] = useState({ name: "", phone: "", missed: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (status === "error") setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || form.phone.trim().length < 6 || !form.missed.trim()) {
      setStatus("error");
      setMessage(t.signup.errorRequired);
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
          phone: form.phone.trim(),
          missed_product: form.missed.trim(),
          locale,
          source,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(t.signup.success);
        setForm({ name: "", phone: "", missed: "" });
      } else {
        setStatus("error");
        setMessage(t.signup.errorGeneric);
      }
    } catch {
      setStatus("error");
      setMessage(t.signup.errorGeneric);
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl border border-mint/30 bg-mint-100 px-5 py-4 text-base font-semibold text-mint-600 shadow-soft"
        role="status"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mint font-bold text-white">✓</span>
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
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder={t.signup.phonePlaceholder}
          aria-label={t.signup.phonePlaceholder}
          className={fieldClass}
        />
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

      {status === "error" && <p className="mt-2 px-1 text-sm font-semibold text-coral-600">{message}</p>}
    </form>
  );
}
