import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { WhyUsPageContent } from "@/components/sections/why-us-page-content";
import { pageSeo } from "@/lib/seo";

const title = "Perché noi — jaderweb";
const description =
  "Tecnologia moderna e codice proprietario, quando serve. Scegliamo la soluzione più adatta al progetto: sviluppo su misura o piattaforma.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSeo("/perche-noi", { title, description }),
};

export default function PercheNoiPage() {
  return (
    <InnerPageShell>
      <WhyUsPageContent />
    </InnerPageShell>
  );
}
