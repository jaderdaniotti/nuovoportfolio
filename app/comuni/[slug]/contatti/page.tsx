import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { InnerPageShell } from "@/components/inner-page-shell";
import { ContactPageContent } from "@/components/sections/contact-page-content";
import { comuneServiceJsonLd } from "@/lib/comune-json-ld";
import {
  comunePageMetadata,
  getLocalizedSeo,
  requireComune,
  type ComuneSlugParams,
} from "@/lib/comune-page";
import { comuneLabel } from "@/lib/comuni";

export const revalidate = 2592000;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: ComuneSlugParams): Promise<Metadata> {
  const { slug } = await params;
  const comune = requireComune(slug);
  return comunePageMetadata(comune, "contatti");
}

export default async function ComuneContattiPage({
  params,
}: ComuneSlugParams) {
  const { slug } = await params;
  const comune = requireComune(slug);
  const seo = getLocalizedSeo(comune, "contatti");

  return (
    <InnerPageShell>
      <JsonLd data={comuneServiceJsonLd(comune, seo)} />
      <ContactPageContent
        locale={{
          eyebrow: seo.eyebrow,
          subtitle: seo.lead,
          locationLine: `${comuneLabel(comune)} · ${comune.provincia}, ${comune.regione}`,
        }}
      />
    </InnerPageShell>
  );
}
