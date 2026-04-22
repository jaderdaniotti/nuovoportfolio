import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_ARTICLES } from "@/lib/blog-articles";
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
  const sorted = [...BLOG_ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">Blog</p>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-100">
        Articoli su siti web, SEO locale e crescita digitale
      </h1>
      <p className="mt-4 max-w-3xl text-pretty text-zinc-600 dark:text-zinc-300">
        Archivio completo con articoli ottimizzati per keyword come “quanto costa un sito web” e “creare siti web Friuli”, con UI coerente
        con il resto del progetto.
      </p>

      <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((post) => (
          <li key={post.slug} className="h-full">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-zinc-200/80 bg-white/70 p-5 transition hover:border-violet-300 hover:shadow-[0_24px_70px_-40px_rgba(109,40,217,0.45)] sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-violet-500/40"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("it-IT", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{post.keywords[0]}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-950 transition group-hover:text-violet-700 sm:text-2xl dark:text-zinc-100 dark:group-hover:text-violet-300">
                {post.title}
              </h2>
              <p className="mt-3 flex-1 text-sm text-zinc-600 sm:text-base dark:text-zinc-300">{post.description}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-violet-700 dark:text-violet-300">
                Leggi l&apos;articolo →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
