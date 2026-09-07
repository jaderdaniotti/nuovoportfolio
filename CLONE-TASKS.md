# CLONE-TASKS — comodigitale → jaderweb (freelancer)

Guida autonoma sequenziale. **Un task alla volta.** Non passare al successivo finché DoD non è soddisfatto.

## Scope

- Fonte: `../comodigitale`
- Target: questo repo (`portfoliovercel` / jaderweb)
- NO `/demo/**` in questo ciclo
- SI `/tools` (restyle chrome comodigitale)
- SI blog in nav/sitemap (≥95 articoli servizi + legacy); linking da servizi/comuni/portfolio
- Contatti fissi:
  - email `jaderdaniotti.lavoro@gmail.com`
  - WhatsApp `393513152008` / `+39 351 315 2008`
  - brand `jaderweb`, persona `Jader Daniotti`, P.IVA `14494540967`
  - geo **Udine / Friuli Venezia Giulia**
  - host `https://jaderweb.com`

## Vocabolario obbligatorio

| Agenzia | Freelancer |
|---------|------------|
| WEB AGENCY · COMO | FREELANCER · UDINE |
| noi / costruiamo / partner | io / costruisco / lavoro con te |
| web agency | freelance web / sviluppatore freelance |
| Comodigitale | jaderweb |
| Como, Lombardia | Udine, Friuli Venezia Giulia |
| comodigitale.contatti@gmail.com | jaderdaniotti.lavoro@gmail.com |
| `comodigitale-theme` | `jaderweb-theme` |

Grafica/struttura/componenti: **identici** a comodigitale. Cambiano brand e persona grammaticale.

## Silo SEO ~190K (critico)

`7904 comuni × 24 URL = 189696` pagine silo:

- `/comuni/{slug}`
- `/comuni/{slug}/servizi`
- `/comuni/{slug}/servizi/{service}` × 19
- `/comuni/{slug}/processo`
- `/comuni/{slug}/perche-noi`
- `/comuni/{slug}/contatti`

Sitemap chunked 45k. Prerender solo pop ≥ 20k. ISR 30g. Non semplificare a 1 pagina/comune.

## DoD di ogni task

1. Codice copiato da comodigitale (non reinventato)
2. Voce freelancer applicata sulla zona
3. Contatti jader intatti
4. Verifica build/typecheck della zona (build full da T15; smoke dopo T10b/T11)
5. Parity UI vs comodigitale sulla zona
6. Checkbox qui sotto aggiornata **prima** del task successivo
7. T10–T11: dimostrare 24 URL/comune + sitemap chunked

## Checklist

- [x] **T00** Guida + inventario (questo file)
- [x] **T01** Design system + font + `public/img` + theme
- [x] **T02** Brand / SEO / mail root freelancer
- [x] **T03** LayoutShell header footer menu FAB cookie
- [x] **T04** Homepage sezioni + motion
- [x] **T05** `/servizi` + `/servizi/[slug]`
- [x] **T06** `/processo`
- [x] **T07** `/perche-noi`
- [x] **T08** Contatti + API mail
- [x] **T09** Privacy + cookie
- [x] **T10a** Comuni data + SEO engine freelancer
- [x] **T10b** Comuni hub + rotte silo complete
- [x] **T10c** Comuni UI + JSON-LD + OG + copy
- [x] **T11** Sitemap ~190K + robots + redirects
- [x] **T12** Tools restyle
- [x] **T13** Blog fuori IA
- [x] **T14** Cleanup legacy (swiper/BubbleMenu/pricing)
- [x] **T15** Build full + parity pass
- [x] **T16** Audit finale
- [x] **T17** Splash ParticleText → `jaderweb`
- [x] **T18** Voce plurale→singolare (lib + UI)
- [x] **T19** Verify grep anti-plurale
- [x] **T20** Pagina `/portfolio` + nav
- [x] **T21** Blog indexabile + chrome comodigitale + sitemap
- [x] **T22** Blog batch1: 5×5 (matrimoni…professionisti) = 25
- [x] **T23** Blog batch2: associazioni…artigiani = 25
- [x] **T24** Blog batch3: landing-ads…preventivi = 25
- [x] **T25** Blog batch4: prenotazioni…digitalizzazione = 20
- [x] **T26** Internal linking servizi/portfolio/comuni → blog

## Roadmap SEO / indicizzazione / PWA (post-clone)

> **Fonte di verità operativa:** [`SANTO-GRAAL.md`](./SANTO-GRAAL.md)  
> Protocollo: un task al giorno/turno, DoD obbligatorio, solo `portfoliovercel`.  
> Aggiorna sempre le checkbox in **SANTO-GRAAL.md** (questo blocco è solo scorciatoia).

- [ ] **S01**–**S10** + backlog B/P → vedi SANTO-GRAAL.md

## Inventario — da copiare da comodigitale (no demo)

### App core
- `app/globals.css`, `app/layout.tsx` (adattare), `app/page.tsx`, `app/manifest.ts`
- `app/servizi/**`, `app/processo/**`, `app/perche-noi/**`, `app/contatti/**`
- `app/privacy/**`, `app/cookie/**`, `app/comuni/**` (intero silo)
- `app/sitemap.ts`, `app/robots.ts`, `app/api/contact/**`
- OG/twitter image generators root + servizi + comuni

### Components (no `components/demo/**`)
- `layout-shell`, `home-page-shell`, `inner-page-shell`, `comune-home-shell`
- `site-header`, `site-footer`, `site-menu`, `staggered-menu`, `brand-logo`
- `theme-provider`, `whatsapp-fab`, `cookie-consent`, `intro-splash`, `json-ld`
- `contact-step-form`, `button`, `reveal`, `split-text`, motion UI, sections/*, process-*, profile-card, ecc.

### Lib
- `home-content`, `seo`, `seo-robots`, `json-ld`, `mail`, `contact-page`
- `services-content`, `service-pages`, `service-seo`, `process-page`, `why-us-content`, `legal-pages`
- `comuni`, `comuni-seo`, `comune-paths`, `comune-page`, `comune-json-ld`, `sitemap-entries`, `seo-clusters`
- `opengraph-card`, `social-image`, `cn` (se diverso)

### Assets / data
- `public/img/**`, `comuni.json` (o path equivalenti)
- `hooks/use-is-mobile.ts`

### Dipendenze tipiche
- `@gsap/react`, `motion`, `react-icons`, allineare `framer-motion`/`gsap`/`swiper`/`nodemailer`

## Legacy jaderweb da rimuovere/deprecare (dopo sostituzione)

- Home: BubbleMenu fullpage, `home-fullpage-swiper`, SplashCursor su home
- `/pricing` → redirect `/servizi`
- Vecchio `/comuni/[slug]` fullpage-only (sostituito dal silo)
- Blog fuori nav/sitemap (T13)

## Note operative

- Preferire `cp -a` / rsync sezioni da comodigitale, poi sed/rewrite brand.
- Mai copiare email/Clarity/GSC di comodigitale.
- Dopo T10b: smoke su 3 slug (grande/medio/piccolo) × sotto-pagine.
- Dopo T11: conteggio entry sitemap ≈ 189696 + core + tools.
