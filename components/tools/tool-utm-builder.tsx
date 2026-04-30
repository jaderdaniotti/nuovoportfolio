"use client";

import { useCallback, useMemo, useState } from "react";
import { buildUtmCampaignUrl, SAMPLE_UTM } from "@/lib/utm-builder";

type CopyKind = "url" | "query" | null;

export function ToolUtmBuilder() {
  const [baseUrl, setBaseUrl] = useState(SAMPLE_UTM.baseUrl);
  const [utmSource, setUtmSource] = useState(SAMPLE_UTM.utmSource);
  const [utmMedium, setUtmMedium] = useState(SAMPLE_UTM.utmMedium);
  const [utmCampaign, setUtmCampaign] = useState(SAMPLE_UTM.utmCampaign);
  const [utmTerm, setUtmTerm] = useState("");
  const [utmContent, setUtmContent] = useState("");
  const [utmId, setUtmId] = useState("");
  const [copied, setCopied] = useState<CopyKind>(null);

  const result = useMemo(
    () =>
      buildUtmCampaignUrl({
        baseUrl,
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
        utmId,
      }),
    [baseUrl, utmCampaign, utmContent, utmId, utmMedium, utmSource, utmTerm],
  );

  const copy = useCallback(async (kind: "url" | "query") => {
    if (!result.ok) return;
    const text = kind === "url" ? result.url : result.queryString || "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  }, [result]);

  const loadSample = useCallback(() => {
    setBaseUrl(SAMPLE_UTM.baseUrl);
    setUtmSource(SAMPLE_UTM.utmSource);
    setUtmMedium(SAMPLE_UTM.utmMedium);
    setUtmCampaign(SAMPLE_UTM.utmCampaign);
    setUtmTerm("");
    setUtmContent("");
    setUtmId("");
  }, []);

  const clearAll = useCallback(() => {
    setBaseUrl("");
    setUtmSource("");
    setUtmMedium("");
    setUtmCampaign("");
    setUtmTerm("");
    setUtmContent("");
    setUtmId("");
  }, []);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-teal-200 bg-gradient-to-b from-teal-50/90 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          Campaign URL con parametri UTM standard
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Incolla la <strong>landing di destinazione</strong> e i tre parametri GA (
          <code className="rounded bg-teal-100/80 px-1 text-xs">utm_source</code>,{" "}
          <code className="rounded bg-teal-100/80 px-1 text-xs">utm_medium</code>,{" "}
          <code className="rounded bg-teal-100/80 px-1 text-xs">utm_campaign</code>
          ). I campi{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs">utm_term</code> e{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs">utm_content</code> sono opzionali (keyword annuncio / variant
          creative); <code className="rounded bg-zinc-100 px-1 text-xs">utm_id</code> per ID campagna dove lo usi in GA4.
          La query esistente sull&apos;URL viene preservata; i parametri UTM vengono sovrascritti se già presenti.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={loadSample}
          className="rounded-full border border-teal-300 bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-900 transition hover:bg-teal-100"
        >
          Carica esempio
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
        >
          Svuota campi
        </button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-zinc-900">Destinazione</h3>
        <label className="mt-3 flex flex-col gap-1">
          <span className="text-xs font-medium text-zinc-600">URL di destinazione</span>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            autoComplete="url"
            spellCheck={false}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 font-mono text-sm text-zinc-900 outline-none ring-emerald-200 transition focus:border-emerald-500 focus:ring-2"
            placeholder="https://www.esempio.it/pagina"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-700">utm_source *</span>
          <span className="text-xs text-zinc-500">Canale/referente (es. newsletter, google, partner)</span>
          <input
            type="text"
            value={utmSource}
            onChange={(e) => setUtmSource(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-200 focus:border-emerald-500 focus:ring-2"
            placeholder="google"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-700">utm_medium *</span>
          <span className="text-xs text-zinc-500">Tipo di traffico (es. cpc, email, referral)</span>
          <input
            type="text"
            value={utmMedium}
            onChange={(e) => setUtmMedium(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-200 focus:border-emerald-500 focus:ring-2"
            placeholder="cpc"
          />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-700">utm_campaign *</span>
          <span className="text-xs text-zinc-500">Nome campagna (snake-case o sintesi senza spazi)</span>
          <input
            type="text"
            value={utmCampaign}
            onChange={(e) => setUtmCampaign(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-200 focus:border-emerald-500 focus:ring-2"
            placeholder="promo_estate"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-700">utm_term</span>
          <span className="text-xs text-zinc-500">Opzionale: keyword acquisto (Paid Search)</span>
          <input
            type="text"
            value={utmTerm}
            onChange={(e) => setUtmTerm(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-200 focus:border-emerald-500 focus:ring-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-700">utm_content</span>
          <span className="text-xs text-zinc-500">Opzionale: variante banner/link per A/B</span>
          <input
            type="text"
            value={utmContent}
            onChange={(e) => setUtmContent(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-200 focus:border-emerald-500 focus:ring-2"
          />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-700">utm_id</span>
          <span className="text-xs text-zinc-500">Opzionale: ID campagna se lo usi in GA4 Import</span>
          <input
            type="text"
            value={utmId}
            onChange={(e) => setUtmId(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-200 focus:border-emerald-500 focus:ring-2"
          />
        </label>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-zinc-900">URL generata</h3>
          {result.ok ? (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => copy("url")}
                className="rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm text-white transition hover:bg-zinc-800"
              >
                {copied === "url" ? "Copiato" : "Copia URL completa"}
              </button>
              <button
                type="button"
                onClick={() => copy("query")}
                disabled={!result.queryString}
                className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-800 transition hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {copied === "query" ? "Copiato" : "Copia solo query string"}
              </button>
            </div>
          ) : null}
        </div>

        {!result.ok ? (
          <p className="mt-3 rounded-lg border border-amber-400 bg-amber-50 px-3 py-2 text-sm text-amber-950" role="status">
            {result.error}
          </p>
        ) : (
          <textarea
            readOnly
            rows={result.url.length > 180 ? 5 : 3}
            value={result.url}
            aria-label="URL con parametri UTM"
            className="mt-3 w-full resize-y rounded-lg border border-teal-200 bg-white p-3 font-mono text-sm leading-relaxed text-zinc-900 shadow-inner outline-none"
          />
        )}
        {result.ok ? (
          <p className="mt-2 text-xs text-zinc-500">Lunghezza: {result.url.length} caratteri</p>
        ) : null}
      </div>
    </section>
  );
}
