export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display font-bold ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[conic-gradient(from_140deg,#F2A93B,#E2611E,#D8442B,#1F7A6B,#F2A93B)] shadow-glow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 3.5C19 16.65 12 21 12 21Z"
            fill="#FFFDF7"
          />
        </svg>
      </span>
      <span className={`leading-none ${light ? "text-cream" : "text-ink"}`}>
        Mi Gente <span className={light ? "text-sun" : "text-coral"}>Latino</span>
      </span>
    </span>
  );
}
