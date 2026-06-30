"use client";

/**
 * Tiny first-party analytics client. Sends anonymous events to /api/track,
 * which writes them to our own database (visible in the CRM). Cookieless: the
 * session id lives in sessionStorage and a fresh one is created per browser
 * session, so there's no persistent identifier and no consent banner needed.
 */

const SID_KEY = "mgl_sid";
const ATTR_KEY = "mgl_attr";

type Attribution = {
  source: string;
  referrer: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let sid = sessionStorage.getItem(SID_KEY);
    if (!sid) {
      sid = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(SID_KEY, sid);
    }
    return sid;
  } catch {
    return "anon";
  }
}

/** Capture where the visitor came from once per session. */
function getAttribution(): Attribution {
  const fallback: Attribution = {
    source: "direct",
    referrer: "",
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
  };
  if (typeof window === "undefined") return fallback;
  try {
    const cached = sessionStorage.getItem(ATTR_KEY);
    if (cached) return JSON.parse(cached) as Attribution;

    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get("utm_source");
    const utm_medium = params.get("utm_medium");
    const utm_campaign = params.get("utm_campaign");
    const ref = document.referrer || "";

    let source = "direct";
    if (utm_source) {
      source = utm_source.toLowerCase();
    } else if (ref) {
      try {
        const host = new URL(ref).hostname.replace(/^www\./, "");
        // Same-origin referrers count as direct/internal navigation.
        source = host === window.location.hostname ? "direct" : host;
      } catch {
        source = "other";
      }
    }

    const attr: Attribution = { source, referrer: ref.slice(0, 300), utm_source, utm_medium, utm_campaign };
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(attr));
    return attr;
  } catch {
    return fallback;
  }
}

export type EventType =
  | "pageview"
  | "form_view"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "lang_change"
  | "cta_click";

// Fire each of these at most once per session (avoids double counting).
const ONCE: Partial<Record<EventType, boolean>> = {
  pageview: true,
  form_view: true,
  form_start: true,
};
const fired = new Set<string>();

export function track(type: EventType, extra?: { locale?: string }) {
  if (typeof window === "undefined") return;
  if (ONCE[type]) {
    if (fired.has(type)) return;
    fired.add(type);
  }
  try {
    const attr = getAttribution();
    const payload = {
      type,
      session_id: getSessionId(),
      path: window.location.pathname,
      locale: extra?.locale ?? null,
      ...attr,
    };
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
    }
  } catch {
    // analytics must never break the page
  }
}
