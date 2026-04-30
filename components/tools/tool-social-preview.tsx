"use client";

import { useCallback, useMemo, useState } from "react";
import {
  extractSocialMetaFromHtml,
  formatSocialPreviewReport,
  hintOgDescription,
  hintOgTitle,
  SAMPLE_SOCIAL,
  type TwitterCardKind,
} from "@/lib/social-preview";

function hostnameFromUrl(raw: string) {
  const t = raw.trim();
  if (!t) return "tuosito.it";
  try {
    const u = new URL(t.startsWith("http") ? t : `https://${t}`);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "tuosito.it";
  }
}

function HintBadge({ hint, label }: { hint: "ok" | "warn" | "empty"; label: string }) {
  const cls =
    hint === "empty"
      ? "border-red-200 bg-red-50 text-red-900"
      : hint === "warn"
        ? "border-amber-200 bg-amber-50 text-amber-950"
        : "border-emerald-200 bg-emerald-50 text-emerald-950";
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${cls}`}>{label}</span>
  );
}

export function ToolSocialPreview() {
  const [ogTitle, setOgTitle] = useState(SAMPLE_SOCIAL.ogTitle);
  const [ogDescription, setOgDescription] = useState(SAMPLE_SOCIAL.ogDescription);
  const [ogImage, setOgImage] = useState(SAMPLE_SOCIAL.ogImage);
  const [ogUrl, setOgUrl] = useState(SAMPLE_SOCIAL.ogUrl);
  const [ogSiteName, setOgSiteName] = useState(SAMPLE_SOCIAL.ogSiteName);
  const [twitterCard, setTwitterCard] = useState<TwitterCardKind>(SAMPLE_SOCIAL.twitterCard);
  const [twitterTitle, setTwitterTitle] = useState(SAMPLE_SOCIAL.twitterTitle);
  const [twitterDescription, setTwitterDescription] = useState(SAMPLE_SOCIAL.twitterDescription);
  const [twitterImage, setTwitterImage] = useState(SAMPLE_SOCIAL.twitterImage);
  const [htmlPaste, setHtmlPaste] = useState("");
  const [parseMessage, setParseMessage] = useState<string | null>(null);
  const [imgBrokenOg, setImgBrokenOg] = useState(false);
  const [imgBrokenTw, setImgBrokenTw] = useState(false);
  const [copied, setCopied] = useState<"report" | "meta" | null>(null);

  const ogHost = useMemo(() => hostnameFromUrl(ogUrl), [ogUrl]);
  const twHost = useMemo(() => hostnameFromUrl(ogUrl), [ogUrl]);

  const titleHint = hintOgTitle(ogTitle.trim().length);
  const descHint = hintOgDescription(ogDescription.trim().length);

  const loadSample = useCallback(() => {
    setOgTitle(SAMPLE_SOCIAL.ogTitle);
    setOgDescription(SAMPLE_SOCIAL.ogDescription);
    setOgImage(SAMPLE_SOCIAL.ogImage);
    setOgUrl(SAMPLE_SOCIAL.ogUrl);
    setOgSiteName(SAMPLE_SOCIAL.ogSiteName);
    setTwitterCard(SAMPLE_SOCIAL.twitterCard);
    setTwitterTitle(SAMPLE_SOCIAL.twitterTitle);
    setTwitterDescription(SAMPLE_SOCIAL.twitterDescription);
    setTwitterImage(SAMPLE_SOCIAL.twitterImage);
    setHtmlPaste(SAMPLE_SOCIAL.sampleHtml);
    setParseMessage(null);
    setImgBrokenOg(false);
    setImgBrokenTw(false);
  }, []);

  const clearAll = useCallback(() => {
    setOgTitle("");
    setOgDescription("");
    setOgImage("");
    setOgUrl("");
    setOgSiteName("");
    setTwitterCard("summary_large_image");
    setTwitterTitle("");
    setTwitterDescription("");
    setTwitterImage("");
    setHtmlPaste("");
    setParseMessage(null);
    setImgBrokenOg(false);
    setImgBrokenTw(false);
  }, []);

  const extractFromHtml = useCallback(() => {
    const res = extractSocialMetaFromHtml(htmlPaste);
    if ("error" in res) {
      setParseMessage(res.error);
      return;
    }
    setParseMessage("Tag estratti e applicati ai campi sottostanti.");
    if (res.ogTitle !== undefined) setOgTitle(res.ogTitle);
    if (res.ogDescription !== undefined) setOgDescription(res.ogDescription);
    if (res.ogImage !== undefined) setOgImage(res.ogImage);
    if (res.ogUrl !== undefined) setOgUrl(res.ogUrl);
    if (res.ogSiteName !== undefined) setOgSiteName(res.ogSiteName);
    if (res.twitterCard) setTwitterCard(res.twitterCard);
    if (res.twitterTitle !== undefined) setTwitterTitle(res.twitterTitle);
    if (res.twitterDescription !== undefined) setTwitterDescription(res.twitterDescription);
    if (res.twitterImage !== undefined) setTwitterImage(res.twitterImage);
    setImgBrokenOg(false);
    setImgBrokenTw(false);
  }, [htmlPaste]);

  const copyReport = useCallback(async () => {
    const text = formatSocialPreviewReport({
      ogTitle,
      ogDescription,
      ogImage,
      ogUrl,
      ogSiteName,
      twitterCard,
      twitterTitle,
      twitterDescription,
      twitterImage,
    });
    try {
      await navigator.clipboard.writeText(text);
      setCopied("report");
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  }, [ogDescription, ogImage, ogSiteName, ogTitle, ogUrl, twitterCard, twitterDescription, twitterImage, twitterTitle]);

  const copyMetaSnippet = useCallback(async () => {
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const lines = [
      `<meta property="og:title" content="${esc(ogTitle)}" />`,
      `<meta property="og:description" content="${esc(ogDescription)}" />`,
      ogImage.trim() ? `<meta property="og:image" content="${esc(ogImage.trim())}" />` : "",
      ogUrl.trim() ? `<meta property="og:url" content="${esc(ogUrl.trim())}" />` : "",
      ogSiteName.trim() ? `<meta property="og:site_name" content="${esc(ogSiteName.trim())}" />` : "",
      `<meta name="twitter:card" content="${twitterCard}" />`,
      `<meta name="twitter:title" content="${esc(twitterTitle)}" />`,
      `<meta name="twitter:description" content="${esc(twitterDescription)}" />`,
      twitterImage.trim() ? `<meta name="twitter:image" content="${esc(twitterImage.trim())}" />` : "",
    ].filter(Boolean);
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied("meta");
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  }, [ogDescription, ogImage, ogSiteName, ogTitle, ogUrl, twitterCard, twitterDescription, twitterImage, twitterTitle]);

  const displayOgTitle = ogTitle.trim() || "Titolo quando condividi il link";
  const displayOgDesc =
    ogDescription.trim() ||
    "Descrizione: spiega il beneficio in una frase; Facebook e LinkedIn spesso troncano oltre ~200 caratteri.";
  const displayTwTitle = twitterTitle.trim() || displayOgTitle;
  const displayTwDesc =
    twitterDescription.trim() || ogDescription.trim() || "Anteprima testo per Twitter / X (Card).";

  return (
    <section className="mt-8 space-y-8">
      <div className="rounded-xl border border-indigo-200 bg-gradient-to-b from-indigo-50/90 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Anteprima Open Graph e Twitter Card</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Compila i campi come nei meta tag del sito oppure{" "}
          <strong>incolla HTML</strong> (anche solo il <code className="rounded bg-indigo-100/80 px-1 text-xs">&lt;head&gt;</code>)
          e usa &quot;Estrai dal markup&quot; per popolare{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs">og:*</code> e{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs">twitter:*</code>. Le piattaforme applicano regole proprie:
          qui vedi un&apos;approssimazione visiva per titolo, immagine e testo — utile prima di pubblicare share preview reali.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={loadSample}
          className="rounded-full border border-indigo-300 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-950 transition hover:bg-indigo-100"
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
        <button
          type="button"
          onClick={copyReport}
          className="rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
        >
          {copied === "report" ? "Report copiato" : "Copia riepilogo"}
        </button>
        <button
          type="button"
          onClick={copyMetaSnippet}
          className="rounded-full border border-zinc-900 bg-zinc-900 px-4 py-1.5 text-sm text-white transition hover:bg-zinc-800"
        >
          {copied === "meta" ? "Meta HTML copiati" : "Copia snippet meta HTML"}
        </button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
        <label className="block text-sm font-medium text-zinc-800">
          Incolla markup HTML
          <textarea
            value={htmlPaste}
            onChange={(e) => setHtmlPaste(e.target.value)}
            rows={6}
            placeholder='Es. &lt;meta property="og:title" content="..." />, tag twitter:* nel &lt;head&gt;…'
            className="mt-2 w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs text-zinc-900 shadow-inner placeholder:text-zinc-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </label>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={extractFromHtml}
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
          >
            Estrai dal markup
          </button>
          {parseMessage ? (
            <p
              className={`text-sm ${parseMessage.startsWith("Nessun") || parseMessage.includes("non risultano") ? "text-amber-800" : "text-emerald-800"}`}
            >
              {parseMessage}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Open Graph</h3>
          <label className="block text-sm font-medium text-zinc-700">
            og:title
            <input
              type="text"
              value={ogTitle}
              onChange={(e) => setOgTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <HintBadge
              hint={titleHint}
              label={
                titleHint === "empty"
                  ? "Titolo vuoto"
                  : titleHint === "warn"
                    ? "Tipico limite ~60–65 caratteri"
                    : "Lunghezza plausibile"
              }
            />
          </div>
          <label className="block text-sm font-medium text-zinc-700">
            og:description
            <textarea
              value={ogDescription}
              onChange={(e) => setOgDescription(e.target.value)}
              rows={3}
              className="mt-1 w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <HintBadge
            hint={descHint}
            label={
              descHint === "empty"
                ? "Descrizione vuota"
                : descHint === "warn"
                  ? "Rischio troncamento oltre ~200 caratteri"
                  : "Lunghezza plausibile"
            }
          />
          <label className="block text-sm font-medium text-zinc-700">
            og:image (URL assoluto)
            <input
              type="url"
              value={ogImage}
              onChange={(e) => {
                setOgImage(e.target.value);
                setImgBrokenOg(false);
              }}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-700">
            og:url
            <input
              type="text"
              value={ogUrl}
              onChange={(e) => setOgUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-700">
            og:site_name
            <input
              type="text"
              value={ogSiteName}
              onChange={(e) => setOgSiteName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Twitter / X</h3>
          <fieldset>
            <legend className="text-sm font-medium text-zinc-700">twitter:card</legend>
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-zinc-800">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="tw-card"
                  checked={twitterCard === "summary_large_image"}
                  onChange={() => setTwitterCard("summary_large_image")}
                />
                summary_large_image
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="tw-card"
                  checked={twitterCard === "summary"}
                  onChange={() => setTwitterCard("summary")}
                />
                summary
              </label>
            </div>
          </fieldset>
          <label className="block text-sm font-medium text-zinc-700">
            twitter:title
            <input
              type="text"
              value={twitterTitle}
              onChange={(e) => setTwitterTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-700">
            twitter:description
            <textarea
              value={twitterDescription}
              onChange={(e) => setTwitterDescription(e.target.value)}
              rows={3}
              className="mt-1 w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-700">
            twitter:image (URL assoluto)
            <input
              type="url"
              value={twitterImage}
              onChange={(e) => {
                setTwitterImage(e.target.value);
                setImgBrokenTw(false);
              }}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-zinc-900">Anteprima approssimativa</h3>
        <p className="mt-1 text-sm text-zinc-600">
          Layout ispirato alle card link su Facebook/LinkedIn e Twitter/X. Immagini da domini esterni devono
          consentire embed (CORS non blocca il tag img nel browser).
        </p>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          {/* OG-style */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Stile Open Graph (feed tipo Meta)</p>
            <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-md">
              <div className="relative aspect-[1.91/1] w-full bg-zinc-100">
                {ogImage.trim() && !imgBrokenOg ? (
                  // eslint-disable-next-line @next/next/no-img-element -- remote demo URLs; dynamic user input
                  <img
                    src={ogImage.trim()}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={() => setImgBrokenOg(true)}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-200 to-zinc-300 text-center text-xs text-zinc-600">
                    {ogImage.trim() ? "Immagine non caricabile (URL o CORS)" : "Nessuna og:image — aggiungi un URL 1200×630"}
                  </div>
                )}
              </div>
              <div className="border-t border-zinc-100 bg-zinc-50 px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                  {ogSiteName.trim() || ogHost}
                </p>
                <p className="line-clamp-2 text-[15px] font-semibold text-zinc-900">{displayOgTitle}</p>
                <p className="mt-1 line-clamp-2 text-sm text-zinc-600">{displayOgDesc}</p>
                <p className="mt-2 truncate text-xs text-zinc-400">{ogUrl.trim() || `https://${ogHost}/pagina`}</p>
              </div>
            </div>
          </div>

          {/* Twitter */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Twitter / X Card</p>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md">
              {twitterCard === "summary_large_image" ? (
                <>
                  <div className="relative aspect-[2/1] w-full bg-zinc-100">
                    {twitterImage.trim() && !imgBrokenTw ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={twitterImage.trim()}
                        alt=""
                        className="h-full w-full object-cover"
                        onError={() => setImgBrokenTw(true)}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100 text-center text-xs text-zinc-600">
                        {twitterImage.trim()
                          ? "Immagine non caricabile"
                          : "Nessuna twitter:image — card grande attesa 2:1"}
                      </div>
                    )}
                  </div>
                  <div className="px-3 pb-3 pt-2">
                    <p className="text-[15px] font-semibold leading-snug text-zinc-900">{displayTwTitle}</p>
                    <p className="mt-1 line-clamp-3 text-[15px] text-zinc-600">{displayTwDesc}</p>
                    <p className="mt-2 flex items-center gap-1 text-xs text-zinc-400">
                      <span className="inline-block h-3 w-3 rounded-sm bg-zinc-300" aria-hidden />
                      {twHost}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex gap-3 p-3">
                  <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                    {twitterImage.trim() && !imgBrokenTw ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={twitterImage.trim()}
                        alt=""
                        className="h-full w-full object-cover"
                        onError={() => setImgBrokenTw(true)}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center p-1 text-center text-[10px] text-zinc-500">
                        Img
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-3 text-[15px] font-semibold text-zinc-900">{displayTwTitle}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-600">{displayTwDesc}</p>
                    <p className="mt-2 truncate text-xs text-zinc-400">{twHost}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
