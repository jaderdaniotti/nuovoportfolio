"use client";

import { useCallback, useMemo, useState } from "react";
import {
  buildRobotsMetaPack,
  collectRobotsNotes,
  DEFAULT_ROBOTS_OPTIONS,
  type RobotsDirectiveOptions,
  type RobotsFollow,
  type RobotsIndexing,
} from "@/lib/robots-meta-directives";

type CopyTarget = "html" | "xheader" | "report" | "content" | null;

function fieldsetClass() {
  return "rounded-xl border border-teal-200/80 bg-white/80 p-4 shadow-sm";
}

export function ToolGeneratoreRobotsMetaDirectives() {
  const [robots, setRobots] = useState<RobotsDirectiveOptions>({ ...DEFAULT_ROBOTS_OPTIONS });
  const [googlebotSeparate, setGooglebotSeparate] = useState(false);
  const [googlebot, setGooglebot] = useState<RobotsDirectiveOptions>({
    ...DEFAULT_ROBOTS_OPTIONS,
    indexing: "noindex",
    follow: "follow",
  });
  const [explicitDefaults, setExplicitDefaults] = useState(false);
  const [copied, setCopied] = useState<CopyTarget>(null);

  const pack = useMemo(
    () =>
      buildRobotsMetaPack(robots, googlebotSeparate ? googlebot : null, {
        explicitDefaults,
      }),
    [explicitDefaults, googlebot, googlebotSeparate, robots],
  );

  const notesRobots = useMemo(() => collectRobotsNotes(robots), [robots]);
  const notesGb = useMemo(
    () => (googlebotSeparate ? collectRobotsNotes(googlebot) : []),
    [googlebot, googlebotSeparate],
  );

  const copyText = useCallback(async (kind: Exclude<CopyTarget, null>) => {
    let text = "";
    if (kind === "html") text = pack.htmlBlock;
    else if (kind === "xheader")
      text = pack.xRobotsTagValue ? `X-Robots-Tag: ${pack.xRobotsTagValue}` : "";
    else if (kind === "report") text = pack.report;
    else text = pack.robotsContent;
    if (!text.trim() && kind !== "content") return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* ignore */
    }
  }, [pack]);

  const patchRobots = useCallback((p: Partial<RobotsDirectiveOptions>) => {
    setRobots((prev) => ({ ...prev, ...p }));
  }, []);

  const patchGooglebot = useCallback((p: Partial<RobotsDirectiveOptions>) => {
    setGooglebot((prev) => ({ ...prev, ...p }));
  }, []);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50/95 via-cyan-50/40 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          Meta robots e X-Robots-Tag
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Componi le direttive standard (<strong>index/noindex</strong>, <strong>follow/nofollow</strong>) e le estensioni supportate da Google (
          <code className="rounded bg-teal-100/80 px-1 text-xs">max-snippet</code>,{" "}
          <code className="rounded bg-teal-100/80 px-1 text-xs">max-image-preview</code>,{" "}
          <code className="rounded bg-teal-100/80 px-1 text-xs">unavailable_after</code>…). Ottieni snippet HTML per il{" "}
          <code className="rounded bg-white/80 px-1 text-xs">&lt;head&gt;</code> e una riga per l&apos;header HTTP. Calcolo solo nel browser: verifica sempre
          documentazione ufficiale e comportamento del tuo stack (CDN, SSR, cache).
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-800">
          <input
            type="checkbox"
            checked={explicitDefaults}
            onChange={(e) => setExplicitDefaults(e.target.checked)}
            className="rounded border-zinc-300 text-teal-600 focus:ring-teal-500"
          />
          Includi <span className="font-mono text-xs">index, follow</span> anche se predefiniti
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-800">
          <input
            type="checkbox"
            checked={googlebotSeparate}
            onChange={(e) => setGooglebotSeparate(e.target.checked)}
            className="rounded border-zinc-300 text-teal-600 focus:ring-teal-500"
          />
          Meta <span className="font-mono text-xs">googlebot</span> diverso
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DirectiveForm
          formId="robots-main"
          title="Tutti i crawler (meta robots)"
          options={robots}
          onChange={patchRobots}
          fieldsetClassName={fieldsetClass()}
        />
        {googlebotSeparate ? (
          <DirectiveForm
            formId="robots-googlebot"
            title="Solo Googlebot"
            options={googlebot}
            onChange={patchGooglebot}
            fieldsetClassName={fieldsetClass()}
          />
        ) : (
          <div
            className={`${fieldsetClass()} flex flex-col justify-center border-dashed text-center text-sm text-zinc-600`}
          >
            <p className="font-medium text-zinc-800">Regole unificate</p>
            <p className="mt-2">
              Attiva &quot;Meta googlebot diverso&quot; per generare anche{" "}
              <code className="rounded bg-zinc-100 px-1 text-xs">name=&quot;googlebot&quot;</code> quando servono eccezioni solo per Google.
            </p>
          </div>
        )}
      </div>

      {(notesRobots.length > 0 || notesGb.length > 0) && (
        <ul className="space-y-2 rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-sm text-amber-950">
          {[
            ...notesRobots.map((n, i) => ({ key: `r-${i}-${n.slice(0, 24)}`, n })),
            ...notesGb.map((n, i) => ({ key: `g-${i}-${n.slice(0, 24)}`, n })),
          ].map(({ key, n }) => (
            <li key={key} className="flex gap-2">
              <span className="shrink-0 font-semibold">•</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      )}

      {!pack.robotsContent.trim() && (
        <p className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
          Con le opzioni attuali non serve alcun tag: equivalente predefinito di Google è{" "}
          <span className="font-mono text-xs">index, follow</span>. Spunta &quot;Includi index, follow espliciti&quot; se vuoi comunque
          generare un valore <span className="font-mono text-xs">content</span> non vuoto.
        </p>
      )}

      <div className="rounded-xl border border-teal-300/70 bg-teal-50/50 p-4 text-sm text-teal-950">
        <p className="font-medium">Anteprima <span className="font-mono">content</span></p>
        <p className="mt-2 break-all font-mono text-xs text-zinc-900">
          {pack.robotsContent || <span className="italic text-zinc-600">(nessuna direttiva — valuta se omettere il tag)</span>}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-zinc-900">HTML</h3>
            <button
              type="button"
              onClick={() => void copyText("html")}
              className="rounded-full border border-teal-400 bg-white px-3 py-1 text-xs font-medium text-teal-900 transition hover:bg-teal-50"
            >
              {copied === "html" ? "Copiato" : "Copia snippet"}
            </button>
          </div>
          <pre className="max-h-48 overflow-auto rounded-lg border border-zinc-200 bg-zinc-950 p-3 text-xs text-teal-100">
            {pack.htmlBlock}
          </pre>
        </div>

        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-zinc-900">Header HTTP</h3>
            <button
              type="button"
              onClick={() => void copyText("xheader")}
              className="rounded-full border border-teal-400 bg-white px-3 py-1 text-xs font-medium text-teal-900 transition hover:bg-teal-50"
            >
              {copied === "xheader" ? "Copiato" : "Copia riga"}
            </button>
          </div>
          <pre className="rounded-lg border border-zinc-200 bg-zinc-900 p-3 text-xs text-cyan-100">
            {pack.xRobotsTagValue
              ? `X-Robots-Tag: ${pack.xRobotsTagValue}`
              : "# Nessuna direttiva: ometti l’header o aggiungi opzioni sopra"}
          </pre>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void copyText("content")}
            className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-800 transition hover:border-zinc-500"
          >
            {copied === "content" ? "Copiato" : "Solo valore content (robots)"}
          </button>
          <button
            type="button"
            onClick={() => void copyText("report")}
            className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-800 transition hover:border-zinc-500"
          >
            {copied === "report" ? "Copiato" : "Copia report testuale"}
          </button>
          <button
            type="button"
            onClick={() => {
              setRobots({ ...DEFAULT_ROBOTS_OPTIONS });
              setGooglebot({ ...DEFAULT_ROBOTS_OPTIONS, indexing: "noindex", follow: "follow" });
            }}
            className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-800 transition hover:border-zinc-500"
          >
            Reimposta esempio
          </button>
        </div>
      </div>
    </section>
  );
}

function DirectiveForm({
  formId,
  title,
  options: o,
  onChange,
  fieldsetClassName,
}: {
  formId: string;
  title: string;
  options: RobotsDirectiveOptions;
  onChange: (p: Partial<RobotsDirectiveOptions>) => void;
  fieldsetClassName: string;
}) {
  return (
    <fieldset className={fieldsetClassName}>
      <legend className="mb-3 text-sm font-semibold text-zinc-900">{title}</legend>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">Indicizzazione</p>
          <RobotsRadioRow<RobotsIndexing>
            name={`${formId}-idx`}
            value={o.indexing}
            onChange={(indexing) => onChange({ indexing })}
            options={[
              { v: "index", label: "index" },
              { v: "noindex", label: "noindex" },
            ]}
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">Link in uscita</p>
          <RobotsRadioRow<RobotsFollow>
            name={`${formId}-fol`}
            value={o.follow}
            onChange={(follow) => onChange({ follow })}
            options={[
              { v: "follow", label: "follow" },
              { v: "nofollow", label: "nofollow" },
            ]}
          />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-800">
            <input
              type="checkbox"
              checked={o.noarchive}
              onChange={(e) => onChange({ noarchive: e.target.checked })}
              className="rounded border-zinc-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="font-mono text-xs">noarchive</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-800">
            <input
              type="checkbox"
              checked={o.nosnippet}
              onChange={(e) => onChange({ nosnippet: e.target.checked })}
              className="rounded border-zinc-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="font-mono text-xs">nosnippet</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-800">
            <input
              type="checkbox"
              checked={o.noimageindex}
              onChange={(e) => onChange({ noimageindex: e.target.checked })}
              className="rounded border-zinc-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="font-mono text-xs">noimageindex</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-800">
            <input
              type="checkbox"
              checked={o.notranslate}
              onChange={(e) => onChange({ notranslate: e.target.checked })}
              className="rounded border-zinc-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="font-mono text-xs">notranslate</span>
          </label>
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-zinc-500">max-snippet</label>
          <select
            value={
              o.maxSnippet === "omit"
                ? "omit"
                : o.maxSnippet === "unlimited"
                  ? "unlimited"
                  : "n"
            }
            onChange={(e) => {
              const v = e.target.value;
              if (v === "omit") onChange({ maxSnippet: "omit" });
              else if (v === "unlimited") onChange({ maxSnippet: "unlimited" });
              else onChange({ maxSnippet: typeof o.maxSnippet === "number" ? o.maxSnippet : 160 });
            }}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm"
          >
            <option value="omit">Ometti</option>
            <option value="unlimited">Illimitato (-1)</option>
            <option value="n">Numero massimo caratteri</option>
          </select>
          {typeof o.maxSnippet === "number" && (
            <input
              type="number"
              min={0}
              step={1}
              value={o.maxSnippet}
              onChange={(e) => onChange({ maxSnippet: Number.parseInt(e.target.value, 10) || 0 })}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-2 py-1.5 text-sm"
            />
          )}
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-zinc-500">max-image-preview</label>
          <select
            value={o.maxImagePreview}
            onChange={(e) =>
              onChange({
                maxImagePreview: e.target.value as RobotsDirectiveOptions["maxImagePreview"],
              })
            }
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm"
          >
            <option value="omit">Ometti</option>
            <option value="none">none</option>
            <option value="standard">standard</option>
            <option value="large">large</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-zinc-500">max-video-preview</label>
          <select
            value={
              o.maxVideoPreview === "omit"
                ? "omit"
                : o.maxVideoPreview === "unlimited"
                  ? "unlimited"
                  : "s"
            }
            onChange={(e) => {
              const v = e.target.value;
              if (v === "omit") onChange({ maxVideoPreview: "omit" });
              else if (v === "unlimited") onChange({ maxVideoPreview: "unlimited" });
              else onChange({ maxVideoPreview: typeof o.maxVideoPreview === "number" ? o.maxVideoPreview : 10 });
            }}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm"
          >
            <option value="omit">Ometti</option>
            <option value="unlimited">Illimitato (-1)</option>
            <option value="s">Secondi massimi</option>
          </select>
          {typeof o.maxVideoPreview === "number" && (
            <input
              type="number"
              min={0}
              step={1}
              value={o.maxVideoPreview}
              onChange={(e) => onChange({ maxVideoPreview: Number.parseInt(e.target.value, 10) || 0 })}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-2 py-1.5 text-sm"
            />
          )}
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-zinc-500">
            unavailable_after (HTTP-date)
          </label>
          <input
            type="text"
            placeholder="Sun, 01 Sep 2025 12:00:00 GMT"
            value={o.unavailableAfter}
            onChange={(e) => onChange({ unavailableAfter: e.target.value })}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-2 py-1.5 font-mono text-xs"
          />
        </div>
      </div>
    </fieldset>
  );
}

function RobotsRadioRow<T extends string>({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: T;
  onChange: (v: T) => void;
  options: { v: T; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map(({ v, label }) => (
        <label key={v} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-800">
          <input
            type="radio"
            name={name}
            checked={value === v}
            onChange={() => onChange(v)}
            className="border-zinc-300 text-teal-600 focus:ring-teal-500"
          />
          <span className="font-mono text-xs">{label}</span>
        </label>
      ))}
    </div>
  );
}
