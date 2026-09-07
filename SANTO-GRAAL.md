# SANTO GRAAL — jaderweb (`portfoliovercel`)

**Questo file è la fonte di verità operativa.**  
Ogni sessione agent DEVE leggerlo per intero all’inizio.  
Ogni prompt DEVE rispettare le regole ferree sotto.  
Non esiste lavoro parallelo su più task. Non esiste “tanto faccio anche…”.

---

## 0. Scope assoluto

| Consentito | Vietato |
|------------|---------|
| Solo repo `/home/jader/Scrivania/LAVORO/SITI/portfoliovercel` | Toccare `comodigitale` o altri progetti |
| Migliorare SEO, indicizzazione, PWA, UX, performance, contenuti jaderweb | Clonare di nuovo comodigitale “per sicurezza” |
| Un task della checklist Sxx / Bxx / Pxx alla volta | Fare 2+ task nello stesso turno senza chiusura DoD |

**Brand fissi (non negoziabili):**
- Host: `https://jaderweb.com` (apex)
- Email: `jaderdaniotti.lavoro@gmail.com`
- WhatsApp / tel: `393513152008` / `+39 351 315 2008`
- Persona: Jader Daniotti — freelance, Udine / Friuli Venezia Giulia
- P.IVA: `14494540967`
- Theme: cream `#F6F5F3` / ink `#0A0C00` / accent `#E3FF04`
- Voce: **io / 1ª persona** (mai agency “noi costruiamo” salvo CTA collaborative tipo “Parliamone”)
- UI: solo token del tema (niente violet/zinc/fuchsia da template AI)

**Stack:** Next.js in questo repo ≠ Next “da training”. Prima di API nuove: leggere `node_modules/next/dist/docs/` e `AGENTS.md`.

---

## 1. Come operare ogni giorno (protocollo obbligatorio)

### 1.1 Apertura sessione (sempre)

1. Leggere **questo file** (`SANTO-GRAAL.md`).
2. Leggere lo stato checklist: primo task `[ ]` in ordine (S → B → P → X).
3. Dichiarare all’utente in **una riga**:  
   `Oggi: S0X — <titolo>. Non tocco altro.`
4. Marcare quel task `in_progress` (todo Cursor + checkbox qui sotto quando inizi).
5. Solo dopo: esplorare codice **della zona del task**.

### 1.2 Durante il task (un solo obiettivo)

- Lavorare **solo** su file necessari al task corrente.
- Niente refactor “opportunistici”, niente rename di massa, niente “sistemo anche il blog”.
- Se emergono bug fuori scope: annotarli in **§ Backlog scoperto** in fondo; **non** risolverli ora salvo blocker del task corrente.
- Tempo: metterci quanto serve. Preferire qualità e verifica a velocità.

### 1.3 Chiusura task (DoD — Definition of Done)

Il task è chiuso **solo** se TUTTI i punti valgono:

| # | Controllo | Come |
|---|-----------|------|
| D1 | Obiettivo del task raggiunto | Confronta con la riga checklist |
| D2 | Typecheck ok | `npx tsc --noEmit -p tsconfig.json` |
| D3 | Nessun colore/UI fuori tema nella zona toccata | Grep `violet\|fuchsia\|zinc-\|rose-\|emerald-` sui file toccati |
| D4 | Contatti/brand intatti | Spot su email/WhatsApp/host |
| D5 | Verifica funzionale | Dev server o build + spot URL del task (vedi §2) |
| D6 | Checkbox aggiornata | `[x]` su questo file **prima** di passare al successivo |
| D7 | Report utente | 3–6 righe: fatto / verificato / URL da controllare / prossimo task |

**Vietato** passare al task successivo se D1–D6 non sono verdi.

### 1.4 Chiusura giornata

- Aggiornare § **Log sessioni** (data + task chiusi + note).
- Lasciare al massimo **un** task `in_progress` (meglio zero: o chiuso o non iniziato).
- Non lasciare codice a metà senza nota in Backlog.

### 1.5 Prompt utente tipici → comportamento agent

| Utente dice | Agent fa |
|-------------|----------|
| “continua” / “oggi” / “prossimo” | Solo il primo `[ ]` in checklist |
| “fai S03” | Solo S03, anche se altri sono aperti |
| “fai tutto” | **Rifiuta multi-task**: fai il primo aperto, poi chiedi conferma |
| “sistema SEO” | Chiedi quale ID (S02/S04/…) oppure prendi il primo `[ ]` |
| Bug urgente fuori task | Fix minimo solo se blocca il sito; altrimenti Backlog |

---

## 2. Controlli agent obbligatori per tipo di task

### SEO / sitemap / robots
- Contare URL o slug attesi (script / `tsx`).
- Aprire in locale le URL pubbliche rilevanti (`/sitemap.xml`, `/robots.txt`, chunk comuni se toccati).
- Verificare che `absoluteUrl` resti `https://jaderweb.com`.

### Schema JSON-LD
- Validare che l’oggetto sia stampato in pagina (view-source o snapshot).
- Niente LocalBusiness spam per 7904 comuni.

### Contenuti / blog / pilastro
- Voce io; niente filler AI (“In questo articolo”, “scopriremo”, fake `+%`).
- Solo colori tema nel chrome.
- Internal link a `/contatti` + servizio/comune coerente.

### Performance
- Misurare prima/dopo dove possibile (almeno: niente regressione typecheck + smoke load).
- Non aggiungere librerie pesanti senza necessità.

### PWA
- Manifest installabile (`display: standalone` o `standalone`-equivalente).
- SW non deve precacheare il silo 190K.
- Offline = shell minima + pagina offline; network-first per HTML dinamico.
- Icons 192/512 + maskable; theme_color coerente.

### Dopo ogni task che tocca routing/SEO
- Se possibile: `npm run build` (o almeno tsc). Se build troppo lunga, tsc + smoke rotte toccate, e annotare “build full da fare in Sxx”.

---

## 3. Regole ferree (ogni prompt, senza eccezioni)

1. **Un task alla volta.** Mai due checkbox nello stesso turno di lavoro.
2. **Leggi prima, scrivi dopo.** Nessun edit a caso senza aver aperto i file della zona.
3. **DoD prima del task successivo.** Checkbox `[x]` solo dopo D1–D6.
4. **Solo portfoliovercel.**
5. **Non inventare API Next.** Consulta docs locali.
6. **Non rompere il silo comuni** (24 path × comune, chunk 45k) salvo task esplicito che lo modifica.
7. **Non reintrodurre blog legacy thin** in sitemap/index.
8. **Non usare generatori di articoli clone** (`makeArticle` condiviso, loop identici).
9. **Tema UI:** solo cream/ink/accent/muted/border/background/foreground.
10. **Contatti jader** immutabili salvo richiesta esplicita.
11. **Niente commit** se l’utente non lo chiede.
12. **Niente push / force / amend** non richiesti.
13. **Niente file markdown extra** oltre questo e aggiornamenti checklist qui / log qui — salvo richiesta utente.
14. **Annota debito:** ogni “dopo lo faccio” → § Backlog con ID.
15. **Report onesto:** se qualcosa non è verificato, scrivilo. Mai “tutto ok” senza controllo.
16. **Tempo > fretta:** meglio un task perfetto che cinque mediocri.
17. **CLONE-TASKS.md** è storico clone T00–T26. **Questo file governa il futuro.**

---

## 4. Ordine di lavoro consigliato (non saltare senza motivo)

```
S03 (apex/headers) → S02 (sitemap qualità) → S01 (PWA)
→ S04 (schema) → S09 (sameAs/NAP) → S05 (pilastro+RSS)
→ S06 (silo copy/link) → S07 (CWV) → S08 (cleanup legacy)
→ S10 (IndexNow opz.) → poi backlog B/P
```

Motivo: canonical/host prima; sitemap coerente; PWA; segnali entity; contenuti commerciali; poi volume silo e performance.

Se l’utente impone un altro ID, obbedisci a quell’ID **solo**.

---

## 5. Checklist master (todo list del progetto)

Aggiorna le checkbox **qui**. Questa è la todo list ufficiale in-repo.

### S — SEO / indicizzazione / PWA (prioritari)

- [x] **S01** PWA completa: Service Worker, installabile, offline shell, `display: standalone`, maskable icons, apple-touch — *non precache silo 190K*
- [x] **S02** Sitemap: `lastmod` reali (blog `post.date`); allineare o dismettere `/sitemap-www.xml`
- [x] **S03** Redirect 301 www↔apex + security/cache headers in `next.config`
- [x] **S04** Schema: `Person` / `ProfessionalService`, Breadcrumb blog+comuni, `ItemList` hub servizi/blog
- [x] **S05** Pagine pilastro commerciali (Udine / FVG / costi sito) + feed RSS `/blog/rss.xml`
- [x] **S06** Ampliare varietà `comuni-seo` + linking blog↔comuni top / servizi↔comuni
- [x] **S07** Performance CWV sul silo: lazy client JS, font/image priority, OG leggeri
- [x] **S08** Cleanup crawl: rimuovere o 301 blog legacy noindex; audit soft-404
- [x] **S09** `sameAs` social reali + NAP coerente in JSON-LD Organization
- [x] **S10** IndexNow / ping sitemap post-deploy (opzionale)

### B — Backlog codice SEO (dopo S01–S09)

- [x] **B01** Title/description CTR audit pagine core + top servizi
- [x] **B02** OG dedicati per ogni articolo blog (o template brand coerente)
- [x] **B03** Related posts graph tra i 95 articoli
- [x] **B04** Hub `/comuni` più ricco (regioni / popolari / search)
- [x] **B05** Policy trailing slash unica
- [x] **B06** 301 mappa da vecchi slug jaderweb residui
- [x] **B07** `robots` / `X-Robots-Tag` raffinati su thank-you e params
- [x] **B08** `dateModified` automatico su post rivisti
- [x] **B09** Filtri per servizio su `/blog`
- [x] **B10** Smoke script post-deploy (sample URL 200+canonical+jsonld)
- [x] **B11** GA4 eventi form / WhatsApp / CTA (se consenso cookie)
- [x] **B12** Log 404 → suggerimenti redirect
- [x] **B13** Prefetch selettivo link critici (no prefetch silo intero)
- [x] **B14** Sitemap index XML unico entry (oltre robots)
- [x] **B15** Priority/changefreq più granulari per comuni piccoli vs grandi

### P — Prodotto / UX (dopo SEO base)

- [x] **P01** Accessibilità: un H1/pagina, alt immagini, landmark
- [x] **P02** Lighthouse mobile spot (home, 1 servizio, 1 blog, 1 comune)
- [x] **P03** Offline page branded PWA
- [x] **P04** Install prompt discreto (non invasivo, tema jaderweb)

### X — Espliciti utente (vuoto finché non chiede)

<!-- aggiungi qui task chiesti a voce -->

---

## 6. Template report fine-task (copia/incolla)

```
Task: S0X — titolo
Stato: CHIUSO | BLOCCATO
Fatto: …
Verificato: tsc … | smoke URL … | grep tema …
Note / debito: …
Prossimo (non iniziato): S0Y
```

---

## 7. Log sessioni

| Data | Task | Esito | Note |
|------|------|-------|------|
| 2026-09-07 | Creazione SANTO-GRAAL.md | OK | Todo riportata in progetto; protocollo one-task |
| 2026-09-07 | S03 www→apex + headers | OK | `next.config.ts`: host redirect + HSTS/security + cache icons/img |
| 2026-09-07 | S02 sitemap lastmod | OK | blog=post.date; core/comuni stabili; www sitemap → 308 apex |
| 2026-09-07 | S01 PWA | OK | standalone manifest, sw.js shell-only, /offline, apple-touch, SW headers |
| 2026-09-07 | S04 Schema JSON-LD | OK | entity graph Person/Org/ProfessionalService; hub ItemList; breadcrumb blog+comuni; home WebSite |
| 2026-09-07 | S09 sameAs + NAP | OK | LinkedIn+GitHub reali; vatID; tel E.164; footer P.IVA; contatti schema; seo-home→siteRoot |
| 2026-09-07 | S05 pilastro + RSS | OK | /udine /friuli /costo-sito-web + FAQ schema; /blog/rss.xml (95 item); sitemap+footer |
| 2026-09-07 | S06 comuni-seo + link | OK | pool template ampliati + proof per popolazione; TopComuni su servizi/blog; blog seed per comune |
| 2026-09-07 | S07 CWV silo | OK | ComuneHomeShell lean; no Reveal/iframe/SplitText/FlowingMenu su locali; font trim; no twitter OG duplicato |
| 2026-09-07 | S08 cleanup crawl | OK | 31 legacy blog → 301; footer→SERVICE_BLOG_POSTS; spot soft-404 comuni piccoli 200+H1 |
| 2026-09-07 | S10 IndexNow | OK | key public/*.txt; lib/indexnow.ts + `npm run seo:indexnow` (63 URL core, no silo); dry-run OK; key locale 200; prod key 404 finché non deploy |
| 2026-09-07 | B01 CTR titles | OK | core+pilastri+HUB+19 servizi: title benefit/keyword; perché-noi → 1ª persona; smoke title home/servizi/ristoranti |
| 2026-09-07 | B02 OG blog | OK | `blog/[slug]/opengraph-image` + `blogSocialImage`; smoke PNG 1200×630 |
| 2026-09-07 | B03 related posts | OK | `getRelatedBlogPosts` 4/post (service→related→keywords); UI Articoli correlati; 95/95 ok |
| 2026-09-07 | B04 hub comuni | OK | H1 SEO; chip regioni; blocco FVG; lista solo con filtri; reset |
| 2026-09-07 | B05 trailing slash | OK | `trailingSlash: false`; `/servizi/`→308 `/servizi` |
| 2026-09-07 | B06 legacy paths | OK | `legacy-path-redirects` EN/IT→canonici; nav/footer → `/costo-sito-web`; smoke 308 |
| 2026-09-07 | B07 robots thank-you | OK | `/grazie` noindex; proxy X-Robots su utm/gclid; robots disallow; form→/grazie |
| 2026-09-07 | B08 dateModified | OK | `updated?` + `getBlogPostDates`; JSON-LD/sitemap/UI; seed 2 post |
| 2026-09-07 | B09 blog filtri | OK | `?servizio=` chip; noindex via proxy; canonical hub |
| 2026-09-07 | B10 seo smoke | OK | `npm run seo:smoke` 11/11 locale (200+canonical+jsonld) |
| 2026-09-07 | B11 GA4 eventi | OK | trackGaEvent + consent; form/WhatsApp/CTA/thank_you; AnalyticsEvents |
| 2026-09-07 | B12 404→redirect | OK | not-found tema+suggerimenti; log analyzer top404+hints |
| 2026-09-07 | B13 prefetch | OK | `shouldPrefetchHref`: hub/servizi sì, silo comuni/blog no |
| 2026-09-07 | B14 sitemap-index | OK | `/sitemap-index.xml` + robots entry primario |
| 2026-09-07 | B15 comuni priority | OK | tier pop ≥100k/20k/5k/<5k → priority+changefreq |
| 2026-09-07 | P01 a11y | OK | logo alt decorativo; nav principale sr-only; menu labeled; 1 H1 spot |
| 2026-09-07 | P02 Lighthouse | OK | mobile spot: home P36/A94/BP96/SEO100; servizi A100/SEO100; blog P64/A98; comuni A100/SEO100; fix hero contrast+touch |
| 2026-09-07 | P03 offline | OK | pagina branded (logo, CTA, WA); SW cache v2 |
| 2026-09-07 | P04 install prompt | OK | `PwaInstallPrompt` delay 12s + dismiss LS; tema jaderweb |
| | | | |

---

## 8. Backlog scoperto (non toccare finché non diventa task)

| Data | Dove | Cosa | Suggerito |
|------|------|------|-----------|
| 2026-09-07 | next.config headers | CSP completa non aggiunta (rompe theme script / Analytics / widget) | Bxx CSP report-only o nonce quando serve |
| 2026-09-07 | Vercel Domains | Confermare in dashboard che www è redirect domain verso apex (oltre al codice) | Ops manuale GSC/Vercel |
| 2026-09-07 | PWA icons | icon-192 molto leggero (366B); valutare asset maskable con safe-zone reale | Pxx polish icone |
| 2026-09-07 | PWA push | Push/VAPID non in S01 (fuori scope) | X se richiesto |
| 2026-09-07 | LinkedIn location | Profilo LI mostra “Greater Milan”; sito/schema NAP = Udine | Ops: aggiornare location LinkedIn per coerenza |
| 2026-09-07 | S07 layout chrome | Header ancora gsap/framer globale su silo | B13/P02 o task CWV-2 se Lighthouse lo chiede |
| 2026-09-07 | `lib/blog-articles.ts` | Dati legacy non più routati; file resta orfano | Bxx rimozione se nessuno importa |
| 2026-09-07 | S10 IndexNow | Chiave non ancora live su apex (404 finché deploy); non inviare ping reale prima | Ops: dopo deploy `curl` key 200 poi `npm run seo:indexnow` |
| 2026-09-07 | P02 home perf | Lighthouse mobile perf ~36 (TBT/LCP, header gsap/JS pesante) | CWV-2 / B13+P02 follow-up: alleggerire chrome globale |

---

## 9. Riferimenti rapidi

- Contatti / nav: `lib/home-content.ts`, `lib/site-config.ts`
- SEO URL: `lib/seo.ts` (`SITE_URL`, `absoluteUrl`, `pageSeo`)
- Sitemap core: `app/sitemap.ts`
- Sitemap comuni: `app/comuni/sitemap.ts` + `lib/sitemap-entries.ts` (chunk 45_000)
- Robots: `app/robots.ts`
- Blog servizi: `lib/blog/posts/*` + `components/blog/service-blog-article.tsx`
- Pilastro: `lib/pillar-pages.ts` → `/udine`, `/friuli`, `/costo-sito-web`
- RSS: `app/blog/rss.xml/route.ts`
- IndexNow: `lib/indexnow.ts` + `npm run seo:indexnow` / `seo:indexnow:dry` (solo URL core)
- Manifest attuale: `app/manifest.ts`
- Clone storico: `CLONE-TASKS.md` (T00–T26 chiusi)

### Sitemap da allegare in GSC (apex)

Preferisci l’index unico:

```
https://jaderweb.com/sitemap-index.xml
```

Oppure i pezzi singoli:

```
https://jaderweb.com/sitemap.xml
https://jaderweb.com/comuni/sitemap/0.xml
https://jaderweb.com/comuni/sitemap/1.xml
https://jaderweb.com/comuni/sitemap/2.xml
https://jaderweb.com/comuni/sitemap/3.xml
https://jaderweb.com/comuni/sitemap/4.xml
```

---

*Fine del santo graal. Se un’istruzione di chat contraddice questo file sulle regole di processo (un task, DoD, solo portfoliovercel), vince questo file — salvo override esplicito dell’utente del tipo: “ignora SANTO-GRAAL per questo messaggio”.*
