export type MinifierMode = "html" | "css" | "js";

/** HTML: rimuove commenti <!-- --> e spazi/newline solo tra tag adiacenti (preserva testo e contenuto di script/style). */
export function minifyHtml(source: string): string {
  let s = source.replace(/<!--[\s\S]*?-->/g, "");
  let prev = "";
  while (prev !== s) {
    prev = s;
    s = s.replace(/>\s+</g, "><");
  }
  return s.trim();
}

/** CSS: rimuove commenti /* *\/ e comprime sequenze di whitespace. */
export function minifyCss(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isRegexStartPrev(prevNonWs: string): boolean {
  if (prevNonWs === "" || prevNonWs === "\n") return true;
  const prev = prevNonWs.slice(-1);
  return "([{:;,=!?+-*%&|^~>".includes(prev);
}

/** Dopo alcune keyword JS il `/` apre quasi sempre una regex letterale (es. `return /re/`). */
function isRegexAfterKeyword(s: string, slashIndex: number): boolean {
  let j = slashIndex - 1;
  while (j >= 0 && /\s/u.test(s[j]!)) j--;
  const end = j;
  while (j >= 0 && /[\w$]/u.test(s[j]!)) j--;
  const word = s.slice(j + 1, end + 1);
  return /^(return|case|throw|typeof|void|delete|yield|await|instanceof|in|of)$/u.test(word);
}

function isRegexDivisionSlash(s: string, i: number, prevNonWs: string): boolean {
  return isRegexStartPrev(prevNonWs) || isRegexAfterKeyword(s, i);
}

/**
 * Rimuove commenti // e /* *\/ dal JS rispettando stringhe ', ", template literals e regex letterali (/…/).
 * Non esegue ottimizzazioni semantiche (sicuro per snippet tipici incollati).
 */
export function stripJsCommentsAndCompressWs(source: string): string {
  const s = source;
  let out = "";
  let i = 0;
  let state: "code" | "sq" | "dq" | "tmpl" | "tmpl_expr" | "line" | "block" | "regex" = "code";
  let tmplBraceDepth = 0;
  let prevNonWs = "";
  let afterString: "code" | "tmpl_expr" = "code";
  let afterRegex: "code" | "tmpl_expr" = "code";
  let afterComment: "code" | "tmpl_expr" = "code";

  const append = (ch: string) => {
    out += ch;
    if (!/\s/u.test(ch)) prevNonWs = ch;
  };

  while (i < s.length) {
    const c = s[i]!;
    const next = s[i + 1];

    if (state === "line") {
      if (c === "\n" || c === "\r") {
        state = afterComment;
        append("\n");
      }
      i += 1;
      continue;
    }

    if (state === "block") {
      if (c === "*" && next === "/") {
        i += 2;
        state = afterComment;
        continue;
      }
      i += 1;
      continue;
    }

    if (state === "sq") {
      append(c);
      if (c === "\\" && i + 1 < s.length) {
        append(s[i + 1]!);
        i += 2;
        continue;
      }
      if (c === "'") state = afterString;
      i += 1;
      continue;
    }

    if (state === "dq") {
      append(c);
      if (c === "\\" && i + 1 < s.length) {
        append(s[i + 1]!);
        i += 2;
        continue;
      }
      if (c === '"') state = afterString;
      i += 1;
      continue;
    }

    if (state === "regex") {
      append(c);
      if (c === "\\" && i + 1 < s.length) {
        append(s[i + 1]!);
        i += 2;
        continue;
      }
      if (c === "/") {
        while (i + 1 < s.length && /[gimsuy]/u.test(s[i + 1]!)) {
          i += 1;
          append(s[i]!);
        }
        state = afterRegex;
      }
      i += 1;
      continue;
    }

    if (state === "tmpl") {
      if (c === "\\" && i + 1 < s.length) {
        append(c);
        append(s[i + 1]!);
        i += 2;
        continue;
      }
      if (c === "`") {
        append(c);
        state = "code";
        i += 1;
        continue;
      }
      if (c === "$" && next === "{") {
        append("${");
        i += 2;
        state = "tmpl_expr";
        tmplBraceDepth = 1;
        continue;
      }
      append(c);
      i += 1;
      continue;
    }

    if (state === "tmpl_expr") {
      if (c === "'") {
        afterString = "tmpl_expr";
        state = "sq";
        append(c);
        i += 1;
        continue;
      }
      if (c === '"') {
        afterString = "tmpl_expr";
        state = "dq";
        append(c);
        i += 1;
        continue;
      }
      if (c === "`") {
        state = "tmpl";
        append(c);
        i += 1;
        continue;
      }
      if (c === "/" && next === "/") {
        afterComment = "tmpl_expr";
        i += 2;
        state = "line";
        continue;
      }
      if (c === "/" && next === "*") {
        afterComment = "tmpl_expr";
        i += 2;
        state = "block";
        continue;
      }
      if (c === "/" && isRegexDivisionSlash(s, i, prevNonWs)) {
        afterRegex = "tmpl_expr";
        state = "regex";
        append(c);
        i += 1;
        continue;
      }

      append(c);
      if (c === "{") tmplBraceDepth += 1;
      else if (c === "}") {
        tmplBraceDepth -= 1;
        if (tmplBraceDepth <= 0) {
          state = "tmpl";
          tmplBraceDepth = 0;
        }
      }
      i += 1;
      continue;
    }

    // code
    if (c === "'") {
      afterString = "code";
      state = "sq";
      append(c);
      i += 1;
      continue;
    }
    if (c === '"') {
      afterString = "code";
      state = "dq";
      append(c);
      i += 1;
      continue;
    }
    if (c === "`") {
      state = "tmpl";
      append(c);
      i += 1;
      continue;
    }
    if (c === "/" && next === "/") {
      afterComment = "code";
      i += 2;
      state = "line";
      continue;
    }
    if (c === "/" && next === "*") {
      afterComment = "code";
      i += 2;
      state = "block";
      continue;
    }
    if (c === "/" && isRegexDivisionSlash(s, i, prevNonWs)) {
      afterRegex = "code";
      state = "regex";
      append(c);
      i += 1;
      continue;
    }

    append(c);
    i += 1;
  }

  const collapsed = out
    .replace(/[ \t]+/gu, " ")
    .replace(/\n{3,}/gu, "\n\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();

  return collapsed;
}

export type JsMinifyResult =
  | { ok: true; output: string }
  | { ok: false; message: string };

export function minifyJsSync(source: string): JsMinifyResult {
  const trimmed = source.trim();
  if (!trimmed) {
    return { ok: false, message: "Incolla JavaScript da minificare." };
  }
  try {
    const output = stripJsCommentsAndCompressWs(trimmed);
    return { ok: true, output };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, message };
  }
}

export function minifyStats(beforeLen: number, afterLen: number): {
  before: number;
  after: number;
  savedPct: number;
} {
  if (beforeLen <= 0) return { before: 0, after: afterLen, savedPct: 0 };
  const savedPct = Math.round((1 - afterLen / beforeLen) * 1000) / 10;
  return { before: beforeLen, after: afterLen, savedPct };
}
