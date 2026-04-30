export type DifficultyBand = "molto-bassa" | "bassa" | "media" | "alta" | "molto-alta";

export type FactorImpact = "up" | "down" | "neutral";

export type KeywordDifficultyFactor = {
  id: string;
  label: string;
  impact: FactorImpact;
  points: number;
  detail: string;
};

export type KeywordDifficultyEstimate = {
  score: number;
  band: DifficultyBand;
  bandLabelIt: string;
  shortHintIt: string;
  factors: KeywordDifficultyFactor[];
  normalizedKeyword: string;
  wordCount: number;
  disclaimer: string;
};

const COMMERCIAL_TERMS_IT = new Set(
  [
    "miglior",
    "migliori",
    "migliore",
    "acquisto",
    "acquistare",
    "comprare",
    "compra",
    "prezzo",
    "prezzi",
    "sconto",
    "offerta",
    "offerte",
    "gratis",
    "gratuit",
    "mutuo",
    "prestito",
    "finanziamento",
    "assicurazione",
    "polizza",
    "hotel",
    "voli",
    "volo",
    "smartphone",
    "iphone",
    "subito",
    "confronto",
    "confronta",
    "online",
    "negozio",
    "coupon",
    "promo",
  ].map((s) => s.toLowerCase()),
);

const COMMERCIAL_TERMS_EN = new Set(
  [
    "buy",
    "cheap",
    "best",
    "deal",
    "price",
    "insurance",
    "loan",
    "mortgage",
    "credit",
    "casino",
    "flight",
    "booking",
    "review",
    "reviews",
  ].map((s) => s.toLowerCase()),
);

const INFORMATIONAL_TERMS = new Set(
  [
    "come",
    "cosa",
    "perché",
    "perche",
    "guida",
    "tutorial",
    "significato",
    "definizione",
    "esempio",
    "spiegazione",
    "cos",
    "what",
    "how",
    "why",
    "definition",
    "meaning",
  ].map((s) => s.toLowerCase()),
);

function tokenize(raw: string): string[] {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[’']/g, " ")
    .split(/[\s,.;:!?/\\|[\](){}<>+=_#"'«»„“”]+/u)
    .map((t) => t.replace(/^[^a-z0-9àèéìòù]+|[^a-z0-9àèéìòù]+$/gi, ""))
    .filter(Boolean);
}

function bandFromScore(score: number): { band: DifficultyBand; bandLabelIt: string; shortHintIt: string } {
  if (score <= 20) {
    return {
      band: "molto-bassa",
      bandLabelIt: "Competitività stimata molto bassa",
      shortHintIt: "Tipicamente più semplice da presidiare con contenuti mirati e long-tail.",
    };
  }
  if (score <= 40) {
    return {
      band: "bassa",
      bandLabelIt: "Competitività stimata bassa",
      shortHintIt: "Buon margine operativo se copri bene l’intento di ricerca.",
    };
  }
  if (score <= 60) {
    return {
      band: "media",
      bandLabelIt: "Competitività stimata media",
      shortHintIt: "Serve contenuto solido, autorevolezza e spesso tempo o collegamenti tematici.",
    };
  }
  if (score <= 80) {
    return {
      band: "alta",
      bandLabelIt: "Competitività stimata alta",
      shortHintIt: "Domini forti e volumi SERP importanti sono probabili; scala con sotto-topic.",
    };
  }
  return {
    band: "molto-alta",
    bandLabelIt: "Competitività stimata molto alta",
    shortHintIt: "Head term affollata: conviene lavorare varianti, angle informativi o nicchie.",
  };
}

/**
 * Stima euristica in locale (nessun fetch SERP). Utile come primo screening, non sostituisce tool professionali con backlink index.
 */
export function estimateKeywordDifficulty(rawInput: string): KeywordDifficultyEstimate | null {
  const normalized = rawInput.trim().replace(/\s+/g, " ");
  if (!normalized) return null;

  const tokens = tokenize(normalized);
  if (tokens.length === 0) return null;

  const factors: KeywordDifficultyFactor[] = [];
  let score = 48;
  const wordCount = tokens.length;

  if (wordCount === 1) {
    score += 22;
    factors.push({
      id: "head-term",
      label: "Keyword molto corta (head term)",
      impact: "up",
      points: 22,
      detail: "Un solo termine tende ad avere maggior volume e più concorrenti generici.",
    });
  } else if (wordCount === 2) {
    score += 10;
    factors.push({
      id: "two-words",
      label: "Due parole",
      impact: "up",
      points: 10,
      detail: "Ancora vicino a query competitive; meno rispetto al singolo termine.",
    });
  } else if (wordCount === 3) {
    score -= 4;
    factors.push({
      id: "three-words",
      label: "Tre parole (mid-tail)",
      impact: "down",
      points: -4,
      detail: "Sfilacciamento moderato: spesso intento più chiaro e SERP meno omonime.",
    });
  } else {
    score -= 14;
    factors.push({
      id: "long-tail",
      label: "Long-tail (4+ parole)",
      impact: "down",
      points: -14,
      detail: "Query più specifiche di solito riducono pressione competitiva diretta.",
    });
  }

  const charLen = normalized.length;
  if (charLen <= 7) {
    score += 8;
    factors.push({
      id: "short-phrase",
      label: "Frase molto breve",
      impact: "up",
      points: 8,
      detail: "Le query corte attraggono più significati e player grandi.",
    });
  } else if (charLen >= 42) {
    score -= 8;
    factors.push({
      id: "long-phrase",
      label: "Frase lunga",
      impact: "down",
      points: -8,
      detail: "Maggiore specificità testuale sposta verso nicchie meno disputate.",
    });
  }

  let commercialHits = 0;
  for (const t of tokens) {
    if (COMMERCIAL_TERMS_IT.has(t) || COMMERCIAL_TERMS_EN.has(t)) {
      commercialHits += 1;
    }
  }
  commercialHits = Math.min(commercialHits, 3);
  if (commercialHits > 0) {
    const pts = commercialHits * 7;
    score += pts;
    factors.push({
      id: "commercial",
      label: "Segnali di intento transazionale",
      impact: "up",
      points: pts,
      detail: "Termini tipo prezzo, acquisto o servizi monetizzabili alzano di norma la competizione.",
    });
  }

  let infoHits = 0;
  for (const t of tokens) {
    if (INFORMATIONAL_TERMS.has(t)) {
      infoHits += 1;
    }
  }
  infoHits = Math.min(infoHits, 2);
  if (infoHits > 0) {
    const pts = infoHits * -6;
    score += pts;
    factors.push({
      id: "informational",
      label: "Segnali informativi",
      impact: "down",
      points: pts,
      detail: "Pattern tipo “come”, “guida” o definizioni abbinano spesso SERP meno “soldi subito”.",
    });
  }

  if (/[?]$/.test(normalized.trim())) {
    score -= 4;
    factors.push({
      id: "question",
      label: "Domanda esplicita",
      impact: "down",
      points: -4,
      detail: "Le query interrogative spesso privilegiano risposte e snippet rispetto ai soli landing commerciali.",
    });
  }

  if (/\d/.test(normalized)) {
    score -= 3;
    factors.push({
      id: "numbers",
      label: "Presenza di numeri",
      impact: "down",
      points: -3,
      detail: "Versioni con anno, prezzo o quantità restringono spesso il match rispetto alla head generica.",
    });
  }

  score = Math.round(Math.min(100, Math.max(0, score)));
  const { band, bandLabelIt, shortHintIt } = bandFromScore(score);

  const disclaimer =
    "Punteggio euristico calcolato in locale: il dato non deriva da SERP reali, backlink dei risultati o volumi di ricerca. Usalo per confrontare keyword tra loro e stimare il “profilo” della query; integra con Search Console, strumenti professionali e analisi dei competitor.";

  return {
    score,
    band,
    bandLabelIt,
    shortHintIt,
    factors,
    normalizedKeyword: normalized,
    wordCount,
    disclaimer,
  };
}
