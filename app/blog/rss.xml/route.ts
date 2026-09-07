import { SERVICE_BLOG_POSTS } from "@/lib/blog/posts";
import { site } from "@/lib/home-content";
import { absoluteUrl, OG_SITE_NAME, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateIso: string) {
  const date = new Date(`${dateIso}T12:00:00.000Z`);
  return date.toUTCString();
}

export function GET() {
  const posts = [...SERVICE_BLOG_POSTS].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
  const lastBuild = posts[0] ? toRfc822(posts[0].date) : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.service)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${OG_SITE_NAME} — Blog`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escapeXml(
      "Guide su siti verticali, SEO locale e conversioni. Di Jader Daniotti, freelance a Udine.",
    )}</description>
    <language>it-it</language>
    <managingEditor>${escapeXml(`${site.email} (Jader Daniotti)`)}</managingEditor>
    <webMaster>${escapeXml(`${site.email} (jaderweb)`)}</webMaster>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <docs>https://www.rssboard.org/rss-specification</docs>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
