"use client";

import { useCallback, useMemo, useState } from "react";
import { decodeBase64ToUtf8, encodeUtf8ToBase64 } from "@/lib/base64-encoder-decoder";

const SAMPLE_PLAIN = "Ciao, mondo! Copia token e JSON in Base64.";
const SAMPLE_B64 =
  "Q2lhbywgbW9uZG8hIENvcGlhIHRva2VuIGUgSlNPTiBpbiBCYXNlNjQu";

type Direction = "encode" | "decode";

export function ToolBase64EncoderDecoder() {
  const [text, setText] = useState(SAMPLE_PLAIN);
  const [direction, setDirection] = useState<Direction>("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [copied, setCopied] = useState(false);

  const encoded = useMemo(
    () => (direction === "encode" ? encodeUtf8ToBase64(text, urlSafe) : null),
    [text, direction, urlSafe],
  );

  const decoded = useMemo(() => {
    if (direction !== "decode") return null;
    return decodeBase64ToUtf8(text, urlSafe);
  }, [text, direction, urlSafe]);

  const output =
    direction === "encode"
      ? (encoded ?? "")
      : decoded?.ok === true
        ? decoded.value
        : "";

  const error = direction === "decode" && decoded && !decoded.ok ? decoded.error : null;

  const copyOutput = useCallback(async () => {
    if (direction === "decode" && decoded && !decoded.ok) return;
    const toCopy =
      direction === "encode"
        ? (encoded ?? "")
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
    setText(direction === "encode" ? SAMPLE_PLAIN : SAMPLE_B64);
  }, [direction]);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-xl border border-violet-200/80 bg-gradient-to-b from-violet-50/90 to-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Base64: testo UTF-8</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          Codifica il testo in <strong>Base64</strong> (RFC 4648) rispetto a <strong>UTF-8</strong>, o decodifica una
          stringa Base64 in testo. Attiva <strong>URL-safe</strong> per ottenere o accettare la variante{" "}
          <code className="rounded bg-violet-100/80 px-1 text-xs">-</code> e{" "}
          <code className="rounded bg-violet-100/80 px-1 text-xs">_</code> al posto di{" "}
          <code className="rounded bg-violet-100/80 px-1 text-xs">+</code> e{" "}
          <code className="rounded bg-violet-100/80 px-1 text-xs">/</code>, con padding{" "}
          <code className="rounded bg-violet-100/80 px-1 text-xs">=</code> opzionale in ingresso. Spazi e a capo nel
          campo decodifica vengono ignorati. Nessun invio al server: tutto nel browser.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/90 p-4">
        <span className="text-xs font-medium text-zinc-600">Azione</span>
        <div className="inline-flex rounded-full border border-zinc-300 bg-white p-0.5 shadow-sm">
          <button
            type="button"
            onClick={() => setDirection("encode")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              direction === "encode"
                ? "bg-violet-700 text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Codifica
          </button>
          <button
            type="button"
            onClick={() => setDirection("decode")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              direction === "decode"
                ? "bg-violet-700 text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Decodifica
          </button>
        </div>

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 shadow-sm">
          <input
            type="checkbox"
            checked={urlSafe}
            onChange={(e) => setUrlSafe(e.target.checked)}
            className="size-4 rounded border-zinc-300 text-violet-700 focus:ring-violet-500"
          />
          URL-safe (<code className="text-[0.7rem]">- _</code>, senza <code className="text-[0.7rem]">=</code> in
          uscita)
        </label>

        <button
          type="button"
          onClick={loadSample}
          className="ml-auto rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:border-violet-300 hover:text-violet-900"
        >
          {direction === "encode" ? "Carica esempio in chiaro" : "Carica esempio Base64"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-800">
            Input {direction === "encode" ? "(testo UTF-8)" : "(Base64)"}
          </span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            spellCheck={false}
            className="min-h-[200px] w-full resize-y rounded-xl border border-zinc-300 bg-white p-4 font-mono text-sm leading-relaxed text-zinc-900 shadow-inner outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            placeholder={
              direction === "encode"
                ? "Incolla testo, JSON, JWT in chiaro…"
                : "Incolla stringa Base64 (anche spezzata su più righe)…"
            }
          />
          <span className="text-xs text-zinc-500">{text.length} caratteri</span>
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-800">
            {direction === "encode" ? "Base64" : "Testo decodificato"}
          </span>
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
              className="rounded-full border border-violet-800 bg-violet-800 px-4 py-2 text-sm text-white transition hover:bg-violet-900 disabled:cursor-not-allowed disabled:opacity-50"
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
