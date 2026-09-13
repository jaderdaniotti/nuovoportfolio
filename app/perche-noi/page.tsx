import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { WhyUsPageContent } from "@/components/sections/why-us-page-content";
import { pageSeo } from "@/lib/seo";

const title = "Perché un web designer freelance | jaderweb";
const description =
  "Lavori con uno sviluppatore sito web freelance, non con un’agenzia. Referente unico, stack moderno e codice su misura quando serve.";

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
