---
storyId: '2.1'
storyKey: '2-1-appcomponent-oldal-keret-es-sticky-header'
epicId: '2'
status: 'done'
createdAt: '2026-03-21'
completedAt: '2026-03-22'
---

# Story 2.1 — AppComponent oldal-keret és sticky header

## User Story

**As a visitor,**
I want a sticky header that remains visible during scrolling,
**So that** I can navigate to any section at any time without scrolling back to the top.

---

## Acceptance Criteria

**AC-1: Sticky header minden képernyőméreten**
- **Given** az oldal betöltve
- **When** a látogató legörgeti az oldalt
- **Then** a header fix marad a viewport tetején (`position: sticky; top: 0`)
- **And** minden képernyőméreten (mobile, tablet, desktop) látható marad
- **And** a header mögé kerülő tartalom `scroll-margin-top: 80px` értékkel van offsetelve

**AC-2: Header tartalom és elrendezés**
- **Given** a sticky header megjelenítve
- **When** megvizsgálva
- **Then** bal oldalon a logó/tánciskola neve látható
- **And** közepén / jobb oldalán desktopon navigációs linkek láthatók (szekciók: Bemutatkozás, Szolgáltatások, Galéria, Kapcsolat)
- **And** jobb szélén `LanguageSwitcher` **slot** helye megjelenítve (a komponens maga Story 2.2 scope)
- **And** mobile-on hamburger ikon jobb oldalon (`MobileNavigation` **slot** — Story 2.3 scope)

**AC-3: Smooth scroll navigáció**
- **Given** a header navigációs linkjei
- **When** egy linkre kattintanak
- **Then** az oldal smooth scroll-ol a célszekció ankor-jához (`href="#section-id"`)
- **And** ha `prefers-reduced-motion` aktív, azonnali (nem animált) scroll történik
- **And** a szekció teteje a header alá nem csúszik (scroll-margin-top: 80px)

**AC-4: i18n — minden látható szöveg jelölve**
- **Given** a header és az AppComponent shell template-je
- **When** minden szövegcsomópontot megvizsgálunk
- **Then** minden látható szöveg rendelkezik `i18n="@@..."` attribútummal
- **And** mind a `/hu/` mind a `/en/` build helyes feliratokat jelenít meg

**AC-5: Szemantikus HTML struktúra**
- **Given** az AppComponent shell HTML-je
- **When** megvizsgáljuk
- **Then** a struktúra: `<header>` (sticky nav) + `<main id="main-content">` (szekció outlet) + `<footer>` placeholder
- **And** a `<header>` tartalmaz `<nav aria-label="...">` elemet
- **And** megjelenik a skip-to-content link (billentyűzet fókuszra láthatóvá válik)
- **And** a `placeholder-heading` (`h1`) és az `SsrProbeComponent` eltávolítva (ezek Story 1.3 ideiglenes elemei)

**AC-6: Meta Service — Open Graph és hreflang**
- **Given** az AppComponent konstruktora / `afterNextRender`
- **When** az oldal betölt
- **Then** az Angular `Meta` service beállítja: `og:type`, `og:locale`, `og:title`, `og:description`, `og:image` értékeket locale-specifikusan
- **And** a `<title>` tag locale-specifikus értéket tartalmaz (HU: "Zsófi Tánciskola | Tánc és mozgás", EN: "Zsófi Dance School | Dance & movement")

---

## Epic Context

**Epic 2 célja:** A látogató navigálni tud az oldal szekciói között bármilyen eszközön — sticky headerrel, mobil hamburger overlay-jel és nyelvváltóval.

**Ez a sztori NEM feladata (Epic 2 többi story-jára halasztva):**
- `LanguageSwitcher` komponens implementálása → Story 2.2
- `MobileNavigation` overlay + focus trap implementálása → Story 2.3
- Tartalom szekciók (`EditorialHero`, `ServiceStrip` stb.) → Epic 3
- IntersectionObserver-alapú aktív szekció detekció (active nav link highlight) → Epic 3 (amikor a szekciók is megvannak)
- Sticky CTA megjelenítése → Epic 3 (amikor a Hero szekció is megvan)

**Következő sztori (2.2):** `LanguageSwitcher` komponens.

---

## Developer Context

### Jelenlegi kódbázis állapota

```
dance/src/app/
  app.component.ts          ← MÓDOSÍTANDÓ (teljes újraírás)
  app.component.html        ← MÓDOSÍTANDÓ (placeholder lecsere)
  app.component.css         ← MÓDOSÍTANDÓ (sticky header stílusok)
  app.component.spec.ts     ← frissítendő
  components/
    ssr-probe/              ← NEM érintett (marad a fájlrendszerben, de AppComponent nem importálja tovább)
```

Az `app.component.html` jelenlegi állapota (placeholder — Story 1.3 tesztelési célú):
```html
<!-- Placeholder - Story 2.1 (AppComponent shell) lecseréli a valódi tartalommal -->
<h1 i18n="@@app.placeholder-heading">Zsófi tánciskola</h1>
<app-ssr-probe />
<router-outlet />
```

Az `app.component.ts` jelenlegi importjai:
```typescript
imports: [RouterOutlet, SsrProbeComponent]
```

**Story 2.1 feladata:** A teljes AppComponent shell felváltja az ideiglenes placeholder-t. Az `SsrProbeComponent` import eltávolítandó (az SSR+i18n validáció le van dokumentálva, a komponensre nincs tovább szükség az AppComponent-ben).

### Könyvtárstruktúra

```
c:\Users\user\Documents\Saját\Dance\       ← Git repo gyökér
  dance/                                   ← Angular projekt
    src/
      app/
        app.component.ts                   ← módosítandó
        app.component.html                 ← módosítandó
        app.component.css                  ← módosítandó
        app.component.spec.ts              ← frissítendő
      locale/
        messages.hu.xlf                    ← ÚJ fordítási kulcsok kerülnek ide
        messages.en.xlf                    ← ÚJ fordítási kulcsok kerülnek ide
      styles.css                           ← globális stílusok (ha létezik); vagy base.css
```

### Tanulságok korábbi storyikból

1. **`@angular/localize` a `dependencies`-ben van** (NEM devDependencies) — Story 1.2 review patch
2. **Angular CLI verzión** — mindig `npx @angular/cli@18` (a globális CLI v21, annak ellenére)
3. **i18n extract** után: `ng extract-i18n --output-path src/locale` → `messages.xlf` frissül; az `messages.en.xlf`-t kézzel kell szinkronizálni a forrásnyelvi `messages.hu.xlf`-fel (az HU = sourceLocale, NEM kerül referencia a `angular.json`-ban)
4. **`ng build --localize`** output: `dist/dance/browser/hu/` és `dist/dance/browser/en/` — mindig 2 statikus route prerendelt
5. **PowerShell encoding** — `.xlf` fájlok írásához `[System.IO.File]::WriteAllText(path, content, New-Object System.Text.UTF8Encoding $false)` szükséges
6. **SSR guard minta** — `inject(PLATFORM_ID)` + `isPlatformBrowser()` + `afterNextRender()` minden browser-only kódhoz
7. **`RouterOutlet`** — megtartandó az `imports`-ban (bár single route van, az Angular router konfiguráció megköveteli)

### Sticky header implementációs specifikáció

Az UX design spec alapján:

```
Position: position: sticky; top: 0
z-index: 100
Background: cream (#F9EBDB) 95% opacity + backdrop-filter: blur(8px)
Height: 64px
Belső max-width: 1200px (mx-auto)
Mobile: logo bal + hamburger jobb
Desktop: logo bal + nav linkek közép/jobb + LanguageSwitcher jobb
```

**Tailwind osztályok:**
```html
<header class="sticky top-0 z-[100] bg-cream/95 backdrop-blur-sm h-16 ...">
```

> ⚠️ `bg-cream/95` → `cream` az egyéni Tailwind token (`#F9EBDB`). Győződj meg róla, hogy a `tailwind.config.js` tartalmazza.
> ⚠️ `backdrop-blur-sm` → Tailwind v3-ban `backdrop-filter: blur(4px)`. Az UX spec `blur(8px)`-t kér → `backdrop-blur-md` (8px).

### Navigációs linkek és anchor ID-k

A Story 2.1-ben a nav linkek **csak placeholder ankor hivatkozásokat** tartalmaznak — a tényleges szekciók (Hero, Services stb.) Epic 3-ban kerülnek implementálásra. Ez azt jelenti, hogy a `href="#hero"` stb. hivatkozások most "üres" ankorokat hivatkoznak, de strukturálisan már helyes HTML-t adnak.

**Navigáció szekciók (UX spec alapján, max 5-6 elem):**
| ID | Magyar | Angol |
|---|---|---|
| `#bemutatkozas` | Bemutatkozás | About |
| `#szolgaltatasok` | Szolgáltatások | Services |
| `#galeria` | Galéria | Gallery |
| `#kapcsolat` | Kapcsolat | Contact |

> Az ankor ID-k **Hungary** elsődleges — a HU build-ben az `id="bemutatkozas"` van, az EN build-ben is ugyanez az ID marad (az ID nem fordítandó, csak a látható felirat kerül `i18n`-jelölésbe).

### Skip-to-content link minta

```html
<a href="#main-content"
   class="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[10000] focus:bg-dark focus:text-cream focus:px-4 focus:py-2"
   i18n="@@a11y.skip-to-content">Ugrás a tartalomra</a>
```

### Meta Service implementáció

```typescript
import { Meta, Title } from '@angular/platform-browser';

// inject
readonly #meta = inject(Meta);
readonly #title = inject(Title);

// usage (afterNextRender-ben VAGY közvetlenül a konstruktorban — Meta service SSR-safe)
this.#title.setTitle($localize`:@@meta.title:Zsófi Tánciskola | Tánc és mozgás`);
this.#meta.updateTag({ property: 'og:title', content: $localize`:@@meta.og-title:Zsófi Tánciskola` });
this.#meta.updateTag({ property: 'og:locale', content: 'hu_HU' }); // HU build-ben
this.#meta.updateTag({ property: 'og:type', content: 'website' });
this.#meta.updateTag({ property: 'og:description', content: $localize`:@@meta.og-description:Professzionális táncoktatás és koreográfia` });
```

> ⚠️ A `Meta` és `Title` service-ek SSR-safe-ek (Angular renderi a szerveren is) — nem kell `isPlatformBrowser()` guard.
> ⚠️ `$localize` tagged template literal-t használj TypeScript-ben, ne `i18n` szabályt. Az `ng extract-i18n` kinyeri ezeket is.

### Scroll offset

Az összes ankor-célpontnak (szekció `id`-vel) `scroll-margin-top: 80px` stílusra lesz szüksége Epic 3-tól kezdve. A Story 2.1 a globális CSS-be bevezetheti ezt a baseline szabályt:

```css
/* styles.css vagy app.component.css-ben a :host globális hatással */
[id] {
  scroll-margin-top: 80px;
}
```

### i18n fordítási kulcsok (várható új kulcsok)

| Kulcs | HU érték | EN érték |
|---|---|---|
| `@@nav.about` | Bemutatkozás | About |
| `@@nav.services` | Szolgáltatások | Services |
| `@@nav.gallery` | Galéria | Gallery |
| `@@nav.contact` | Kapcsolat | Contact |
| `@@nav.aria-label` | Főmenü | Main menu |
| `@@header.site-name` | Zsófi Tánciskola | Zsófi Dance School |
| `@@a11y.skip-to-content` | Ugrás a tartalomra | Skip to content |
| `@@meta.title` | Zsófi Tánciskola \| Tánc és mozgás | Zsófi Dance School \| Dance & movement |
| `@@meta.og-title` | Zsófi Tánciskola | Zsófi Dance School |
| `@@meta.og-description` | Professzionális táncoktatás és koreográfia | Professional dance education and choreography |

> ⚠️ A `messages.xlf` (forrás HU) frissítése: `ng extract-i18n --output-path src/locale`
> ⚠️ Az `messages.en.xlf`-t manuálisan kell szinkronizálni az új kulcsokkal

### Tesztelési terv

```powershell
# 1. Build validáció
cd "c:\Users\user\Documents\Saját\Dance\dance"
npx @angular/cli@18 build --localize
# → 0 error, 2 static route prerendered

# 2. HU/EN header szövegek ellenőrzése
Select-String -Path "dist\dance\browser\hu\index.html" -Pattern "Zsófi Tánciskola"
Select-String -Path "dist\dance\browser\en\index.html" -Pattern "Zsófi Dance School"
Select-String -Path "dist\dance\browser\hu\index.html" -Pattern "Bemutatkozás"
Select-String -Path "dist\dance\browser\en\index.html" -Pattern "About"

# 3. Sticky header ellenőrzés (böngészőben)
node dist\dance\server\hu\server.mjs
# → http://localhost:4000/hu/ — scroll le, header marad-e?
```

### Architecture Compliance

| Döntés | Architektúra elvárás | Story 2.1 implementáció |
|---|---|---|
| Standalone komponens | `@Component({ standalone: true })` | ✅ AppComponent már standalone |
| SSR-safe Meta | `Meta` service konstruktorban | ✅ SSR-safe, nem kell guard |
| Browser-only kód | `isPlatformBrowser()` guard | IntersectionObserver-t Story 2.1 NEM használ (az Epic 3-ban kell) |
| Tailwind tokenek | `bg-cream`, nem `bg-[#F9EBDB]` | ✅ csak token alapú osztályok |
| i18n kötelező | minden látható szöveg `i18n`-jelölt | ✅ minden nav link, site name, skip-link |
| Szemantikus HTML | `<header>`, `<nav>`, `<main>`, `<footer>` | ✅ |
| Coral dekoratív | soha ne legyen body text | ✅ csak aktív nav link underline-on |

### Common Mistakes to Avoid

1. **`SsrProbeComponent` bent felejtése** — az `app.component.ts` importjából törölni kell
2. **`RouterOutlet` törölése** — megmarad, bár a routing triviális (single route)
3. **`LanguageSwitcher` és `MobileNavigation` implementálása** — Story 2.2 és 2.3 scope, itt csak **slot placeholder** kell (megjegyzés vagy div)
4. **Scroll offset hiánya** — `scroll-margin-top: 80px` globális CSS szabály bevezetendő
5. **Ankor link-ek `routerLink`-kel** — TILOS; csak `href="#id"` hash link megengedett (Angular Router NEM switch-el locale-t)
6. **`og:image` URL** — ha még nincs kép, hagyd ki vagy használj placeholder URL-t; ne okozzon build hibát

---

## Technical Requirements

### Módosítandó fájlok

| Fájl | Változás |
|---|---|
| `dance/src/app/app.component.ts` | SsrProbeComponent eltávolítása; Meta/Title service inject; `$localize` kulcsok |
| `dance/src/app/app.component.html` | Teljes újraírás: skip-link, sticky `<header>` + `<nav>`, `<main>`, `<footer>` placeholder |
| `dance/src/app/app.component.css` | Sticky header stílusok (amit Tailwind nem fed le) |
| `dance/src/app/app.component.spec.ts` | Frissítendő tesztek |
| `dance/src/locale/messages.xlf` | `ng extract-i18n` frissíti automatikusan |
| `dance/src/locale/messages.en.xlf` | Manuálisan szinkronizálandó az új EN fordításokkal |

### NEM módosítandó

- `angular.json` — változatlan
- `server.ts` — Story 1.3-ban frissítve, változatlan
- `dance/vercel.json` — Story 1.4-ben kész
- `dance/src/app/components/ssr-probe/*` — a fájlok maradnak, de AppComponent nem importálja

---

## Dev Notes

_(Ide kerülnek az implementáció során felfedezett tanulságok)_

---

## Tasks / Subtasks

- [x] **Task 1 — `app.component.ts` újraírása**
  - [x] `SsrProbeComponent` import eltávolítva
  - [x] `Meta` és `Title` service `inject()` és konstruktorban beállítva
  - [x] `$localize` kulcsok: `meta.title`, `meta.og-locale`, `meta.og-title`, `meta.og-description`
- [x] **Task 2 — `app.component.html` teljes újraírása**
  - [x] Skip-to-content link (`href="#main-content"`, `@@a11y.skip-to-content`)
  - [x] Sticky `<header>` — `sticky top-0 z-[100] bg-cream/95 backdrop-blur h-16`
  - [x] `<nav aria-label="Főmenü"` `i18n-aria-label="@@nav.aria-label"` 4 link-kel
  - [x] Desktop nav linkek: `@@nav.about`, `@@nav.services`, `@@nav.gallery`, `@@nav.contact`
  - [x] LanguageSwitcher és MobileNavigation slot megjegyzés
  - [x] `<main id="main-content">` + `<router-outlet />`
  - [x] `<footer>` placeholder — `@@footer.copyright`
- [x] **Task 3 — `src/styles.css` globális stílusok**
  - [x] `html { scroll-behavior: smooth; }` hozzáadva
  - [x] `[id] { scroll-margin-top: 80px; }` hozzáadva
  - [x] `:focus-visible` outline: 2px solid coral hozzáadva (WCAG)
- [x] **Task 4 — `app.component.spec.ts` frissítése**
  - [x] `provideRouter([])` hozzáadva
  - [x] 6 spec: create, sticky header, skip-link, main#main-content, 4 nav link, footer
- [x] **Task 5 — i18n**
  - [x] `ng extract-i18n` futtatva — 12 üzenet kinyerve
  - [x] `messages.en.xlf` frissítve — 12 EN fordítás
  - [x] `messages.hu.xlf` referencia fájl szinkronizálva
- [x] **Task 6 — Build validáció**
  - [x] `ng build --localize` — 0 error, 2 static route prerendered
  - [x] HU: `<title>Zsófi Tánciskola | Tánc és mozgás</title>`, `og:locale=hu_HU`
  - [x] EN: `<title>Zsófi Dance School | Dance &amp; movement</title>`, `og:locale=en_US`
  - [x] HU nav: Bemutatkozás / Szolgáltatások / Galéria / Kapcsolat
  - [x] EN nav: About / Services / Gallery / Contact

---

## Dev Agent Record

### Implementation Plan

- `app.component.ts`: `SsrProbeComponent` eltávolítva; `Meta`/`Title` inject; `$localize` kulcsok a konstruktorban (SSR-safe, nem kell `isPlatformBrowser()`)
- `app.component.html`: Teljes újraírás — skip-to-content link + sticky header (Tailwind classes: `sticky top-0 z-[100] bg-cream/95 backdrop-blur h-16`) + 4 desktop nav link (hash anchor, nem routerLink) + LanguageSwitcher/MobileNavigation slot commentek + `<main id="main-content">` + `<footer>` placeholder
- `styles.css`: `scroll-behavior: smooth`, `scroll-margin-top: 80px`, `:focus-visible` outline
- `app.component.spec.ts`: 6 spec, `provideRouter([])` provider
- i18n: 12 kulcs extraktálva, EN fordítások megírva

### Completion Notes

- ✅ AC-1: Header `position:sticky` Tailwind osztályokkal — minden képernyőméreten
- ✅ AC-2: Logo bal, desktop nav középen/jobbra, slot-ok jobb szélén
- ✅ AC-3: Nav linkek `href="#anchor"` — CSS `scroll-behavior:smooth`; `prefers-reduced-motion` letiltja a transitions-t globálisan
- ✅ AC-4: Minden látható szöveg `i18n`-jelölt — HU/EN build helyes feliratokkal igazolva
- ✅ AC-5: Szemantikus HTML — `<header>`, `<nav aria-label>`, `<main id="main-content">`, `<footer>`, skip-to-content
- ✅ AC-6: Meta service — `og:type=website`, `og:locale=hu_HU|en_US`, `og:title`, `og:description`, `<title>` locale-specifikus
- ℹ️ `ssr-probe.validated` kulcs eltűnt a build-ből (SsrProbeComponent nincs importálva — helyes)
- ℹ️ `app.placeholder-heading` eltávolítva a messages.xlf-ből (helyes — placeholder lecserélve)

---

## File List

| Fájl | Változás |
|---|---|
| `dance/src/app/app.component.ts` | ✏️ Újraírva — SsrProbeComponent ki, Meta/Title/\$localize be |
| `dance/src/app/app.component.html` | ✏️ Újraírva — teljes shell: skip-link, sticky header, main, footer |
| `dance/src/app/app.component.spec.ts` | ✏️ Frissítve — 6 spec, provideRouter |
| `dance/src/styles.css` | ✏️ Bővítve — scroll-behavior, scroll-margin-top, :focus-visible |
| `dance/src/locale/messages.xlf` | ✏️ ng extract-i18n frissítette — 12 kulcs |
| `dance/src/locale/messages.en.xlf` | ✏️ Manuálisan frissítve — 12 EN fordítás |
| `dance/src/locale/messages.hu.xlf` | ✏️ Referencia szinkronizálva — 12 HU kulcs |

---

## Change Log

| Dátum | Változás |
|---|---|
| 2026-03-21 | Story 2.1 implementálva: AppComponent shell teljes újraírás, sticky header, skip-to-content, i18n Meta tags, 6 spec, 12 i18n kulcs, build validált |
