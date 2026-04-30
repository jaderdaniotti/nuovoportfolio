/** encodeURIComponent-style (segmenti query, frammenti) vs encodeURI (URL con : / ? intatti). */

export type UrlEncodeMode = "component" | "uri";

export function encodeUrlText(input: string, mode: UrlEncodeMode): string {
  if (mode === "uri") {
    return encodeURI(input);
  }
  return encodeURIComponent(input);
}

export type DecodeResult =
  | { ok: true; value: string }
  | { ok: false; error: string };

/** Decodifica con decodeURIComponent; gestisce URIError su sequenze % non valide. */
export function decodeUrlText(input: string): DecodeResult {
  const trimmed = input.trim();
  if (trimmed === "") {
    return { ok: true, value: "" };
  }
  try {
    return { ok: true, value: decodeURIComponent(trimmed) };
  } catch {
    return {
      ok: false,
      error:
        "Sequenza di escape non valida (es. % incompleta o byte UTF-8 errato dopo %). Verifica copia/incolla o caratteri troncati.",
    };
  }
}
