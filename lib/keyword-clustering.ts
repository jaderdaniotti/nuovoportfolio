export type ClusterIntent = "informativo" | "transazionale" | "misto" | "non-classificato";

export type KeywordCluster = {
  id: number;
  label: string;
  keywords: string[];
  suggestedIntent: ClusterIntent;
  avgPairwiseSimilarity: number;
};

export type KeywordClusteringResult = {
  clusters: KeywordCluster[];
  tokenlessKeywords: string[];
  totalUnique: number;
  thresholdUsed: number;
  disclaimer: string;
};

const STOP_IT = new Set(
  [
    "il",
    "lo",
    "la",
    "i",
    "gli",
    "le",
    "un",
    "uno",
    "una",
    "di",
    "a",
    "ad",
    "al",
    "allo",
    "alla",
    "ai",
    "agli",
    "alle",
    "da",
    "dal",
    "dallo",
    "dalla",
    "dai",
    "dagli",
    "dalle",
    "in",
    "nel",
    "nello",
    "nella",
    "nei",
    "negli",
    "nelle",
    "su",
    "sul",
    "sullo",
    "sulla",
    "sui",
    "sugli",
    "sulle",
    "per",
    "tra",
    "fra",
    "con",
    "del",
    "della",
    "dei",
    "degli",
    "delle",
    "dell",
    "che",
    "chi",
    "cui",
    "non",
    "piu",
    "come",
    "anche",
    "questo",
    "questa",
    "questi",
    "queste",
    "quello",
    "quella",
  ].map((s) => s.trim().toLowerCase()),
);

const STOP_EN = new Set(
  ["the", "a", "an", "and", "or", "of", "to", "in", "for", "on", "with", "at", "by", "from"].map((s) =>
    s.toLowerCase(),
  ),
);

const TRANS_IT = new Set(
  [
    "prezzo",
    "prezzi",
    "offerta",
    "sconto",
    "comprare",
    "compra",
    "acquisto",
    "acquistare",
    "negozio",
    "shop",
    "migliore",
    "migliori",
    "confronto",
    "confronta",
    "quote",
    "preventivo",
  ].map((s) => s.toLowerCase()),
);

const INFO_IT = new Set(
  [
    "come",
    "cosa",
    "significato",
    "definizione",
    "guida",
    "tutorial",
    "esempio",
    "perche",
    "quando",
    "dove",
    "vantaggi",
    "svantaggi",
  ].map((s) => s.toLowerCase()),
);

const TRANS_EN = new Set(["buy", "price", "cheap", "deal", "shop", "order", "discount"].map((s) => s.toLowerCase()));

const INFO_EN = new Set(["how", "what", "why", "guide", "tutorial", "meaning", "definition"].map((s) => s.toLowerCase()));

function foldAccents(s: string): string {
  return s.normalize("NFD").replace(/\p{M}/gu, "");
}

export function normalizeForDedupe(raw: string): string {
  return foldAccents(raw.trim().toLowerCase()).replace(/[^\p{L}\p{N}]+/gu, " ");
}

function normalizedLine(raw: string): string {
  return foldAccents(raw.trim().toLowerCase());
}

export function tokenizeKeyword(normalized: string): Set<string> {
  const tokens = normalized.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  const out = new Set<string>();
  for (const t of tokens) {
    const w = t.toLowerCase();
    if (w.length <= 1 && !/^\d+$/.test(w)) continue;
    if (STOP_IT.has(w) || STOP_EN.has(w)) continue;
    out.add(w);
  }
  return out;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const x of a) {
    if (b.has(x)) inter += 1;
  }
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

function phraseBonus(normA: string, normB: string): number {
  if (!normA || !normB) return 0;
  if (normA === normB) return 0.4;
  const [short, long] = normA.length <= normB.length ? [normA, normB] : [normB, normA];
  if (short.length >= 4 && long.includes(short)) return 0.35;
  let i = 0;
  const lim = Math.min(short.length, long.length);
  while (i < lim && short[i] === long[i]) i += 1;
  const need = Math.max(4, Math.floor(short.length * 0.55));
  return i >= need ? 0.22 : 0;
}

export function pairwiseSimilarity(
  tokensA: Set<string>,
  tokensB: Set<string>,
  normA: string,
  normB: string,
): number {
  const j = jaccard(tokensA, tokensB);
  const p = phraseBonus(normA, normB);
  return Math.min(1, j + p);
}

class UnionFind {
  readonly parent: number[];
  readonly rank: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x: number): number {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(a: number, b: number): void {
    let ra = this.find(a);
    let rb = this.find(b);
    if (ra === rb) return;
    if (this.rank[ra] < this.rank[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra;
    if (this.rank[ra] === this.rank[rb]) this.rank[ra] += 1;
  }
}

function labelFromKeywords(keywords: string[], tokenSets: Set<string>[]): string {
  const freq = new Map<string, number>();
  for (const set of tokenSets) {
    for (const w of set) {
      freq.set(w, (freq.get(w) ?? 0) + 1);
    }
  }
  const ranked = [...freq.entries()]
    .filter(([w]) => w.length > 2)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "it"));
  if (ranked.length > 0) {
    const top = ranked.slice(0, 3).map(([w]) => w);
    return top.join(" · ");
  }
  const sorted = [...keywords].sort((a, b) => a.length - b.length || a.localeCompare(b, "it"));
  return sorted[0] ?? "Topic";
}

function intentForKeyword(norm: string, tokens: Set<string>): { t: number; i: number } {
  let t = 0;
  let i = 0;
  for (const w of tokens) {
    if (TRANS_IT.has(w) || TRANS_EN.has(w)) t += 1;
    if (INFO_IT.has(w) || INFO_EN.has(w)) i += 1;
  }
  const hay = ` ${norm} `;
  if (
    /\b(prezzo|offerta|compr|acquist|sconto|shop|negozio)\b/u.test(hay) ||
    /\b(buy|price|discount|order)\b/u.test(hay)
  ) {
    t += 1;
  }
  if (/\b(come |cosa |guida|significato|definizione|how |what )\b/u.test(hay)) {
    i += 1;
  }
  return { t, i };
}

function clusterIntent(keywords: string[], norms: string[], tokenSets: Set<string>[]): ClusterIntent {
  let scoreT = 0;
  let scoreI = 0;
  for (let k = 0; k < keywords.length; k += 1) {
    const { t, i } = intentForKeyword(norms[k] ?? "", tokenSets[k] ?? new Set());
    if (t > i) scoreT += 1;
    else if (i > t) scoreI += 1;
  }
  if (scoreT > 0 && scoreI > 0) return "misto";
  if (scoreT > 0) return "transazionale";
  if (scoreI > 0) return "informativo";
  return "non-classificato";
}

function avgClusterSimilarity(indices: number[], tokenSets: Set<string>[], norms: string[]): number {
  if (indices.length <= 1) return 1;
  let sum = 0;
  let c = 0;
  for (let a = 0; a < indices.length; a += 1) {
    for (let b = a + 1; b < indices.length; b += 1) {
      const i = indices[a]!;
      const j = indices[b]!;
      sum += pairwiseSimilarity(tokenSets[i]!, tokenSets[j]!, norms[i]!, norms[j]!);
      c += 1;
    }
  }
  return c === 0 ? 0 : sum / c;
}

export function parseUniqueKeywordLines(text: string): { lines: string[]; duplicateDropped: string[] } {
  const seen = new Set<string>();
  const lines: string[] = [];
  const duplicateDropped: string[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const key = normalizeForDedupe(trimmed);
    if (!key) continue;
    if (seen.has(key)) {
      duplicateDropped.push(trimmed);
      continue;
    }
    seen.add(key);
    lines.push(trimmed);
  }
  return { lines, duplicateDropped };
}

export function clusterKeywords(
  uniqueKeywords: string[],
  options?: { similarityThreshold?: number },
): KeywordClusteringResult {
  const similarityThreshold = options?.similarityThreshold ?? 0.34;
  const n = uniqueKeywords.length;
  const norms = uniqueKeywords.map((k) => normalizedLine(k));
  const tokenSets = norms.map((norm) => tokenizeKeyword(norm));
  const tokenlessKeywords: string[] = [];
  for (let i = 0; i < n; i += 1) {
    if (tokenSets[i]!.size === 0 && norms[i]!.replace(/[^\p{L}\p{N}]+/gu, "").length === 0) {
      tokenlessKeywords.push(uniqueKeywords[i]!);
    }
  }

  const uf = new UnionFind(n);
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      const sim = pairwiseSimilarity(tokenSets[i]!, tokenSets[j]!, norms[i]!, norms[j]!);
      if (sim >= similarityThreshold) uf.union(i, j);
    }
  }

  const rootToIndices = new Map<number, number[]>();
  for (let i = 0; i < n; i += 1) {
    const r = uf.find(i);
    const list = rootToIndices.get(r);
    if (list) list.push(i);
    else rootToIndices.set(r, [i]);
  }

  const sortedGroups = [...rootToIndices.values()].sort((a, b) => b.length - a.length || a[0]! - b[0]!);

  let id = 1;
  const clusters: KeywordCluster[] = sortedGroups.map((indices) => {
    const kws = indices.map((idx) => uniqueKeywords[idx]!);
    const tsets = indices.map((idx) => tokenSets[idx]!);
    const ns = indices.map((idx) => norms[idx]!);
    const label = labelFromKeywords(kws, tsets);
    const suggestedIntent = clusterIntent(kws, ns, tsets);
    const avgPairwiseSimilarity = Math.round(avgClusterSimilarity(indices, tokenSets, norms) * 100) / 100;
    const cluster: KeywordCluster = {
      id: id++,
      label,
      keywords: kws.slice().sort((a, b) => b.length - a.length || a.localeCompare(b, "it")),
      suggestedIntent,
      avgPairwiseSimilarity,
    };
    return cluster;
  });

  return {
    clusters,
    tokenlessKeywords,
    totalUnique: n,
    thresholdUsed: similarityThreshold,
    disclaimer:
      "Clustering euristico in locale (token + similarità Jaccard): non usa SERP né modelli esterni. Affina i gruppi alzando/abbassando la soglia e usa l’etichetta come spunto per mappare URL o brief.",
  };
}

export function formatClusteringReport(result: KeywordClusteringResult, duplicateDropped: string[]): string {
  const lines: string[] = [
    `Keyword clustering — soglia ${result.thresholdUsed}`,
    `Keyword uniche: ${result.totalUnique}`,
    `Cluster: ${result.clusters.length}`,
    "",
  ];
  if (duplicateDropped.length) {
    lines.push(`Duplicate ignorati (${duplicateDropped.length}): ${duplicateDropped.slice(0, 15).join(" | ")}${duplicateDropped.length > 15 ? " …" : ""}`, "");
  }
  if (result.tokenlessKeywords.length) {
    lines.push(`Righe senza token utili: ${result.tokenlessKeywords.join(" | ")}`, "");
  }
  for (const c of result.clusters) {
    lines.push(`## Cluster ${c.id} — ${c.label} [${c.suggestedIntent}, coesione ~${c.avgPairwiseSimilarity}]`);
    for (const k of c.keywords) lines.push(`- ${k}`);
    lines.push("");
  }
  lines.push(result.disclaimer);
  return lines.join("\n");
}
