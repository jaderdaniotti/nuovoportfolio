/**
 * Costruzione sitemap XML secondo https://www.sitemaps.org/protocol.html
 * (namespace 0.9, max 50.000 URL per file).
 */

export type Changefreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export const SITEMAP_MAX_URLS = 50_000;

export function escapeXmlText(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export type UrlParseFailure = { line: number; reason: string; raw: string };

export function normalizeHttpUrl(candidate: string): string | null {
  const trimmed = candidate.trim();
  if (!trimmed) return null;
  let u: URL;
  try {
    u = new URL(trimmed);
  } catch {
    return null;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") {
    return null;
  }
  u.hash = "";
  return u.toString();
}

export type ParsedUrlInput = {
  entries: { url: string; line: number }[];
  errors: UrlParseFailure[];
  duplicatesDropped: number;
};

export function parseUrlInput(raw: string): ParsedUrlInput {
  const lines = raw.split(/\r?\n/);
  const seen = new Set<string>();
  const entries: { url: string; line: number }[] = [];
  const errors: UrlParseFailure[] = [];
  let duplicatesDropped = 0;

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i] ?? "";
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const normalized = normalizeHttpUrl(trimmed);
    if (!normalized) {
      errors.push({ line: lineNum, reason: "URL non valido (usa http o https)", raw: trimmed });
      continue;
    }
    if (seen.has(normalized)) {
      duplicatesDropped++;
      continue;
    }
    seen.add(normalized);
    entries.push({ url: normalized, line: lineNum });
  }

  return { entries, errors, duplicatesDropped };
}

export type SitemapBuilderOptions = {
  includeLastmod: boolean;
  /** Formato YYYY-MM-DD (W3C date) */
  lastmodDate: string;
  includeChangefreq: boolean;
  changefreq: Changefreq;
  includePriority: boolean;
  /** 0–1 inclusi */
  priority: number;
};

function formatPriority(p: number): string {
  const clamped = Math.min(1, Math.max(0, p));
  return clamped.toFixed(1);
}

export function buildSitemapXml(urls: string[], options: SitemapBuilderOptions): string {
  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  const lastmod =
    options.includeLastmod && options.lastmodDate.trim() ? options.lastmodDate.trim() : "";

  for (const url of urls) {
    lines.push("  <url>");
    lines.push(`    <loc>${escapeXmlText(url)}</loc>`);
    if (lastmod) {
      lines.push(`    <lastmod>${escapeXmlText(lastmod)}</lastmod>`);
    }
    if (options.includeChangefreq) {
      lines.push(`    <changefreq>${options.changefreq}</changefreq>`);
    }
    if (options.includePriority) {
      lines.push(`    <priority>${formatPriority(options.priority)}</priority>`);
    }
    lines.push("  </url>");
  }

  lines.push("</urlset>");
  return lines.join("\n");
}
