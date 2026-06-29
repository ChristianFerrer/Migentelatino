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
  | "box"
  | "bottle"
  | "can"
  | "jar"
  | "pouch"
  | "coffee"
  | "cookies";

const base = { viewBox: "0 0 48 48", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

// Acuarela palette — flat icons on light cards, ink detail.
//   Terracotta #D9542B · Golden #F2B33C · Turquoise #2F9FBE · Olive #8AA63E · Ink #221E18
const K = "#221E18"; // detail / outline
const icons: Record<IconKey, ReactElement> = {
  grocery: (
    <>
      <rect x="10" y="14" width="28" height="26" rx="4" fill="#8AA63E" />
      <path d="M16 14a8 8 0 0 1 16 0" stroke={K} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="19" cy="25" r="2.5" fill="#D9542B" />
      <circle cx="29" cy="25" r="2.5" fill="#F2B33C" />
    </>
  ),
  drink: (
    <>
      <path d="M16 12h16l-2 26a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4L16 12Z" fill="#2F9FBE" />
      <path d="M17 20h14" stroke={K} strokeWidth="2.5" />
      <path d="M24 6v6" stroke="#2F9FBE" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  snack: (
    <>
      <rect x="12" y="10" width="24" height="28" rx="3" fill="#D9542B" />
      <path d="M12 17h24M12 31h24" stroke={K} strokeWidth="2.5" />
      <circle cx="24" cy="24" r="4" fill="#F2B33C" />
    </>
  ),
  spice: (
    <>
      <rect x="16" y="18" width="16" height="22" rx="3" fill="#F2B33C" />
      <rect x="18" y="10" width="12" height="8" rx="2" fill="#D9542B" />
      <circle cx="21" cy="14" r="1" fill="#fff" />
      <circle cx="24" cy="14" r="1" fill="#fff" />
      <circle cx="27" cy="14" r="1" fill="#fff" />
    </>
  ),
  fresh: (
    <>
      <circle cx="24" cy="28" r="12" fill="#D9542B" />
      <path d="M24 16c0-4 3-7 7-7-1 4-3 7-7 7Z" fill="#8AA63E" />
    </>
  ),
  frozen: (
    <>
      <circle cx="24" cy="24" r="14" fill="#2F9FBE" />
      <path d="M24 12v24M13.6 18l20.8 12M13.6 30l20.8-12" stroke={K} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  heart: (
    <>
      <path d="M24 39s-13-7.2-13-16a7 7 0 0 1 13-3.6A7 7 0 0 1 37 23c0 8.8-13 16-13 16Z" fill="#D9542B" />
    </>
  ),
  truck: (
    <>
      <rect x="6" y="16" width="22" height="16" rx="2" fill="#F2B33C" />
      <path d="M28 22h7l5 6v4H28V22Z" fill="#8AA63E" />
      <circle cx="15" cy="34" r="3.5" fill={K} />
      <circle cx="33" cy="34" r="3.5" fill={K} />
    </>
  ),
  globe: (
    <>
      <circle cx="24" cy="24" r="14" fill="#2F9FBE" />
      <path d="M10 24h28M24 10c4 4 4 24 0 28M24 10c-4 4-4 24 0 28" stroke={K} strokeWidth="2" fill="none" />
    </>
  ),
  mail: (
    <>
      <rect x="8" y="12" width="32" height="24" rx="3" fill="#8AA63E" />
      <path d="M9 14l15 11 15-11" stroke={K} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  cart: (
    <>
      <path d="M8 10h4l3 18h18l3-12H14" fill="#D9542B" stroke={K} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="36" r="3" fill={K} />
      <circle cx="32" cy="36" r="3" fill={K} />
    </>
  ),
  box: (
    <>
      <path d="M24 8l14 7v18l-14 7-14-7V15l14-7Z" fill="#F2B33C" />
      <path d="M10 15l14 7 14-7M24 22v20" stroke={K} strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    </>
  ),
  // ── Packaging illustrations (homogeneous, for product showcase) ──
  bottle: (
    <>
      <rect x="20" y="6" width="8" height="6" rx="1.5" fill={K} />
      <path d="M19 12h10c.5 3 3 4 3 8v18a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V20c0-4 2.5-5 3-8Z" fill="#D9542B" />
      <rect x="16.5" y="24" width="15" height="9" rx="1.5" fill="#F4EDDD" />
    </>
  ),
  can: (
    <>
      <rect x="15" y="10" width="18" height="28" rx="3" fill="#8AA63E" />
      <ellipse cx="24" cy="10" rx="9" ry="2.6" fill={K} opacity="0.85" />
      <rect x="15" y="20" width="18" height="8" fill="#F4EDDD" opacity="0.9" />
    </>
  ),
  jar: (
    <>
      <rect x="14" y="9" width="20" height="7" rx="2" fill={K} />
      <rect x="15" y="16" width="18" height="24" rx="4" fill="#F2B33C" />
      <rect x="18" y="22" width="12" height="11" rx="1.5" fill="#F4EDDD" />
    </>
  ),
  pouch: (
    <>
      <path d="M14 12h20l-1.5 26a3 3 0 0 1-3 2.8H18.5a3 3 0 0 1-3-2.8L14 12Z" fill="#2F9FBE" />
      <rect x="13" y="9" width="22" height="4" rx="1.5" fill={K} />
      <rect x="18" y="22" width="12" height="9" rx="1.5" fill="#F4EDDD" opacity="0.95" />
    </>
  ),
  coffee: (
    <>
      <path d="M15 14h18l-1 24a3 3 0 0 1-3 2.8H19a3 3 0 0 1-3-2.8L15 14Z" fill="#D9542B" />
      <path d="M14 10l4 4h12l4-4-4-2H18l-4 2Z" fill={K} />
      <circle cx="24" cy="28" r="4.5" fill="#F2B33C" />
      <path d="M24 24.5v7" stroke={K} strokeWidth="1.6" />
    </>
  ),
  cookies: (
    <>
      <rect x="11" y="16" width="26" height="16" rx="4" fill="#8AA63E" />
      <circle cx="20" cy="24" r="5" fill="#F2B33C" />
      <circle cx="18.5" cy="22.5" r="0.9" fill={K} />
      <circle cx="21.5" cy="24.5" r="0.9" fill={K} />
      <circle cx="19.5" cy="26" r="0.9" fill={K} />
      <path d="M28 20h6M28 24h6M28 28h6" stroke="#F4EDDD" strokeWidth="1.8" strokeLinecap="round" />
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
