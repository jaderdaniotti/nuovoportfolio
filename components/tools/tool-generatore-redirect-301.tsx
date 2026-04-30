"use client";

import { useCallback, useMemo, useState } from "react";
import {
  buildApacheRedirect301,
  buildNginxRedirect301,
  buildVercelRedirects301,
  formatRedirect301Report,
  parseRedirect301Input,
} from "@/lib/redirect-301-generator";

const SAMPLE = `# Formato: vecchio -> nuovo (anche tab, | o virgola)
/blog/vecchio-articolo -> /blog/nuovo-slug-seo
https://www.example.com/pagina  https://www.example.com/alias
/shop/prodotto-legacy|/shop/prodotto-corretto
`;

type CopyTarget = "apache" | "nginx" | "vercel" | "report" | null;

export function ToolGeneratoreRedirect301() {
  const [source, setSource] = useState(SAMPLE);
  const [copied, setCopied] = useState<CopyTarget>(null);

  const analysis = useMemo(() => parseRedirect301Input(source), [source]);

  const apache = useMemo(() => buildApacheRedirect301(analysis), [analysis]);
  const nginx = useMemo(() => buildNginxRedirect301(analysis), [analysis]);
  const vercelJson = useMemo(
    () => (analysis.pairs.length ? JSON.stringify(buildVercelRedirects301(analysis), null, 2) : ""),
    [analysis],
  );
  const report = useMemo(() => formatRedirect301Report(analysis), [analysis]);

  const status = useMemo(() => {
    if (!source.trim()) {
      return {
        label: "In attesa di input",
        desc: "Incolla le coppie URL o percorso — vecchio e nuovo — uno per riga.",
        tone: "border-zinc-200 bg-zinc-100 text-zinc-800",
      };
    }
    if (!analysis.pairs.length && analysis.issues.length) {
      return {
        label: "Correggi le righe segnalate",
        desc: "Nessuna coppia valida finché non sistemi gli errori elencati sotto.",
        tone: "border-amber-200 bg-amber-50 text-amber-950",
      };
    }
    if (!analysis.pairs.length) {
      return {
        label: "Nessun redirect da generare",
        desc: 'Aggiungi righe tipo `/vecchio -> /nuovo` o URL http(s).',
        tone: "border-amber-200 bg-amber-50 text-amber-950",
      };
    }
    if (analysis.issues.length) {
      return {
        label: `${analysis.pairs.length} redirect pronti (con note)`,
        desc: "Alcune righe del file sono state ignorate o segnalate: rivedi il blocco messaggi.",
        tone: "border-amber-200 bg-amber-50 text-amber-950",
      };
    }
    return {
      label: `${analysis.pairs.length} redirect 301 generati`,
      desc: "Copia il blocco per Apache, Nginx o l’array JSON per Next.js / Vercel.",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-950",
    };
  }, [analysis.issues.length, analysis.pairs.length, source]);

  const copyText = useCallback(async (kind: Exclude<CopyTarget, null>) => {
    let text = "";
    if (kind === "apache") text = apache;
    else if (kind === "nginx") text = nginx;
    else if (kind === "vercel") text = vercelJson;
    else text = report;
    if (!text.trim()) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* ignore */
    }
  }, [apache, nginx, report, vercelJson]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-orange-200 bg-gradient-to-b from-orange-50/90 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Redirect 301 da tabella migrazioni</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Incolla la mappa <strong>URL o percorso sorgente</strong> → <strong>destinazione</strong> (anche dopo un cambio dominio o
          riscrittura slug). Ottieni snippet pronti per <code className="rounded bg-orange-100/80 px-1 text-xs">.htaccess</code>{" "}
          (<span className="text-zinc-800">Apache mod_alias</span>), blocchi{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs">location</code> per{" "}
          <span className="text-zinc-800">Nginx</span>, e il JSON compatibile con l&apos;
          <code className="rounded bg-zinc-100 px-1 text-xs">redirects</code> di Next.js/Vercel. Tutto viene calcolato nel browser:
          rivedi sempre sul server perché sintassi Host, prefissi virtual host e trailing slash cambiano comportamento.
        </p>
      </div>

      <div className={`rounded-xl border p-4 text-sm ${status.tone}`}>
        <p className="font-medium">{status.label}</p>
        <p className="mt-1 text-sm opacity-90">{status.desc}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSource(SAMPLE)}
          className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-800 transition hover:border-zinc-500"
        >
          Carica esempio
        </button>
        <button
          type="button"
          onClick={() => setSource("")}
          className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-800 transition hover:border-zinc-500"
        >
          Svuota
        </button>
      </div>

      <label className="block text-sm font-medium text-zinc-800">
        Elenco redirect (uno per riga)
        <textarea
          value={source}
          onChange={(e) => setSource(e.target.value)}
          rows={10}
          spellCheck={false}
          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white p-4 font-mono text-sm text-zinc-900 shadow-inner focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-300/70"
          placeholder={`/blog/vecchio -> /blog/nuovo\nhttps://esempio.it/a  https://esempio.it/b`}
        />
      </label>

      {analysis.issues.length > 0 ? (
        <ul className="list-inside list-disc space-y-1 rounded-xl border border-amber-100 bg-amber-50/50 p-4 text-sm text-amber-950">
          {analysis.issues.map((issue, idx) => (
            <li key={`${issue.line}-${idx}`}>
              {issue.line ? <>Riga {issue.line}: </> : null}
              {issue.message}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <OutputBlock
          title="Apache (Redirect 301)"
          subtitle="Richiede mod_alias; prima colonna = path pubblicato sul vhost."
          body={apache}
          copied={copied === "apache"}
          onCopy={() => copyText("apache")}
        />
        <OutputBlock
          title="Nginx (return 301)"
          subtitle="Blocchi location = … adattali al contesto server/SSL."
          body={nginx}
          copied={copied === "nginx"}
          onCopy={() => copyText("nginx")}
        />
        <OutputBlock
          title="Next.js / Vercel (redirects)"
          subtitle='Array JSON: incolla dentro "redirects" in next.config.'
          body={vercelJson}
          copied={copied === "vercel"}
          onCopy={() => copyText("vercel")}
        />
        <OutputBlock
          title="Report testuale"
          subtitle="Riepilogo per ticket o checklist go-live."
          body={report}
          copied={copied === "report"}
          onCopy={() => copyText("report")}
        />
      </div>
    </section>
  );
}

function OutputBlock({
  title,
  subtitle,
  body,
  copied,
  onCopy,
}: {
  title: string;
  subtitle: string;
  body: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
          <p className="mt-1 text-xs text-zinc-600">{subtitle}</p>
        </div>
        <button
          type="button"
          disabled={!body.trim()}
          onClick={onCopy}
          className="shrink-0 rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-800 transition hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? "Copiato" : "Copia"}
        </button>
      </div>
      <pre className="mt-3 max-h-64 overflow-auto rounded-lg border border-zinc-200 bg-white p-3 font-mono text-xs text-zinc-800 whitespace-pre-wrap">
        {body.trim() ? body : "— Nessun output finché non ci sono righe valide —"}
      </pre>
    </div>
  );
}
