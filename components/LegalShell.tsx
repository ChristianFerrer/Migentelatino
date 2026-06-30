import type { ReactNode } from "react";
import { Logo } from "./Logo";

export function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
          <a href="/" aria-label="Mi Gente Latino home">
            <Logo className="h-9" />
          </a>
          <a href="/" className="text-sm font-semibold text-ink/50 transition hover:text-ink/80">
            ← Inicio
          </a>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="font-display text-3xl uppercase tracking-tight text-ink sm:text-4xl">{title}</h1>
        <div className="legal mt-6 space-y-4 text-[15px] leading-relaxed text-ink/80">{children}</div>
      </article>
    </main>
  );
}
