import Link from "next/link";
import { BlogInsightsSection } from "@/components/sections/blog-insights-section";
import { ComuneHeroSection } from "@/components/sections/comune-hero-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { SectionLabel } from "@/components/section-label";
import type { ComuneData } from "@/lib/comuni";
import { comuneLabel } from "@/lib/comuni";
import { seedFromComune, type ComunePageSeo } from "@/lib/comuni-seo";
import {
  COMUNI_HUB_PATH,
  comuneContattiPath,
  comuneServicePath,
  getComuneSiloLinks,
} from "@/lib/comune-paths";
import { serviceIndexItems } from "@/lib/services-content";

/**
 * Shell silo CWV-first: niente ScrollExpand / FlowingMenu / LogoLoop /
 * StickyStack / ProfileCard / ProcessTimeline / Hero iframe.
 */
export function ComuneHomeShell({
  comune,
  seo,
  nearby,
}: {
  comune: ComuneData;
  seo: ComunePageSeo;
  nearby: ComuneData[];
}) {
  const label = comuneLabel(comune);
  const siloPages = getComuneSiloLinks(comune.slug);
  const topServices = serviceIndexItems.slice(0, 8);

  return (
    <main>
      <ComuneHeroSection comune={comune} seo={seo} />

      <section className="border-y border-border bg-background py-16 text-foreground lg:py-20">
        <div className="page-shell">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-display mt-4 max-w-3xl text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold leading-[1.05] tracking-tight">
            Pagine di questo comune
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {siloPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-foreground/40 hover:text-foreground"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>

          {nearby.length > 0 ? (
            <>
              <h3 className="font-display mt-14 text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-tight">
                Altri comuni in {comune.provincia}
              </h3>
              <ul className="mt-6 flex flex-wrap gap-3">
                {nearby.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/comuni/${item.slug}`}
                      className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-foreground/40 hover:text-foreground"
                    >
                      Siti web a {item.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </section>

      <section className="border-b border-border bg-background py-16 text-foreground lg:py-20">
        <div className="page-shell">
          <SectionLabel>Servizi</SectionLabel>
          <h2 className="font-display mt-4 max-w-3xl text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold leading-[1.05] tracking-tight">
            Servizi web a {comune.nome}
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {topServices.map((item) => {
              const slug = item.link.replace("/servizi/", "");
              return (
                <li key={item.link}>
                  <Link
                    href={comuneServicePath(comune.slug, slug)}
                    className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-foreground/40 hover:text-foreground"
                  >
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-background py-16 text-foreground lg:py-20">
        <div className="page-shell max-w-3xl">
          <SectionLabel>Locale</SectionLabel>
          <h2 className="font-display mt-4 text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold leading-[1.05] tracking-tight">
            Un freelance web per {comune.nome}.
          </h2>
          <p className="mt-6 text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
            Sono jaderweb: progetto siti e sistemi digitali per attività di{" "}
            {label}, in {comune.provincia} e in {comune.regione}. Questa è la
            landing localizzata del comune.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3 text-sm">
            <li>
              <Link
                href={COMUNI_HUB_PATH}
                className="underline-offset-4 transition hover:underline"
              >
                Tutti i comuni
              </Link>
            </li>
            <li>
              <Link
                href={comuneContattiPath(comune.slug)}
                className="underline-offset-4 transition hover:underline"
              >
                Contatti {comune.nome}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="underline-offset-4 transition hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/udine" className="underline-offset-4 transition hover:underline">
                Pilastro Udine
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <BlogInsightsSection
        title={`Approfondimenti utili per attività a ${comune.nome}.`}
        limit={4}
        seed={seedFromComune(comune.codice)}
        instant
      />

      <FinalCtaSection
        title={`Hai un progetto a ${comune.nome}?`}
        body={seo.cta}
        href={comuneContattiPath(comune.slug)}
        instant
      />

      <section className="sr-only">
        <h2>{seo.h1}</h2>
        <p>{seo.description}</p>
        <p>
          Comune {comune.nome} / Provincia {comune.provincia} ({comune.sigla}) /
          Regione {comune.regione}
        </p>
        <p>{comune.seo.cta}</p>
      </section>
    </main>
  );
}
