import type { BriefSearchIntent } from "@/lib/content-brief-generator";
import { BRIEF_INTENT_LABEL, briefIntentOptions } from "@/lib/content-brief-generator";

export type { BriefSearchIntent };
export { BRIEF_INTENT_LABEL, briefIntentOptions };

export type FaqSeoInput = {
  primaryTopic: string;
  intent: BriefSearchIntent;
  audienceHint: string;
  brandOrProject: string;
  secondaryLines: string[];
  pairCount: number;
};

export type FaqPair = {
  question: string;
  answer: string;
};

export type FaqSeoResult = {
  primaryTopic: string;
  intent: BriefSearchIntent;
  pairs: FaqPair[];
  intentNote: string;
  disclaimer: string;
};

function hashSeed(parts: string[]): number {
  const s = parts.join("|").toLowerCase();
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = Math.imul(31, h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number, offset: number): T {
  return arr[(seed + offset) % arr.length];
}

function clampPairCount(n: number): number {
  if (!Number.isFinite(n)) return 8;
  return Math.min(15, Math.max(3, Math.round(n)));
}

export function validateFaqSeoInput(topic: string): string | null {
  const t = topic.trim();
  if (!t) return "Inserisci il tema o la keyword principale per generare le FAQ.";
  if (t.length < 2) return "Il tema deve avere almeno 2 caratteri.";
  return null;
}

const INTENT_NOTES: Record<BriefSearchIntent, string> = {
  informational:
    "Intento informativo: privilegia definizioni chiare, passaggi ordinati e fonti/approfondimenti senza pressione commerciale diretta.",
  commercial:
    "Intento commerciale: le risposte possono confrontare criteri di scelta, trade-off e segnali di qualità — evita promesse ingiustificate.",
  transactional:
    "Intento transazionale: chiarisci prossimi passi, tempi, requisiti e riduzione del rischio (garanzie dove realistiche, policy).",
  navigational:
    "Intento navigazionale: agevola chi cerca marchio, sede o canali ufficiali; mantieni tono di servizio e link interni coerenti nel sito.",
};

const Q_INFORMATIONAL: ((topic: string, sec?: string) => string)[] = [
  (topic) => `Cos'è ${topic} e in quali contesti si usa più spesso?`,
  (topic) => `Quali sono i concetti chiave da capire prima di approfondire ${topic}?`,
  (topic) => `Quali sono gli errori più frequenti quando si parla di ${topic}?`,
  (topic) => `Come valutare in modo pratico se ${topic} è adatto al mio caso?`,
  (topic) => `Quali sono i vantaggi e i limiti tipici legati a ${topic}?`,
  (topic) => `Cosa dovrebbe sapere un principiante su ${topic} per orientarsi subito?`,
  (topic) => `Da dove iniziare se devo documentarmi in modo affidabile su ${topic}?`,
  (topic) => `Come si distingue una buona spiegazione su ${topic} da contenuti generici?`,
  (topic) => `Quali domande dovrei farmi prima di prendere decisioni su ${topic}?`,
  (topic) => `Perché ${topic} compare spesso nelle ricerche correlate e cosa implica?`,
];

const Q_COMMERCIAL: ((topic: string, sec?: string) => string)[] = [
  (topic) => `Come scegliere tra le diverse soluzioni disponibili per ${topic}?`,
  (topic) => `Quali criteri oggettivi ha senso confrontare quando si valuta ${topic}?`,
  (topic) => `${topic}: quali segnali indicano qualità e trasparenza dell'offerta?`,
  (topic) => `Quando ${topic} potrebbe non essere la scelta migliore e perché?`,
  (topic) => `Quali domande fare al fornitore o al team interno prima di decidere su ${topic}?`,
  (topic) => `Cosa differenzia un'offerta affidabile su ${topic} da alternative rischiose?`,
  (topic) => `${topic} e budget: su cosa conviene investire di più e dove si può risparmiare?`,
  (topic) => `Come interpretare recensioni e casi studio relativi a ${topic}?`,
];

const Q_TRANSACTIONAL: ((topic: string, sec?: string) => string)[] = [
  (topic) => `Quali sono i passaggi pratici per richiedere o attivare ${topic}?`,
  (topic) => `Di quali documenti o informazioni ho bisogno per procedere con ${topic}?`,
  (topic) => `Quanto tempo può richiedere in media il completamento di ${topic}?`,
  (topic) => `Quali costi o voci di spesa sono tipicamente associate a ${topic}?`,
  (topic) => `Come posso verificare che ${topic} sia conforme alle mie aspettative prima del pagamento?`,
  (topic) => `Cosa succede dopo aver confermato ${topic} (onboarding, assistenza, revisioni)?`,
  (topic) => `Esistono garanzie, recesso o politiche di supporto rilevanti per ${topic}?`,
  (topic) => `Come risolvere problemi o richiedere modifiche legate a ${topic}?`,
];

const Q_NAVIGATIONAL: ((topic: string, sec?: string) => string)[] = [
  (topic) => `Dove trovare informazioni ufficiali o aggiornate su ${topic}?`,
  (topic) => `Chi posso contattare per chiarimenti rapidi su ${topic}?`,
  (topic) => `Come raggiungere la sezione o la pagina del sito dedicata a ${topic}?`,
  (topic) => `${topic}: quali canali (email, chat, telefono) sono più adatti in base all'urgenza?`,
  (topic) => `Come verifico di stare interagendo con la fonte corretta riguardo a ${topic}?`,
];

function questionPool(intent: BriefSearchIntent): ((topic: string, sec?: string) => string)[] {
  switch (intent) {
    case "commercial":
      return Q_COMMERCIAL;
    case "transactional":
      return Q_TRANSACTIONAL;
    case "navigational":
      return Q_NAVIGATIONAL;
    default:
      return Q_INFORMATIONAL;
  }
}

function answerSkeleton(
  intent: BriefSearchIntent,
  topic: string,
  audience: string,
  brand: string,
  seed: number,
  questionIndex: number,
): string {
  const aud = audience.trim();
  const br = brand.trim();
  const audPhrase = aud ? `Per ${aud.charAt(0).toLowerCase() === aud.charAt(0) ? aud : aud.toLowerCase()}, ` : "";
  const brandPhrase = br
    ? ` Se fai capo a «${br}», mantieni tono coerente con le linee guida del marchio.`
    : "";

  const intros: Record<BriefSearchIntent, string[]> = {
    informational: [
      `${audPhrase}${topic} si presenta come un tema che meriterebbe una definizione operativa: parte dai bisogni dell'utente, poi collega benefici concreti ed eventuali vincoli.`,
      `${audPhrase}una lettura utile su ${topic} separa ciò che è verificabile da ciò che è opinabile: struttura la risposta con passaggi numerati o elenco puntato quando possibile.`,
      `${audPhrase}per chiarire ${topic}, conviene partire da un caso d’uso tipico e solo dopo generalizzare: riduce ambiguità e migliora la leggibilità in SERP.`,
    ],
    commercial: [
      `${audPhrase}nella fase di confronto su ${topic}, metti in evidenza criteri misurabili (tempi, requisiti, supporto, costi totali di utilizzo) e non solo slogan.`,
      `${audPhrase}per decidere tra alternative su ${topic}, chiediti quale vincolo è più critico oggi (budget, tempo, complessità operativa) e usa quello come filtro principale.`,
      `${audPhrase}un confronto equo su ${topic} riconosce trade-off: evidenzia dove un’opzione vince e dove richiede compromessi.`,
    ],
    transactional: [
      `${audPhrase}per procedere con ${topic}, inizia elencando i prerequisiti (chi fa cosa, entro quando) così eviti frizione nel funnel.`,
      `${audPhrase}la risposta dovrebbe guidare all’azione senza promesse assolute: indica passaggi, tempi stimati e dove trovare supporto.`,
      `${audPhrase}chi è vicino alla conversione su ${topic} vuole chiarezza su costi, tempi e policy: posiziona queste informazioni in modo visibile nella risposta.`,
    ],
    navigational: [
      `${audPhrase}l’utente cerca un punto di riferimento chiaro su ${topic}: indirizza verso la destinazione corretta del sito o canali ufficiali.`,
      `${audPhrase}riduci il rumore: indica come trovare o contattare il punto giusto relativo a ${topic}, includendo eventuali orari o requisiti.`,
      `${audPhrase}per intent navigazionale su ${topic}, sii diretto su dove cliccare o chi scrivere, evitando contenuto duplicato inutile.`,
    ],
  };

  const closings = [
    " Integra dati aggiornati dal tuo sito e link interni verso pagine correlate.",
    " Rivedi la risposta dopo pubblicazione: snippet e People Also Ask premiano chiarezza e completezza misurata.",
    " Evita duplicati: se la stessa domanda esiste in altre pagine, usa canonical o consolida il contenuto.",
  ];

  const intro = pick(intros[intent], seed, questionIndex);
  const close = pick(closings, seed, questionIndex + 3);
  return `${intro}${brandPhrase}${close}`;
}

function secondaryToPair(
  topic: string,
  line: string,
  seed: number,
  idx: number,
  intent: BriefSearchIntent,
  audienceHint: string,
  brandOrProject: string,
): FaqPair {
  const t = line.trim();
  const isQ = t.includes("?");
  const question = isQ ? t : `In che modo «${t}» si collega a ${topic}?`;
  const answer = answerSkeleton(intent, topic, audienceHint, brandOrProject, seed + idx * 17, idx);
  return { question, answer };
}

export function buildFaqSeo(input: FaqSeoInput): FaqSeoResult {
  const topic = input.primaryTopic.trim();
  const count = clampPairCount(input.pairCount);
  const seed = hashSeed([topic, input.intent, input.audienceHint, input.brandOrProject, ...input.secondaryLines]);

  const pool = questionPool(input.intent);
  const pairs: FaqPair[] = [];

  let qi = 0;
  for (let i = 0; i < input.secondaryLines.length && pairs.length < count; i += 1) {
    pairs.push(
      secondaryToPair(topic, input.secondaryLines[i], seed, qi, input.intent, input.audienceHint, input.brandOrProject),
    );
    qi += 1;
  }

  let offset = 0;
  while (pairs.length < count) {
    const factory = pick(pool, seed, offset);
    const q = factory(topic);
    const dup = pairs.some((p) => p.question.toLowerCase() === q.toLowerCase());
    if (!dup) {
      pairs.push({
        question: q,
        answer: answerSkeleton(input.intent, topic, input.audienceHint, input.brandOrProject, seed, qi),
      });
      qi += 1;
    }
    offset += 1;
    if (offset > pool.length * 4) break;
  }

  return {
    primaryTopic: topic,
    intent: input.intent,
    pairs,
    intentNote: INTENT_NOTES[input.intent],
    disclaimer:
      "Output generato in locale come bozza strutturale: revisiona tono, fatti e conformità legale prima della pubblicazione. Google può mostrare FAQ rich; non garantisce snippet.",
  };
}

export function formatFaqMarkdownReport(result: FaqSeoResult): string {
  const lines: string[] = [
    `# FAQ SEO — ${result.primaryTopic}`,
    "",
    `Intento SERP (stima): ${BRIEF_INTENT_LABEL[result.intent]}`,
    "",
    result.intentNote,
    "",
    "---",
    "",
  ];
  for (const p of result.pairs) {
    lines.push(`## ${p.question}`, "", p.answer, "", "---", "");
  }
  lines.push(result.disclaimer);
  return lines.join("\n");
}

export function buildFaqPageJsonLd(pairs: FaqPair[], pageUrl: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map((p) => ({
      "@type": "Question",
      name: p.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: p.answer,
      },
    })),
    url: pageUrl || undefined,
  };
}

export function formatFaqJsonLdString(pairs: FaqPair[], pageUrl: string, pretty = true): string {
  const obj = buildFaqPageJsonLd(pairs, pageUrl);
  return pretty ? JSON.stringify(obj, null, 2) : JSON.stringify(obj);
}

export function formatFaqPlainBlock(result: FaqSeoResult): string {
  return result.pairs.map((p) => `D: ${p.question}\nR: ${p.answer}\n`).join("\n");
}
