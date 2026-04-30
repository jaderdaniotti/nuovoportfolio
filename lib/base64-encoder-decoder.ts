/** Codifica/decodifica UTF-8 in Base64 (RFC 4648), opzione URL-safe (- _). Tutto in locale. */

export type Base64DecodeResult =
  | { ok: true; value: string }
  | { ok: false; error: string };

/** Rimuove spazi, tab e newline dal payload (es. PEM o incolla da email). */
export function stripBase64Whitespace(input: string): string {
  return input.replace(/\s+/g, "");
}

function uint8ToBinaryString(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return binary;
}

function binaryStringToUint8(binary: string): Uint8Array {
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
}

function applyBase64Padding(body: string): string {
  const m = body.length % 4;
  if (m === 0) return body;
  if (m === 1) {
    throw new SyntaxError("invalid length");
  }
  return body + "=".repeat(4 - m);
}

/** Normalizza URL-safe verso alfabeto standard e applica padding. */
export function normalizeBase64Payload(raw: string, urlSafe: boolean): string {
  let s = stripBase64Whitespace(raw);
  if (urlSafe) {
    s = s.replace(/-/g, "+").replace(/_/g, "/");
  }
  return applyBase64Padding(s);
}

export function encodeUtf8ToBase64(input: string, urlSafe: boolean): string {
  const bytes = new TextEncoder().encode(input);
  const b64 = btoa(uint8ToBinaryString(bytes));
  if (!urlSafe) return b64;
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeBase64ToUtf8(input: string, urlSafe: boolean): Base64DecodeResult {
  const trimmed = input.trim();
  if (trimmed === "") {
    return { ok: true, value: "" };
  }

  let standard: string;
  try {
    standard = normalizeBase64Payload(trimmed, urlSafe);
  } catch {
    return {
      ok: false,
      error:
        "Lunghezza Base64 non valida (resto 1 dopo aver unito le righe): controlla copia/incolla o padding.",
    };
  }

  if (!/^[A-Za-z0-9+/]+=*$/.test(standard)) {
    return {
      ok: false,
      error:
        "Caratteri non ammessi: usa solo A–Z, a–z, 0–9, + e / (o - e _ in modalità URL-safe).",
    };
  }

  try {
    const binary = atob(standard);
    const bytes = binaryStringToUint8(binary);
    const value = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return { ok: true, value };
  } catch {
    return {
      ok: false,
      error:
        "Decodifica non riuscita: sequenza Base64 errata oppure payload non è UTF-8 valido (dati binari?).",
    };
  }
}
