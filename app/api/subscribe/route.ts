import { NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
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

  const email = (body.email || "").trim().toLowerCase();
  const name = (body.name || "").trim().slice(0, 80);
  const phone = (body.phone || "").trim().slice(0, 30);
  const country = (body.country || "").trim().slice(0, 40);
  const missedProduct = (body.missed_product || "").trim().slice(0, 280);
  const locale = (body.locale || "en").slice(0, 5);
  const source = (body.source || "landing").slice(0, 60);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  // Demo mode: no database configured yet. We still return success so the
  // landing is fully testable; the lead is simply logged, not stored.
  if (!isSupabaseConfigured) {
    console.log(`[subscribe:demo] ${email} | ${name} | ${phone} | ${country} | "${missedProduct}" (${locale}/${source})`);
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  const { error } = await supabase
    .from("signups")
    .insert({ email, name, phone, country, missed_product: missedProduct, locale, source });

  if (error) {
    // 23505 = unique_violation → email already on the list. Treat as success.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    console.error("[subscribe] insert error:", error.message);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
