export type SeoSlugBuildOptions = {
  /** Lunghezza massima consigliata (tronca in corrispondenza dell’ultimo trattino utile). */
  maxLength: number;
};

export type SeoSlugWarningCode =
  | "empty_source"
  | "empty_slug"
  | "truncated"
  | "slug_starts_with_digit";

export type SeoSlugWarning = {
  code: SeoSlugWarningCode;
  message: string;
};

export type SeoSlugBuildResult = {
  slug: string;
  normalizedSource: string;
  warnings: SeoSlugWarning[];
};

function stripCombiningMarks(input: string): string {
  return input.normalize("NFD").replace(/\p{M}/gu, "");
}

function slugifyCore(source: string): string {
  let s = source.trim();
  if (!s) return "";

  s = s.replace(/\s+/g, " ");
  s = s.replace(/[''`´]/g, "-");
  s = s.replace(/&/g, " e ");
  s = s.replace(/ß/g, "ss");
  s = stripCombiningMarks(s);
  s = s.toLowerCase();
  s = s.replace(/[^a-z0-9]+/g, "-");
  s = s.replace(/-+/g, "-");
  s = s.replace(/^-+|-+$/g, "");
  return s;
}

function truncateAtHyphen(slug: string, maxLength: number): { slug: string; truncated: boolean } {
  if (slug.length <= maxLength) return { slug, truncated: false };
  let cut = slug.slice(0, maxLength);
  const lastHy = cut.lastIndexOf("-");
  if (lastHy >= Math.floor(maxLength * 0.45) && lastHy > 0) {
    cut = cut.slice(0, lastHy);
  }
  cut = cut.replace(/-+$/g, "");
  return { slug: cut, truncated: true };
}

export function validateSlugSource(raw: string): string | null {
  if (!raw.trim()) {
    return "Incolla un titolo o una breve frase da convertire in slug URL.";
  }
  return null;
}

export function buildSeoSlug(raw: string, options: SeoSlugBuildOptions): SeoSlugBuildResult {
  const normalizedSource = raw.replace(/\r\n/g, "\n").replace(/\n+/g, " ").trim();
  const warnings: SeoSlugWarning[] = [];

  if (!normalizedSource) {
    warnings.push({
      code: "empty_source",
      message: "Testo vuoto: inserisci almeno una parola o un numero.",
    });
    return { slug: "", normalizedSource: "", warnings };
  }

  let slug = slugifyCore(normalizedSource);
  if (!slug) {
    warnings.push({
      code: "empty_slug",
      message: "Dopo la pulizia non restano caratteri utili (solo simboli o punteggiatura).",
    });
    return { slug: "", normalizedSource, warnings };
  }

  const { slug: cutSlug, truncated } = truncateAtHyphen(slug, Math.max(8, options.maxLength));
  slug = cutSlug;
  if (truncated) {
    warnings.push({
      code: "truncated",
      message: `Slug accorciato a ${slug.length} caratteri (limite ${options.maxLength}).`,
    });
  }

  if (/^[0-9]/.test(slug)) {
    warnings.push({
      code: "slug_starts_with_digit",
      message: "Lo slug inizia con un numero: in CMS molti pattern richiedono lettera iniziale — verifica le regole del sito.",
    });
  }

  return { slug, normalizedSource, warnings };
}

export function formatSeoSlugReport(
  normalizedSource: string,
  slug: string,
  pathPrefix: string | undefined,
): string {
  const lines = [`Sorgente: ${normalizedSource}`, `Slug: ${slug || "(vuoto)"}`];
  const prefix = pathPrefix?.trim().replace(/\/+$/, "") ?? "";
  if (prefix && slug) {
    lines.push(`Percorso: ${prefix}/${slug}`);
  }
  return lines.join("\n");
}
