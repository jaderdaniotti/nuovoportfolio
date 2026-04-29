import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComunePageShell } from "@/components/comune-page-shell";
import { getComuneBySlug, getPreRenderComuniItaliaSlugs } from "@/lib/comuni";
import { siteConfig } from "@/lib/site-config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 2592000;

export function generateStaticParams() {
  return getPreRenderComuniItaliaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);

  if (!comune) {
    return {
      title: "Comune non trovato",
      robots: { index: false, follow: false },
    };
  }

  const title = comune.seo?.title ?? `Siti web a ${comune.nome} (${comune.sigla})`;
  const description =
    comune.seo?.description ??
    `Realizzazione siti web e SEO locale a ${comune.nome}, provincia di ${comune.provincia?.nome}, Friuli Venezia Giulia.`;
  const canonicalPath = comune.seo?.canonical ?? `/comuni/${comune.slug}`;
  const url = `${siteConfig.url}${canonicalPath}`;
  const shouldIndex = comune.seo?.indexable ?? false;

  return {
    title,
    description,
    keywords: comune.seo?.keywords,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    robots: { index: shouldIndex, follow: true },
  };
}

export default async function ComunePage({ params }: PageProps) {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);

  if (!comune) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Realizzazione siti web e SEO locale",
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${comune.nome}, ${comune.provincia?.nome}, ${comune.regione?.nome}`,
    },
    provider: {
      "@type": "Person",
      name: siteConfig.personName,
      url: siteConfig.url,
    },
    name: comune.seo?.serviceName ?? `Servizi web a ${comune.nome}`,
    description:
      comune.seo?.description ??
      `Supporto per siti web professionali, restyling e SEO locale per attivita in ${comune.nome}.`,
  };

  const seoTitle = comune.seo?.title ?? `Siti web a ${comune.nome} (${comune.sigla})`;
  const seoDescription =
    comune.seo?.description ??
    `Realizzazione siti web e SEO locale a ${comune.nome}, provincia di ${comune.provincia?.nome}, ${comune.regione?.nome}.`;
  const localCta =
    comune.seo?.cta ??
    `Se lavori a ${comune.nome}, possiamo definire una strategia web locale con obiettivi chiari.`;

  return (
    <>
      <section className="sr-only">
        <h1>{seoTitle}</h1>
        <p>{seoDescription}</p>
        <p>
          Comune: {comune.nome}. Provincia: {comune.provincia?.nome} ({comune.sigla}). Regione:{" "}
          {comune.regione?.nome}. Popolazione: {(comune.popolazione ?? 0).toLocaleString("it-IT")}.
        </p>
        <p>{localCta}</p>
        <Link href="/comuni">Vedi tutti i comuni italiani</Link>
        <Link href="/#contatti">Richiedi una consulenza</Link>
      </section>

      <ComunePageShell comune={comune} />
      <noscript>
        <section className="mx-auto w-full max-w-5xl px-6 py-10 text-sm text-zinc-700 md:px-10">
          JavaScript e disattivato: puoi comunque navigare i contenuti locali da{" "}
          <Link href="/comuni" className="underline">
            /comuni
          </Link>
          .
        </section>
      </noscript>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
