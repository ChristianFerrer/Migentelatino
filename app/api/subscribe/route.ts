import { NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { resolveProduct } from "@/lib/catalogStore";

export async function POST(request: Request) {
  let body: {
    name?: string;
    phone?: string;
    country?: string;
    missed_product?: string;
    locale?: string;
    source?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const name = (body.name || "").trim().slice(0, 80);
  const phone = (body.phone || "").trim().slice(0, 30);
  const country = (body.country || "").trim().slice(0, 40);
  const missedProduct = (body.missed_product || "").trim().slice(0, 280);
  const locale = (body.locale || "en").slice(0, 5);
  const source = (body.source || "landing").slice(0, 60);

  // Phone is the key lead field (we follow up on WhatsApp); the missed
  // product is the "vote" that powers the ranking.
  if (phone.replace(/\D/g, "").length < 6 || !name || !missedProduct) {
    return NextResponse.json({ ok: false, error: "invalid_lead" }, { status: 400 });
  }

  // Normalize the free-text "missed product" against the canonical catalog so
  // different spellings of the same product count together in the ranking.
  // Raw input is always preserved; this only adds derived fields.
  const match = await resolveProduct(missedProduct).catch(() => null);

  // Demo mode: no database configured yet. We still return success so the
  // landing is fully testable; the lead is simply logged, not stored.
  if (!isSupabaseConfigured) {
    console.log(
      `[subscribe:demo] ${name} | ${phone} | ${country} | "${missedProduct}" → ${match?.name ?? "?"} (${locale}/${source})`
    );
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  const { error } = await supabase.from("signups").insert({
    name,
    phone,
    country,
    missed_product: missedProduct,
    locale,
    source,
    missed_product_normalized: match?.normalized ?? null,
    canonical_slug: match?.slug ?? null,
    canonical_name: match?.name ?? null,
    match_method: match?.method ?? null,
    match_score: match?.score ?? null,
    match_status: match?.status ?? "pending",
  });

  if (error) {
    // 23505 = unique_violation → already on the list. Treat as success.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    console.error("[subscribe] insert error:", error.message);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
