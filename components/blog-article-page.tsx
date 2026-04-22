import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { getArticleBySlug } from "@/lib/blog-articles";
import { siteConfig } from "@/lib/site-config";

type Props = {
  slug: string;
};

function toAbsolute(url: string) {
  return `${siteConfig.url}${url}`;
}

export function getArticleMetadata(slug: string): Metadata {
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Articolo non trovato",
      description: "L'articolo richiesto non esiste.",
    };
  }

  const canonicalPath = `/blog/${article.slug}`;
  const canonicalUrl = toAbsolute(canonicalPath);
  const ogImage = toAbsolute(`/api/og?title=${encodeURIComponent(article.title)}`);

  return {
    title: `${article.title} | ${siteConfig.name}`,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "it_IT",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [ogImage],
    },
  };
}

export function BlogArticlePage({ slug }: Props) {
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const canonicalPath = `/blog/${article.slug}`;
  const canonicalUrl = toAbsolute(canonicalPath);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "it-IT",
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: article.keywords.join(", "),
  };

  return (
    <article className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <JsonLd data={articleSchema} />

      <header className="rounded-3xl border border-zinc-200/70 bg-white/80 p-6 shadow-[0_20px_60px_-35px_rgba(24,24,27,0.35)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">Blog</p>
        <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight text-zinc-950 md:text-4xl dark:text-zinc-100">
          {article.title}
        </h1>
        <p className="mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-zinc-700 md:text-base dark:text-zinc-300">
          {article.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {article.keywords.slice(0, 4).map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-violet-300/70 bg-violet-50/70 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/15 dark:text-violet-200"
            >
              {keyword}
            </span>
          ))}
        </div>
      </header>

      <section className="rounded-3xl border border-zinc-200/70 bg-zinc-50/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
        <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-100">Intro</h2>
        <p className="mt-3 leading-relaxed text-zinc-700 dark:text-zinc-300">{article.intro}</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-rose-200/60 bg-rose-50/70 p-6 dark:border-rose-500/25 dark:bg-rose-500/10">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-100">Il Problema</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {article.problem.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/70 p-6 dark:border-emerald-500/25 dark:bg-emerald-500/10">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-100">La Soluzione</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {article.solution.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/70 bg-white/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/70">
        <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-100">Guida Step-by-Step</h2>
        <ol className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {article.steps.map((step, index) => (
            <li key={step}>
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-zinc-200/70 bg-zinc-50/90 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-100">Case Studies</h2>
        <div className="mt-4 grid gap-3">
          {article.cases.map((item) => (
            <p key={item} className="rounded-2xl border border-zinc-200/80 bg-white/80 p-4 text-sm leading-relaxed text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-300">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/70 bg-white/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/70">
        <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-100">FAQ</h2>
        <div className="mt-4 space-y-3">
          {article.faq.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-700 dark:bg-zinc-950/40">
              <summary className="cursor-pointer list-none text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {item.question}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-violet-300/50 bg-linear-to-br from-violet-100/70 to-fuchsia-100/60 p-6 dark:border-violet-500/40 dark:from-violet-500/20 dark:to-fuchsia-500/20">
        <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">Conclusione e CTA</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
          Se vuoi un sito che porti contatti veri, la differenza è nel lavoro su misura: codice più flessibile dei template standard, tempi
          rapidi di modifica e rapporto diretto con chi sviluppa. Da freelance segui il progetto in prima persona, con scelte tecniche pensate
          per il tuo business e non per un pacchetto generico da agenzia.
        </p>
        <Link
          href="/#contatti"
          className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
        >
          Parliamone
        </Link>
      </section>
    </article>
  );
}
