export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display font-bold ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[conic-gradient(from_140deg,#F7B733,#F0473D,#15A56A,#0FB0A4,#F7B733)] shadow-glow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 3.5C19 16.65 12 21 12 21Z"
            fill="#FFF6EA"
          />
        </svg>
      </span>
      <span className="leading-none text-ink">
        Mi Gente{" "}
        <span className="bg-gradient-to-r from-coral via-sun-600 to-mint bg-clip-text text-transparent">Latino</span>
      </span>
    </span>
  );
}
