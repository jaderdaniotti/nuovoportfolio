import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/button";
import { site } from "@/lib/home-content";
import { noindexRobots } from "@/lib/seo-robots";

export const metadata: Metadata = {
  title: "Offline — jaderweb",
  description:
    "Sei offline. Torna alla home o contattami quando la connessione riparte.",
  robots: noindexRobots,
};

export default function OfflinePage() {
  return (
    <main className="relative flex min-h-dvh flex-col bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_55%),linear-gradient(180deg,var(--hero)_0%,var(--background)_70%)]"
      />

      <header className="border-b border-border/80">
        <div className="page-shell flex h-16 items-center gap-3 md:h-20">
          <BrandLogo priority />
          <span className="font-display text-sm font-semibold uppercase tracking-tight md:text-base">
            {site.name}
          </span>
        </div>
      </header>

      <section className="flex flex-1 items-center py-16 md:py-24">
        <div className="page-shell max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Offline · PWA
          </p>
          <h1 className="font-display mt-4 text-[clamp(2.2rem,5.5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight">
            Niente rete, per ora.
          </h1>
          <p className="mt-6 text-[1.1rem] leading-relaxed text-muted">
            Sono Jader — questa shell resta disponibile anche offline. Appena
            torna la connessione riprendi da home, servizi o scrivimi.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/">Torna alla home</Button>
            <Button href="/contatti" variant="outline">
              Contatti
            </Button>
            <Button href="/servizi" variant="outline">
              Servizi
            </Button>
          </div>

          <p className="mt-12 text-sm text-muted">
            Urgente?{" "}
            <Link
              href={`https://wa.me/${site.whatsapp}`}
              className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 transition hover:opacity-80"
              rel="noopener noreferrer"
              target="_blank"
            >
              WhatsApp {site.phoneDisplay}
            </Link>
          </p>
        </div>
      </section>

      <footer className="border-t border-border py-6">
        <div className="page-shell text-xs text-muted">
          {site.name} · {site.location}
        </div>
      </footer>
    </main>
  );
}
