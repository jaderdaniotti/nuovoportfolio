import { SITE_URL, absoluteUrl } from "@/lib/seo";
import { getFeaturedComuni } from "@/lib/comuni";
import { comuneBasePath } from "@/lib/comune-paths";
import { SERVICE_BLOG_POSTS } from "@/lib/blog/posts";
import { servicePages } from "@/lib/service-pages";

/** Chiave IndexNow pubblica (file in /public/{key}.txt). */
export const INDEXNOW_KEY = "65b9b0e3cda1f55c78d585dbd033293e";

export const INDEXNOW_KEY_LOCATION = absoluteUrl(`/${INDEXNOW_KEY}.txt`);

/** Endpoint condiviso (Bing e altri engine IndexNow). */
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/**
 * URL core da notificare post-deploy.
 * Non includere il silo 190K: IndexNow ha limiti e non serve saturarlo.
 */
export function getIndexNowCoreUrls(): string[] {
  const core = [
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
    "/comuni",
    "/tools",
  ].map((path) => absoluteUrl(path));

  const services = servicePages.map((page) =>
    absoluteUrl(`/servizi/${page.slug}`),
  );

  const topComuni = getFeaturedComuni(12).map((comune) =>
    absoluteUrl(comuneBasePath(comune.slug)),
  );

  const recentBlog = [...SERVICE_BLOG_POSTS]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 20)
    .map((post) => absoluteUrl(`/blog/${post.slug}`));

  return [...new Set([...core, ...services, ...topComuni, ...recentBlog])];
}

export function getIndexNowHost(): string {
  return new URL(SITE_URL).host;
}

export type IndexNowResult = {
  ok: boolean;
  status: number;
  submitted: number;
  body: string;
};

export async function submitIndexNow(
  urls: string[],
  fetchImpl: typeof fetch = fetch,
): Promise<IndexNowResult> {
  const payload = {
    host: getIndexNowHost(),
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: urls,
  };

  const response = await fetchImpl(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const body = await response.text();
  return {
    ok: response.status === 200 || response.status === 202,
    status: response.status,
    submitted: urls.length,
    body,
  };
}
