"use client";

import { useCallback, useMemo, useState } from "react";
import { decodeUrlText, encodeUrlText, type UrlEncodeMode } from "@/lib/url-encoder-decoder";

const SAMPLE_ENCODE = `https://esempio.it/ricerca?q=caffè & speciali`;
const SAMPLE_DECODE = `https://esempio.it/ricerca?q=caff%C3%A8%20%26%20speciali`;

type Direction = "encode" | "decode";

export function ToolUrlEncoderDecoder() {
  const [text, setText] = useState(SAMPLE_ENCODE);
  const [direction, setDirection] = useState<Direction>("encode");
  const [encodeMode, setEncodeMode] = useState<UrlEncodeMode>("component");
  const [copied, setCopied] = useState(false);

  const encoded = useMemo(
    () => (direction === "encode" ? encodeUrlText(text, encodeMode) : null),
    [text, direction, encodeMode],
  );

  const decoded = useMemo(() => {
    if (direction !== "decode") return null;
    return decodeUrlText(text);
  }, [text, direction]);

  const output =
    direction === "encode"
      ? encoded ?? ""
      : decoded?.ok === true
        ? decoded.value
        : "";

  const error = direction === "decode" && decoded && !decoded.ok ? decoded.error : null;

  const copyOutput = useCallback(async () => {
    if (direction === "decode" && decoded && !decoded.ok) return;
    const toCopy =
      direction === "encode"
        ? encoded ?? ""
        : decoded?.ok === true
          ? decoded.value
          : "";
    try {
      await navigator.clipboard.writeText(toCopy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [direction, decoded, encoded]);

  const loadSample = useCallback(() => {
    setText(direction === "encode" ? SAMPLE_ENCODE : SAMPLE_DECODE);
  }, [direction]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-b from-sky-50/80 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          Codifica e decodifica URL
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Usa <strong>encodeURIComponent</strong> per valori di query path e parametri (spazi diventano{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs">%20</code>, accenti UTF-8 in sequenze percent-encoded). Usa{" "}
          <strong>encodeURI</strong> quando devi trasformare un intero URL conservando separatori (
          <code className="rounded bg-zinc-100 px-1 text-xs">:</code>,{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs">/</code>,{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs">?</code>). La decodifica usa{" "}
          <strong>decodeURIComponent</strong>: tutto avviene nel browser senza inviare dati al server.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <span className="text-xs font-medium text-zinc-600">Azione</span>
        <div className="inline-flex rounded-full border border-zinc-300 bg-white p-0.5">
          <button
            type="button"
            onClick={() => setDirection("encode")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              direction === "encode" ? "bg-zinc-900 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Codifica
          </button>
          <button
            type="button"
            onClick={() => setDirection("decode")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              direction === "decode" ? "bg-zinc-900 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Decodifica
          </button>
        </div>

        {direction === "encode" ? (
          <label className="flex flex-col gap-1 text-xs font-medium text-zinc-600">
            Modalità codifica
            <select
              value={encodeMode}
              onChange={(e) => setEncodeMode(e.target.value as UrlEncodeMode)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm"
            >
              <option value="component">URIComponent (frammento / query)</option>
              <option value="uri">URI completa (meno aggressiva)</option>
            </select>
          </label>
        ) : null}

        <button
          type="button"
          onClick={loadSample}
          className="ml-auto rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
        >
          {direction === "encode" ? "Carica esempio da codificare" : "Carica esempio da decodificare"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-800">
            Input {direction === "encode" ? "(testo grezzo)" : "(testo codificato %)"}
          </span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            spellCheck={false}
            className="min-h-[200px] w-full resize-y rounded-xl border border-zinc-300 bg-white p-4 font-mono text-sm leading-relaxed text-zinc-900 shadow-inner outline-none ring-zinc-200 transition focus:border-sky-500 focus:ring-2"
            placeholder={
              direction === "encode"
                ? "Incolla testo o URL da codificare…"
                : "Incolla stringa con % escape da decodificare…"
            }
          />
          <span className="text-xs text-zinc-500">{text.length} caratteri</span>
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-800">Risultato</span>
          <textarea
            readOnly
            value={error ?? output}
            rows={12}
            className={`min-h-[200px] w-full resize-y rounded-xl border p-4 font-mono text-sm leading-relaxed shadow-inner outline-none ${
              error
                ? "border-amber-400 bg-amber-50 text-amber-950"
                : "border-zinc-200 bg-zinc-50 text-zinc-900"
            }`}
            aria-live="polite"
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={copyOutput}
              disabled={Boolean(error) || output === ""}
              className="rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? "Copiato" : "Copia risultato"}
            </button>
            {!error && output !== "" ? (
              <span className="text-xs text-zinc-500">{output.length} caratteri</span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
