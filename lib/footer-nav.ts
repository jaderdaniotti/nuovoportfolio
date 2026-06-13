import { BLOG_ARTICLES } from "@/lib/blog-articles";
import { comuniItalia } from "@/lib/comuni";
import { toolCategoryLabels, toolsCatalog, type ToolCategory } from "@/lib/tools-catalog";

export type FooterLink = {
  label: string;
  href: string;
  title?: string;
  external?: boolean;
};

export type FooterSitemapGroup = {
  id: string;
  title: string;
  links: FooterLink[];
};

export type FooterToolCategory = {
  id: ToolCategory;
  title: string;
  links: FooterLink[];
};

const TOOL_CATEGORY_ORDER: ToolCategory[] = [
  "seo-audit",
  "tracking",
  "content",
  "converter",
  "utility",
  "image",
  "document",
];

export const FOOTER_RECENT_BLOG_LIMIT = 5;
export const FOOTER_FEATURED_COMUNI_LIMIT = 10;
export const FOOTER_FEATURED_TOOLS_LIMIT = 8;

export const footerHomeLinks: FooterLink[] = [
  { label: "Home", href: "/", title: "Torna alla homepage" },
  { label: "Chi sono", href: "/#chi-sono", title: "Profilo e approccio di lavoro" },
  { label: "Tecnologia", href: "/#tecnologia", title: "Stack e metodologie di sviluppo" },
  { label: "Competenze", href: "/#competenze", title: "Servizi e specializzazioni" },
  { label: "Progetti", href: "/#progetti", title: "Portfolio e case study" },
  { label: "Testimonianze", href: "/#testimonianze", title: "Recensioni dei clienti" },
  { label: "Tariffe", href: "/#tariffe", title: "Pacchetti siti web e chatbot AI" },
  { label: "Collaborazioni", href: "/#collaborazioni", title: "Partner e collaborazioni" },
  { label: "Contatti", href: "/contatti", title: "Richiedi un preventivo gratuito" },
];

export const footerServiceLinks: FooterLink[] = [
  { label: "Tariffe e pacchetti", href: "/pricing", title: "Prezzi siti web e servizi digitali" },
  { label: "Contatti e preventivi", href: "/contatti", title: "Richiedi un preventivo personalizzato" },
  { label: "Siti web per comune", href: "/comuni", title: "Creazione siti web in tutta Italia" },
  { label: "Toolbox SEO e utility", href: "/tools", title: "Strumenti gratuiti per siti web" },
  { label: "Blog", href: "/blog", title: "Guide su siti web, SEO e conversioni" },
];

function sortBlogArticles() {
  return [...BLOG_ARTICLES].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getFooterBlogLinks(): FooterLink[] {
  return sortBlogArticles().map((article) => ({
    label: article.title,
    href: `/blog/${article.slug}`,
    title: article.description,
  }));
}

export function getFooterRecentBlogLinks(limit = FOOTER_RECENT_BLOG_LIMIT): FooterLink[] {
  return getFooterBlogLinks().slice(0, limit);
}

export function getFooterFeaturedComuniLinks(limit = FOOTER_FEATURED_COMUNI_LIMIT): FooterLink[] {
  return [...comuniItalia]
    .filter((comune) => comune.seo?.indexable !== false)
    .sort((a, b) => (b.popolazione ?? 0) - (a.popolazione ?? 0))
    .slice(0, limit)
    .map((comune) => ({
      label: comune.nome,
      href: `/comuni/${comune.slug}`,
      title: `Creazione siti web a ${comune.nome} (${comune.sigla})`,
    }));
}

export function getFooterComuniLinks(): FooterLink[] {
  return [
    {
      label: "Directory comuni italiani",
      href: "/comuni",
      title: "Esplora tutte le aree geografiche servite",
    },
    ...getFooterFeaturedComuniLinks(24).map((link) => ({
      ...link,
      label: `Siti web a ${link.label}`,
    })),
  ];
}

export function getFooterFeaturedToolLinks(limit = FOOTER_FEATURED_TOOLS_LIMIT): FooterLink[] {
  return toolsCatalog
    .filter((tool) => tool.ready === "ui-ready")
    .slice(0, limit)
    .map((tool) => ({
      label: tool.name,
      href: `/tools/${tool.slug}`,
      title: tool.summary,
    }));
}

export function getFooterToolCategories(): FooterToolCategory[] {
  return TOOL_CATEGORY_ORDER.map((category) => ({
    id: category,
    title: toolCategoryLabels[category],
    links: toolsCatalog
      .filter((tool) => tool.category === category && tool.ready === "ui-ready")
      .map((tool) => ({
        label: tool.name,
        href: `/tools/${tool.slug}`,
        title: tool.summary,
      })),
  })).filter((group) => group.links.length > 0);
}

export function getFooterSitemapGroups(): FooterSitemapGroup[] {
  return [
    { id: "blog-index", title: "Blog", links: getFooterBlogLinks() },
    { id: "comuni-index", title: "Comuni", links: getFooterComuniLinks() },
    ...getFooterToolCategories().map((category) => ({
      id: `tools-${category.id}`,
      title: category.title,
      links: category.links,
    })),
  ];
}
