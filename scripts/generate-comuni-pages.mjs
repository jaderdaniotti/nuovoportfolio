#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const defaults = {
  source: "src/comuni.json",
  output: "app/comuni",
  offset: 0,
  limit: Number.POSITIVE_INFINITY,
  minPopulation: 0,
  noindexBelow: 12000,
  overwrite: false,
};

const variants = {
  hero: [
    "Siti web su misura",
    "Presenza digitale orientata ai risultati",
    "Sviluppo web professionale",
    "Strategia web + design + performance",
    "Landing e siti aziendali ad alta conversione",
    "Sito professionale veloce e affidabile",
    "Progetti web pensati per crescere",
    "Consulenza web concreta",
    "Soluzioni digitali per imprese locali",
    "Web design orientato al business",
    "Sito moderno con focus clienti",
    "Sviluppo web per attivita e professionisti",
  ],
  opening: [
    "Lavoro con aziende e professionisti nel territorio di {{comune}} per costruire un sito chiaro, veloce e utile alla conversione.",
    "Per chi opera a {{comune}}, progetto esperienze digitali che uniscono design, velocita e struttura SEO tecnica.",
    "Se il tuo business e attivo a {{comune}}, puoi usare il sito come asset commerciale e non come semplice vetrina.",
    "La pagina dedicata a {{comune}} sintetizza il mio approccio: architettura pulita, copy orientato all'intento di ricerca e UX semplice.",
    "A {{comune}} e nelle aree vicine posso supportarti con sviluppo, ottimizzazione tecnica e contenuti ad alto valore.",
    "Questa pagina locale per {{comune}} e pensata per chi vuole acquisire contatti qualificati dal traffico organico.",
    "Il lavoro su {{comune}} parte da obiettivi misurabili: visibilita, fiducia, richieste contatto e performance.",
    "Su {{comune}} applico un metodo pratico: analisi del servizio, struttura pagine, copy e monitoraggio continuo.",
    "Ogni progetto per {{comune}} viene modellato su pubblico, concorrenza locale e obiettivi di business reali.",
    "A {{comune}} sviluppo siti che rispondono meglio alle ricerche locali con una base tecnica solida.",
    "Per il mercato di {{comune}} realizzo pagine con messaggi chiari, velocita elevata e CTA efficaci.",
    "Nel contesto di {{comune}} il sito puo diventare un canale stabile di acquisizione clienti se progettato bene.",
  ],
  angle: [
    "Ottimizzazione Core Web Vitals, struttura dei contenuti e gerarchia semantica coerente.",
    "Setup orientato a UX mobile, velocita di caricamento e tracciamento conversioni.",
    "Implementazione tecnica con Next.js e attenzione a indicizzazione e crawl budget.",
    "Architettura modulare che permette evoluzioni rapide senza rifare tutto da zero.",
    "Copy e layout pensati per chiarire l'offerta e guidare l'utente verso il contatto.",
    "Pagina orientata a query locali con contenuti informativi, utili e leggibili.",
    "Focalizzazione su affidabilita tecnica, sicurezza e manutenzione semplificata.",
    "Combinazione di SEO on-page, performance engineering e design essenziale.",
    "Sezioni costruite per rispondere ai dubbi comuni prima della richiesta di preventivo.",
    "Struttura orientata al funnel: attenzione, interesse, prova sociale, azione.",
    "Personalizzazione dei contenuti in base al territorio e al tipo di servizio.",
    "Approccio data-driven con analisi e miglioramento iterativo nel tempo.",
  ],
  cta: [
    "Se vuoi, possiamo valutare insieme una versione dedicata al tuo settore in {{comune}}.",
    "Posso preparare una proposta concreta per il tuo progetto digitale a {{comune}}.",
    "Per una strategia web efficace su {{comune}}, partiamo da una call di allineamento.",
    "Se operi a {{comune}}, posso aiutarti a costruire un sito orientato a risultati reali.",
    "Ti serve un sito che performi davvero a {{comune}}? Possiamo impostarlo in modo misurabile.",
    "Da {{comune}} puoi attivare un percorso web completo: analisi, sviluppo, ottimizzazione.",
    "Per il tuo business a {{comune}}, definiamo priorita, roadmap e obiettivi SEO concreti.",
    "Vuoi migliorare visibilita e conversioni su {{comune}}? Possiamo impostare un piano operativo.",
  ],
};

const args = parseArgs(process.argv.slice(2));
const config = { ...defaults, ...args };

const sourcePath = path.resolve(rootDir, config.source);
const outputDir = path.resolve(rootDir, config.output);

const raw = await readFile(sourcePath, "utf8");
const allComuni = JSON.parse(raw);

if (!Array.isArray(allComuni)) {
  throw new Error("Il file comuni.json non contiene un array.");
}

const filtered = allComuni.filter((item) => {
  const population = toNumber(item.popolazione);
  return population >= config.minPopulation;
});

const sliced = filtered.slice(config.offset, config.offset + config.limit);
const usedSlugs = new Set();

await mkdir(outputDir, { recursive: true });

let created = 0;
for (const comune of sliced) {
  const population = toNumber(comune.popolazione);
  const slug = uniqueSlugFromComune(comune, usedSlugs);
  const pageDir = path.join(outputDir, slug);
  const pageFile = path.join(pageDir, "page.tsx");
  const shouldIndex = population >= config.noindexBelow;

  await mkdir(pageDir, { recursive: true });

  if (!config.overwrite) {
    try {
      await readFile(pageFile, "utf8");
      continue;
    } catch {
      // File does not exist, continue.
    }
  }

  const code = buildPageTsx(comune, slug, shouldIndex);
  await writeFile(pageFile, code, "utf8");
  created += 1;
}

console.log(
  [
    `Comuni totali letti: ${allComuni.length}`,
    `Comuni filtrati: ${filtered.length}`,
    `Comuni processati: ${sliced.length}`,
    `Pagine create/aggiornate: ${created}`,
    `Output: ${path.relative(rootDir, outputDir)}`,
  ].join("\n"),
);

function parseArgs(inputArgs) {
  const out = {};
  for (const arg of inputArgs) {
    if (!arg.startsWith("--")) continue;
    const [rawKey, rawValue] = arg.slice(2).split("=");
    const key = rawKey.trim();
    const value = (rawValue ?? "").trim();

    if (key === "overwrite") {
      out.overwrite = true;
      continue;
    }

    if (key === "source") out.source = value;
    if (key === "output") out.output = value;
    if (key === "offset") out.offset = toNumber(value);
    if (key === "limit") out.limit = toNumber(value);
    if (key === "min-population") out.minPopulation = toNumber(value);
    if (key === "noindex-below") out.noindexBelow = toNumber(value);
  }
  return out;
}

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function uniqueSlugFromComune(comune, usedSlugs) {
  const baseName = slugify(String(comune.nome ?? "comune"));
  const province = slugify(String(comune.sigla ?? comune?.provincia?.nome ?? ""));
  const code = slugify(String(comune.codice ?? ""));
  const base = [baseName, province].filter(Boolean).join("-");
  let candidate = base || `comune-${code || "italia"}`;

  if (!usedSlugs.has(candidate)) {
    usedSlugs.add(candidate);
    return candidate;
  }

  candidate = `${candidate}-${code || usedSlugs.size}`;
  usedSlugs.add(candidate);
  return candidate;
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hashSeed(comune) {
  const raw = String(comune.codice ?? comune.nome ?? "");
  let hash = 0;
  for (let i = 0; i < raw.length; i += 1) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickVariant(list, seed, offset = 0) {
  return list[(seed + offset) % list.length];
}

function interpolate(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? "");
}

function buildPageTsx(comune, slug, shouldIndex) {
  const seed = hashSeed(comune);
  const comuneName = String(comune.nome ?? "Comune");
  const provinciaName = String(comune?.provincia?.nome ?? "Provincia");
  const regioneName = String(comune?.regione?.nome ?? "Regione");
  const sigla = String(comune.sigla ?? "");
  const cap = Array.isArray(comune.cap) ? comune.cap.join(", ") : "";
  const popolazione = toNumber(comune.popolazione);
  const codice = String(comune.codice ?? "");
  const codiceCatastale = String(comune.codiceCatastale ?? "");

  const hero = pickVariant(variants.hero, seed, 0);
  const opening = interpolate(pickVariant(variants.opening, seed, 1), { comune: comuneName });
  const angle = pickVariant(variants.angle, seed, 2);
  const cta = interpolate(pickVariant(variants.cta, seed, 3), { comune: comuneName });

  const title = `${hero} a ${comuneName} (${sigla || provinciaName}) | ${"${siteConfig.title}"}`;
  const description = `${opening} ${angle}`;

  const comunePayload = {
    nome: comuneName,
    provincia: provinciaName,
    regione: regioneName,
    sigla,
    cap,
    popolazione,
    codice,
    codiceCatastale,
    slug,
  };

  const jsonLd = {
    context: "https://schema.org",
    type: "Service",
    serviceType: "Sviluppo siti web e SEO locale",
    areaName: `${comuneName}, ${provinciaName}, ${regioneName}`,
    serviceName: `Servizi web per ${comuneName}`,
    description,
  };

  return `import type { Metadata } from "next";
import { HomePageShell } from "@/components/home-page-shell";
import { projects } from "@/lib/home-content";
import { siteConfig } from "@/lib/site-config";

const comune = ${JSON.stringify(comunePayload, null, 2)} as const;

const localIntro = ${JSON.stringify(opening)};
const localAngle = ${JSON.stringify(angle)};
const localCta = ${JSON.stringify(cta)};
const jsonLd = {
  "@context": ${JSON.stringify(jsonLd.context)},
  "@type": ${JSON.stringify(jsonLd.type)},
  serviceType: ${JSON.stringify(jsonLd.serviceType)},
  areaServed: {
    "@type": "AdministrativeArea",
    name: ${JSON.stringify(jsonLd.areaName)},
  },
  name: ${JSON.stringify(jsonLd.serviceName)},
  description: ${JSON.stringify(jsonLd.description)},
  provider: {
    "@type": "Person",
    name: "Jader",
    url: siteConfig.url,
  },
};

export const metadata: Metadata = {
  title: \`${title}\`,
  description: ${JSON.stringify(description)},
  alternates: {
    canonical: \`\${siteConfig.url}/comuni/${slug}\`,
  },
  openGraph: {
    title: \`${title}\`,
    description: ${JSON.stringify(description)},
    url: \`\${siteConfig.url}/comuni/${slug}\`,
  },
  robots: ${shouldIndex ? "{ index: true, follow: true }" : "{ index: false, follow: true }"},
};

export default function ComunePage() {
  return (
    <>
      <HomePageShell projects={projects} />
      <section className="mx-auto w-full max-w-5xl px-6 pb-16 pt-12 md:px-10">
        <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
            ${escapeForJsx(hero)} a {comune.nome}
          </h1>
          <p className="mt-4 text-zinc-700">{localIntro}</p>
          <p className="mt-3 text-zinc-700">{localAngle}</p>
          <ul className="mt-6 grid gap-2 text-sm text-zinc-600 md:grid-cols-2">
            <li><strong>Comune:</strong> {comune.nome}</li>
            <li><strong>Provincia:</strong> {comune.provincia} ({comune.sigla})</li>
            <li><strong>Regione:</strong> {comune.regione}</li>
            <li><strong>CAP:</strong> {comune.cap || "n/d"}</li>
            <li><strong>Popolazione:</strong> {comune.popolazione.toLocaleString("it-IT")}</li>
            <li><strong>Codice ISTAT:</strong> {comune.codice}</li>
          </ul>
          <h2 className="mt-8 text-lg font-semibold text-zinc-900">FAQ locali</h2>
          <div className="mt-4 space-y-4 text-zinc-700">
            <div>
              <h3 className="font-medium text-zinc-900">Perche creare una pagina dedicata a {comune.nome}?</h3>
              <p>
                Una pagina locale chiara aumenta la pertinenza sulle ricerche geolocalizzate e aiuta Google a capire
                meglio il contesto territoriale dei servizi proposti.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-zinc-900">Questa pagina e diversa dalle altre citta?</h3>
              <p>
                Si. Ogni pagina viene costruita con varianti testuali dedicate, metadati specifici e dati locali del
                comune, evitando pagine duplicate one-size-fits-all.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-zinc-900">Posso richiedere un piano SEO locale su {comune.nome}?</h3>
              <p>{localCta}</p>
            </div>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
`;
}

function escapeForJsx(value) {
  return String(value).replace(/"/g, "&quot;");
}
