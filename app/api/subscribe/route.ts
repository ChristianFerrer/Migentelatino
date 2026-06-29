import { NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  let body: {
    name?: string;
    phone?: string;
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
  const missedProduct = (body.missed_product || "").trim().slice(0, 280);
  const locale = (body.locale || "en").slice(0, 5);
  const source = (body.source || "landing").slice(0, 60);

  // Phone is the key lead field now (we follow up on WhatsApp).
  if (phone.replace(/\D/g, "").length < 6 || !name) {
    return NextResponse.json({ ok: false, error: "invalid_lead" }, { status: 400 });
  }

  // Demo mode: no database configured yet. We still return success so the
  // landing is fully testable; the lead is simply logged, not stored.
  if (!isSupabaseConfigured) {
    console.log(`[subscribe:demo] ${name} | ${phone} | "${missedProduct}" (${locale}/${source})`);
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  const { error } = await supabase
    .from("signups")
    .insert({ name, phone, missed_product: missedProduct, locale, source });

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
