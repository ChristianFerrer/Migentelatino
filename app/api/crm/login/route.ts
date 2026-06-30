import { NextResponse } from "next/server";
import { checkCredentials, getCrmConfig, sessionToken, CRM_COOKIE, COOKIE_OPTIONS } from "@/lib/crmAuth";

export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const cfg = getCrmConfig();
  if (!cfg.configured) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const username = (body.username || "").trim();
  const password = body.password || "";

  if (!checkCredentials(username, password)) {
    return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(CRM_COOKIE, sessionToken(cfg.username, cfg.password), COOKIE_OPTIONS);
  return res;
}
