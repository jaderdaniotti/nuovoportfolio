/** Compilazione regex e raccolta match in ambiente JavaScript (browser / Node). */

export type RegexCompileResult =
  | { ok: true; regex: RegExp }
  | { ok: false; message: string };

export function compileRegex(pattern: string, flags: string): RegexCompileResult {
  try {
    return { ok: true, regex: new RegExp(pattern, flags) };
  } catch (e) {
    const message = e instanceof SyntaxError ? e.message : String(e);
    return { ok: false, message };
  }
}

export type RegexMatchDetail = {
  index: number;
  length: number;
  match: string;
  captures: string[];
  namedGroups?: Record<string, string | undefined>;
};

/**
 * Se il pattern non ha `g`, viene restituito al massimo il primo match (clone interno con `g` solo per la scansione).
 * Gestisce match di lunghezza zero incrementando `lastIndex` per evitare cicli infiniti.
 */
export function collectMatches(regex: RegExp, haystack: string): RegexMatchDetail[] {
  const global = regex.flags.includes("g");
  const scanner = global ? regex : new RegExp(regex.source, `${regex.flags}g`);
  const out: RegexMatchDetail[] = [];

  let m: RegExpExecArray | null;
  while ((m = scanner.exec(haystack)) !== null) {
    const captures = m.slice(1);
    out.push({
      index: m.index,
      length: m[0].length,
      match: m[0],
      captures,
      namedGroups: m.groups,
    });
    if (!global) break;
    if (m[0].length === 0) {
      scanner.lastIndex += 1;
    }
  }

  return out;
}

export type HighlightSegment =
  | { kind: "text"; text: string }
  | { kind: "match"; text: string };

/** Segmenti alternati testo / match per evidenziazione (match non sovrapposti; sovrapposizioni successive ignorate). */
export function segmentsForHighlight(haystack: string, matches: RegexMatchDetail[]): HighlightSegment[] {
  const sorted = [...matches].sort((a, b) => a.index - b.index);
  const segments: HighlightSegment[] = [];
  let cursor = 0;

  for (const mm of sorted) {
    if (mm.index < cursor) continue;
    if (mm.index > cursor) {
      segments.push({ kind: "text", text: haystack.slice(cursor, mm.index) });
    }
    segments.push({ kind: "match", text: haystack.slice(mm.index, mm.index + mm.length) });
    cursor = mm.index + mm.length;
  }

  if (cursor < haystack.length) {
    segments.push({ kind: "text", text: haystack.slice(cursor) });
  }

  return segments;
}
