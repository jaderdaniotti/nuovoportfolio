import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { JsonLd } from "@/components/json-ld";
import { ServicesPageContent } from "@/components/sections/services-page-content";
import { serviziHubJsonLd } from "@/lib/json-ld";
import { pageSeo } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

const title = "Creazione sito web e siti aziendali | jaderweb";
const description =
  "Creazione sito web per matrimoni, ristoranti, B&B, artigiani e professionisti. Anche creazione sito internet aziendale e realizzazione sito web professionale.";

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
