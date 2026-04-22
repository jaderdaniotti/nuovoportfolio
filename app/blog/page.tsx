import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { blogPosts } from "@/content/blog-posts";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Blog — ${siteConfig.name}`,
  description:
    "Articoli su web design, UX, SEO locale e performance: note di lavoro per PMI e professionisti.",
  keywords: [
    "blog web design",
    "SEO Udine",
    "articoli UX",
    "Next.js tutorial",
    ...siteConfig.keywords.slice(0, 4),
  ] as string[],
  openGraph: {
    title: `Blog — ${siteConfig.name}`,
    description: "Articoli su design, UX e visibilità online.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <SiteHeader />
      <main className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">Blog</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
            Note su design, SEO e sviluppo.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600">
            Contenuti pratici per migliorare sito vetrina, testi e visibilità locale — aggiornati nel tempo.
          </p>

          <ul className="mt-12 grid gap-6">
            {sorted.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-3xl border border-zinc-200 bg-zinc-50/50 p-8 transition hover:border-violet-300 hover:bg-white hover:shadow-[0_24px_80px_-32px_rgba(109,40,217,0.22)]"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("it-IT", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span>·</span>
                    <span>{post.readingMinutes} min di lettura</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 group-hover:text-violet-800">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-zinc-600">{post.description}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-violet-700">
                    Leggi l&apos;articolo →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
