import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { caseStudy } from "@/lib/home-content";

export function CaseStudySection() {
  return (
    <section className="bg-background py-24 text-foreground lg:py-32">
      <div className="page-shell grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border bg-accent">
            <div className="absolute inset-6 rounded-[1.5rem] border border-ink/15 bg-ink/5" />
            <div className="absolute inset-0 flex flex-col justify-end p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                Case study
              </p>
              <p className="font-display mt-2 text-3xl font-semibold text-ink">
                E-commerce
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <SectionLabel>Progetto in evidenza</SectionLabel>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.05] tracking-tight">
            {caseStudy.title}
          </h2>

          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-muted">Cliente</dt>
              <dd>{caseStudy.client}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-muted">Settore</dt>
              <dd>{caseStudy.sector}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-muted">Soluzione</dt>
              <dd>{caseStudy.solution}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-muted">Servizi</dt>
              <dd>{caseStudy.services}</dd>
            </div>
          </dl>

          <p className="mt-8 leading-relaxed text-muted">
            {caseStudy.result}
          </p>

          <Button
            href="/contatti"
            variant="linkAccent"
            className="mt-8 tracking-[0.12em]"
          >
            Scopri il progetto
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
