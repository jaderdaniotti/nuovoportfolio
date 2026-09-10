export type LocalLandingSlug =
  | "gemona-del-friuli"
  | "buja"
  | "artegna"
  | "osoppo"
  | "venzone"
  | "tarcento"
  | "majano"
  | "trasaghis"
  | "forgaria-nel-friuli"
  | "san-daniele-del-friuli"
  | "tolmezzo"
  | "udine";

export type LocalHeroVariant =
  | "flagship"
  | "split"
  | "compact"
  | "panel"
  | "city";

export type LocalServicesVariant = "grid" | "list" | "numbered";

export type LocalSectionId =
  | "intro"
  | "services"
  | "audience"
  | "process"
  | "portfolio"
  | "local"
  | "neighbors"
  | "faq";

export type LocalLandingService = {
  title: string;
  body: string;
  href?: string;
};

export type LocalLandingFaq = {
  question: string;
  answer: string;
};

export type LocalLandingPage = {
  slug: LocalLandingSlug;
  /** Canonical path, e.g. `/siti-web/gemona-del-friuli` or `/udine`. */
  path: string;
  /** Matching `/comuni/{slug}` record. */
  comuneSlug: string;
  name: string;
  province: string;
  region: string;
  priority: 1 | 2 | 3 | 4;
  focus: string;
  primaryKeyword: string;
  keywords: string[];
  seoTitle: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  heroCta: string;
  heroSecondary?: { label: string; href: string };
  heroVariant: LocalHeroVariant;
  proofPoints?: string[];
  servicesVariant: LocalServicesVariant;
  /** Order of body sections after the hero. `cta` is always last. */
  sectionOrder: LocalSectionId[];
  intro?: { heading: string; paragraphs: string[] };
  servicesHeading: string;
  servicesIntro: string;
  services: LocalLandingService[];
  audience?: {
    heading: string;
    intro?: string;
    items: Array<{ title: string; body: string }>;
  };
  process?: {
    heading: string;
    body: string;
    steps: Array<{ title: string; body: string }>;
  };
  local?: { heading: string; paragraphs: string[] };
  portfolioHeading?: string;
  portfolioIntro?: string;
  portfolioTitles?: string[];
  testimonialNames?: string[];
  relatedHeading: string;
  relatedSlugs: LocalLandingSlug[];
  extraLinks?: Array<{ label: string; href: string }>;
  faqs: LocalLandingFaq[];
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
};
