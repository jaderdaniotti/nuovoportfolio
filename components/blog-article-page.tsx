import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/button";
import { SectionLabel } from "@/components/section-label";
import { getArticleBySlug } from "@/lib/blog-articles";
import { indexableRobots, noindexRobots } from "@/lib/seo-robots";
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
      robots: noindexRobots,
    };
  }

  const canonicalPath = `/blog/${article.slug}`;
  const canonicalUrl = toAbsolute(canonicalPath);

  return {
    title: `${article.title} | ${siteConfig.name}`,
    description: article.description,
    keywords: article.keywords,
    robots: indexableRobots,
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
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: [siteConfig.name],
      tags: article.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export function BlogArticlePage({ slug }: Props) {
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const canonicalUrl = toAbsolute(`/blog/${article.slug}`);

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
      name: "Jader Daniotti",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: article.keywords.join(", "),
  };

  return (
    <article className="bg-background text-foreground">
      <JsonLd data={articleSchema} />

      <header className="border-b border-border bg-hero py-20 lg:py-28">
        <div className="page-shell">
          <div className="max-w-3xl">
            <SectionLabel>Blog</SectionLabel>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("it-IT", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
            <h1 className="font-display mt-6 text-[clamp(2.1rem,5.5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight">
              {article.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
              {article.description}
            </p>
          </div>
        </div>
      </header>

      <div className="page-shell py-14 lg:py-20">
        <div className="mx-auto max-w-[42rem] space-y-14">
          <p className="font-display text-[clamp(1.15rem,2.2vw,1.45rem)] font-semibold leading-snug tracking-tight">
            {article.intro}
          </p>

          <section className="border-t border-border pt-10">
            <p className="font-display text-xs font-medium tracking-[0.18em] text-muted">
              01
            </p>
            <h2 className="font-display mt-3 text-[clamp(1.45rem,3vw,2rem)] font-semibold tracking-tight">
              Il problema
            </h2>
            <ul className="mt-5 space-y-4">
              {article.problem.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[1.0625rem] leading-[1.75]"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-border pt-10">
            <p className="font-display text-xs font-medium tracking-[0.18em] text-muted">
              02
            </p>
            <h2 className="font-display mt-3 text-[clamp(1.45rem,3vw,2rem)] font-semibold tracking-tight">
              La direzione
            </h2>
            <ul className="mt-5 space-y-4">
              {article.solution.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[1.0625rem] leading-[1.75]"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-border pt-10">
            <p className="font-display text-xs font-medium tracking-[0.18em] text-muted">
              03
            </p>
            <h2 className="font-display mt-3 text-[clamp(1.45rem,3vw,2rem)] font-semibold tracking-tight">
              Passi pratici
            </h2>
            <ol className="mt-5 space-y-4">
              {article.steps.map((step, index) => (
                <li
                  key={step}
                  className="grid grid-cols-[2.5rem_1fr] gap-3 text-[1.0625rem] leading-[1.75]"
                >
                  <span className="font-display text-sm font-semibold text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="border-t border-border pt-10">
            <p className="font-display text-xs font-medium tracking-[0.18em] text-muted">
              04
            </p>
            <h2 className="font-display mt-3 text-[clamp(1.45rem,3vw,2rem)] font-semibold tracking-tight">
              Note dal campo
            </h2>
            <div className="mt-5 space-y-4 text-[1.0625rem] leading-[1.75] text-muted">
              {article.cases.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </section>

          <section className="border-t border-border pt-10">
            <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-semibold tracking-tight">
              Domande frequenti
            </h2>
            <dl className="mt-8 divide-y divide-border border-y border-border">
              {article.faq.map((item) => (
                <div key={item.question} className="py-6">
                  <dt className="font-display text-base font-semibold tracking-tight md:text-lg">
                    {item.question}
                  </dt>
                  <dd className="mt-3 text-[1.02rem] leading-relaxed text-muted">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <aside className="border-t border-border pt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Prossimo passo
            </p>
            <h2 className="font-display mt-4 text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold leading-[1.05] tracking-tight">
              Vuoi un sito costruito così?
            </h2>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-muted">
              Lavoro da freelance a Udine su progetti custom: velocità,
              chiarezza, contatto diretto. Dimmi l&apos;obiettivo e ti rispondo
              con una valutazione concreta.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contatti">Scrivimi →</Button>
              <Link
                href="/blog"
                className="text-sm font-medium text-muted underline-offset-4 transition hover:text-foreground hover:underline"
              >
                ← Torna al blog
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
