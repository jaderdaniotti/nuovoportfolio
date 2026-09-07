import type { Metadata } from "next";
import Link from "next/link";
import { InnerPageShell } from "@/components/inner-page-shell";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { SERVICE_BLOG_POSTS } from "@/lib/blog/posts";
import { pageSeo } from "@/lib/seo";

const title = "Blog — jaderweb";
const description =
  "Guide su siti verticali, SEO locale e conversioni: matrimoni, ristoranti, B&B, professionisti e altri settori. Di Jader Daniotti, freelance a Udine.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSeo("/blog", { title, description }),
};

const SERVICE_LABELS: Record<string, string> = {
  matrimoni: "Matrimoni",
  "sagre-eventi": "Sagre",
  ristoranti: "Ristoranti",
  "bb-case-vacanza": "B&B",
  professionisti: "Professionisti",
  "associazioni-sportive": "Sport",
  "band-eventi": "Band",
  "agenzie-immobiliari": "Immobiliare",
  "eventi-privati": "Eventi privati",
  artigiani: "Artigiani",
  "landing-ads": "Landing",
  "one-page": "One page",
  "sito-48h": "Sito 48h",
  palestre: "Palestre",
  "preventivi-online": "Preventivi",
  prenotazioni: "Prenotazioni",
  "cv-portfolio": "Portfolio",
  "eventi-locali": "Eventi locali",
  digitalizzazione: "Digitalizzazione",
};

export default function BlogIndexPage() {
  const sorted = [...SERVICE_BLOG_POSTS].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );

  return (
    <InnerPageShell>
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
            </Reveal>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="page-shell">
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
