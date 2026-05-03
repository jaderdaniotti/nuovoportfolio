import { escapeXmlText } from "@/lib/sitemap-xml-builder";
import { buildSitemapEntries } from "@/lib/sitemap-entries";

const WWW_BASE_URL = "https://www.jaderweb.com";

function toIsoDate(value: string | Date): string {
  const asDate = value instanceof Date ? value : new Date(value);
  return Number.isNaN(asDate.getTime()) ? new Date().toISOString() : asDate.toISOString();
}

function buildXmlForEntries() {
  const entries = buildSitemapEntries(WWW_BASE_URL);
  const lines: string[] = [];

  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  for (const entry of entries) {
    lines.push("  <url>");
    lines.push(`    <loc>${escapeXmlText(entry.url)}</loc>`);
    if (entry.lastModified) {
      lines.push(`    <lastmod>${escapeXmlText(toIsoDate(entry.lastModified))}</lastmod>`);
    }
    if (entry.changeFrequency) {
      lines.push(`    <changefreq>${entry.changeFrequency}</changefreq>`);
    }
    if (typeof entry.priority === "number") {
      lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
    }
    lines.push("  </url>");
  }

  lines.push("</urlset>");

  return lines.join("\n");
}

export function GET() {
  return new Response(buildXmlForEntries(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
