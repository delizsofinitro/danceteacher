---
storyId: '1.3'
storyKey: '1-3-ssr-i18n-validacios-prototipus'
epicId: '1'
status: 'ready-for-dev'
createdAt: '2026-03-21'
completedAt: ''
---

# Story 1.3 — SSR + i18n validációs prototípus

## User Story

**As a developer,**
I want to validate that SSR and `@angular/localize` work correctly together end-to-end,
**So that** the highest-risk technical combination is proven before any production component is built.

---

## Acceptance Criteria

**AC-1: `isPlatformBrowser()` + `afterNextRender()` SSR-safe pattern validálása**
- **Given** az `SsrProbeComponent` komponens létezik és importálva van az `AppComponent`-be
- **When** `ng build --localize` fut
- **Then** a build 0 error, 0 warning-gal lefut
- **And** az `isPlatformBrowser()` és `afterNextRender()` pattern nem dob runtime error-t

**AC-2: SSR prerendered HTML tartalom ellenőrzés**
- **Given** `ng build --localize` lefutott
- **When** mind a `dist/dance/browser/hu/index.html` és `dist/dance/browser/en/index.html` megvizsgálva
- **Then** a HU index.html tartalmazza a „SSR + i18n validált" szöveget
- **And** az EN index.html tartalmazza az „SSR + i18n validated" szöveget
- **And** nincs `@@` raw translation key egyik HTML-ben sem

**AC-3: `server.ts` locale-aware path fix**
- **Given** `ng build --localize` után a `dist/dance/server/hu/` és `dist/dance/server/en/` server bundle-ök léteznek
- **When** `node dist/dance/server/hu/server.mjs` fut
- **Then** a server elindul a 4000-es porton hiba nélkül
- **And** `curl http://localhost:4000/hu/` visszaad 200 státuszú HTML-t az SSR probe stringgel

**AC-4: Nincs hydration mismatch a böngészőben**
- **Given** a `ng serve` fut és az alkalmazás megnyílik a böngészőben
- **Then** nincs `ExpressionChangedAfterItHasBeenChecked` error a konzolban
- **And** nincs Angular hydration mismatch warning/error a konzolban

---

## Epic Context

**Epic 1 célja:** Fejlesztői futtatható Angular 18 SSR + bilingual alap, amelyre minden komponens épülhet.

**Ez a sztori NEM feladata:**
- Vercel deploy konfiguráció → Story 1.4
- Valódi AppComponent shell (sticky header stb.) → Story 2.1
- Bármilyen UI komponens érdemi tartalmával → Story 2.1+
- `messages.hu.xlf` referenciává tétele / `ng build --localize` i18n pipeline reform → helyes viselkedés, dokumentált korlát

**Következő sztori (1.4):** Vercel deploy konfiguráció + GitHub Actions CI/CD, ahol a `vercel.json` CSP headerek + locale routing rewrites is meghatározódnak.

---

## Developer Context

### Előfeltételek (ellenőrizd)

```powershell
# Angular projekt megvan, Story 1.2 done
Test-Path "c:\Users\user\Documents\Saját\Dance\dance\src\locale\messages.en.xlf"  # → True
Test-Path "c:\Users\user\Documents\Saját\Dance\dance\src\locale\messages.hu.xlf"  # → True

# dist/dance/browser/hu és /en léteznek (ng build --localize már lefutott)
Test-Path "c:\Users\user\Documents\Saját\Dance\dance\dist\dance\browser\hu\index.html"  # → True
```

**Könyvtár (MINDEN parancshoz):**
```powershell
cd "c:\Users\user\Documents\Saját\Dance\dance"
```

### Story 1.2 tanulságok — ami erre is vonatkozik

1. **Globális Angular CLI v21** — mindig `npx @angular/cli@18` prefixet használj
2. **PowerShell UTF-8 encoding** — fájlírás KÖTELEZŐEN: `[System.IO.File]::WriteAllText(path, content, New-Object System.Text.UTF8Encoding $false)`; `Set-Content` ANSI kódolást használ → encoding hiba
3. **`missingTranslation`** NEM érvényes property a production build config szintjén az `application` builderben — hagyd alapértelmezésen
4. **`messages.hu.xlf`** nincs referálva az `angular.json`-ban (mert a `hu` a `sourceLocale`) — ez helyes viselkedés. A fájl csak dokumentáció. HU fordítás a template source stringekből jön.
5. **`ng build --localize`** development config alatt (`localize: false`) nem fut — a `--localize` flag csak production config-gal érvényes: `npx @angular/cli@18 build --localize`

### Kritikus SSR + i18n ismeret

#### 1. server.ts path issue — `--localize` után

**Probléma:** A generált `server.ts` feltételezi, hogy a server bundle a `dist/dance/server/` könyvtárban van. `ng build --localize` után viszont a server bundle-ök itt vannak:
- `dist/dance/server/hu/server.mjs`
- `dist/dance/server/en/server.mjs`

Az `index.server.html` egyszerűen nem létezik localized build esetén (csak `dist/dance/server/hu/` stb. tartalmaz `index.server.html`-t).

A `browserDistFolder` jelenlegi számítása:
```javascript
// JELENLEGI (hibás localized build esetén):
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
// Ha serverDistFolder = dist/dance/server/hu/
// akkor browserDistFolder = dist/dance/server/browser/  ← NEM LÉTEZIK
```

**Javítás — locale-aware path detekció:**
```javascript
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
// Ha a serverDistFolder szülője 'server' nevű mappa → localized build
const isLocalizedBuild = basename(dirname(serverDistFolder)) === 'server';
const browserDistFolder = isLocalizedBuild
  ? resolve(dirname(dirname(serverDistFolder)), 'browser', basename(serverDistFolder))
  // dist/dance/server/hu/ → dist/dance/browser/hu/
  : resolve(serverDistFolder, '../browser');
  // dist/dance/server/ → dist/dance/browser/
```

#### 2. APP_BASE_HREF fix — express `req.baseUrl` mindig üres string

**Probléma:** Az Express top-level route handler-eknél `req.baseUrl === ''` mindig, ezért az Angular Router nem kapja meg a locale prefix-et.

**Javítás:**
```javascript
// JELENLEGI (hibás):
providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],  // baseUrl = ''

// HELYES — URL-ből kinyert locale prefix:
const localeMatch = originalUrl.match(/^\/([a-z]{2})\//);
const localeBaseHref = localeMatch ? `/${localeMatch[1]}/` : '/';
providers: [{ provide: APP_BASE_HREF, useValue: localeBaseHref }],
```

#### 3. `isPlatformBrowser()` + `afterNextRender()` pattern

Ez az Angular 18 kanonikus SSR-safe inicializáció minta:

```typescript
import { Component, inject, PLATFORM_ID, signal, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ssr-probe',
  standalone: true,
  template: `
    <p i18n="@@ssr-probe.validated">SSR + i18n validált</p>
    <p>Renderelés: {{ renderEnv() }}</p>
  `
})
export class SsrProbeComponent {
  private platformId = inject(PLATFORM_ID);
  protected renderEnv = signal('server');  // SSR output: 'server'

  constructor() {
    afterNextRender(() => {
      // afterNextRender() CSAK browserben fut — nem okoz hydration mismatch-et
      if (isPlatformBrowser(this.platformId)) {
        this.renderEnv.set('browser');
      }
    });
  }
}
```

**Miért nem okoz hydration mismatch-et az `afterNextRender()`:**
- A szerver `renderEnv()` értéke = `'server'` (Signal initial value)
- Az Angular hydration befejezésekor az `afterNextRender()` csak EZUTÁN fut le a kliensen
- Angular nem hasonlítja össze az `afterNextRender`-ben megváltozott értéket az SSR outputtal
- Ez az elvárt minta, nem workaround

#### 4. i18n extraction és XLF update flow

```powershell
# 1. Extract-i18n (felülírja messages.xlf-t)
npx @angular/cli@18 extract-i18n

# 2. Új trans-unit megjelent a messages.xlf-ben
# → Add hozzá messages.en.xlf-hez is:
# <trans-unit id="ssr-probe.validated" ...>
#   <source>SSR + i18n validált</source>
#   <target state="translated">SSR + i18n validated</target>
# </trans-unit>

# 3. Az ng build --localize automatikusan ellenőrzi a messages.en.xlf-et
```

**FONTOS:** Ne felejtsd el az EN fordítást! `messages.en.xlf` nélkül az `en` locale build `missingTranslation: "error"` esetén hibával állna meg (default: warning, de production-ban is warningleket kapnánk).

---

## Lépés-by-lépés végrehajtás

**1. lépés — `SsrProbeComponent` létrehozása**

Hozd létre a `src/app/components/ssr-probe/` mappát és fájlokat:

**`src/app/components/ssr-probe/ssr-probe.component.ts`:**
```typescript
import { Component, inject, PLATFORM_ID, signal, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ssr-probe',
  standalone: true,
  templateUrl: './ssr-probe.component.html',
})
export class SsrProbeComponent {
  private platformId = inject(PLATFORM_ID);
  protected renderEnv = signal('server');

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.renderEnv.set('browser');
      }
    });
  }
}
```

**`src/app/components/ssr-probe/ssr-probe.component.html`:**
```html
<!-- SSR validation probe: rendelt le és töröld Story 2.1 implementálásakor -->
<div style="display:none" aria-hidden="true">
  <span i18n="@@ssr-probe.validated">SSR + i18n validált</span>
  <span>{{ renderEnv() }}</span>
</div>
```

> ⚠️ `display:none` + `aria-hidden="true"` — a probe nem látható a felhasználónak, de az SSR-rendered HTML-ben jelen van (Search engine-ek is látják a tartalmat).

**`src/app/components/ssr-probe/ssr-probe.component.spec.ts`:**
```typescript
import { TestBed } from '@angular/core/testing';
import { SsrProbeComponent } from './ssr-probe.component';

describe('SsrProbeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsrProbeComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SsrProbeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should start with server renderEnv', () => {
    const fixture = TestBed.createComponent(SsrProbeComponent);
    const component = fixture.componentInstance;
    // Initial state before afterNextRender fires
    expect(component['renderEnv']()).toBe('server');
  });
});
```

**2. lépés — `AppComponent` frissítése**

**`src/app/app.component.ts`:**
```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SsrProbeComponent } from './components/ssr-probe/ssr-probe.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SsrProbeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
```

**`src/app/app.component.html`:**
```html
<!-- Placeholder - Story 2.1 (AppComponent shell) lecseréli a valódi tartalommal -->
<h1 i18n="@@app.placeholder-heading">Zsófi tánciskola</h1>
<app-ssr-probe />
<router-outlet />
```

**3. lépés — `server.ts` locale-aware path fix**

Módosítsd a `server.ts` fájlt az import sorral kiegészítve:

```typescript
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));

  // Locale-aware path: ng build --localize produces server/hu/ and server/en/
  // For non-localized builds: dist/dance/server/ → dist/dance/browser/
  // For localized builds:    dist/dance/server/hu/ → dist/dance/browser/hu/
  const isLocalizedBuild = basename(dirname(serverDistFolder)) === 'server';
  const browserDistFolder = isLocalizedBuild
    ? resolve(dirname(dirname(serverDistFolder)), 'browser', basename(serverDistFolder))
    : resolve(serverDistFolder, '../browser');

  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, headers } = req;

    // Derive locale baseHref from URL prefix (/hu/, /en/, etc.)
    const localeMatch = originalUrl.match(/^\/([a-z]{2})\//);
    const localeBaseHref = localeMatch ? `/${localeMatch[1]}/` : '/';

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: localeBaseHref }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
```

**4. lépés — `ng extract-i18n` futtatása**

```powershell
npx @angular/cli@18 extract-i18n
```

Ellenőrzés:
```powershell
Select-String -Path "src\locale\messages.xlf" -Pattern "ssr-probe"
# → <trans-unit id="ssr-probe.validated" ...>
```

**5. lépés — `messages.en.xlf` frissítése**

Az `src/locale/messages.en.xlf` fájlhoz add hozzá az új `trans-unit`-ot a meglévő bejegyzés után (UTF-8 No-BOM módban!):

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="hu" target-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="app.placeholder-heading" datatype="html">
        <source>Zsófi tánciskola</source>
        <target state="translated">Zsófi Dance School</target>
      </trans-unit>
      <trans-unit id="ssr-probe.validated" datatype="html">
        <source>SSR + i18n validált</source>
        <target state="translated">SSR + i18n validated</target>
      </trans-unit>
    </body>
  </file>
</xliff>
```

**PowerShell write parancs (UTF-8 No-BOM):**
```powershell
$enc = New-Object System.Text.UTF8Encoding $false
$content = @"
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="hu" target-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="app.placeholder-heading" datatype="html">
        <source>Zsófi tánciskola</source>
        <target state="translated">Zsófi Dance School</target>
      </trans-unit>
      <trans-unit id="ssr-probe.validated" datatype="html">
        <source>SSR + i18n validált</source>
        <target state="translated">SSR + i18n validated</target>
      </trans-unit>
    </body>
  </file>
</xliff>
"@
[System.IO.File]::WriteAllText("c:\Users\user\Documents\Saját\Dance\dance\src\locale\messages.en.xlf", $content, $enc)
```

**6. lépés — `ng build --localize`**

```powershell
npx @angular/cli@18 build --localize
```

Várt kimenet:
```
Generating localized build for hu...
Generating localized build for en...
Prerendered 2 static routes.
Application bundle generation complete.
```

**7. lépés — Validáció: prerendered HTML tartalma**

```powershell
# AC-2: i18n stringek a prerendered HTML-ben
Select-String -Path "dist\dance\browser\hu\index.html" -Pattern "SSR \+ i18n validált"
# → match expected

Select-String -Path "dist\dance\browser\en\index.html" -Pattern "SSR \+ i18n validated"
# → match expected

# Nincs raw i18n key
Select-String -Path "dist\dance\browser\hu\index.html" -Pattern "@@"  # → no match
Select-String -Path "dist\dance\browser\en\index.html" -Pattern "@@"  # → no match

# Placeholder heading is helyes
Select-String -Path "dist\dance\browser\hu\index.html" -Pattern "Zsófi tánciskola"  # → match
Select-String -Path "dist\dance\browser\en\index.html" -Pattern "Zsófi Dance School"  # → match
```

**8. lépés — Validáció: server.ts runtime SSR (AC-3)**

Futtasd a HU locale server bundle-t (Powershell terminálban):

```powershell
# Futtasd háttérben (Ctrl+C-vel leállítható)
node dist\dance\server\hu\server.mjs
# → Node Express server listening on http://localhost:4000
```

Másik terminálban:
```powershell
# Curl-lel ellenőrzöd az SSR HTML-t
Invoke-WebRequest -Uri "http://localhost:4000/hu/" | Select-Object -ExpandProperty Content | Select-String "SSR"
# → "SSR + i18n validált" szöveg a HTML-ben
```

**9. lépés — Validáció: hydration mismatch ellenőrzés (AC-4)**

```powershell
npx @angular/cli@18 serve
```

Böngészőben `http://localhost:4200/`:
- Nyisd meg a DevTools Console-t
- Keress `ExpressionChangedAfterItHasBeenChecked`, `NG0100`, `NG0504`, `NG0` vagy `hydration` szavakat
- Ha nincs → AC-4 teljesítve ✅

---

## Technical Requirements

### Módosítandó / létrehozandó fájlok

| Fájl | Változás |
|---|---|
| `src/app/components/ssr-probe/ssr-probe.component.ts` | 🆕 Létrehozni |
| `src/app/components/ssr-probe/ssr-probe.component.html` | 🆕 Létrehozni |
| `src/app/components/ssr-probe/ssr-probe.component.spec.ts` | 🆕 Létrehozni |
| `src/app/app.component.ts` | ✏️ Módosítani — `SsrProbeComponent` import hozzáadása |
| `src/app/app.component.html` | ✏️ Módosítani — `<app-ssr-probe />` hozzáadása |
| `server.ts` | ✏️ Módosítani — locale-aware browserDistFolder + APP_BASE_HREF fix |
| `src/locale/messages.xlf` | ✏️ `ng extract-i18n` felülírja |
| `src/locale/messages.en.xlf` | ✏️ Módosítani — `ssr-probe.validated` EN fordítás |
| `src/locale/messages.hu.xlf` | ✏️ Módosítani — `ssr-probe.validated` HU bejegyzés (referencia) |

### NEM módosítandó

- `angular.json` — Story 1.2-ben teljesen beállítva
- `app.config.ts`, `app.config.server.ts` — változatlan
- `tsconfig.*` — változatlan
- `tailwind.config.js`, `styles.css` — változatlan
- `package.json` — változatlan (Story 1.2 review patch: `@angular/localize` már `dependencies`-ben)

---

## Architecture Compliance

### SSR boundary rule (architektúra konvenció)

```
SSR Boundary:
  - app.config.server.ts → SSR-only providers (nincs itt browser-only)
  - isPlatformBrowser() → minden browser-only kód KÖTELEZŐ guarddal
  - afterNextRender() → Angular 18 idiomatic browser-only init hook
```

**Az `SsrProbeComponent` demonstrálja:**
1. `inject(PLATFORM_ID)` → a standard platform detection token
2. `isPlatformBrowser(platformId)` → a guard
3. `afterNextRender(() => { ... })` → a browser-only init hook
4. `signal('server')` → initial SSR state, updates only after hydration

### Standalone component pattern

```typescript
@Component({
  selector: 'app-ssr-probe',  // 'app-' prefix ← architektúra konvenció
  standalone: true,            // standalone: true ← kötelező
  ...
})
```

### Komponens elhelyezési szabály

```
src/app/components/ssr-probe/    ← {feature-name}/ mappa
  ssr-probe.component.ts
  ssr-probe.component.html
  ssr-probe.component.spec.ts    ← co-located spec, NEM __tests__/
```

### i18n ID konvenció

- `@@ssr-probe.validated` — `{component}.{element}` pont-szeparált, lowercase, hyphen belül ✅
- Forrás: architektúra "Naming Patterns → i18n IDs"

---

## Library & Framework Requirements

| Csomag | Verzió | Megjegyzés |
|---|---|---|
| `@angular/core` | `^18.2.0` | `afterNextRender`, `inject`, `PLATFORM_ID`, `signal` |
| `@angular/common` | `^18.2.0` | `isPlatformBrowser` |
| `@angular/ssr` | `^18.2.21` | `CommonEngine` |
| `@angular/localize` | `^18.2.14` | build-time i18n |

**Node.js verzió:** 24.x (kompatibilis, nem 20 LTS ahogyan a spec mondja, de működik)
**Angular CLI:** `npx @angular/cli@18` (globális CLI v21 miatt szükséges prefix)

---

## Common Mistakes to Avoid

1. **`afterNextRender` callback-ben SignalValue megváltoztatása hydration mismatch nélkül** — ez helyes viselkedés, nem bug. Az Angular kifejezetten ezt a mintát ajánlja.

2. **`server.ts` importból hiányzik a `basename`** — az importt ki kell bővíteni:
   ```typescript
   import { basename, dirname, join, resolve } from 'node:path';  // basename hozzáadva!
   ```

3. **`ng build --localize` előtt felejtsd el frissíteni `messages.en.xlf`-t** → a build default-ban Warning-gal megy át (missingTranslation: warning), de az EN index.html Hungarian szöveget fog tartalmazni az SSR probe stringnél.

4. **`app.component.html` változás után `ng extract-i18n` futtatása előtt buildelni** → a `messages.xlf` nem frissül automatikusan, azt mindig manuálisan triggerelni kell.

5. **`SsrProbeComponent` spec-ben `afterNextRender` tesztelése** — a Jasmine/Karma environment-ben `afterNextRender` nem triggerel automatikusan (nem igazi browser lifecycle). A spec CSAK az initial state-t tesztelje (server), ne a browser state-t.

6. **`server.ts` `isLocalizedBuild` hibás detekció** — `basename(dirname(serverDistFolder))` adja a szülőmappa nevét. Ha a `serverDistFolder` = `dist/dance/server/hu/`, akkor `dirname(serverDistFolder)` = `dist/dance/server/` és `basename(...)` = `server`. Ez a detekció tehát a `server` nevű könyvtárra konzisztensen működik.

---

## Project Context Reference

Teljes szabálykészlet: `_bmad-output/project-context.md`

Legfontosabb szabályok erre a sztorira:
- **SSR safety** — `isPlatformBrowser()` + `afterNextRender()` minden browser-only kódhoz
- **i18n completeness** — minden user-visible string `i18n` attribútummal jelölt  
- **Standalone components** — `standalone: true` kötelező
- **PowerShell UTF-8** — `[System.IO.File]::WriteAllText(..., New-Object System.Text.UTF8Encoding $false)`
- **Angular CLI verzió** — mindig `npx @angular/cli@18`
- **`messages.hu.xlf`** — csak referencia fájl, nem referált az angular.json-ban (HU sourceLocale → template source stringekből épül)

---

## Dev Notes

_(Ide kerülnek az implementáció során felfedezett tanulságok)_
