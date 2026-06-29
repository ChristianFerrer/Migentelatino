/* eslint-disable @next/next/no-img-element */
export function Logo({ className = "" }: { className?: string; light?: boolean }) {
  return (
    <img
      src="/logo.webp"
      alt="Mi Gente Latino"
      className={`h-11 w-auto ${className}`}
    />
  );
}
