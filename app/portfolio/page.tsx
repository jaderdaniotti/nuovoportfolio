import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { PortfolioPageContent } from "@/components/sections/portfolio-page-content";
import { pageSeo } from "@/lib/seo";

const title = "Portfolio — jaderweb";
const description =
  "Progetti web realizzati da Jader Daniotti: siti, hospitality, retail e portfolio. Anteprime live e lavori consegnati.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSeo("/portfolio", { title, description }),
};

export default function PortfolioPage() {
  return (
    <InnerPageShell>
      <PortfolioPageContent />
    </InnerPageShell>
  );
}
