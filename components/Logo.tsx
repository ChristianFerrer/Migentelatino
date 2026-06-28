export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display font-extrabold ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[conic-gradient(from_140deg,#B57BFF,#4FE3C9,#CFF598,#F0379E,#B57BFF)] shadow-glow-violet">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 3.5C19 16.65 12 21 12 21Z"
            fill="#160727"
          />
        </svg>
      </span>
      <span className="leading-none text-white">
        Mi Gente{" "}
        <span className="bg-gradient-to-r from-grape via-mint to-sun bg-clip-text text-transparent">Latino</span>
      </span>
    </span>
  );
}
