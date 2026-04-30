/**
 * Validazione strutturale RSS 2.0 e Atom 1.x su markup tipico dei feed.
 * Euristiche a segmenti (non un parser XML completo): contenuti molto alterati o tag annidati
 * anomali possono falsare il conteggio degli item.
 */

export type FeedKind = "rss2" | "atom" | "none";

export type FeedValidationSummary = {
  title?: string;
  link?: string;
  description?: string;
  lastBuildDate?: string;
  language?: string;
  itemCount?: number;
  id?: string;
  updated?: string;
  subtitle?: string;
  entryCount?: number;
};

export type FeedValidationResult = {
  ok: boolean;
  kind: FeedKind;
  errors: string[];
  warnings: string[];
  summary: FeedValidationSummary;
};

const MAX_XML_INPUT_CHARS = 1_500_000;

export function sanitizeFeedXmlInput(raw: string): { xml: string } | { error: string } {
  const trimmed = raw.replace(/^\uFEFF/, "").trim();
  if (!trimmed) return { error: "Incolla del markup XML del feed oppure usa l’URL remoto." };
  if (trimmed.length > MAX_XML_INPUT_CHARS) {
    return {
      error: `Il markup supera ${MAX_XML_INPUT_CHARS.toLocaleString("it-IT")} caratteri. Riduci dimensione o usa URL.`,
    };
  }
  return { xml: trimmed };
}

export const SAMPLE_RSS_FEED = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Esempio blog</title>
    <link>https://example.com/</link>
    <description>Brevi note per testare il validatore.</description>
    <language>it-it</language>
    <item>
      <title>Articolo uno</title>
      <link>https://example.com/a1</link>
      <guid isPermaLink="true">https://example.com/a1</guid>
      <pubDate>Mon, 01 Jan 2024 12:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`;

export const SAMPLE_ATOM_FEED = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>https://example.com/feed.atom</id>
  <title type="text">Esempio Atom</title>
  <updated>2024-01-01T12:00:00Z</updated>
  <link rel="alternate" type="text/html" href="https://example.com/"/>
  <entry>
    <id>https://example.com/e1</id>
    <title>Voce uno</title>
    <updated>2024-01-01T12:00:00Z</updated>
    <link rel="alternate" href="https://example.com/e1"/>
  </entry>
</feed>`;

function stripOuterCdata(s: string): string {
  const t = s.trim();
  const m = t.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return m ? m[1]!.trim() : t;
}

function firstTaggedSection(xml: string, localName: string): string | undefined {
  const re = new RegExp(`<(?:[\\w.-]+:)?${localName}\\b[^>]*>([\\s\\S]*?)<\\/(?:[\\w.-]+:)?${localName}>`, "i");
  const m = xml.match(re);
  return m ? m[1] : undefined;
}

function firstTaggedText(xml: string, localName: string): string | undefined {
  const inner = firstTaggedSection(xml, localName);
  if (inner === undefined) return undefined;
  const stripped = stripOuterCdata(inner.trim());
  return stripped.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() || undefined;
}

function splitXmlLocalStarts(xml: string, tagLocal: string): number[] {
  const re = new RegExp(`<(?:[\\w.-]+:)?${tagLocal}\\b`, "gi");
  const out: number[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const before = xml.slice(Math.max(0, m.index - 200), m.index);
    if (/<!\[CDATA\[[^\]]*$/i.test(before)) continue;
    out.push(m.index);
  }
  return out;
}

function firstLinkHref(section: string): string | undefined {
  const re = /<link\b[^>]*>/gi;
  let best: string | undefined;
  let m: RegExpExecArray | null;
  while ((m = re.exec(section)) !== null) {
    const full = m[0]!;
    const hrefMatch = /\bhref\s*=\s*["']([^"']+)["']/i.exec(full);
    if (!hrefMatch) continue;
    const href = hrefMatch[1]!.trim();
    const relM = /\brel\s*=\s*["']([^"']*)["']/i.exec(full);
    const rel = relM?.[1]?.toLowerCase() ?? "";
    if (rel.includes("alternate") || rel.includes("self")) return href;
    if (!rel) best = href;
  }
  return best;
}

function rssPlainLink(section: string): string | undefined {
  const txt = firstTaggedText(section, "link");
  if (txt && /^https?:\/\//i.test(txt)) return txt;
  return undefined;
}

function extractRssChannelAndItems(xml: string): { channelHead: string; items: string[] } | null {
  const cs = xml.search(/<channel\b/i);
  if (cs < 0) return null;
  const openEnd = xml.indexOf(">", cs);
  if (openEnd < 0) return null;
  const afterChannel = openEnd + 1;

  const relItemIdx = splitXmlLocalStarts(xml.slice(afterChannel), "item");
  const itemIdx = relItemIdx.map((i) => i + afterChannel);

  const endChannel = xml.search(/<\/channel>/i);
  if (!itemIdx.length) {
    const channelHead =
      endChannel >= 0 ? xml.slice(afterChannel, endChannel) : xml.slice(afterChannel);
    return { channelHead, items: [] };
  }

  const firstItem = itemIdx[0]!;
  const channelHead = xml.slice(afterChannel, firstItem);
  const items: string[] = [];
  for (let i = 0; i < itemIdx.length; i++) {
    const start = itemIdx[i]!;
    const boundary = i + 1 < itemIdx.length ? itemIdx[i + 1]! : endChannel >= 0 ? endChannel : xml.length;
    if (boundary > start) items.push(xml.slice(start, boundary));
  }
  return { channelHead, items };
}

function extractAtomFeedAndEntries(xml: string): { feedHead: string; entries: string[] } | null {
  const fs = xml.search(/<feed\b/i);
  if (fs < 0) return null;
  const openEnd = xml.indexOf(">", fs);
  if (openEnd < 0) return null;
  const afterFeed = openEnd + 1;

  const entryIdxRel = splitXmlLocalStarts(xml.slice(afterFeed), "entry");
  const entryIdx = entryIdxRel.map((i) => i + afterFeed);

  const endFeed = xml.search(/<\/feed>/i);

  if (!entryIdx.length) {
    const feedHead = endFeed >= 0 ? xml.slice(afterFeed, endFeed) : xml.slice(afterFeed);
    return { feedHead, entries: [] };
  }

  const feedHead = xml.slice(afterFeed, entryIdx[0]!);
  const entries: string[] = [];
  for (let i = 0; i < entryIdx.length; i++) {
    const start = entryIdx[i]!;
    const boundary = i + 1 < entryIdx.length ? entryIdx[i + 1]! : endFeed >= 0 ? endFeed : xml.length;
    if (boundary > start) entries.push(xml.slice(start, boundary));
  }
  return { feedHead, entries };
}

function validateRss2(xml: string): FeedValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const hasRssRoot = /<rss\b/i.test(xml) && /\bversion\s*=\s*["']2\.0["']/i.test(xml);
  if (!hasRssRoot) {
    warnings.push('Elemento root <rss version="2.0"> non trovato o versione diversa.');
  }

  const got = extractRssChannelAndItems(xml);
  if (!got) {
    return {
      ok: false,
      kind: "rss2",
      errors: [...errors, 'Manca un blocco <channel> … </channel> valido.'],
      warnings,
      summary: {},
    };
  }

  const { channelHead, items } = got;
  const title = firstTaggedText(channelHead, "title");
  const description = firstTaggedText(channelHead, "description") ?? firstTaggedText(channelHead, "subtitle");
  const link = rssPlainLink(channelHead) ?? firstLinkHref(channelHead);

  if (!title) errors.push("Nel channel manca un <title> con testo.");
  if (!link) errors.push("Nel channel manca <link> con URL http(s) oppure elemento <link href=\"…\"/>.");
  if (!description) errors.push("Nel channel manca <description> (obbligatoria in RSS 2.0).");

  let emptyItems = 0;
  for (let i = 0; i < items.length; i++) {
    const slug = `#${i + 1}`;
    const itTitle = firstTaggedText(items[i]!, "title");
    const itDesc = firstTaggedSection(items[i]!, "description");
    const itLink = rssPlainLink(items[i]!) ?? firstLinkHref(items[i]!);
    const itGuid = firstTaggedText(items[i]!, "guid");

    if (!itTitle && !itDesc) {
      errors.push(`Item ${slug}: mancano sia <title> sia <description> (almeno uno richiesto).`);
    }
    if (!itLink && !itGuid) {
      warnings.push(`Item ${slug}: né <link> né <guid> — molti aggregatori richiedono un permalink stabile.`);
    }
    if (!itTitle?.trim() && !itDesc?.trim()) emptyItems++;
  }

  if (items.length === 0) {
    warnings.push("Nessun <item> nel feed: valido come testata ma i lettori non mostreranno articoli.");
  }

  const lastBuildDate = firstTaggedText(channelHead, "lastBuildDate");
  const language = firstTaggedText(channelHead, "language");

  const ok = errors.length === 0;
  return {
    ok,
    kind: "rss2",
    errors,
    warnings,
    summary: {
      title,
      link,
      description,
      lastBuildDate,
      language,
      itemCount: items.length,
    },
  };
}

function entryHasAuthor(entryXml: string): boolean {
  return /<(?:[\w.-]+:)?author\b/i.test(entryXml);
}

function validateAtom(xml: string): FeedValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const got = extractAtomFeedAndEntries(xml);
  if (!got) {
    return {
      ok: false,
      kind: "atom",
      errors: ['Struttura <feed> … </feed> non riconosciuta.'],
      warnings,
      summary: {},
    };
  }

  const { feedHead, entries } = got;
  const id = firstTaggedText(feedHead, "id");
  const title = firstTaggedText(feedHead, "title");
  const updated = firstTaggedText(feedHead, "updated");
  const subtitle = firstTaggedText(feedHead, "subtitle");
  const link = firstLinkHref(feedHead);

  if (!id) errors.push("Nel feed Atom manca <id> (identificatore stabile del feed).");
  if (!title) errors.push("Nel feed Atom manca <title>.");
  if (!updated) errors.push("Nel feed Atom manca <updated> (timestamp ultimo aggiornamento significativo).");

  const feedHasAuthor = /<(?:[\w.-]+:)?author\b/i.test(feedHead);
  if (!feedHasAuthor) {
    if (entries.length === 0) {
      warnings.push("Atom: nessun <author> nel feed vuoto — aggiungi autore a livello feed per conformità.");
    } else if (!entries.every(entryHasAuthor)) {
      warnings.push(
        "Atom: manca <author> a livello feed e almeno una entry senza <author> — la specifica richiede autore " +
          "sul feed o su ogni entry.",
      );
    }
  }

  for (let i = 0; i < entries.length; i++) {
    const slug = `#${i + 1}`;
    const e = entries[i]!;
    const eid = firstTaggedText(e, "id");
    const etitle = firstTaggedText(e, "title");
    const eupdated = firstTaggedText(e, "updated");

    if (!eid) errors.push(`Entry ${slug}: manca <id>.`);
    if (!etitle) errors.push(`Entry ${slug}: manca <title>.`);
    if (!eupdated) errors.push(`Entry ${slug}: manca <updated>.`);

    const elink = firstLinkHref(e);
    const ePlain = rssPlainLink(e);
    if (!elink && !ePlain) {
      warnings.push(`Entry ${slug}: nessun <link href="…"/> trovato (consigliato per lettori HTML).`);
    }
  }

  if (entries.length === 0) {
    warnings.push("Nessuna <entry>: feed vuoto per i lettori RSS.");
  }

  const xmlnsOk =
    /xmlns\s*=\s*["']http:\/\/www\.w3\.org\/2005\/Atom["']/i.test(xml.slice(0, 2500));
  if (!xmlnsOk) {
    warnings.push('Namespace Atom http://www.w3.org/2005/Atom non rilevato subito dopo <feed>; verifica validità.');
  }

  const ok = errors.length === 0;
  return {
    ok,
    kind: "atom",
    errors,
    warnings,
    summary: {
      title,
      id,
      updated,
      subtitle,
      link,
      entryCount: entries.length,
    },
  };
}

export function validateFeedMarkup(xmlRaw: string): FeedValidationResult {
  const sanitized = sanitizeFeedXmlInput(xmlRaw);
  if ("error" in sanitized) {
    return {
      ok: false,
      kind: "none",
      errors: [sanitized.error],
      warnings: [],
      summary: {},
    };
  }

  const xml = sanitized.xml;
  const slice400 = xml.slice(0, 400);
  const isRss20 = /<rss\b/i.test(xml) && /\bversion\s*=\s*["']2\.0["']/i.test(slice400);
  const isAtom =
    /<feed\b/i.test(xml) &&
    (/xmlns\s*=\s*["']http:\/\/www\.w3\.org\/2005\/Atom["']/i.test(xml.slice(0, 12000)) || /<entry\b/i.test(xml));

  if (isRss20) return validateRss2(xml);
  if (isAtom) return validateAtom(xml);
  if (/<rss\b/i.test(xml)) {
    const r = validateRss2(xml);
    if (!/\bversion\s*=\s*["']2\.0["']/i.test(slice400)) {
      return {
        ...r,
        warnings: [...r.warnings, 'Consigliato: dichiarare <rss version="2.0"> sul root.'],
      };
    }
    return r;
  }

  return {
    ok: false,
    kind: "none",
    errors: [
      "Il documento non è stato riconosciuto come RSS 2.0 né come Atom.",
      'Suggerimento: usa root <rss version="2.0"> con <channel> oppure <feed xmlns="http://www.w3.org/2005/Atom">.',
    ],
    warnings: [],
    summary: {},
  };
}

export function formatFeedValidationReport(result: FeedValidationResult, context?: string): string {
  const lines: string[] = [
    "Report validazione feed RSS/Atom",
    context ? `Contesto: ${context}` : null,
    `Tipo rilevato: ${result.kind === "none" ? "sconosciuto" : result.kind}`,
    `Esito: ${result.ok ? "OK" : "PROBLEMI"}`,
    "",
    "--- Sintesi ---",
    ...Object.entries(result.summary)
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) => `${k}: ${v}`),
    "",
    ...(result.errors.length ? ["Errori:", ...result.errors.map((e) => `  - ${e}`), ""] : []),
    ...(result.warnings.length ? ["Avvisi:", ...result.warnings.map((w) => `  - ${w}`), ""] : []),
  ].filter(Boolean) as string[];
  return lines.join("\n").trimEnd();
}
