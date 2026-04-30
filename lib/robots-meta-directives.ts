export type RobotsIndexing = "index" | "noindex";
export type RobotsFollow = "follow" | "nofollow";
export type MaxImagePreview = "omit" | "none" | "standard" | "large";

export type RobotsDirectiveOptions = {
  indexing: RobotsIndexing;
  follow: RobotsFollow;
  noarchive: boolean;
  nosnippet: boolean;
  noimageindex: boolean;
  notranslate: boolean;
  /** "omit" = non includere; "unlimited" = -1; number >= 0 */
  maxSnippet: "omit" | "unlimited" | number;
  maxImagePreview: MaxImagePreview;
  /** "omit"; "unlimited" = -1; seconds >= 0 */
  maxVideoPreview: "omit" | "unlimited" | number;
  /** Riga letterale dopo trim; formato suggerito RFC 850 / HTTP-date */
  unavailableAfter: string;
};

export const DEFAULT_ROBOTS_OPTIONS: RobotsDirectiveOptions = {
  indexing: "index",
  follow: "follow",
  noarchive: false,
  nosnippet: false,
  noimageindex: false,
  notranslate: false,
  maxSnippet: "omit",
  maxImagePreview: "omit",
  maxVideoPreview: "omit",
  unavailableAfter: "",
};

export type BuildRobotsContentStyle = {
  /** Se true, include sempre `index` e `follow` anche se valori predefiniti. */
  explicitDefaults: boolean;
};

function clampNonNegInt(n: number, fallback: number): number {
  if (!Number.isFinite(n) || n < 0) return fallback;
  return Math.floor(n);
}

/**
 * Costruisce il valore dell'attributo `content` per meta robots / X-Robots-Tag.
 * Ordine: index/noindex, follow/nofollow, poi direttive estese in ordine stabile.
 */
export function buildRobotsContent(
  o: RobotsDirectiveOptions,
  style: BuildRobotsContentStyle = { explicitDefaults: false },
): string {
  const parts: string[] = [];

  if (o.indexing === "noindex") parts.push("noindex");
  else if (style.explicitDefaults) parts.push("index");

  if (o.follow === "nofollow") parts.push("nofollow");
  else if (style.explicitDefaults) parts.push("follow");

  if (o.noarchive) parts.push("noarchive");
  if (o.nosnippet) parts.push("nosnippet");
  if (o.noimageindex) parts.push("noimageindex");
  if (o.notranslate) parts.push("notranslate");

  if (o.maxSnippet === "unlimited") parts.push("max-snippet:-1");
  else if (typeof o.maxSnippet === "number") {
    const n = clampNonNegInt(o.maxSnippet, 0);
    parts.push(`max-snippet:${n}`);
  }

  if (o.maxImagePreview !== "omit") {
    parts.push(`max-image-preview:${o.maxImagePreview}`);
  }

  if (o.maxVideoPreview === "unlimited") parts.push("max-video-preview:-1");
  else if (typeof o.maxVideoPreview === "number") {
    const s = clampNonNegInt(o.maxVideoPreview, 0);
    parts.push(`max-video-preview:${s}`);
  }

  const ua = o.unavailableAfter.trim();
  if (ua) parts.push(`unavailable_after:${ua}`);

  return parts.join(", ");
}

export type RobotsMetaPack = {
  robotsContent: string;
  googlebotContent: string | null;
  metaRobotsLine: string;
  metaGooglebotLine: string | null;
  xRobotsTagValue: string;
  htmlBlock: string;
  report: string;
};

export function buildRobotsMetaPack(
  robots: RobotsDirectiveOptions,
  googlebot: RobotsDirectiveOptions | null,
  style: BuildRobotsContentStyle = { explicitDefaults: false },
): RobotsMetaPack {
  const robotsContent = buildRobotsContent(robots, style);
  const googlebotContent =
    googlebot == null ? null : buildRobotsContent(googlebot, style);

  const metaRobotsLine = robotsContent.trim()
    ? `<meta name="robots" content="${escapeHtmlAttr(robotsContent)}">`
    : `<!-- Ometti meta robots: nessuna direttiva (equivalente tipico: index, follow) oppure abilita index/follow espliciti nel tool. -->`;
  const metaGooglebotLine =
    googlebotContent == null || googlebotContent === robotsContent
      ? null
      : `<meta name="googlebot" content="${escapeHtmlAttr(googlebotContent)}">`;

  const xRobotsTagValue = robotsContent.trim();

  const htmlBlock = metaGooglebotLine ? `${metaRobotsLine}\n${metaGooglebotLine}` : metaRobotsLine;

  const reportLines = [
    "Snippet HTML (<head>)",
    metaRobotsLine,
    ...(metaGooglebotLine ? [metaGooglebotLine] : []),
    "",
    "Header HTTP (solo se hai direttive da applicare a livello risposta)",
    xRobotsTagValue ? `X-Robots-Tag: ${xRobotsTagValue}` : "(nessun valore: spesso non serve inviare l’header quando il meta è vuoto o assente)",
    ...(metaGooglebotLine
      ? [
          "",
          "Nota: per regole solo Googlebot usa il meta googlebot sopra o la config del server (header per user-agent).",
        ]
      : []),
    "",
    "Valore content — robots",
    robotsContent.trim() || "(vuoto: equivalente a index,follow per molti crawler; spesso si omette il tag)",
  ];
  if (googlebotContent != null && googlebotContent !== robotsContent) {
    reportLines.push("", "Valore content — googlebot", googlebotContent);
  }

  return {
    robotsContent,
    googlebotContent,
    metaRobotsLine,
    metaGooglebotLine,
    xRobotsTagValue,
    htmlBlock,
    report: reportLines.join("\n"),
  };
}

function escapeHtmlAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/** Messaggi educativi (non errori di validazione stretta). */
export function collectRobotsNotes(o: RobotsDirectiveOptions): string[] {
  const notes: string[] = [];
  if (o.nosnippet && o.maxSnippet !== "omit") {
    notes.push("Hai sia nosnippet sia max-snippet: in pratica nosnippet blocca gli snippet; max-snippet può essere ignorato.");
  }
  if (o.indexing === "noindex" && o.noimageindex) {
    notes.push("Con noindex la pagina non viene indicizzata: noimageindex è spesso ridondante.");
  }
  const ua = o.unavailableAfter.trim();
  if (ua && !ua.includes(",")) {
    notes.push("unavailable_after richiede una data in formato HTTP-date (es. Sun, 01 Sep 2025 12:00:00 GMT). Verifica il formato.");
  }
  return notes;
}
