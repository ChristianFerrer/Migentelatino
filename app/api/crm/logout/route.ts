import { NextResponse } from "next/server";
import { CRM_COOKIE } from "@/lib/crmAuth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(CRM_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
