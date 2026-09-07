import type { Metadata } from "next";
import Link from "next/link";
import { InnerPageShell } from "@/components/inner-page-shell";
import { Button } from "@/components/button";
import { pageSeo } from "@/lib/seo";
import { noindexRobots } from "@/lib/seo-robots";

const title = "Messaggio inviato — jaderweb";
const description =
  "Grazie per avermi scritto. Ti rispondo a breve. Questa pagina non è indicizzata.";

export const metadata: Metadata = {
  title,
  description,
  robots: noindexRobots,
  ...pageSeo("/grazie", { title, description }),
};

export default function GraziePage() {
  return (
    <InnerPageShell>
      <section className="bg-hero py-20 text-foreground lg:py-28">
        <div className="page-shell max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Contatti
          </p>
          <h1 className="font-display mt-4 text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            Grazie — messaggio ricevuto
          </h1>
          <p className="mt-6 text-[1.1rem] leading-relaxed text-muted">
            Ti rispondo io, di solito entro un giorno lavorativo. Se è urgente,
            scrivimi pure su WhatsApp.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/">Torna alla home</Button>
            <Button href="/servizi" variant="outline">
              Servizi
            </Button>
            <Link
              href="https://wa.me/393513152008"
              className="inline-flex h-12 items-center text-sm font-semibold underline-offset-4 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </InnerPageShell>
  );
}
