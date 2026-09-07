import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { InnerPageShell } from "@/components/inner-page-shell";
import { ServiceDetailContent } from "@/components/sections/service-detail-content";
import { comuneServiceJsonLd } from "@/lib/comune-json-ld";
import {
  comunePageMetadata,
  getLocalizedSeo,
  requireComune,
  type ComuneServiceParams,
} from "@/lib/comune-page";
import {
  COMUNI_HUB_PATH,
  comuneBasePath,
  comuneContattiPath,
  comuneServicePath,
  comuneServiziPath,
} from "@/lib/comune-paths";
import { getServicePage } from "@/lib/service-pages";

export const revalidate = 2592000;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: ComuneServiceParams): Promise<Metadata> {
  const { slug, service } = await params;
  const comune = requireComune(slug);
  if (!getServicePage(service)) notFound();
  return comunePageMetadata(comune, "service", service);
}

export default async function ComuneServicePage({
  params,
}: ComuneServiceParams) {
  const { slug, service } = await params;
  const comune = requireComune(slug);
  const page = getServicePage(service);
  if (!page) notFound();
  const seo = getLocalizedSeo(comune, "service", service);

  return (
    <InnerPageShell>
      <JsonLd data={comuneServiceJsonLd(comune, seo, { service: page })} />
      <ServiceDetailContent
        page={page}
        locale={{
          h1: seo.h1,
          localLead: seo.lead,
          contactHref: comuneContattiPath(comune.slug),
          relatedBasePath: comuneServiziPath(comune.slug),
          ctaTitle: `${page.ctaTitle} A ${comune.nome}.`,
          ctaBody: seo.cta,
          breadcrumbs: [
            { href: "/", label: "Home" },
            { href: COMUNI_HUB_PATH, label: "Comuni" },
            { href: comuneBasePath(comune.slug), label: comune.nome },
            { href: comuneServiziPath(comune.slug), label: "Servizi" },
            {
              href: comuneServicePath(comune.slug, page.slug),
              label: page.name,
            },
          ],
        }}
      />
    </InnerPageShell>
  );
}
