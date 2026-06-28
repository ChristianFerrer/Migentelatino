import type { ReactElement, SVGProps } from "react";

/**
 * Flat, colorful, world-class duotone icons drawn inline as SVG.
 * No external icon dependency — keeps the bundle tiny and fully themeable.
 */

type IconKey =
  | "grocery"
  | "drink"
  | "snack"
  | "spice"
  | "fresh"
  | "frozen"
  | "heart"
  | "truck"
  | "globe"
  | "mail"
  | "cart"
  | "box";

const base = { viewBox: "0 0 48 48", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

// Fiesta Pop palette — bold flat icons: bright fills + black outlines.
//   Orange #FF6A00 · Yellow #EAFF00 · Cyan #14E0C8
//   Violet #8B3DFF · Fuchsia #F4108C · Black #141414
const K = "#141414"; // outline
const icons: Record<IconKey, ReactElement> = {
  grocery: (
    <>
      <rect x="10" y="14" width="28" height="26" rx="4" fill="#EAFF00" stroke={K} strokeWidth="2.5" />
      <path d="M16 14a8 8 0 0 1 16 0" stroke={K} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="19" cy="25" r="2.5" fill="#FF6A00" />
      <circle cx="29" cy="25" r="2.5" fill="#8B3DFF" />
    </>
  ),
  drink: (
    <>
      <path d="M16 12h16l-2 26a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4L16 12Z" fill="#14E0C8" stroke={K} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M17 20h14" stroke={K} strokeWidth="2.5" />
      <path d="M24 6v6" stroke={K} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  snack: (
    <>
      <rect x="12" y="10" width="24" height="28" rx="3" fill="#FF6A00" stroke={K} strokeWidth="2.5" />
      <path d="M12 17h24M12 31h24" stroke={K} strokeWidth="2.5" />
      <circle cx="24" cy="24" r="4" fill="#EAFF00" stroke={K} strokeWidth="2" />
    </>
  ),
  spice: (
    <>
      <rect x="16" y="18" width="16" height="22" rx="3" fill="#8B3DFF" stroke={K} strokeWidth="2.5" />
      <rect x="18" y="10" width="12" height="8" rx="2" fill="#FF6A00" stroke={K} strokeWidth="2.5" />
      <circle cx="21" cy="14" r="1" fill="#fff" />
      <circle cx="24" cy="14" r="1" fill="#fff" />
      <circle cx="27" cy="14" r="1" fill="#fff" />
    </>
  ),
  fresh: (
    <>
      <circle cx="24" cy="28" r="12" fill="#FF6A00" stroke={K} strokeWidth="2.5" />
      <path d="M24 16c0-4 3-7 7-7-1 4-3 7-7 7Z" fill="#14E0C8" stroke={K} strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  frozen: (
    <>
      <circle cx="24" cy="24" r="14" fill="#14E0C8" stroke={K} strokeWidth="2.5" />
      <path d="M24 12v24M13.6 18l20.8 12M13.6 30l20.8-12" stroke={K} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  heart: (
    <>
      <path d="M24 39s-13-7.2-13-16a7 7 0 0 1 13-3.6A7 7 0 0 1 37 23c0 8.8-13 16-13 16Z" fill="#F4108C" stroke={K} strokeWidth="2.5" strokeLinejoin="round" />
    </>
  ),
  truck: (
    <>
      <rect x="6" y="16" width="22" height="16" rx="2" fill="#EAFF00" stroke={K} strokeWidth="2.5" />
      <path d="M28 22h7l5 6v4H28V22Z" fill="#14E0C8" stroke={K} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="15" cy="34" r="3.5" fill="#141414" />
      <circle cx="33" cy="34" r="3.5" fill="#141414" />
    </>
  ),
  globe: (
    <>
      <circle cx="24" cy="24" r="14" fill="#14E0C8" stroke={K} strokeWidth="2.5" />
      <path d="M10 24h28M24 10c4 4 4 24 0 28M24 10c-4 4-4 24 0 28" stroke={K} strokeWidth="2" />
    </>
  ),
  mail: (
    <>
      <rect x="8" y="12" width="32" height="24" rx="3" fill="#FF6A00" stroke={K} strokeWidth="2.5" />
      <path d="M9 14l15 11 15-11" stroke={K} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  cart: (
    <>
      <path d="M8 10h4l3 18h18l3-12H14" fill="#8B3DFF" stroke={K} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="36" r="3" fill="#141414" />
      <circle cx="32" cy="36" r="3" fill="#141414" />
    </>
  ),
  box: (
    <>
      <path d="M24 8l14 7v18l-14 7-14-7V15l14-7Z" fill="#EAFF00" stroke={K} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M10 15l14 7 14-7M24 22v20" stroke={K} strokeWidth="2.5" strokeLinejoin="round" />
    </>
  ),
};

export function Icon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  const node = icons[name as IconKey];
  if (!node) return null;
  return (
    <svg {...base} {...props}>
      {node}
    </svg>
  );
}
