/** HTML `title` on anchors — used by SEO checkers and as hover hint. */

const PAGE_TITLES: Record<string, string> = {
  "/": "Homepage jaderweb — sviluppatore web freelance Udine e Gemona",
  "/servizi": "Servizi di creazione siti web",
  "/portfolio": "Portfolio siti web realizzati",
  "/processo": "Processo di lavoro per un sito web",
  "/perche-noi": "Perché scegliere jaderweb",
  "/#chi-siamo": "Chi sono — freelance web a Udine",
  "/blog": "Blog su siti web, SEO e digitalizzazione",
  "/contatti": "Contatti e preventivo per un sito web",
  "/comuni": "Siti web per tutti i comuni d’Italia",
  "/tools": "Tools SEO e utility web gratuite",
  "/privacy": "Informativa sulla privacy",
  "/cookie": "Informativa sui cookie",
  "/udine": "Siti web a Udine",
  "/friuli": "Freelance web in Friuli Venezia Giulia",
  "/costo-sito-web": "Costo di un sito web",
  "/siti-web": "Siti web in Alto Friuli",
  "/siti-web/gemona-del-friuli": "Sviluppatore web a Gemona del Friuli",
  "/siti-web/buja": "Siti web per aziende a Buja",
  "/siti-web/artegna": "Siti vetrina a Artegna",
  "/siti-web/osoppo": "Siti web aziendali a Osoppo",
  "/siti-web/venzone": "Siti web per turismo a Venzone",
  "/siti-web/tarcento": "Realizzazione siti web a Tarcento",
  "/siti-web/majano": "Siti web per imprese a Majano",
  "/siti-web/trasaghis": "Siti web a Trasaghis",
  "/siti-web/forgaria-nel-friuli": "Siti web a Forgaria nel Friuli",
  "/siti-web/san-daniele-del-friuli": "Siti web ed e-commerce a San Daniele del Friuli",
  "/siti-web/tolmezzo": "Sviluppatore web a Tolmezzo",
};

const SERVICE_TITLES: Record<string, string> = {
  matrimoni: "Siti per matrimoni",
  "sagre-eventi": "Sagre ed eventi comunali",
  ristoranti: "Ristoranti con prenotazione",
  "bb-case-vacanza": "B&B e case vacanza",
  professionisti: "Siti per professionisti",
  "associazioni-sportive": "Associazioni sportive",
  "band-eventi": "Band ed eventi musicali",
  "agenzie-immobiliari": "Agenzie immobiliari",
  "eventi-privati": "Siti per eventi privati",
  artigiani: "Siti per artigiani",
  "landing-ads": "Landing per campagne ads",
  "one-page": "OnePage Start",
  "sito-48h": "Sito in 48/72 ore",
  palestre: "Palestre e personal trainer",
  "preventivi-online": "Sistema preventivi online",
  prenotazioni: "Portali di prenotazione",
  "cv-portfolio": "Portfolio e CV online",
  "eventi-locali": "Portali per eventi locali",
  digitalizzazione: "Digitalizzazione dell’azienda",
};

const EXTERNAL_TITLES: Record<string, string> = {
  "https://jaderweb.com": "Sito jaderweb — creazione siti web a Udine",
  "https://www.comoprivatedriver.it": "Sito live Como Private Driver",
  "https://eleonorapolitiphotographer.it": "Sito live Eleonora Politi Photographer",
  "https://gioiacapelli.it": "Sito live Gioia Capelli",
  "https://www.pompefunebritortaroloeconti.it":
    "Sito live Pompe Funebri Tortarolo e Conti",
  "https://www.comolakesuites.eu": "Sito live Como Lake Suites",
  "https://www.lakecomoincar.eu/it": "Sito live Lake Como in Car",
  "https://authenticpastalab.vercel.app": "Sito live Authentic Pasta Lab",
  "https://alposta.vercel.app": "Sito live Al Posta",
  "https://nextjs.org": "Documentazione Next.js",
  "https://nodejs.org": "Sito ufficiale Node.js",
  "https://www.shopify.com": "Sito ufficiale Shopify",
  "https://www.linux.org": "Sito ufficiale Linux",
  "https://vercel.com": "Sito ufficiale Vercel",
  "https://developer.mozilla.org/docs/web/javascript": "Guida JavaScript su MDN",
  "https://developer.mozilla.org/docs/web/html": "Guida HTML su MDN",
  "https://developer.mozilla.org/docs/web/css": "Guida CSS su MDN",
  "https://react.dev": "Documentazione React",
  "https://www.mysql.com": "Sito ufficiale MySQL",
};

function normalizeHref(href: string): string {
  const trimmed = href.trim();
  if (trimmed.startsWith("mailto:")) return trimmed.toLowerCase();
  if (trimmed.startsWith("tel:")) return trimmed;
  if (trimmed.startsWith("/#")) return trimmed;
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    if (trimmed.length > 1) return trimmed.replace(/\/+$/, "");
    return "/";
  }
  try {
    const url = new URL(trimmed);
    const path = url.pathname.replace(/\/+$/, "") || "";
    return `${url.origin}${path}${url.hash}`.replace(/\/+$/, "");
  } catch {
    return trimmed.replace(/\/+$/, "");
  }
}

function titleFromComuneSlug(slug: string): string {
  const parts = slug.split("-");
  if (parts.length >= 2 && /^[a-z]{2}$/i.test(parts[parts.length - 1] ?? "")) {
    parts.pop();
  }
  const name = parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return `Siti web a ${name}`;
}

export function getLinkTitle(href: string, fallback?: string): string {
  const key = normalizeHref(href);
  const lower = key.toLowerCase();

  if (PAGE_TITLES[key]) return PAGE_TITLES[key];
  if (EXTERNAL_TITLES[lower]) return EXTERNAL_TITLES[lower];

  if (lower.startsWith("mailto:")) {
    return `Scrivi a ${key.slice("mailto:".length)}`;
  }
  if (lower.includes("wa.me/") || lower.includes("whatsapp.com")) {
    return "Contattami su WhatsApp";
  }

  const serviceMatch = key.match(/^\/servizi\/([^/?#]+)/);
  if (serviceMatch?.[1] && SERVICE_TITLES[serviceMatch[1]]) {
    return SERVICE_TITLES[serviceMatch[1]];
  }

  const comuneMatch = key.match(/^\/comuni\/([^/?#]+)/);
  if (comuneMatch?.[1]) {
    return titleFromComuneSlug(comuneMatch[1]);
  }

  if (fallback?.trim()) return fallback.trim();

  try {
    if (key.startsWith("http")) {
      return `Apri ${new URL(href).hostname.replace(/^www\./, "")}`;
    }
  } catch {
    // ignore
  }

  return key === "/" ? "Homepage jaderweb" : `Vai a ${key}`;
}
