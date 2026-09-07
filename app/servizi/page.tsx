import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { JsonLd } from "@/components/json-ld";
import { ServicesPageContent } from "@/components/sections/services-page-content";
import { serviziHubJsonLd } from "@/lib/json-ld";
import { pageSeo } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

const title = "Servizi — jaderweb";
const description =
  "Siti verticali, landing, prenotazioni, preventivi e digitalizzazione per aziende e professionisti a Udine e in Italia. Dal matrimonio al ristorante, dal B&B all’artigiano.";

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
