"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import type { Lead } from "@/lib/supabaseAdmin";

export type CanonicalOption = { slug: string; name: string };
export type EventRow = {
  type: string;
  session_id: string | null;
  source: string | null;
  country: string | null;
  device: string | null;
  locale: string | null;
  created_at: string;
};

// Brand-aligned dark theme (logo navy + logo accent colors).
const CARD = "rounded-2xl border border-white/10 bg-white/[0.05] p-5";

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
  auto: "bg-[#19b4ae]/20 text-[#7fe7da]",
  confirmed: "bg-[#a22d93]/25 text-[#e7a6df]",
  ai: "bg-[#e94b3b]/20 text-[#f6a99f]",
  pending: "bg-[#f7c942]/20 text-[#f7e08a]",
  not_product: "bg-white/10 text-white/40",
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
  events,
}: {
  leads: Lead[];
  dataError: string | null;
  options: CanonicalOption[];
  aiEnabled: boolean;
  events: EventRow[];
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
    <main className="min-h-screen bg-[#0e1f3d] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a1730]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-lg bg-white px-2 py-1">
              <Logo className="h-8" />
            </span>
            <span className="hidden text-sm font-bold uppercase tracking-wide text-white/50 sm:inline">CRM · Leads</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportCsv} className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
              Export CSV
            </button>
            <button onClick={logout} className="rounded-full bg-[#19b4ae] px-4 py-2 text-sm font-bold text-[#0e1f3d] transition hover:brightness-110">
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {dataError && (
          <div className="mb-6 rounded-2xl border border-[#e94b3b]/40 bg-[#e94b3b]/15 px-5 py-4 text-sm font-medium text-white">
            {dataError === "missing_service_key" ? (
              <>Add <code className="font-bold text-[#f7c942]">SUPABASE_SERVICE_ROLE_KEY</code> to your environment so the CRM can read the leads.</>
            ) : (
              <>Could not load leads: {dataError}</>
            )}
          </div>
        )}

        {notice && (
          <div className="mb-4 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white/80">{notice}</div>
        )}

        {/* Analytics */}
        <AnalyticsPanel events={events} />

        {/* Leads */}
        <h2 className="mt-8 mb-3 font-display text-xl uppercase tracking-wide text-[#f7c942]">Leads</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Total leads" value={stats.total} />
          <Stat label="Today" value={stats.today} />
          <Stat label="Last 7 days" value={stats.week} />
          <Stat label="Por normalizar" value={stats.pending} />
        </div>

        {/* Review queue */}
        {pending.length > 0 && (
          <section className="mt-6 rounded-2xl border border-[#f7c942]/30 bg-white/[0.04] p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-lg uppercase tracking-wide text-[#f6a96b]">
                Por revisar · {pending.length}
              </h2>
              <button
                onClick={aiResolve}
                disabled={busy || !aiEnabled}
                title={aiEnabled ? "" : "Configura ANTHROPIC_API_KEY"}
                className="rounded-full bg-[#e94b3b] px-4 py-1.5 text-xs font-bold text-white transition hover:brightness-110 disabled:opacity-50"
              >
                ✨ Resolver con IA
              </button>
            </div>
            <p className="mb-4 text-xs text-white/55">
              Lo que escribió el usuario y el producto sugerido. Confirma, elige otro o márcalo como “no es producto”. Cada confirmación enseña al sistema.
            </p>
            <div className="space-y-2">
              {pending.slice(0, 50).map((l) => (
                <PendingRow key={l.id} lead={l} options={options} busy={busy} onResolve={resolve} />
              ))}
            </div>
          </section>
        )}

        {/* Top requested */}
        {stats.top.length > 0 && (
          <section className={`mt-6 ${CARD}`}>
            <h2 className="font-display text-lg uppercase tracking-wide text-[#9fd356]">Más pedidos (normalizado)</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {stats.top.map(([label, n]) => (
                <li key={label} className="flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1.5 text-sm font-semibold text-white">
                  {label}
                  <span className="rounded-full bg-[#e94b3b] px-2 py-0.5 text-xs font-bold text-white">{n}</span>
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
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white outline-none transition placeholder:text-white/40 focus:border-[#19b4ae]/60 focus:ring-4 focus:ring-[#19b4ae]/15 sm:max-w-md"
          />
          <span className="text-sm font-medium text-white/50">
            {filtered.length} {filtered.length === 1 ? "lead" : "leads"}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wide text-white/50">
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
                  <td colSpan={7} className="px-4 py-10 text-center text-white/40">
                    {leads.length === 0 ? "No leads yet." : "No matches."}
                  </td>
                </tr>
              ) : (
                filtered.map((l) => {
                  const wa = digitsOnly(l.phone);
                  return (
                    <tr key={l.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.04]">
                      <td className="whitespace-nowrap px-4 py-3 text-white/55">{fmtDate(l.created_at)}</td>
                      <td className="px-4 py-3 font-semibold text-white">{l.name || "—"}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {wa ? (
                          <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#2dd4c0] hover:underline">
                            {l.phone}
                          </a>
                        ) : (
                          <span className="text-white/40">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-white/80">{l.country || "—"}</td>
                      <td className="px-4 py-3 text-white/80">{l.missed_product || "—"}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-white">{l.canonical_name || "—"}</span>
                          <MatchBadge lead={l} />
                        </div>
                      </td>
                      <td className="px-4 py-3 uppercase text-white/50">{l.locale || "—"}</td>
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
    <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.05] p-3 sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <span className="text-[10px] font-bold uppercase tracking-wide text-white/40">Escribió</span>
        <p className="truncate font-semibold text-white">{lead.missed_product || "—"}</p>
      </div>
      <select
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="rounded-lg border border-white/15 bg-[#0e1f3d] px-3 py-2 text-sm font-medium text-white outline-none focus:border-[#19b4ae]/60 sm:w-56"
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
          className="rounded-full bg-[#7fb23a] px-3 py-2 text-xs font-bold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          Confirmar
        </button>
        <button
          disabled={busy}
          onClick={createNew}
          className="rounded-full border border-white/20 px-3 py-2 text-xs font-bold text-white/80 transition hover:bg-white/10 disabled:opacity-50"
        >
          + Nuevo
        </button>
        <button
          disabled={busy}
          onClick={() => onResolve({ action: "not_product", signupId: lead.id })}
          className="rounded-full border border-white/20 px-3 py-2 text-xs font-bold text-white/50 transition hover:bg-white/10 disabled:opacity-50"
        >
          No es producto
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className={CARD}>
      <div className="text-xs font-bold uppercase tracking-wide text-white/50">{label}</div>
      <div className="mt-1 font-display text-3xl tabular-nums text-white">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      {sub && <div className="mt-0.5 text-xs font-medium text-white/40">{sub}</div>}
    </div>
  );
}

function AnalyticsPanel({ events }: { events: EventRow[] }) {
  const a = useMemo(() => {
    const sessionsByType: Record<string, Set<string>> = {};
    const meta = new Map<string, { source: string; device: string; country: string }>();
    let pageviews = 0;
    const dayViews = new Map<string, number>();
    const daySubs = new Map<string, number>();

    for (const e of events) {
      const sid = e.session_id || "anon";
      (sessionsByType[e.type] ??= new Set()).add(sid);
      if (!meta.has(sid)) {
        meta.set(sid, { source: e.source || "direct", device: e.device || "—", country: e.country || "—" });
      }
      if (e.type === "pageview") {
        pageviews++;
        const d = e.created_at.slice(0, 10);
        dayViews.set(d, (dayViews.get(d) ?? 0) + 1);
      }
      if (e.type === "form_submit") {
        const d = e.created_at.slice(0, 10);
        daySubs.set(d, (daySubs.get(d) ?? 0) + 1);
      }
    }

    const n = (t: string) => sessionsByType[t]?.size ?? 0;
    const visitors = n("pageview");
    const submits = n("form_submit");
    const conv = visitors ? (submits / visitors) * 100 : 0;

    const funnel = [
      { label: "Visitas", value: visitors },
      { label: "Vieron el formulario", value: n("form_view") },
      { label: "Interactuaron", value: n("form_start") },
      { label: "Enviaron", value: submits },
    ];

    const tally = (pick: (m: { source: string; device: string; country: string }) => string) => {
      const counts = new Map<string, number>();
      for (const m of meta.values()) counts.set(pick(m), (counts.get(pick(m)) ?? 0) + 1);
      return [...counts.entries()].sort((x, y) => y[1] - x[1]).slice(0, 6);
    };

    const days: Array<{ d: string; views: number; subs: number }> = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
      days.push({ d, views: dayViews.get(d) ?? 0, subs: daySubs.get(d) ?? 0 });
    }

    return {
      pageviews, visitors, submits, conv,
      funnel,
      sources: tally((m) => m.source),
      devices: tally((m) => m.device),
      countries: tally((m) => m.country),
      days,
      hasData: events.length > 0,
    };
  }, [events]);

  const maxFunnel = Math.max(1, ...a.funnel.map((f) => f.value));
  const maxDay = Math.max(1, ...a.days.map((d) => d.views));

  return (
    <section>
      <h2 className="mb-3 font-display text-xl uppercase tracking-wide text-[#2dd4c0]">
        Analítica · últimos 30 días
      </h2>

      {!a.hasData && (
        <p className="mb-4 rounded-xl bg-white/[0.05] px-4 py-3 text-sm text-white/55">
          Aún no hay visitas registradas. Los datos aparecen aquí en cuanto la gente entre a la página.
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Vistas de página" value={a.pageviews} />
        <Stat label="Visitantes" value={a.visitors} sub="sesiones únicas" />
        <Stat label="Envíos" value={a.submits} />
        <Stat label="Conversión" value={`${a.conv.toFixed(1)}%`} sub="envíos ÷ visitas" />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        {/* Funnel */}
        <div className={CARD}>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-white/50">Embudo</h3>
          <div className="space-y-2.5">
            {a.funnel.map((f, i) => {
              const pct = a.visitors ? Math.round((f.value / a.visitors) * 100) : 0;
              return (
                <div key={f.label}>
                  <div className="mb-1 flex justify-between text-xs font-semibold text-white/75">
                    <span>{f.label}</span>
                    <span className="tabular-nums">
                      {f.value.toLocaleString()}{i > 0 && a.visitors ? ` · ${pct}%` : ""}
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#e94b3b]"
                      style={{ width: `${(f.value / maxFunnel) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Per-day views */}
        <div className={CARD}>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-white/50">Vistas por día (14d)</h3>
          <div className="flex h-28 items-end gap-1">
            {a.days.map((d) => (
              <div key={d.d} className="flex flex-1 flex-col items-center gap-1" title={`${d.d}: ${d.views} vistas, ${d.subs} envíos`}>
                <div className="flex w-full flex-1 items-end">
                  <div className="w-full rounded-t bg-[#19b4ae]" style={{ height: `${(d.views / maxDay) * 100}%` }} />
                </div>
                <span className="text-[8px] text-white/40">{d.d.slice(8)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Breakdown title="Fuentes" rows={a.sources} />
        <Breakdown title="Dispositivos" rows={a.devices} />
        <Breakdown title="Países" rows={a.countries} />
      </div>
    </section>
  );
}

function Breakdown({ title, rows }: { title: string; rows: Array<[string, number]> }) {
  const max = Math.max(1, ...rows.map((r) => r[1]));
  return (
    <div className={CARD}>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-white/50">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-white/40">—</p>
      ) : (
        <ul className="space-y-2">
          {rows.map(([label, n]) => (
            <li key={label} className="text-sm">
              <div className="mb-0.5 flex justify-between font-medium text-white/80">
                <span className="truncate">{label}</span>
                <span className="tabular-nums text-white/50">{n}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#f7c942]" style={{ width: `${(n / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
