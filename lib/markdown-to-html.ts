import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

/** Limite conservativo per evitare blocchi UI con file enormi (elaborazione nel browser). */
export const MARKDOWN_TO_HTML_MAX_CHARS = 750_000;

export function validateMarkdownToHtmlInput(
  md: string,
): { ok: true } | { ok: false; message: string } {
  if (!md.trim()) {
    return { ok: false, message: "Incolla del Markdown o carica l’esempio per convertirlo in HTML." };
  }
  if (md.length > MARKDOWN_TO_HTML_MAX_CHARS) {
    return {
      ok: false,
      message: `Il testo supera il limite di ${MARKDOWN_TO_HTML_MAX_CHARS.toLocaleString("it-IT")} caratteri.`,
    };
  }
  return { ok: true };
}

/** CommonMark + GFM (tabelle, task list, strikethrough, autolink) → frammento HTML. */
export async function convertMarkdownToHtml(md: string): Promise<string> {
  const file = await remark().use(remarkGfm).use(remarkHtml).process(md);
  return String(file).trimEnd();
}
