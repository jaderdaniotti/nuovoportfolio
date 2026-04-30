"use client";

import { useCallback, useState } from "react";
import {
  convertHtmlToMarkdown,
  validateHtmlToMarkdownInput,
} from "@/lib/html-to-markdown";

const SAMPLE_HTML = `<h1>Articolo di esempio</h1>
<p>Paragrafo con <strong>grassetto</strong>, <em>corsivo</em> e <a href="https://example.com">un link</a>.</p>
<h2>Elenco</h2>
<ul>
  <li>Prima voce</li>
  <li>Seconda voce con <code>inline code</code></li>
</ul>
<h2>Tabella</h2>
<table>
  <thead><tr><th>Colonna</th><th>Valore</th></tr></thead>
  <tbody><tr><td>SEO</td><td>snippet</td></tr><tr><td>UX</td><td>flow</td></tr></tbody>
</table>
<blockquote>Una citazione importante per il copy.</blockquote>
<pre><code class="language-ts">const ok = true;
console.log(ok);</code></pre>
<hr />
<p>Riga con <del>barrato</del> prima della fine.</p>`;

export function ToolHtmlToMarkdown() {
  const [html, setHtml] = useState(SAMPLE_HTML);
  const [markdown, setMarkdown] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const runConvert = useCallback(() => {
    const v = validateHtmlToMarkdownInput(html);
    if (!v.ok) {
      setError(v.message);
      setMarkdown("");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const out = convertHtmlToMarkdown(html);
      setMarkdown(out);
      setCopied(false);
    } catch (e) {
      setMarkdown("");
      setError(e instanceof Error ? e.message : "Conversione non riuscita.");
    } finally {
      setBusy(false);
    }
  }, [html]);

  const loadSample = useCallback(() => {
    setHtml(SAMPLE_HTML);
    setError(null);
    setMarkdown("");
    setCopied(false);
  }, []);

  const clearAll = useCallback(() => {
    setHtml("");
    setMarkdown("");
    setError(null);
    setCopied(false);
  }, []);

  const copyMd = useCallback(async () => {
    if (!markdown) return;
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [markdown]);

  const idle = !html.trim();

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-emerald-200/90 bg-gradient-to-b from-emerald-50/95 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">HTML → Markdown</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Trasforma un <strong>frammento HTML</strong> incollato dall’editor, dal CMS o da DevTools in <strong>Markdown</strong> pronto per wiki, readme o pipeline
          contenuti. La conversione è <strong>locale nel browser</strong> (usa <code className="rounded bg-emerald-100/80 px-1 text-xs">DOMParser</code>): titoli, paragrafi, link,
          enfasi, codice inline, blocchi <code className="rounded bg-emerald-100/80 px-1 text-xs">pre</code>, citazioni, tabelle allineate a GFM dove possibile, liste anche con task
          (checkbox dirette nel markup). Risultati complessi dipendono dal sorgente: rivedi sempre l’output prima del commit.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/90 p-4">
        <button
          type="button"
          onClick={runConvert}
          disabled={busy || idle}
          className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Conversione…" : "Converti in Markdown"}
        </button>
        <button
          type="button"
          onClick={loadSample}
          className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
        >
          Carica esempio
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
        >
          Svuota
        </button>
        {markdown ? (
          <button
            type="button"
            onClick={copyMd}
            className="rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-100"
          >
            {copied ? "Copiato" : "Copia Markdown"}
          </button>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">{error}</div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex min-h-[280px] flex-col gap-2">
          <label htmlFor="html-input" className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            HTML
          </label>
          <textarea
            id="html-input"
            value={html}
            onChange={(e) => {
              setHtml(e.target.value);
              setError(null);
            }}
            spellCheck={false}
            className="min-h-[320px] flex-1 rounded-xl border border-zinc-200 bg-white p-4 font-mono text-sm text-zinc-900 shadow-inner outline-none ring-emerald-500/0 transition focus:ring-2 focus:ring-emerald-500/30"
            placeholder="<p>Incolla frammento HTML…</p>"
          />
        </div>

        <div className="flex min-h-[280px] flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Markdown</span>
          {!markdown && !busy ? (
            <p className="text-xs text-zinc-500">Esegui &quot;Converti&quot; per generare l’output.</p>
          ) : null}
          <textarea
            readOnly
            value={markdown}
            className="min-h-[320px] flex-1 rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 font-mono text-sm text-zinc-800 shadow-inner"
            placeholder="Il Markdown apparirà qui…"
          />
        </div>
      </div>
    </section>
  );
}
