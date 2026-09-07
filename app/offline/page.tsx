import type { Metadata } from "next";
import Link from "next/link";
import { InnerPageShell } from "@/components/inner-page-shell";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/button";
import { noindexRobots } from "@/lib/seo-robots";

export const metadata: Metadata = {
  title: "Offline — jaderweb",
  description: "Sei offline. Riprova quando torna la connessione.",
  robots: noindexRobots,
};

export default function OfflinePage() {
  return (
    <InnerPageShell>
      <section className="border-b border-border bg-hero py-20 lg:py-28">
        <div className="page-shell max-w-2xl">
          <SectionLabel>Offline</SectionLabel>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-tight">
            Niente rete, per ora.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Sei offline. Appena torna la connessione puoi riprendere da dove
            eri — home, servizi o contatti.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/">Torna alla home</Button>
            <Button href="/contatti" variant="outline">
              Contatti
            </Button>
          </div>
          <p className="mt-10 text-sm text-muted">
            <Link
              href="/servizi"
              className="underline decoration-accent decoration-2 underline-offset-4 transition hover:opacity-70"
            >
              Vedi i servizi
            </Link>
          </p>
        </div>
      </section>
    </InnerPageShell>
  );
}
