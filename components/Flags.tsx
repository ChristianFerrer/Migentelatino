"use client";

import { useId, type ReactElement } from "react";
import type { CountryKey } from "@/lib/products";
import type { Locale } from "@/lib/i18n";

/**
 * Flat, simplified SVG flags (no emoji) — consistent rounded style.
 * viewBox 24×16. Designs are stylized, not official specifications.
 */
export function Flag({ code, className = "" }: { code: CountryKey; className?: string }) {
  const id = useId().replace(/:/g, "");
  const clip = `flag-${code}-${id}`;
  return (
    <svg viewBox="0 0 24 16" className={className} role="img" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <rect width="24" height="16" rx="2.5" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>{bands[code]}</g>
      <rect x="0.4" y="0.4" width="23.2" height="15.2" rx="2.2" fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="0.8" />
    </svg>
  );
}

const bands: Record<CountryKey, ReactElement> = {
  pe: (
    <>
      <rect width="8" height="16" fill="#D91023" />
      <rect x="8" width="8" height="16" fill="#FFFFFF" />
      <rect x="16" width="8" height="16" fill="#D91023" />
    </>
  ),
  co: (
    <>
      <rect width="24" height="8" fill="#FCD116" />
      <rect y="8" width="24" height="4" fill="#003893" />
      <rect y="12" width="24" height="4" fill="#CE1126" />
    </>
  ),
  br: (
    <>
      <rect width="24" height="16" fill="#009C3B" />
      <polygon points="12,2 22,8 12,14 2,8" fill="#FFDF00" />
      <circle cx="12" cy="8" r="3.2" fill="#002776" />
    </>
  ),
  ar: (
    <>
      <rect width="24" height="5.34" fill="#74ACDF" />
      <rect y="5.34" width="24" height="5.34" fill="#FFFFFF" />
      <rect y="10.68" width="24" height="5.34" fill="#74ACDF" />
      <circle cx="12" cy="8" r="1.7" fill="#F6B40E" />
    </>
  ),
  mx: (
    <>
      <rect width="8" height="16" fill="#006847" />
      <rect x="8" width="8" height="16" fill="#FFFFFF" />
      <rect x="16" width="8" height="16" fill="#CE1126" />
      <circle cx="12" cy="8" r="1.5" fill="#9B6A3B" />
    </>
  ),
  ve: (
    <>
      <rect width="24" height="5.34" fill="#FFCC00" />
      <rect y="5.34" width="24" height="5.34" fill="#00247D" />
      <rect y="10.68" width="24" height="5.34" fill="#CF142B" />
      {[6.5, 8.2, 10.1, 12, 13.9, 15.8, 17.5].map((x, i) => (
        <circle key={i} cx={x} cy={i % 2 === 0 ? 8.6 : 7.6} r="0.55" fill="#FFFFFF" />
      ))}
    </>
  ),
};

/* Flat language flags (EN = UK, ES = Spain, DE label uses Austria) */
const localeBands: Record<Locale, ReactElement> = {
  en: (
    <>
      <rect width="24" height="16" fill="#00247D" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#FFFFFF" strokeWidth="3.2" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#CF142B" strokeWidth="1.4" />
      <rect x="10" width="4" height="16" fill="#FFFFFF" />
      <rect y="6" width="24" height="4" fill="#FFFFFF" />
      <rect x="11" width="2" height="16" fill="#CF142B" />
      <rect y="7" width="24" height="2" fill="#CF142B" />
    </>
  ),
  es: (
    <>
      <rect width="24" height="16" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
    </>
  ),
  de: (
    <>
      <rect width="24" height="16" fill="#ED2939" />
      <rect y="5.34" width="24" height="5.34" fill="#FFFFFF" />
    </>
  ),
  pt: (
    <>
      <rect width="24" height="16" fill="#009C3B" />
      <polygon points="12,2 22,8 12,14 2,8" fill="#FFDF00" />
      <circle cx="12" cy="8" r="3.2" fill="#002776" />
    </>
  ),
};

export function LocaleFlag({ code, className = "" }: { code: Locale; className?: string }) {
  const id = useId().replace(/:/g, "");
  const clip = `lflag-${code}-${id}`;
  return (
    <svg viewBox="0 0 24 16" className={className} role="img" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <rect width="24" height="16" rx="2.5" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>{localeBands[code]}</g>
      <rect x="0.4" y="0.4" width="23.2" height="15.2" rx="2.2" fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="0.8" />
    </svg>
  );
}
