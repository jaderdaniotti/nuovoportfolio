import CurvedLoop from "@/components/curved-loop";
import { Reveal } from "@/components/reveal";
import { authorityStrip } from "@/lib/home-content";

export function AuthorityStripSection() {
  return (
    <section className="w-full overflow-hidden border-y border-border bg-background text-foreground">
      <Reveal delay={0.12} className="flex h-11 w-full items-center sm:h-16 lg:h-24">
        <CurvedLoop
          marqueeText={authorityStrip.marqueeText}
          speed={2}
          curveAmount={0}
          direction="left"
          interactive
          className="tracking-[0.04em]"
        />
      </Reveal>
    </section>
  );
}
