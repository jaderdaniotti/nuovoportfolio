import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PricingPage } from "@/components/pricing/pricing-page";
import { indexableRobots } from "@/lib/seo-robots";
import {
  buildPricingPageJsonLd,
  pricingPageMetadata,
} from "@/lib/seo-pricing-contatti";

export const metadata: Metadata = {
  ...pricingPageMetadata,
  robots: indexableRobots,
};

export default function PricingRoutePage() {
  return (
    <>
      <JsonLd data={buildPricingPageJsonLd()} />
      <PricingPage />
    </>
  );
}
