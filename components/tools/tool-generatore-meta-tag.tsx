"use client";

import { useCallback, useMemo, useState } from "react";

type PageKind = "article" | "product" | "service" | "landing" | "corporate";

const PAGE_KIND_OPTIONS: { value: PageKind; label: string }[] = [
  { value: "article", label: "Articolo / blog" },
  { value: "product", label: "Prodotto / catalogo" },
  { value: "service", label: "Servizio professionale" },
  { value: "landing", label: "Landing commerciale" },
  { value: "corporate", label: "Pagina istituzionale" },
];

function sentenceCaseKeyword(raw: string) {
  const t = raw.trim().replace(/\s+/g, " ");
  if (!t) return "";
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function truncateAtWord(input: string, max: number) {
  if (input.length <= max) return input;
  const ellipsis = "…";
  const budget = max - ellipsis.length;
  if (budget <= 0) return ellipsis;
  const cut = input.slice(0, budget);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > budget * 0.55 ? cut.slice(0, lastSpace) : cut;
  return `${base.trimEnd()}${ellipsis}`;
}

function escapeHtmlText(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeHtmlAttr(s: string) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function titleBand(length: number) {
  if (length === 0) return { label: "Vuoto", tone: "text-red-800 bg-red-50 border-red-200" };
  if (length < 35) return { label: "Molto corto", tone: "text-amber-900 bg-amber-50 border-amber-200" };
  if (length > 65) return { label: "Rischio troncamento", tone: "text-amber-900 bg-amber-50 border-amber-200" };
  return { label: "Range SERP tipico", tone: "text-emerald-900 bg-emerald-50 border-emerald-200" };
}

function descriptionBand(length: number) {
  if (length === 0) return { label: "Vuota", tone: "text-red-800 bg-red-50 border-red-200" };
  if (length < 110) return { label: "Sotto il consigliato", tone: "text-amber-900 bg-amber-50 border-amber-200" };
  if (length > 170) return { label: "Rischio troncamento", tone: "text-amber-900 bg-amber-50 border-amber-200" };
  return { label: "Range SERP tipico", tone: "text-emerald-900 bg-emerald-50 border-emerald-200" };
}

function buildTitle(keyword: string, brand: string, kind: PageKind) {
  const k = sentenceCaseKeyword(keyword);
  if (!k) return "";

  const brandTrim = brand.trim();
  const tails: Record<PageKind, string> = {
    article: "Guida pratica e aggiornata",
    product: "Caratteristiche, vantaggi e scelta",
    service: "Cosa includiamo e come lavoriamo",
    landing: "Vantaggi, dettagli e contatti",
    corporate: "Informazioni chiare e aggiornate",
  };

  const withBrand = brandTrim ? `${k} | ${brandTrim}` : "";
  if (brandTrim && withBrand.length <= 60) {
    return withBrand;
  }

  if (brandTrim) {
    const compact = truncateAtWord(`${k} | ${brandTrim}`, 60);
    if (compact.length <= 60) return compact;
  }

  const withTail = `${k}: ${tails[kind]}`;
  return truncateAtWord(withTail, 60);
}

function buildDescription(keyword: string, angle: string, secondaries: string, kind: PageKind) {
  const k = sentenceCaseKeyword(keyword);
  if (!k) return "";

  const angleTrim = angle.trim();
  const sec = secondaries
    .split(/[,;]/g)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);

  const templates: Record<PageKind, string> = {
    article: `${k}: panoramica chiara, passaggi utili e domande frequenti per orientarti subito. Ideale per chi cerca una guida pratica senza fronzoli.`,
    product: `${k}: punti di forza, specifiche in sintesi e come usarlo al meglio. Perfetto per confrontare rapidamente e capire se fa al caso tuo.`,
    service: `${k}: modalità di collaborazione, tempistiche indicative e risultati attesi. Contattaci per un confronto su esigenze e priorità.`,
    landing: `${k}: beneficio principale, prove social di sintesi e invito chiaro al passo successivo. Formula pensata per conversione e chiarezza.`,
    corporate: `${k}: messaggio istituzionale lineare, valori e riferimenti utili. Una base solida per rassicurare e orientare il visitatore.`,
  };

  let body = angleTrim || templates[kind];
  if (sec.length) {
    const tag = sec.join(", ");
    if (!body.toLowerCase().includes(sec[0]!.toLowerCase())) {
      body = `${body} Focus anche su: ${tag}.`;
    }
  }

  const out = truncateAtWord(body.replace(/\s+/g, " ").trim(), 158);
  return out;
}

function buildHtmlSnippet(title: string, description: string) {
  const safeTitle = escapeHtmlText(title);
  const safeDesc = escapeHtmlAttr(description);
  const safeTitleAttr = escapeHtmlAttr(title);
  return `<title>${safeTitle}</title>
<meta name="description" content="${safeDesc}" />
<meta property="og:title" content="${safeTitleAttr}" />
<meta property="og:description" content="${safeDesc}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${safeTitleAttr}" />
<meta name="twitter:description" content="${safeDesc}" />`;
}

export function ToolGeneratoreMetaTag() {
  const [keyword, setKeyword] = useState("");
  const [brand, setBrand] = useState("");
  const [pageKind, setPageKind] = useState<PageKind>("article");
  const [angle, setAngle] = useState("");
  const [secondaries, setSecondaries] = useState("");
  const [copyHint, setCopyHint] = useState<string | null>(null);

  const generatedTitle = useMemo(
    () => buildTitle(keyword, brand, pageKind),
    [keyword, brand, pageKind],
  );
  const generatedDescription = useMemo(
    () => buildDescription(keyword, angle, secondaries, pageKind),
    [keyword, angle, secondaries, pageKind],
  );

  const htmlBlock = useMemo(
    () => buildHtmlSnippet(generatedTitle, generatedDescription),
    [generatedTitle, generatedDescription],
  );

  const titleLen = generatedTitle.length;
  const descLen = generatedDescription.length;
  const titleStatus = titleBand(titleLen);
  const descStatus = descriptionBand(descLen);

  const flash = useCallback((msg: string) => {
    setCopyHint(msg);
    window.setTimeout(() => setCopyHint(null), 2200);
  }, []);

  const copy = useCallback(
    async (text: string, ok: string) => {
      try {
        await navigator.clipboard.writeText(text);
        flash(ok);
      } catch {
        flash("Copia non disponibile: seleziona il testo manualmente.");
      }
    },
    [flash],
  );

  return (
    <section className="mt-8 rounded-xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Generatore meta tag SEO</h2>
          <p className="mt-2 text-sm text-zinc-700">
            Parti da keyword e tipo di pagina: ottieni una proposta di title e meta description nelle lunghezze tipiche
            SERP, più uno snippet HTML pronto da incollare (&lt;title&gt;, description, Open Graph e Twitter card base).
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-zinc-700">
            Keyword principale
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Es. consulenza SEO locale Udine"
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
              autoComplete="off"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Brand o nome sito (opzionale)
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Es. Studio Rossi"
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
              autoComplete="off"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Tipo di pagina
            <select
              value={pageKind}
              onChange={(e) => setPageKind(e.target.value as PageKind)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
            >
              {PAGE_KIND_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Angolo / promessa (opzionale, sostituisce il testo suggerito)
            <textarea
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              rows={3}
              placeholder="Es. Velocizziamo la messa in sicurezza Google Business Profile con checklist operativa."
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Keyword secondarie (opzionali, separate da virgola)
            <input
              type="text"
              value={secondaries}
              onChange={(e) => setSecondaries(e.target.value)}
              placeholder="Es. mappa sito, crawl budget, hreflang"
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
              autoComplete="off"
            />
          </label>
        </div>

        <div className="space-y-4">
          <div className={`rounded-lg border p-4 ${titleStatus.tone}`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide">Title proposto</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">{titleLen} caratteri</p>
                <p className="mt-1 text-sm">{titleStatus.label} (tipico 35–65)</p>
              </div>
              <button
                type="button"
                disabled={!generatedTitle}
                onClick={() => copy(generatedTitle, "Title copiato negli appunti.")}
                className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 transition hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copia title
              </button>
            </div>
            <p className="mt-3 text-sm font-medium text-zinc-900">
              {generatedTitle || "Inserisci una keyword per generare il title."}
            </p>
          </div>

          <div className={`rounded-lg border p-4 ${descStatus.tone}`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide">Meta description</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">{descLen} caratteri</p>
                <p className="mt-1 text-sm">{descStatus.label} (tipico 110–170)</p>
              </div>
              <button
                type="button"
                disabled={!generatedDescription}
                onClick={() => copy(generatedDescription, "Description copiata negli appunti.")}
                className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 transition hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copia description
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-900">
              {generatedDescription ||
                "La description viene generata quando la keyword principale non è vuota. Puoi rifinirla sul tono del brand."}
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-zinc-900 p-4 text-zinc-100">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-300">Snippet HTML</p>
              <button
                type="button"
                disabled={!generatedTitle || !generatedDescription}
                onClick={() => copy(htmlBlock, "Snippet HTML copiato.")}
                className="rounded-full border border-zinc-600 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copia tutto
              </button>
            </div>
            <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap rounded-md bg-zinc-950 p-3 text-xs leading-relaxed text-emerald-100">
              {generatedTitle && generatedDescription ? htmlBlock : "// Compila keyword per vedere il markup"}
            </pre>
          </div>

          {copyHint ? (
            <p className="text-xs font-medium text-emerald-800" role="status">
              {copyHint}
            </p>
          ) : null}

          <p className="text-xs text-zinc-500">
            Suggerimento: rivedi sempre title e description nel contesto reale della pagina. Il generatore propone una
            base coerente con lunghezze SERP; il refinement umano resta essenziale per tono di voce e accuratezza.
          </p>
        </div>
      </div>
    </section>
  );
}
