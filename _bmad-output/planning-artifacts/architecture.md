---
stepsCompleted: ['step-01-init', 'step-02-context', 'step-03-starter', 'step-04-decisions', 'step-05-patterns', 'step-06-structure', 'step-07-validation', 'step-08-complete']
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-03-21'
inputDocuments: ['prd.md', 'ux-design-specification.md', 'project-context.md']
workflowType: 'architecture'
project_name: 'Dance'
user_name: 'Zsófi'
date: '2026-03-21'
---

# Architecture Decision Document - Dance

## Project Context Analysis

### Requirements Overview

**Functional Requirements:** 37 FRs across 10 capability areas — Localisation & Language (FR1–4), Navigation (FR5–8), Hero (FR9–10), Services (FR11–12), Editorial Content (FR13–14), Gallery (FR15–19), Video (FR20–22), Credentials (FR23–24), Contact (FR25–29), SEO & Discoverability (FR30–33), Accessibility (FR34–37).

**Non-Functional Requirements driving architecture:** Performance: LCP ≤ 2.5s / 4G mobile, Lighthouse ≥ 90, TTFB ≤ 600ms. Accessibility: WCAG 2.1 AA, Lighthouse Accessibility ≥ 95. Security: HTTPS-only, no pre-consent tracking, youtube-nocookie.com. Integration: contact form email delivery (third-party), Google Fonts (preconnect + swap), YouTube (privacy-enhanced). Reliability: 99.5% uptime, CDN-backed static hosting.

**Scale & Complexity:** Primary domain: Web (Angular 18 SPA + SSR). Complexity level: Low — single conversion goal, no auth, no database, no real-time. Estimated architectural components: 9 UI components + contact form service + 2 i18n language builds + SSR configuration.

### Technical Constraints & Dependencies

- Angular 18 with standalone components — no NgModule pattern
- `@angular/ssr` mandatory — server-side rendering for SEO and TTFB targets
- `@angular/localize` — build-time i18n producing separate `/hu/` and `/en/` output trees
- Tailwind CSS v3 — utility-first, custom tokens in `tailwind.config.js`
- Swiper.js ^11 — selective module imports, `afterNextRender()` init, SSR-guarded
- GLightbox ^3 — dynamic import, `afterNextRender()` init, `destroy()` in `ngOnDestroy()`
- No backend — contact form via **FormSubmit** (`https://formsubmit.co`); AJAX endpoint: `POST https://formsubmit.co/ajax/{email}`; no signup required; free tier
- Hosting: Static CDN (Vercel / Netlify) capable of serving SSR pre-rendered output

### Cross-Cutting Concerns Identified

1. **SSR Safety** — `isPlatformBrowser()` guard + `afterNextRender()` lifecycle required in every component touching `window`, `document`, or browser-only libraries
2. **i18n Completeness** — every user-visible string must be marked; build pipeline must produce and validate both language outputs
3. **Performance Budget** — lazy loading, WebP images, font-display:swap, click-to-load video are architectural decisions applied consistently across all components
4. **Accessibility** — focus trap (mobile nav), reduced-motion (`prefers-reduced-motion`), keyboard nav (gallery, lightbox), descriptive alt text — enforced at component level
5. **Privacy** — `youtube-nocookie.com` exclusively, no third-party analytics scripts at MVP

## Starter Template Evaluation

### Primary Technology Domain

Web application — Angular 18 + SSR, based on project requirements analysis.

### Starter Options Considered

| Option | Assessment |
|---|---|
| `ng new --ssr` (Angular CLI official) | ✅ Canonical, always current, TypeScript strict optional, SSR built-in |
| Nx Angular monorepo | ❌ Overkill — single app, no micro-frontend or library sharing needed |
| Analog.js | ❌ File-based routing replaces Angular router — conflicts with established project conventions |
| Custom Vite + Angular | ❌ No benefit over the official CLI builder for this scale |

### Selected Starter: Angular CLI `ng new` with SSR

**Rationale for Selection:**
Official Angular tooling, always tracks the current stable release (18.x), zero configuration drift, and `--ssr` flag wires `@angular/ssr` + Express server at project creation. Adding `@angular/localize` post-init is a single `ng add` command, which is the recommended flow.

**Initialization Command:**

```bash
# 1. Create project with SSR, routing, CSS (Tailwind will replace CSS)
ng new dance --standalone --ssr --routing --style=css --strict

# 2. Add build-time i18n
ng add @angular/localize

# 3. Add Tailwind CSS v3
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

# 4. Install third-party libraries
npm install swiper@^11 glightbox@^3
npm install -D @types/glightbox
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
TypeScript 5.x strict mode; Angular 18.x standalone component API; Node.js Express server for SSR (swappable for Netlify/Vercel adapter).

**Styling Solution:**
Angular CLI generates `styles.css` entry point — Tailwind replaces default CSS with utility classes; `tailwind.config.js` receives custom token definitions (`burgundy`, `coral`, `cream`, `beige`, `dark`).

**Build Tooling:**
esbuild-based Angular builder (default in 18); `ng build` produces `/browser/` + `/server/` output trees; `ng build --localize` produces `/hu/` + `/en/` subtrees for both.

**Testing Framework:**
Jasmine + Karma (default); component-level unit tests for contact form service.

**Code Organisation:**
Standalone component convention; each component in its own folder under `src/app/components/`; shared services under `src/app/services/`; i18n messages in `src/locale/messages.xlf`.

**Development Experience:**
`ng serve` with HMR; `ng serve --ssr` for local SSR testing; Angular DevTools for component inspection.

**Note:** Project initialization using this command sequence should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- SSR configuration with `@angular/ssr` + Express adapter
- `@angular/localize` build-time i18n producing `/hu/` and `/en/` output trees
- Signals-only local state (no NgRx / global store)
- `NgOptimizedImage` for all content images
- CSP headers defined in `vercel.json`

**Important Decisions (Shape Architecture):**
- Single route `/` — no Angular Router language switching; language handled by static build trees
- `VideoSection` deferred loading (click-to-play)
- `ContactFormService` as the sole `HttpClient` consumer
- `ReactiveFormsModule` for contact form validation

**Deferred Decisions (Post-MVP):**
- Analytics integration (no third-party scripts at MVP)
- Performance profiling toolchain
- E2E test framework selection

### Data Architecture

- **No database.** All content is template-driven / hardcoded in components.
- **State management:** Angular Signals for local component state only. No NgRx, no global store.
- **Data flow:** Unidirectional — parent components pass data via `@Input()` to children; events propagate up via `@Output()`.

### Authentication & Security

- **No authentication layer.** Public-only site.
- **HTTPS:** Auto-enforced by Vercel (automatic TLS).
- **CSP headers** configured in `vercel.json`: `frame-src 'self' https://www.youtube-nocookie.com`; `connect-src 'self' https://formsubmit.co`.
- **Contact form:** Angular `ReactiveFormsModule` validators client-side; no server-side validation needed (third-party service handles CSRF).
- **No tracking / cookies pre-consent** at MVP.

### API & Communication Patterns

- **No custom API.** The only outbound HTTP call is the contact form submission.
- **`ContactFormService`**: `send(payload: ContactPayload): Observable<void>` — single method using `HttpClient.post()`.
- **Error handling**: Observable error caught in component; inline error message displayed to user.

### Frontend Architecture

| Sub-decision | Decision | Rationale |
|---|---|---|
| **Routing** | Single route `/`; language routes handled by `@angular/localize` build outputs | Build-time i18n, no runtime router switching |
| **Component set** | 9 standalone components per UX spec | Matches UX design spec 1:1 |
| **Lazy loading** | `VideoSection` deferred until user interaction; gallery images via `loading="lazy"` | Performance budget |
| **Image strategy** | `NgOptimizedImage` directive, WebP with `<picture>` fallback | LCP ≤ 2.5s |
| **Fonts** | Google Fonts via `<link rel="preconnect">` + `font-display: swap` in `index.html` | SSR-safe, no FOUT |
| **Animation** | CSS transitions only; `@media (prefers-reduced-motion: reduce)` overrides all to `none` | WCAG 2.1 AA |
| **Contact form** | `ReactiveFormsModule`, inline validation, `ContactFormService` for submission | No router redirect needed |

### Infrastructure & Deployment

| Sub-decision | Decision | Rationale |
|---|---|---|
| **Hosting** | Vercel — `@vercel/angular` SSR adapter | Official Angular SSR adapter |
| **CI/CD** | GitHub Actions: `ng build --localize` → deploy both language trees | Standard Angular i18n production flow |
| **Environment config** | `environment.ts` / `environment.prod.ts` for contact form endpoint URL only | Minimal config surface |
| **Monitoring** | Vercel built-in analytics (no third-party scripts) | Privacy-first |
| **CDN** | Vercel Edge Network (automatic) | Zero-config, global |

### Decision Impact Analysis

**Implementation Sequence:**
1. Project init + Tailwind token config
2. `@angular/localize` setup + `angular.json` dual-build configuration
3. SSR scaffold validation (prototype `isPlatformBrowser()` + `afterNextRender()` pattern)
4. Components in order: `MobileNavigation` → `EditorialHero` → `ServiceStrip` → `EditorialRow` → `GalleryCategorized` → `VideoSection` → `JudgingCredentials` → `ContactForm` → `LanguageSwitcher`
5. CSP header configuration in `vercel.json`
6. CI/CD pipeline setup

**Cross-Component Dependencies:**
- `LanguageSwitcher` is a static `<a>` link to `/hu/` or `/en/` — no Angular Router dependency
- `MobileNavigation` must implement focus trap (WCAG FR37)
- All components with browser-only libs (Swiper, GLightbox) require `isPlatformBrowser()` guard
- `ContactFormService` is a shared service injected into `ContactForm` component only

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Component Naming:**
- Files: `kebab-case` — `editorial-hero.component.ts`, `mobile-navigation.component.ts`
- Class names: `PascalCase` + `Component` suffix — `EditorialHeroComponent`, `MobileNavigationComponent`
- Selector: `app-` prefix, kebab-case — `app-editorial-hero`, `app-mobile-navigation`

**Service Naming:**
- Files: `kebab-case.service.ts` — `contact-form.service.ts`
- Class names: `PascalCase` + `Service` suffix — `ContactFormService`

**Input / Output Naming:**
- `@Input()`: camelCase noun — `albumTitle`, `imageList`
- `@Output()`: camelCase past-tense verb + `EventEmitter` — `formSubmitted`, `navClosed`

**i18n IDs:**
- Format: `{component}.{element}` dot-notation — `hero.headline`, `contact.submit-button`, `nav.close-label`
- Always lowercase, hyphen-separated within segment

**CSS Classes:**
- Tailwind utility classes only; no custom class names except BEM structural shells
- BEM shell pattern: `{component}___{element}` when utility class cannot express structure — e.g. `.gallery___grid`

### Structure Patterns

**Project Organisation:**
```
src/app/
  components/
    editorial-hero/
      editorial-hero.component.ts
      editorial-hero.component.html
      editorial-hero.component.css
      editorial-hero.component.spec.ts
    mobile-navigation/
      ...
  services/
    contact-form.service.ts
    contact-form.service.spec.ts
  models/
    contact-form.model.ts
src/locale/
  messages.xlf
  messages.hu.xlf
src/assets/
  images/
    gallery/
      competitions/
      weddings/
      teaching/
      performances/
      acroyoga/
    hero/
```

**Tests:** Co-located spec files next to the component/service file. No `__tests__/` directory.

### Format Patterns

**Contact Form Payload:**
```typescript
interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
```
Field names always camelCase. `ContactFormService.send()` returns `Observable<void>`.

**Error Display:** Inline below offending field via Angular reactive form error binding. Single submission error banner above submit button for network errors. No toasts / modals for form errors.

### Communication Patterns

**SSR Guard Pattern (enforced for ALL components using browser APIs):**
```typescript
readonly #platformId = inject(PLATFORM_ID);

constructor() {
  afterNextRender(() => {
    if (isPlatformBrowser(this.#platformId)) {
      // browser-only init (Swiper, GLightbox, etc.)
    }
  });
}
```

**i18n String Pattern:**
```html
<h1 i18n="hero.headline">Tánc és mozgás</h1>
<button i18n="contact.submit-button">Küldés</button>
```

**Image Pattern (all content images):**
```html
<img ngSrc="assets/images/hero/zsófi-hero.webp" width="1200" height="800" priority alt="..." />
```

**`prefers-reduced-motion` Pattern:**
```css
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
```

### Process Patterns

**Loading States:**
- Lazy-loaded components: Angular `@defer` block with `@placeholder` skeleton
- Contact form submit: `isSubmitting = signal(false)` — disable button while pending
- No global loading spinner

**Error Recovery:**
- Contact form: `catchError` in service → component displays inline error, re-enables submit button
- Gallery/Lightbox: if GLightbox fails to init, images remain visible as grid (graceful degradation)

### Enforcement Guidelines

**All AI agents MUST:**
- Use `isPlatformBrowser()` + `afterNextRender()` for every browser-only library init
- Mark every user-visible string with `i18n` attribute
- Use `ngSrc` (`NgOptimizedImage`) for all content `<img>` tags
- Use Tailwind utility classes — no `style=""` inline attributes except for dynamic values
- Never access `window.*` or `document.*` outside `isPlatformBrowser()` guard
- Name selectors with `app-` prefix
- Coral (`#DC6567`) is decorative only — never use as body text colour

**Pattern Enforcement:**
- Each story's acceptance criteria must reference the relevant pattern
- Code review checklist: i18n strings marked, SSR guard present, `NgOptimizedImage` used, no inline styles

## Project Structure & Boundaries

### Requirements to Structure Mapping

| FR Category | Component / File |
|---|---|
| Navigation FR5–8 | `mobile-navigation/`, `language-switcher/` |
| Hero FR9–10 | `editorial-hero/` |
| Services FR11–12 | `service-strip/` |
| Editorial FR13–14 | `editorial-row/` |
| Gallery FR15–19 | `gallery-categorized/` |
| Video FR20–22 | `video-section/` |
| Credentials FR23–24 | `judging-credentials/` |
| Contact FR25–29 | `contact-form/`, `contact-form.service.ts` |
| SEO FR30–33 | `index.html` meta + `vercel.json` headers |
| Accessibility FR34–37 | Enforced per-component (focus trap in `mobile-navigation/`) |
| i18n FR1–4 | `src/locale/`, `angular.json` i18n config |

### Complete Project Directory Structure

```
dance/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── README.md
├── angular.json
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── vercel.json
│
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── main.server.ts
│   ├── app.config.ts
│   ├── app.config.server.ts
│   ├── styles.css
│   │
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   │
│   │   ├── components/
│   │   │   ├── editorial-hero/
│   │   │   │   ├── editorial-hero.component.ts
│   │   │   │   ├── editorial-hero.component.html
│   │   │   │   ├── editorial-hero.component.css
│   │   │   │   └── editorial-hero.component.spec.ts
│   │   │   ├── service-strip/
│   │   │   │   ├── service-strip.component.ts
│   │   │   │   ├── service-strip.component.html
│   │   │   │   ├── service-strip.component.css
│   │   │   │   └── service-strip.component.spec.ts
│   │   │   ├── editorial-row/
│   │   │   │   ├── editorial-row.component.ts
│   │   │   │   ├── editorial-row.component.html
│   │   │   │   ├── editorial-row.component.css
│   │   │   │   └── editorial-row.component.spec.ts
│   │   │   ├── gallery-categorized/
│   │   │   │   ├── gallery-categorized.component.ts
│   │   │   │   ├── gallery-categorized.component.html
│   │   │   │   ├── gallery-categorized.component.css
│   │   │   │   └── gallery-categorized.component.spec.ts
│   │   │   ├── video-section/
│   │   │   │   ├── video-section.component.ts
│   │   │   │   ├── video-section.component.html
│   │   │   │   ├── video-section.component.css
│   │   │   │   └── video-section.component.spec.ts
│   │   │   ├── judging-credentials/
│   │   │   │   ├── judging-credentials.component.ts
│   │   │   │   ├── judging-credentials.component.html
│   │   │   │   ├── judging-credentials.component.css
│   │   │   │   └── judging-credentials.component.spec.ts
│   │   │   ├── contact-form/
│   │   │   │   ├── contact-form.component.ts
│   │   │   │   ├── contact-form.component.html
│   │   │   │   ├── contact-form.component.css
│   │   │   │   └── contact-form.component.spec.ts
│   │   │   ├── mobile-navigation/
│   │   │   │   ├── mobile-navigation.component.ts
│   │   │   │   ├── mobile-navigation.component.html
│   │   │   │   ├── mobile-navigation.component.css
│   │   │   │   └── mobile-navigation.component.spec.ts
│   │   │   └── language-switcher/
│   │   │       ├── language-switcher.component.ts
│   │   │       ├── language-switcher.component.html
│   │   │       └── language-switcher.component.spec.ts
│   │   │
│   │   ├── services/
│   │   │   ├── contact-form.service.ts
│   │   │   └── contact-form.service.spec.ts
│   │   │
│   │   └── models/
│   │       └── contact-form.model.ts
│   │
│   ├── locale/
│   │   ├── messages.xlf
│   │   └── messages.hu.xlf
│   │
│   └── assets/
│       └── images/
│           ├── hero/
│           └── gallery/
│               ├── competitions/
│               ├── weddings/
│               ├── teaching/
│               ├── performances/
│               └── acroyoga/
│
└── server.ts
```

### Architectural Boundaries

**Component Boundaries:**
- Each component is fully standalone — no shared module, no cross-component direct imports
- Data flows via `@Input()` / `@Output()` only
- `MobileNavigation` owns the focus trap lifecycle entirely

**Service Boundaries:**
- `ContactFormService` is the only service, injected only into `ContactForm` component
- All `HttpClient` usage is confined to `ContactFormService`

**i18n Boundary:**
- All user-visible strings live in component templates marked with `i18n`
- Translation files live exclusively in `src/locale/`
- No strings in `.ts` files unless using `$localize` tagged template literal

**SSR Boundary:**
- `app.config.server.ts` is the SSR-only provider file — no browser-only providers here
- Browser-only code always guarded by `isPlatformBrowser()`

### Integration Points

**External Integrations:**

| Service | Integration Point | File |
|---|---|---|
| Google Fonts | `<link rel="preconnect">` | `src/index.html` |
| YouTube (privacy-enhanced) | `youtube-nocookie.com` iframe | `video-section.component.html` |
| Contact form endpoint | `HttpClient.post()` | `contact-form.service.ts` |
| Vercel CDN | CSP headers + routing | `vercel.json` |

**Data Flow:**
```
AppComponent (shell)
  ├── MobileNavigation (@Input: links[])
  ├── LanguageSwitcher (static <a> links)
  ├── EditorialHero (@Input: heroData)
  ├── ServiceStrip (@Input: services[])
  ├── EditorialRow (@Input: rows[])
  ├── GalleryCategorized (@Input: albums[])
  ├── VideoSection (@defer, @Input: videoId)
  ├── JudgingCredentials (@Input: credentials[])
  └── ContactForm (inject ContactFormService)
```

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
- Angular 18 standalone + `@angular/ssr` + `@angular/localize` are all officially supported in the same project — no conflicts
- Tailwind CSS v3 + Angular CLI esbuild builder: compatible via `postcss.config.js`
- Swiper.js ^11 + GLightbox ^3: both non-Angular vanilla libraries using identical `afterNextRender()` init pattern — no conflict
- `@defer` for `VideoSection` confirmed available in Angular 18 ✅
- Vercel + `@vercel/angular` adapter: official Angular SSR support ✅

**Pattern Consistency:**
- SSR guard pattern applies uniformly to all 3 browser-only library users (Swiper, GLightbox, `VideoSection` iframe)
- Naming conventions (kebab-case files, PascalCase classes, `app-` selector prefix) consistent across all 9 components
- `@Input()` / `@Output()` communication pattern consistent — no component breaks isolation

**Structure Alignment:**
- All 9 UX-spec components have corresponding folders in the project structure ✅
- `src/locale/` correctly houses both `.xlf` files
- `vercel.json` is the correct location for CSP headers in a Vercel deployment ✅

### Requirements Coverage Validation ✅

| FR Area | Coverage |
|---|---|
| Localisation FR1–4 | `@angular/localize` build-time, `messages.xlf` + `messages.hu.xlf`, `LanguageSwitcher` ✅ |
| Navigation FR5–8 | `MobileNavigation` with focus trap, `LanguageSwitcher` ✅ |
| Hero FR9–10 | `EditorialHero` ✅ |
| Services FR11–12 | `ServiceStrip` ✅ |
| Editorial FR13–14 | `EditorialRow` ✅ |
| Gallery FR15–19 | `GalleryCategorized` + GLightbox (SSR-guarded) ✅ |
| Video FR20–22 | `VideoSection` (`@defer`, `youtube-nocookie.com`) ✅ |
| Credentials FR23–24 | `JudgingCredentials` ✅ |
| Contact FR25–29 | `ContactForm` + `ContactFormService` + `ReactiveFormsModule` ✅ |
| SEO FR30–33 | `index.html` meta + `vercel.json` headers + SSR ✅ |
| Accessibility FR34–37 | Focus trap, `prefers-reduced-motion`, `NgOptimizedImage` alt, keyboard nav ✅ |

**Non-Functional Requirements:**
- Performance (LCP ≤ 2.5s): `NgOptimizedImage`, WebP, `@defer` for video, font `preconnect` ✅
- TTFB ≤ 600ms: SSR pre-renders HTML server-side ✅
- WCAG 2.1 AA: focus trap, reduced-motion, keyboard nav, alt text patterns specified ✅
- Security: HTTPS (Vercel auto-TLS), CSP headers (`vercel.json`), no pre-consent tracking ✅
- Reliability: CDN-backed static serving with SSR ✅

### Implementation Readiness Validation ✅

**Decision Completeness:** All critical decisions documented with specific versions and rationale. No decisions left as TBD.

**Structure Completeness:** Every source file is named — 9 components (4 files each), 1 service (2 files), 1 model, 2 locale files, 5 config files. Zero ambiguity for implementing agents.

**Pattern Completeness:** SSR guard, i18n string marking, `NgOptimizedImage`, `prefers-reduced-motion`, error handling, loading states, and contact form payload — all specified with concrete code examples.

### Gap Analysis Results

**No critical gaps found.**

**Minor (non-blocking):** `angular.json` i18n configuration snippet and `vercel.json` exact CSP header values are implementable from the decisions documented — recommended as first-story tasks.

### Architecture Completeness Checklist

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (Low — 9 components, no auth, no DB)
- [x] Technical constraints identified (SSR, i18n, Tailwind, Swiper, GLightbox)
- [x] Cross-cutting concerns mapped
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified (SSR guard, i18n, NgOptimizedImage, reduced-motion)
- [x] Process patterns documented (loading states, error recovery)
- [x] Complete directory structure defined
- [x] All 9 component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status: READY FOR IMPLEMENTATION**

**Confidence Level: High** — all 37 FRs are architecturally covered, all patterns have concrete examples, the project structure is file-level complete.

**Key Strengths:**
- Unified SSR guard pattern eliminates the #1 implementation risk for Angular SSR projects
- Build-time i18n is the correct approach for a static-output bilingual site (zero runtime overhead)
- `@defer` for `VideoSection` handles the largest performance risk elegantly
- Single `ContactFormService` creates a clean, testable HTTP boundary

**Areas for Future Enhancement (post-MVP):**
- Lighthouse CI in GitHub Actions pipeline
- E2E tests (Playwright) for contact form submission flow
- PWA service worker for offline gallery browsing

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Refer to this document for all architectural questions

**First Implementation Steps:**
1. `ng new dance --standalone --ssr --routing --style=css --strict`
2. `ng add @angular/localize`
3. Configure `tailwind.config.js` with custom tokens
4. Configure `angular.json` for dual-language builds (`hu` + `en`)
5. Validate SSR + i18n scaffold before building any component
