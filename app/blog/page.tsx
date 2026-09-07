import type { Metadata } from "next";
import Link from "next/link";
import { InnerPageShell } from "@/components/inner-page-shell";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { SERVICE_BLOG_POSTS } from "@/lib/blog/posts";
import { blogHubJsonLd } from "@/lib/json-ld";
import { absoluteUrl, pageSeo } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

const title = "Blog siti web e SEO locale | Guide pratiche — jaderweb";
const description =
  "Guide operative su siti verticali, SEO locale e conversioni (ristoranti, B&B, matrimoni, professionisti). Scritto da me, freelance a Udine.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSeo("/blog", { title, description }),
  alternates: {
    canonical: absoluteUrl("/blog"),
    types: {
      "application/rss+xml": absoluteUrl("/blog/rss.xml"),
    },
  },
};

const SERVICE_LABELS: Record<string, string> = Object.fromEntries(
  servicePages.map((page) => [page.slug, page.name]),
);

const SERVICE_FILTERS = servicePages
  .map((page) => page.slug)
  .filter((slug) => SERVICE_BLOG_POSTS.some((post) => post.service === slug));

function blogHref(servizio?: string) {
  if (!servizio) return "/blog";
  return `/blog?servizio=${encodeURIComponent(servizio)}`;
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const servizio =
    typeof params.servizio === "string" ? params.servizio.trim() : "";
  const activeService = SERVICE_FILTERS.includes(servizio) ? servizio : "";

  const sorted = [...SERVICE_BLOG_POSTS]
    .filter((post) => (activeService ? post.service === activeService : true))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <InnerPageShell>
      <JsonLd data={blogHubJsonLd(SERVICE_BLOG_POSTS)} />
      <div className="bg-background text-foreground">
        <section className="border-b border-border bg-hero py-20 lg:py-28">
          <div className="page-shell">
            <Reveal>
              <SectionLabel>Blog</SectionLabel>
              <h1 className="font-display max-w-4xl text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
                Testi utili.
                <br />
                Decisioni più chiare.
              </h1>
              <p className="mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
                Articoli su siti per mestieri precisi. Scrivo da freelance a
                Udine: meno teoria, più cose che puoi usare sul tuo progetto.
              </p>
              <p className="mt-4 text-sm text-muted">
                <a
                  href="/blog/rss.xml"
                  className="underline-offset-4 transition hover:text-foreground hover:underline"
                >
                  Feed RSS
                </a>
                {" · "}
                <Link
                  href="/udine"
                  className="underline-offset-4 transition hover:text-foreground hover:underline"
                >
                  Siti web Udine
                </Link>
                {" · "}
                <Link
                  href="/costo-sito-web"
                  className="underline-offset-4 transition hover:text-foreground hover:underline"
                >
                  Costo sito web
                </Link>
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-border py-10">
          <div className="page-shell">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Filtra per servizio
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              <li>
                <Link
                  href={blogHref()}
                  className={`inline-flex rounded-md border px-3 py-2 text-sm transition hover:border-foreground/40 ${
                    !activeService
                      ? "border-foreground bg-foreground text-background"
                      : "border-border"
                  }`}
                >
                  Tutti ({SERVICE_BLOG_POSTS.length})
                </Link>
              </li>
              {SERVICE_FILTERS.map((slug) => {
                const count = SERVICE_BLOG_POSTS.filter(
                  (post) => post.service === slug,
                ).length;
                return (
                  <li key={slug}>
                    <Link
                      href={blogHref(slug)}
                      className={`inline-flex rounded-md border px-3 py-2 text-sm transition hover:border-foreground/40 ${
                        activeService === slug
                          ? "border-foreground bg-foreground text-background"
                          : "border-border"
                      }`}
                    >
                      {SERVICE_LABELS[slug] ?? slug} ({count})
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="page-shell">
            {activeService ? (
              <p className="mx-auto mb-6 max-w-4xl text-sm text-muted">
                {sorted.length} articoli ·{" "}
                {SERVICE_LABELS[activeService] ?? activeService}
                {" · "}
                <Link href={blogHref()} className="underline-offset-4 hover:underline">
                  Mostra tutti
                </Link>
              </p>
            ) : null}
            <ul className="mx-auto max-w-4xl divide-y divide-border border-y border-border">
              {sorted.map((post, index) => (
                <li key={post.slug}>
                  <Reveal delay={Math.min(0.04 + (index % 8) * 0.02, 0.2)}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group grid gap-3 py-8 transition md:grid-cols-[7rem_1fr_auto] md:items-baseline md:gap-8"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                        {SERVICE_LABELS[post.service] ?? post.service}
                      </span>
                      <span>
                        <span className="font-display block text-[clamp(1.15rem,2.4vw,1.55rem)] font-semibold leading-snug tracking-tight transition group-hover:opacity-70">
                          {post.title}
                        </span>
                        <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-muted md:text-[0.95rem]">
                          {post.description}
                        </span>
                      </span>
                      <span className="text-sm font-medium text-muted transition group-hover:text-foreground">
                        Leggi →
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </InnerPageShell>
  );
}
