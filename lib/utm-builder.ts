/**
 * Costruisce URL di destinazione con parametri UTM per Google Analytics 4 / Universal Analytics.
 * Elaborazione puramente locale: nessuna rete.
 */

export type UtmBuilderInput = {
  /** Landing page (preferibilmente HTTPS). */
  baseUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm?: string;
  utmContent?: string;
  /** GA4 / campagne con ID interno — opzionale. */
  utmId?: string;
};

export type UtmBuilderOk = {
  ok: true;
  url: string;
  queryString: string;
};

export type UtmBuilderFail = {
  ok: false;
  error: string;
};

const UTM_KEYS = [
  { key: "utm_source", get: (i: UtmBuilderInput) => i.utmSource },
  { key: "utm_medium", get: (i: UtmBuilderInput) => i.utmMedium },
  { key: "utm_campaign", get: (i: UtmBuilderInput) => i.utmCampaign },
  { key: "utm_term", get: (i: UtmBuilderInput) => i.utmTerm },
  { key: "utm_content", get: (i: UtmBuilderInput) => i.utmContent },
  { key: "utm_id", get: (i: UtmBuilderInput) => i.utmId },
] as const;

/** Valori pubblici suggeriti per campagne di esempio. */
export const SAMPLE_UTM: UtmBuilderInput = {
  baseUrl: "https://tuosito.it/landing/demo",
  utmSource: "google",
  utmMedium: "cpc",
  utmCampaign: "primavera_2026",
  utmTerm: "",
  utmContent: "",
  utmId: "",
};

export function parseHttpUrl(raw: string): { ok: true; url: URL } | { ok: false; error: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, error: "Inserisci l’URL di destinazione." };
  }
  const prefixed = /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(prefixed);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return { ok: false, error: "Sono consentiti solo URL http(s)." };
    }
    return { ok: true, url };
  } catch {
    return { ok: false, error: "URL non valido o incompleto." };
  }
}

/**
 * GA richiede in genere utm_source, utm_medium e utm_campaign per attribuzione coerente.
 */
export function buildUtmCampaignUrl(input: UtmBuilderInput): UtmBuilderOk | UtmBuilderFail {
  const parsed = parseHttpUrl(input.baseUrl);
  if (!parsed.ok) return parsed;

  const source = input.utmSource.trim();
  const medium = input.utmMedium.trim();
  const campaign = input.utmCampaign.trim();

  if (!source) {
    return { ok: false, error: "utm_source è obbligatorio (es. newsletter, google, linkedin)." };
  }
  if (!medium) {
    return { ok: false, error: "utm_medium è obbligatorio (es. email, cpc, social)." };
  }
  if (!campaign) {
    return { ok: false, error: "utm_campaign è obbligatorio (es. primavera_promo)." };
  }

  const url = parsed.url;

  for (const { key, get } of UTM_KEYS) {
    const value = String(get(input) ?? "").trim();
    if (value) {
      url.searchParams.set(key, value);
    }
  }

  const qs = url.search.startsWith("?") ? url.search.slice(1) : url.search;
  return {
    ok: true,
    url: url.href,
    queryString: qs ? `?${qs}` : "",
  };
}
