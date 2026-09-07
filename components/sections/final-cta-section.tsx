import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { finalCta } from "@/lib/home-content";

export function FinalCtaSection({
  title,
  body,
  cta,
  href = "/contatti",
}: {
  title?: string;
  body?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="bg-background py-24 text-foreground lg:py-32">
      <div className="page-shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-tight">
            {title ?? finalCta.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {body ?? finalCta.body}
          </p>
          <div className="mt-10">
            <Button href={href}>{cta ?? "Iniziamo a parlarne"}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
