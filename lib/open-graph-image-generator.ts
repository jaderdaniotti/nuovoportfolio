export const OPEN_GRAPH_IMAGE_WIDTH = 1200;
export const OPEN_GRAPH_IMAGE_HEIGHT = 630;

export type OgImageTextInput = {
  title: string;
  subtitle?: string;
  brandLine?: string;
};

export function validateOgImageTextInput(input: OgImageTextInput): string | null {
  const title = input.title.trim();
  if (!title) {
    return "Inserisci un titolo per l’immagine social.";
  }
  if (title.length > 140) {
    return "Il titolo supera i 140 caratteri: abbrevia per mantenere il testo leggibile in anteprima.";
  }
  const sub = (input.subtitle ?? "").trim();
  if (sub.length > 200) {
    return "Il sottotitolo supera i 200 caratteri.";
  }
  const brand = (input.brandLine ?? "").trim();
  if (brand.length > 80) {
    return "La riga brand supera gli 80 caratteri.";
  }
  return null;
}

function escapeHtmlAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/**
 * Snippet meta da incollare nel `<head>` dopo aver pubblicato il PNG su un URL assoluto.
 */
export function buildOgImageMetaSnippet(imageAbsoluteUrl: string): string {
  const url = imageAbsoluteUrl.trim() || "https://example.com/images/og-cover.png";
  return [
    `<!-- Open Graph + Twitter Card (PNG ${OPEN_GRAPH_IMAGE_WIDTH}×${OPEN_GRAPH_IMAGE_HEIGHT}) : aggiorna content con URL pubblico HTTPS del file -->`,
    `<meta property="og:image" content="${escapeHtmlAttr(url)}" />`,
    `<meta property="og:image:width" content="${String(OPEN_GRAPH_IMAGE_WIDTH)}" />`,
    `<meta property="og:image:height" content="${String(OPEN_GRAPH_IMAGE_HEIGHT)}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="${escapeHtmlAttr(url)}" />`,
  ].join("\n");
}
