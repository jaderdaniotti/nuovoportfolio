import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { SitePreviewFrame } from "@/components/site-preview-frame";
import { portfolioProjects } from "@/lib/home-content";
import { getLinkTitle } from "@/lib/link-titles";

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function PortfolioSection({
  label = "Portfolio",
  title,
  body,
}: {
  label?: string;
  title?: ReactNode;
  body?: string;
}) {
  return (
    <section
      id="portfolio"
      className="border-y border-border bg-background py-24 text-foreground lg:py-32"
    >
      <div className="page-shell">
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-tight">
            {title ?? (
              <>
                Non ti racconto quello che so fare.
                <br />
                Te lo mostro.
              </>
            )}
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            {body ??
              "Una selezione di progetti live: anteprima del sito reale, nello stesso browser."}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {portfolioProjects.map((project, index) => (
            <Reveal key={project.url} delay={0.08 + (index % 3) * 0.05}>
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
                  <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                    {project.title}
                  </h3>
                  <a
                    href={project.url}
                    title={getLinkTitle(project.url, `Apri sito ${project.title}`)}
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
      </div>
    </section>
  );
}
