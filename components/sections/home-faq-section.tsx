import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { homeFaqs } from "@/lib/home-content";

export function HomeFaqSection() {
  return (
    <section
      id="faq"
      className="border-y border-border bg-background py-20 text-foreground lg:py-24"
    >
      <div className="page-shell">
        <Reveal className="max-w-3xl">
          <SectionLabel>Domande</SectionLabel>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight">
            Domande frequenti
          </h2>
        </Reveal>
        <dl className="mt-12 space-y-10">
          {homeFaqs.map((item) => (
            <div key={item.question}>
              <dt className="font-display text-lg font-semibold tracking-tight">
                {item.question}
              </dt>
              <dd className="mt-3 max-w-3xl text-[1.02rem] leading-relaxed text-muted">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
