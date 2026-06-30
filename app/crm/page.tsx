import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/crmAuth";
import { getSupabaseAdmin, isCrmDataConfigured, type Lead } from "@/lib/supabaseAdmin";
import { CrmClient } from "./CrmClient";

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
      .select("id, created_at, name, phone, country, missed_product, email, locale, source")
      .order("created_at", { ascending: false })
      .limit(5000);
    if (error) {
      dataError = error.message;
    } else {
      leads = (data as Lead[]) ?? [];
    }
  }

  return <CrmClient leads={leads} dataError={dataError} />;
}
