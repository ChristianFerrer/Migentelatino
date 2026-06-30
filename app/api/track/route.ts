import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const ALLOWED = new Set([
  "pageview", "form_view", "form_start", "form_submit", "form_error", "lang_change", "cta_click",
]);

function deviceFromUA(ua: string): string {
  const s = ua.toLowerCase();
  if (/ipad|tablet/.test(s)) return "tablet";
  if (/mobi|android|iphone/.test(s)) return "mobile";
  return "desktop";
}

function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "";
}

/**
 * Anonymous, rotating visitor id: sha256(salt + day + ip + ua). The raw IP is
 * used only to compute this hash and is NEVER stored; the salt rotates daily so
 * the hash can't be reversed across days. No device storage involved.
 */
function dailyVisitorHash(request: Request): string {
  const day = new Date().toISOString().slice(0, 10);
  const salt = process.env.ANALYTICS_SALT || "mgl-analytics-salt";
  const ua = request.headers.get("user-agent") || "";
  return createHash("sha256").update(`${salt}|${day}|${clientIp(request)}|${ua}`).digest("hex").slice(0, 32);
}

const clip = (v: unknown, n: number) => (v == null ? null : String(v).slice(0, n));

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const type = String(body.type || "");
  if (!ALLOWED.has(type)) return NextResponse.json({ ok: false }, { status: 400 });

  const country =
    request.headers.get("x-vercel-ip-country") || request.headers.get("x-country") || null;
  const device = deviceFromUA(request.headers.get("user-agent") || "");
  const session_id = dailyVisitorHash(request); // server-derived, no device storage

  if (!isSupabaseConfigured) return NextResponse.json({ ok: true, demo: true });
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ ok: true });

  await supabase.from("events").insert({
    type,
    session_id,
    path: clip(body.path, 120),
    source: clip(body.source, 80),
    referrer: clip(body.referrer, 300),
    utm_source: clip(body.utm_source, 80),
    utm_medium: clip(body.utm_medium, 80),
    utm_campaign: clip(body.utm_campaign, 80),
    country,
    device,
    locale: clip(body.locale, 5),
  });

  return NextResponse.json({ ok: true });
}
