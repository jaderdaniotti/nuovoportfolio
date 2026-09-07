import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { ProcessPageContent } from "@/components/sections/process-page-content";
import { pageSeo } from "@/lib/seo";

const title = "Processo — jaderweb";
const description =
  "Da un'idea a qualcosa di reale. Discovery, strategy, design, sviluppo, lancio e supporto: un processo chiaro dal primo contatto alla consegna.";

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
