import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { ProcessTimeline } from "@/components/process-timeline";
import { processSection, processSteps } from "@/lib/home-content";

export function ProcessSection() {
  return (
    <section
      id="processo"
      className="border-y border-border bg-background py-20 text-foreground lg:py-10"
    >
      <div className="page-shell">
        <Reveal className="mx-auto max-w-5xl text-center">
          <SectionLabel className="justify-center">Processo</SectionLabel>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
            {processSection.title}
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-[clamp(1.05rem,2.2vw,1.35rem)] leading-relaxed text-muted">
            {processSection.body}
          </p>
        </Reveal>

        <ProcessTimeline
          items={processSteps.map((step) => ({
            number: step.number,
            title: step.title,
            description: step.description,
          }))}
        />
      </div>
    </section>
  );
}
