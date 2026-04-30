/** Parsing, formattazione e minify JSON nel browser (JSON.parse/stringify). */

export type JsonFormatResult =
  | { status: "empty" }
  | { status: "invalid"; message: string }
  | {
      status: "valid";
      pretty2: string;
      pretty4: string;
      minified: string;
    };

const BOM = /^\uFEFF/;

/** Rimuove BOM iniziale, poi valida con JSON.parse. */
export function analyzeJson(raw: string): JsonFormatResult {
  const withoutBom = raw.replace(BOM, "");
  if (withoutBom.trim() === "") {
    return { status: "empty" };
  }

  try {
    const data = JSON.parse(withoutBom);
    return {
      status: "valid",
      pretty2: `${JSON.stringify(data, null, 2)}\n`,
      pretty4: `${JSON.stringify(data, null, 4)}\n`,
      minified: JSON.stringify(data),
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { status: "invalid", message };
  }
}
