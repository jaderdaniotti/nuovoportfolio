import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { InnerPageShell } from "@/components/inner-page-shell";
import { ProcessPageContent } from "@/components/sections/process-page-content";
import { comuneServiceJsonLd } from "@/lib/comune-json-ld";
import {
  comunePageMetadata,
  getLocalizedSeo,
  requireComune,
  type ComuneSlugParams,
} from "@/lib/comune-page";
import { comuneContattiPath, comuneServiziPath } from "@/lib/comune-paths";

export const revalidate = 2592000;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: ComuneSlugParams): Promise<Metadata> {
  const { slug } = await params;
  const comune = requireComune(slug);
  return comunePageMetadata(comune, "processo");
}

export default async function ComuneProcessoPage({
  params,
}: ComuneSlugParams) {
  const { slug } = await params;
  const comune = requireComune(slug);
  const seo = getLocalizedSeo(comune, "processo");

  return (
    <InnerPageShell>
      <JsonLd data={comuneServiceJsonLd(comune, seo)} />
      <ProcessPageContent
        locale={{
          eyebrow: seo.eyebrow,
          extra: seo.lead,
          serviziHref: comuneServiziPath(comune.slug),
          contactHref: comuneContattiPath(comune.slug),
          ctaTitle: `Un sito a ${comune.nome} parte da una conversazione.`,
          ctaBody: seo.cta,
        }}
      />
    </InnerPageShell>
  );
}
