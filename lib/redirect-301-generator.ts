/**
 * Parse paired redirect lines (old → new) and emit Apache / Nginx / Vercel snippets.
 * All computation is deterministic and safe for SSR/bundlers (no DOM).
 */

export const REDIRECT_301_MAX_PAIRS = 500;

export type Redirect301Pair = {
  /** 1-based index in original input among non-comment lines */
  index: number;
  fromRaw: string;
  toRaw: string;
};

export type Redirect301Issue = {
  line: number;
  message: string;
};

export type Redirect301Analysis = {
  pairs: Redirect301Pair[];
  issues: Redirect301Issue[];
};

function splitPair(line: string): { from: string; to: string } | null {
  const t = line.trim();
  if (!t) return null;

  const arrowIdx = (() => {
    const a = t.indexOf("->");
    const b = t.indexOf("=>");
    if (a === -1) return b;
    if (b === -1) return a;
    return Math.min(a, b);
  })();
  if (arrowIdx !== -1) {
    const sepLen = t.startsWith("=>", arrowIdx) ? 3 : t.startsWith("->", arrowIdx) ? 2 : 2;
    const from = t.slice(0, arrowIdx).trim();
    const to = t.slice(arrowIdx + sepLen).trim();
    if (from && to) return { from, to };
  }

  if (t.includes("\t")) {
    const parts = t.split(/\t+/).map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 2) {
      return { from: parts[0], to: parts.slice(1).join("\t") };
    }
  }

  const pipe = t.indexOf("|");
  if (pipe !== -1) {
    const from = t.slice(0, pipe).trim();
    const to = t.slice(pipe + 1).trim();
    if (from && to) return { from, to };
  }

  const comma = t.indexOf(",");
  if (comma !== -1) {
    const from = t.slice(0, comma).trim();
    const to = t.slice(comma + 1).trim();
    if (from && to) return { from, to };
  }

  const multiSpace = t.match(/^(.+?)\s{2,}(.+)$/);
  if (multiSpace) {
    return { from: multiSpace[1].trim(), to: multiSpace[2].trim() };
  }

  return null;
}

function isReasonablePathOrUrl(s: string): boolean {
  const v = s.trim();
  if (!v) return false;
  if (v.startsWith("/")) return true;
  if (/^https?:\/\//i.test(v)) return true;
  return false;
}

/** Pathname (+ search + hash) for Apache location-style output, or original path string */
export function redirectFromKey(from: string): string {
  const t = from.trim();
  try {
    if (/^https?:\/\//i.test(t)) {
      const u = new URL(t);
      return `${u.pathname}${u.search}${u.hash}` || "/";
    }
  } catch {
    /* fall through */
  }
  return t.startsWith("/") ? t : `/${t}`;
}

export function parseRedirect301Input(text: string): Redirect301Analysis {
  const lines = text.split(/\r?\n/);
  const pairs: Redirect301Pair[] = [];
  const issues: Redirect301Issue[] = [];
  let contentLine = 0;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const lineNum = i + 1;
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    contentLine += 1;
    const parsed = splitPair(trimmed);
    if (!parsed) {
      issues.push({
        line: lineNum,
        message:
          'Formato non riconosciuto: usa `vecchio -> nuovo`, pipe, tab, virgola o due o più spazi tra i due percorsi/URL.',
      });
      continue;
    }

    const { from, to } = parsed;
    if (!isReasonablePathOrUrl(from) || !isReasonablePathOrUrl(to)) {
      issues.push({
        line: lineNum,
        message: "Ogni parte deve essere un URL http(s) oppure un percorso assoluto che inizia con /.",
      });
      continue;
    }

    const fk = redirectFromKey(from);
    const tk = redirectFromKey(to);
    if (fk === tk) {
      issues.push({ line: lineNum, message: "Sorgente e destinazione coincidono dopo la normalizzazione: redirect inutile." });
      continue;
    }

    pairs.push({ index: contentLine, fromRaw: from.trim(), toRaw: to.trim() });
  }

  if (pairs.length > REDIRECT_301_MAX_PAIRS) {
    issues.unshift({
      line: 0,
      message: `Superato il limite di ${REDIRECT_301_MAX_PAIRS} redirect: riduci le righe.`,
    });
    return { pairs: pairs.slice(0, REDIRECT_301_MAX_PAIRS), issues };
  }

  return { pairs, issues };
}

export function buildApacheRedirect301(analysis: Redirect301Analysis): string {
  const { pairs } = analysis;
  if (!pairs.length) return "";
  const header = "# Apache: mod_alias (assicurati che mod_alias sia attivo)\n";
  return (
    header +
    pairs
      .map(({ fromRaw, toRaw }) => {
        const fromPath = redirectFromKey(fromRaw);
        return `Redirect 301 ${fromPath} ${toRaw.trim()}`;
      })
      .join("\n") +
    "\n"
  );
}

export function buildNginxRedirect301(analysis: Redirect301Analysis): string {
  const { pairs } = analysis;
  if (!pairs.length) return "";
  const header =
    "# Nginx: sposta i blocchi location nel server corretto;\n# per path con caratteri speciali adatta le quote\n\n";
  return (
    header +
    pairs
      .map(({ fromRaw, toRaw }) => {
        const path = redirectFromKey(fromRaw);
        const loc = path;
        const dest = toRaw.trim();
        return `location = ${loc} {\n  return 301 ${dest};\n}`;
      })
      .join("\n\n") +
    "\n"
  );
}

export type VercelRedirectEntry = {
  source: string;
  destination: string;
  permanent: boolean;
};

export function buildVercelRedirects301(analysis: Redirect301Analysis): VercelRedirectEntry[] {
  return analysis.pairs.map(({ fromRaw, toRaw }) => ({
    source: redirectFromKey(fromRaw),
    destination: toRaw.trim(),
    permanent: true,
  }));
}

export function formatRedirect301Report(analysis: Redirect301Analysis): string {
  const lines: string[] = [];
  lines.push(`Redirect 301 — ${analysis.pairs.length} coppie valide`);
  if (analysis.issues.length) {
    lines.push("");
    lines.push("Note / errori:");
    for (const i of analysis.issues) {
      lines.push(i.line ? `  riga ${i.line}: ${i.message}` : `  ${i.message}`);
    }
  }
  if (analysis.pairs.length) {
    lines.push("");
    lines.push("Elenco:");
    for (const p of analysis.pairs) {
      lines.push(`  ${p.index}. ${p.fromRaw} → ${p.toRaw}`);
    }
  }
  return lines.join("\n");
}
