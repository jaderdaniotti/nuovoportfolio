import { SERVICE_BLOG_POSTS } from "@/lib/blog/posts";
import { LEGACY_BLOG_REDIRECTS } from "@/lib/legacy-blog-redirects";
import { LEGACY_PATH_REDIRECTS } from "@/lib/legacy-path-redirects";
import { servicePages } from "@/lib/service-pages";

export type RedirectSuggestion = {
  from: string;
  to: string;
  reason: string;
  score: number;
};

const CORE_PATHS = [
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
  "/siti-web/gemona-del-friuli",
  "/comuni",
  "/tools",
];

function normalizePath(input: string) {
  try {
    const url = input.includes("://") ? new URL(input) : null;
    const path = url ? url.pathname : input;
    return path.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
  } catch {
    return input.split("?")[0]?.replace(/\/$/, "") || "/";
  }
}

function tokens(path: string) {
  return path
    .toLowerCase()
    .split(/[^a-z0-9àèéìòù]+/i)
    .filter((t) => t.length > 2);
}

function overlapScore(a: string[], b: string[]) {
  if (!a.length || !b.length) return 0;
  const setB = new Set(b);
  let hits = 0;
  for (const t of a) if (setB.has(t)) hits += 1;
  return hits / Math.max(a.length, 1);
}

/** Suggerimenti redirect da un path 404 (UI not-found + tool log). */
export function suggestRedirectsForPath(
  rawPath: string,
  limit = 5,
): RedirectSuggestion[] {
  const from = normalizePath(rawPath);
  const fromTokens = tokens(from);
  const out: RedirectSuggestion[] = [];

  for (const rule of [...LEGACY_PATH_REDIRECTS, ...LEGACY_BLOG_REDIRECTS]) {
    if (normalizePath(rule.source) === from) {
      out.push({
        from,
        to: rule.destination,
        reason: "mappa legacy già configurata",
        score: 100,
      });
    }
  }

  for (const page of servicePages) {
    const candidate = `/servizi/${page.slug}`;
    const score =
      overlapScore(fromTokens, tokens(candidate)) * 40 +
      overlapScore(fromTokens, tokens(page.name)) * 30;
    if (score >= 12) {
      out.push({
        from,
        to: candidate,
        reason: `servizio correlato: ${page.name}`,
        score,
      });
    }
  }

  for (const post of SERVICE_BLOG_POSTS) {
    const candidate = `/blog/${post.slug}`;
    const score =
      overlapScore(fromTokens, tokens(post.slug)) * 50 +
      overlapScore(fromTokens, tokens(post.title)) * 20;
    if (score >= 18) {
      out.push({
        from,
        to: candidate,
        reason: "articolo blog correlato",
        score,
      });
    }
  }

  for (const path of CORE_PATHS) {
    const score = overlapScore(fromTokens, tokens(path)) * 35;
    if (score >= 10) {
      out.push({
        from,
        to: path,
        reason: "pagina core",
        score,
      });
    }
  }

  // Heuristics EN leftovers
  if (/pric|prezz|tariff/i.test(from)) {
    out.push({
      from,
      to: "/costo-sito-web",
      reason: "pattern prezzi",
      score: 60,
    });
  }
  if (/contact|contatt/i.test(from)) {
    out.push({ from, to: "/contatti", reason: "pattern contatti", score: 55 });
  }

  const seen = new Set<string>();
  return out
    .sort((a, b) => b.score - a.score)
    .filter((item) => {
      if (seen.has(item.to)) return false;
      seen.add(item.to);
      return item.to !== from;
    })
    .slice(0, limit);
}

/** Da elenco path 404 (es. top paths da access log) → candidati redirect. */
export function suggestRedirectsFrom404Paths(
  paths: string[],
  limitPerPath = 3,
): RedirectSuggestion[] {
  const all: RedirectSuggestion[] = [];
  for (const path of paths) {
    all.push(...suggestRedirectsForPath(path, limitPerPath));
  }
  const best = new Map<string, RedirectSuggestion>();
  for (const item of all) {
    const key = `${item.from}→${item.to}`;
    const prev = best.get(key);
    if (!prev || item.score > prev.score) best.set(key, item);
  }
  return [...best.values()].sort((a, b) => b.score - a.score);
}
