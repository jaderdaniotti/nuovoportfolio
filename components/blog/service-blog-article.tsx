import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/button";
import { SectionLabel } from "@/components/section-label";
import type { ServiceBlogPost } from "@/lib/blog/types";
import { blogFaqJsonLd, blogPostJsonLd } from "@/lib/json-ld";

const SERVICE_LABELS: Record<string, string> = {
  matrimoni: "Matrimoni",
  "sagre-eventi": "Sagre ed eventi",
  ristoranti: "Ristoranti",
  "bb-case-vacanza": "B&B e case vacanza",
  professionisti: "Professionisti",
  "associazioni-sportive": "Associazioni sportive",
  "band-eventi": "Band ed eventi",
  "agenzie-immobiliari": "Agenzie immobiliari",
  "eventi-privati": "Eventi privati",
  artigiani: "Artigiani",
  "landing-ads": "Landing ads",
  "one-page": "One page",
  "sito-48h": "Sito 48h",
  palestre: "Palestre",
  "preventivi-online": "Preventivi online",
  prenotazioni: "Prenotazioni",
  "cv-portfolio": "CV e portfolio",
  "eventi-locali": "Eventi locali",
  digitalizzazione: "Digitalizzazione",
};

export function ServiceBlogArticle({ post }: { post: ServiceBlogPost }) {
  const serviceHref = `/servizi/${post.service}`;
  const serviceLabel = SERVICE_LABELS[post.service] ?? post.service;
  const faqSchema = blogFaqJsonLd(post);

  return (
    <article className="bg-background text-foreground">
      <JsonLd data={blogPostJsonLd(post)} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}

      <header className="border-b border-border bg-hero py-20 lg:py-28">
        <div className="page-shell">
          <div className="max-w-3xl">
            <SectionLabel>Blog</SectionLabel>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              <Link href={serviceHref} className="transition hover:text-foreground">
                {serviceLabel}
              </Link>
              <span className="mx-2 text-border" aria-hidden>
                /
              </span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("it-IT", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
            <h1 className="font-display mt-6 text-[clamp(2.1rem,5.5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
              {post.description}
            </p>
          </div>
        </div>
      </header>

      <div className="page-shell py-14 lg:py-20">
        <div className="mx-auto max-w-[42rem]">
          <p className="font-display text-[clamp(1.15rem,2.2vw,1.45rem)] font-semibold leading-snug tracking-tight">
            {post.intro}
          </p>

          <div className="mt-14 space-y-14">
            {post.sections.map((section, index) => (
              <section key={`${index}-${section.heading}`}>
                <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-semibold leading-tight tracking-tight">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-4 text-[1.0625rem] leading-[1.75] text-foreground">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={`${index}-${pIndex}`}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {post.faq.length > 0 ? (
            <section className="mt-16 border-t border-border pt-14">
              <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-semibold tracking-tight">
                Domande frequenti
              </h2>
              <dl className="mt-8 divide-y divide-border border-y border-border">
                {post.faq.map((item) => (
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
          ) : null}

          <aside className="mt-16 border-t border-border pt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Prossimo passo
            </p>
            <h2 className="font-display mt-4 text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold leading-[1.05] tracking-tight">
              Vuoi un sito che lavori così?
            </h2>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-muted">
              Sono Jader Daniotti — freelance web a Udine. Parto dal tuo caso,
              non da un template. Valutazione chiara, tempi reali, niente giro di
              parole.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contatti">Scrivimi →</Button>
              <Button href={serviceHref} variant="outline">
                {serviceLabel}
              </Button>
            </div>
            {post.related && post.related.length > 0 ? (
              <ul className="mt-8 space-y-2 border-t border-border pt-6 text-sm">
                {post.related.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted underline-offset-4 transition hover:text-foreground hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-8 border-t border-border pt-6 text-sm">
                <Link
                  href="/blog"
                  className="text-muted underline-offset-4 transition hover:text-foreground hover:underline"
                >
                  ← Torna al blog
                </Link>
              </p>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
