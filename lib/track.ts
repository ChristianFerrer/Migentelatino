"use client";

/**
 * First-party analytics client — STORAGE-LESS by design.
 *
 * It writes nothing to the device (no cookies, no localStorage, no
 * sessionStorage), so it does not trigger the ePrivacy / TDDDG §25 / TKG §165
 * consent requirement → no cookie banner needed. The visitor is de-duplicated
 * server-side via an anonymous daily hash (see /api/track); the IP is never
 * stored. Attribution is read from the current URL/referrer per event.
 */

type Attribution = {
  source: string;
  referrer: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

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
        source = host === window.location.hostname ? "direct" : host;
      } catch {
        source = "other";
      }
    }
    return { source, referrer: ref.slice(0, 300), utm_source, utm_medium, utm_campaign };
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

// In-memory only (cleared on reload) — not device storage. Avoids double counts
// within a single page load.
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
