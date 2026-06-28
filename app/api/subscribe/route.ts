import { NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string; locale?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const locale = (body.locale || "en").slice(0, 5);
  const source = (body.source || "landing").slice(0, 60);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  // Demo mode: no database configured yet. We still return success so the
  // landing is fully testable; the email is simply logged, not stored.
  if (!isSupabaseConfigured) {
    console.log(`[subscribe:demo] ${email} (${locale}/${source}) — Supabase not configured`);
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  const { error } = await supabase
    .from("signups")
    .insert({ email, locale, source });

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
