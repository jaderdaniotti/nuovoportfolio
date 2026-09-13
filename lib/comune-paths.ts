export const COMUNI_HUB_PATH = "/comuni";

/**
 * Silo Italia `/comuni` disattivato.
 * Le ~190k URL template (comune × servizi/processo/contatti) diluivano
 * l’autorità su Udine e Gemona del Friuli. Restano le landing editoriali
 * Le landing extra restano noindex. Imposta `true` solo per riattivare il silo.
 */
export const COMUNI_SILO_ENABLED = false;

/** Mappa slug silo → landing editoriale (bundle piccolo, usabile da proxy/config). */
export const COMUNI_SILO_EDITORIAL_BY_SLUG: Record<string, string> = {
  "gemona-del-friuli-ud": "/",
  "udine-ud": "/",
  "buja-ud": "/servizi",
  "artegna-ud": "/servizi",
  "osoppo-ud": "/servizi",
  "venzone-ud": "/servizi",
  "tarcento-ud": "/servizi",
  "majano-ud": "/servizi",
  "trasaghis-ud": "/servizi",
  "forgaria-nel-friuli-ud": "/servizi",
  "san-daniele-del-friuli-ud": "/servizi",
  "tolmezzo-ud": "/servizi",
};

/** Destinazione 301/308 se il silo è spento; `null` se il path non è del silo. */
export function resolveDisabledComuneSiloPath(pathname: string): string | null {
  if (COMUNI_SILO_ENABLED) return null;
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/comuni") return "/servizi";
  if (path.startsWith("/comuni/sitemap")) return "/sitemap.xml";
  const match = path.match(/^\/comuni\/([^/]+)/);
  if (!match) return null;
  return COMUNI_SILO_EDITORIAL_BY_SLUG[match[1]] ?? "/servizi";
}

export function getDisabledComuneSiloRedirects(): Array<{
  source: string;
  destination: string;
  permanent: true;
}> {
  if (COMUNI_SILO_ENABLED) return [];
  return [
    { source: "/comuni", destination: "/servizi", permanent: true },
    {
      source: "/comuni/sitemap/:path*",
      destination: "/sitemap.xml",
      permanent: true,
    },
    ...Object.entries(COMUNI_SILO_EDITORIAL_BY_SLUG).flatMap(
      ([slug, destination]) => [
        { source: `/comuni/${slug}`, destination, permanent: true as const },
        {
          source: `/comuni/${slug}/:path*`,
          destination,
          permanent: true as const,
        },
      ],
    ),
    { source: "/comuni/:path*", destination: "/servizi", permanent: true },
  ];
}

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
