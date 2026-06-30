import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Dead-simple CRM auth: a single username + password kept in server-only env
 * vars. No email validation, no magic links. On login we set an httpOnly
 * cookie whose value is a hash derived from the credentials, so changing the
 * password automatically invalidates every existing session.
 */
export const CRM_COOKIE = "mgl_crm";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function getCrmConfig() {
  const username = (process.env.CRM_USERNAME || "admin").trim();
  const password = process.env.CRM_PASSWORD || "";
  return { username, password, configured: Boolean(password) };
}

export function sessionToken(username: string, password: string): string {
  return createHash("sha256").update(`${username}:${password}`).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function checkCredentials(username: string, password: string): boolean {
  const cfg = getCrmConfig();
  if (!cfg.configured) return false;
  return safeEqual(username, cfg.username) && safeEqual(password, cfg.password);
}

export async function isAuthed(): Promise<boolean> {
  const cfg = getCrmConfig();
  if (!cfg.configured) return false;
  const jar = await cookies();
  const token = jar.get(CRM_COOKIE)?.value;
  if (!token) return false;
  return safeEqual(token, sessionToken(cfg.username, cfg.password));
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE,
};
