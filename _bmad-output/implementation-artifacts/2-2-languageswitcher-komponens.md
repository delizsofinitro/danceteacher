---
storyId: '2.2'
storyKey: '2-2-languageswitcher-komponens'
epicId: '2'
status: 'ready-for-dev'
createdAt: '2026-03-22'
completedAt: ''
---

# Story 2.2 — LanguageSwitcher komponens

## User Story

**As a visitor,**
I want to switch between Hungarian and English at any time,
**So that** I can read all content in my preferred language.

---

## Acceptance Criteria

**AC-1: Két statikus `<a>` link**
- **Given** a `LanguageSwitcher` komponens renderelve
- **When** megvizsgálva
- **Then** tartalmaz két `<a>` linket: egy `/hu/`-ra és egy `/en/`-re
- **And** egyik link sem használ Angular Router `routerLink`-et (kizárólag statikus `href`)

**AC-2: Navigáció működik**
- **Given** a látogató a `/hu/` oldalon van
- **When** az EN linkre kattint
- **Then** a böngésző teljes oldalt tölt be `/en/`-ben, és az old renders angolul

**AC-3: Aktív nyelv vizuális jelölés**
- **Given** a `LanguageSwitcher` renderelve
- **When** megvizsgálva
- **Then** az aktív nyelv linkje: `coral text-decoration: underline`, `font-weight: 600`, `aria-current="page"`
- **And** az inaktív nyelv linkje: `opacity: 0.6` alapból, hover → `opacity: 1` (0.2s transition)

**AC-4: Akadálymentesség**
- **Given** a `LanguageSwitcher` renderelve
- **When** akadálymentességi szempontok alapján vizsgálva
- **Then** a `<nav>` elem kap `aria-label="Nyelvválasztó"` attribútumot (i18n-nel jelölve)
- **And** minden `<a>` link tartalmaz `hreflang="hu|en"` és `lang="hu|en"` attribútumot
- **And** minden link billentyűzettel fókuszálható és aktiválható
- **And** az aktív link kap `aria-current="page"` attribútumot

**AC-5: i18n — minden látható szöveg jelölve**
- **Given** a komponens template-je
- **When** minden szövegcsomópontot és ARIA attribútumot megvizsgálunk
- **Then** minden látható szöveg és `aria-label` rendelkezik `i18n="@@..."` attribútummal
- **And** mind a `/hu/` mind a `/en/` build helyes feliratokat jelenít meg

**AC-6: Integráció az AppComponent shellbe**
- **Given** a Story 2.1-ben létrehozott AppComponent header slot
- **When** a Story 2.2 elkészül
- **Then** az `app.component.html`-ben a `<!-- LanguageSwitcher — Story 2.2 -->` komment helyére `<app-language-switcher />` kerül
- **And** az `AppComponent` importálja a `LanguageSwitcherComponent`-et

---

## Epic Context

**Epic 2 célja:** A látogató navigálni tud az oldal szekciói között bármilyen eszközön — sticky headerrel, mobil hamburger overlay-jel és nyelvváltóval.

**Ez a sztori NEM feladata:**
- `MobileNavigation` overlay implementálása → Story 2.3 (bár a `LanguageSwitcher` Story 2.3-ban újra lesz използван az overlay aljára)
- Tartalom szekciók → Epic 3
- Aktív szekció detekció (IntersectionObserver) → Epic 3
- `og:url` / végleges `og:image` URL → Epic 5

**Következő sztori (2.3):** `MobileNavigation` komponens fokusztrappal.

---

## Developer Context

### Kódbázis jelenlegi állapota (Story 2.1 után)

```
dance/src/app/
  app.component.ts          ← MÓDOSÍTANDÓ: LanguageSwitcherComponent import hozzáadása
  app.component.html        ← MÓDOSÍTANDÓ: slot-komment lecserélése <app-language-switcher />-re
  components/
    ssr-probe/              ← érintetlen, de AppComponent nem importálja
    language-switcher/      ← LÉTREHOZANDÓ (ez a story scope-ja)
```

**Jelenlegi `app.component.html` slot (kivágat):**
```html
<!-- Right side: LanguageSwitcher slot + MobileNavigation slot -->
<div class="flex items-center gap-3">
  <!-- LanguageSwitcher — Story 2.2 -->
  <!-- MobileNavigation toggle — Story 2.3 (mobile only) -->
</div>
```

**Jelenlegi `app.component.ts` importok:**
```typescript
imports: [RouterOutlet, RouterLink],
```

### Fájlstruktúra (létrehozandó)

```
dance/src/app/components/language-switcher/
  language-switcher.component.ts
  language-switcher.component.html
  language-switcher.component.css   (vagy inline styles — CSS nagyon minimális)
  language-switcher.component.spec.ts
```

### Technikai megvalósítás

#### Lokál detektálás

A jelenlegi Angular 18 `@angular/localize` build-time i18n megközelítésnél a `LOCALE_ID` token a futásidejű helyes locale-t adja vissza:
- HU build-ben: `'hu'`
- EN build-ben: `'en'`

**Injektálás:**
```typescript
import { Component, inject, LOCALE_ID } from '@angular/core';

export class LanguageSwitcherComponent {
  protected readonly locale = inject(LOCALE_ID);
}
```

Ez SSR-biztonságos — nincs szükség `isPlatformBrowser()` guard-ra, mert nem használ browser-only API-t.

#### HTML struktúra (referencia)

```html
<nav aria-label="Nyelvválasztó" i18n-aria-label="@@lang-switcher.aria-label">
  <ul class="flex items-center gap-1 text-xs font-sans uppercase tracking-[0.06em]">
    <li>
      <a href="/hu/"
         hreflang="hu"
         lang="hu"
         [attr.aria-current]="locale === 'hu' ? 'page' : null"
         [class]="locale === 'hu' ? 'text-coral underline font-semibold' : 'text-dark/60 hover:text-dark/100 transition-opacity duration-200'"
         i18n-aria-label="@@lang-switcher.switch-to-hu"
         aria-label="Magyar">HU</a>
    </li>
    <li aria-hidden="true" class="text-dark/30 select-none">|</li>
    <li>
      <a href="/en/"
         hreflang="en"
         lang="en"
         [attr.aria-current]="locale === 'en' ? 'page' : null"
         [class]="locale === 'en' ? 'text-coral underline font-semibold' : 'text-dark/60 hover:text-dark/100 transition-opacity duration-200'"
         i18n-aria-label="@@lang-switcher.switch-to-en"
         aria-label="English">EN</a>
    </li>
  </ul>
</nav>
```

> **FIGYELEM — i18n-aria-label:** Az `aria-label` attribútum i18n-jelölése `i18n-aria-label="@@..."` szintaxissal történik (pont mint Story 2.1-ben a `i18n-aria-label="@@nav.aria-label"`).

> **FONTOS:** A szeparátor `|` elem `aria-hidden="true"` — ne öröklődjön fel screen reader felolvasáshoz.

> **FONTOS — `[class]` kötés:** A Tailwind osztályok dinamikus kötésnél kizárólag teljes osztályneveket tartalmazhatnak (ne részlegeseket). Ne használj `class` interpolációt (`{{ }}`), mert az Tailwind purge-nél problémás lehet. Ehelyett teljes osztály stringeket használj.

#### Alternatív megközelítés — getterrel

Ha a template komplex lenne, a logikát kiszervezheted getterbe:
```typescript
// Csak ha egyszerűsíti a template-et, nem kötelező
protected get isHu(): boolean { return this.locale === 'hu'; }
protected get isEn(): boolean { return this.locale === 'en'; }
```

#### i18n kulcsok (hozzáadandók)

| i18n ID | HU érték | EN érték |
|---|---|---|
| `lang-switcher.aria-label` | `Nyelvválasztó` | `Language switcher` |
| `lang-switcher.switch-to-hu` | `Magyar` | `Switch to Hungarian` |
| `lang-switcher.switch-to-en` | `Váltás angolra` | `English` |

> **`messages.en.xlf` frissítése kötelező!** Az `ng extract-i18n` kinyeri a forráskulcsokat; az EN fordítás manuálisan hozzáadandó a `messages.en.xlf`-be.

> **`messages.hu.xlf`:** Ellenőrizd a HU fájlt is — tartalmazza-e már az új kulcsokat a korábban jelzett user-szerkesztés után.

### Viselkedési szélső esetek (Edge Cases)

1. **SSR-on a locale:** Az Angular SSR build-specifikus — a szerver ugyanazt a locale-t exportálja, mint a böngésző build. A `LOCALE_ID` helyes értéket ad szerveren is.
2. **Statikus `href="/hu/"` SSR pre-render közben:** A Vercel pre-render a teljes oldalt statikus HTML-ként rendereli; a linkek abszolút `/hu/` és `/en/` path-ok, ezek a Vercel routing tábla iránya (redirect `/` → `/hu/` a `vercel.json`-ban már be van állítva).
3. **`aria-current` null vs. hiány:** `[attr.aria-current]="condition ? 'page' : null"` Angular kötésnél: ha `null`, az attribútum teljesen eltávolításra kerül — ez a helyes ARIA viselkedés.
4. **Tailwind JIT purge és dinamikus osztályok:** Teljes osztálynévstringeket tartalmazó conditional kötés (pl. `'text-coral underline font-semibold'`) biztonsággal átmegy a purge-en, mert a teljes string a fordítóidőben látható. **NE** használj részosztály interpolációt, pl. `text-${color}`.

### Architekturális követelmények betartása (KÖTELEZŐ)

Az architecture.md alábbi szabályait BE KELL TARTANI:
- ✅ Standalone Angular komponens, `app-language-switcher` szelektorral
- ✅ Fájl neve: `language-switcher.component.ts` (kebab-case)
- ✅ Osztálynév: `LanguageSwitcherComponent` (PascalCase + Component suffix)
- ✅ Elhelyezése: `dance/src/app/components/language-switcher/`
- ✅ Tailwind utility osztályok csak — nincs `style=""` inline CSS
- ✅ Nincs hardcoded hex szín — csak `text-coral`, `text-dark`, `text-cream` tokenek
- ✅ Coral (`#DC6567`) kizárólag dekoratív elem — az aktív állapot jelölőjeként alkalmazva (NEM body szövegen)
- ✅ SSR-biztonságos: nincs `window.*`, `document.*`, csak Angular DI (`LOCALE_ID`)
- ✅ Minden látható szöveg és ARIA attribútum `i18n="@@..."` jelöléssel

### Tesztelési követelmények

Egységtesztek (`language-switcher.component.spec.ts`):

| Teszteset | Ellenőrzött viselkedés |
|---|---|
| creates component | Komponens létrehozható |
| HU locale: HU link active | `locale='hu'` → HU link kap `aria-current="page"` |
| HU locale: EN link inactive | `locale='hu'` → EN link NEM kap `aria-current` |
| EN locale: EN link active | `locale='en'` → EN link kap `aria-current="page"` |
| both links rendered | Mindig van `/hu/` és `/en/` link |
| nav has aria-label | `<nav aria-label>` megjelenik |
| separator is aria-hidden | `|` elem `aria-hidden="true"` |

**LOCALE_ID mock a tesztekben:**
```typescript
TestBed.configureTestingModule({
  imports: [LanguageSwitcherComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'hu' }],
}).compileComponents();
```

### Leckék a korábbi Story-kból (Story 2.1 review tanulságok)

Az előző code review alapján különösen figyelj:
1. **WCAG kontraszt:** `text-dark/60` ≈ 3.87:1 FAIL 12px szövegen — ezért lett `text-dark/80`. Az inaktív link `text-dark/60`-on van mert ez a UX spec-ben definiált, DE a szövegméret `text-xs` (12px): ez WCAG AA fail. Megoldás: használj `text-dark/80`-at inaktív állapotra is (contrast 7.38:1 → pass), vagy növeld a font-méretet `text-sm`-re ahol az `/60` épp átmegy (14px-en 4.02:1 — ez is fail). **Javasolt:** `text-dark/80` inaktív állapothoz is, hogy biztosan AA-compliant legyen.
2. **`focus:outline`:** A globális `styles.css` `:focus-visible` már beállítja a coral outline-t. Nem kell egyedileg hozzáadni a komponens linkjeihez.
3. **Statikus `href` vs. `routerLink`:** Ebben a komponensben SZÁNDÉKOSAN statikus `href` kell — NE add hozzá a `RouterLink`-et, AC megköveteli.

### Korábbi commit-ok (Story 2.1 kontextus)

```
523b851 review(2.1): 5 patches — WCAG a11y, routerLink, contrast, og:image
b5f5bd9 feat(2.1): AppComponent shell — sticky header, skip-to-content, i18n meta, nav
```

A Story 2.1 commit után a `app.component.html` a `<!-- LanguageSwitcher — Story 2.2 -->` kommentet tartalmazza a jobb oldali slot-ban. Ez a Story 2.2 fejlesztési belépési pontja.

### Build parancs

```bash
# Angular projekt gyökérből (dance/ mappa):
npx @angular/cli@18 extract-i18n           # i18n kulcsok kinyerése messages.xlf-be
# → majd messages.en.xlf manuális frissítése az EN fordításokkal
npx @angular/cli@18 build --localize       # HU + EN build, 0 error elvárás, 2 prerendered route
npx @angular/cli@18 test --watch=false --browsers=ChromeHeadless  # unit tesztek (1 korábban létező fail: SsrProbeComponent)
```

---

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-5 (GitHub Copilot)

### Debug Log References

### Completion Notes List

### File List
