import Link from "next/link";
import { Button } from "@/components/button";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import {
  LOCAL_LANDINGS_HUB_SEO,
  getLocalLandingPages,
} from "@/lib/local-landings";
import { getLinkTitle } from "@/lib/link-titles";
import { shouldPrefetchHref } from "@/lib/prefetch";

export function LocalLandingsHubContent() {
  const pages = [...getLocalLandingPages()].sort(
    (a, b) => a.priority - b.priority || a.name.localeCompare(b.name, "it"),
  );

  return (
    <article className="bg-background text-foreground">
      <header className="border-b border-border bg-hero py-20 lg:py-28">
        <div className="page-shell">
          <Reveal>
            <nav aria-label="Percorso" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <li>
                  <Link
                    href="/"
                    title={getLinkTitle("/", "Home")}
                    prefetch={shouldPrefetchHref("/")}
                    className="underline-offset-4 transition hover:text-foreground hover:underline"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-foreground">Alto Friuli</li>
              </ol>
            </nav>
            <SectionLabel>Gemona · Carnia · Udine</SectionLabel>
            <h1 className="font-display max-w-4xl text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
              {LOCAL_LANDINGS_HUB_SEO.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
              {LOCAL_LANDINGS_HUB_SEO.lead}
            </p>
            <div className="mt-10">
              <Button href="/siti-web/gemona-del-friuli">
                Parti da Gemona
              </Button>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="page-shell py-16 lg:py-24">
        <Reveal>
          <SectionLabel>Pagine locali</SectionLabel>
          <h2 className="font-display max-w-3xl text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold leading-[1.05] tracking-tight">
            Ogni comune ha un angolo diverso. Nessuna pagina è un copia-incolla.
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {pages.map((page) => (
            <li key={page.slug}>
              <Link
                href={page.path}
                title={getLinkTitle(page.path, page.h1)}
                prefetch={shouldPrefetchHref(page.path)}
                className="block h-full rounded-md border border-border p-6 transition hover:border-foreground/40"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {page.eyebrow}
                </p>
                <h3 className="font-display mt-3 text-xl font-semibold tracking-tight">
                  {page.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {page.focus}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <aside className="mt-16 border-t border-border pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Approfondisci
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href="/udine"
                className="text-muted underline-offset-4 transition hover:text-foreground hover:underline"
              >
                Sviluppatore web a Udine
              </Link>
            </li>
            <li>
              <Link
                href="/friuli"
                className="text-muted underline-offset-4 transition hover:text-foreground hover:underline"
              >
                Freelance in Friuli Venezia Giulia
              </Link>
            </li>
            <li>
              <Link
                href="/servizi"
                className="text-muted underline-offset-4 transition hover:text-foreground hover:underline"
              >
                Tutti i servizi
              </Link>
            </li>
            <li>
              <Link
                href="/comuni"
                className="text-muted underline-offset-4 transition hover:text-foreground hover:underline"
              >
                Directory comuni d’Italia
              </Link>
            </li>
          </ul>
        </aside>
      </div>

      <FinalCtaSection
        title="Non trovi il tuo comune in elenco?"
        body="Seguo anche i paesi limitrofi. Scrivimi: ti dico se ha senso una pagina dedicata o se partiamo direttamente dal progetto."
        cta="Contattami"
        href="/contatti"
      />
    </article>
  );
}
