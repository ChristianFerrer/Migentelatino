"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import type { Lead } from "@/lib/supabaseAdmin";

function digitsOnly(phone: string | null): string {
  return (phone || "").replace(/\D/g, "");
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toCsv(leads: Lead[]): string {
  const headers = ["created_at", "name", "phone", "country", "missed_product", "locale", "source", "email"];
  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = leads.map((l) =>
    [l.created_at, l.name, l.phone, l.country, l.missed_product, l.locale, l.source, l.email]
      .map(escape)
      .join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

export function CrmClient({ leads, dataError }: { leads: Lead[]; dataError: string | null }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const stats = useMemo(() => {
    const now = Date.now();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const today = leads.filter((l) => new Date(l.created_at).getTime() >= startOfToday.getTime()).length;
    const week = leads.filter((l) => now - new Date(l.created_at).getTime() <= 7 * 864e5).length;
    const countries = new Set(leads.map((l) => (l.country || "").trim()).filter(Boolean)).size;

    const counts = new Map<string, { label: string; n: number }>();
    for (const l of leads) {
      const raw = (l.missed_product || "").trim();
      if (!raw) continue;
      const key = raw.toLowerCase();
      const entry = counts.get(key);
      if (entry) entry.n += 1;
      else counts.set(key, { label: raw, n: 1 });
    }
    const top = [...counts.values()].sort((a, b) => b.n - a.n).slice(0, 8);
    return { total: leads.length, today, week, countries, top };
  }, [leads]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) =>
      [l.name, l.phone, l.country, l.missed_product, l.source, l.locale]
        .some((v) => (v || "").toLowerCase().includes(q))
    );
  }, [leads, query]);

  async function logout() {
    await fetch("/api/crm/logout", { method: "POST" });
    router.push("/crm/login");
    router.refresh();
  }

  function exportCsv() {
    const blob = new Blob([toCsv(filtered)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `migentelatino-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-surface">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <Logo className="h-10" />
            <span className="hidden text-sm font-bold uppercase tracking-wide text-ink/50 sm:inline">CRM · Leads</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportCsv}
              className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink/[0.04]"
            >
              Export CSV
            </button>
            <button
              onClick={logout}
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition hover:opacity-90"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {dataError && (
          <div className="mb-6 rounded-2xl border border-coral/30 bg-coral/10 px-5 py-4 text-sm font-medium text-ink">
            {dataError === "missing_service_key" ? (
              <>
                Add <code className="font-bold">SUPABASE_SERVICE_ROLE_KEY</code> to your environment so the CRM can read
                the leads (the public anon key can only insert, never read).
              </>
            ) : (
              <>Could not load leads: {dataError}</>
            )}
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Total leads" value={stats.total} />
          <Stat label="Today" value={stats.today} />
          <Stat label="Last 7 days" value={stats.week} />
          <Stat label="Countries" value={stats.countries} />
        </div>

        {/* Top requested products */}
        {stats.top.length > 0 && (
          <section className="mt-6 rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink/55">Most-requested products</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {stats.top.map((p) => (
                <li
                  key={p.label}
                  className="flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-ink"
                >
                  {p.label}
                  <span className="rounded-full bg-coral px-2 py-0.5 text-xs font-bold text-white">{p.n}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Search + count */}
        <div className="mt-8 mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, phone, country, product…"
            className="w-full rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm font-medium text-ink outline-none transition placeholder:text-ink/40 focus:border-coral/50 focus:ring-4 focus:ring-coral/10 sm:max-w-md"
          />
          <span className="text-sm font-medium text-ink/50">
            {filtered.length} {filtered.length === 1 ? "lead" : "leads"}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white shadow-card">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-xs font-bold uppercase tracking-wide text-ink/50">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Missed product</th>
                <th className="px-4 py-3">Lang</th>
                <th className="px-4 py-3">Source</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-ink/40">
                    {leads.length === 0 ? "No leads yet." : "No matches."}
                  </td>
                </tr>
              ) : (
                filtered.map((l) => {
                  const wa = digitsOnly(l.phone);
                  return (
                    <tr key={l.id} className="border-b border-ink/5 last:border-0 hover:bg-surface/60">
                      <td className="whitespace-nowrap px-4 py-3 text-ink/60">{fmtDate(l.created_at)}</td>
                      <td className="px-4 py-3 font-semibold text-ink">{l.name || "—"}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {wa ? (
                          <a
                            href={`https://wa.me/${wa}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-mint-600 hover:underline"
                          >
                            {l.phone}
                          </a>
                        ) : (
                          <span className="text-ink/40">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-ink/80">{l.country || "—"}</td>
                      <td className="px-4 py-3 text-ink">{l.missed_product || "—"}</td>
                      <td className="px-4 py-3 uppercase text-ink/50">{l.locale || "—"}</td>
                      <td className="px-4 py-3 text-ink/50">{l.source || "—"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
      <div className="text-xs font-bold uppercase tracking-wide text-ink/50">{label}</div>
      <div className="mt-1 font-display text-3xl tabular-nums text-ink">{value.toLocaleString()}</div>
    </div>
  );
}
