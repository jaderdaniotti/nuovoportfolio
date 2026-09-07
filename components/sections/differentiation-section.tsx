import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { StickyStackCards } from "@/components/sticky-stack-cards";
import { differentiation } from "@/lib/home-content";

export function DifferentiationSection() {
  return (
    <section className="bg-background py-20 text-foreground lg:py-10 border-y border-border">
      <div className="page-shell">
        <Reveal className="mx-auto max-w-5xl text-center">
          <SectionLabel className="justify-center">Perché noi</SectionLabel>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
            {differentiation.title}
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-[clamp(1.05rem,2.2vw,1.35rem)] leading-relaxed text-muted">
            {differentiation.body}
          </p>
        </Reveal>

        <StickyStackCards items={[...differentiation.points]} />
      </div>
    </section>
  );
}
