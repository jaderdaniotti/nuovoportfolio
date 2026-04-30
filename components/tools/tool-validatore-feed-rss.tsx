"use client";

import { useCallback, useMemo, useState } from "react";
import {
  SAMPLE_ATOM_FEED,
  SAMPLE_RSS_FEED,
  formatFeedValidationReport,
  validateFeedMarkup,
  type FeedValidationResult,
} from "@/lib/rss-feed-validator";

type Mode = "url" | "markup";

const URL_PLACEHOLDER = "https://example.com/feed.xml";

export function ToolValidatoreFeedRss() {
  const [mode, setMode] = useState<Mode>("markup");
  const [feedUrl, setFeedUrl] = useState("");
  const [xmlText, setXmlText] = useState("");
  const [loading, setLoading] = useState(false);
  const [remoteErr, setRemoteErr] = useState<string | null>(null);
  const [fetchMeta, setFetchMeta] = useState<{ finalUrl?: string; contentType?: string | null }>({});
  const [validation, setValidation] = useState<FeedValidationResult | null>(null);

  const markupResult = useMemo(() => {
    if (mode !== "markup") return null;
    if (!xmlText.trim()) return null;
    return validateFeedMarkup(xmlText);
  }, [mode, xmlText]);

  const derived = mode === "markup" ? markupResult : validation;

  const reportContext = useMemo(() => {
    if (mode === "url") {
      return fetchMeta.finalUrl ?? (feedUrl.trim() || "(URL)");
    }
    return "Markup RSS/Atom incollato nel browser";
  }, [mode, fetchMeta.finalUrl, feedUrl]);

  const runRemote = useCallback(async () => {
    const u = feedUrl.trim();
    if (!u) {
      setRemoteErr("Incolla prima l’URL del feed pubblico.");
      setValidation(null);
      setFetchMeta({});
      return;
    }
    setLoading(true);
    setRemoteErr(null);
    setValidation(null);
    setFetchMeta({});
    try {
      const res = await fetch("/api/tools/validate-rss-feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: u.startsWith("//") ? `https:${u}` : u }),
      });
      const data = (await res.json()) as {
        validation?: FeedValidationResult;
        finalUrl?: string;
        contentType?: string | null;
        error?: string;
      };
      if (!res.ok) {
        setRemoteErr(data.error ?? `Errore HTTP ${res.status}`);
        return;
      }
      if (!data.validation) {
        setRemoteErr("Risposta API imprevista.");
        return;
      }
      setValidation(data.validation);
      setFetchMeta({ finalUrl: data.finalUrl, contentType: data.contentType });
    } catch {
      setRemoteErr("Richiesta fallita (rete o timeout).");
    } finally {
      setLoading(false);
    }
  }, [feedUrl]);

  const loadSampleMarkup = useCallback((kind: "rss" | "atom") => {
    setXmlText(kind === "rss" ? SAMPLE_RSS_FEED : SAMPLE_ATOM_FEED);
    setMode("markup");
    setRemoteErr(null);
    setValidation(null);
    setFetchMeta({});
  }, []);

  const copyReport = useCallback(async () => {
    const v = derived;
    if (!v) return;
    try {
      await navigator.clipboard.writeText(formatFeedValidationReport(v, reportContext));
    } catch {
      // ignore
    }
  }, [derived, reportContext]);

  const statusCard = useMemo(() => {
    if (mode === "markup") {
      if (!xmlText.trim()) {
        return {
          tone: "border-zinc-200 bg-zinc-100 text-zinc-800",
          label: "In attesa di markup",
          desc: "Incolla RSS 2.0 o Atom nella textarea, oppure passa alla modalità URL per scaricare un feed remoto pubblico.",
        };
      }
    } else if (!derived && !remoteErr && !feedUrl.trim()) {
      return {
        tone: "border-zinc-200 bg-zinc-100 text-zinc-800",
        label: "In attesa di URL",
        desc: `Inserisci un indirizzo http(s) pubblico (${URL_PLACEHOLDER}) e conferma.`,
      };
    }

    const v = derived;
    if (!v) {
      return {
        tone: "border-amber-200 bg-amber-50 text-amber-950",
        label: remoteErr ?? "Senza risultati",
        desc: remoteErr ? "Controlla l’URL o riprova; host locali e IP privati non sono consentiti." : "",
      };
    }
    if (v.errors.length === 0 && v.warnings.length === 0) {
      return {
        tone: "border-emerald-200 bg-emerald-50 text-emerald-950",
        label: "Struttura coerente (nessun blocco grave)",
        desc: `${v.kind === "rss2" ? "RSS 2.0" : v.kind === "atom" ? "Atom" : "tipo sconosciuto"} — campi chiave individuati. Verifica sempre con un lettore dopo il deploy.`,
      };
    }
    if (!v.ok) {
      return {
        tone: "border-red-200 bg-red-50 text-red-900",
        label: "Errori strutturali",
        desc: "Correggi gli elementi richiesti da RSS 2.0 o Atom prima di pubblicare il feed.",
      };
    }
    return {
      tone: "border-amber-200 bg-amber-50 text-amber-950",
      label: "Validazione superata con avvisi",
      desc: "Nessun errore bloccante; rivedi suggerimenti per lettori RSS e aggregator.",
    };
  }, [derived, remoteErr, mode, xmlText, feedUrl]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white to-violet-50/45 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Validatore feed RSS / Atom</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Controlli strutturali su RSS 2.0 e Atom: blocchi channel/feed e item/entry, campi ordinari richiesti
              dalle specifiche più comuni, avvisi su guid/link e permalink. La modalità <strong className="font-medium">Markup</strong>{" "}
              analizza nel browser quanto incolli senza caricarlo sul server;
              la modalità <strong className="font-medium">URL</strong> scarica solo feed pubblici http/https tramite proxy con stessi
              filtri anti-SSRF degli altri tool (no localhost/IP privati).
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => loadSampleMarkup("rss")}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Esempio RSS 2.0
            </button>
            <button
              type="button"
              onClick={() => loadSampleMarkup("atom")}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Esempio Atom
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {(["markup", "url"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setRemoteErr(null);
                if (m === "markup") setValidation(null);
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition md:text-sm ${
                mode === m
                  ? "bg-violet-700 text-white shadow-sm"
                  : "border border-zinc-300 bg-white text-zinc-600 hover:border-violet-300 hover:text-violet-800"
              }`}
            >
              {m === "markup" ? "Markup nel browser" : "URL remoto"}
            </button>
          ))}
        </div>

        {mode === "markup" ? (
          <div className="mt-5 space-y-2">
            <label htmlFor="rss-xml" className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              XML del feed (RSS / Atom)
            </label>
            <textarea
              id="rss-xml"
              value={xmlText}
              onChange={(e) => setXmlText(e.target.value)}
              spellCheck={false}
              placeholder="&#x3c;?xml version=&quot;1.0&quot; ?&#x3e; …"
              className="mt-1 min-h-[220px] w-full rounded-xl border border-zinc-300 bg-white p-4 font-mono text-xs leading-relaxed text-zinc-800 shadow-inner outline-none placeholder:text-zinc-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 md:text-sm"
            />
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            <label htmlFor="rss-url" className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              URL pubblico del feed
            </label>
            <div className="flex flex-col gap-2 md:flex-row">
              <input
                id="rss-url"
                value={feedUrl}
                onChange={(e) => setFeedUrl(e.target.value)}
                placeholder={URL_PLACEHOLDER}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
              />
              <button
                type="button"
                disabled={loading}
                onClick={runRemote}
                className="shrink-0 rounded-xl bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
              >
                {loading ? "Scarico…" : "Scarica e valida"}
              </button>
            </div>
            {fetchMeta.finalUrl ?
              <p className="text-xs text-zinc-500">
                URL finale dopo redirect:{" "}
                <span className="break-all font-mono text-zinc-700">{fetchMeta.finalUrl}</span>
                {fetchMeta.contentType ?
                  ` · Content-Type: ${fetchMeta.contentType}`
                : null}
              </p>
            : null}
          </div>
        )}

        {remoteErr ?
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{remoteErr}</p>
        : null}

        <div className={`mt-5 rounded-xl border px-4 py-3 ${statusCard.tone}`}>
          <p className="text-sm font-semibold">{statusCard.label}</p>
          {statusCard.desc ?
            <p className="mt-1 text-xs leading-relaxed opacity-90">{statusCard.desc}</p>
          : null}
        </div>

        {derived ?
          <>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Sintesi</h3>
                <dl className="mt-2 space-y-1 text-sm text-zinc-800">
                  {Object.entries(derived.summary)
                    .filter(([, v]) => v !== undefined && v !== "")
                    .map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <dt className="shrink-0 font-mono text-xs text-zinc-500">{k}</dt>
                        <dd className="min-w-0 break-all">{String(v)}</dd>
                      </div>
                    ))}
                  {Object.keys(derived.summary).length === 0 ?
                    <dd className="text-zinc-500">—</dd>
                  : null}
                </dl>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Messaggi</h3>
                  <button
                    type="button"
                    onClick={copyReport}
                    className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 hover:border-zinc-400 hover:text-zinc-900"
                  >
                    Copia report
                  </button>
                </div>
                {derived.errors.length ?
                  <ul className="mt-2 space-y-1">
                    {derived.errors.map((err, idx) => (
                      <li
                        key={`e-${idx}`}
                        className="rounded-lg border border-red-200 bg-red-50 px-2 py-1.5 text-xs text-red-900"
                      >
                        {err}
                      </li>
                    ))}
                  </ul>
                : (
                  <p className="mt-2 text-xs text-zinc-500">Nessun errore elencato.</p>
                )}
                {derived.warnings.length ?
                  <ul className="mt-3 space-y-1">
                    <li className="text-[10px] font-semibold uppercase tracking-wide text-amber-800">Avvisi</li>
                    {derived.warnings.map((w, idx) => (
                      <li
                        key={`w-${idx}`}
                        className="rounded-lg border border-amber-200 bg-amber-50 px-2 py-1.5 text-xs text-amber-950"
                      >
                        {w}
                      </li>
                    ))}
                  </ul>
                : null}
              </div>
            </div>
          </>
        : null}

        <p className="mt-4 text-xs leading-relaxed text-zinc-500">
          Disclaimer: questo tool non garantisce compatibilità con ogni aggregator o validatore XML DTD esterni; gli item con CData
          complessi potrebbero alterare il conteggio in casi molto limite.
        </p>
      </div>
    </section>
  );
}
