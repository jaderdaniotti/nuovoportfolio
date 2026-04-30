"use client";

import { useCallback, useMemo, useState } from "react";
import {
  buildSitemapXml,
  type Changefreq,
  parseUrlInput,
  SITEMAP_MAX_URLS,
} from "@/lib/sitemap-xml-builder";

const SAMPLE_URLS = `https://www.example.com/
https://www.example.com/chi-siamo
https://www.example.com/blog/articolo-seo
# righe che iniziano con # sono ignorate
`;

const CHANGEFREQ_OPTIONS: { value: Changefreq; label: string }[] = [
  { value: "weekly", label: "weekly" },
  { value: "daily", label: "daily" },
  { value: "monthly", label: "monthly" },
  { value: "yearly", label: "yearly" },
  { value: "always", label: "always" },
  { value: "hourly", label: "hourly" },
  { value: "never", label: "never" },
];

function todayYmd() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function ToolGeneratoreSitemapXml() {
  const [source, setSource] = useState(SAMPLE_URLS);
  const [includeLastmod, setIncludeLastmod] = useState(true);
  const [lastmodDate, setLastmodDate] = useState(todayYmd);
  const [includeChangefreq, setIncludeChangefreq] = useState(false);
  const [changefreq, setChangefreq] = useState<Changefreq>("weekly");
  const [includePriority, setIncludePriority] = useState(false);
  const [priority, setPriority] = useState(0.5);

  const parsed = useMemo(() => parseUrlInput(source), [source]);
  const urlList = useMemo(() => parsed.entries.map((e) => e.url), [parsed.entries]);

  const overLimit = urlList.length > SITEMAP_MAX_URLS;

  const xml = useMemo(() => {
    if (urlList.length === 0 || overLimit) return "";
    return buildSitemapXml(urlList, {
      includeLastmod,
      lastmodDate,
      includeChangefreq,
      changefreq,
      includePriority,
      priority,
    });
  }, [
    urlList,
    overLimit,
    includeLastmod,
    lastmodDate,
    includeChangefreq,
    changefreq,
    includePriority,
    priority,
  ]);

  const copyXml = useCallback(async () => {
    if (!xml) return;
    try {
      await navigator.clipboard.writeText(xml);
    } catch {
      /* ignore */
    }
  }, [xml]);

  const downloadXml = useCallback(() => {
    if (!xml) return;
    const blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "sitemap.xml";
    a.click();
    URL.revokeObjectURL(a.href);
  }, [xml]);

  const status = useMemo(() => {
    if (!source.trim()) {
      return {
        label: "In attesa di URL",
        desc: "Incolla un elenco di indirizzi (uno per riga). Verranno accettati solo link http/https.",
        tone: "border-zinc-200 bg-zinc-100 text-zinc-800",
      };
    }
    if (overLimit) {
      return {
        label: "Troppi URL",
        desc: `Il protocollo sitemap consente al massimo ${SITEMAP_MAX_URLS.toLocaleString("it-IT")} URL per file. Suddividi in più sitemap o indice.`,
        tone: "border-red-200 bg-red-50 text-red-900",
      };
    }
    if (parsed.errors.length && urlList.length === 0) {
      return {
        label: "Nessun URL valido",
        desc: "Correggi le righe segnalate oppure aggiungi almeno un URL assoluto valido.",
        tone: "border-amber-200 bg-amber-50 text-amber-950",
      };
    }
    if (parsed.errors.length) {
      return {
        label: "Alcune righe ignorate",
        desc: "Gli URL validi sono inclusi nel file; le righe con errori sono elencate sotto.",
        tone: "border-amber-200 bg-amber-50 text-amber-950",
      };
    }
    if (urlList.length === 0) {
      return {
        label: "Nessuna voce",
        desc: "Aggiungi righe non vuote con URL canonici.",
        tone: "border-zinc-200 bg-zinc-100 text-zinc-800",
      };
    }
    return {
      label: "Pronto per l'esportazione",
      desc:
        parsed.duplicatesDropped > 0
          ? `Duplicati ignorati: ${parsed.duplicatesDropped}. Il file usa namespace sitemaps.org 0.9.`
          : "Namespace sitemap 0.9: copia il testo oppure scarica sitemap.xml.",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-950",
    };
  }, [source, overLimit, parsed.errors.length, parsed.duplicatesDropped, urlList.length]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Generatore sitemap.xml</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Trasforma un elenco di URL in un file <span className="font-mono text-xs">sitemap.xml</span> compatibile con
          Google Search Console: un blocco <span className="font-mono text-xs">&lt;url&gt;</span> per pagina con{" "}
          <span className="font-mono text-xs">loc</span> obbligatorio e, se vuoi,{" "}
          <span className="font-mono text-xs">lastmod</span>, <span className="font-mono text-xs">changefreq</span>,{" "}
          <span className="font-mono text-xs">priority</span>. I frammenti <span className="font-mono text-xs">#</span>{" "}
          vengono rimossi dagli URL.
        </p>
      </div>

      <div className={`rounded-xl border px-4 py-3 text-sm ${status.tone}`}>
        <p className="font-semibold">{status.label}</p>
        <p className="mt-1 text-sm opacity-90">{status.desc}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-zinc-800">Elenco URL (uno per riga)</span>
            <textarea
              value={source}
              onChange={(e) => setSource(e.target.value)}
              spellCheck={false}
              rows={14}
              className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-3 py-2.5 font-mono text-xs text-zinc-900 shadow-inner placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200"
              placeholder="https://www.esempio.it/pagina"
            />
          </label>

          {parsed.errors.length > 0 && (
            <ul className="space-y-1.5 rounded-lg border border-red-200 bg-red-50/80 p-3 text-xs text-red-900">
              {parsed.errors.map((err) => (
                <li key={`${err.line}-${err.raw}`}>
                  <span className="font-mono font-semibold">Riga {err.line}:</span> {err.reason}
                  <span className="ml-1 font-mono opacity-80">«{err.raw}»</span>
                </li>
              ))}
            </ul>
          )}

          <fieldset className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
            <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-zinc-600">
              Opzioni blocco URL
            </legend>
            <div className="mt-3 space-y-3">
              <label className="flex cursor-pointer items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={includeLastmod}
                  onChange={(e) => setIncludeLastmod(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  <span className="font-medium text-zinc-900">Includi lastmod</span>
                  <span className="ml-2 text-zinc-600">— data dell’ultima modifica stimata.</span>
                </span>
              </label>
              {includeLastmod && (
                <input
                  type="date"
                  value={lastmodDate}
                  onChange={(e) => setLastmodDate(e.target.value)}
                  className="ml-7 rounded-lg border border-zinc-300 px-2 py-1.5 text-sm"
                />
              )}

              <label className="flex cursor-pointer items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={includeChangefreq}
                  onChange={(e) => setIncludeChangefreq(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  <span className="font-medium text-zinc-900">Includi changefreq</span>
                  <span className="ml-2 text-zinc-600">— frequenza di aggiornamento indicativa.</span>
                </span>
              </label>
              {includeChangefreq && (
                <select
                  value={changefreq}
                  onChange={(e) => setChangefreq(e.target.value as Changefreq)}
                  className="ml-7 rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm"
                >
                  {CHANGEFREQ_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              )}

              <label className="flex cursor-pointer items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={includePriority}
                  onChange={(e) => setIncludePriority(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  <span className="font-medium text-zinc-900">Includi priority</span>
                  <span className="ml-2 text-zinc-600">— relativa alla home (0.0–1.0).</span>
                </span>
              </label>
              {includePriority && (
                <div className="ml-7 flex flex-wrap items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                    className="max-w-[200px] flex-1"
                  />
                  <span className="font-mono text-sm text-zinc-800">{priority.toFixed(1)}</span>
                </div>
              )}
            </div>
          </fieldset>
        </div>

        <div className="flex min-h-0 flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => copyXml()}
              disabled={!xml}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Copia XML
            </button>
            <button
              type="button"
              onClick={() => downloadXml()}
              disabled={!xml}
              className="rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Scarica sitemap.xml
            </button>
          </div>
          <pre
            className="min-h-[280px] flex-1 overflow-auto rounded-xl border border-zinc-200 bg-zinc-950 p-4 font-mono text-[11px] leading-relaxed text-emerald-100/95"
            tabIndex={0}
            aria-label="Output sitemap XML"
          >
            {xml ||
              "// Aggiungi almeno un URL http/https valido per generare il file.\n// Esempio:\n// https://www.tuosito.it/"}
          </pre>
          <p className="text-xs text-zinc-500">
            URL inclusi: <strong className="text-zinc-700">{urlList.length}</strong>
            {parsed.duplicatesDropped > 0 && (
              <span className="ml-2"> · duplicati scartati: {parsed.duplicatesDropped}</span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
