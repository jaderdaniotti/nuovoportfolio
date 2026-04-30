import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolAuditSeoOnPage } from "@/components/tools/tool-audit-seo-on-page";
import { ToolCheckerTitleDescription } from "@/components/tools/tool-checker-title-description";
import { ToolGeneratoreMetaTag } from "@/components/tools/tool-generatore-meta-tag";
import { ToolGeneratoreSchemaJsonLd } from "@/components/tools/tool-generatore-schema-json-ld";
import { ToolSerpSnippetPreview } from "@/components/tools/tool-serp-snippet-preview";
import { ToolGeneratoreSitemapXml } from "@/components/tools/tool-generatore-sitemap-xml";
import { ToolVerificaCanonical } from "@/components/tools/tool-verifica-canonical";
import { ToolAnalyzerStrutturaHeading } from "@/components/tools/tool-analyzer-struttura-heading";
import { ToolKeywordDifficultyEstimator } from "@/components/tools/tool-keyword-difficulty-estimator";
import { ToolKeywordClustering } from "@/components/tools/tool-keyword-clustering";
import { ToolGeneratorePianoEditoriale } from "@/components/tools/tool-generatore-piano-editoriale";
import { ToolContentBriefGenerator } from "@/components/tools/tool-content-brief-generator";
import { ToolGeneratoreFaqSeo } from "@/components/tools/tool-generatore-faq-seo";
import { ToolGeneratoreSlugSeo } from "@/components/tools/tool-generatore-slug-seo";
import { ToolKeywordDensityChecker } from "@/components/tools/tool-keyword-density-checker";
import { ToolCheckerLeggibilitaItaliano } from "@/components/tools/tool-checker-leggibilita-italiano";
import { ToolGeneratoreAltText } from "@/components/tools/tool-generatore-alt-text";
import { ToolWebsiteLaunchChecklist } from "@/components/tools/tool-website-launch-checklist";
import { ToolImageCompressor } from "@/components/tools/tool-image-compressor";
import { ToolImageConverter } from "@/components/tools/tool-image-converter";
import { ToolImageResizer } from "@/components/tools/tool-image-resizer";
import { ToolBackgroundRemover } from "@/components/tools/tool-background-remover";
import { ToolGeneratoreFavicon } from "@/components/tools/tool-generatore-favicon";
import { ToolSvgPngConverter } from "@/components/tools/tool-svg-png-converter";
import { ToolCsvToJson } from "@/components/tools/tool-csv-to-json";
import { ToolPdfCompressor } from "@/components/tools/tool-pdf-compressor";
import { ToolPdfMergeSplit } from "@/components/tools/tool-pdf-merge-split";
import { ToolOcrImmagineTesto } from "@/components/tools/tool-ocr-immagine-testo";
import { ToolUrlEncoderDecoder } from "@/components/tools/tool-url-encoder-decoder";
import { ToolBase64EncoderDecoder } from "@/components/tools/tool-base64-encoder-decoder";
import { ToolJsonFormatterValidator } from "@/components/tools/tool-json-formatter-validator";
import { ToolCronBuilder } from "@/components/tools/tool-cron-builder";
import { ToolRegexTester } from "@/components/tools/tool-regex-tester";
import { ToolPasswordGenerator } from "@/components/tools/tool-password-generator";
import { ToolWireframeBriefGenerator } from "@/components/tools/tool-wireframe-brief-generator";
import { ToolCalcolatoreBreakEvenDigitale } from "@/components/tools/tool-calcolatore-break-even-digitale";
import { ToolCalcolatoreCpcVsSeo } from "@/components/tools/tool-calcolatore-cpc-vs-seo";
import { ToolStimatoreLeadOrganici } from "@/components/tools/tool-stimatore-lead-organici";
import { ToolCalcolatoreConversionRateObiettivo } from "@/components/tools/tool-calcolatore-conversion-rate-obiettivo";
import { ToolCalcolatoreValoreLead } from "@/components/tools/tool-calcolatore-valore-lead";
import { ToolUtmBuilder } from "@/components/tools/tool-utm-builder";
import { ToolSocialPreview } from "@/components/tools/tool-social-preview";
import { ToolSimulatoreRoiSeoLocale } from "@/components/tools/tool-simulatore-roi-seo-locale";
import { ToolSimulatoreRoiSitoWeb } from "@/components/tools/tool-simulatore-roi-sito-web";
import { ToolValidatoreRobotsTxt } from "@/components/tools/tool-validatore-robots-txt";
import { ToolCheckerBrokenLink } from "@/components/tools/tool-checker-broken-link";
import { ToolCheckerCoreWebVitalsBase } from "@/components/tools/tool-checker-core-web-vitals-base";
import { ToolValidatoreFeedRss } from "@/components/tools/tool-validatore-feed-rss";
import { ToolGeneratoreRedirect301 } from "@/components/tools/tool-generatore-redirect-301";
import { ToolGeneratoreRobotsMetaDirectives } from "@/components/tools/tool-generatore-robots-meta-directives";
import { ToolCheckerAccessibilitaBase } from "@/components/tools/tool-checker-accessibilita-base";
import { ToolColorContrastChecker } from "@/components/tools/tool-color-contrast-checker";
import { ToolPaletteGeneratorBrand } from "@/components/tools/tool-palette-generator-brand";
import { ToolGeneratoreOpenGraphImage } from "@/components/tools/tool-generatore-open-graph-image";
import { ToolHtmlToMarkdown } from "@/components/tools/tool-html-to-markdown";
import { ToolMarkdownToHtml } from "@/components/tools/tool-markdown-to-html";
import { ToolMinificatoreHtmlCssJs } from "@/components/tools/tool-minificatore-html-css-js";
import { ToolConvertitoreUnitaCss } from "@/components/tools/tool-convertitore-unita-css";
import { ToolWebhookTester } from "@/components/tools/tool-webhook-tester";
import { ToolDnsRecordChecker } from "@/components/tools/tool-dns-record-checker";
import { ToolAnalizzatoreLogServer } from "@/components/tools/tool-analizzatore-log-server";
import { ToolCompressoreVideoWeb } from "@/components/tools/tool-compressore-video-web";
import { ToolEstimatoreTempoLettura } from "@/components/tools/tool-estimatore-tempo-lettura";
import { ToolGeneratoreCookieBannerCopy } from "@/components/tools/tool-generatore-cookie-banner-copy";
import { ToolGeneratorePrivacyPolicyBase } from "@/components/tools/tool-generatore-privacy-policy-base";
import { siteConfig } from "@/lib/site-config";
import { toolCategoryLabels, toolsBySlug, toolsCatalog } from "@/lib/tools-catalog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return toolsCatalog.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolsBySlug.get(slug);

  if (!tool) {
    return {
      title: "Tool non trovato",
      robots: { index: false, follow: false },
    };
  }

  const url = `${siteConfig.url}/tools/${tool.slug}`;
  const title =
    tool.slug === "serp-snippet-preview"
      ? `${tool.name} — anteprima snippet Google | Tools`
      : tool.slug === "generatore-meta-tag"
        ? `${tool.name} — title e meta description SEO | Tools`
        : tool.slug === "generatore-schema-json-ld"
          ? `${tool.name} — dati strutturati schema.org | Tools`
          : tool.slug === "validatore-robots-txt"
            ? `${tool.name} — sintassi e direttive crawler | Tools`
            : tool.slug === "generatore-sitemap-xml"
              ? `${tool.name} — crea file XML per Google | Tools`
              : tool.slug === "verifica-canonical"
                ? `${tool.name} — controlli su tag canonical | Tools`
                : tool.slug === "analyzer-struttura-heading"
                  ? `${tool.name} — gerarchia H1–H6 e outline | Tools`
                  : tool.slug === "keyword-difficulty-estimator"
                    ? `${tool.name} — stima competitività keyword SEO | Tools`
                    : tool.slug === "keyword-clustering"
                      ? `${tool.name} — raggruppa query per topic e intento | Tools`
                      : tool.slug === "generatore-piano-editoriale"
                        ? `${tool.name} — roadmap contenuti SEO multi-settimana | Tools`
                        : tool.slug === "content-brief-generator"
                          ? `${tool.name} — outline, titoli e checklist per una pagina | Tools`
                          : tool.slug === "generatore-faq-seo"
                            ? `${tool.name} — domande/risposte, intenti SERP e JSON-LD FAQPage | Tools`
                            : tool.slug === "generatore-slug-seo"
                              ? `${tool.name} — slug da titolo, trattini e lunghezza | Tools`
                              : tool.slug === "keyword-density-checker"
                                ? `${tool.name} — frequenza keyword e frasi nel testo | Tools`
                                : tool.slug === "checker-leggibilita-italiano"
                                  ? `${tool.name} — indice Gulpease e medio parole/frase | Tools`
                                  : tool.slug === "generatore-alt-text"
                                    ? `${tool.name} — testo alternativo accessibile e SEO | Tools`
                                    : tool.slug === "website-launch-checklist"
                                  ? `${tool.name} — checklist go-live SEO, tecnica e privacy | Tools`
                                  : tool.slug === "image-converter"
                                    ? `${tool.name} — JPG, PNG, WebP e AVIF nel browser | Tools`
                                    : tool.slug === "image-compressor"
                                      ? `${tool.name} — riduci peso immagini nel browser | Tools`
                                      : tool.slug === "image-resizer"
                                        ? `${tool.name} — larghezza/altezza e export nel browser | Tools`
                                        : tool.slug === "background-remover"
                                          ? `${tool.name} — PNG trasparente con AI nel browser | Tools`
                                          : tool.slug === "generatore-favicon"
                                            ? `${tool.name} — PNG 16/32/180/192/512 e snippet HTML | Tools`
                                            : tool.slug === "svg-png-converter"
                                              ? `${tool.name} — rasterizza SVG e PNG in wrapper SVG | Tools`
                                              : tool.slug === "csv-to-json"
                                                ? `${tool.name} — tabella CSV in JSON oggetti o array | Tools`
                                                : tool.slug === "pdf-compressor"
                                                  ? `${tool.name} — riduci peso PDF rasterizzando le pagine | Tools`
                                                  : tool.slug === "pdf-merge-split"
                                                    ? `${tool.name} — unisci più PDF o estrai gruppi di pagine | Tools`
                                                    : tool.slug === "ocr-immagine-testo"
                                                      ? `${tool.name} — Tesseract.js nel browser | Tools`
                                                      : tool.slug === "url-encoder-decoder"
                                                        ? `${tool.name} — encodeURIComponent e decodeURIComponent | Tools`
                                                        : tool.slug === "base64-encoder-decoder"
                                                          ? `${tool.name} — UTF-8, standard e URL-safe (RFC 4648) | Tools`
                                                          : tool.slug === "json-formatter-validator"
                                                            ? `${tool.name} — prettify, minify e validazione sintassi | Tools`
                                                            : tool.slug === "cron-builder"
                                                              ? `${tool.name} — espressioni crontab a 5 campi | Tools`
                                                              : tool.slug === "regex-tester"
                                                                ? `${tool.name} — pattern e flag JavaScript (RegExp) | Tools`
                                                                : tool.slug === "password-generator"
                                                                  ? `${tool.name} — generazione crittografica e stimatore robustezza | Tools`
                                                                  : tool.slug === "wireframe-brief-generator"
                                                                    ? `${tool.name} — blocchi landing, priorità P0/P1/P2 | Tools`
                                                                    : tool.slug === "simulatore-roi-seo-locale"
                                                                      ? `${tool.name} — impressioni locali, CTR e valore lead | Tools`
                                                                      : tool.slug === "simulatore-roi-sito-web"
                                                                        ? `${tool.name} — investimento, conversioni e valore medio lead | Tools`
                                                                        : tool.slug === "calcolatore-break-even-digitale"
                                                                          ? `${tool.name} — soglia conversioni e traffico minimo | Tools`
                                                                          : tool.slug === "stimatore-lead-organici"
                                                                            ? `${tool.name} — sessioni, CTR Search Console e CVR | Tools`
                                                                          : tool.slug === "calcolatore-cpc-vs-seo"
                                                                            ? `${tool.name} — CPA paid vs costo lead SEO | Tools`
                                                                              : tool.slug === "calcolatore-conversion-rate-obiettivo"
                                                                                ? `${tool.name} — CVR minimo per target lead | Tools`
                                                                              : tool.slug === "utm-builder"
                                                                                ? `${tool.name} — link con parametri GA4 campaign | Tools`
                                                                              : tool.slug === "social-preview"
                                                                                ? `${tool.name} — anteprima Open Graph e Twitter Card | Tools`
                                                                              : tool.slug === "calcolatore-valore-lead"
                                                                                ? `${tool.name} — valore atteso e contributivo per lead | Tools`
                                                                              : tool.slug === "validatore-feed-rss"
                                                                                ? `${tool.name} — RSS 2.0 e Atom, campi obbligatori | Tools`
                                                                              : tool.slug === "checker-broken-link"
                                                                                ? `${tool.name} — verifica HTTP e redirect | Tools`
                                                                              : tool.slug === "checker-core-web-vitals-base"
                                                                                ? `${tool.name} — soglie LCP, INP e CLS (Google) | Tools`
                                                                              : tool.slug === "generatore-robots-meta-directives"
                                                                                ? `${tool.name} — meta robots e X-Robots-Tag | Tools`
                                                                              : tool.slug === "checker-accessibilita-base"
                                                                                ? `${tool.name} — audit HTML locale WCAG-oriented | Tools`
                                                                              : tool.slug === "color-contrast-checker"
                                                                                ? `${tool.name} — rapporto luminanza WCAG 2.x | Tools`
                                                                                : tool.slug === "palette-generator-brand"
                                                                                  ? `${tool.name} — scala colori e CSS variables | Tools`
                                                                              : tool.slug === "generatore-open-graph-image"
                                                                                ? `${tool.name} — PNG 1200×630 per condivisioni social | Tools`
                                                                              : tool.slug === "minificatore-html-css-js"
                                                                                ? `${tool.name} — compatto HTML, CSS e JS nel browser | Tools`
                                                                              : tool.slug === "markdown-to-html"
                                                                                ? `${tool.name} — CommonMark e GitHub Flavored Markdown | Tools`
                                                                              : tool.slug === "html-to-markdown"
                                                                                ? `${tool.name} — frammento HTML verso Markdown nel browser | Tools`
                                                                              : tool.slug === "convertitore-unita-css"
                                                                                ? `${tool.name} — px, rem, em, vw/vh e assoluti (96px/in) | Tools`
                                                                              : tool.slug === "webhook-tester"
                                                                                ? `${tool.name} — probe HTTP sicuro verso endpoint pubblici | Tools`
                                                                              : tool.slug === "dns-record-checker"
                                                                                ? `${tool.name} — A, MX, TXT, NS e altri record pubblici | Tools`
                                                                              : tool.slug === "analizzatore-log-server"
                                                                                ? `${tool.name} — sintesi stato HTTP percorsi e IP | Tools`
                                                                              : tool.slug === "compressore-video-web"
                                                                                ? `${tool.name} — MP4 e WebM con FFmpeg.wasm nel browser | Tools`
                                                                              : tool.slug === "generatore-privacy-policy-base"
                                                                                ? `${tool.name} — bozza GDPR in italiano | Tools`
                                                                              : tool.slug === "generatore-cookie-banner-copy"
                                                                                ? `${tool.name} — testi banner cookie GDPR (IT) | Tools`
                                                                              : tool.slug === "estimatore-tempo-lettura"
                                                                                ? `${tool.name} — parole al minuto e durata stimata | Tools`
                                                                              : tool.slug === "generatore-redirect-301"
                                                                                ? `${tool.name} — Apache, Nginx e Next.js | Tools`
                                                                          : `${tool.name} | Tools`;
  const description =
    tool.slug === "serp-snippet-preview"
      ? "Simula risultati Google: anteprima desktop e mobile di title, URL e meta description, con suggerimenti su lunghezza e troncamento. Utile per ottimizzare CTR e chiarezza in SERP."
      : tool.slug === "generatore-meta-tag"
        ? "Genera proposte di meta title, meta description e snippet HTML (title, description, Open Graph, Twitter) a partire da keyword, brand e tipo di pagina."
        : tool.slug === "generatore-schema-json-ld"
          ? "Crea JSON-LD valido per WebPage, Article, Organization, LocalBusiness, FAQPage e BreadcrumbList. Copia il JSON o il tag script per migliorare la comprensione semantica in Ricerca Google."
            : tool.slug === "validatore-robots-txt"
              ? "Controlla robots.txt nel browser: righe Direttiva: valore, gruppi User-agent, Allow/Disallow e URL Sitemap; avvisi su sintassi, direttive non standard e dimensione file rispetto ai limiti dei crawler."
              : tool.slug === "generatore-sitemap-xml"
                ? "Crea un sitemap.xml da elenco URL: tag loc con escape XML, opzionalmente lastmod, changefreq e priority. Esporta e carica su Search Console per la discovery delle pagine indicizzabili."
                : tool.slug === "verifica-canonical"
                  ? "Incolla HTML e verifica tutti i link rel canonical: duplicati, href mancanti, URL discordanti rispetto all’URL pubblica e uso consigliato di un solo canonical per pagina."
                  : tool.slug === "analyzer-struttura-heading"
                    ? "Analizza HTML in locale: elenco H1–H6 in ordine, outline indentato, avvisi su salti di livello, più H1 o H1 assente e heading vuoti. Utile per audit on-page e accessibilità."
                    : tool.slug === "keyword-difficulty-estimator"
                      ? "Stima in locale la difficoltà relativa di una keyword: punteggio 0–100, fascia testuale e spiegazione dei fattori (head/long-tail, intento, lunghezza). Nessun scraping SERP: primo screening per prioritizzare query."
                      : tool.slug === "keyword-clustering"
                        ? "Raggruppa un elenco di query in cluster tematici nel browser: similarità tra parole utili (Jaccard), accorpamento per sovrapposizione di frase, etichetta topic e intento stimato (informativo/transazionale/misto). Ideale per mappa contenuti e hub semantici senza SERP API."
                        : tool.slug === "generatore-piano-editoriale"
                          ? "Crea una roadmap contenuti nel browser per più settimane: titoli suggeriti, tipo di formato (guida, lista, how-to…), funnel (consapevolezza→conversione), checklist SEO e export testuale. Opzionale rotazione di keyword focali una per riga; nessuna chiamata a SERP o API."
                          : tool.slug === "content-brief-generator"
                            ? "Genera un content brief SEO per un singolo articolo o landing: varianti titolo, suggerimento meta title e description, outline H2/H3, domande FAQ, angolo di differenziazione e checklist on-page sulla keyword primaria. Elaborazione solo nel browser, senza API."
                            : tool.slug === "generatore-faq-seo"
                              ? "Crea bozze di FAQ SEO nel browser: priorità alle tue long-tail, rotazione di template per intento (informativo, commerciale, transazionale, navigazionale), testi guida per snippet e export in Markdown o JSON-LD FAQPage. Nessun invio dati a server esterni."
                              : tool.slug === "generatore-slug-seo"
                                ? "Genera slug URL puliti nel browser da titoli o headline: minuscolo, rimozione accenti, sostituzione spazi e simboli con trattini e limite di lunghezza configurabile. Utile per blog, knowledge base e landing senza caricare testi su server."
                                : tool.slug === "keyword-density-checker"
                                  ? "Calcola nel browser la densità di una o più keyword o frasi su un testo o HTML: conteggio token, occorrenze esatte, percentuale sul totale o sulle sole parole di contenuto (stopword escluse). Utile per audit copy senza obbligo di percentuali rigide."
                                  : tool.slug === "checker-leggibilita-italiano"
                                    ? "Misura nel browser quanto sia lineare il testo italiano con l’indice Gulpease (lungh. parole/frasi): punteggio 0–100, medie sintattiche e opzione rimozione HTML. Nessun invio a server esterni."
                                    : tool.slug === "generatore-alt-text"
                                      ? "Crea varianti di ALT text descrittivo per immagini: ruolo (hero, prodotto, grafico…), contesto pagina opzionale e limite caratteri. Include snippet HTML, note per immagini decorative e buone pratiche WCAG — tutto nel browser."
                                      : tool.slug === "website-launch-checklist"
                                    ? "Checklist interattiva pre lancio: SEO e indicizzazione, infrastruttura, performance, privacy, analytics, contenuti e monitoraggio. Salvataggio locale nel browser ed export testuale del report per il team."
                                    : tool.slug === "image-converter"
                                      ? "Converti immagini tra JPEG, PNG, WebP e AVIF direttamente nel browser: anteprima, qualità regolabile per i formati lossy e download immediato senza caricare file su server esterni."
                                      : tool.slug === "image-compressor"
                                        ? "Comprimi immagini nel browser con cursore qualità e scelta formato (JPEG, PNG, WebP, AVIF): confronto peso prima/dopo, elaborazione locale senza caricare foto su server terzi."
                                        : tool.slug === "image-resizer"
                                          ? "Ridimensiona immagini nel browser: proporzioni o dimensioni fisse, preset lato lungo e scelta formato (JPEG, PNG, WebP, AVIF). Nessun upload remoto delle foto."
                                          : tool.slug === "background-remover"
                                            ? "Rimuovi lo sfondo dalle immagini nel browser con segmentazione neurale ONNX: elaborazione locale, anteprima su pattern a scacchi e download PNG con trasparenza. Al primo utilizzo vengono scaricati modello e runtime (poi in cache)."
                                            : tool.slug === "generatore-favicon"
                                              ? "Genera set di favicon PNG (16–512 px) da logo o immagine nel browser: ritaglio copri/contieni, anteprima, download multiplo e tag link pronti per il head. Nessun upload remoto."
                                              : tool.slug === "svg-png-converter"
                                                ? "Converti SVG in PNG (scala opzionale) e incapsula PNG/JPEG/WebP in un file SVG con immagine embedded in base64, tutto nel browser senza caricare file su server."
                                                : tool.slug === "csv-to-json"
                                                  ? "Da CSV incollato o file locale a JSON formattato: virgolette e separatori (, ; tab |), prima riga come chiavi oppure righe pure, trim e rilevamento delimitatore. Elaborazione solo nel browser."
                                                  : tool.slug === "pdf-compressor"
                                                    ? "Carica un PDF e ottieni una versione più leggera rasterizzando ogni pagina in JPEG con qualità e scala regolabili. Ideale per scansioni e documenti con molte immagini; elaborazione interamente nel browser."
                                                    : tool.slug === "pdf-merge-split"
                                                      ? "Unisci più PDF in un solo file nell’ordine scelto, oppure estrai gruppi di pagina (uno per pagina o intervalli tipo 1-3, 5, 8-12). Nessun caricamento dei file su server esterni: elaborazione nel browser."
                                                      : tool.slug === "ocr-immagine-testo"
                                                        ? "Carica PNG, JPEG, WebP o altre immagini raster e ottieni il testo con OCR (italiano, inglese o entrambi). Modelli e runtime scaricati al primo uso e messi in cache: tutto avviene nel browser senza upload su server terzi."
                                                        : tool.slug === "url-encoder-decoder"
                                                          ? "Codifica stringhe come componente URI o intero URL con encodeURIComponent/encodeURI e decodifica con decodeURIComponent. Utile per query string, parametri API e debugging; elaborazione locale nel browser."
                                                          : tool.slug === "base64-encoder-decoder"
                                                            ? "Converti testo UTF-8 in Base64 e viceversa nel browser: variante standard o URL-safe (- _), ignorando spazi nell’input. Utile per ispezionare JWT, JSON e payload API senza caricare dati su server esterni."
                                                            : tool.slug === "json-formatter-validator"
                                                              ? "Incolla JSON e valida la sintassi nel browser: formattazione indentata (2 o 4 spazi), versione minificata su una riga e messaggi di errore su testo non valido. Ideale per risposte API, file di config e payload di debug senza upload su server."
                                                              : tool.slug === "cron-builder"
                                                                ? "Componi espressioni cron a 5 campi (minuto ora giorno mese giorno-settimana) con preset, menu a tendina e sintesi in italiano. Incolla stringhe esistenti per validarle e copia il risultato per crontab o scheduler compatibili. Calcolo solo nel browser."
                                                                : tool.slug === "regex-tester"
                                                                  ? "Testa regex nel browser come il motore JavaScript: pattern, flag g/i/m/s/u/y/d/v, elenco match con indici e gruppi, evidenziazione nel testo e copia lista risultati. Ideale per debug di parsing, validatori e ricerche avanzate senza caricare dati su server esterni."
                                                                  : tool.slug === "password-generator"
                                                                    ? "Genera password casuali con crypto.getRandomValues nel browser, con opzioni per caratteri e simboli ed esclusione caratteri ambigui. Valuta la robustezza con una stima di entropia e suggerimenti operativi: nulla viene inviato al server."
                                                                    : tool.slug === "wireframe-brief-generator"
                                                                      ? "Crea nel browser un brief strutturale per wireframe di landing page: ordinamento blocchi hero e sezioni, priorità P0/P1/P2, CTA gerarchiche, note mobile/nav e domande prima dell’UI alta fedeltà. Nessun caricamento contenuti verso API esterne."
                                                                      : tool.slug === "simulatore-roi-seo-locale"
                                                                        ? "Proietta ROI e payback per SEO locale: setup e canone mensile, volume di impressioni o ricerche territoriali, CTR verso sito o scheda, conversione da click a lead e valore economico del contatto. Calcolo nel browser per scenari e budget."
                                                                        : tool.slug === "simulatore-roi-sito-web"
                                                                          ? "Stima ROI e payback combinando investimento progetto, costi operativi, traffico mensile, conversion rate e valore per conversione. Calcolo offline nel browser: utile come scenario prima di decidere scope e KPI."
                                                                          : tool.slug === "calcolatore-break-even-digitale"
                                                                            ? "Calcola nel browser il numero minimo di conversioni mensili (e sessioni alla tua CVR) per coprire costi operativi e quota dell'investimento iniziale ripartita nel tempo. Confronta con traffico e tasso di conversione stimati per vedere se sei sopra o sotto la soglia di break-even."
                                                                            : tool.slug === "stimatore-lead-organici"
                                                                              ? "Stima lead qualificati da traffico SEO in locale: inserisci click o sessioni organiche mensili, oppure impressioni Google Search Console con CTR medio, e applica il conversion rate click → lead. Opzione valore medio lead per una pipeline mensile indicativa; elaborazione solo nel browser."
                                                                            : tool.slug === "calcolatore-cpc-vs-seo"
                                                                              ? "Confronta nell’ipotesi dello stesso CVR quanto costa in media una conversione da traffico pagato rispetto a una attribuita al costo ricorrente del SEO sul traffico organico stimato."
                                                                              : tool.slug === "calcolatore-conversion-rate-obiettivo"
                                                                                ? "Calcola il conversion rate minimo richiesto quando conosci sessioni o click mensili e quanti lead (o conversioni macro) vuoi ottenere. Opzione CVR attuale per gap e traffico teorico necessario; elaborazione nel browser."
                                                                              : tool.slug === "utm-builder"
                                                                                  ? "Costruisci URL di destinazione con parametri utm_* per Google Analytics: source, medium, campaign obbligatori; opzionali term, content e utm_id. Anteprima, copia URL completa o solo query — tutto nel browser senza caricare gli indirizzi su server."
                                                                              : tool.slug === "social-preview"
                                                                                  ? "Anteprima locale delle card di condivisione: titoli, descrizioni e immagini come nei meta og:* e twitter:*. Incolla HTML del head per estrarre i tag oppure modifica i campi manualmente; copia snippet meta e riepilogo lunghezze."
                                                                                : tool.slug === "calcolatore-valore-lead"
                                                                                  ? "Stima nel browser il valore economico atteso di un lead: ticket medio × tasso di chiusura, opzione margine lordo per contributo e confronto con CPL per priorità tra canali e budget."
                                                                              : tool.slug === "validatore-feed-rss"
                                                                                ? "Analisi struttura RSS 2.0 e Atom: channel/feed, item/entry, campi obbligatori e avvisi su guid/link. Markup elaborato nel browser; da URL pubblico http/https lo scarichiamo in sicurezza sul server senza SSRF verso IP privati o localhost."
                                                                              : tool.slug === "checker-broken-link"
                                                                                ? "Controlla fino a 40 URL pubblici http/https con richieste HEAD (fallback GET leggero) dal server: codici di stato, redirect e note su blocchi WAF. Opzione estrazione href/src da HTML con URL base per link relativi — host locali e IP privati sono esclusi."
                                                                              : tool.slug === "checker-core-web-vitals-base"
                                                                                ? "Valuta nel browser LCP (secondi), INP o FID (millisecondi) e CLS rispetto alle fasce ufficiali good, da migliorare e poor. Import opzionale da JSON Lighthouse: nessun fetch remoto verso il sito misurato."
                                                                              : tool.slug === "generatore-robots-meta-directives"
                                                                                ? "Composer locale per meta name=\"robots\" e googlebot: index/noindex, follow/nofollow, noarchive, nosnippet, limiti snippet e anteprima immagini/video, unavailable_after e copia della riga X-Robots-Tag. Utile per staging, landing promozionali e pagine da deindicizzare senza errori di sintassi."
                                                                              : tool.slug === "checker-accessibilita-base"
                                                                                ? "Analizza nel browser HTML incollato: lang e title, viewport, immagini con alt, nomi accessibili di link e pulsanti, label su input/select/textarea, titoli iframe, ID duplicati e note su landmark main e tabelle. Euristiche base per primo screening prima di audit completi."
                                                                              : tool.slug === "color-contrast-checker"
                                                                                ? "Calcola nel browser il rapporto di contrasto WCAG tra due colori (testo/sfondo) da hex, rgb/hsl: luminanza relativa sRGB, esito AA/AAA per testo normale e grande, anteprima e report copiabile. Con alpha viene applicata composizione su bianco per la stima."
                                                                                : tool.slug === "palette-generator-brand"
                                                                                  ? "Genera nel browser una palette per brand: scala primaria 50–900 attorno al seme, accento (complementare, analogo o split), neutri tintati, stati semantici e blocco :root con variabili CSS — senza caricare colori su server."
                                                                              : tool.slug === "generatore-open-graph-image"
                                                                                ? "Crea un'immagine Open Graph 1200×630 nel browser: titolo, sottotitolo, gradiente, colori testo/accento, logo opzionale in angolo, export PNG e snippet meta og:image / twitter:image da adattare dopo l’upload su hosting HTTPS."
                                                                              : tool.slug === "minificatore-html-css-js"
                                                                                ? "Minifica HTML, CSS e JavaScript in locale: rimozione commenti (anche dentro contesti sensibili per JS), compressione spazi tra tag HTML e snippet più compatti senza caricare codice su server esterni."
                                                                              : tool.slug === "markdown-to-html"
                                                                                ? "Converti Markdown in HTML nel browser con pipeline remark e GitHub Flavored Markdown: titoli, liste, tabelle, task list, codice, link e note — ideale per readme, post e migrazioni verso CMS; anteprima in iframe sandbox senza script."
                                                                              : tool.slug === "html-to-markdown"
                                                                                ? "Trasforma frammenti HTML in Markdown direttamente nel browser con DOMParser: titoli, paragrafi, link, enfasi, blocchi di codice, citazioni, liste (anche con checkbox) e tabelle in stile GFM. Nessun upload dei contenuti verso server esterni."
                                                                              : tool.slug === "convertitore-unita-css"
                                                                                ? "Converti lunghezze CSS nel browser: pixel, punti, pica, pollici, cm, mm, rem, em, unità viewport (vw, vh, vmin, vmax) e percentuali rispetto a un riferimento in px. Modello standard 96px per pollice; font-size di root e genitore configurabili."
                                                                              : tool.slug === "webhook-tester"
                                                                                ? "Esegui richieste REST verso URL https pubblici dal server dell’app: metodo, header e corpo configurabili, blocco SSRF verso localhost e IP privati,eco di stato HTTP e anteprima testuale della risposta senza inseguimento automatico dei redirect."
                                                                              : tool.slug === "dns-record-checker"
                                                                                ? "Consulta record DNS pubblici dal resolver del server: A e AAAA, scambi MX, NS autoritativi, TXT (SPF/DKIM/DMARC), CNAME, SOA e CAA. Esclusi localhost e IP privati; ideale per verifiche rapide post-config senza dig o terminale."
                                                                              : tool.slug === "analizzatore-log-server"
                                                                                ? "Incolla righe dal log accessi (combined Apache/Nginx o JSON minimale): il browser conta codici stato, metodi GET/POST e aggrega percorsi e IP per trovare spike 4xx/5xx e URL più battuti senza caricare raw log sul server dell’app."
                                                                              : tool.slug === "compressore-video-web"
                                                                                ? "Carica un video MP4, WebM, MOV o MKV: FFmpeg.wasm ricodifica in locale in MP4 (H.264+AAC) o WebM (VP9+Opus) con CRF e ridimensionamento opzionale. Ideale per alleggerire clip per il web senza upload su server terzi."
                                                                              : tool.slug === "generatore-privacy-policy-base"
                                                                                ? "Compila titolare, URL del sito, email privacy e trattamenti selezionati: ottieni una bozza strutturata con avviso legale e sezioni su finalità e base giuridiche, conservazione e diritti. Calcolo offline nel browser: integra sempre dati contrattuali, cookie banner e DPIA quando servono."
                                                                              : tool.slug === "generatore-cookie-banner-copy"
                                                                                ? "Genera nel browser titolo, testo principale, elenco categorie cookie, etichette pulsanti (accetta, rifiuta non necessari, personalizza) e link a cookie policy / privacy. Tre toni (neutro, formale, cordiale) e note su binding CMP — disclaimer: non sostituisce consulenza legale."
                                                                              : tool.slug === "estimatore-tempo-lettura"
                                                                                ? "Stima tempo di lettura nel browser: conteggio parole Unicode con opzione rimozione HTML, velocità regolabile (WPM) e output in secondi/minuti più etichetta tipo blog (~N min di lettura). Nessun caricamento del testo su server esterni."
                                                                              : tool.slug === "generatore-redirect-301"
                                                                                ? "Trasforma un elenco locale di URL o percorsi sorgente e destinazione in direttive Redirect 301 Apache, blocchi location + return per Nginx e array redirects permanente compatibile Next.js/Vercel. Utile dopo cambio slug, HTTPS o dominio prima del go-live."
                                                                            : `${tool.summary} ${tool.intent}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = toolsBySlug.get(slug);

  if (!tool) {
    notFound();
  }

  const isAuditTool = tool.slug === "audit-seo-on-page-rapido";
  const isTitleCheckerTool = tool.slug === "checker-title-description";
  const isSerpSnippetTool = tool.slug === "serp-snippet-preview";
  const isMetaTagGenerator = tool.slug === "generatore-meta-tag";
  const isSchemaJsonLdGenerator = tool.slug === "generatore-schema-json-ld";
  const isValidatoreRobotsTxt = tool.slug === "validatore-robots-txt";
  const isGeneratoreSitemapXml = tool.slug === "generatore-sitemap-xml";
  const isVerificaCanonical = tool.slug === "verifica-canonical";
  const isAnalyzerStrutturaHeading = tool.slug === "analyzer-struttura-heading";
  const isKeywordDifficultyEstimator = tool.slug === "keyword-difficulty-estimator";
  const isKeywordClustering = tool.slug === "keyword-clustering";
  const isGeneratorePianoEditoriale = tool.slug === "generatore-piano-editoriale";
  const isContentBriefGenerator = tool.slug === "content-brief-generator";
  const isGeneratoreFaqSeo = tool.slug === "generatore-faq-seo";
  const isGeneratoreSlugSeo = tool.slug === "generatore-slug-seo";
  const isKeywordDensityChecker = tool.slug === "keyword-density-checker";
  const isCheckerLeggibilitaItaliano = tool.slug === "checker-leggibilita-italiano";
  const isGeneratoreAltText = tool.slug === "generatore-alt-text";
  const isWebsiteLaunchChecklist = tool.slug === "website-launch-checklist";
  const isImageConverter = tool.slug === "image-converter";
  const isImageCompressor = tool.slug === "image-compressor";
  const isImageResizer = tool.slug === "image-resizer";
  const isBackgroundRemover = tool.slug === "background-remover";
  const isGeneratoreFavicon = tool.slug === "generatore-favicon";
  const isSvgPngConverter = tool.slug === "svg-png-converter";
  const isCsvToJson = tool.slug === "csv-to-json";
  const isPdfCompressor = tool.slug === "pdf-compressor";
  const isPdfMergeSplit = tool.slug === "pdf-merge-split";
  const isOcrImmagineTesto = tool.slug === "ocr-immagine-testo";
  const isUrlEncoderDecoder = tool.slug === "url-encoder-decoder";
  const isBase64EncoderDecoder = tool.slug === "base64-encoder-decoder";
  const isJsonFormatterValidator = tool.slug === "json-formatter-validator";
  const isCronBuilder = tool.slug === "cron-builder";
  const isRegexTester = tool.slug === "regex-tester";
  const isPasswordGenerator = tool.slug === "password-generator";
  const isWireframeBriefGenerator = tool.slug === "wireframe-brief-generator";
  const isSimulatoreRoiSeoLocale = tool.slug === "simulatore-roi-seo-locale";
  const isSimulatoreRoiSitoWeb = tool.slug === "simulatore-roi-sito-web";
  const isCalcolatoreBreakEvenDigitale = tool.slug === "calcolatore-break-even-digitale";
  const isStimatoreLeadOrganici = tool.slug === "stimatore-lead-organici";
  const isCalcolatoreCpcVsSeo = tool.slug === "calcolatore-cpc-vs-seo";
  const isCalcolatoreConversionRateObiettivo = tool.slug === "calcolatore-conversion-rate-obiettivo";
  const isUtmBuilder = tool.slug === "utm-builder";
  const isSocialPreview = tool.slug === "social-preview";
  const isCalcolatoreValoreLead = tool.slug === "calcolatore-valore-lead";
  const isCheckerBrokenLink = tool.slug === "checker-broken-link";
  const isValidatoreFeedRss = tool.slug === "validatore-feed-rss";
  const isCheckerCoreWebVitalsBase = tool.slug === "checker-core-web-vitals-base";
  const isGeneratoreRedirect301 = tool.slug === "generatore-redirect-301";
  const isGeneratoreRobotsMetaDirectives = tool.slug === "generatore-robots-meta-directives";
  const isCheckerAccessibilitaBase = tool.slug === "checker-accessibilita-base";
  const isColorContrastChecker = tool.slug === "color-contrast-checker";
  const isPaletteGeneratorBrand = tool.slug === "palette-generator-brand";
  const isGeneratoreOpenGraphImage = tool.slug === "generatore-open-graph-image";
  const isMinificatoreHtmlCssJs = tool.slug === "minificatore-html-css-js";
  const isMarkdownToHtml = tool.slug === "markdown-to-html";
  const isHtmlToMarkdown = tool.slug === "html-to-markdown";
  const isConvertitoreUnitaCss = tool.slug === "convertitore-unita-css";
  const isWebhookTester = tool.slug === "webhook-tester";
  const isDnsRecordChecker = tool.slug === "dns-record-checker";
  const isAnalizzatoreLogServer = tool.slug === "analizzatore-log-server";
  const isCompressoreVideoWeb = tool.slug === "compressore-video-web";
  const isGeneratorePrivacyPolicyBase = tool.slug === "generatore-privacy-policy-base";
  const isGeneratoreCookieBannerCopy = tool.slug === "generatore-cookie-banner-copy";
  const isEstimatoreTempoLettura = tool.slug === "estimatore-tempo-lettura";
  const jsonLdDescription =
    tool.slug === "serp-snippet-preview"
      ? "Anteprima snippet Google desktop e mobile: title, URL e meta description con indicazioni su lunghezza caratteri per migliorare CTR organico."
      : tool.slug === "generatore-meta-tag"
        ? "Tool online per generare meta title, meta description e markup HTML di base per SEO on-page e condivisioni social."
        : tool.slug === "generatore-schema-json-ld"
          ? "Generatore schema.org in JSON-LD per pagine web, articoli, organizzazioni, attività locali, FAQ e breadcrumb."
            : tool.slug === "validatore-robots-txt"
              ? "Tool online per validare sintassi e direttive principali di robots.txt (User-agent, Allow, Disallow, Sitemap) con analisi locale nel browser."
              : tool.slug === "generatore-sitemap-xml"
                ? "Generatore sitemap.xml online: costruisce il file da URL assoluti http/https con opzioni lastmod, changefreq e priority secondo il protocollo sitemaps.org."
                : tool.slug === "verifica-canonical"
                  ? "Tool online che analizza l’HTML in locale nel browser elencando i canonical, normalizza gli URL e segnala conflitti, duplicati o href non validi con confronto opzionale all’URL pubblica."
                  : tool.slug === "analyzer-struttura-heading"
                    ? "Analyzer heading SEO: mappa H1–H6 e gerarchia dei titoli nel markup con outline visivo e segnalazioni su struttura semantica della pagina."
                    : tool.slug === "keyword-difficulty-estimator"
                      ? "Estimator keyword difficulty: calcolo euristico nel browser con punteggio, fascia competitiva e dettaglio fattori per confrontare query prima di ricerche avanzate."
                      : tool.slug === "keyword-clustering"
                        ? "Tool keyword clustering nel browser: union-find su similarità token e bonus di frase, cluster ordinati per dimensione, intento stimato per gruppo e export testuale del report."
                        : tool.slug === "generatore-piano-editoriale"
                          ? "Generatore piano editoriale SEO nel browser: settimane, ritmo pubblicazione, preset niche, rotazione keyword opzionale, slot con formato contenuto e fase funnel, checklist on-page ed export Markdown testuale."
                          : tool.slug === "content-brief-generator"
                            ? "Generatore content brief SEO per una pagina: titoli meta e H1, outline struttura, lista domande e idee linking interno in base al tipo pagina e all’intent stimato senza caricare contenuti verso API esterne."
                            : tool.slug === "generatore-faq-seo"
                              ? "Generatore FAQ SEO offline: coppie domanda/risposta per People Also Ask e sezioni accordion, note per intento di ricerca e markup JSON-LD FAQPage pronto da adattare alla URL canonica."
                              : tool.slug === "generatore-slug-seo"
                                ? "Generatore slug SEO-friendly: normalizzazione Unicode, trattini singoli, limite lunghezza e anteprima percorso con prefisso — calcolo locale nel browser."
                                : tool.slug === "keyword-density-checker"
                                  ? "Checker densità keyword in locale: tokenizzazione Unicode, match di frasi multi-parola, opzioni HTML e denominatore con stopword per stimare ripetizione nel copy."
                                  : tool.slug === "checker-leggibilita-italiano"
                                    ? "Checker leggibilità italiano con Gulpease nel browser: punteggio 0–100, conteggio frasi stimato sulla punteggiatura e statistiche su parole e lettere, ideale per copy e contenuti UX."
                                    : tool.slug === "generatore-alt-text"
                                      ? "Generatore ALT text immagine nel browser: più varianti descrittive da soggetto visivo e contesto, ruolo immagine, hint da nome file, snippet img con attributo alt e linee guida per asset decorativi senza keyword stuffing."
                                      : tool.slug === "website-launch-checklist"
                                    ? "Checklist di website launch nel browser: voci organizzate per area, avanzamento, persistenza locale e copia report testuale pre go-live."
                                    : tool.slug === "image-converter"
                                      ? "Converter immagini client-side: transcodifica tra JPEG, PNG, WebP e AVIF con canvas nel browser, anteprima e controllo qualità per formati compressi."
                                      : tool.slug === "image-compressor"
                                        ? "Strumento di compressione immagini nel browser: ricodifica con qualità regolabile, confronto dimensioni originale vs output e download immediato, senza upload remoto."
                                        : tool.slug === "image-resizer"
                                          ? "Ridimensionamento immagini client-side: dimensioni massime rispetto alle proporzioni o stretch, canvas nel browser ed export in più formati con controllo qualità."
                                          : tool.slug === "background-remover"
                                            ? "Rimozione sfondo immagini in locale: libreria IMG.LY con ONNX Runtime Web, modelli isnet quantizzati o fp16, output PNG alpha per e-commerce e social."
                                            : tool.slug === "generatore-favicon"
                                              ? "Generatore favicon online: export PNG per browser, touch icon Apple e icone PWA da un’unica immagine, più snippet HTML per collegare i file nel sito."
                                              : tool.slug === "svg-png-converter"
                                                ? "Converter SVG/PNG nel browser: esportazione PNG da markup vettoriale con scala e SVG wrapper raster per workflow design (nessun upload remoto)."
                                                : tool.slug === "csv-to-json"
                                                  ? "Converter CSV in JSON nel browser: parsing con campi quotati RFC 4180, header opzionali ed export leggibile — ideale per API e dataset leggere."
                                                  : tool.slug === "pdf-compressor"
                                                    ? "Compressore PDF client-side: rasterizza le pagine con PDF.js e ricodifica in JPEG tramite jsPDF, con controllo qualità e risoluzione senza upload remoto."
                                                    : tool.slug === "pdf-merge-split"
                                                      ? "Unisci o dividi PDF nel browser con pdf-lib: merge multipli file nell’ordine desiderato, split per pagina singola o per intervalli 1-based separati da virgole senza caricare documenti su server."
                                                      : tool.slug === "ocr-immagine-testo"
                                                        ? "OCR immagine con Tesseract.js nel browser: estrazione testo locale, scelta lingua italiano/inglese e indicazione di confidenza; ideale per screenshot e documenti scansionati."
                                                        : tool.slug === "url-encoder-decoder"
                                                          ? "Encoder e decoder URL nel browser: encodeURIComponent per segmenti e query, encodeURI per stringhe con separatori originali, decodeURIComponent con messaggi su escape non validi."
                                                          : tool.slug === "base64-encoder-decoder"
                                                            ? "Encoder e decoder Base64 UTF-8 in locale: output standard o URL-safe, normalizzazione whitespace in decodifica e messaggi chiari su caratteri o sequenze non valide."
                                                            : tool.slug === "json-formatter-validator"
                                                              ? "Formatter e validator JSON online: prettify con indentazione 2 o 4 spazi, minify compatto e messaggi di errore nativi su JSON non valido, elaborazione solo nel browser."
                                                              : tool.slug === "cron-builder"
                                                                ? "Builder di espressioni cron nel browser: preset comuni, selezione per campo, descrizione leggibile in italiano e validazione di stringhe incollate per ridurre errori su job pianificati."
                                                                : tool.slug === "regex-tester"
                                                                  ? "Regex tester online con motore ECMAScript: compilazione pattern, flag opzionali, match con indici e gruppi catturati o nominati, anteprima testo con highlight e export testuale della lista match. Calcolo locale nel browser."
                                                                  : tool.slug === "password-generator"
                                                                    ? "Generatore password online nel browser: CPRNG (crypto.getRandomValues), set di caratteri configurabili, esclusione simboli ambigui e sezione valutazione con stima entropia e checklist di miglioramento — senza upload verso server."
                                                                    : tool.slug === "wireframe-brief-generator"
                                                                      ? "Wireframe brief nel browser: sezioni ordinate con priorità, hero/fold checklist, navigazione suggerita, mappa CTA e note form/trust/mobile per handoff UX-prodotto senza caricare contenuti remoti."
                                                                      : tool.slug === "simulatore-roi-seo-locale"
                                                                        ? "Simulatore ROI SEO locale nel browser: funnel impressioni o ricerche di prossimità, CTR, click, lead e valore contatto, con costi di setup e canone e stima payback sull’investimento iniziale oltre a export testuale del report."
                                                                        : tool.slug === "simulatore-roi-sito-web"
                                                                          ? "Simulatore ROI sito web offline: progetto più operatività su orizzonte definito vs ricavi attribuibili a sessioni e conversion rate, con stima payback sull’investimento iniziale e export testuale del report."
                                                                          : tool.slug === "calcolatore-break-even-digitale"
                                                                            ? "Calcolatore break-even digitale nel browser: carico fisso mensile da operatività e riparto investimento iniziale, soglia conversioni, sessioni minime alla CVR impostata e confronto con scenario trafficato — export testuale del report."
                                                                            : tool.slug === "stimatore-lead-organici"
                                                                              ? "Stimatore lead organici offline: funnel click o sessioni mensili (o impressioni × CTR) moltiplicato per conversion rate verso lead, con fascia di sensibilità sul CVR e stima opzionale del valore pipeline mensile; copy report negli appunti."
                                                                            : tool.slug === "calcolatore-cpc-vs-seo"
                                                                              ? "Calcolatore CPC vs SEO offline: CPA mensile pubblicità (budget e CPC medio) confrontato al CPA attribuito all’investimento SEO rispetto ai click organici stimati; contributi netti per canale e combinato sullo stesso CVR e valore per conversione."
                                                                              : tool.slug === "calcolatore-conversion-rate-obiettivo"
                                                                                ? "Calcolatore conversion rate obiettivo offline: CVR richiesto sul traffico mensile per raggiungere un numero target di lead, confronto opzionale con CVR attuale (gap e sessioni teoriche necessarie); export testuale del report nel browser."
                                                                                : tool.slug === "utm-builder"
                                                                                  ? "UTM builder offline: parametri GA4-compatible (utm_source, utm_medium, utm_campaign e opzionali term, content, utm_id) su URL HTTPS con salvaguardia parametri precedenti dove non in conflitto; copia URL o sola query per annunci e newsletter."
                                                                                : tool.slug === "social-preview"
                                                                                  ? "Social preview tool offline: estrazione meta og:title/description/image/url/site_name e twitter:card/title/description/image da markup incollato, anteprima approssimativa card tipo Meta e Twitter/X e export snippet HTML — elaborazione nel browser senza fetch remoti."
                                                                                : tool.slug === "calcolatore-valore-lead"
                                                                                  ? "Calcolatore valore lead nel browser: valore atteso di fatturato per lead da ticket medio e tasso lead→cliente, contributo marginale opzionale e confronto con CPL per valutare redditività e priorità tra canali."
                                                                              : tool.slug === "validatore-feed-rss"
                                                                                ? "Validatore feed RSS/Atom: sintesi dei campi esposti sul channel o feed ed elenco alert su item/entry, con markup analizzabile in locale o download remoto pubblico sicuro tramite endpoint dedicato nel progetto Next.js."
                                                                              : tool.slug === "checker-broken-link"
                                                                                ? "Checker link rotti online: probe HEAD/GET server-side su URL pubblici, gestione redirect, estrazione link da markup HTML con risoluzione URL relativi tramite base URL e export tabellare copiabile."
                                                                              : tool.slug === "checker-core-web-vitals-base"
                                                                                ? "Checker Core Web Vitals base: classifica locale delle metriche LCP, INP (o FID legacy) e CLS secondo le soglie Google, con estrazione opzionale da export JSON Lighthouse e report testuale copiabile."
                                                                              : tool.slug === "generatore-robots-meta-directives"
                                                                                ? "Generatore meta robots online nel browser: direttive comma-separated per meta robots e opzionalmente googlebot, più esempio X-Robots-Tag per header HTTP; note su combinazioni ridondanti o ambigue."
                                                                              : tool.slug === "checker-accessibilita-base"
                                                                                ? "Checker accessibilità base online nel browser: controlli markup su alt immagini, associazioni label, nomi link e pulsanti, titoli iframe e univocità ID secondo linee guida WCAG-oriented."
                                                                              : tool.slug === "color-contrast-checker"
                                                                                ? "Color contrast checker online nel browser: calcolo rapporto WCAG da colori espresso in hex/rgb/hsl, soglie AA e AAA per testo normale e grande, luminanza dopo flatten alpha su bianco e export testuale del report."
                                                                                : tool.slug === "palette-generator-brand"
                                                                                  ? "Generatore palette brand online nel browser: colori armonici da un seme con mood vibrante/soft/deep, strategia accento, scala primaria, neutri e semantica più export variabili CSS per temi e design system."
                                                                              : tool.slug === "generatore-open-graph-image"
                                                                                ? "Generatore immagine Open Graph offline: canvas 1200×630 con testo wrappato, gradiente di sfondo, barra accento, logo opzionale, download PNG locale e snippet meta og:image con width/height e twitter:card summary_large_image."
                                                                              : tool.slug === "minificatore-html-css-js"
                                                                                ? "Minificatore HTML/CSS/JS nel browser: rimozione commenti e riduzione whitespace per markup, fogli di stile e script incollati, con statistiche dimensione prima/dopo e export copiabile senza dipendenze server-side."
                                                                              : tool.slug === "markdown-to-html"
                                                                                ? "Convertitore Markdown verso HTML offline: remark con GFM per tabelle e task list, output frammento copiabile e anteprima statica in iframe sandbox — senza caricare il sorgente su servizi esterni."
                                                                              : tool.slug === "html-to-markdown"
                                                                                ? "Convertitore HTML verso Markdown offline: serializzazione tramite DOMParser con supporto a titoli, paragrafi, link, codice, liste, tabelle e citazioni orientate a workflow editoriali e readme — tutto nel browser."
                                                                              : tool.slug === "convertitore-unita-css"
                                                                                ? "Convertitore unità CSS online: trasformazione tra px, rem, em, pt, pc, in, cm, mm, viewport e percentuali con riferimenti tipografici e contenitore configurabili, calcolo locale nel browser."
                                                                              : tool.slug === "webhook-tester"
                                                                                ? "Webhook tester sicuro sul server Next.js: invio configurabile GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS verso destinazioni pubbliche http/https con validazione DNS anti-SSRF, timeout e preview di headers e body in risposta."
                                                                              : tool.slug === "dns-record-checker"
                                                                                ? "DNS record checker online: risoluzione lato server per A/AAAA, MX, TXT, NS, CNAME, SOA e CAA con limiti anti-abuso e host solo pubblici; report tabellare e copia testo per audit email e zona DNS."
                                                                              : tool.slug === "analizzatore-log-server"
                                                                                ? "Analizzatore access log offline: parsing regex per righe combinato Apache/Nginx più JSON con method/path/status, aggregazioni top percorsi e IP, bande HTTP e copia report testuale — tutto lato browser."
                                                                              : tool.slug === "compressore-video-web"
                                                                                ? "Compressore video nel browser con FFmpeg.wasm: export MP4 H.264 o WebM VP9, controllo CRF, scala larghezza massima e download del file compresso senza caricamento su backend."
                                                                              : tool.slug === "generatore-privacy-policy-base"
                                                                                ? "Generatore Privacy Policy GDPR base italiano offline: modulo titolare, contatti privacy, trattamenti e export Markdown o HTML-lite con disclaimer obbligatorio di revisione professionale prima della pubblicazione."
                                                                              : tool.slug === "generatore-cookie-banner-copy"
                                                                                ? "Generatore copy cookie banner italiano offline: headline e body primo livello, categorie sintetiche, etichette pulsanti coerenti con CMP, snippet HTML dialog accessibile e export Markdown — tutto nel browser senza API."
                                                                              : tool.slug === "estimatore-tempo-lettura"
                                                                                ? "Estimatore tempo di lettura online nel browser: token parole allineati agli altri tool copy, WPM configurabile per italiano o lingue dense, strip HTML opzionale e export testuale del report per redazione e CMS."
                                                                              : tool.slug === "generatore-redirect-301"
                                                                                ? "Generatore redirect 301 offline: parsing di coppie vecchio→nuovo con più separatori, output Redirect Apache, blocchi Nginx location = e JSON permanent per redirects Vercel/Next senza caricare liste su API esterne."
                                                                            : `${tool.summary} ${tool.intent}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: jsonLdDescription,
    url: `${siteConfig.url}/tools/${tool.slug}`,
    provider: {
      "@type": "Person",
      name: siteConfig.personName,
      url: siteConfig.url,
    },
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-14 md:px-10">
      <Link
        href="/tools"
        className="inline-flex rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900"
      >
        Torna all&apos;indice tools
      </Link>

      <article className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs uppercase tracking-wide text-zinc-500">{toolCategoryLabels[tool.category]}</p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          {tool.name}
        </h1>
        <p className="mt-4 text-zinc-700">{tool.summary}</p>
        <p className="mt-2 text-zinc-600">
          <strong>Obiettivo:</strong> {tool.intent}
        </p>

        {isAuditTool ? (
          <ToolAuditSeoOnPage />
        ) : isTitleCheckerTool ? (
          <ToolCheckerTitleDescription />
        ) : isSerpSnippetTool ? (
          <ToolSerpSnippetPreview />
        ) : isMetaTagGenerator ? (
          <ToolGeneratoreMetaTag />
        ) : isSchemaJsonLdGenerator ? (
          <ToolGeneratoreSchemaJsonLd />
        ) : isValidatoreRobotsTxt ? (
          <ToolValidatoreRobotsTxt />
        ) : isGeneratoreSitemapXml ? (
          <ToolGeneratoreSitemapXml />
        ) : isVerificaCanonical ? (
          <ToolVerificaCanonical />
        ) : isAnalyzerStrutturaHeading ? (
          <ToolAnalyzerStrutturaHeading />
        ) : isKeywordDifficultyEstimator ? (
          <ToolKeywordDifficultyEstimator />
        ) : isKeywordClustering ? (
          <ToolKeywordClustering />
        ) : isGeneratorePianoEditoriale ? (
          <ToolGeneratorePianoEditoriale />
        ) : isContentBriefGenerator ? (
          <ToolContentBriefGenerator />
        ) : isGeneratoreFaqSeo ? (
          <ToolGeneratoreFaqSeo />
        ) : isGeneratoreSlugSeo ? (
          <ToolGeneratoreSlugSeo />
        ) : isKeywordDensityChecker ? (
          <ToolKeywordDensityChecker />
        ) : isCheckerLeggibilitaItaliano ? (
          <ToolCheckerLeggibilitaItaliano />
        ) : isGeneratoreAltText ? (
          <ToolGeneratoreAltText />
        ) : isWebsiteLaunchChecklist ? (
          <ToolWebsiteLaunchChecklist />
        ) : isImageConverter ? (
          <ToolImageConverter />
        ) : isImageCompressor ? (
          <ToolImageCompressor />
        ) : isImageResizer ? (
          <ToolImageResizer />
        ) : isBackgroundRemover ? (
          <ToolBackgroundRemover />
        ) : isGeneratoreFavicon ? (
          <ToolGeneratoreFavicon />
        ) : isSvgPngConverter ? (
          <ToolSvgPngConverter />
        ) : isCsvToJson ? (
          <ToolCsvToJson />
        ) : isPdfCompressor ? (
          <ToolPdfCompressor />
        ) : isPdfMergeSplit ? (
          <ToolPdfMergeSplit />
        ) : isOcrImmagineTesto ? (
          <ToolOcrImmagineTesto />
        ) : isUrlEncoderDecoder ? (
          <ToolUrlEncoderDecoder />
        ) : isJsonFormatterValidator ? (
          <ToolJsonFormatterValidator />
        ) : isCronBuilder ? (
          <ToolCronBuilder />
        ) : isRegexTester ? (
          <ToolRegexTester />
        ) : isPasswordGenerator ? (
          <ToolPasswordGenerator />
        ) : isWireframeBriefGenerator ? (
          <ToolWireframeBriefGenerator />
        ) : isSimulatoreRoiSeoLocale ? (
          <ToolSimulatoreRoiSeoLocale />
        ) : isSimulatoreRoiSitoWeb ? (
          <ToolSimulatoreRoiSitoWeb />
        ) : isCalcolatoreBreakEvenDigitale ? (
          <ToolCalcolatoreBreakEvenDigitale />
        ) : isStimatoreLeadOrganici ? (
          <ToolStimatoreLeadOrganici />
        ) : isCalcolatoreCpcVsSeo ? (
          <ToolCalcolatoreCpcVsSeo />
        ) : isCalcolatoreConversionRateObiettivo ? (
          <ToolCalcolatoreConversionRateObiettivo />
        ) : isCalcolatoreValoreLead ? (
          <ToolCalcolatoreValoreLead />
        ) : isCheckerBrokenLink ? (
          <ToolCheckerBrokenLink />
        ) : isValidatoreFeedRss ? (
          <ToolValidatoreFeedRss />
        ) : isCheckerCoreWebVitalsBase ? (
          <ToolCheckerCoreWebVitalsBase />
        ) : isGeneratoreRedirect301 ? (
          <ToolGeneratoreRedirect301 />
        ) : isGeneratoreRobotsMetaDirectives ? (
          <ToolGeneratoreRobotsMetaDirectives />
        ) : isCheckerAccessibilitaBase ? (
          <ToolCheckerAccessibilitaBase />
        ) : isColorContrastChecker ? (
          <ToolColorContrastChecker />
        ) : isPaletteGeneratorBrand ? (
          <ToolPaletteGeneratorBrand />
        ) : isGeneratoreOpenGraphImage ? (
          <ToolGeneratoreOpenGraphImage />
        ) : isMarkdownToHtml ? (
          <ToolMarkdownToHtml />
        ) : isHtmlToMarkdown ? (
          <ToolHtmlToMarkdown />
        ) : isWebhookTester ? (
          <ToolWebhookTester />
        ) : isCompressoreVideoWeb ? (
          <ToolCompressoreVideoWeb />
        ) : isGeneratorePrivacyPolicyBase ? (
          <ToolGeneratorePrivacyPolicyBase />
        ) : isGeneratoreCookieBannerCopy ? (
          <ToolGeneratoreCookieBannerCopy />
        ) : isEstimatoreTempoLettura ? (
          <ToolEstimatoreTempoLettura />
        ) : isAnalizzatoreLogServer ? (
          <ToolAnalizzatoreLogServer />
        ) : isDnsRecordChecker ? (
          <ToolDnsRecordChecker />
        ) : isConvertitoreUnitaCss ? (
          <ToolConvertitoreUnitaCss />
        ) : isMinificatoreHtmlCssJs ? (
          <ToolMinificatoreHtmlCssJs />
        ) : isUtmBuilder ? (
          <ToolUtmBuilder />
        ) : isSocialPreview ? (
          <ToolSocialPreview />
        ) : isBase64EncoderDecoder ? (
          <ToolBase64EncoderDecoder />
        ) : (
          <section className="mt-8 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-5">
            <p className="text-sm font-medium text-zinc-900">Interfaccia tool in sviluppo</p>
            <p className="mt-2 text-sm text-zinc-600">
              La pagina è già pronta per indicizzazione e linking interno. Nel prossimo step implementiamo la
              logica operativa del tool.
            </p>
          </section>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            Vedi altri tools
          </Link>
          <Link
            href="/#contatti"
            className="rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm text-white transition hover:bg-zinc-800"
          >
            Richiedi un tool custom
          </Link>
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
