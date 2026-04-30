/** Parse options and results for CSV → JSON conversion (RFC 4180–style quoting). */

export type CsvDelimiter = "," | ";" | "\t" | "|";

export type CsvToJsonInputOptions = {
  delimiter: CsvDelimiter | "auto";
  firstRowHeaders: boolean;
  trimCells: boolean;
};

export type CsvParseError = {
  ok: false;
  message: string;
  line?: number;
};

export type CsvParseOk = {
  ok: true;
  rows: string[][];
  delimiter: CsvDelimiter;
  rowCount: number;
  columnCount: number;
};

export type CsvParseResult = CsvParseError | CsvParseOk;

const MAX_BYTES = 2 * 1024 * 1024;
const MAX_ROWS = 50_000;
const MAX_COLS = 512;

const DELIMS: CsvDelimiter[] = [",", ";", "\t", "|"];

function stripBom(s: string): string {
  if (s.length > 0 && s.charCodeAt(0) === 0xfeff) return s.slice(1);
  return s;
}

function parseCsvWithDelimiter(text: string, delimiter: CsvDelimiter): CsvParseResult {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let i = 0;
  let lineStart = 1;
  let inQuotes = false;

  const pushField = () => {
    row.push(field);
    field = "";
  };

  const pushRow = () => {
    rows.push(row);
    row = [];
  };

  while (i < text.length) {
    const c = text[i];

    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      if (c === "\r") {
        if (text[i + 1] === "\n") {
          field += "\r\n";
          i += 2;
          lineStart += 1;
        } else {
          field += "\r";
          i += 1;
          lineStart += 1;
        }
        continue;
      }
      if (c === "\n") {
        field += "\n";
        i += 1;
        lineStart += 1;
        continue;
      }
      field += c;
      i += 1;
      continue;
    }

    if (c === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }

    if (c === delimiter) {
      pushField();
      i += 1;
      continue;
    }

    if (c === "\r") {
      const j = text[i + 1] === "\n" ? 2 : 1;
      pushField();
      pushRow();
      lineStart += 1;
      i += j;
      if (rows.length >= MAX_ROWS) {
        return { ok: false, message: `Troppe righe (limite ${MAX_ROWS}).`, line: lineStart };
      }
      continue;
    }

    if (c === "\n") {
      pushField();
      pushRow();
      lineStart += 1;
      i += 1;
      if (rows.length >= MAX_ROWS) {
        return { ok: false, message: `Troppe righe (limite ${MAX_ROWS}).`, line: lineStart };
      }
      continue;
    }

    field += c;
    i += 1;
  }

  if (inQuotes) {
    return { ok: false, message: "Campo tra virgolette non chiuso.", line: lineStart };
  }

  pushField();
  const lastNonEmptyRow =
    row.length > 1 || (row.length === 1 && row[0] !== "") || rows.length === 0;
  if (lastNonEmptyRow) {
    rows.push(row);
  }

  for (let r = 0; r < rows.length; r += 1) {
    const cols = rows[r].length;
    if (cols > MAX_COLS) {
      return { ok: false, message: `Troppe colonne (limite ${MAX_COLS}).`, line: r + 1 };
    }
  }

  const colWidths = rows.map((rr) => rr.length);
  const maxCols = colWidths.length ? Math.max(...colWidths) : 0;

  return {
    ok: true,
    rows,
    delimiter,
    rowCount: rows.length,
    columnCount: maxCols,
  };
}

/** Score delimiter: prefer consistent column widths; higher is better. */
function delimiterScore(parsed: Extract<CsvParseResult, { ok: true }>): number {
  if (parsed.rows.length === 0) return 0;
  const firstRowLen = parsed.rows[0].length;
  if (firstRowLen < 2) return 0;
  let same = 0;
  for (const r of parsed.rows) {
    if (r.length === firstRowLen) same += 1;
  }
  const ratio = same / parsed.rows.length;
  return Math.round(ratio * 1000) + firstRowLen * 10;
}

export function detectDelimiter(text: string): CsvDelimiter {
  let best: CsvDelimiter = ",";
  let bestScore = -1;
  for (const d of DELIMS) {
    const r = parseCsvWithDelimiter(text, d);
    if (!r.ok) continue;
    const s = delimiterScore(r);
    if (s > bestScore) {
      bestScore = s;
      best = d;
    }
  }
  if (bestScore <= 0 && text.includes("\t")) return "\t";
  return best;
}

export function parseCsv(text: string, delimiter: CsvDelimiter | "auto"): CsvParseResult {
  const raw = stripBom(text);
  if (raw.length > MAX_BYTES) {
    return { ok: false, message: `Input troppo grande (max ${MAX_BYTES} byte).` };
  }
  if (delimiter === "auto") {
    const d = detectDelimiter(raw);
    return parseCsvWithDelimiter(raw, d);
  }
  return parseCsvWithDelimiter(raw, delimiter);
}

function sanitizeHeaderKey(raw: string, index: number, used: Map<string, number>): string {
  let base = raw.trim() || `column_${index + 1}`;
  const n = (used.get(base) ?? 0) + 1;
  used.set(base, n);
  if (n === 1) return base;
  return `${base}_${n}`;
}

export type CsvToJsonOutput =
  | { ok: true; json: unknown; pretty: string; meta: { delimiter: CsvDelimiter; rows: number; mode: "objects" | "arrays" } }
  | { ok: false; message: string; line?: number };

export function csvTextToJson(text: string, options: CsvToJsonInputOptions): CsvToJsonOutput {
  const trimmedOnly = stripBom(text).trim();
  if (!trimmedOnly) {
    return { ok: false, message: "Incolla CSV o usa «Carica esempio» / carica file." };
  }

  const parsed = parseCsv(text, options.delimiter);
  if (!parsed.ok) return parsed;

  const { rows, delimiter } = parsed;
  if (rows.length === 0) {
    return {
      ok: true,
      json: options.firstRowHeaders ? [] : [],
      pretty: options.firstRowHeaders ? "[]" : "[]",
      meta: { delimiter, rows: 0, mode: options.firstRowHeaders ? "objects" : "arrays" },
    };
  }

  const trimCell = options.trimCells ? (s: string) => s.trim() : (s: string) => s;

  if (!options.firstRowHeaders) {
    const data = rows.map((r) => r.map(trimCell));
    return {
      ok: true,
      json: data,
      pretty: JSON.stringify(data, null, 2),
      meta: { delimiter, rows: data.length, mode: "arrays" },
    };
  }

  const headerRow = rows[0].map(trimCell);
  const used = new Map<string, number>();
  const keys = headerRow.map((h, i) => sanitizeHeaderKey(h, i, used));

  const objects: Record<string, string>[] = [];
  for (let r = 1; r < rows.length; r += 1) {
    const line = rows[r];
    const obj: Record<string, string> = {};
    const len = Math.max(keys.length, line.length);
    for (let c = 0; c < len; c += 1) {
      const k = keys[c] ?? `column_${c + 1}`;
      obj[k] = trimCell(line[c] ?? "");
    }
    objects.push(obj);
  }

  return {
    ok: true,
    json: objects,
    pretty: JSON.stringify(objects, null, 2),
    meta: { delimiter, rows: objects.length, mode: "objects" },
  };
}
