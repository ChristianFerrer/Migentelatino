/* eslint-disable @next/next/no-img-element */
export function Logo({ className = "h-11" }: { className?: string; light?: boolean }) {
  return (
    <img
      src="/logo.webp"
      alt="Mi Gente Latino"
      className={`w-auto ${className}`}
    />
  );
}
