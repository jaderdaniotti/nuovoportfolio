/** Limite conservativo (stesso ordine di grandezza di markdown-to-html). */
export const HTML_TO_MARKDOWN_MAX_CHARS = 750_000;

export function validateHtmlToMarkdownInput(
  html: string,
): { ok: true } | { ok: false; message: string } {
  if (!html.trim()) {
    return { ok: false, message: "Incolla dell’HTML o carica l’esempio per convertirlo in Markdown." };
  }
  if (html.length > HTML_TO_MARKDOWN_MAX_CHARS) {
    return {
      ok: false,
      message: `Il contenuto supera il limite di ${HTML_TO_MARKDOWN_MAX_CHARS.toLocaleString("it-IT")} caratteri.`,
    };
  }
  return { ok: true };
}

const BLOCK_SKIP = new Set(["script", "style", "noscript", "template", "svg"]);

function normalizeHtmlFragment(html: string): string {
  const t = html.trim();
  if (!/<[a-z][\s\S]*>/i.test(t)) {
    return `<p>${escapeHtmlMinimal(t)}</p>`;
  }
  return t;
}

/** Solo per plain text dentro un finto paragrafo (input senza tag). */
function escapeHtmlMinimal(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeCell(s: string): string {
  return s.replace(/\|/g, "\\|").trim();
}

/** Escape Markdown significativo in blocchi inline (conservativo). */
function escapeInlineText(text: string): string {
  return text.replace(/([\\`*_{}[\]#+!])/g, "\\$1");
}

/** Contenuti inline testuali da un subtree (titoli, celle td, ecc.). */
function collectPlainText(el: HTMLElement): string {
  const doc = el.ownerDocument;
  const walker = doc.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p = node.parentElement;
      if (!p) return NodeFilter.FILTER_REJECT;
      const tag = p.tagName.toLowerCase();
      if (BLOCK_SKIP.has(tag)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const parts: string[] = [];
  let n: Node | null = walker.nextNode();
  while (n) {
    const v = (n.textContent ?? "").replace(/\s+/g, " ");
    if (v) parts.push(v);
    n = walker.nextNode();
  }
  return parts.join(" ").trim();
}

function inlineSerialize(root: HTMLElement): string {
  function walk(nodes: Iterable<Node>): string {
    let out = "";
    for (const node of nodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        out += escapeInlineText(node.textContent ?? "");
        continue;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) continue;
      const el = node as HTMLElement;
      const tag = el.tagName.toLowerCase();
      if (BLOCK_SKIP.has(tag)) continue;
      switch (tag) {
        case "br":
          out += "  \n";
          break;
        case "strong":
        case "b":
          out += `**${walk(el.childNodes)}**`;
          break;
        case "em":
        case "i":
          out += `_${walk(el.childNodes)}_`;
          break;
        case "del":
        case "s":
          out += `~~${walk(el.childNodes)}~~`;
          break;
        case "code":
          if (el.closest("pre")) {
            out += walk(el.childNodes);
          } else {
            const inner = collectPlainText(el);
            out += `\`${inner.replace(/`/g, "\\`")}\``;
          }
          break;
        case "a": {
          const href = el.getAttribute("href") ?? "";
          const label = walk(el.childNodes).trim() || href;
          if (!href) {
            out += label;
          } else {
            out += `[${label}](${href})`;
          }
          break;
        }
        case "img": {
          const alt = el.getAttribute("alt") ?? "";
          const src = el.getAttribute("src") ?? "";
          out += src ? `![${alt.replace(/[\]\[]/g, "")}](${src})` : alt;
          break;
        }
        default:
          out += walk(el.childNodes);
      }
    }
    return out;
  }

  return walk(root.childNodes).replace(/\s+/g, " ").trim();
}

function tableToMarkdown(table: HTMLTableElement): string {
  const rows = table.rows;
  if (!rows.length) return "";
  const lines: string[] = [];
  for (let r = 0; r < rows.length; r++) {
    const cells = [...rows[r].cells];
    const mdCells = cells.map((c) => escapeCell(collectPlainText(c as HTMLElement)));
    lines.push(`| ${mdCells.join(" | ")} |`);
    if (r === 0) {
      lines.push(`| ${mdCells.map(() => "---").join(" | ")} |`);
    }
  }
  return lines.join("\n");
}

function listToMarkdown(
  list: HTMLUListElement | HTMLOListElement,
  ordered: boolean,
  depth: number,
): string {
  const pad = "  ".repeat(depth);
  const lines: string[] = [];
  let idx = 1;
  const od = list.ownerDocument;
  const children = [...list.children].filter((c) => c.tagName.toLowerCase() === "li");
  for (const li of children) {
    const liEl = li as HTMLLIElement;
    const bullet = ordered ? `${idx}. ` : "- ";
    idx += 1;

    const subLists: HTMLElement[] = [];
    const blockParts: string[] = [];

    for (const child of [...liEl.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const tx = (child.textContent ?? "").trim();
        if (tx) {
          const span = od.createElement("span");
          span.textContent = tx;
          blockParts.push(inlineSerialize(span));
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const cel = child as HTMLElement;
        const ct = cel.tagName.toLowerCase();
        if (ct === "ul") {
          subLists.push(cel);
        } else if (ct === "ol") {
          subLists.push(cel);
        } else if (ct === "p") {
          blockParts.push(inlineSerialize(cel));
        } else {
          blockParts.push(inlineSerialize(cel));
        }
      }
    }

    const primary =
      blockParts.filter(Boolean).join(" ") ||
      (subLists.length === 0 ? collectPlainText(liEl) : "");

    if (!primary.trim() && subLists.length === 1) {
      const only = subLists[0];
      lines.push(listToMarkdown(only as HTMLUListElement | HTMLOListElement, only.tagName.toLowerCase() === "ol", depth));
      continue;
    }

    lines.push(`${pad}${bullet}${primary}`.trimEnd());

    for (const sub of subLists) {
      const isOl = sub.tagName.toLowerCase() === "ol";
      lines.push(listToMarkdown(sub as HTMLUListElement | HTMLOListElement, isOl, depth + 1));
    }
  }
  return lines.join("\n");
}

function preToMarkdown(pre: HTMLElement): string {
  const code = pre.querySelector("code");
  const raw = code ? code.textContent ?? "" : pre.textContent ?? "";
  let lang = "";
  const cls = code?.className ?? "";
  const m = cls.match(/language-([\w+-]+)|lang-([\w+-]+)/);
  if (m) lang = (m[1] ?? m[2] ?? "").trim();
  const fence = "```";
  return `${fence}${lang}\n${raw.replace(/\n$/, "")}\n${fence}`;
}

function normalizeTaskList(items: HTMLElement): void {
  for (const li of items.querySelectorAll("li")) {
    const el = li as HTMLLIElement;
    const chk = el.querySelector(':scope > input[type="checkbox"]') as HTMLInputElement | null;
    if (!chk) continue;
    chk.remove();
    const mark = chk.checked ? "[x] " : "[ ] ";
    el.insertBefore(el.ownerDocument.createTextNode(mark), el.firstChild);
  }
}

function serializeBlocks(container: HTMLElement): string {
  const blocks: string[] = [];

  for (const node of [...container.childNodes]) {
    if (node.nodeType === Node.TEXT_NODE) {
      const t = node.textContent?.trim();
      if (t) blocks.push(t);
      continue;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) continue;
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    if (BLOCK_SKIP.has(tag)) continue;

    switch (tag) {
      case "div":
      case "section":
      case "article":
      case "main":
      case "header":
      case "footer":
      case "nav":
      case "aside": {
        const inner = serializeBlocks(el).trim();
        if (inner) blocks.push(inner);
        break;
      }
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6": {
        const level = Number(tag.slice(1));
        blocks.push(`${"#".repeat(level)} ${inlineSerialize(el)}`);
        break;
      }
      case "p":
        blocks.push(inlineSerialize(el));
        break;
      case "blockquote":
        serializeBlocks(el)
          .split("\n\n")
          .map((line) =>
            line
              .split("\n")
              .map((l) => `> ${l}`)
              .join("\n"),
          )
          .forEach((b) => blocks.push(b));
        break;
      case "hr":
        blocks.push("---");
        break;
      case "ul":
        normalizeTaskList(el);
        blocks.push(listToMarkdown(el as HTMLUListElement, false, 0));
        break;
      case "ol":
        blocks.push(listToMarkdown(el as HTMLOListElement, true, 0));
        break;
      case "pre":
        blocks.push(preToMarkdown(el));
        break;
      case "table":
        blocks.push(tableToMarkdown(el as HTMLTableElement));
        break;
      default:
        blocks.push(inlineSerialize(el));
    }
  }

  return blocks.filter(Boolean).join("\n\n").replace(/\n{3,}/g, "\n\n").trimEnd();
}

/**
 * Converte un frammento HTML in Markdown leggibile (allineato a uso editoriale/CMS).
 * Richiede `DOMParser` (solo browser).
 */
export function convertHtmlToMarkdown(html: string): string {
  if (typeof DOMParser === "undefined") {
    throw new Error("La conversione HTML → Markdown è disponibile solo nel browser.");
  }

  const src = normalizeHtmlFragment(html);
  const doc = new DOMParser().parseFromString(src, "text/html");
  const parsed = doc.body;

  return serializeBlocks(parsed).trimEnd();
}
