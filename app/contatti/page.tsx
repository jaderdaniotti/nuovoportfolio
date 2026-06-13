import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";
import { JsonLd } from "@/components/json-ld";
import { indexableRobots } from "@/lib/seo-robots";
import {
  buildContattiPageJsonLd,
  contattiPageMetadata,
} from "@/lib/seo-pricing-contatti";

export const metadata: Metadata = {
  ...contattiPageMetadata,
  robots: indexableRobots,
};

export default function ContattiRoutePage() {
  return (
    <>
      <JsonLd data={buildContattiPageJsonLd()} />
      <ContactPage />
    </>
  );
}
