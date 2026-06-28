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

const icons: Record<IconKey, ReactElement> = {
  grocery: (
    <>
      <rect x="10" y="14" width="28" height="26" rx="4" fill="#FFE0DB" />
      <path d="M16 14a8 8 0 0 1 16 0" stroke="#FF6B5C" strokeWidth="3" strokeLinecap="round" />
      <circle cx="19" cy="24" r="2.5" fill="#FF6B5C" />
      <circle cx="29" cy="24" r="2.5" fill="#FFC233" />
    </>
  ),
  drink: (
    <>
      <path d="M16 12h16l-2 26a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4L16 12Z" fill="#D7F5EE" />
      <path d="M16 12h16l-.6 8H16.6L16 12Z" fill="#2EC4A6" />
      <path d="M24 6v6" stroke="#1FA98D" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  snack: (
    <>
      <rect x="12" y="10" width="24" height="28" rx="3" fill="#FFF3D6" />
      <path d="M12 16h24M12 32h24" stroke="#FFC233" strokeWidth="3" />
      <circle cx="24" cy="24" r="4" fill="#FF6B5C" />
    </>
  ),
  spice: (
    <>
      <rect x="16" y="18" width="16" height="22" rx="3" fill="#FFE0DB" />
      <rect x="18" y="10" width="12" height="8" rx="2" fill="#FF6B5C" />
      <circle cx="21" cy="14" r="1" fill="#fff" />
      <circle cx="24" cy="14" r="1" fill="#fff" />
      <circle cx="27" cy="14" r="1" fill="#fff" />
    </>
  ),
  fresh: (
    <>
      <circle cx="24" cy="28" r="12" fill="#D7F5EE" />
      <circle cx="24" cy="28" r="12" stroke="#2EC4A6" strokeWidth="2.5" />
      <path d="M24 16c0-4 3-7 7-7-1 4-3 7-7 7Z" fill="#2EC4A6" />
    </>
  ),
  frozen: (
    <>
      <circle cx="24" cy="24" r="14" fill="#E9E2FF" />
      <path d="M24 10v28M11.8 17l24.4 14M11.8 31l24.4-14" stroke="#7C5CFF" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  heart: (
    <>
      <path d="M24 39s-13-7.2-13-16a7 7 0 0 1 13-3.6A7 7 0 0 1 37 23c0 8.8-13 16-13 16Z" fill="#FFE0DB" stroke="#FF6B5C" strokeWidth="2.5" strokeLinejoin="round" />
    </>
  ),
  truck: (
    <>
      <rect x="6" y="16" width="22" height="16" rx="2" fill="#D7F5EE" />
      <path d="M28 22h7l5 6v4H28V22Z" fill="#2EC4A6" />
      <circle cx="15" cy="34" r="3.5" fill="#1F1B2E" />
      <circle cx="33" cy="34" r="3.5" fill="#1F1B2E" />
    </>
  ),
  globe: (
    <>
      <circle cx="24" cy="24" r="14" fill="#FFF3D6" stroke="#FFC233" strokeWidth="2.5" />
      <path d="M10 24h28M24 10c4 4 4 24 0 28M24 10c-4 4-4 24 0 28" stroke="#F0A000" strokeWidth="2" />
    </>
  ),
  mail: (
    <>
      <rect x="8" y="12" width="32" height="24" rx="3" fill="#FFE0DB" />
      <path d="M9 14l15 11 15-11" stroke="#FF6B5C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  cart: (
    <>
      <path d="M8 10h4l3 18h18l3-12H14" stroke="#7C5CFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#E9E2FF" />
      <circle cx="18" cy="36" r="3" fill="#7C5CFF" />
      <circle cx="32" cy="36" r="3" fill="#7C5CFF" />
    </>
  ),
  box: (
    <>
      <path d="M24 8l14 7v18l-14 7-14-7V15l14-7Z" fill="#D7F5EE" stroke="#2EC4A6" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M10 15l14 7 14-7M24 22v20" stroke="#1FA98D" strokeWidth="2.5" strokeLinejoin="round" />
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
