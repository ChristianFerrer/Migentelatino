"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/crm/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.push("/crm");
        router.refresh();
      } else if (data.error === "not_configured") {
        setError("CRM not configured yet — set CRM_PASSWORD in the environment.");
      } else {
        setError("Wrong username or password.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-[15px] font-medium text-ink outline-none transition placeholder:text-ink/40 focus:border-coral/50 focus:ring-4 focus:ring-coral/10";

  return (
    <main className="grid min-h-screen place-items-center bg-surface px-5">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo className="h-16" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-ink/10 bg-white p-7 shadow-card"
          noValidate
        >
          <h1 className="text-center font-display text-2xl uppercase tracking-tight text-ink">CRM Access</h1>
          <p className="mt-1 mb-6 text-center text-sm text-ink/55">Team members only</p>

          {!configured && (
            <p className="mb-4 rounded-xl bg-sun/15 px-3 py-2 text-center text-xs font-semibold text-ink/70">
              Set <code>CRM_PASSWORD</code> (and <code>SUPABASE_SERVICE_ROLE_KEY</code>) in the environment to enable the CRM.
            </p>
          )}

          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink/55">Username</label>
          <input
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            className={field}
          />

          <label className="mb-1 mt-4 block text-xs font-bold uppercase tracking-wide text-ink/55">Password</label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={field}
          />

          {error && <p className="mt-3 text-sm font-semibold text-grape-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-ink px-7 py-3.5 text-base font-bold text-cream transition hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-5 text-center text-xs text-ink/40">
          <a href="/" className="font-semibold hover:text-ink/70">
            ← Back to the site
          </a>
        </p>
      </div>
    </main>
  );
}
