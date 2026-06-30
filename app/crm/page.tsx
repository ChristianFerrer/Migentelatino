import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/crmAuth";
import { getSupabaseAdmin, isCrmDataConfigured, type Lead } from "@/lib/supabaseAdmin";
import { loadCatalog } from "@/lib/catalogStore";
import { CrmClient, type CanonicalOption, type EventRow } from "./CrmClient";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "CRM · Leads", robots: { index: false, follow: false } };

export default async function CrmPage() {
  if (!(await isAuthed())) redirect("/crm/login");

  let leads: Lead[] = [];
  let dataError: string | null = null;

  if (!isCrmDataConfigured) {
    dataError = "missing_service_key";
  } else {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase!
      .from("signups")
      .select(
        "id, created_at, name, phone, country, missed_product, email, locale, source, missed_product_normalized, canonical_slug, canonical_name, match_method, match_score, match_status"
      )
      .order("created_at", { ascending: false })
      .limit(5000);
    if (error) {
      dataError = error.message;
    } else {
      leads = (data as Lead[]) ?? [];
    }
  }

  const catalog = await loadCatalog().catch(() => []);
  const options: CanonicalOption[] = catalog
    .map((p) => ({ slug: p.slug, name: p.name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const aiEnabled = Boolean(process.env.ANTHROPIC_API_KEY);

  // Last 30 days of analytics events (first-party, from /api/track).
  let events: EventRow[] = [];
  if (isCrmDataConfigured) {
    const supabase = getSupabaseAdmin();
    const since = new Date(Date.now() - 30 * 864e5).toISOString();
    const { data } = await supabase!
      .from("events")
      .select("type, session_id, source, country, device, locale, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(50000);
    events = (data as EventRow[]) ?? [];
  }

  return (
    <CrmClient leads={leads} dataError={dataError} options={options} aiEnabled={aiEnabled} events={events} />
  );
}
