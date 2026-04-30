/** Estrazione URL e validazione lato client per il checker link rotti. */

export const BROKEN_LINK_MAX_URLS = 40;

export type BrokenLinkRemoteStatus = {
  url: string;
  finalUrl: string;
  httpStatus: number | null;
  ok: boolean;
  note?: string;
};

const HREF_SRC_RE = /\b(?:href|src)\s*=\s*(["'])([^"'<>]*)\1/gi;

function trimUrl(raw: string): string {
  return raw.trim().replace(/\s+/g, "");
}

function skipScheme(url: string): boolean {
  const lower = url.slice(0, 12).toLowerCase();
  return (
    lower.startsWith("javascript:") ||
    lower.startsWith("mailto:") ||
    lower.startsWith("tel:") ||
    lower.startsWith("data:") ||
    lower.startsWith("#") ||
    lower.startsWith("about:")
  );
}

export function extractHttpUrlsFromHtml(html: string, baseUrlRaw?: string): string[] {
  const base =
    baseUrlRaw?.trim() ?
      (() => {
        try {
          return new URL(baseUrlRaw.trim()).href;
        } catch {
          return null;
        }
      })()
    : null;

  const out: string[] = [];
  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  const re = new RegExp(HREF_SRC_RE.source, HREF_SRC_RE.flags);
  while ((m = re.exec(html)) !== null) {
    const raw = trimUrl(m[2] ?? "");
    if (!raw || raw === "#" || skipScheme(raw)) continue;
    try {
      const resolved = base ? new URL(raw, base).href : new URL(raw).href;
      if (!/^https?:\/\//i.test(resolved)) continue;
      const norm = resolved.split("#")[0] ?? resolved;
      if (norm && !seen.has(norm)) {
        seen.add(norm);
        out.push(norm);
      }
    } catch {
      // skip invalid relative without base
    }
  }
  return out;
}

export function parseUrlsFromLines(text: string): string[] {
  const lines = text.split(/\r?\n/);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of lines) {
    const t = trimUrl(line);
    if (!t || t.startsWith("#")) continue;
    try {
      const u = new URL(t.startsWith("//") ? `https:${t}` : t).href;
      if (!/^https?:\/\//i.test(u)) continue;
      const norm = u.split("#")[0] ?? u;
      if (!seen.has(norm)) {
        seen.add(norm);
        out.push(norm);
      }
    } catch {
      // skip
    }
  }
  return out;
}

export function validateUrlBatch(urls: string[]): string | null {
  if (urls.length === 0) return "Aggiungi almeno un URL http/https oppure incolla HTML con link.";
  if (urls.length > BROKEN_LINK_MAX_URLS) {
    return `Massimo ${BROKEN_LINK_MAX_URLS} URL per richiesta (ne hai ${urls.length}). Riduci l’elenco o il markup.`;
  }
  return null;
}

export function formatBrokenLinkReport(rows: BrokenLinkRemoteStatus[]): string {
  const header = ["URL", "Stato HTTP", "Esito", "Note"].join("\t");
  const body = rows.map((r) => {
    const status = r.httpStatus == null ? "—" : String(r.httpStatus);
    const esito = r.ok ? "OK" : "Problema";
    const noteParts = [r.note, r.finalUrl !== r.url ? `finale: ${r.finalUrl}` : ""].filter(Boolean);
    return [r.url, status, esito, noteParts.join(" — ")].join("\t");
  });
  return [header, ...body].join("\n");
}
