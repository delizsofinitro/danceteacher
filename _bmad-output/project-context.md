---
project_name: 'Dance'
user_name: 'Zsófi'
date: '2026-03-21'
sections_completed: ['technology_stack', 'angular_rules', 'tailwind_rules', 'i18n_rules', 'ssr_rules', 'third_party_rules', 'component_rules', 'animation_rules', 'accessibility_rules', 'anti_patterns']
---

# Project Context for AI Agents

_Critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Angular 18** (standalone components, no NgModule)
- **@angular/ssr** (SSR / Angular Universal) — required for SEO
- **@angular/localize** — build-time i18n, `/hu/` and `/en/` locale outputs
- **TypeScript 5.x** (strict mode enabled)
- **Tailwind CSS v3** with custom design tokens in `tailwind.config.js`
- **@tailwindcss/typography** — for prose content in About section
- **Swiper.js** (^11) — mobile carousels (gallery album row, gallery image carousel)
- **GLightbox** (^3) — photo lightbox + video modal player
- **Google Fonts** — Playfair Display + Inter (preconnect + display=swap)
- **Node.js** 20 LTS (required for Angular 18 + SSR)

---

## Critical Implementation Rules

### Angular — Standalone Components

- **ALWAYS use standalone components** — `@Component({ standalone: true, imports: [...] })`. Never create NgModule unless absolutely required by a legacy library.
- Import dependencies directly in each component's `imports: []` array — `CommonModule`, `RouterModule`, `FormsModule` etc. are not globally available.
- Use `inject()` function for dependency injection in standalone components, not constructor injection as a preference. Both are valid but `inject()` is more idiomatic in Angular 18.
- `provideRouter()`, `provideHttpClient()`, `provideClientHydration()` are configured in `app.config.ts` — never in a root NgModule.

### Angular — SSR Rules

- **`provideClientHydration()`** MUST be in `app.config.ts` — required for SSR hydration. Without it, the client-side Angular re-renders the SSR output causing flicker.
- **Never access `window`, `document`, `navigator` directly** — these do not exist on the server. Always use `isPlatformBrowser(PLATFORM_ID)` check or Angular's `DOCUMENT` injection token.
  ```typescript
  // CORRECT
  import { PLATFORM_ID, inject } from '@angular/core';
  import { isPlatformBrowser } from '@angular/common';
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) { /* browser-only code */ }

  // WRONG — crashes on server
  window.scrollTo(0, 0);
  ```
- **Swiper.js and GLightbox are browser-only** — initialize them only inside `isPlatformBrowser()` guards. Import them dynamically: `await import('swiper')`.
- **IntersectionObserver** is browser-only — wrap in `isPlatformBrowser()`.
- `localStorage`, `sessionStorage` — browser-only, always guard.
- `afterRender()` or `afterNextRender()` lifecycle hooks are the Angular 18 idiomatic way to run browser-only initialization code safely with SSR.

### Angular — i18n (`@angular/localize`)

- **URL structure:** `/hu/` is the primary locale, `/en/` is secondary. This is Angular's `baseHref` configuration per locale build.
- Mark translatable strings with `i18n` attribute on template elements: `<h1 i18n="@@hero.title">Tánctanár Brisbane-ben</h1>`.
- Use `$localize` tagged template literal in TypeScript: `` $localize`:@@hero.subtitle:20+ év tapasztalat` ``.
- **Translation IDs** follow `@@section.element` pattern (e.g. `@@nav.contact`, `@@services.children.title`).
- Translation files live at `src/locale/messages.hu.xlf` and `src/locale/messages.en.xlf`.
- `angular.json` configures two build outputs: `i18nLocales: { hu: {...}, en: {...} }` with separate `baseHref`.
- **Never hardcode Hungarian or English text directly in components** without `i18n` marking — this breaks the build-time translation pipeline.
- The `hreflang` meta tags are rendered server-side per locale — do not duplicate them in client-side logic.

### Angular — Signals & Reactivity

- **Prefer Signals** over RxJS for local component state in Angular 18: `signal()`, `computed()`, `effect()`.
- RxJS `Observable` is appropriate for: HTTP requests, router events, form `valueChanges`.
- `toSignal()` converts Observables to Signals where needed in templates.
- `AsyncPipe` is still valid for Observables in templates but Signals with `{{ signal() }}` is preferred for simple state.

### Angular — File Naming & Structure

```
src/
  app/
    core/
      services/
        scroll-reveal.service.ts    ← IntersectionObserver singleton
        language.service.ts         ← locale switching helpers
      tokens/
        platform.token.ts
    features/
      hero/
        hero.component.ts
        hero.component.html
        hero.component.scss (or inline styles via styleUrls)
      services-strip/
      about/
      gallery/
        gallery.component.ts
        gallery-album.type.ts       ← album data types
      video/
      judging/
      contact/
      navigation/
    shared/
      components/
        language-switcher/
      directives/
        scroll-reveal.directive.ts
  locale/
    messages.hu.xlf
    messages.en.xlf
  styles/
    base.css                        ← @tailwind directives + global resets
```

- File naming: `kebab-case` for all files. Component class name: `PascalCase` suffixed with `Component`.
- One component per file. No barrel `index.ts` exports unless the folder has 3+ public exports.

---

## Tailwind CSS Rules

- **All design tokens are defined in `tailwind.config.js`** — never use raw hex values in templates or component styles.
- Custom colour tokens:
  ```js
  colors: {
    burgundy: '#754247',
    coral:    '#DC6567',
    cream:    '#F9EBDB',
    beige:    '#E8DBC9',
    mint:     '#BCE2D3',
    dark:     '#2D1F21',
  }
  ```
- Custom spacing base: 8px (`spacing.1 = 8px` via `spacing: { 1: '8px', 2: '16px', ... }` — confirm in config).
- **Do not add inline `style` attributes** for colours or spacing — always use Tailwind utility classes.
- **Coral (`text-coral`, `bg-coral`) is a decorative/accent colour only** — never use it as body text colour on white or cream backgrounds (contrast 3.1:1, below AA threshold for normal text).
- `@tailwindcss/typography` is included — use `prose` class on About section body text blocks.
- `content: ['./src/**/*.{html,ts}']` must include `.ts` files in `tailwind.config.js` for JIT to pick up classes used in template strings.
- Responsive prefix order in class lists: `base md: lg: xl:` — always mobile-first.

---

## SSR & Performance Rules

- **`<picture>` elements with `srcset`** for all hero and gallery images — WebP primary, JPEG fallback. Use `loading="eager"` on hero image, `loading="lazy"` on all below-fold images.
- **Video iframes**: never place `<iframe>` in the initial HTML. Use click-to-load pattern — render `<img>` thumbnail + play button, replace with `<iframe>` on click. SSR renders the thumbnail only.
- YouTube embed domain: always `youtube-nocookie.com` (GDPR). Vimeo: append `?dnt=1`.
- **GLightbox**: import dynamically (`await import('glightbox')`) and initialize only in `afterNextRender()` or inside `isPlatformBrowser()` guard.
- **Swiper.js**: same as GLightbox — dynamic import + browser guard.
- `font-display: swap` on Google Fonts `<link>` — already available via `display=swap` URL param. Fallback stack: `"Playfair Display", Georgia, serif` and `"Inter", system-ui, sans-serif`.
- Target Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95, SEO 100.
- LCP ≤ 2.5s on mobile 4G. CLS ≤ 0.1 (set explicit `width`/`height` or `aspect-ratio` on all images to prevent layout shift).

---

## Third-Party Library Rules

### Swiper.js
- Import only required modules: `Navigation`, `Pagination`, `A11y`, `FreeMode` — do NOT import the full bundle.
  ```typescript
  import Swiper from 'swiper';
  import { Navigation, FreeMode, A11y } from 'swiper/modules';
  ```
- Album card row: `freeMode: true`, `slidesPerView: 'auto'`, `spaceBetween: 12`.
- Gallery image carousel (mobile): `slidesPerView: 1`, `Navigation`, `A11y`.
- Add `swiper/css` and `swiper/css/navigation` to `angular.json` styles array (or import in `base.css`).

### GLightbox
- Initialize with `selector: '[data-glightbox]'` attribute pattern.
- Gallery albums: use `data-gallery="album-{slug}"` to scope lightbox navigation per album. Slug is language-neutral (e.g. `competitions`, `weddings`).
- Video modal: `type: 'iframe'`, width `90vw`, height `80vh`.
- Always call `glightbox.destroy()` in `ngOnDestroy()` to prevent memory leaks.

---

## Component Rules

### IntersectionObserver / ScrollReveal

- Single `ScrollRevealService` (`core/services/scroll-reveal.service.ts`) manages all `IntersectionObserver` instances.
- Components call `scrollRevealService.observe(element, options)` — service handles cleanup.
- Default: `threshold: 0.15`, `rootMargin: '0px'`, one-shot (unobserve after trigger).
- Animation: CSS class toggle approach — add `is-visible` class on intersection, CSS handles `opacity`/`transform` transition.
- Use `afterNextRender()` to call `observe()` — ensures DOM is ready in SSR context.
- `prefers-reduced-motion` check lives in the service: if `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, mark all elements as visible immediately without animating.

### GalleryCategorized

- Album data is typed via `GalleryAlbum` interface: `{ slug: string; titleKey: string; images: GalleryImage[] }`.
- Album slugs are language-neutral: `'competitions' | 'weddings' | 'teaching' | 'performances' | 'acroyoga'`.
- Active album state: `activeAlbum = signal<string>('competitions')` — default first album.
- Album switching: fade out → update signal → fade in — use CSS `opacity` transition on the grid container.
- `aria-pressed` attribute on album buttons: bound to `[attr.aria-pressed]="activeAlbum() === album.slug"`.

### ContactForm

- Validation on submit only — no real-time field validation.
- Use Angular `ReactiveFormsModule` with `FormBuilder`. Validators: `Validators.required`, `Validators.email`, `Validators.minLength(10)`.
- Error messages shown only after `form.submitted && control.invalid`.
- All input `font-size: 16px` minimum — prevents iOS Safari auto-zoom (enforced via Tailwind `text-base` = 16px).
- On successful submission: set `submitted = signal(true)`, hide form, show confirmation message. `aria-live="polite"` on confirmation container.
- Form uses `HttpClient` POST — if no backend yet, use a form-handling service (Formspree, Netlify Forms, or similar static-friendly service).

### MobileNavigation

- Overlay open state: `isOpen = signal(false)`.
- Body scroll lock when open: `document.body.style.overflow = 'hidden'` — guard with `isPlatformBrowser()`.
- Focus trap: use Angular CDK `A11yModule` `FocusTrap` or implement manually.
- `Esc` key listener: `@HostListener('document:keydown.escape')` — close overlay.

---

## Animation Rules

- `scrollReveal.directive.ts` applies `data-scroll-reveal` and adds `is-visible` class via the service.
- Hero load animation: CSS `@keyframes` triggered on `after-render` — not IntersectionObserver.
- All hover animations: **disabled on touch devices** via `@media (hover: none)` in `base.css`.
- Global `prefers-reduced-motion` rule in `base.css`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

---

## Accessibility Rules

- WCAG 2.1 Level AA compliance required.
- **Coral (#DC6567) decorative use only** — never as body text colour on white/cream (3.1:1 ratio).
- Focus indicator on ALL focusable elements: `outline: 2px solid #DC6567; outline-offset: 3px` — override browser default in `base.css`.
- Single `<h1>` per page. Heading hierarchy: `h1` (hero) → `h2` (sections) → `h3` (sub-items).
- All images: meaningful `alt` via `i18n` attribute on `alt`. Decorative: `alt=""`.
- All icon-only buttons: `aria-label` required (hamburger, lightbox close, play button).
- `<main id="main-content">` wraps page content. Skip-to-content link is the first focusable element.
- Minimum tap target: 44×44px on all interactive elements — enforce via `min-h-[44px] min-w-[44px]` utility.

---

## Critical Anti-Patterns — NEVER DO

- ❌ **Never use `window.*` or `document.*` directly** — always `isPlatformBrowser()` guard. This crashes SSR.
- ❌ **Never hardcode hex colours in templates** — always use Tailwind design tokens (`bg-burgundy`, not `bg-[#754247]` unless the token isn't defined).
- ❌ **Never load Swiper or GLightbox on the server** — dynamic import + browser guard required.
- ❌ **Never place `<iframe>` for videos in initial HTML** — click-to-load pattern only (performance & SSR).
- ❌ **Never use `NgModule`** — this is a standalone components project throughout.
- ❌ **Never skip `i18n` markup on visible text** — any hardcoded string in a template breaks the `@angular/localize` extraction pipeline.
- ❌ **Never use coral as body text colour** — decorative/accent only (WCAG contrast failure).
- ❌ **Never use `document.body.style.overflow` without `isPlatformBrowser()` guard** — crashes on server.
- ❌ **Never add `pixel` widths to layout containers** — use Tailwind responsive classes or `max-w-[1200px] mx-auto`.
- ❌ **Never initialize IntersectionObserver in the constructor or `ngOnInit()`** — use `afterNextRender()` to ensure DOM availability in SSR context.
- ❌ **Never call `glightbox.destroy()` without null-check** — it may not have initialized (e.g., SSR render).
