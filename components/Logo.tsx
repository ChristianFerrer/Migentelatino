export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display font-extrabold ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-coral via-sun to-mint text-white shadow-glow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 3.5C19 16.65 12 21 12 21Z"
            fill="white"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className="text-ink">Mi Gente</span>{" "}
        <span className="bg-gradient-to-r from-coral to-grape bg-clip-text text-transparent">Latino</span>
      </span>
    </span>
  );
}
