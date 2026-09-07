import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/button";
import type { ComuneData } from "@/lib/comuni";
import { comuneLabel } from "@/lib/comuni";
import type { ComunePageSeo } from "@/lib/comuni-seo";
import { comuneContattiPath, comuneServiziPath } from "@/lib/comune-paths";

/** Hero silo: HTML visibile subito, niente framer/Reveal/iframe (LCP). */
export function ComuneHeroSection({
  comune,
  seo,
}: {
  comune: ComuneData;
  seo: ComunePageSeo;
}) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-hero pt-8 text-foreground lg:pt-12"
    >
      <div className="page-shell grid min-w-0 gap-10 pb-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-8 lg:pb-24 xl:gap-10">
        <div className="min-w-0">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            {seo.eyebrow}
          </p>

          <h1 className="font-display max-w-xl break-words text-[clamp(2.2rem,4.8vw,3.75rem)] font-semibold leading-[1.04] tracking-tight">
            {seo.h1}
          </h1>

          <p className="mt-6 max-w-lg text-[clamp(1rem,2vh,1.15rem)] leading-relaxed text-muted">
            {comune.seo.opening}
          </p>
          <p className="mt-4 max-w-lg text-[clamp(1rem,2vh,1.15rem)] leading-relaxed text-muted">
            {comune.seo.angle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted">
              {comune.provincia} ({comune.sigla})
            </span>
            <span className="rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted">
              {comune.regione}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={comuneContattiPath(comune.slug)}>{seo.cta}</Button>
            <Button
              href={comuneServiziPath(comune.slug)}
              variant="outline"
              arrow="down"
            >
              Servizi a {comuneLabel(comune)}
            </Button>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-[min(70vw,18rem)] overflow-hidden lg:mx-0 lg:aspect-auto lg:h-[min(28rem,52vh)] lg:w-full">
          <BrandLogo
            fill
            sizes="(max-width: 1024px) 70vw, 40vw"
            className="object-contain object-center lg:object-right"
            priority
          />
        </div>
      </div>
    </section>
  );
}
