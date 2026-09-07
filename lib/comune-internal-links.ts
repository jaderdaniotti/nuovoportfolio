import { getFeaturedComuni, type ComuneData } from "@/lib/comuni";
import { comuneBasePath, comuneServicePath } from "@/lib/comune-paths";

export type ComuneLinkItem = {
  href: string;
  label: string;
};

/** Top comuni per popolazione — linking hub da servizi/blog. */
export function getTopComuniLinks(limit = 8): ComuneLinkItem[] {
  return getFeaturedComuni(limit).map((comune) => ({
    href: comuneBasePath(comune.slug),
    label: `Siti web a ${comune.nome}`,
  }));
}

/** Stesso servizio verticalizzato sui comuni più grandi. */
export function getTopComuniServiceLinks(
  serviceSlug: string,
  serviceName: string,
  limit = 8,
): ComuneLinkItem[] {
  return getFeaturedComuni(limit).map((comune) => ({
    href: comuneServicePath(comune.slug, serviceSlug),
    label: `${serviceName} a ${comune.nome}`,
  }));
}

export function getTopComuniData(limit = 8): ComuneData[] {
  return getFeaturedComuni(limit);
}
