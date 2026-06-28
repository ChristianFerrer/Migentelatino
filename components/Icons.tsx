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

// Tropical Fresco palette:
//   Mango #FF7A33 / light #FFE0CC / dark #ED6118
//   Turquesa #14A6A0 / light #D2F1EF / dark #0E8882
//   Lima #8DD13C / light #EAF7D6 / dark #6FB024
//   Ocean #0E7C8B / light #D0EBEF · Navy #103A4A
const icons: Record<IconKey, ReactElement> = {
  grocery: (
    <>
      <rect x="10" y="14" width="28" height="26" rx="4" fill="#FFE0CC" />
      <path d="M16 14a8 8 0 0 1 16 0" stroke="#FF7A33" strokeWidth="3" strokeLinecap="round" />
      <circle cx="19" cy="24" r="2.5" fill="#FF7A33" />
      <circle cx="29" cy="24" r="2.5" fill="#8DD13C" />
    </>
  ),
  drink: (
    <>
      <path d="M16 12h16l-2 26a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4L16 12Z" fill="#D2F1EF" />
      <path d="M16 12h16l-.6 8H16.6L16 12Z" fill="#14A6A0" />
      <path d="M24 6v6" stroke="#0E8882" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  snack: (
    <>
      <rect x="12" y="10" width="24" height="28" rx="3" fill="#EAF7D6" />
      <path d="M12 16h24M12 32h24" stroke="#8DD13C" strokeWidth="3" />
      <circle cx="24" cy="24" r="4" fill="#FF7A33" />
    </>
  ),
  spice: (
    <>
      <rect x="16" y="18" width="16" height="22" rx="3" fill="#FFE0CC" />
      <rect x="18" y="10" width="12" height="8" rx="2" fill="#FF7A33" />
      <circle cx="21" cy="14" r="1" fill="#fff" />
      <circle cx="24" cy="14" r="1" fill="#fff" />
      <circle cx="27" cy="14" r="1" fill="#fff" />
    </>
  ),
  fresh: (
    <>
      <circle cx="24" cy="28" r="12" fill="#EAF7D6" />
      <circle cx="24" cy="28" r="12" stroke="#8DD13C" strokeWidth="2.5" />
      <path d="M24 16c0-4 3-7 7-7-1 4-3 7-7 7Z" fill="#6FB024" />
    </>
  ),
  frozen: (
    <>
      <circle cx="24" cy="24" r="14" fill="#D0EBEF" />
      <path d="M24 10v28M11.8 17l24.4 14M11.8 31l24.4-14" stroke="#0E7C8B" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  heart: (
    <>
      <path d="M24 39s-13-7.2-13-16a7 7 0 0 1 13-3.6A7 7 0 0 1 37 23c0 8.8-13 16-13 16Z" fill="#FFE0CC" stroke="#FF7A33" strokeWidth="2.5" strokeLinejoin="round" />
    </>
  ),
  truck: (
    <>
      <rect x="6" y="16" width="22" height="16" rx="2" fill="#D2F1EF" />
      <path d="M28 22h7l5 6v4H28V22Z" fill="#14A6A0" />
      <circle cx="15" cy="34" r="3.5" fill="#103A4A" />
      <circle cx="33" cy="34" r="3.5" fill="#103A4A" />
    </>
  ),
  globe: (
    <>
      <circle cx="24" cy="24" r="14" fill="#EAF7D6" stroke="#8DD13C" strokeWidth="2.5" />
      <path d="M10 24h28M24 10c4 4 4 24 0 28M24 10c-4 4-4 24 0 28" stroke="#6FB024" strokeWidth="2" />
    </>
  ),
  mail: (
    <>
      <rect x="8" y="12" width="32" height="24" rx="3" fill="#FFE0CC" />
      <path d="M9 14l15 11 15-11" stroke="#FF7A33" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  cart: (
    <>
      <path d="M8 10h4l3 18h18l3-12H14" stroke="#0E7C8B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#D0EBEF" />
      <circle cx="18" cy="36" r="3" fill="#0E7C8B" />
      <circle cx="32" cy="36" r="3" fill="#0E7C8B" />
    </>
  ),
  box: (
    <>
      <path d="M24 8l14 7v18l-14 7-14-7V15l14-7Z" fill="#D2F1EF" stroke="#14A6A0" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M10 15l14 7 14-7M24 22v20" stroke="#0E8882" strokeWidth="2.5" strokeLinejoin="round" />
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
