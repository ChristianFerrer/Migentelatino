"use client";

import { useState } from "react";
import { useLocale } from "./LocaleProvider";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignupForm({
  source,
  placeholder,
  cta,
}: {
  source: string;
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
        className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-sun px-5 py-4 text-base font-extrabold text-ink shadow-brutalsm"
        role="status"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink bg-white">✓</span>
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
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
          className="w-full flex-1 rounded-full border-2 border-ink bg-white px-5 py-3.5 text-base font-medium text-ink outline-none transition placeholder:text-ink/40 focus:shadow-brutalsm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full border-2 border-ink bg-sun px-7 py-3.5 text-base font-extrabold text-ink shadow-brutalsm transition hover:bg-sun-400 hover:-translate-y-0.5 active:translate-y-0 active:shadow-none disabled:opacity-70"
        >
          {status === "loading" ? t.signup.sending : cta ?? t.signup.cta}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 px-2 text-sm font-bold text-white">{message}</p>
      )}
    </form>
  );
}
