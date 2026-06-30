import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/crmAuth";
import { getSupabaseAdmin, isCrmDataConfigured, type Lead } from "@/lib/supabaseAdmin";
import { loadCatalog } from "@/lib/catalogStore";
import { CrmClient, type CanonicalOption } from "./CrmClient";

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

  return <CrmClient leads={leads} dataError={dataError} options={options} aiEnabled={aiEnabled} />;
}
