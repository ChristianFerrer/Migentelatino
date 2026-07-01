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

/* Flat language flags (EN = UK, ES = Spain, DE = Germany, PT = Portugal) */
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
      <rect width="24" height="16" fill="#000000" />
      <rect y="5.34" width="24" height="5.33" fill="#DD0000" />
      <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
    </>
  ),
  pt: (
    <>
      <rect width="24" height="16" fill="#DA291C" />
      <rect width="9.6" height="16" fill="#046A38" />
      <circle cx="9.6" cy="8" r="2.4" fill="#FFE800" />
      <circle cx="9.6" cy="8" r="1.1" fill="#DA291C" />
    </>
  ),
};

/* Extra country flags (same flat style) for the "País de origen" picker,
   beyond the six that already exist in `bands`. */
const originExtraBands: Record<string, ReactElement> = {
  cl: (
    <>
      <rect width="24" height="16" fill="#FFFFFF" />
      <rect y="8" width="24" height="8" fill="#D52B1E" />
      <rect width="8" height="8" fill="#0039A6" />
      <polygon
        points="4,2 4.47,3.353 5.902,3.382 4.761,4.247 5.176,5.618 4,4.8 2.824,5.618 3.239,4.247 2.098,3.382 3.53,3.353"
        fill="#FFFFFF"
      />
    </>
  ),
  ec: (
    <>
      <rect width="24" height="16" fill="#FFDD00" />
      <rect y="8" width="24" height="4" fill="#034EA2" />
      <rect y="12" width="24" height="4" fill="#ED1C24" />
    </>
  ),
  bo: (
    <>
      <rect width="24" height="5.34" fill="#D52B1E" />
      <rect y="5.34" width="24" height="5.33" fill="#F9E300" />
      <rect y="10.67" width="24" height="5.33" fill="#007934" />
    </>
  ),
  uy: (
    <>
      <rect width="24" height="16" fill="#FFFFFF" />
      <rect y="1.78" width="24" height="1.78" fill="#0038A8" />
      <rect y="5.34" width="24" height="1.78" fill="#0038A8" />
      <rect y="8.9" width="24" height="1.78" fill="#0038A8" />
      <rect y="12.46" width="24" height="1.78" fill="#0038A8" />
      <rect width="8" height="7.12" fill="#FFFFFF" />
      <circle cx="4" cy="3.56" r="1.6" fill="#FCD116" />
    </>
  ),
  py: (
    <>
      <rect width="24" height="5.34" fill="#D52B1E" />
      <rect y="5.34" width="24" height="5.33" fill="#FFFFFF" />
      <rect y="10.67" width="24" height="5.33" fill="#0038A8" />
      <polygon
        points="12,6.6 12.329,7.547 13.331,7.567 12.533,8.173 12.823,9.133 12,8.56 11.177,9.133 11.467,8.173 10.669,7.567 11.671,7.547"
        fill="#F5C518"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="0.25"
      />
    </>
  ),
  other: (
    <>
      <rect width="24" height="16" fill="#8FA3B8" />
      <circle cx="12" cy="8" r="4.4" fill="none" stroke="#FFFFFF" strokeWidth="0.9" />
      <ellipse cx="12" cy="8" rx="1.9" ry="4.4" fill="none" stroke="#FFFFFF" strokeWidth="0.9" />
      <line x1="7.6" y1="8" x2="16.4" y2="8" stroke="#FFFFFF" strokeWidth="0.9" />
    </>
  ),
};

/* Flag for a country-of-origin option: reuses the six main country flags and
   adds the extras above; falls back to the globe for anything unknown. */
export function OriginFlag({ code, className = "" }: { code: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  const clip = `oflag-${code}-${id}`;
  const content =
    (bands as Record<string, ReactElement>)[code] ?? originExtraBands[code] ?? originExtraBands.other;
  return (
    <svg viewBox="0 0 24 16" className={className} role="img" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <rect width="24" height="16" rx="2.5" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>{content}</g>
      <rect x="0.4" y="0.4" width="23.2" height="15.2" rx="2.2" fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="0.8" />
    </svg>
  );
}

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
