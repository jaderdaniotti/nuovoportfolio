import comuniRaw from "@/src/comuni.json";
import comuniSeoRaw from "@/src/comuni-seo.json";

type ComuneRecord = {
  nome: string;
  codice: string;
  zona?: { codice?: string; nome?: string };
  regione?: { codice?: string; nome?: string };
  provincia?: { codice?: string; nome?: string };
  sigla?: string;
  codiceCatastale?: string;
  cap?: string[];
  popolazione?: number;
};

type ComuneSeoRecord = {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  opening: string;
  angle: string;
  cta: string;
  serviceName: string;
  indexable: boolean;
  preRender: boolean;
};

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const allComuni = comuniRaw as ComuneRecord[];
const seoBySlug = comuniSeoRaw as Record<string, ComuneSeoRecord>;

type ComuneWithSlug = ComuneRecord & { slug: string };

function withUniqueSlug(comuni: ComuneRecord[]): ComuneWithSlug[] {
  const usedSlugs = new Set<string>();

  return comuni.map((comune) => {
    const base = `${slugify(comune.nome)}-${slugify(comune.sigla ?? "")}`;
    let slug = base || `comune-${slugify(comune.codice ?? "italia")}`;

    if (usedSlugs.has(slug)) {
      slug = `${slug}-${slugify(comune.codice ?? "") || "dup"}`;
    }

    usedSlugs.add(slug);
    return { ...comune, slug };
  });
}

export const comuniItalia = withUniqueSlug(allComuni)
  .map((comune) => {
    const seo = seoBySlug[comune.slug];

    return {
      ...comune,
      sigla: comune.sigla ?? "",
      provincia: comune.provincia ?? { nome: "" },
      regione: comune.regione ?? { nome: "" },
      cap: Array.isArray(comune.cap) ? comune.cap : [],
      popolazione: Number.isFinite(comune.popolazione) ? comune.popolazione : 0,
      seo,
    };
  })
  .sort((a, b) => a.nome.localeCompare(b.nome, "it"));

export type ComuneData = (typeof comuniItalia)[number];

const comuniBySlug = new Map(comuniItalia.map((comune) => [comune.slug, comune]));

export function getComuneBySlug(slug: string) {
  return comuniBySlug.get(slug);
}

export function getComuniItaliaSlugs() {
  return comuniItalia.map((comune) => comune.slug);
}

export function getIndexableComuniItaliaSlugs() {
  return comuniItalia
    .filter((comune) => comune.seo?.indexable !== false)
    .map((comune) => comune.slug);
}

export function getPreRenderComuniItaliaSlugs() {
  return comuniItalia.filter((comune) => comune.seo?.preRender).map((comune) => comune.slug);
}
