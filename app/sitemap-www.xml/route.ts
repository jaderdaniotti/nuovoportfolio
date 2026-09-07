import { escapeXmlText } from "@/lib/sitemap-xml-builder";
import { absoluteUrl } from "@/lib/seo";
import { toolsCatalog } from "@/lib/tools-catalog";
import { servicePages } from "@/lib/service-pages";

const WWW_BASE = "https://www.jaderweb.com";

function toWww(url: string) {
  return url.replace("https://jaderweb.com", WWW_BASE);
}

function buildCoreEntries() {
  const paths = [
    "/",
    "/servizi",
    ...servicePages.map((s) => `/servizi/${s.slug}`),
    "/processo",
    "/perche-noi",
    "/contatti",
    "/comuni",
    "/privacy",
    "/cookie",
    "/tools",
    ...toolsCatalog.map((t) => `/tools/${t.slug}`),
  ];
  const now = new Date().toISOString();
  return paths.map((path) => ({
    url: toWww(absoluteUrl(path)),
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

export function GET() {
  const entries = buildCoreEntries();
  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  for (const entry of entries) {
    lines.push("  <url>");
    lines.push(`    <loc>${escapeXmlText(entry.url)}</loc>`);
    lines.push(`    <lastmod>${escapeXmlText(entry.lastModified)}</lastmod>`);
    lines.push(`    <changefreq>${entry.changeFrequency}</changefreq>`);
    lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
    lines.push("  </url>");
  }
  lines.push("</urlset>");
  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
