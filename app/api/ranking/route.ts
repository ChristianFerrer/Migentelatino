import { NextResponse } from "next/server";
import { getSupabaseAdmin, isCrmDataConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

/**
 * Real demand counts grouped by canonical product (only confidently-matched
 * rows: auto or human-confirmed). The landing chart overlays these on its seed
 * baseline so different spellings of the same product add up to one bar.
 */
export async function GET() {
  if (!isCrmDataConfigured) return NextResponse.json({ counts: {} });
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ counts: {} });

  const [{ data, error }, { data: canon }] = await Promise.all([
    supabase
      .from("signups")
      .select("canonical_name, match_status")
      .in("match_status", ["auto", "confirmed"])
      .not("canonical_name", "is", null)
      .limit(20000),
    supabase.from("products_canonical").select("name, country").eq("status", "active"),
  ]);

  if (error || !data) return NextResponse.json({ counts: {}, countries: {} });

  const counts: Record<string, number> = {};
  for (const row of data as Array<{ canonical_name: string | null }>) {
    const n = row.canonical_name;
    if (!n) continue;
    counts[n] = (counts[n] ?? 0) + 1;
  }

  // Each canonical product's own country of origin — used for its flag in the
  // chart (this is the product's country, not the submitter's).
  const countries: Record<string, string> = {};
  for (const c of (canon ?? []) as Array<{ name: string; country: string | null }>) {
    if (c.name && c.country) countries[c.name] = c.country;
  }
  return NextResponse.json({ counts, countries });
}
