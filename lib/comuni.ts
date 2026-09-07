import comuniJson from "@/comuni.json";
import {
  buildComuneSeo,
  isIndexablePopulation,
  isPreRenderPopulation,
  type ComuneSeo,
  type ComuneSeoInput,
} from "@/lib/comuni-seo";

export type ComuneRaw = {
  nome: string;
  codice: string;
  zona: { codice: string; nome: string };
  regione: { codice: string; nome: string };
  provincia: { codice: string; nome: string };
  sigla: string;
  codiceCatastale: string;
  cap: string[];
  popolazione: number;
};

export type ComuneData = {
  slug: string;
  nome: string;
  codice: string;
  sigla: string;
  provincia: string;
  regione: string;
  zona: string;
  cap: string[];
  popolazione: number;
  codiceCatastale: string;
  seo: ComuneSeo;
  indexable: boolean;
  preRender: boolean;
};

export type ComuneListItem = {
  slug: string;
  nome: string;
  sigla: string;
  provincia: string;
  regione: string;
};

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function comuneBaseSlug(nome: string, sigla: string) {
  return `${slugify(nome)}-${slugify(sigla)}`;
}

function withUniqueSlug(raw: ComuneRaw, used: Set<string>) {
  const base = comuneBaseSlug(raw.nome, raw.sigla);
  let slug = base;
  if (used.has(slug)) {
    slug = `${base}-${raw.codice.toLowerCase()}`;
  }
  used.add(slug);
  return slug;
}

function normalizeComune(raw: ComuneRaw, slug: string): ComuneData {
  const popolazione = Number(raw.popolazione) || 0;
  const seo = buildComuneSeo({
    slug,
    nome: raw.nome,
    sigla: raw.sigla,
    provincia: raw.provincia.nome,
    regione: raw.regione.nome,
    codice: raw.codice,
    popolazione,
  });

  return {
    slug,
    nome: raw.nome,
    codice: raw.codice,
    sigla: raw.sigla.toUpperCase(),
    provincia: raw.provincia.nome,
    regione: raw.regione.nome,
    zona: raw.zona.nome,
    cap: Array.isArray(raw.cap) ? raw.cap : [],
    popolazione,
    codiceCatastale: raw.codiceCatastale,
    seo,
    indexable: isIndexablePopulation(popolazione),
    preRender: isPreRenderPopulation(popolazione),
  };
}

const usedSlugs = new Set<string>();
const merged = (comuniJson as ComuneRaw[]).map((raw) =>
  normalizeComune(raw, withUniqueSlug(raw, usedSlugs)),
);

merged.sort((a, b) => a.nome.localeCompare(b.nome, "it"));

const bySlug = new Map(merged.map((comune) => [comune.slug, comune]));

export const comuniItalia: ComuneData[] = merged;

export function getComuneBySlug(slug: string) {
  return bySlug.get(slug);
}

export function getComuniItaliaSlugs() {
  return comuniItalia.map((comune) => comune.slug);
}

export function getIndexableComuniItalia() {
  return comuniItalia.filter((comune) => comune.indexable);
}

export function getIndexableComuniItaliaSlugs() {
  return getIndexableComuniItalia().map((comune) => comune.slug);
}

export function getPreRenderComuniItaliaSlugs() {
  return comuniItalia
    .filter((comune) => comune.preRender)
    .map((comune) => comune.slug);
}

export function toComuneListItem(comune: ComuneData): ComuneListItem {
  return {
    slug: comune.slug,
    nome: comune.nome,
    sigla: comune.sigla,
    provincia: comune.provincia,
    regione: comune.regione,
  };
}

export function getComuneListItems(): ComuneListItem[] {
  return getIndexableComuniItalia().map(toComuneListItem);
}

export function getFeaturedComuni(limit = 12) {
  return [...getIndexableComuniItalia()]
    .sort((a, b) => b.popolazione - a.popolazione)
    .slice(0, limit);
}

export function getNearbyComuni(comune: ComuneData, limit = 8) {
  return comuniItalia
    .filter(
      (candidate) =>
        candidate.indexable &&
        candidate.slug !== comune.slug &&
        candidate.sigla === comune.sigla,
    )
    .sort((a, b) => b.popolazione - a.popolazione)
    .slice(0, limit);
}

export function getComuniRegioni() {
  return [...new Set(comuniItalia.map((comune) => comune.regione))].sort((a, b) =>
    a.localeCompare(b, "it"),
  );
}

export function getComuniProvince(regione?: string) {
  const source = regione
    ? comuniItalia.filter((comune) => comune.regione === regione)
    : comuniItalia;
  return [...new Set(source.map((comune) => comune.provincia))].sort((a, b) =>
    a.localeCompare(b, "it"),
  );
}

export function comuneLabel(comune: Pick<ComuneData, "nome" | "sigla">) {
  return `${comune.nome} (${comune.sigla})`;
}

export function toSeoInput(comune: ComuneData): ComuneSeoInput {
  return {
    slug: comune.slug,
    nome: comune.nome,
    sigla: comune.sigla,
    provincia: comune.provincia,
    regione: comune.regione,
    codice: comune.codice,
    popolazione: comune.popolazione,
  };
}
