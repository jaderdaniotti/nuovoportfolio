import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { WhyUsPageContent } from "@/components/sections/why-us-page-content";
import { pageSeo } from "@/lib/seo";

const title = "Perché lavorare con me | Freelance web — jaderweb";
const description =
  "Referente unico, stack moderno e codice su misura quando serve. Scelgo la soluzione giusta al progetto — non un pacchetto da listino.";

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
