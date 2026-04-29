#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const sourcePath = path.resolve(rootDir, "src/comuni.json");
const outputPath = path.resolve(rootDir, "src/comuni-seo.json");

const INDEXABLE_POPULATION_THRESHOLD = 10000;
const PRERENDER_POPULATION_THRESHOLD = 20000;

const variants = {
  titlePrefix: [
    "Siti web a",
    "Realizzazione siti web a",
    "Web design e sviluppo a",
    "SEO locale e siti web a",
    "Sviluppo siti professionali a",
  ],
  opening: [
    "Supporto aziende e professionisti nel territorio di {{comune}} con siti veloci e orientati ai contatti.",
    "A {{comune}} progetto pagine web con UX pulita e struttura SEO pensata per query locali.",
    "Per attivita attive a {{comune}} sviluppo siti moderni con attenzione a performance e conversioni.",
    "Nel mercato di {{comune}} lavoro su architettura, contenuti e CTA per risultati misurabili.",
    "Questa pagina locale per {{comune}} combina design, sviluppo e SEO tecnica.",
  ],
  angle: [
    "Strategia orientata a Core Web Vitals, chiarezza dell'offerta e lead generation.",
    "Approccio pratico su struttura pagina, intento di ricerca e ottimizzazione tecnica.",
    "Focus su velocita, fiducia percepita e percorso utente fino al contatto.",
    "Implementazione Next.js con metadati locali, canonical e linking interno efficace.",
    "Metodo iterativo con monitoraggio risultati e miglioramento continuo.",
  ],
  cta: [
    "Vuoi un piano operativo per {{comune}}? Possiamo partire da una call rapida.",
    "Se lavori a {{comune}}, posso preparare una proposta web su misura.",
    "Per migliorare visibilita e contatti su {{comune}}, definiamo obiettivi e roadmap.",
    "Possiamo impostare una strategia digitale locale dedicata a {{comune}}.",
    "Se ti serve una presenza online solida a {{comune}}, partiamo dalle priorita reali.",
  ],
  intent: [
    "realizzazione siti web professionali",
    "restyling sito aziendale",
    "sviluppo landing page ad alta conversione",
    "ottimizzazione SEO locale tecnica",
    "consulenza performance e UX",
  ],
};

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function comuneSlug(comune) {
  return `${slugify(comune.nome)}-${slugify(comune.sigla ?? "")}`;
}

function withUniqueSlug(comuni) {
  const used = new Set();
  return comuni.map((comune) => {
    const base = comuneSlug(comune) || `comune-${slugify(comune.codice ?? "italia")}`;
    let slug = base;
    if (used.has(slug)) {
      slug = `${slug}-${slugify(comune.codice ?? "") || "dup"}`;
    }
    used.add(slug);
    return { comune, slug };
  });
}

function seedFromComune(comune) {
  const raw = String(comune.codice ?? comune.nome ?? "");
  let hash = 0;
  for (let i = 0; i < raw.length; i += 1) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick(list, seed, offset = 0) {
  return list[(seed + offset) % list.length];
}

function interpolate(text, values) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? "");
}

const raw = await readFile(sourcePath, "utf8");
const comuni = JSON.parse(raw);

if (!Array.isArray(comuni)) {
  throw new Error("src/comuni.json must contain an array.");
}

const seoBySlug = {};
const sluggedComuni = withUniqueSlug(comuni);

for (const { comune, slug } of sluggedComuni) {
  const seed = seedFromComune(comune);
  const provincia = String(comune?.provincia?.nome ?? "");
  const regione = String(comune?.regione?.nome ?? "Italia");
  const sigla = String(comune.sigla ?? "");
  const nome = String(comune.nome ?? "");
  const popolazione = Number.isFinite(comune.popolazione) ? comune.popolazione : 0;
  const intent = pick(variants.intent, seed, 4);

  const titlePrefix = pick(variants.titlePrefix, seed, 0);
  const opening = interpolate(pick(variants.opening, seed, 1), { comune: nome });
  const angle = pick(variants.angle, seed, 2);
  const cta = interpolate(pick(variants.cta, seed, 3), { comune: nome });
  const indexable = popolazione >= INDEXABLE_POPULATION_THRESHOLD;
  const preRender = popolazione >= PRERENDER_POPULATION_THRESHOLD;

  seoBySlug[slug] = {
    title: `${titlePrefix} ${nome} (${sigla})`,
    description: `${opening} ${angle} Focus: ${intent}.`,
    canonical: `/comuni/${slug}`,
    keywords: [
      `siti web ${nome}`,
      `web designer ${nome}`,
      `sviluppatore web ${nome}`,
      `seo locale ${nome}`,
      `creazione siti ${provincia}`,
      `siti web ${sigla}`,
      `realizzazione siti ${regione}`,
      `consulenza web ${nome}`,
      `${intent} ${nome}`,
    ],
    opening,
    angle,
    cta,
    serviceName: `Servizi web a ${nome}`,
    indexable,
    preRender,
  };
}

await writeFile(outputPath, `${JSON.stringify(seoBySlug, null, 2)}\n`, "utf8");

console.log(
  [
    `Comuni selezionati: ${sluggedComuni.length}`,
    `SEO entries generate: ${Object.keys(seoBySlug).length}`,
    `Indexable: ${Object.values(seoBySlug).filter((entry) => entry.indexable).length}`,
    `Pre-render: ${Object.values(seoBySlug).filter((entry) => entry.preRender).length}`,
    `Output: ${path.relative(rootDir, outputPath)}`,
  ].join("\n"),
);
