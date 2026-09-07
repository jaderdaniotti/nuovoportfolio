import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { SitePreviewFrame } from "@/components/site-preview-frame";
import { Button } from "@/components/button";
import { BlogInsightsSection } from "@/components/sections/blog-insights-section";
import { portfolioProjects } from "@/lib/home-content";

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function PortfolioPageContent() {
  return (
    <div className="bg-background text-foreground">
      <section className="border-b border-border py-20 lg:py-28">
        <div className="page-shell">
          <Reveal>
            <SectionLabel>Portfolio</SectionLabel>
            <h1 className="font-display max-w-4xl text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
              Lavori reali.
              <br />
              Risultati online.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Una selezione dei siti che ho progettato e sviluppato: hospitality, retail,
              corporate e portfolio professionali. Dove possibile vedi l&apos;anteprima live.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contatti">
                Parliamo del tuo progetto →
              </Button>
              <Button href="/servizi" variant="outline">
                Vedi i servizi
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="page-shell">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {portfolioProjects.map((project, index) => (
              <Reveal key={project.url} delay={0.06 + (index % 3) * 0.04}>
                <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-foreground/[0.03]">
                  <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="h-2 w-2 rounded-full bg-foreground/20" />
                    <span className="h-2 w-2 rounded-full bg-foreground/20" />
                    <span className="ml-2 truncate text-[11px] text-muted">
                      {hostnameOf(project.url)}
                    </span>
                  </div>

                  <div className="relative aspect-video overflow-hidden bg-foreground/[0.04]">
                    <SitePreviewFrame
                      url={project.url}
                      fallbackSrc={
                        "desktopSrc" in project ? project.desktopSrc : undefined
                      }
                      alt={project.title}
                      viewportWidth={1440}
                      viewportHeight={900}
                      sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
                      lazy
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                      {project.tags}
                    </p>
                    <h2 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                      {project.title}
                    </h2>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-70"
                    >
                      Apri sito
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 rounded-[1.5rem] border border-border bg-foreground/[0.03] p-8 md:p-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Vuoi il prossimo progetto in questa lista?
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Raccontami attività, obiettivi e tempi. Ti rispondo con una prima valutazione
              concreta — senza giro di parole.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contatti">
                Richiedi una valutazione →
              </Button>
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-muted underline-offset-4 hover:text-foreground hover:underline"
              >
                Leggi il blog
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <BlogInsightsSection
        service="cv-portfolio"
        title="Dal portfolio al sito che converte."
        limit={5}
      />
    </div>
  );
}
