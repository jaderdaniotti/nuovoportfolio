import { siteRootJsonLd } from "@/lib/json-ld";

/**
 * Legacy home JSON-LD entrypoint.
 * Canonical entity graph lives in `siteRootJsonLd` (logo, NAP, sameAs, vatID).
 */
export function buildHomePageJsonLd(): Record<string, unknown> {
  return siteRootJsonLd();
}
