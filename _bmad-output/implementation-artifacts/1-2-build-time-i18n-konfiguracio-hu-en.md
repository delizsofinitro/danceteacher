---
storyId: '1.2'
storyKey: '1-2-build-time-i18n-konfiguracio-hu-en'
epicId: '1'
status: 'ready-for-dev'
createdAt: '2026-03-21'
---

# Story 1.2 — Build-time i18n konfiguráció (HU + EN)

## User Story

**As a developer,**
I want to configure `@angular/localize` with dual-language builds for Hungarian and English,
**So that** `ng build --localize` produces independent `/hu/` and `/en/` output trees.

---

## Acceptance Criteria

**AC-1: @angular/localize telepítés és duális build**
- **Given** `ng add @angular/localize` has been run
- **When** `angular.json` i18n configuration is set up with `hu` and `en` locales
- **Then** `ng build --localize` completes without errors
- **And** the dist folder contains separate `/hu/` and `/en/` subdirectories, each with valid `index.html`

**AC-2: i18n string extraction**
- **Given** `src/locale/messages.xlf` (source) and `src/locale/messages.hu.xlf` (HU) exist
- **When** a string is marked `i18n="@@explicit-id"` in a template
- **Then** `ng extract-i18n` adds it to `messages.xlf`
- **And** the HU `.xlf` file contains a corresponding `<trans-unit>` entry with `<target>`

**AC-3: Dual-language tartalom a build outputban**
- **Given** the dual-language build output
- **When** both `/hu/index.html` and `/en/index.html` are inspected
- **Then** HU build tartalmazza a „Zsófi tánciskola" szöveget
- **And** EN build tartalmazza a „Zsófi Dance School" szöveget
- **And** nincs `@@` raw translation key egyik HTML-ben sem

---

## Epic Context

**Epic 1 célja:** A fejlesztő futtatható Angular 18 SSR + bilingual alapot kap, amelyre minden komponens épülhet. Story 1.2 a build-time i18n infrastruktúrát állítja fel.

**Ez a sztori NEM feladata:**
- SSR + i18n együttes end-to-end validáció → Story 1.3 (következő)
- Bármilyen érdemi fordítás hozzáadása → Epic 3–5 storyjai (ahol a szöveg véglegesül)
- Vercel deploy konfiguráció véglegesítése → Story 1.4
- Bármilyen UI komponens fejlesztése → Story 2.1+
- `LanguageSwitcher` komponens → Story 2.2

**Következő sztori (1.3)** az SSR + i18n együttes renderelését validálja egy prototípus komponenssel (`isPlatformBrowser()` + `afterNextRender()` pattern tesztelés).

---

## Developer Context

### Előfeltételek (ellenőrizd Story 1.1 teljesítését)

1. `dance/` mappa létezik és az Angular 18 projekt felépült: `Test-Path dance/angular.json` → `True`
2. `dance/src/locale/messages.xlf` és `dance/src/locale/messages.hu.xlf` léteznek (üres XLIFF skeletonok) — Story 1.1 hozta létre
3. `dance/src/app/app.config.ts` már tartalmazza `provideHttpClient(withFetch())` — Story 1.1 megcsinálta, NE add hozzá újra
4. **Könyvtár:** minden parancsot a `dance/` mappából futtass: `cd "c:\Users\user\Documents\Saját\Dance\dance"`

### Story 1.1 tanulságok — ami erre a sztorira is vonatkozik

1. **Globális Angular CLI v21** van telepítve, de pár `@angular/cli@18` is. MINDIG `npx @angular/cli@18` prefixet használj — a globális `ng` CLI eltérő verziójú csomagot telepíthet!
2. **Node.js 24** van (nem 20 LTS) — ez kompatibilis, nem gond
3. **`@types/glightbox` nem létezik** npm-en — GLightbox saját TS típusokat tartalmaz, kihagytuk: NE próbáld telepíteni
4. CSS `@import` mindig a `@tailwind` direktívák ELÖTT kell — ez már be van állítva `styles.css`-ben
5. A `ng add` parancs automatikusan módosítja az `angular.json`-t — olvasd el mit változtatott, mielőtt manuálisan szerkeszted

### Lépés-by-lépés végrehajtás

**1. lépés — `@angular/localize` telepítése**

```bash
npx @angular/cli@18 add @angular/localize
```

Amit ez automatikusan végez:
- Hozzáadja `@angular/localize` csomagot `package.json` dependencies-be
- Hozzáadja `"@angular/localize/init"` polyfill-t `angular.json`-ban a `build` és `test` konfigurációk `polyfills` tömbjéhez

**Ellenőrzés `ng add` után:**
```powershell
# package.json-ban megjelent @angular/localize
Get-Content package.json | Select-String "@angular/localize"
# → "@angular/localize": "^18.x.x"

# angular.json polyfills frissül
Get-Content angular.json | Select-String "localize/init"
# → "@angular/localize/init"
```

> ⚠️ Ha a `ng add @angular/localize` mégis nem adja hozzá a polyfill-t automatikusan (Angular 18-ban néha előfordul), add hozzá manuálisan az `angular.json`-ban a `build.options.polyfills` tömbhöz: `"@angular/localize/init"`.

**2. lépés — `angular.json` i18n szekció hozzáadása**

Az `i18n` szekciót a `dance` projekt objektumba kell beilleszteni — az `"architect"` objektumon **KÍVÜL**, de a `"dance": { ... }` blokkon **belül**.

A helyes elhelyezés az `angular.json`-ban:
```json
"projects": {
  "dance": {
    "projectType": "application",
    "schematics": {},
    "root": "",
    "sourceRoot": "src",
    "prefix": "app",

    "i18n": {
      "sourceLocale": "hu",
      "locales": {
        "hu": {
          "translation": "src/locale/messages.hu.xlf",
          "baseHref": "/hu/"
        },
        "en": {
          "translation": "src/locale/messages.en.xlf",
          "baseHref": "/en/"
        }
      }
    },

    "architect": {
      ...
    }
  }
}
```

> ⚠️ **KRITIKUS:** Az `i18n` szekció az `architect` TESTVÉRE (sibling), nem gyermeke! Leggyakoribb hiba: az `architect`-en belülre kerül → build error.
> ⚠️ `sourceLocale: "hu"` — a templatek hungarianul vannak írva. Az `en` fordítást az `messages.en.xlf` fájl adja.

**Az `extract-i18n` builder frissítése** (ugyanazon `architect` szekción belül):

```json
"extract-i18n": {
  "builder": "@angular-devkit/build-angular:extract-i18n",
  "options": {
    "outputPath": "src/locale",
    "outFile": "messages.xlf"
  }
}
```

> Ez biztosítja, hogy `ng extract-i18n` a `src/locale/messages.xlf` fájlba írjon (alapértelmezés szerint a projekt gyökerére írna).

**`build.configurations.development` frissítése** — add hozzá a `missingTranslation` opciót:

```json
"development": {
  "optimization": false,
  "extractLicenses": false,
  "sourceMap": true,
  "localize": false,
  "missingTranslation": "warning"
}
```

> A `"missingTranslation": "warning"` csak dev módban figyelmeztet, nem hibával áll le, ha egy string fordítása hiányzik. A `production` konfigban maradjon az alapértelmezett `error` (hiányzó fordítás = build error — ezt akarjuk!).

**3. lépés — `app.component.html` egyszerűsítése i18n string hozzáadásával**

A jelenlegi `app.component.html` az Angular CLI default welcome page-jét tartalmazza — ez nem szükséges. Cseréld le a teljes tartalmát:

```html
<!-- Placeholder – Story 2.1 (AppComponent shell) lecseréli a valódi tartalommal -->
<h1 i18n="@@app.placeholder-heading">Zsófi tánciskola</h1>
<router-outlet />
```

Az `@@app.placeholder-heading` explicit i18n ID-t ad a stringnek. Az `@@` prefix kötelező a explicit ID-khez (két `@` szimbólum). Az architektúra konvenció szerint az ID formátuma: `{component}.{element}`.

**`app.component.ts` frissítése** — a `title` property már nem szükséges:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
```

**`app.component.spec.ts` frissítése** — az Angular welcome page tesztek elavultak:

```typescript
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
```

**4. lépés — `ng extract-i18n` futtatása**

```bash
npx @angular/cli@18 extract-i18n
```

Ez FELÜLÍRJA a `src/locale/messages.xlf` fájlt az extrahált stringekkel. Várt kimenet a `messages.xlf`-ben:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="hu" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="app.placeholder-heading" datatype="html">
        <source>Zsófi tánciskola</source>
        <context-group purpose="location">
          <context context-type="sourcefile">src/app/app.component.html</context>
          <context context-type="linenumber">2</context>
        </context-group>
      </trans-unit>
    </body>
  </file>
</xliff>
```

> ⚠️ Az `ng extract-i18n` a `src/locale/messages.xlf` fájlt TELJESEN felülírja — ez helyes és elvárt viselkedés.

**5. lépés — `messages.hu.xlf` feltöltése**

Cseréld le az `src/locale/messages.hu.xlf` tartalmát az extrahált stringekkel és HU target fordításokkal:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="hu" target-language="hu" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="app.placeholder-heading" datatype="html">
        <source>Zsófi tánciskola</source>
        <target state="final">Zsófi tánciskola</target>
      </trans-unit>
    </body>
  </file>
</xliff>
```

> `state="final"` jelzi a fordítás kész állapotát. A HU `<target>` megegyezik a `<source>`-szal — ez helyes, mert a forrás magyar.

**6. lépés — `messages.en.xlf` létrehozása**

Hozd létre az `src/locale/messages.en.xlf` fájlt EN fordítással:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="hu" target-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="app.placeholder-heading" datatype="html">
        <source>Zsófi tánciskola</source>
        <target state="translated">Zsófi Dance School</target>
      </trans-unit>
    </body>
  </file>
</xliff>
```

> ⚠️ `source-language="hu"` maradjon — mindig az eredeti forrás nyelve. Csak `target-language` és `<target>` elemek változnak locale-onként.
> ⚠️ A `state="translated"` jelzi az EN fordítás kész állapotát.

**7. lépés — `ng build --localize` futtatása**

```bash
npx @angular/cli@18 build --localize
```

Várt konzol kimenet:
```
Generating localized build for hu...
Generating localized build for en...
Application bundle generation complete.
```

Várt dist struktúra Angular 18 (SSR + --localize esetén):
```
dist/dance/
  browser/
    hu/          ← HU browser bundle
      index.html
      main-*.js
      styles-*.css
    en/          ← EN browser bundle
      index.html
      main-*.js
      styles-*.css
  server/
    hu/          ← HU SSR server bundle
      ...
    en/          ← EN SSR server bundle
      ...
```

> ⚠️ Ha a build hibával leáll ("Missing translation"), ellenőrizd: (1) mindkét `.xlf` fájl tartalmaz `<trans-unit>` bejegyzést, (2) a `trans-unit id` egyezik a template-ben lévő `@@app.placeholder-heading` azonosítóval, (3) a `messages.en.xlf` létezik és nem üres.

**8. lépés — Validáció**

```powershell
# Locale-specifikus index.html fájlok megléte
Test-Path "dist\dance\browser\hu\index.html"   # → True
Test-Path "dist\dance\browser\en\index.html"   # → True

# HU build helyes tartalmat renderelt
Select-String -Path "dist\dance\browser\hu\index.html" -Pattern "Zsófi tánciskola"
# → Match várható

# EN build helyes tartalmat renderelt
Select-String -Path "dist\dance\browser\en\index.html" -Pattern "Zsófi Dance School"
# → Match várható

# Nincs raw i18n key a kimenetben
Select-String -Path "dist\dance\browser\hu\index.html" -Pattern "@@"  # → üres (nincs match)
Select-String -Path "dist\dance\browser\en\index.html" -Pattern "@@"  # → üres (nincs match)
```

---

## Technical Requirements

### Módosítandó / létrehozandó fájlok

| Fájl | Változás | Tartalom |
|---|---|---|
| `angular.json` | ✏️ Módosítani | `i18n` szekció hozzáadása, `extract-i18n` options, dev config `missingTranslation` |
| `src/app/app.component.html` | ✏️ Módosítani | Welcome page → placeholder heading + router-outlet |
| `src/app/app.component.ts` | ✏️ Módosítani | `title` property eltávolítása |
| `src/app/app.component.spec.ts` | ✏️ Módosítani | Welcome page tesztek eltávolítása, minimal spec |
| `src/locale/messages.xlf` | ✏️ Felülírni | `ng extract-i18n` felülírja az extrahált stringekkel |
| `src/locale/messages.hu.xlf` | ✏️ Módosítani | `trans-unit` bejegyzés HU targettel |
| `src/locale/messages.en.xlf` | 🆕 Létrehozni | EN fordítási fájl |

### NEM módosítandó ebben a sztoriban

- `src/app/app.config.ts` → már helyes (Story 1.1-ben elkészítve)
- `tailwind.config.js`, `postcss.config.js` → változatlan
- `vercel.json` → Story 1.4 véglegesíti
- Bármilyen `components/` mappában lévő fájl → Story 2.1+
- `package.json` egyéb csomagjai → `ng add @angular/localize` kezeli

---

## Architecture Compliance

### i18n string pattern (architektúra konvenció)

```html
<!-- HELYES — explicit @@ID kötelező -->
<h1 i18n="@@app.placeholder-heading">Zsófi tánciskola</h1>
<button i18n="@@contact.submit-button">Küldés</button>
<p i18n="@@nav.home-link">Főoldal</p>

<!-- HELYTELEN — auto-generált hash ID, build-to-build változhat -->
<h1 i18n>Zsófi tánciskola</h1>
```

### i18n ID naming konvenció

- Formátum: `{component}.{element}` — pont-szeparált, lowercase, hyphen belül
- Példák: `app.placeholder-heading`, `hero.headline`, `contact.submit-button`, `nav.close-label`
- Forrás: Architektúra doc „Naming Patterns → i18n IDs" szekció

### Standalone component pattern — változatlan

Az `AppComponent` marad `standalone: true` az architektúra szerint. Nincs NgModule, nincs modul importálás.

### Fájl elhelyezési szabályok

- Locale fájlok KIZÁRÓLAG `src/locale/` mappában
- `messages.xlf` = `ng extract-i18n` által generált forrás
- `messages.hu.xlf` = HU fordítás (source == target mert HU a forrás nyelv)
- `messages.en.xlf` = EN fordítás

---

## Library & Framework Requirements

| Csomag | Verzió | Forrás |
|---|---|---|
| `@angular/localize` | `^18.x` (auto-telepíti `ng add`) | Hozzáadandó |
| `@angular/core` | `^18.2.0` | Már telepítve (Story 1.1) |
| `@angular/ssr` | `^18.2.21` | Már telepítve (Story 1.1) |
| `tailwindcss` | `^3.4.19` | Már telepítve (Story 1.1) |

> **Node.js verzió:** 24.x — kompatibilis Angular 18-cal, de a story spec 20 LTS-t említ. A 24 is működik.
> **Angular CLI:** `npx @angular/cli@18` form szükséges (globális CLI v21).

---

## File Structure Requirements

```
dance/
├── angular.json                     ← ✏️ MÓDOSÍTANI (i18n szekció + extract-i18n options + dev missingTranslation)
├── src/
│   ├── app/
│   │   ├── app.component.ts         ← ✏️ MÓDOSÍTANI (title property eltávolítás)
│   │   ├── app.component.html       ← ✏️ MÓDOSÍTANI (welcome page → placeholder + router-outlet)
│   │   └── app.component.spec.ts    ← ✏️ MÓDOSÍTANI (welcome page tesztek → minimal spec)
│   └── locale/
│       ├── messages.xlf             ← ✏️ ng extract-i18n FELÜLÍRJA
│       ├── messages.hu.xlf          ← ✏️ MÓDOSÍTANI (trans-unit kitöltés, HU target)
│       └── messages.en.xlf          ← 🆕 LÉTREHOZNI (EN fordítás)
```

---

## Testing Requirements

Ez infrastrukturális sztori — nincs unit test a build pipeline-hoz. A validáció a build output ellenőrzése:

```powershell
# 1. Build output validáció
Test-Path "dist\dance\browser\hu\index.html"  # → True
Test-Path "dist\dance\browser\en\index.html"  # → True

# 2. Tartalom helyes
Select-String -Path "dist\dance\browser\hu\index.html" -Pattern "Zsófi tánciskola"   # match
Select-String -Path "dist\dance\browser\en\index.html" -Pattern "Zsófi Dance School" # match

# 3. Nincs raw i18n key
Select-String -Path "dist\dance\browser\hu\index.html" -Pattern "@@"  # → no match
Select-String -Path "dist\dance\browser\en\index.html" -Pattern "@@"  # → no match
```

**`app.component.spec.ts` unit test futtatása** (opcionális, de ajánlott regressions check):
```bash
npx @angular/cli@18 test --watch=false
# → 1 spec, 0 failures
```

---

## Common Mistakes to Avoid

1. **Globális `ng add` használata** → `ng add @angular/localize` helyett KÖTELEZŐ: `npx @angular/cli@18 add @angular/localize` — a globális CLI v21, ami más verziót telepíthet!

2. **`i18n` szekció az `architect` BELSEJÉBE kerül** → Az `i18n` szekció az `"architect"` TESTVÉRE (sibling), nem gyermeke! Helyes: `"dance": { "i18n": {...}, "architect": {...} }`.

3. **Üres `.xlf` fájlok `ng build --localize` előtt** → Ha van `i18n` attribútum a template-ben, de a `.xlf` fájl üres (nincs `<trans-unit>`), a production build "missing translation" error-ral leáll. A 4–6 lépések sorrendben KÖTELEZŐK.

4. **Implicit i18n ID (`i18n` attribútum `@@` nélkül)** → Auto-generált hash ID build-to-build változhat, és a fordítási fájlokat tönkreteheti. MINDIG explicit ID: `i18n="@@app.elem-id"`.

5. **`messages.en.xlf` hiánya** → Az `en` locale fordítási fájlja KÖTELEZŐ, ha az `en` locale role definiálva van az `angular.json` `i18n.locales`-ban. Hiánya: build error.

6. **`source-language` helytelen értéke** → A `.xlf` fájlokban `source-language="hu"` MINDIG (ez a forrás template nyelve). Csak `target-language` változik locale-onként.

7. **`extractLicenses`, `outputPath` hiánya az `extract-i18n` optionsnél** → Alapértelmezés: `ng extract-i18n` a projekt gyökerébe ír `messages.xlf`-t. Az `options.outputPath: "src/locale"` nélkül nem a megfelelő mappába kerül.

8. **`baseHref` kihagyása a locale konfigból** → Az `i18n.locales.hu.baseHref: "/hu/"` és `.en.baseHref: "/en/"` szükséges, hogy az Angular a megfelelő URL prefixet generálja a navigációs linkekhez.

9. **`app.component.spec.ts` frissítésének kihagyása** → A default Angular CLI által generált welcome page tesztek az `AppComponent` `title` propertyt tesztelik. Ha kitöröljük a propertyt és a template-t, a tesztek hibával futnak. Frissíteni kell.

10. **`provideHttpClient(withFetch())` ismételt hozzáadása** → Ez már Story 1.1-ben megvan az `app.config.ts`-ben. Ne add hozzá újra — duplikált provider warningot okoz.

---

## Project Context Reference

A teljes szabálykészlet: `_bmad-output/project-context.md`

Legfontosabb szabályok erre a sztorira:
- Minden user-visible string `i18n` attribútummal jelölt
- `i18n` ID-k mindig explicit (`@@id-formatum`), soha auto-hash
- Standalone components (`standalone: true`) — nincs NgModule, nincs modul
- `ng serve` ≠ `ng serve --ssr` — SSR teszteléshez `--ssr` flag kelll (Story 1.3 validálja)
- `angular.json` i18n szekció struktúra kritikus — hibás elhelyezés cryptic build error-t okoz

---

## Dev Notes (kitöltendő implementáció után)

- [ ] Az `ng add @angular/localize` automatikusan frissítette az `angular.json` polyfills-t?
- [ ] Volt-e bármilyen warningfelhős npm figyelmeztetés?
- [ ] Az `ng build --localize` első futtatáskor leállt-e bármilyen konfigurációs hibával?
- [ ] A build output struktúra megfelel-e a dokumentált `dist/dance/browser/hu/` + `dist/dance/browser/en/` útnak?
- [ ] `ng test` futott-e hibák nélkül a spec frissítés után?
- [ ] Bármilyen ismert probléma a következő sztori (1.3 — SSR+i18n validáció) számára?
