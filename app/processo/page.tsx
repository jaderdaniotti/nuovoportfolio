import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { ProcessPageContent } from "@/components/sections/process-page-content";
import { pageSeo } from "@/lib/seo";

const title = "Come lavoro su un sito web | Processo chiaro — jaderweb";
const description =
  "Dal brief al go-live: discovery, design, sviluppo e supporto. Ti dico tempi, perimetro e cosa serve da te — senza agenzia a strati.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSeo("/processo", { title, description }),
};

export default function ProcessoPage() {
  return (
    <InnerPageShell>
      <ProcessPageContent />
    </InnerPageShell>
  );
}
