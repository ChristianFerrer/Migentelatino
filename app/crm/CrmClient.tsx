"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import type { Lead } from "@/lib/supabaseAdmin";

export type CanonicalOption = { slug: string; name: string };

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
  const headers = [
    "created_at", "name", "phone", "country", "missed_product", "canonical_name",
    "match_status", "match_method", "match_score", "locale", "source", "email",
  ];
  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = leads.map((l) =>
    [l.created_at, l.name, l.phone, l.country, l.missed_product, l.canonical_name,
     l.match_status, l.match_method, l.match_score, l.locale, l.source, l.email]
      .map(escape).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

const STATUS_STYLES: Record<string, string> = {
  auto: "bg-mint/15 text-mint-600",
  confirmed: "bg-grape/15 text-grape-600",
  ai: "bg-coral/15 text-coral",
  pending: "bg-sun/20 text-ink/70",
  not_product: "bg-ink/[0.06] text-ink/40",
};

function MatchBadge({ lead }: { lead: Lead }) {
  const status = lead.match_status || "pending";
  const cls = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  const score = lead.match_score != null ? ` ${Math.round(Number(lead.match_score) * 100)}%` : "";
  const label = status === "not_product" ? "no product" : `${status}${lead.match_method ? ` · ${lead.match_method}` : ""}${score}`;
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${cls}`}>
      {label}
    </span>
  );
}

export function CrmClient({
  leads,
  dataError,
  options,
  aiEnabled,
}: {
  leads: Lead[];
  dataError: string | null;
  options: CanonicalOption[];
  aiEnabled: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  const pending = useMemo(() => leads.filter((l) => (l.match_status ?? "pending") === "pending"), [leads]);

  const stats = useMemo(() => {
    const now = Date.now();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const today = leads.filter((l) => new Date(l.created_at).getTime() >= startOfToday.getTime()).length;
    const week = leads.filter((l) => now - new Date(l.created_at).getTime() <= 7 * 864e5).length;

    // Real demand grouped by canonical product (auto + confirmed only).
    const counts = new Map<string, number>();
    for (const l of leads) {
      const st = l.match_status ?? "pending";
      if (st !== "auto" && st !== "confirmed") continue;
      const label = l.canonical_name || l.missed_product_normalized || l.missed_product;
      if (!label) continue;
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
    return { total: leads.length, today, week, pending: pending.length, top };
  }, [leads, pending.length]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) =>
      [l.name, l.phone, l.country, l.missed_product, l.canonical_name, l.source, l.locale]
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

  async function resolve(payload: Record<string, unknown>) {
    setBusy(true);
    setNotice("");
    try {
      const res = await fetch("/api/crm/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) router.refresh();
      else setNotice("No se pudo guardar.");
    } catch {
      setNotice("Error de red.");
    } finally {
      setBusy(false);
    }
  }

  async function aiResolve() {
    setBusy(true);
    setNotice("");
    try {
      const res = await fetch("/api/crm/ai-resolve", { method: "POST" });
      const data = await res.json();
      if (data.ok) {
        setNotice(`IA resolvió ${data.resolved} de ${data.resolved + data.pending}.`);
        router.refresh();
      } else if (data.error === "no_ai") {
        setNotice("Falta ANTHROPIC_API_KEY para usar la IA.");
      } else {
        setNotice("La IA no pudo procesar ahora.");
      }
    } catch {
      setNotice("Error de red.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-surface">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <Logo className="h-10" />
            <span className="hidden text-sm font-bold uppercase tracking-wide text-ink/50 sm:inline">CRM · Leads</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportCsv} className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink/[0.04]">
              Export CSV
            </button>
            <button onClick={logout} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition hover:opacity-90">
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {dataError && (
          <div className="mb-6 rounded-2xl border border-coral/30 bg-coral/10 px-5 py-4 text-sm font-medium text-ink">
            {dataError === "missing_service_key" ? (
              <>Add <code className="font-bold">SUPABASE_SERVICE_ROLE_KEY</code> to your environment so the CRM can read the leads.</>
            ) : (
              <>Could not load leads: {dataError}</>
            )}
          </div>
        )}

        {notice && (
          <div className="mb-4 rounded-xl bg-ink/[0.05] px-4 py-2 text-sm font-semibold text-ink/70">{notice}</div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Total leads" value={stats.total} />
          <Stat label="Today" value={stats.today} />
          <Stat label="Last 7 days" value={stats.week} />
          <Stat label="Por normalizar" value={stats.pending} />
        </div>

        {/* Review queue */}
        {pending.length > 0 && (
          <section className="mt-6 rounded-2xl border border-sun/40 bg-sun/[0.06] p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink/70">
                Por revisar · {pending.length}
              </h2>
              <button
                onClick={aiResolve}
                disabled={busy || !aiEnabled}
                title={aiEnabled ? "" : "Configura ANTHROPIC_API_KEY"}
                className="rounded-full bg-coral px-4 py-1.5 text-xs font-bold text-white transition hover:brightness-105 disabled:opacity-50"
              >
                ✨ Resolver con IA
              </button>
            </div>
            <p className="mb-4 text-xs text-ink/55">
              Lo que escribió el usuario y el producto sugerido. Confirma, elige otro o márcalo como “no es producto”. Cada confirmación enseña al sistema.
            </p>
            <div className="space-y-2">
              {pending.slice(0, 50).map((l) => (
                <PendingRow key={l.id} lead={l} options={options} busy={busy} onResolve={resolve} />
              ))}
            </div>
          </section>
        )}

        {/* Top requested (real, grouped) */}
        {stats.top.length > 0 && (
          <section className="mt-6 rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink/55">Más pedidos (normalizado)</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {stats.top.map(([label, n]) => (
                <li key={label} className="flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-ink">
                  {label}
                  <span className="rounded-full bg-coral px-2 py-0.5 text-xs font-bold text-white">{n}</span>
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
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-xs font-bold uppercase tracking-wide text-ink/50">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Lo que escribió</th>
                <th className="px-4 py-3">Producto identificado</th>
                <th className="px-4 py-3">Lang</th>
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
                          <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-mint-600 hover:underline">
                            {l.phone}
                          </a>
                        ) : (
                          <span className="text-ink/40">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-ink/80">{l.country || "—"}</td>
                      <td className="px-4 py-3 text-ink/80">{l.missed_product || "—"}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-ink">{l.canonical_name || "—"}</span>
                          <MatchBadge lead={l} />
                        </div>
                      </td>
                      <td className="px-4 py-3 uppercase text-ink/50">{l.locale || "—"}</td>
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

function PendingRow({
  lead,
  options,
  busy,
  onResolve,
}: {
  lead: Lead;
  options: CanonicalOption[];
  busy: boolean;
  onResolve: (payload: Record<string, unknown>) => void;
}) {
  const [slug, setSlug] = useState(lead.canonical_slug ?? "");

  function createNew() {
    const name = window.prompt("Nombre del nuevo producto:", lead.missed_product || "");
    if (!name) return;
    const country = (window.prompt("País (pe/co/br/ar/mx/ve):", "mx") || "mx").trim();
    onResolve({ action: "create", signupId: lead.id, newName: name, newCountry: country });
  }

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-ink/10 bg-white p-3 sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <span className="text-[10px] font-bold uppercase tracking-wide text-ink/40">Escribió</span>
        <p className="truncate font-semibold text-ink">{lead.missed_product || "—"}</p>
      </div>
      <select
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm font-medium text-ink outline-none focus:border-coral/50 sm:w-56"
      >
        <option value="">— elegir producto —</option>
        {options.map((o) => (
          <option key={o.slug} value={o.slug}>{o.name}</option>
        ))}
      </select>
      <div className="flex shrink-0 gap-2">
        <button
          disabled={busy || !slug}
          onClick={() => onResolve({ action: "confirm", signupId: lead.id, slug })}
          className="rounded-full bg-mint px-3 py-2 text-xs font-bold text-white transition hover:brightness-105 disabled:opacity-50"
        >
          Confirmar
        </button>
        <button
          disabled={busy}
          onClick={createNew}
          className="rounded-full border border-ink/15 bg-white px-3 py-2 text-xs font-bold text-ink transition hover:bg-ink/[0.04] disabled:opacity-50"
        >
          + Nuevo
        </button>
        <button
          disabled={busy}
          onClick={() => onResolve({ action: "not_product", signupId: lead.id })}
          className="rounded-full border border-ink/15 bg-white px-3 py-2 text-xs font-bold text-ink/50 transition hover:bg-ink/[0.04] disabled:opacity-50"
        >
          No es producto
        </button>
      </div>
    </div>
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
