import { absoluteUrl } from "@/lib/seo";
import { getComuniSitemapChunkCount } from "@/lib/sitemap-entries";
import { CORE_CONTENT_LASTMOD, COMUNI_CONTENT_LASTMOD } from "@/lib/sitemap-dates";

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

/** Sitemap index unico: core + chunk comuni (entry point GSC). */
export function buildSitemapIndexXml() {
  const lastCore = toIsoDate(CORE_CONTENT_LASTMOD);
  const lastComuni = toIsoDate(COMUNI_CONTENT_LASTMOD);
  const chunkCount = getComuniSitemapChunkCount();

  const sitemaps = [
    { loc: absoluteUrl("/sitemap.xml"), lastmod: lastCore },
    ...Array.from({ length: chunkCount }, (_, id) => ({
      loc: absoluteUrl(`/comuni/sitemap/${id}.xml`),
      lastmod: lastComuni,
    })),
  ];

  const body = sitemaps
    .map(
      (item) => `  <sitemap>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
  </sitemap>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}
