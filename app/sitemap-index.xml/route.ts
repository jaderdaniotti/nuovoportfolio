import { buildSitemapIndexXml } from "@/lib/sitemap-index";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildSitemapIndexXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
