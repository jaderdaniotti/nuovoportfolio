export type RobotsSeverity = "error" | "warning" | "info";

export type RobotsIssue = {
  line: number;
  severity: RobotsSeverity;
  message: string;
};

export type RobotsStats = {
  userAgents: number;
  disallow: number;
  allow: number;
  sitemap: number;
  crawlDelay: number;
  approxGroups: number;
};

export type RobotsValidationResult = {
  issues: RobotsIssue[];
  stats: RobotsStats;
  hasErrors: boolean;
  hasWarnings: boolean;
  byteLength: number;
};

const KNOWN_DIRECTIVES = new Set([
  "user-agent",
  "disallow",
  "allow",
  "sitemap",
  "crawl-delay",
  "host",
  "request-rate",
  "clean-param",
]);

const MAX_BYTES_GOOGLE = 500 * 1024;

function stripBom(raw: string): { text: string; hadBom: boolean } {
  if (raw.length > 0 && raw.charCodeAt(0) === 0xfeff) {
    return { text: raw.slice(1), hadBom: true };
  }
  return { text: raw, hadBom: false };
}

function isReasonableSitemapUrl(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function isPositiveNumber(value: string): boolean {
  const n = Number.parseFloat(value.trim().replace(",", "."));
  return Number.isFinite(n) && n > 0;
}

/** Parse and validate robots.txt (syntax oriented; de facto rules for common directives). */
export function validateRobotsTxt(raw: string): RobotsValidationResult {
  const issues: RobotsIssue[] = [];
  const { text, hadBom } = stripBom(raw ?? "");

  if (hadBom) {
    issues.push({
      line: 1,
      severity: "warning",
      message: "Rilevato BOM UTF-8 iniziale: conviene salvare il file senza BOM per evitare sorprese su alcuni crawler.",
    });
  }

  const encoder = new TextEncoder();
  const byteLength = encoder.encode(text).length;
  if (byteLength > MAX_BYTES_GOOGLE) {
    issues.push({
      line: 1,
      severity: "warning",
      message: `File molto grande (${Math.round(byteLength / 1024)} KiB). Google ignora contenuti oltre ~500 KiB.`,
    });
  }

  const lines = text.split(/\r?\n/);
  const stats: RobotsStats = {
    userAgents: 0,
    disallow: 0,
    allow: 0,
    sitemap: 0,
    crawlDelay: 0,
    approxGroups: 0,
  };

  let inUserAgentGroup = false;
  let sawAnyUserAgent = false;
  let sawWildcardUserAgent = false;
  let lastLineWasBlank = true;
  let mentionedCrawlDelayGoogle = false;

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const trimmed = lines[i]?.replace(/\r$/, "").trim() ?? "";

    if (trimmed === "") {
      inUserAgentGroup = false;
      lastLineWasBlank = true;
      continue;
    }

    const precededByBlank = lastLineWasBlank;
    lastLineWasBlank = false;

    const hash = trimmed.indexOf("#");
    const withoutComment = (hash >= 0 ? trimmed.slice(0, hash) : trimmed).trim();
    if (withoutComment === "") continue;

    const colon = withoutComment.indexOf(":");
    if (colon < 0) {
      issues.push({
        line: lineNum,
        severity: "error",
        message: "Riga non valida: manca il separatore ':' (formato atteso: Direttiva: valore).",
      });
      continue;
    }

    const nameRaw = withoutComment.slice(0, colon).trim();
    const value = withoutComment.slice(colon + 1).trim();

    if (!nameRaw) {
      issues.push({
        line: lineNum,
        severity: "error",
        message: "Nome direttiva vuoto prima di ':'.",
      });
      continue;
    }

    if (!/^[\w-]+$/.test(nameRaw)) {
      issues.push({
        line: lineNum,
        severity: "error",
        message: "Nome direttiva con caratteri non attesi (usa lettere, numeri, trattino).",
      });
      continue;
    }

    const name = nameRaw.toLowerCase();

    if (!KNOWN_DIRECTIVES.has(name)) {
      issues.push({
        line: lineNum,
        severity: "warning",
        message: `Direttiva non standard "${nameRaw}": alcuni crawler potrebbero ignorarla.`,
      });
    }

    switch (name) {
      case "user-agent":
        stats.userAgents += 1;
        if (precededByBlank || !inUserAgentGroup) {
          stats.approxGroups += 1;
        }
        inUserAgentGroup = true;
        sawAnyUserAgent = true;
        if (value === "*") sawWildcardUserAgent = true;
        if (value === "") {
          issues.push({
            line: lineNum,
            severity: "error",
            message: "Valore User-agent vuoto: specifica un nome bot o * per tutti.",
          });
        }
        break;
      case "disallow":
        stats.disallow += 1;
        if (!inUserAgentGroup) {
          issues.push({
            line: lineNum,
            severity: "warning",
            message: "Disallow senza gruppo User-agent precedente nel blocco: inserisci prima almeno una riga User-agent.",
          });
        }
        break;
      case "allow":
        stats.allow += 1;
        if (!inUserAgentGroup) {
          issues.push({
            line: lineNum,
            severity: "warning",
            message: "Allow senza gruppo User-agent precedente nel blocco: inserisci prima almeno una riga User-agent.",
          });
        }
        break;
      case "sitemap":
        stats.sitemap += 1;
        if (!isReasonableSitemapUrl(value)) {
          issues.push({
            line: lineNum,
            severity: "warning",
            message: "URL Sitemap non assoluto o non valido: usa un indirizzo http/https completo.",
          });
        }
        break;
      case "crawl-delay":
        stats.crawlDelay += 1;
        if (!inUserAgentGroup) {
          issues.push({
            line: lineNum,
            severity: "warning",
            message: "Crawl-delay dovrebbe seguire un User-agent nel gruppo.",
          });
        }
        if (value && !isPositiveNumber(value)) {
          issues.push({
            line: lineNum,
            severity: "warning",
            message: "Crawl-delay atteso come numero positivo (secondi).",
          });
        }
        if (!mentionedCrawlDelayGoogle) {
          mentionedCrawlDelayGoogle = true;
          issues.push({
            line: lineNum,
            severity: "info",
            message: "Googlebot ignora Crawl-delay; utile per altri bot che lo supportano.",
          });
        }
        break;
      case "host":
        if (!inUserAgentGroup) {
          issues.push({
            line: lineNum,
            severity: "info",
            message: "Host è una direttiva tipica di Yandex; Google non la usa.",
          });
        }
        break;
      default:
        break;
    }
  }

  if (sawAnyUserAgent && !sawWildcardUserAgent) {
    issues.push({
      line: lines.length,
      severity: "info",
      message: "Non è presente un gruppo User-agent: * esplicito. Spesso utile come regole di default.",
    });
  }

  const hasErrors = issues.some((x) => x.severity === "error");
  const hasWarnings = issues.some((x) => x.severity === "warning");

  return { issues, stats, hasErrors, hasWarnings, byteLength };
}
