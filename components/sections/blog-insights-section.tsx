import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import {
  getServicePostsByService,
  SERVICE_BLOG_POSTS,
} from "@/lib/blog/posts";
import type { ServiceBlogPost } from "@/lib/blog/types";

function seededPosts(
  posts: ServiceBlogPost[],
  seed: number,
  limit: number,
): ServiceBlogPost[] {
  if (posts.length <= limit) return posts;
  const start = Math.abs(seed) % posts.length;
  const rotated = [...posts.slice(start), ...posts.slice(0, start)];
  return rotated.slice(0, limit);
}

export function BlogInsightsSection({
  service,
  title = "Approfondimenti dal blog",
  limit = 5,
  seed,
}: {
  service?: string;
  title?: string;
  limit?: number;
  /** Se impostato, ruota la selezione post (es. codice comune) per varietà tra landing. */
  seed?: number;
}) {
  const pool = service
    ? getServicePostsByService(service)
    : [...SERVICE_BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  const posts =
    seed == null ? pool.slice(0, limit) : seededPosts(pool, seed, limit);

  if (posts.length === 0) return null;

  return (
    <section className="border-b border-border bg-background py-20 text-foreground lg:py-28">
      <div className="page-shell">
        <Reveal>
          <SectionLabel>Blog</SectionLabel>
          <h2 className="font-display max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Guide collegate a questo tema. Ogni pezzo punta a una decisione
            concreta.
          </p>
        </Reveal>

        <ul className="mt-10 max-w-3xl divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-baseline justify-between gap-6 py-5 transition"
              >
                <span className="font-display text-lg font-semibold tracking-tight transition group-hover:opacity-70 md:text-xl">
                  {post.title}
                </span>
                <span className="shrink-0 text-sm font-medium text-muted transition group-hover:text-foreground">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8">
          <Link
            href="/blog"
            className="text-sm font-medium underline decoration-accent decoration-2 underline-offset-4 transition hover:opacity-70"
          >
            Tutto il blog
          </Link>
        </p>
      </div>
    </section>
  );
}
