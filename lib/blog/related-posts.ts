import {
  SERVICE_BLOG_POSTS,
  getServicePostsByService,
} from "@/lib/blog/posts";
import type { ServiceBlogPost } from "@/lib/blog/types";
import { getServiceSeo } from "@/lib/service-seo";

const RELATED_LIMIT = 4;

function keywordOverlap(a: string[], b: string[]) {
  const setB = new Set(b.map((k) => k.toLowerCase()));
  return a.reduce((score, k) => score + (setB.has(k.toLowerCase()) ? 1 : 0), 0);
}

/**
 * Related posts graph: same service → related servizi → keyword overlap → recent fill.
 */
export function getRelatedBlogPosts(
  post: ServiceBlogPost,
  limit = RELATED_LIMIT,
): ServiceBlogPost[] {
  const exclude = new Set([post.slug]);
  const picked: ServiceBlogPost[] = [];

  const push = (candidates: ServiceBlogPost[]) => {
    for (const candidate of candidates) {
      if (picked.length >= limit) break;
      if (exclude.has(candidate.slug)) continue;
      exclude.add(candidate.slug);
      picked.push(candidate);
    }
  };

  const sameService = getServicePostsByService(post.service)
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  push(sameService);

  if (picked.length < limit) {
    const seo = getServiceSeo(post.service);
    const relatedServices = seo?.relatedServices ?? [];
    const fromRelatedServices = relatedServices.flatMap((service) =>
      getServicePostsByService(service),
    );
    push(
      [...fromRelatedServices].sort((a, b) => {
        const score =
          keywordOverlap(b.keywords, post.keywords) -
          keywordOverlap(a.keywords, post.keywords);
        if (score !== 0) return score;
        return a.date < b.date ? 1 : -1;
      }),
    );
  }

  if (picked.length < limit) {
    const rest = [...SERVICE_BLOG_POSTS]
      .filter((p) => !exclude.has(p.slug))
      .sort((a, b) => {
        const score =
          keywordOverlap(b.keywords, post.keywords) -
          keywordOverlap(a.keywords, post.keywords);
        if (score !== 0) return score;
        return a.date < b.date ? 1 : -1;
      });
    push(rest);
  }

  return picked;
}
