import { hero, homeFaqs, homeSeo, site } from "@/lib/home-content";
import { sameAsProfiles, siteConfig } from "@/lib/site-config";
import { OG_SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";
import type { ServicePage } from "@/lib/service-pages";
import type { ServiceBlogPost } from "@/lib/blog/types";
import { getBlogPostDates } from "@/lib/blog/types";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const PROFESSIONAL_SERVICE_ID = `${SITE_URL}/#professionalservice`;

const napAddress = {
  "@type": "PostalAddress",
  addressLocality: siteConfig.address.addressLocality,
  addressRegion: siteConfig.address.addressRegion,
  addressCountry: siteConfig.address.addressCountry,
} as const;

export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.personName,
    url: SITE_URL,
    jobTitle: "Sviluppatore web freelance",
    description:
      "Sviluppatore web freelance a Udine e Gemona del Friuli: siti web, ecommerce e soluzioni digitali su misura per aziende e professionisti.",
    email: site.email,
    telephone: siteConfig.telephone,
    worksFor: { "@id": ORGANIZATION_ID },
    address: napAddress,
    sameAs: sameAsProfiles(),
    knowsAbout: [
      "Sviluppo siti web",
      "Realizzazione siti web",
      "Ecommerce",
      "Shopify",
      "Sviluppo web su misura",
      "Sviluppo applicazioni web",
      "Automazioni aziendali",
      "Next.js",
      "SEO locale",
    ],
  };
}

export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: OG_SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/img/logo/logonerosubianco.svg"),
    email: site.email,
    telephone: siteConfig.telephone,
    vatID: siteConfig.vatNumber,
    founder: { "@id": PERSON_ID },
    address: napAddress,
    sameAs: sameAsProfiles(),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: site.email,
      telephone: siteConfig.telephone,
      availableLanguage: ["Italian"],
      areaServed: "IT",
    },
  };
}

export function professionalServiceNode() {
  return {
    "@type": "ProfessionalService",
    "@id": PROFESSIONAL_SERVICE_ID,
    name: "jaderweb — sviluppatore web freelance",
    url: SITE_URL,
    image: absoluteUrl("/img/logo/logonerosubianco.svg"),
    description: siteConfig.description,
    telephone: siteConfig.telephone,
    email: site.email,
    address: napAddress,
    areaServed: [
      { "@type": "Country", name: "Italia" },
      { "@type": "AdministrativeArea", name: "Friuli-Venezia Giulia" },
      { "@type": "City", name: "Udine" },
      { "@type": "City", name: "Gemona del Friuli" },
    ],
    provider: { "@id": PERSON_ID },
    brand: { "@id": ORGANIZATION_ID },
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servizi jaderweb",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Realizzazione siti web",
            url: absoluteUrl("/servizi"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ecommerce e Shopify",
            url: absoluteUrl("/servizi"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sviluppo web su misura",
            url: absoluteUrl("/servizi"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automazioni aziendali",
            url: absoluteUrl("/servizi/digitalizzazione"),
          },
        },
      ],
    },
  };
}

/** Entity graph base (Person + Organization + ProfessionalService). */
export function entityGraphNodes() {
  return [organizationNode(), personNode(), professionalServiceNode()];
}

export function breadcrumbListNode(page: ServicePage) {
  const serviceUrl = absoluteUrl(`/servizi/${page.slug}`);

  return {
    "@type": "BreadcrumbList",
    "@id": `${serviceUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servizi",
        item: absoluteUrl("/servizi"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.name,
        item: serviceUrl,
      },
    ],
  };
}

export function blogPostBreadcrumbNode(post: ServiceBlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: absoluteUrl("/blog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };
}

export function serviceJsonLd(page: ServicePage) {
  const url = absoluteUrl(`/servizi/${page.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...entityGraphNodes(),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.name,
        description: page.heroBody,
        url,
        provider: { "@id": PERSON_ID },
        brand: { "@id": ORGANIZATION_ID },
      },
      breadcrumbListNode(page),
    ],
  };
}

export function blogPostJsonLd(post: ServiceBlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const { datePublished, dateModified } = getBlogPostDates(post);

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...entityGraphNodes(),
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished,
        dateModified,
        inLanguage: "it-IT",
        mainEntityOfPage: url,
        keywords: post.keywords.join(", "),
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: {
          "@type": "Blog",
          "@id": `${absoluteUrl("/blog")}#blog`,
          name: "Blog jaderweb",
          url: absoluteUrl("/blog"),
        },
      },
      blogPostBreadcrumbNode(post),
    ],
  };
}

export function blogFaqJsonLd(post: ServiceBlogPost) {
  if (post.faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviziHubJsonLd(pages: ServicePage[]) {
  const url = absoluteUrl("/servizi");
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...entityGraphNodes(),
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Servizi — jaderweb",
        description:
          "Siti verticali, landing, prenotazioni, preventivi e digitalizzazione.",
        isPartOf: { "@type": "WebSite", name: OG_SITE_NAME, url: SITE_URL },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#itemlist`,
        name: "Servizi jaderweb",
        numberOfItems: pages.length,
        itemListElement: pages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.name,
          url: absoluteUrl(`/servizi/${page.slug}`),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Servizi", item: url },
        ],
      },
    ],
  };
}

export function blogHubJsonLd(posts: ServiceBlogPost[]) {
  const url = absoluteUrl("/blog");
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...entityGraphNodes(),
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        url,
        name: "Blog jaderweb",
        description:
          "Guide su siti verticali, SEO locale e conversioni. Di Jader Daniotti, freelance a Udine.",
        publisher: { "@id": ORGANIZATION_ID },
        author: { "@id": PERSON_ID },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#itemlist`,
        name: "Articoli del blog",
        numberOfItems: sorted.length,
        itemListElement: sorted.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: post.title,
          url: absoluteUrl(`/blog/${post.slug}`),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: url },
        ],
      },
    ],
  };
}

export function siteRootJsonLd() {
  const headline = hero.headline;

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...entityGraphNodes(),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: OG_SITE_NAME,
        alternateName: siteConfig.personName,
        inLanguage: "it-IT",
        description: siteConfig.description,
        publisher: { "@id": ORGANIZATION_ID },
        author: { "@id": PERSON_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: homeSeo.title,
        headline,
        description: homeSeo.description,
        inLanguage: "it-IT",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": PROFESSIONAL_SERVICE_ID },
        primaryImageOfPage: absoluteUrl("/img/logo/logonerosubianco.svg"),
        mainEntity: { "@id": `${SITE_URL}/#faq` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: homeFaqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function pillarPageJsonLd(page: {
  path: string;
  seoTitle: string;
  description: string;
  title: string;
  faq: Array<{ question: string; answer: string }>;
}) {
  const url = absoluteUrl(page.path);
  const graph: object[] = [
    ...entityGraphNodes(),
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.seoTitle,
      description: page.description,
      isPartOf: { "@type": "WebSite", name: OG_SITE_NAME, url: SITE_URL },
      about: { "@id": PROFESSIONAL_SERVICE_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: page.title, item: url },
      ],
    },
  ];

  if (page.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
