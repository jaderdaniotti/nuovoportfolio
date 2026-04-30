"use client";

import { useCallback, useState } from "react";
import {
  convertMarkdownToHtml,
  validateMarkdownToHtmlInput,
} from "@/lib/markdown-to-html";

const SAMPLE_MD = `# Titolo documento

Testo **grassetto** e *corsivo* con [link esempio](https://example.com).

## Elenco e attività

- Voce uno
- Voce due

- [x] Fatto
- [ ] Da fare

## Tabella (GFM)

| Colonna | Valore |
| --- | --- |
| SEO | snippet |
| UX | preview |

## Codice

\`\`\`ts
const html = await convertMarkdownToHtml(markdown);
\`\`\`

~~Testo barrato~~ e note a piè pagina[^1].

[^1]: Esempio di nota GFM.
`;

type RightTab = "html" | "preview";

export function ToolMarkdownToHtml() {
  const [markdown, setMarkdown] = useState(SAMPLE_MD);
  const [html, setHtml] = useState("");
  const [tab, setTab] = useState<RightTab>("preview");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const runConvert = useCallback(async () => {
    const v = validateMarkdownToHtmlInput(markdown);
    if (!v.ok) {
      setError(v.message);
      setHtml("");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const out = await convertMarkdownToHtml(markdown);
      setHtml(out);
      setCopied(false);
    } catch (e) {
      setHtml("");
      setError(e instanceof Error ? e.message : "Conversione non riuscita.");
    } finally {
      setBusy(false);
    }
  }, [markdown]);

  const loadSample = useCallback(() => {
    setMarkdown(SAMPLE_MD);
    setError(null);
    setHtml("");
    setCopied(false);
  }, []);

  const clearAll = useCallback(() => {
    setMarkdown("");
    setHtml("");
    setError(null);
    setCopied(false);
  }, []);

  const copyHtml = useCallback(async () => {
    if (!html) return;
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [html]);

  const previewDoc = `<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><style>
body{font-family:system-ui,-apple-system,sans-serif;margin:0;padding:14px 16px;line-height:1.55;color:#18181b;font-size:15px;}
pre,code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:0.88em;}
pre{padding:12px 14px;background:#f4f4f5;border-radius:8px;overflow:auto;}
code{padding:2px 6px;background:#f4f4f5;border-radius:4px;}
pre code{padding:0;background:transparent;}
table{border-collapse:collapse;width:100%;margin:12px 0;}
th,td{border:1px solid #e4e4e7;padding:8px 10px;text-align:left;}
th{background:#fafafa;font-weight:600;}
blockquote{margin:10px 0;padding-left:14px;border-left:3px solid #d4d4d8;color:#3f3f46;}
hr{border:none;border-top:1px solid #e4e4e7;margin:18px 0;}
.task-list-item{list-style:none;margin-left:-1.1em;}
img{max-width:100%;height:auto;}
</style></head><body>${html}</body></html>`;

  const idle = !markdown.trim();

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-sky-200/90 bg-gradient-to-b from-sky-50/95 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Markdown → HTML</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Converti <strong>Markdown</strong> in un frammento <strong>HTML</strong> con supporto <strong>GitHub Flavored Markdown</strong>{" "}
          (tabelle, task list, barrato, autolink, note) — come nel rendering dei README e della documentazione. La conversione avviene{" "}
          <strong>nel browser</strong> con unified/remark; puoi copiare l’HTML o verificare l’anteprima in un iframe con attributo <code className="rounded bg-sky-100/80 px-1 text-xs">sandbox</code> (nessuno script eseguito).
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/90 p-4">
        <button
          type="button"
          onClick={runConvert}
          disabled={busy || idle}
          className="rounded-full bg-sky-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Conversione…" : "Converti in HTML"}
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
        {html ? (
          <button
            type="button"
            onClick={copyHtml}
            className="rounded-full border border-sky-300 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-900 transition hover:bg-sky-100"
          >
            {copied ? "Copiato" : "Copia HTML"}
          </button>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">{error}</div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex min-h-[280px] flex-col gap-2">
          <label htmlFor="md-input" className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Markdown
          </label>
          <textarea
            id="md-input"
            value={markdown}
            onChange={(e) => {
              setMarkdown(e.target.value);
              setError(null);
            }}
            spellCheck={false}
            className="min-h-[320px] flex-1 rounded-xl border border-zinc-200 bg-white p-4 font-mono text-sm text-zinc-900 shadow-inner outline-none ring-sky-500/0 transition focus:ring-2 focus:ring-sky-500/30"
            placeholder="# Titolo&#10;&#10;Inizia a scrivere o incolla un file .md…"
          />
        </div>

        <div className="flex min-h-[280px] flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Output</span>
            <div className="inline-flex rounded-full border border-zinc-300 bg-white p-0.5 shadow-sm">
              {(
                [
                  ["preview", "Anteprima"],
                  ["html", "HTML"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    tab === key ? "bg-sky-700 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {!html && !busy ? (
              <span className="text-xs text-zinc-500">Esegui &quot;Converti&quot; per generare l’output.</span>
            ) : null}
          </div>

          {tab === "html" ? (
            <textarea
              readOnly
              value={html}
              className="min-h-[320px] flex-1 rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 font-mono text-sm text-zinc-800 shadow-inner"
              placeholder="L’HTML apparirà qui…"
            />
          ) : (
            <iframe
              title="Anteprima HTML convertito"
              sandbox=""
              className="min-h-[320px] w-full flex-1 rounded-xl border border-zinc-200 bg-white shadow-inner"
              srcDoc={html ? previewDoc : undefined}
            />
          )}
        </div>
      </div>
    </section>
  );
}
