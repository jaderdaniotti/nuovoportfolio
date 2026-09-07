import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { JsonLd } from "@/components/json-ld";
import { ServicesPageContent } from "@/components/sections/services-page-content";
import { serviziHubJsonLd } from "@/lib/json-ld";
import { pageSeo } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

const title = "Servizi siti web verticali | Udine — jaderweb";
const description =
  "Siti per matrimoni, ristoranti, B&B, artigiani e professionisti: prenotazioni, preventivi, landing ads e digitalizzazione. Scegli il verticale e partiamo.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSeo("/servizi", { title, description }),
};

export default function ServiziPage() {
  return (
    <InnerPageShell>
      <JsonLd data={serviziHubJsonLd([...servicePages])} />
      <ServicesPageContent />
    </InnerPageShell>
  );
}
