export type CronParseResult =
  | { ok: true; fields: [string, string, string, string, string] }
  | { ok: false; error: string };

export type CronPreset = {
  id: string;
  label: string;
  description: string;
  expression: string;
};

const FIELD_NAMES_IT = ["Minuti", "Ore", "Giorno del mese", "Mese", "Giorno settimana"] as const;

export const CRON_PRESETS: CronPreset[] = [
  {
    id: "every-minute",
    label: "Ogni minuto",
    description: "Esecuzione continua (attenzione al carico).",
    expression: "* * * * *",
  },
  {
    id: "every-5",
    label: "Ogni 5 minuti",
    description: "Poll leggeri o refresh cache.",
    expression: "*/5 * * * *",
  },
  {
    id: "every-15",
    label: "Ogni 15 minuti",
    description: "Quarti d’ora, spesso usato in monitoring.",
    expression: "*/15 * * * *",
  },
  {
    id: "hourly",
    label: "Ogni ora (minuto 0)",
    description: "Una volta all’ora in punto.",
    expression: "0 * * * *",
  },
  {
    id: "daily-midnight",
    label: "Ogni giorno a mezzanotte",
    description: "Backup o report giornaliero.",
    expression: "0 0 * * *",
  },
  {
    id: "daily-9",
    label: "Ogni giorno alle 9:00",
    description: "Job diurno fisso.",
    expression: "0 9 * * *",
  },
  {
    id: "weekdays-9",
    label: "Lun–Ven alle 9:00",
    description: "Orario lavorativo tipico.",
    expression: "0 9 * * 1-5",
  },
  {
    id: "weekly-mon",
    label: "Ogni lunedì a mezzanotte",
    description: "Settimanale all’inizio settimana.",
    expression: "0 0 * * 1",
  },
  {
    id: "monthly-first",
    label: "Il primo del mese a mezzanotte",
    description: "Report o fatture mensili.",
    expression: "0 0 1 * *",
  },
];

function normalizeSpaces(s: string): string {
  return s.trim().replace(/\s+/g, " ");
}

const SINGLE_NUM_MAX = [59, 23, 31, 12, 6] as const;
const STEP_MAX = [60, 24, 31, 12, 7] as const;

function tokenAllowedChars(token: string): boolean {
  return /^[\d*/,\-]+$/.test(token) && token.length > 0;
}

function validateTokenBounds(token: string, idx: number): boolean {
  if (token === "*") return true;
  if (token.startsWith("*/")) {
    const step = Number(token.slice(2));
    return Number.isInteger(step) && step >= 1 && step <= STEP_MAX[idx];
  }

  const parts = token.split(",");
  for (const part of parts) {
    const rangeStep = part.split("/");
    const range = rangeStep[0];
    const step =
      rangeStep.length === 2 ? Number(rangeStep[1]) : null;
    if (rangeStep.length === 2 && (!Number.isInteger(step!) || step! < 1 || step! > STEP_MAX[idx])) {
      return false;
    }
    if (range === undefined || range === "") return false;
    if (range.includes("-")) {
      const [a, b] = range.split("-").map(Number);
      if (!Number.isInteger(a) || !Number.isInteger(b)) return false;
      if (a < 0 || b < 0) return false;
      if (idx === 2 && (a < 1 || b > 31 || a > b)) return false;
      if (idx === 3 && (a < 1 || b > 12 || a > b)) return false;
      if (idx === 4 && (a < 0 || b > 6 || a > b)) return false;
      if ((idx === 0 || idx === 1) && (a > SINGLE_NUM_MAX[idx] || b > SINGLE_NUM_MAX[idx] || a > b))
        return false;
      continue;
    }
    const n = Number(range);
    if (!Number.isInteger(n)) return false;
    if (idx === 0 && (n < 0 || n > 59)) return false;
    if (idx === 1 && (n < 0 || n > 23)) return false;
    if (idx === 2 && (n < 1 || n > 31)) return false;
    if (idx === 3 && (n < 1 || n > 12)) return false;
    if (idx === 4 && (n < 0 || n > 6)) return false;
  }
  return true;
}

function isValidField(field: string, idx: number): boolean {
  if (!tokenAllowedChars(field)) return false;
  const tokens = field.split(",");
  for (const t of tokens) {
    if (!validateTokenBounds(t, idx)) return false;
  }
  return true;
}

export function parseCronExpression(input: string): CronParseResult {
  const s = normalizeSpaces(input);
  if (!s) return { ok: false, error: "Espressione vuota." };
  const parts = s.split(" ");
  if (parts.length !== 5) {
    return {
      ok: false,
      error: "Servono esattamente 5 campi separati da spazio: minuto, ora, giorno del mese, mese, giorno della settimana.",
    };
  }
  for (let i = 0; i < 5; i++) {
    const p = parts[i] ?? "";
    if (!isValidField(p, i)) {
      return { ok: false, error: `Campo non valido (${FIELD_NAMES_IT[i]}): "${p}".` };
    }
  }
  return {
    ok: true,
    fields: [parts[0]!, parts[1]!, parts[2]!, parts[3]!, parts[4]!],
  };
}

export function formatCronExpression(fields: [string, string, string, string, string]): string {
  return fields.join(" ");
}

function describeToken(token: string, idx: number): string {
  if (token === "*") {
    if (idx === 0) return "ogni minuto";
    if (idx === 1) return "ogni ora";
    if (idx === 2) return "ogni giorno del mese";
    if (idx === 3) return "ogni mese";
    return "ogni giorno della settimana";
  }
  if (token.startsWith("*/")) {
    const n = token.slice(2);
    if (idx === 0) return `ogni ${n} minuti`;
    if (idx === 1) return `ogni ${n} ore`;
    if (idx === 2) return `ogni ${n} giorni del mese`;
    if (idx === 3) return `ogni ${n} mesi`;
    return `ogni ${n} giorni della settimana`;
  }
  if (token.includes("-") || token.includes(",") || token.includes("/")) {
    return token;
  }
  const n = Number(token);
  if (idx === 0) return `al minuto ${n}`;
  if (idx === 1) return `alle ore ${n}`;
  if (idx === 2) return `il giorno ${n} del mese`;
  if (idx === 3) return `nel mese ${n}`;
  const dow = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
  return dow[n] ?? token;
}

export function describeCronItalian(fields: [string, string, string, string, string]): string {
  return fields.map((f, i) => `${FIELD_NAMES_IT[i]}: ${describeToken(f, i)}`).join(" · ");
}

export function cronFieldsToBulletsIt(fields: [string, string, string, string, string]): string[] {
  return fields.map((f, i) => `${FIELD_NAMES_IT[i]}: ${describeToken(f, i)}`);
}
