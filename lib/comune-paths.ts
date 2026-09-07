export const COMUNI_HUB_PATH = "/comuni";

export function comuneBasePath(slug: string) {
  return `${COMUNI_HUB_PATH}/${slug}`;
}

export function comuneServiziPath(slug: string) {
  return `${comuneBasePath(slug)}/servizi`;
}

export function comuneServicePath(slug: string, serviceSlug: string) {
  return `${comuneServiziPath(slug)}/${serviceSlug}`;
}

export function comuneProcessoPath(slug: string) {
  return `${comuneBasePath(slug)}/processo`;
}

export function comunePercheNoiPath(slug: string) {
  return `${comuneBasePath(slug)}/perche-noi`;
}

export function comuneContattiPath(slug: string) {
  return `${comuneBasePath(slug)}/contatti`;
}

export type ComuneSiloLink = {
  label: string;
  href: string;
};

export function getComuneSiloLinks(slug: string): ComuneSiloLink[] {
  return [
    { label: "Home", href: comuneBasePath(slug) },
    { label: "Servizi", href: comuneServiziPath(slug) },
    { label: "Processo", href: comuneProcessoPath(slug) },
    { label: "Perché noi", href: comunePercheNoiPath(slug) },
    { label: "Contatti", href: comuneContattiPath(slug) },
  ];
}
