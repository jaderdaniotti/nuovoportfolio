import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { PortfolioPageContent } from "@/components/sections/portfolio-page-content";
import { pageSeo } from "@/lib/seo";

const title = "Portfolio siti web reali | Anteprime live — jaderweb";
const description =
  "Lavori consegnati da Jader Daniotti: siti hospitality, retail e brand con anteprime live. Guarda cosa puoi ottenere, poi scrivimi.";

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
