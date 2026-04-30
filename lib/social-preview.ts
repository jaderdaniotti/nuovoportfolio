export type TwitterCardKind = "summary" | "summary_large_image";

export type SocialMetaExtracted = {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogSiteName?: string;
  twitterCard?: TwitterCardKind;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
};

const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta property="og:title" content="Guida SEO locale per PMI — checklist operativa" />
  <meta property="og:description" content="Come ottimizzare Google Business Profile, citazioni NAP e pagine servizio per acquisire lead nel territorio senza sprecare budget." />
  <meta property="og:image" content="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop" />
  <meta property="og:url" content="https://esempio.it/blog/seo-locale-pmi" />
  <meta property="og:site_name" content="Studio Marketing Esempio" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Guida SEO locale per PMI — checklist operativa" />
  <meta name="twitter:description" content="GBP, citazioni NAP e pagine servizio: cosa fare prima di spendere in ads." />
  <meta name="twitter:image" content="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop" />
</head>
<body></body>
</html>`;

export const SAMPLE_SOCIAL = {
  ogTitle: "Guida SEO locale per PMI — checklist operativa",
  ogDescription:
    "Come ottimizzare Google Business Profile, citazioni NAP e pagine servizio per acquisire lead nel territorio senza sprecare budget.",
  ogImage:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop",
  ogUrl: "https://esempio.it/blog/seo-locale-pmi",
  ogSiteName: "Studio Marketing Esempio",
  twitterCard: "summary_large_image" as TwitterCardKind,
  twitterTitle: "Guida SEO locale per PMI — checklist operativa",
  twitterDescription: "GBP, citazioni NAP e pagine servizio: cosa fare prima di spendere in ads.",
  twitterImage:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop",
  sampleHtml: SAMPLE_HTML,
};

function stripHtmlComments(html: string) {
  return html.replace(/<!--[\s\S]*?-->/g, " ");
}

/** Estrae il valore di content da un tag meta con property o name noto (ordine attributi flessibile). */
function extractMetaContent(html: string, kind: "property" | "name", key: string): string | undefined {
  const safeKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const reDirect = new RegExp(
    `<meta\\s+[^>]*?${kind}=["']${safeKey}["'][^>]*?content=["']([^"']*)["'][^>]*>`,
    "is",
  );
  const reReverse = new RegExp(
    `<meta\\s+[^>]*?content=["']([^"']*)["'][^>]*?${kind}=["']${safeKey}["'][^>]*>`,
    "is",
  );
  const a = stripHtmlComments(html).match(reDirect);
  if (a?.[1]) return decodeBasicEntities(a[1].trim());
  const b = stripHtmlComments(html).match(reReverse);
  if (b?.[1]) return decodeBasicEntities(b[1].trim());
  return undefined;
}

function decodeBasicEntities(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function extractSocialMetaFromHtml(html: string): SocialMetaExtracted | { error: string } {
  const trimmed = html.trim();
  if (!trimmed) {
    return { error: "Incolla del markup HTML con tag meta Open Graph o Twitter." };
  }
  if (!/<meta\s/i.test(trimmed)) {
    return { error: "Nel testo non risultano tag <meta>: incolla almeno la sezione <head> o l’HTML della pagina." };
  }

  const ogTitle = extractMetaContent(trimmed, "property", "og:title");
  const ogDescription = extractMetaContent(trimmed, "property", "og:description");
  const ogImage = extractMetaContent(trimmed, "property", "og:image");
  const ogUrl = extractMetaContent(trimmed, "property", "og:url");
  const ogSiteName = extractMetaContent(trimmed, "property", "og:site_name");

  const twitterCardRaw = extractMetaContent(trimmed, "name", "twitter:card");
  let twitterCard: TwitterCardKind | undefined;
  if (twitterCardRaw === "summary" || twitterCardRaw === "summary_large_image") {
    twitterCard = twitterCardRaw;
  }

  const twitterTitle = extractMetaContent(trimmed, "name", "twitter:title");
  const twitterDescription = extractMetaContent(trimmed, "name", "twitter:description");
  const twitterImage = extractMetaContent(trimmed, "name", "twitter:image");

  const hasAny =
    ogTitle ||
    ogDescription ||
    ogImage ||
    ogUrl ||
    ogSiteName ||
    twitterCardRaw ||
    twitterTitle ||
    twitterDescription ||
    twitterImage;

  if (!hasAny) {
    return {
      error:
        "Nessun tag og:* o twitter:* riconosciuto. Verifica property/name e attributo content (anche su più righe).",
    };
  }

  return {
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogSiteName,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
  };
}

export type LengthHint = "ok" | "warn" | "empty";

export function hintOgTitle(len: number): LengthHint {
  if (len === 0) return "empty";
  if (len > 65) return "warn";
  return "ok";
}

export function hintOgDescription(len: number): LengthHint {
  if (len === 0) return "empty";
  if (len > 200) return "warn";
  return "ok";
}

export function formatSocialPreviewReport(fields: {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogSiteName: string;
  twitterCard: TwitterCardKind;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}): string {
  const lines = [
    "Anteprima social — riepilogo campi",
    "",
    "Open Graph",
    `  og:title — ${fields.ogTitle.length} caratteri`,
    `  og:description — ${fields.ogDescription.length} caratteri`,
    `  og:image — ${fields.ogImage ? fields.ogImage : "(vuoto)"}`,
    `  og:url — ${fields.ogUrl ? fields.ogUrl : "(vuoto)"}`,
    `  og:site_name — ${fields.ogSiteName ? fields.ogSiteName : "(vuoto)"}`,
    "",
    "Twitter / X",
    `  twitter:card — ${fields.twitterCard}`,
    `  twitter:title — ${fields.twitterTitle.length} caratteri`,
    `  twitter:description — ${fields.twitterDescription.length} caratteri`,
    `  twitter:image — ${fields.twitterImage ? fields.twitterImage : "(vuoto)"}`,
  ];
  return lines.join("\n");
}
