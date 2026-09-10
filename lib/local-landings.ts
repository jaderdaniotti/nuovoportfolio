import { localLandingPages } from "@/lib/local-landings-data";
import type {
  LocalLandingPage,
  LocalLandingSlug,
} from "@/lib/local-landings-types";

export type {
  LocalHeroVariant,
  LocalLandingFaq,
  LocalLandingPage,
  LocalLandingService,
  LocalLandingSlug,
  LocalSectionId,
  LocalServicesVariant,
} from "@/lib/local-landings-types";

export const LOCAL_LANDINGS_HUB_PATH = "/siti-web";

export const LOCAL_LANDINGS_HUB_SEO = {
  title: "Siti web in Alto Friuli | Gemona, Tolmezzo e comuni vicini",
  description:
    "Sviluppatore web per Gemona del Friuli, Alto Friuli, Tolmezzo e Udine. Landing locali per siti, e-commerce e attività del territorio.",
  h1: "Sviluppatore web in Alto Friuli",
  lead: "Pagine scritte per chi cerca un sito a Gemona del Friuli e nei comuni intorno — non directory clonate. Un referente da Udine, progetti sul territorio.",
} as const;

const bySlug = new Map(
  localLandingPages.map((page) => [page.slug, page] as const),
);

const byComuneSlug = new Map(
  localLandingPages.map((page) => [page.comuneSlug, page] as const),
);

const byPath = new Map(
  localLandingPages.map((page) => [page.path, page] as const),
);

export function getLocalLandingPages(): LocalLandingPage[] {
  return localLandingPages;
}

export function getLocalLanding(
  slug: string,
): LocalLandingPage | undefined {
  return bySlug.get(slug as LocalLandingSlug);
}

export function requireLocalLanding(slug: string): LocalLandingPage {
  const page = getLocalLanding(slug);
  if (!page) {
    throw new Error(`Local landing not found: ${slug}`);
  }
  return page;
}

export function getLocalLandingByComuneSlug(
  comuneSlug: string,
): LocalLandingPage | undefined {
  return byComuneSlug.get(comuneSlug);
}

export function getLocalLandingByPath(
  path: string,
): LocalLandingPage | undefined {
  return byPath.get(path);
}

/** Landings routed under `/siti-web/[slug]` (Udine stays on `/udine`). */
export function getRoutedLocalLandings(): LocalLandingPage[] {
  return localLandingPages.filter((page) => page.path.startsWith(`${LOCAL_LANDINGS_HUB_PATH}/`));
}

export function localLandingPath(slug: LocalLandingSlug): string {
  return requireLocalLanding(slug).path;
}

export function relatedLandings(
  page: LocalLandingPage,
): LocalLandingPage[] {
  return page.relatedSlugs
    .map((slug) => getLocalLanding(slug))
    .filter((item): item is LocalLandingPage => Boolean(item));
}

export type LocalLandingNavItem = {
  href: string;
  label: string;
  name: string;
};

export function getLocalLandingNavItems(): LocalLandingNavItem[] {
  return [...localLandingPages]
    .sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name, "it"))
    .map((page) => ({
      href: page.path,
      label: `Siti web a ${page.name}`,
      name: page.name,
    }));
}
