import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Receipt } from "lucide-react";
import {
  footerHomeLinks,
  footerServiceLinks,
  getFooterFeaturedComuniLinks,
  getFooterFeaturedToolLinks,
  getFooterRecentBlogLinks,
  getFooterSitemapGroups,
  getFooterToolCategories,
  type FooterLink,
} from "@/lib/footer-nav";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const linkClassName =
  "inline-flex items-center gap-1 rounded-md text-sm text-zinc-600 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 dark:text-zinc-400 dark:hover:text-zinc-100";

function FooterLinkItem({
  link,
  className,
  showExternalIcon = false,
}: {
  link: FooterLink;
  className?: string;
  showExternalIcon?: boolean;
}) {
  const classes = cn(linkClassName, className);

  if (link.external || link.href.startsWith("http") || link.href.startsWith("mailto:")) {
    return (
      <a
        href={link.href}
        className={classes}
        title={link.title}
        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span>{link.label}</span>
        {showExternalIcon ? <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden /> : null}
      </a>
    );
  }

  return (
    <Link href={link.href} className={classes} title={link.title}>
      <span>{link.label}</span>
    </Link>
  );
}

function FooterSectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
      <span className="h-4 w-0.5 rounded-full bg-zinc-900 dark:bg-zinc-400" aria-hidden />
      {children}
    </h3>
  );
}

function FooterLinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {links.map((link) => (
        <li key={link.href}>
          <FooterLinkItem link={link} />
        </li>
      ))}
    </ul>
  );
}

function FooterDesktopColumn({
  title,
  ariaLabel,
  children,
}: {
  title: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <section aria-label={ariaLabel}>
      <FooterSectionTitle>{title}</FooterSectionTitle>
      {children}
    </section>
  );
}

function FooterMobileAccordion({
  id,
  title,
  ariaLabel,
  children,
}: {
  id: string;
  title: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <details
      id={`footer-mobile-${id}`}
      className="group rounded-2xl border border-zinc-200/80 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/50 lg:hidden"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 [&::-webkit-details-marker]:hidden">
        <FooterSectionTitle>{title}</FooterSectionTitle>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 shrink-0 text-zinc-500 transition group-open:rotate-180"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </summary>
      <nav aria-label={ariaLabel} className="border-t border-zinc-200/80 px-4 pb-4 dark:border-zinc-800">
        {children}
      </nav>
    </details>
  );
}

function FooterViewAllLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-800 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-100"
    >
      {label}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
    </Link>
  );
}

export function SiteFooter() {
  const recentBlog = getFooterRecentBlogLinks();
  const featuredComuni = getFooterFeaturedComuniLinks();
  const featuredTools = getFooterFeaturedToolLinks();
  const toolCategories = getFooterToolCategories();
  const sitemapGroups = getFooterSitemapGroups();
  const year = new Date().getFullYear();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: "jaderdaniotti.lavoro@gmail.com",
    vatID: `IT${siteConfig.vatNumber}`,
    areaServed: ["Udine", "Friuli Venezia Giulia", "Italia"],
    founder: {
      "@type": "Person",
      name: siteConfig.personName,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "jaderdaniotti.lavoro@gmail.com",
        availableLanguage: ["Italian"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+39-351-315-2008",
        url: "https://wa.me/393513152008",
        availableLanguage: ["Italian"],
      },
    ],
  };

  const blogBlock = (
    <>
      <FooterLinkList links={recentBlog} />
      <FooterViewAllLink href="/blog" label="Tutti gli articoli" />
    </>
  );

  const comuniBlock = (
    <>
      <ul className="mt-4 flex flex-wrap gap-2">
        {featuredComuni.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              title={link.title}
              className="inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <FooterViewAllLink href="/comuni" label="Directory completa" />
    </>
  );

  const toolsBlock = (
    <>
      <div className="mt-4 flex flex-wrap gap-2">
        {toolCategories.map((category) => (
          <Link
            key={category.id}
            href="/tools"
            title={`${category.links.length} strumenti in ${category.title}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100/80 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-200 hover:text-zinc-950 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
          >
            {category.title}
            <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
              {category.links.length}
            </span>
          </Link>
        ))}
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {featuredTools.map((link) => (
          <li key={link.href}>
            <FooterLinkItem link={link} className="text-xs leading-snug" />
          </li>
        ))}
      </ul>
      <FooterViewAllLink href="/tools" label="Catalogo completo tool" />
    </>
  );

  return (
    <footer
      className="relative border-t border-zinc-200 bg-zinc-50 pb-0 sm:pb-12 dark:border-zinc-800 dark:bg-zinc-950"
      aria-labelledby="site-footer-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-zinc-400/40 to-transparent dark:via-zinc-600/40"
        aria-hidden
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 xl:grid-cols-12 xl:gap-8">
          <div className="xl:col-span-4">
            <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm shadow-zinc-200/40 dark:border-zinc-800 dark:bg-zinc-900/60 dark:shadow-none sm:p-7">
              <p
                id="site-footer-heading"
                className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 capitalize"
              >
                {siteConfig.name}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Web design, UI/UX e sviluppo su misura per PMI e professionisti. Base operativa a Udine, supporto
                in tutta Italia.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href="/#contatti"
                  className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
                >
                  Richiedi consulenza
                </Link>
                <a
                  href="https://wa.me/393513152008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
                  WhatsApp
                </a>
              </div>

              <address className="mt-6 space-y-3 not-italic">
                <a
                  href="mailto:jaderdaniotti.lavoro@gmail.com"
                  className="flex items-start gap-3 rounded-xl border border-transparent p-2 transition hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/60"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    <Mail className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wide text-zinc-500">Email</span>
                    <span className="block text-sm text-zinc-800 dark:text-zinc-200">
                      jaderdaniotti.lavoro@gmail.com
                    </span>
                  </span>
                </a>
                <p className="flex items-start gap-3 rounded-xl p-2">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    <MapPin className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wide text-zinc-500">Area servita</span>
                    <span className="block text-sm text-zinc-800 dark:text-zinc-200">
                      Udine, Friuli Venezia Giulia e Italia
                    </span>
                  </span>
                </p>
                <p className="flex items-start gap-3 rounded-xl p-2">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    <Receipt className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wide text-zinc-500">Partita IVA</span>
                    <span className="block text-sm tabular-nums text-zinc-800 dark:text-zinc-200">
                      {siteConfig.vatNumber}
                    </span>
                  </span>
                </p>
              </address>
            </div>
          </div>

          <div className="hidden gap-8 lg:grid lg:grid-cols-2 xl:col-span-8 xl:grid-cols-4">
            <FooterDesktopColumn title="Navigazione" ariaLabel="Sezioni principali del sito">
              <FooterLinkList links={footerHomeLinks} />
            </FooterDesktopColumn>
            <FooterDesktopColumn title="Servizi" ariaLabel="Pagine servizi e risorse">
              <FooterLinkList links={footerServiceLinks} />
            </FooterDesktopColumn>
            <FooterDesktopColumn title="Dal blog" ariaLabel="Articoli recenti del blog">
              {blogBlock}
            </FooterDesktopColumn>
            <FooterDesktopColumn title="Zone servite" ariaLabel="Principali città servite">
              {comuniBlock}
            </FooterDesktopColumn>
          </div>

          <div className="space-y-3 lg:hidden">
            <FooterMobileAccordion
              id="navigazione"
              title="Navigazione"
              ariaLabel="Sezioni principali del sito"
            >
              <FooterLinkList links={footerHomeLinks} />
            </FooterMobileAccordion>
            <FooterMobileAccordion id="servizi" title="Servizi" ariaLabel="Pagine servizi e risorse">
              <FooterLinkList links={footerServiceLinks} />
            </FooterMobileAccordion>
            <FooterMobileAccordion id="blog" title="Dal blog" ariaLabel="Articoli recenti del blog">
              {blogBlock}
            </FooterMobileAccordion>
            <FooterMobileAccordion id="comuni" title="Zone servite" ariaLabel="Principali città servite">
              {comuniBlock}
            </FooterMobileAccordion>
            <FooterMobileAccordion id="tools" title="Strumenti web" ariaLabel="Tool SEO e utility">
              {toolsBlock}
            </FooterMobileAccordion>
          </div>
        </div>

        <section
          aria-label="Strumenti web gratuiti"
          className="mt-10 hidden rounded-3xl border border-zinc-200/80 bg-white/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/50 lg:block"
        >
          <FooterSectionTitle>Strumenti web</FooterSectionTitle>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Tool gratuiti per SEO, conversioni e produttività: scegli una categoria o esplora quelli più usati.
          </p>
          {toolsBlock}
        </section>

        <details className="group mt-10 rounded-3xl border border-zinc-200/80 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/40">
          <summary className="flex cursor-pointer list-none flex-col items-start gap-3 px-5 py-4 pr-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:pr-20 [&::-webkit-details-marker]:hidden">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Indice completo del sito</p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                Tutti gli articoli, comuni e strumenti — utile per esplorazione e indicizzazione.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 sm:ml-auto">
              Espandi
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3.5 w-3.5 transition group-open:rotate-180"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <div className="border-t border-zinc-200/80 px-5 py-6 sm:px-6 dark:border-zinc-800">
            <div className="columns-1 gap-x-8 sm:columns-2 xl:columns-3">
              {sitemapGroups.map((group) => (
                <div key={group.id} className="mb-8 break-inside-avoid">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{group.title}</p>
                  <ul className="mt-3 space-y-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <FooterLinkItem link={link} className="text-xs leading-snug" />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </details>
      </div>

      <div className="border-t border-zinc-200/80 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-zinc-500">
            © {year} {siteConfig.name} · {siteConfig.personName} · P.IVA {siteConfig.vatNumber}
          </p>
          <p className="text-xs text-zinc-500">
            Creazione siti web, SEO tecnica e consulenza digitale · Friuli Venezia Giulia
          </p>
        </div>
      </div>
    </footer>
  );
}
