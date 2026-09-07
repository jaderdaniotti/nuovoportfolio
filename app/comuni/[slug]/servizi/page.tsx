import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { InnerPageShell } from "@/components/inner-page-shell";
import { ServicesPageContent } from "@/components/sections/services-page-content";
import { comuneServiceJsonLd } from "@/lib/comune-json-ld";
import {
  comunePageMetadata,
  getLocalizedSeo,
  requireComune,
  type ComuneSlugParams,
} from "@/lib/comune-page";
import { comuneContattiPath, comuneServicePath } from "@/lib/comune-paths";
import { serviceIndexItems } from "@/lib/services-content";

export const revalidate = 2592000;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: ComuneSlugParams): Promise<Metadata> {
  const { slug } = await params;
  const comune = requireComune(slug);
  return comunePageMetadata(comune, "servizi");
}

export default async function ComuneServiziPage({
  params,
}: ComuneSlugParams) {
  const { slug } = await params;
  const comune = requireComune(slug);
  const seo = getLocalizedSeo(comune, "servizi");

  return (
    <InnerPageShell>
      <JsonLd data={comuneServiceJsonLd(comune, seo)} />
      <ServicesPageContent
        locale={{
          eyebrow: seo.eyebrow,
          title: "Servizi web a",
          titleLine2: `${comune.nome} (${comune.sigla}).`,
          body: seo.lead,
          cta: seo.cta,
          contactHref: comuneContattiPath(comune.slug),
          items: serviceIndexItems.map((item) => ({
            ...item,
            link: comuneServicePath(comune.slug, item.link.replace("/servizi/", "")),
            text: `${item.text} · ${comune.nome}`,
          })),
        }}
      />
    </InnerPageShell>
  );
}
