"use client";

import { useState } from "react";
import { useLocale } from "./LocaleProvider";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignupForm({
  source,
  variant = "light",
  placeholder,
  cta,
}: {
  source: string;
  variant?: "light" | "dark";
  placeholder?: string;
  cta?: string;
}) {
  const { t, locale } = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
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
        body: JSON.stringify({ email: email.trim(), locale, source }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(t.signup.success);
        setEmail("");
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
        className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold ${
          variant === "dark" ? "bg-white/15 text-white" : "bg-mint-100 text-mint-600"
        }`}
        role="status"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mint text-white">✓</span>
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <div
        className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:p-1.5 ${
          variant === "dark" ? "sm:bg-white/15" : "sm:bg-white sm:shadow-soft"
        }`}
      >
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={placeholder ?? t.signup.emailPlaceholder}
          aria-label="Email"
          className={`w-full flex-1 rounded-full px-5 py-3 text-base outline-none transition placeholder:text-ink/40 ${
            variant === "dark"
              ? "bg-white/90 text-ink focus:bg-white"
              : "bg-cream text-ink sm:bg-transparent"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-coral px-6 py-3 text-base font-bold text-white shadow-glow transition hover:bg-coral-600 active:scale-[0.98] disabled:opacity-70"
        >
          {status === "loading" ? t.signup.sending : cta ?? t.signup.cta}
        </button>
      </div>
      {status === "error" && (
        <p className={`mt-2 px-2 text-sm font-medium ${variant === "dark" ? "text-sun-100" : "text-coral-600"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
