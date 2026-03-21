---
storyId: '1.4'
storyKey: '1-4-vercel-deploy-konfiguracio-github-actions-cicd'
epicId: '1'
status: 'review'
createdAt: '2026-03-21'
completedAt: '2026-03-21'
---

# Story 1.4 — Vercel deploy konfiguráció & GitHub Actions CI/CD

## User Story

**As a developer,**
I want a working CI/CD pipeline that builds and deploys both language outputs to Vercel,
**So that** every commit is automatically tested and deployed.

---

## Acceptance Criteria

**AC-1: `vercel.json` locale routing**
- **Given** a `vercel.json` fájl létezik
- **When** megvizsgáljuk
- **Then** tartalmaz CSP headereket: `frame-src 'self' https://www.youtube-nocookie.com` és `connect-src 'self' https://formsubmit.co`
- **And** `"/"` root URL-ről redirect van `/hu/`-ra
- **And** `/hu/(.*)` és `/en/(.*)` URL-ek helyes locale output tree-hez irányítanak

**AC-2: GitHub Actions CI workflow**
- **Given** `.github/workflows/ci.yml` létezik
- **When** commit kerül a `main` ágra
- **Then** a workflow futtatja az `npx @angular/cli@18 build --localize` parancsot
- **And** a build sikeres esetén Vercel deploy-t triggerel

**AC-3: Vercel projekt konfiguráció**
- **Given** `vercel.json` tartalmazza a `rootDirectory` és `outputDirectory` beállításokat
- **When** Vercel deploy fut
- **Then** a `dance/` almappában lévő projektet buildeli
- **And** a `dist/dance/browser` könyvtárat szolgálja ki statikusan

**AC-4: Lokális validáció**
- **Given** `ng build --localize` lefutott
- **When** `dist/dance/browser/hu/index.html` és `dist/dance/browser/en/index.html` megvizsgálva
- **Then** mindkettő létezik és helyes tartalmat tartalmaz (előző story-kban igazolva)
- **And** a `vercel.json` szintaktikailag valid JSON

---

## Epic Context

**Epic 1 célja:** Fejlesztői futtatható Angular 18 SSR + bilingual alap.

**Ez a sztori NEM feladata:**
- Tényleges Vercel account setup és deploy futtatása (ez manuális lépés)
- GitHub repository secret-ek beállítása (ez manuális lépés a Vercel UI-ban)
- SSR szerverless function konfiguráció (`@vercel/angular` adapter) → MVP-re prerendered static output elegendő
- Bármilyen production tartalom → Story 2.1+

**Következő sztori (2.1):** `AppComponent` oldal-keret és sticky header — Epic 2 kezdete.

---

## Developer Context

### Előfeltételek

```powershell
# Angular projekt, SSR+i18n mind működik (Story 1.1–1.3 done/review)
Test-Path "dance\vercel.json"                    # → True (CSP headers már benne vannak)
Test-Path ".github\workflows\ci.yml"             # → False (ezt kell létrehozni)
Test-Path ".github\workflows"                    # → False (mappát is létre kell hozni)

# Repo gyökér (NEM a dance/ almappa!)
cd "c:\Users\user\Documents\Saját\Dance"
```

### Projekt könyvtárstruktúra kontextusa

```
c:\Users\user\Documents\Saját\Dance\       ← Git repo gyökér
  dance/                                   ← Angular projekt almappa
    angular.json
    vercel.json                            ← IDE-ben ez a fájl szerkesztendő
    src/
    ...
  .github/
    skills/                                ← BMAD skills (NE érintsd)
    workflows/                             ← LÉTREHOZANDÓ
      ci.yml                               ← LÉTREHOZANDÓ
  _bmad-output/
  ...
```

> ⚠️ A `.github/workflows/` mappa a **repo gyökerében** van (`c:\Users\user\Documents\Saját\Dance\.github\workflows\`), NEM a `dance/` almappában!  
> ⚠️ A `vercel.json` a `dance/` almappában van (`c:\Users\user\Documents\Saját\Dance\dance\vercel.json`).

### Tanulságok korábbi storyikból

1. **PowerShell encoding** — JSON fájlokra `Set-Content` is bírható csak ha nincs Unicode karakter; de ha igen, `[System.IO.File]::WriteAllText()` kötelező UTF-8 No-BOM-mal
2. **Angular CLI verzió** — mindig `npx @angular/cli@18`
3. **`ng build --localize`** output struktúra: `dist/dance/browser/hu/` és `dist/dance/browser/en/` (prerendered static)
4. **`vercel.json`** jelenlegi állapota: CSP headers megvannak; hiányzik a locale routing

### Vercel deployment stratégia — statikus prerender (MVP)

Az architecture `@vercel/angular` SSR adaptert említ, de az MVP-re (Story 1.4) a **prerendered statikus kiszolgálás** elegendő és egyszerűbb:

- `ng build --localize` prerendeli mindkét locale-t (igazolva Story 1.3-ban)
- Vercel statikus fájlokat szolgál ki `/hu/` és `/en/` útvonalakról
- Nincs szükség Node.js serverless function-re az MVP-hez
- Az SSR adapter (`@vercel/angular`) hozzáadása egy jövőbeli story-ra halasztható

**Azonban:** a `@angular/ssr` Express server (`server.ts`) a repo részét képezi. Az `ng build --localize` **prerendeli** a statikus oldalakat (Story 1.3: "Prerendered 2 static routes"), tehát a CDN deployment elegendő.

### `vercel.json` szükséges változások

**Jelenlegi állapot** (CSP headers — megtartandó):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "..." },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" }
      ]
    }
  ]
}
```

**Szükséges hozzáadások:**
1. `buildCommand` — a build parancs
2. `outputDirectory` — a statikus output mappa
3. `redirects` — root `/` → `/hu/`

**Teljes cél konfiguráció:**
```json
{
  "buildCommand": "npx @angular/cli@18 build --localize",
  "outputDirectory": "dist/dance/browser",
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
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/",
      "destination": "/hu/",
      "permanent": false
    }
  ]
}
```

> ⚠️ `"permanent": false` (302) a redirect-re — jövőbeli locale negotiation esetén könnyen megváltoztatható. Ha `true` (301) lenne, a böngészők cache-elnék és nehéz lenne módosítani.

> ⚠️ `outputDirectory: "dist/dance/browser"` — Vercel a repo gyökerétől számolja a path-t. Mivel a `vercel.json` a `dance/` almappában van, ÉS a Vercel project rootDirectory is `dance/` lesz, az `outputDirectory` a `dance/` almappától számít: `dist/dance/browser`.

> ⚠️ Ha a Vercel projekt `rootDirectory`-ja `dance/`, akkor a `buildCommand`-ban a working directory már a `dance/` lesz — tehát `npx @angular/cli@18 build --localize` közvetlenül futtatható (nem kell `cd dance/`).

### `.github/workflows/ci.yml` konfiguráció

**Célok:**
1. PRokra és main merge-re futó build validáció (`ng build --localize`)
2. Main ágon való merge után Vercel deploy triggerelése

**Várt struktúra:**
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: dance

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: dance/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Build (localize)
        run: npx @angular/cli@18 build --localize

      - name: Deploy to Vercel
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: dance
          vercel-args: '--prod'
```

> ⚠️ **`working-directory: dance`** — a workflow `defaults.run` és az `amondnet/vercel-action` `working-directory` beállítása egyaránt szükséges, mert a repo gyökerében van a `.github/`, de az Angular projekt a `dance/` almappában.

> ⚠️ **`node-version: '20'`** — a workflow Node 20 LTS-t használ (az architecture által meghatározott verzió; a lokális fejlesztés Node 24-en fut, ami kompatibilis). A CI kontrollált env, ezért Node 20 az elvárt.

> ⚠️ **GitHub Secrets szükségesek** (manuális lépés a Vercel UI-ban, nem automatizálható):
> - `VERCEL_TOKEN` — Vercel API token (Vercel Dashboard → Settings → Tokens)
> - `VERCEL_ORG_ID` — Vercel Organization/Team ID (`.vercel/project.json`-ból)
> - `VERCEL_PROJECT_ID` — Vercel Project ID (`.vercel/project.json`-ból)

> ⚠️ **`amondnet/vercel-action@v25`** — a Vercel-nek nincs official GitHub Action-je; ez a legelterjedtebb third-party action. Alternatíva: `vercel deploy` CLI direktben.

---

## Lépés-by-lépés végrehajtás

**1. lépés — `vercel.json` frissítése**

Módosítsd a `dance/vercel.json` fájlt (teljes csere az 5. lépés konfigurációjával fentebb). Meglévő CSP headers megtartandók, hozzáadandó: `buildCommand`, `outputDirectory`, `redirects`.

**2. lépés — `.github/workflows/` mappa és `ci.yml` létrehozása**

```powershell
# A REPO GYÖKERÉTŐL (nem dance/)
cd "c:\Users\user\Documents\Saját\Dance"

# Mappa létrehozása
New-Item -ItemType Directory -Path ".github\workflows" -Force

# Fájl létrehozása — UTF-8 encoding kritikus a YAML-ban
```

A `ci.yml` tartalma a fenti "Várt struktúra" szerint.

**3. lépés — Lokális validáció**

```powershell
# Angular build validáció (a dance/ almappából)
cd "c:\Users\user\Documents\Saját\Dance\dance"
npx @angular/cli@18 build --localize

# vercel.json szintaktika ellenőrzés
Get-Content vercel.json | ConvertFrom-Json | ConvertTo-Json -Depth 10
# → Ha conv hibát dob, invalid JSON

# Prerendered output ellenőrzés
Test-Path "dist\dance\browser\hu\index.html"  # → True
Test-Path "dist\dance\browser\en\index.html"  # → True
Select-String -Path "dist\dance\browser\hu\index.html" -Pattern "Zsófi tánciskola"  # → match
Select-String -Path "dist\dance\browser\en\index.html" -Pattern "Zsófi Dance School"  # → match
```

**4. lépés — Manuális Vercel setup (dokumentálandó, nem automatizálható)**

A következő lépések NEM automatizálhatók — a story befejezettnek tekinthető a fájlok létrehozásával; a tényleges Vercel integráció opcionális manuális lépés:

1. Vercel account létrehozása (ha nincs): `vercel.com`
2. GitHub repo csatlakoztatása a Vercel Dashboard-on
3. **Vercel projekt beállítások:**
   - `Root Directory`: `dance`
   - `Framework Preset`: Angular (auto-detect)
   - `Build Command`: `npx @angular/cli@18 build --localize` (overwrite az auto-detectet)
   - `Output Directory`: `dist/dance/browser`
4. GitHub Secrets beállítása: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
5. Primera deploy aktiválása

> A story **done** státuszba léphet, ha a fájlok létrehozva és a build validáción átmegy. A tényleges Vercel deploy az Epic befejezésekor igazolandó.

---

## Technical Requirements

### Módosítandó / létrehozandó fájlok

| Fájl | Változás | Helyszín |
|---|---|---|
| `dance/vercel.json` | ✏️ Módosítani — `buildCommand`, `outputDirectory`, `redirects` hozzáadása | `dance/` almappa |
| `.github/workflows/ci.yml` | 🆕 Létrehozni | repo gyökér `.github/workflows/` |

### NEM módosítandó

- `angular.json` — változatlan
- `package.json` — változatlan
- `server.ts` — Story 1.3-ban frissítve, változatlan
- Bármilyen `src/` fájl — nincs érintett

---

## Architecture Compliance

> Architektúra forrás: `_bmad-output/planning-artifacts/architecture.md` „Infrastructure & Deployment" szekció.

| Döntés | Architektúra elvárás | Implementáció |
|---|---|---|
| Hosting | Vercel — `@vercel/angular` SSR adapter | MVP: statikus prerender; SSR adapter Story 1.4 followup-ból halasztható |
| CI/CD | GitHub Actions: `ng build --localize` → deploy | `.github/workflows/ci.yml` |
| CSP | `vercel.json`: `frame-src`, `connect-src` | Már meglévő + bővítés |
| Locale routing | `/hu/` és `/en/` HTTP 200 | `redirects` + statikus output tree |

---

## Common Mistakes to Avoid

1. **`working-directory` hiánya a CI workflow-ban** — a `.github/workflows/ci.yml` a repo gyökerében van, de az Angular projekt a `dance/` almappában. Ha nincs `defaults.run.working-directory: dance`, az `npm ci` és `ng build` a repo gyökerét látja és `angular.json` not found hibával megáll.

2. **`vercel.json` `outputDirectory` helytelen** — Vercel a project rootDirectory-tól számítja. Ha a Vercel project `rootDirectory = dance`, akkor `outputDirectory = dist/dance/browser` (NEM `dance/dist/dance/browser`).

3. **`permanent: true` redirect a root-ről** — 301-es redirect-et a böngészők és CDN-ek agresszívan cache-elik. `permanent: false` (302) az MVP-re, hogy könnyen mégatváltoztathassuk pl. geo-alapú locale detection bevezetésekor.

4. **`@vercel/angular` adapter telepítése Story 1.4-ben** — az `@vercel/angular` adapter `npm install` szükségessége felvetődhet, de az MVP statikus deploy-hoz NEM szükséges. Ha valaki mégis telepíti, az `angular.json` adapter konfigurációja is módosul, amit ki kell tesztelni.

5. **GitHub Secrets nélküli CI workflow push** — a `VERCEL_TOKEN` secret nélkül a CI workflow a deploy lépésnél hibával megáll. Ez elvárt és nem blocker — a secret beállítása manuális Vercel-OAuth lépés.

6. **`cache-dependency-path: dance/package-lock.json`** — ha ez hiányzik a `setup-node` akcióból, a Node cache action a repo gyökerében keresi a `package-lock.json`-t, ami nem létezik ott.

---

## Project Context Reference

Teljes szabálykészlet: `_bmad-output/project-context.md`

Legfontosabb szabályok erre a sztorira:
- **Vercel deployment**: `vercel.json` a `dance/` almappában
- **CI/CD**: `.github/workflows/` a repo gyökerében
- **Fájlok:** JSON fájlokba nem kerül Unicode karakter (a `vercel.json` értékek ASCII), ezért standard fájlkezelés elfogadható
- **Locale URL pattern**: `/hu/` = primary (HU), `/en/` = secondary; root `/` redirect `/hu/`-ra

---

## Dev Notes

_(Ide kerülnek az implementáció során felfedezett tanulságok)_

---

## Tasks / Subtasks

- [x] **Task 1 — `vercel.json` frissítése**
  - [x] `buildCommand`: `npx @angular/cli@18 build --localize`
  - [x] `outputDirectory`: `dist/dance/browser`
  - [x] `rootDirectory`: `dance` — *review patch (AC-3)*
  - [x] `redirects`: `/` → `/hu/` (302)
  - [x] `Referrer-Policy` header hozzáadása
- [x] **Task 2 — `.github/workflows/ci.yml` létrehozása**
  - [x] `defaults.run.working-directory: dance`
  - [x] `actions/setup-node@v4` Node 20 LTS, `cache-dependency-path: dance/package-lock.json`
  - [x] `npm ci` + `npx @angular/cli@18 build --localize`
  - [x] Vercel deploy step (`if: main push`) `amondnet/vercel-action@v25`
- [x] **Task 3 — Lokális validáció**
  - [x] `ng build --localize` sikeresen lefut (2 static route prerendered)
  - [x] `dist/dance/browser/hu/index.html` és `en/index.html` létezik és helyes tartalom
  - [x] `vercel.json` szintaktikailag valid JSON (ConvertFrom-Json ellenőrzés)

### Review Follow-ups (AI)

- [x] **[AI-Review] [High] P1 — CI trigger `[main]` → `[master]`** — workflow soha nem futott volna el
- [x] **[AI-Review] [High] P2 — `rootDirectory: "dance"` hozzáadása `vercel.json`-ba** — AC-3 követelmény
- [x] **[AI-Review] [High] P3 — `vercel-action` SHA pinelve** — supply chain védelem
- [x] **[AI-Review] [High] P4 — `permissions: contents: read`** — least-privilege GITHUB_TOKEN

---

## Dev Agent Record

### Senior Developer Review (AI)

**Review dátuma:** 2026-03-21  
**Eredmény:** Changes Requested  
**Action Items:** 4 High, 1 Bad Spec (halasztva), 9 Defer

**Action Items:**
- [x] [High] P1 — CI trigger `[main]` → `[master]` branch
- [x] [High] P2 — `rootDirectory: "dance"` hozzáadása `vercel.json`-ba
- [x] [High] P3 — `amondnet/vercel-action@v25` SHA-ra pinelve
- [x] [High] P4 — `permissions: contents: read` a build job-ba
- [ ] [Bad Spec / Defer] BS1 — CI workflow-ban nincs test lépés (spec kiegészítés halasztva Epic 2-re)

### Implementation Plan

A story két fájlt érint:
1. `dance/vercel.json` — teljes csere: meglévő CSP headers megtartva + `buildCommand`, `outputDirectory`, `redirects`, `Referrer-Policy` header hozzáadva
2. `.github/workflows/ci.yml` — új fájl a repo gyökerében: `defaults.run.working-directory: dance`, Node 20 LTS cache, `npm ci`, `npx @angular/cli@18 build --localize`, Vercel deploy step csak main push-ra

### Completion Notes

- ✅ `dance/vercel.json` frissítve: `buildCommand`, `outputDirectory: dist/dance/browser`, `rootDirectory: dance`, `redirects /→/hu/ (302)`, `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `.github/workflows/ci.yml` létrehozva: Node 20 LTS, `npm ci`, `npx @angular/cli@18 build --localize`, Vercel deploy conditional (master push)
- ✅ Build validáció sikeres: `ng build --localize` → 0 error, 2 static route prerendered
- ✅ AC-4: `dist/dance/browser/hu/index.html` → HU tartalom; `dist/dance/browser/en/index.html` → EN tartalom
- ✅ AC-1: `vercel.json` valid JSON, CSP headers megvannak (frame-src YouTube, connect-src formsubmit), redirect `/→/hu/`
- ✅ AC-2: CI workflow létezik, master branch trigger, build + deploy lépések
- ✅ AC-3: `outputDirectory: dist/dance/browser`, `rootDirectory: dance`, `buildCommand` beállítva
- ✅ Review P1: CI trigger `[main]` → `[master]` javítva
- ✅ Review P2: `rootDirectory: "dance"` hozzáadva `vercel.json`-ba (AC-3 megfelelőség)
- ✅ Review P3: `amondnet/vercel-action` SHA-ra pinelve (`25afe0a...`) supply chain védelem
- ✅ Review P4: `permissions: contents: read` hozzáadva a build job-hoz
- ℹ️ A tényleges Vercel account setup és GitHub Secrets beállítása manuális lépés (AC scope-on kívül)

---

## File List

| Fájl | Változás |
|---|---|
| `dance/vercel.json` | ✏️ Módosítva — `buildCommand`, `outputDirectory`, `redirects`, `Referrer-Policy` header hozzáadva |
| `.github/workflows/ci.yml` | 🆕 Létrehozva — GitHub Actions CI/CD workflow |

---

## Change Log

| Dátum | Változás |
|---|---|
| 2026-03-21 | Story 1.4 implementálva: `vercel.json` frissítve (buildCommand, outputDirectory, redirects, Referrer-Policy), `.github/workflows/ci.yml` létrehozva, build validáció sikeres |
| 2026-03-21 | Review follow-up patches: CI trigger master-re javítva, rootDirectory hozzáadva, vercel-action SHA-ra pinelve, permissions: contents: read hozzáadva |
