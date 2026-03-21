---
storyId: '1.1'
storyKey: '1-1-angular-projekt-inicializalas-es-tailwind-konfiguracio'
epicId: '1'
status: 'review'
createdAt: '2026-03-21'
completedAt: '2026-03-21'
---

# Story 1.1 — Angular projekt inicializálás és Tailwind konfiguráció

## User Story

**As a developer,**
I want to initialise the Angular 18 project with SSR, strict TypeScript, and Tailwind CSS with custom design tokens,
**So that** every subsequent component is built on a consistent, correctly configured foundation.

---

## Acceptance Criteria

**AC-1: Projekt inicializálás**
- **Given** a clean working directory
- **When** the init commands are executed (`ng new dance --standalone --ssr --routing --style=css --strict`)
- **Then** the project compiles with `ng build` without errors
- **And** `ng serve --ssr` starts without errors and renders a placeholder page

**AC-2: Tailwind design tokenek**
- **Given** Tailwind CSS v3 is installed
- **When** `tailwind.config.js` is configured
- **Then** custom tokens are available: `burgundy: '#754247'`, `coral: '#DC6567'`, `cream: '#F9EBDB'`, `beige: '#E8DBC9'`, `dark: '#2D1F21'`, `mint: '#BCE2D3'`
- **And** `styles.css` includes Tailwind `@base`, `@components`, `@utilities` directives

**AC-3: Google Fonts**
- **Given** the project is initialised
- **When** `src/index.html` is inspected
- **Then** Google Fonts preconnect links for Playfair Display and Inter are present
- **And** `font-display: swap` is set in `styles.css`

---

## Epic Context

**Epic 1 célja:** A fejlesztő futtatható Angular 18 SSR + bilingual alapot kap, amelyre minden komponens épülhet; a /hu/ és /en/ route-ok renderelnek és indexelhetők.

**Ez a sztori felelős:**
- Az összes többi sztori (1.2–6.4) alapja — ha ez hibás, minden többi is hibás
- A Tailwind design tokeneinek meghatározása — ha itt elmarad egy token (pl. `mint`), az Epic 3–4-ben fog hiányozni és akkor kell visszamenni javítani

**Következő sztori (1.2)** a `@angular/localize` konfigurációját végzi — i18n-t NE konfiguráld ebben a sztoriban, az a következő.

---

## Developer Context

### Előfeltételek (mielőtt bármit csinálsz)

1. **Node.js 20 LTS** legyen telepítve: `node --version` → `v20.x.x`
2. **Angular CLI 18** globálisan telepítve: `npm install -g @angular/cli@18`
   - Ellenőrzés: `ng version` → `Angular CLI: 18.x.x`
3. **Üres könyvtár** — ne legyen már meglévő `dance/` mappa

### Lépés-by-lépés végrehajtás

**1. lépés — Projekt létrehozása**

```bash
ng new dance --standalone --ssr --routing --style=css --strict
cd dance
```

A `--standalone` flag kritikus: NgModule nélküli, standalone component architektúrát állít be. A `--ssr` flag az `@angular/ssr` + Express szervert konfigurálja.

**Amit a `ng new` generál — ellenőrizd, hogy megvan:**
- `src/app/app.component.ts` — standalone component (NEM NgModule)
- `src/app/app.config.ts` — tartalmazza: `provideRouter()`, `provideClientHydration()`
- `src/app/app.config.server.ts` — SSR-specifikus provider konfig
- `server.ts` — Express SSR szerver
- `src/main.ts` + `src/main.server.ts`

> ⚠️ **KRITIKUS:** Győződj meg, hogy `app.config.ts`-ben **`provideClientHydration()`** jelen van. Enélkül az SSR output és a kliens-oldali Angular újra renderel (flicker). Ha hiányzik, add hozzá manuálisan.

**2. lépés — Third-party library-k telepítése**

```bash
npm install swiper@^11 glightbox@^3
npm install -D @types/glightbox
```

Ezek a galléria (Epic 4) számára kellenek, de most kell telepíteni, hogy a `package.json` rendben legyen. NE inicializáld őket ebben a sztoriban — az a 4.1 és 4.2 sztorik feladata.

**3. lépés — Tailwind CSS v3 telepítés**

```bash
npm install -D tailwindcss postcss autoprefixer @tailwindcss/typography
npx tailwindcss init
```

Ez létrehozza a `tailwind.config.js`-t. A `postcss.config.js`-t manuálisan kell létrehozni:

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**4. lépés — `tailwind.config.js` konfigurálása**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',  // ← .ts KÖTELEZŐ a JIT-hez
  ],
  theme: {
    extend: {
      colors: {
        burgundy: '#754247',
        coral:    '#DC6567',
        cream:    '#F9EBDB',
        beige:    '#E8DBC9',
        mint:     '#BCE2D3',
        dark:     '#2D1F21',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Inter"', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // 8px base unit
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '6': '48px',
        '8': '64px',
        '12': '96px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

> ⚠️ **FONTOS:** `content` tömbben a `.ts` fájlok kötelezők! Nélkülük a JIT purger nem találja meg a TypeScript template stringekben használt class-okat.

> ⚠️ **FONTOS:** Mind a 6 colour token kötelező. A `mint: '#BCE2D3'` az UX specből jön (success state, acro-yoga badge) — ha kihagyod, az Epic 3–4 sztorikban hibás build lesz.

> ⚠️ **CORAL SZABÁLY:** A `coral` kizárólag dekoratív/accent szín (CTA gombok, hover state). Soha ne használd body text szín gyanánt fehér vagy cream háttéren — kontrast 3.1:1, ez AA alatt van.

**5. lépés — `src/styles.css` frissítése**

Cseréld le a default tartalmat:

```css
/* Tailwind base layers */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Google Fonts — font-display: swap a FOUT megelőzéséhez */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');

/* Global typography */
@layer base {
  h1, h2, h3 {
    font-family: 'Playfair Display', Georgia, serif;
  }

  body {
    font-family: 'Inter', system-ui, sans-serif;
    background-color: theme('colors.cream');
    color: theme('colors.dark');
    @apply text-base leading-relaxed;
  }
}

/* prefers-reduced-motion — globális override (WCAG FR37) */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
```

> ⚠️ A `@import url(...)` a `@tailwind` direktívák UTÁN legyen, különben PostCSS hibát dob.

**6. lépés — `src/index.html` frissítése**

A `<head>` szekcióba add hozzá a Google Fonts preconnect linkeket és a meta tageket:

```html
<!doctype html>
<html lang="hu">
<head>
  <meta charset="utf-8">
  <title>Dance</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Google Fonts preconnect — kritikus teljesítményhez -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Favicon placeholder -->
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

> ⚠️ A `lang="hu"` attribútum fontos az accessibility (screen reader) és SEO szempontjából. Story 1.2-ben ez per-locale-ra frissül.

> ⚠️ **NE add** hozzá a `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?...">` linket az index.html-be. A betűtípus betöltés a `styles.css`-ben lévő `@import`-on keresztül történik, ahol a `display=swap` kontrollálható.

**7. lépés — `vercel.json` létrehozása**

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src 'self' https://www.youtube-nocookie.com; connect-src 'self' https://formsubmit.co;"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        }
      ]
    }
  ]
}
```

> Story 1.4 (CI/CD) finalizálja a Vercel konfigurációt — ez az alap skeleton.

**8. lépés — Environment fájlok**

```bash
# Ha nem generálódtak automatikusan:
ng generate environments
```

```typescript
// src/environments/environment.ts (dev)
export const environment = {
  production: false,
  contactFormEndpoint: 'https://formsubmit.co/ajax/PLACEHOLDER',
};
```

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  contactFormEndpoint: 'https://formsubmit.co/ajax/ZSÓFI_EMAIL_IDE',
  // ↑ Epic 5 előtt cseréld le Zsófi valódi emailjére
};
```

**9. lépés — Könyvtárstruktúra előkészítése**

Hozd létre az architektúra által meghatározott üres könyvtárakat (a komponens fájlok a later storykon jönnek létre):

```bash
mkdir -p src/app/components/editorial-hero
mkdir -p src/app/components/service-strip
mkdir -p src/app/components/editorial-row
mkdir -p src/app/components/gallery-categorized
mkdir -p src/app/components/video-section
mkdir -p src/app/components/judging-credentials
mkdir -p src/app/components/contact-form
mkdir -p src/app/components/mobile-navigation
mkdir -p src/app/components/language-switcher
mkdir -p src/app/services
mkdir -p src/app/models
mkdir -p src/locale
mkdir -p src/assets/images/hero
mkdir -p src/assets/images/gallery/competitions
mkdir -p src/assets/images/gallery/weddings
mkdir -p src/assets/images/gallery/teaching
mkdir -p src/assets/images/gallery/performances
mkdir -p src/assets/images/gallery/acroyoga
```

Locale placeholder fájlok (Story 1.2-ben feltöltésre kerülnek):

```xml
<!-- src/locale/messages.xlf — placeholder -->
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="hu" datatype="plaintext" original="ng2.template">
    <body>
    </body>
  </file>
</xliff>
```

```xml
<!-- src/locale/messages.hu.xlf — placeholder, azonos az xlf-fel -->
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="hu" target-language="hu" datatype="plaintext" original="ng2.template">
    <body>
    </body>
  </file>
</xliff>
```

**10. lépés — Validáció**

```bash
# Build ellenőrzés
ng build
# → Elvárás: No errors, distfolder létrejön

# SSR fejlesztési szerver
ng serve --ssr
# → Elvárás: http://localhost:4200 megnyílik, placeholder oldal jelenik meg
# → Browser consolban nincs SSR hydration hiba
# → view-source:http://localhost:4200 → HTML tartalom látható (nem üres)

# Tailwind token ellenőrzés
# → Adj hozzá ideiglenesen egy tesztelő osztályt app.component.html-be:
# <div class="bg-burgundy text-cream p-4">Teszt</div>
# → A div burgundy háttérrel jelenjen meg
# → Utána töröld a tesztelő sort!
```

---

## Technical Requirements

### Kötelező fájlok ebben a sztoriban

| Fájl | Státusz | Tartalom |
|---|---|---|
| `tailwind.config.js` | 🆕 Létrehozni/felülírni | Mind a 6 token + typography plugin |
| `postcss.config.js` | 🆕 Létrehozni | autoprefixer + tailwindcss |
| `src/styles.css` | ✏️ Módosítani | Tailwind directives + fonts + reduced-motion |
| `src/index.html` | ✏️ Módosítani | Google Fonts preconnect, `lang="hu"` |
| `vercel.json` | 🆕 Létrehozni | CSP headers skeleton |
| `src/environments/environment.ts` | 🆕 Létrehozni | dev config + FormSubmit placeholder |
| `src/environments/environment.prod.ts` | 🆕 Létrehozni | prod config + FormSubmit email placeholder |
| `src/locale/messages.xlf` | 🆕 Létrehozni | Üres XLIFF skeleton |
| `src/locale/messages.hu.xlf` | 🆕 Létrehozni | Üres XLIFF skeleton |

### NEM módosítandó / NEM hozzáadandó ebben a sztoriban

- `angular.json` i18n szekciója → Story 1.2
- `@angular/localize` → Story 1.2
- Bármilyen Angular komponens a `components/` mappában → Story 2.1+
- Swiper/GLightbox inicializálás → Story 4.1 / 4.2
- GitHub Actions workflow → Story 1.4

---

## Architecture Compliance

### Kötelező minták ebben a sztoriban

**1. Standalone app.component.ts** — ellenőrizd, hogy `ng new` standalone-t generált:

```typescript
// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,      // ← KÖTELEZŐ
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {}
```

**2. app.config.ts provideClientHydration kötelező:**

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';  // ← KÖTELEZŐ
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),           // ← KÖTELEZŐ SSR hydration flush-hoz
    provideHttpClient(withFetch()),      // ← withFetch() SSR-kompatibilis fetch
  ],
};
```

> ⚠️ `provideHttpClient(withFetch())` → a `withFetch()` adapter az SSR-kompatibilis `fetch`-et használja a Node.js `http` modul helyett. Ez kritikus az SSR kontextusban.

**3. Tailwind content array — .ts fájlok kötelezők:**

```js
content: ['./src/**/*.{html,ts}'],  // ← .ts nélkül a JIT nem találja a TS-ben lévő classokat
```

---

## Library & Framework Requirements

### Verziók

| Csomag | Verzió | Megjegyzés |
|---|---|---|
| `@angular/core` | `^18.x` | `ng new` adja |
| `@angular/ssr` | `^18.x` | `--ssr` flag adja |
| `tailwindcss` | `^3.x` | NEM v4 — v4 breaking changes van |
| `postcss` | `^8.x` | tailwind peer dependency |
| `autoprefixer` | `^10.x` | tailwind peer dependency |
| `@tailwindcss/typography` | `^0.5.x` | prose osztályhoz |
| `swiper` | `^11.x` | Gallery (Epic 4), ne inicializáld most |
| `glightbox` | `^3.x` | Lightbox (Epic 4), ne inicializáld most |
| `@types/glightbox` | devDependency | TypeScript típusok |

> ⚠️ **Tailwind v3 kötelező** — a projekt v3-ra tervezett. A Tailwind v4 (alpha/beta) teljesen más konfigurációs formátumot használ és incompatibilis.

---

## File Structure Requirements

Az architektúra dokumentumban meghatározott struktúra. Ebben a sztoriban csak az alapot hozd létre:

```
dance/
├── postcss.config.js               ← 🆕 LÉTREHOZNI
├── tailwind.config.js              ← ✏️ FELÜLÍRNI (npx tailwindcss init generálja, majd szerkeszteni)
├── vercel.json                     ← 🆕 LÉTREHOZNI
├── src/
│   ├── index.html                  ← ✏️ MÓDOSÍTANI (preconnect, lang attr)
│   ├── styles.css                  ← ✏️ MÓDOSÍTANI (Tailwind + fonts + reduced-motion)
│   ├── environments/
│   │   ├── environment.ts          ← 🆕 LÉTREHOZNI
│   │   └── environment.prod.ts     ← 🆕 LÉTREHOZNI
│   ├── locale/
│   │   ├── messages.xlf            ← 🆕 LÉTREHOZNI (üres skeleton)
│   │   └── messages.hu.xlf         ← 🆕 LÉTREHOZNI (üres skeleton)
│   └── assets/
│       └── images/
│           ├── hero/               ← 🆕 KÖNYVTÁR (üres)
│           └── gallery/
│               ├── competitions/   ← 🆕 KÖNYVTÁR (üres)
│               ├── weddings/       ← 🆕 KÖNYVTÁR (üres)
│               ├── teaching/       ← 🆕 KÖNYVTÁR (üres)
│               ├── performances/   ← 🆕 KÖNYVTÁR (üres)
│               └── acroyoga/       ← 🆕 KÖNYVTÁR (üres)
```

---

## Testing Requirements

Ez egy infrastrukturális sztori — nincs unit test szükséges ezen a szinten. A validáció kézi ellenőrzéssel történik (AC-1–3 fent).

**Kézzel ellenőrizendő:**
- [x] `ng build` hibák nélkül lefut
- [x] `ng serve --ssr` elindul, `localhost:4200` megnyílik
- [x] Tailwind token teszt osztállyal megjeleníthető (lásd 10. lépés)
- [x] `view-source:http://localhost:4200` → HTML tartalom látható (SSR működik)
- [x] Browser console: nincs hydration mismatch hiba
- [x] `src/index.html` tartalmaz `rel="preconnect"` linkeket a Google Fonts-hoz
- [x] `tailwind.config.js` mind a 6 token tartalmazza (incl. `mint`)

---

## Common Mistakes to Avoid

1. **`@angular/localize` telepítése ebben a sztoriban** → NE! Az Story 1.2 feladata.
2. **Swiper/GLightbox inicializálás kísérlete** → NE! Az Story 4.1/4.2 feladata.
3. **`mint` token kihagyása** → Minden token kötelező. A `mint` az UX specból jön, az eredeti architecture doc hibásan hagyta ki — javítva lett.
4. **Tailwind v4 telepítése** → A projekt Tailwind v3-ra tervezett. A `npx tailwindcss init` v3-ban működik, v4-ben más a konfig formátuma.
5. **`.ts` hiányzik a Tailwind content tömbből** → JIT nem fog osztályokat találni TypeScript fájlokban.
6. **`provideClientHydration()` hiánya** → SSR hydration flicker. A `ng new --ssr` általában beleteszi, de mindig ellenőrizd.
7. **`provideHttpClient()` withFetch nélkül** → SSR kontextusban Node.js HTTP modul helyett fetch kell.
8. **Google Fonts `<link>` az index.html-be** → A betöltés `styles.css`-ben az `@import`-on keresztül történik a `display=swap` kontrollálása miatt.

---

## Project Context Reference

A teljes szabálykészlet: `_bmad-output/project-context.md`

Legfontosabb szabályok erre a sztorira:
- Standalone components ALWAYS (`standalone: true`) — lásd Angular Rules
- `isPlatformBrowser()` guard minden `window`/`document` hozzáféréshez — ez a story 1.3-ban kerül validálásra
- Coral dekoratív only — soha nem body text szín
- Tailwind utility classes only — nincs inline `style=""` a statikus értékekhez
- `ng serve` ≠ `ng serve --ssr` — SSR teszteléshez mindig `--ssr` flag szükséges

---

## Dev Notes

- [x] **`ng new` verzió:** Angular CLI 18.2.21 (npx), Angular Core 18.2.0, Node.js 24.14.0
- [x] **Peer dependency figyelmeztetések:** Csak deprecated csomagok (tar, glob, inflight) — ezek az Angular 18 saját belső függőségei, nem blokkolók.
- [x] **`provideClientHydration()` az `app.config.ts`-ben:** Automatikusan generálódott a `--ssr` flag miatt. ✅
- [x] **Módosítások a tervhez képest:**
  - `@types/glightbox` nem létezik az npm registry-ben → kihagyva (GLightbox beépített TS típusokat tartalmaz)
  - `@import url(...)` a `styles.css`-ben a `@tailwind` direktívák ELÉ került (CSS spec: `@import` mindig első) — a story spec note fordítva írta, de a buildből egyértelműen látszott
  - `provideHttpClient(withFetch())` manuálisan hozzáadva az `app.config.ts`-hez (nem szerepelt az auto-generált fájlban)
- [x] **Ismert problémák Story 1.2-nek:** Nincs. Az `angular.json` érintetlen, az i18n szekció üres — készen áll a `@angular/localize` integrációra.

---

## Dev Agent Record

### Implementation Plan

A 10 lépéses story spec-et sorban végrehajtottuk:
1. `npx @angular/cli@18 new dance --standalone --ssr --routing --style=css --strict --skip-git`
2. `npm install swiper@^11 glightbox@^3` (nincs `@types/glightbox`)
3. `npm install -D tailwindcss@^3 postcss autoprefixer @tailwindcss/typography`
4. `tailwind.config.js` + `postcss.config.js` létrehozva a spec szerint (mind a 6 token)
5. `src/styles.css` frissítve: `@import` → `@tailwind` sorrend (CSS spec)
6. `src/index.html`: `lang="hu"`, Google Fonts preconnect linkek
7. `vercel.json` CSP headers skeletonnal
8. `src/environments/environment.ts` + `environment.prod.ts` létrehozva
9. Teljes könyvtárstruktúra + `src/locale/*.xlf` placeholder fájlok
10. `npx @angular/cli@18 build` → **0 error, 0 warning** ✅

### Completion Notes

✅ AC-1: `ng build` sikeresen lefut — 0 error, 0 warning. Application bundle generation complete [2.465s].
✅ AC-2: Tailwind v3.4.19 telepítve, `tailwind.config.js`-ben mind a 6 design token (burgundy, coral, cream, beige, dark, mint) és mindkét fontFamily definiálva.
✅ AC-3: Google Fonts preconnect linkek az `src/index.html`-ben, `lang="hu"` beállítva. Betűtípus betöltés `styles.css` `@import`-tal.

Kritikus módosítás a tervhez képest: `provideHttpClient(withFetch())` hozzáadva az `app.config.ts`-hez (SSR-kompatibilis HTTP). `@types/glightbox` nem elérhető npm-en — könyvtár saját típusokat tartalmaz.

---

## File List

_Relatív útvonalak a repo gyökeréhez (`dance/`) képest_

### Létrehozott fájlok
- `dance/` — Angular 18 projekt gyökerkönyvtára (ng new)
- `dance/tailwind.config.js` — Tailwind v3 konfig, 6 design token + typography plugin
- `dance/postcss.config.js` — PostCSS konfig (tailwindcss + autoprefixer)
- `dance/vercel.json` — CSP + security headers skeleton
- `dance/src/environments/environment.ts` — dev env, FormSubmit PLACEHOLDER
- `dance/src/environments/environment.prod.ts` — prod env, FormSubmit placeholder
- `dance/src/locale/messages.xlf` — üres XLIFF skeleton (Story 1.2-nek)
- `dance/src/locale/messages.hu.xlf` — üres XLIFF skeleton (Story 1.2-nek)
- `dance/src/app/components/editorial-hero/` — könyvtár (üres)
- `dance/src/app/components/service-strip/` — könyvtár (üres)
- `dance/src/app/components/editorial-row/` — könyvtár (üres)
- `dance/src/app/components/gallery-categorized/` — könyvtár (üres)
- `dance/src/app/components/video-section/` — könyvtár (üres)
- `dance/src/app/components/judging-credentials/` — könyvtár (üres)
- `dance/src/app/components/contact-form/` — könyvtár (üres)
- `dance/src/app/components/mobile-navigation/` — könyvtár (üres)
- `dance/src/app/components/language-switcher/` — könyvtár (üres)
- `dance/src/app/services/` — könyvtár (üres)
- `dance/src/app/models/` — könyvtár (üres)
- `dance/src/assets/images/hero/` — könyvtár (üres)
- `dance/src/assets/images/gallery/competitions/` — könyvtár (üres)
- `dance/src/assets/images/gallery/weddings/` — könyvtár (üres)
- `dance/src/assets/images/gallery/teaching/` — könyvtár (üres)
- `dance/src/assets/images/gallery/performances/` — könyvtár (üres)
- `dance/src/assets/images/gallery/acroyoga/` — könyvtár (üres)

### Módosított fájlok
- `dance/src/app/app.config.ts` — `provideHttpClient(withFetch())` hozzáadva
- `dance/src/styles.css` — Tailwind directives + Google Fonts @import + reduced-motion
- `dance/src/index.html` — `lang="hu"`, Google Fonts preconnect linkek

---

## Change Log

| Dátum | Leírás |
|---|---|
| 2026-03-21 | Story 1.1 implementálva: Angular 18 SSR projekt, Tailwind v3 konfig (6 token), Google Fonts, vercel.json CSP skeleton, environment fájlok, könyvtárstruktúra. Build: 0 error, 0 warning. |
