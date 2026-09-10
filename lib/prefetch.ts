/**
 * Prefetch selettivo: sì su hub commerciali, no sul silo comuni (190K URL).
 */
const PREFETCH_ALLOW = new Set([
  "/",
  "/servizi",
  "/portfolio",
  "/blog",
  "/contatti",
  "/processo",
  "/perche-noi",
  "/udine",
  "/friuli",
  "/costo-sito-web",
  "/siti-web",
  "/comuni",
  "/tools",
]);

export function shouldPrefetchHref(href: string | undefined | null): boolean {
  if (!href) return false;
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  if (href.startsWith("#")) return false;

  const path = href.split("?")[0]?.split("#")[0] || "/";

  // Mai prefetch sulle pagine locali del silo
  if (path.startsWith("/comuni/") && path !== "/comuni") {
    return false;
  }

  if (PREFETCH_ALLOW.has(path)) return true;
  if (path.startsWith("/servizi/")) return true;
  if (path.startsWith("/siti-web/")) return true;
  if (path.startsWith("/blog/")) return false; // molti articoli: on-demand
  if (path.startsWith("/tools/")) return false;

  return false;
}
