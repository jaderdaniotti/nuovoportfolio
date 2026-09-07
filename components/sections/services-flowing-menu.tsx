import FlowingMenu from "@/components/flowing-menu";
import type { MenuItemData } from "@/components/flowing-menu";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { serviceIndexItems } from "@/lib/services-content";

export function ServicesFlowingMenuSection({
  items,
  label = "Servizi",
  title = "Tutti i servizi web.",
}: {
  items?: MenuItemData[];
  label?: string;
  title?: string;
}) {
  return (
    <section
      id="indice-servizi"
      className="border-y border-border bg-background text-center text-foreground"
    >
      <div className="page-shell pt-16 pb-8 text-center lg:pt-20">
        <Reveal className="flex flex-col items-center text-center">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
            {title}
          </h2>
        </Reveal>
      </div>
      <FlowingMenu items={items ?? [...serviceIndexItems]} speed={12} />
    </section>
  );
}
