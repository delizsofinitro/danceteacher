---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
status: 'complete'
completedAt: '2026-03-21'
inputDocuments: ['prd.md', 'architecture.md', 'ux-design-specification.md']
workflowType: 'epics-and-stories'
project_name: 'Dance'
user_name: 'Zsófi'
date: '2026-03-21'
---

# Dance - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Dance, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Visitor can switch the interface language between Hungarian and English at any time
FR2: The site detects or defaults to a language route (/hu/ or /en/) without manual selection
FR3: All visible text, labels, headings, and form fields are fully translated in both languages — no raw translation keys visible to the user
FR4: Each language route is independently accessible and indexable by search engines
FR5: Visitor can navigate to any major section of the page using the site header navigation
FR6: Visitor can open and close a full-screen mobile navigation overlay on small screens
FR7: The sticky header remains accessible during scroll on all device sizes
FR8: Navigation items link to page sections using smooth anchor scroll
FR9: Visitor sees Zsófi's name, a professional photo, and a concise professional headline on arrival
FR10: Visitor can immediately understand the nature of Zsófi's professional offering from the hero section
FR11: Visitor can view a summary of all 7 services Zsófi offers
FR12: Services are visually grouped and labelled in the active language
FR13: Visitor can read a narrative about Zsófi's background, teaching philosophy, and professional experience
FR14: The about content is displayed in an editorial layout that reinforces the professional brand
FR15: Visitor can browse photos organised by category (Competitions, Weddings, Teaching, Performances, Acro-yoga)
FR16: Visitor can switch between gallery categories without navigating away from the page
FR17: Visitor can open any gallery photo in a full-screen lightbox
FR18: Visitor can navigate between photos within the lightbox (next / previous)
FR19: Gallery images are labelled or contextualised in the active language
FR20: Visitor can view an embedded video without leaving the page
FR21: Video content does not autoplay — the visitor must initiate playback
FR22: Video playback does not use tracking cookies before the visitor clicks to load
FR23: Visitor can read Zsófi's professional judging credentials and the competitions/federations she adjudicates
FR24: The credentials section is reachable directly from the navigation
FR25: Visitor can submit a contact enquiry with their name, email address, and a message
FR26: The contact form validates input before submission (required fields, email format)
FR27: Zsófi receives an email notification for every successful form submission
FR28: The visitor receives confirmation feedback after a successful form submission
FR29: A privacy notice is displayed adjacent to the contact form
FR30: Each language route has a unique page title and meta description
FR31: The site includes hreflang link tags for the alternate language route
FR32: The site includes Open Graph meta tags (title, description, image, locale) for link-sharing
FR33: All page content is rendered in HTML before JavaScript executes (SSR)
FR34: All images have descriptive alternative text in the active language
FR35: All interactive elements (navigation, gallery controls, contact form) are operable by keyboard
FR36: Focus is trapped within the mobile navigation overlay when it is open
FR37: The site respects the visitor's reduced-motion preference for animations

### NonFunctional Requirements

NFR1: LCP (Largest Contentful Paint) ≤ 2.5s on 4G mobile
NFR2: CLS (Cumulative Layout Shift) < 0.1
NFR3: FID (First Input Delay) < 100ms
NFR4: Lighthouse Performance ≥ 90 on mobile
NFR5: Lighthouse SEO ≥ 95
NFR6: TTFB ≤ 600ms (SSR response)
NFR7: Total page weight ≤ 2MB on first load (excluding deferred gallery images)
NFR8: Contact form submissions transmitted over HTTPS only
NFR9: No personal data stored in the browser beyond the active session
NFR10: youtube-nocookie.com used for all YouTube embeds
NFR11: No third-party tracking scripts at MVP
NFR12: WCAG 2.1 Level AA compliance across all components
NFR13: Lighthouse Accessibility ≥ 95
NFR14: All colour combinations meet minimum contrast ratios (4.5:1 normal text, 3:1 large text)
NFR15: Contact form email delivery within 60 seconds of submission; visible error on failure
NFR16: Site availability 99.5% uptime (CDN-backed static/SSR hosting)
NFR17: Google Fonts loaded via preconnect + font-display:swap; page renders with fallback on failure

### Additional Requirements

- **Project Initialisation (Architecture):** Angular CLI starter — `ng new dance --standalone --ssr --routing --style=css --strict` — must be the first implementation story
- **i18n Build Configuration:** `ng add @angular/localize`; `angular.json` configured for dual-language builds producing `/hu/` and `/en/` output trees; `src/locale/messages.xlf` (source) + `src/locale/messages.hu.xlf` (HU translations)
- **Tailwind Setup:** `tailwind.config.js` with custom design tokens: `burgundy: '#754247'`, `coral: '#DC6567'`, `cream: '#F9EBDB'`, `beige: '#E8DBC9'`, `dark: '#2D1F21'`, `mint: '#BCE2D3'`
- **SSR Validation Prototype:** Validate SSR + i18n scaffold with a hello-world prototype before building any component — highest technical risk per PRD
- **CSP Headers:** `vercel.json` with `frame-src 'self' https://www.youtube-nocookie.com`; `connect-src` restricted to contact form endpoint
- **Vercel Deployment:** `@vercel/angular` SSR adapter; GitHub Actions CI/CD pipeline with `ng build --localize`
- **SSR Guard Pattern:** Every component using browser APIs must use `isPlatformBrowser()` + `afterNextRender()` (applies to Swiper.js ^11, GLightbox ^3, VideoSection)
- **NgOptimizedImage:** All content `<img>` tags must use `ngSrc` directive; WebP format with JPEG fallback

### UX Design Requirements

UX-DR1: Implement Magazine Editorial design direction — Playfair Display (headings) + Inter (body) Google Fonts; apply to global styles
UX-DR2: Implement EditorialHero component — asymmetric editorial grid, Zsófi's professional photo, name headline, professional tagline; responsive (mobile-first)
UX-DR3: Implement ServiceStrip component — burgundy background strip, horizontal scroll/grid layout, all 7 services (Gyermek tánc, Pár tánc, Esküvői koreográfia, Acro-yoga, Egyéni tánc, Versenyfelkészítés, Bíráskodás) as labelled cards
UX-DR4: Implement EditorialRow component — alternating editorial layout (text left/image right, then inverse), narrative about Zsófi's background and teaching philosophy
UX-DR5: Implement GalleryCategorized component — 5 album tabs (Competitions, Weddings, Teaching, Performances, Acro-yoga), Swiper.js ^11 carousel (SSR-guarded), GLightbox ^3 lightbox (SSR-guarded, destroy on ngOnDestroy)
UX-DR6: Implement VideoSection component — click-to-load YouTube embed using youtube-nocookie.com, angular `@defer` deferred load, no autoplay
UX-DR7: Implement JudgingCredentials component — credentials panel with federations, competition levels, adjudication history; reachable via anchor nav
UX-DR8: Implement ContactForm component — ReactiveFormsModule, name/email/message fields, inline validation errors, `isSubmitting` signal, privacy notice, ContactFormService for submission
UX-DR9: Implement MobileNavigation component — hamburger toggle, full-screen overlay, focus trap (WCAG FR36), smooth open/close transition, `prefers-reduced-motion` respected
UX-DR10: Implement LanguageSwitcher component — static `<a>` links to `/hu/` and `/en/` static trees (no Angular Router switching)
UX-DR11: Sticky header — always accessible during scroll; contains navigation links + LanguageSwitcher + MobileNavigation toggle
UX-DR12: Smooth anchor scroll for all navigation items (FR8); respect `prefers-reduced-motion` (use instant scroll when reduced motion)
UX-DR13: `prefers-reduced-motion` CSS override — `* { transition: none !important; animation: none !important; }` in every component defining transitions
UX-DR14: `NgOptimizedImage` applied to all hero and gallery images; WebP src with width/height attributes; `priority` on hero image
UX-DR15: Open Graph meta tags and hreflang — Angular `Meta` service in `AppComponent`; unique title + description per language; `og:image`, `og:locale`, `og:type`

### FR Coverage Map

| FR | UX-DR / Additional Req | Epic |
|---|---|---|
| FR1, FR2, FR4 | UX-DR10, Additional (i18n Build) | Epic 1 |
| FR3 | UX-DR1–UX-DR15 (all strings marked i18n) | Epics 1–5 |
| FR5, FR7, FR8 | UX-DR11, UX-DR12 | Epic 2 |
| FR6, FR36 | UX-DR9 | Epic 2 |
| FR9, FR10 | UX-DR2 | Epic 3 |
| FR11, FR12 | UX-DR3 | Epic 3 |
| FR13, FR14 | UX-DR4 | Epic 3 |
| FR15–FR19 | UX-DR5 | Epic 4 |
| FR20–FR22 | UX-DR6 | Epic 4 |
| FR23, FR24 | UX-DR7 | Epic 4 |
| FR25–FR29 | UX-DR8 | Epic 5 |
| FR30–FR33 | UX-DR15, Additional (SSR) | Epic 1, Epic 6 |
| FR34 | UX-DR14 | Epics 3–4 |
| FR35, FR37 | UX-DR13 | Epics 2–5 |
| NFR1–NFR7 | UX-DR14, UX-DR6, Additional | Epics 1, 6 |
| NFR8–NFR11 | Additional (CSP, HTTPS) | Epic 1, Epic 6 |
| NFR12–NFR14 | UX-DR9, UX-DR13 | Epics 2–5 |
| NFR15–NFR16 | Additional (Vercel, CI/CD) | Epic 1, Epic 6 |

## Epic List

### Epic 1: Projekt alap & SSR+i18n infrastruktúra
A fejlesztő futtatható Angular 18 SSR + bilingüal alapot kap, amelyre minden komponens épülhet; a /hu/ és /en/ route-ok renderelnek és indexelhetők.
**FRs lefedve:** FR2, FR4, FR33; Arch követelmények: projekt init, i18n build, Tailwind tokenek, Vercel deploy, CSP headerek

### Epic 2: Navigáció & oldal-keret
A látogató navigálni tud az oldal szekciói között bármilyen eszközön — sticky headerrel, mobil hamburger overlay-jel és nyelvváltóval.
**FRs lefedve:** FR1, FR5, FR6, FR7, FR8, FR35, FR36, FR37; UX-DR9–13

### Epic 3: Tartalom szekciók (Hero, Szolgáltatások, Bemutatkozás)
A látogató megérti Zsófi szakmai identitását, az összes 7 szolgáltatást áttekinti, és elolvas egy szerkesztői narratívát — mindkét nyelven.
**FRs lefedve:** FR3, FR9, FR10, FR11, FR12, FR13, FR14, FR34; UX-DR1–4, UX-DR14

### Epic 4: Galéria, Videó & Hitelesítők
A látogató böngészi a kategorizált fotóalbumokat lightboxban, megnéz egy videót, és meggyőző hitelesítői információkat olvas.
**FRs lefedve:** FR15–19, FR20–22, FR23, FR24, FR34, FR35; UX-DR5–7, UX-DR14

### Epic 5: Kapcsolati form & Email kézbesítés
A látogató enquiry-t tud küldeni Zsófinak; visszajelzést kap a sikeres küldésről; Zsófi emailben értesül.
**FRs lefedve:** FR25–29; UX-DR8

### Epic 6: SEO, Teljesítmény & Production Deploy
Zsófi Google-ban indexelt, gyorsan töltő oldalt kap mindkét nyelven; Lighthouse küszöbök elérve; production deploy él.
**FRs lefedve:** FR30–33; NFR1–17; UX-DR15

---

## Epic 1: Projekt alap & SSR+i18n infrastruktúra

A fejlesztő futtatható Angular 18 SSR + bilingual alapot kap, amelyre minden komponens épülhet; a /hu/ és /en/ route-ok renderelnek és indexelhetők.

### Story 1.1: Angular projekt inicializálás és Tailwind konfiguráció

As a developer,
I want to initialise the Angular 18 project with SSR, strict TypeScript, and Tailwind CSS with custom design tokens,
So that every subsequent component is built on a consistent, correctly configured foundation.

**Acceptance Criteria:**

**Given** a clean working directory
**When** the init commands are executed (`ng new dance --standalone --ssr --routing --style=css --strict`)
**Then** the project compiles with `ng build` without errors
**And** `ng serve --ssr` starts without errors and renders a placeholder page

**Given** Tailwind CSS v3 is installed
**When** `tailwind.config.js` is configured
**Then** custom tokens are available: `burgundy: '#754247'`, `coral: '#DC6567'`, `cream: '#F9EBDB'`, `beige: '#E8DBC9'`, `dark: '#2D1F21'`, `mint: '#BCE2D3'`
**And** `styles.css` includes Tailwind `@base`, `@components`, `@utilities` directives

**Given** the project is initialised
**When** `src/index.html` is inspected
**Then** Google Fonts preconnect links for Playfair Display and Inter are present
**And** `font-display: swap` is set in `styles.css`

---

### Story 1.2: Build-time i18n konfiguráció (HU + EN)

As a developer,
I want to configure `@angular/localize` with dual-language builds for Hungarian and English,
So that `ng build --localize` produces independent `/hu/` and `/en/` output trees.

**Acceptance Criteria:**

**Given** `ng add @angular/localize` has been run
**When** `angular.json` i18n configuration is set up with `hu` and `en` locales
**Then** `ng build --localize` completes without errors
**And** the dist folder contains separate `/hu/` and `/en/` subdirectories, each with valid `index.html`

**Given** `src/locale/messages.xlf` (source) and `src/locale/messages.hu.xlf` (HU) exist
**When** a string is marked `i18n` in a template
**Then** `ng extract-i18n` adds it to `messages.xlf`
**And** the HU `.xlf` file contains a corresponding `<trans-unit>` entry

**Given** the dual-language build output
**When** both `/hu/index.html` and `/en/index.html` are opened
**Then** the pages render with the correct language content (no raw translation keys visible)

---

### Story 1.3: SSR + i18n validációs prototípus

As a developer,
I want to validate that SSR and `@angular/localize` work correctly together end-to-end,
So that the highest-risk technical combination is proven before any production component is built.

**Acceptance Criteria:**

**Given** the project has SSR and i18n configured
**When** a single test component with one `i18n`-marked string is created
**Then** `ng serve --ssr` renders the correct string in the active language in the server-rendered HTML (inspectable via curl or view-source)
**And** `isPlatformBrowser()` and `afterNextRender()` patterns work correctly (no runtime errors)

**Given** the validation prototype is complete
**When** `ng build --localize` is run
**Then** both language builds produce correct SSR HTML output
**And** no `ExpressionChangedAfterItHasBeenChecked` or hydration mismatch errors appear in the console

---

### Story 1.4: Vercel deploy konfiguráció & GitHub Actions CI/CD

As a developer,
I want a working CI/CD pipeline that builds and deploys both language outputs to Vercel,
So that every commit is automatically tested and deployed.

**Acceptance Criteria:**

**Given** a `vercel.json` file is created
**When** it is inspected
**Then** it contains CSP headers: `frame-src 'self' https://www.youtube-nocookie.com`
**And** `connect-src` is restricted to the contact form endpoint and `'self'`

**Given** `.github/workflows/ci.yml` is created
**When** a commit is pushed to main
**Then** the workflow runs `ng build --localize`
**And** both language output trees are deployed to Vercel without errors

**Given** the deployed site
**When** `/hu/` and `/en/` URLs are accessed
**Then** each returns HTTP 200 with server-rendered HTML
**And** all CSP headers are present in the response

---

## Epic 2: Navigáció & oldal-keret

A látogató navigálni tud az oldal szekciói között bármilyen eszközön — sticky headerrel, mobil hamburger overlay-jel és nyelvváltóval. Minden interaktív elem billentyűzettel is kezelhető.

### Story 2.1: AppComponent oldal-keret és sticky header

As a visitor,
I want a sticky header that remains visible during scrolling,
So that I can navigate to any section at any time without scrolling back to the top.

**Acceptance Criteria:**

**Given** the page is loaded
**When** the visitor scrolls down
**Then** the header remains fixed at the top of the viewport on all screen sizes
**And** the header contains navigation links, LanguageSwitcher slot, and MobileNavigation toggle slot

**Given** the header navigation
**When** a navigation link is clicked
**Then** the page smooth-scrolls to the target section
**And** if `prefers-reduced-motion` is set, the scroll is instant (no animation)

**Given** navigation links are rendered
**When** all strings are inspected
**Then** every visible text node has an `i18n` attribute
**And** both /hu/ and /en/ builds render the correct labels

---

### Story 2.2: LanguageSwitcher komponens

As a visitor,
I want to switch between Hungarian and English at any time,
So that I can read all content in my preferred language.

**Acceptance Criteria:**

**Given** the LanguageSwitcher component is rendered
**When** it is inspected
**Then** it contains two `<a>` links: one to `/hu/` and one to `/en/`
**And** no Angular Router `routerLink` is used (static href only)

**Given** a visitor on `/hu/`
**When** they click the EN link
**Then** they are navigated to `/en/` and the full page renders in English

**Given** the language switcher
**When** inspected for accessibility
**Then** each link has an `aria-label` in the active language (e.g. "Váltás angolra" / "Switch to Hungarian")
**And** the links are keyboard-focusable and operable

---

### Story 2.3: MobileNavigation komponens fokusztrappal

As a visitor on a mobile device,
I want a full-screen navigation overlay that traps focus while open,
So that I can navigate by keyboard or assistive technology without focus escaping the overlay.

**Acceptance Criteria:**

**Given** the hamburger button is tapped or clicked
**When** the overlay opens
**Then** the overlay is full-screen and covers all page content
**And** focus is immediately moved to the first navigation item inside the overlay

**Given** the overlay is open
**When** the visitor presses Tab repeatedly
**Then** focus cycles only within the overlay (focus trap)
**And** pressing Escape closes the overlay and returns focus to the hamburger button

**Given** the overlay close transition
**When** `prefers-reduced-motion` is active
**Then** the open/close transition is instant (no CSS animation)

**Given** all overlay strings
**When** inspected
**Then** every visible text node has an `i18n` attribute

---

## Epic 3: Tartalom szekciók (Hero, Szolgáltatások, Bemutatkozás)

A látogató megérti Zsófi szakmai identitását, az összes 7 szolgáltatást áttekinti, és elolvas egy szerkesztői narratívát — mindkét nyelven, képekkel.

### Story 3.1: Globális tipográfia és design tokens alkalmazása

As a visitor,
I want the site to use a consistent editorial typographic system (Playfair Display + Inter, custom colour palette),
So that the design communicates Zsófi's professional brand identity immediately.

**Acceptance Criteria:**

**Given** the page loads
**When** heading elements are inspected
**Then** `font-family: 'Playfair Display', serif` is applied to all `h1`–`h3` elements via Tailwind utility classes
**And** `font-family: 'Inter', sans-serif` is applied to all body text

**Given** the Tailwind config
**When** colour utilities are used
**Then** `text-dark`, `bg-burgundy`, `text-coral` etc. resolve to the correct hex values
**And** coral (`#DC6567`) is never applied to body text (decorative use only, per project rules)

**Given** `prefers-reduced-motion` media query
**When** applied globally in `styles.css`
**Then** all CSS transitions and animations are overridden to `none` when the user preference is set

---

### Story 3.2: EditorialHero komponens

As a visitor arriving at the site,
I want to see Zsófi's name, professional photo, and a compelling headline immediately,
So that I understand who she is and what she offers within the first 5 seconds.

**Acceptance Criteria:**

**Given** the hero section renders
**When** inspected on mobile (375px)
**Then** Zsófi's name, professional photo, and tagline are visible above the fold without scrolling
**And** the photo uses `ngSrc` (NgOptimizedImage) with `priority` attribute, WebP format, and correct `width`/`height`

**Given** the hero section
**When** inspected in both /hu/ and /en/ builds
**Then** headline and tagline text render in the correct language (no raw translation keys)
**And** the photo `alt` attribute is translated in each language build

**Given** the asymmetric editorial grid layout
**When** viewed at lg breakpoint (1024px+)
**Then** the layout is asymmetric (text and image in editorial columns)
**And** CLS is 0 (no layout shift after image loads due to explicit dimensions)

---

### Story 3.3: ServiceStrip komponens (7 szolgáltatás)

As a visitor,
I want to see all 7 of Zsófi's services clearly presented,
So that I can quickly identify which service is relevant to me.

**Acceptance Criteria:**

**Given** the ServiceStrip renders
**When** inspected
**Then** all 7 services are visible: Gyermek tánc, Pár tánc, Esküvői koreográfia, Acro-yoga, Egyéni tánc, Versenyfelkészítés, Bíráskodás
**And** the strip uses the `bg-burgundy` background colour

**Given** the /en/ build
**When** the ServiceStrip is rendered
**Then** all 7 service names are translated into English
**And** no raw `i18n` keys are visible

**Given** the ServiceStrip on mobile
**When** it is viewed at 375px
**Then** all services are accessible (scroll or wrap) without content being clipped off-screen

---

### Story 3.4: EditorialRow komponens (Bemutatkozás)

As a visitor,
I want to read a narrative about Zsófi's background, teaching philosophy, and experience in an editorial layout,
So that I develop trust in her professional credentials before viewing the gallery.

**Acceptance Criteria:**

**Given** the EditorialRow renders
**When** inspected at lg breakpoint
**Then** the layout alternates text and image columns in an editorial (asymmetric) pattern
**And** images use `ngSrc` with explicit `width`/`height` attributes

**Given** the EditorialRow content
**When** inspected in both language builds
**Then** all narrative text is translated (no raw keys)
**And** image `alt` attributes are language-appropriate

**Given** the component
**When** its CSS is inspected
**Then** `@media (prefers-reduced-motion: reduce)` override is present if any transitions are defined

---

## Epic 4: Galéria, Videó & Hitelesítők

A látogató böngészi a kategorizált fotóalbumokat lightboxban, megnéz egy videót privacy-safe módon, és meggyőző hitelesítői információkat olvas.

### Story 4.1: GalleryCategorized komponens — album-váltás és képrács

As a visitor,
I want to browse photos organised into 5 categories with a tab switcher,
So that I can find images relevant to the service I'm interested in.

**Acceptance Criteria:**

**Given** the GalleryCategorized component renders
**When** inspected
**Then** 5 album tabs are visible: Competitions, Weddings, Teaching, Performances, Acro-yoga (translated labels in each language build)
**And** each album contains ~20 real photos (asset counts confirmed: all 5 albums ✅)
**And** the active album's photos are displayed in a responsive grid

**Given** a visitor clicks a different album tab
**When** the tab is selected
**Then** the photo grid switches to the new album without a page reload
**And** the selected tab is visually indicated (active state)

**Given** gallery images
**When** inspected
**Then** all images use `loading="lazy"` (deferred below fold)
**And** all images have `alt` text in the active language (FR34)

**Given** Swiper.js initialisation
**When** the component is server-side rendered
**Then** no `window` or `document` access occurs during SSR (isPlatformBrowser guard present)
**And** Swiper initialises correctly after `afterNextRender()` in the browser

---

### Story 4.2: GLightbox integráció — teljes képernyős lightbox

As a visitor,
I want to open any gallery photo in a full-screen lightbox and navigate between photos,
So that I can view images in detail without leaving the page.

**Acceptance Criteria:**

**Given** a gallery image is clicked
**When** the lightbox opens
**Then** the image is displayed full-screen
**And** next/previous navigation controls are functional (FR18)

**Given** the lightbox is open
**When** the visitor uses the keyboard
**Then** left/right arrow keys navigate between photos (FR35)
**And** Escape closes the lightbox

**Given** GLightbox initialisation
**When** the component is SSR-rendered
**Then** GLightbox is initialised inside `afterNextRender()` with `isPlatformBrowser()` guard
**And** `destroy()` is called in `ngOnDestroy()` to prevent memory leaks

---

### Story 4.3: VideoSection komponens — kattintásra töltő YouTube embed

As a visitor,
I want to watch an embedded video without it autoplaying or tracking me before I click play,
So that my privacy is respected and the page loads fast even with video content.

**Acceptance Criteria:**

**Given** the VideoSection is in the page
**When** the page first loads
**Then** the video is NOT loaded (click-to-load state: poster image or placeholder shown)
**And** no `youtube.com` or `youtube-nocookie.com` network request is made until the visitor clicks

**Given** the visitor clicks the play trigger
**When** the video loads
**Then** the embed uses `https://www.youtube-nocookie.com` URL (FR22)
**And** the video plays inline without navigating away

**Given** the `@defer` block wrapping VideoSection
**When** the component is inspected
**Then** it is deferred and not included in the initial JS bundle
**And** no SSR hydration mismatch errors occur

---

### Story 4.4: JudgingCredentials komponens

As a visitor interested in Zsófi's adjudication credentials,
I want to read detailed information about the competitions she judges and the federations she is affiliated with,
So that I can assess her authority level before contacting her.

**Acceptance Criteria:**

**Given** the JudgingCredentials component renders
**When** inspected
**Then** it displays federation affiliations, competition levels adjudicated, and relevant history
**And** the section has an `id` attribute matching the anchor link from navigation (FR24)

**Given** a visitor clicks the "Credentials" navigation link
**When** the anchor scroll completes
**Then** the JudgingCredentials section is in view

**Given** the credential content
**When** inspected in both language builds
**Then** all text is translated (no raw keys)

---

## Epic 5: Kapcsolati form & Email kézbesítés

A látogató enquiry-t tud küldeni Zsófinak; visszajelzést kap a sikeres küldésről; Zsófi emailben értesül. Adatvédelmi tájékoztató is megjelenik.

### Story 5.1: ContactFormService és ContactPayload modell

As a developer,
I want a `ContactFormService` that sends form data to the FormSubmit AJAX endpoint,
So that contact form submissions are delivered to Zsófi's inbox without a custom backend.

**Selected service: FormSubmit** (`https://formsubmit.co`) — no account or signup required; accepts HTTP POST to `https://formsubmit.co/ajax/{email}`; returns JSON; free tier sufficient for MVP.

**Acceptance Criteria:**

**Given** `ContactFormService` is implemented
**When** `send(payload: ContactPayload): Observable<void>` is called
**Then** it makes an `HttpClient.post()` request to `environment.contactFormEndpoint`
**And** `environment.ts` contains `contactFormEndpoint: 'https://formsubmit.co/ajax/PLACEHOLDER'`
**And** `environment.prod.ts` contains `contactFormEndpoint: 'https://formsubmit.co/ajax/ZSÓFI_EMAIL'` (replace with real email before Epic 5 sprint)

**Given** a successful submission
**When** the Observable completes
**Then** it emits and completes without error

**Given** a failed submission (network error or 4xx/5xx)
**When** the Observable errors
**Then** the error propagates to the component for user-facing display
**And** no personal data is logged to the browser console

---

### Story 5.2: ContactForm komponens — validáció és küldés

As a visitor,
I want to submit a contact enquiry with my name, email, and message,
So that Zsófi can respond to my interest.

**Acceptance Criteria:**

**Given** the ContactForm renders
**When** inspected
**Then** it contains three fields: name (required), email (required, email format), message (required)
**And** a submit button and a privacy notice adjacent to the form (FR29)

**Given** the visitor submits an empty form
**When** validation runs
**Then** inline error messages appear below each required field in the active language
**And** the form is not submitted until all required fields are valid

**Given** the visitor fills in valid data and submits
**When** the form is submitted
**Then** `isSubmitting` signal is set to `true` and the submit button is disabled
**And** `ContactFormService.send()` is called with the payload

**Given** a successful submission
**When** the Observable completes
**Then** the visitor sees a success confirmation message (FR28)
**And** `isSubmitting` is reset to `false`

**Given** a failed submission
**When** the Observable errors
**Then** a visible error banner is displayed above the submit button
**And** the submit button is re-enabled so the visitor can retry

**Given** all form labels, placeholders, error messages, and the privacy notice
**When** inspected in both language builds
**Then** every string is translated (no raw keys)

---

## Epic 6: SEO, Teljesítmény & Production Deploy

Zsófi Google-ban indexelt, gyorsan töltő oldalt kap mindkét nyelven; Lighthouse küszöbök elérve; production deploy él.

### Story 6.1: SEO meta tagek, hreflang és Open Graph

As a visitor or search engine bot,
I want each language route to have unique meta tags, hreflang links, and Open Graph tags,
So that the site is correctly indexed by Google and displays rich previews when shared.

**Acceptance Criteria:**

**Given** the /hu/ page is loaded
**When** the `<head>` is inspected
**Then** `<title>` and `<meta name="description">` are unique to the Hungarian route
**And** `<link rel="alternate" hreflang="hu">` and `hreflang="en"` and `hreflang="x-default"` are present (FR31)

**Given** the /en/ page is loaded
**When** its `<head>` is inspected
**Then** `<title>` and `<meta name="description">` are in English and unique to this route
**And** the same hreflang set is present

**Given** any language page is shared on WhatsApp or iMessage
**When** the link preview is generated
**Then** `og:title`, `og:description`, `og:image`, and `og:locale` tags are present and populated (FR32)

**Given** both pages are served via SSR
**When** curl is used to fetch `/hu/` and `/en/`
**Then** all meta content is in the server-rendered HTML (FR33) — not added by client-side JS only

---

### Story 6.2: Teljesítmény audit és képoptimalizálás

As a visitor on a mobile 4G connection,
I want the page to load within the performance targets (LCP ≤ 2.5s, CLS < 0.1, Lighthouse ≥ 90),
So that I have a fast, smooth browsing experience.

**Acceptance Criteria:**

**Given** all content images
**When** inspected
**Then** hero image has `priority` attribute on `NgOptimizedImage` (preloads the LCP element)
**And** all gallery images use `loading="lazy"` and WebP format with JPEG fallbacks

**Given** Google Fonts loading
**When** network waterfall is inspected
**Then** `preconnect` hints to `fonts.googleapis.com` and `fonts.gstatic.com` are in `<head>`
**And** `font-display: swap` is in effect (no invisible text during font load)

**Given** the deployed site
**When** Lighthouse mobile audit runs
**Then** Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 (NFR4, NFR5, NFR13)
**And** LCP < 2.5s, CLS < 0.1 (NFR1, NFR2)

---

### Story 6.3: Akadálymentesség (WCAG 2.1 AA) final audit

As a visitor using assistive technology,
I want all interactive elements to be keyboard-accessible and screen reader-compatible,
So that the site is usable regardless of disability.

**Acceptance Criteria:**

**Given** the complete site
**When** a WCAG 2.1 AA automated audit runs (Lighthouse + axe)
**Then** Lighthouse Accessibility score ≥ 95 with no critical violations (NFR13)

**Given** all colour combinations
**When** contrast is measured
**Then** dark (#2D1F21) on cream (#F9EBDB) ≥ 4.5:1 ✓
**And** cream on burgundy (#754247) ≥ 4.5:1 ✓
**And** coral (#DC6567) is not used for body text (decorative only)

**Given** the contact form
**When** tabbed through by keyboard only
**Then** all fields, labels, and the submit button are reachable and operable

**Given** the mobile navigation overlay
**When** operated by keyboard
**Then** focus trap works correctly (FR36) and Escape closes the overlay

---

### Story 6.4: HTTPS, CSP és privacy final ellenőrzés

As a visitor submitting personal data via the contact form,
I want the site to use HTTPS and restrict third-party content to known safe origins,
So that my data is transmitted securely.

**Acceptance Criteria:**

**Given** the deployed site
**When** HTTP headers are inspected
**Then** all responses are served over HTTPS (NFR8)
**And** `Content-Security-Policy` header is present with `frame-src 'self' https://www.youtube-nocookie.com`

**Given** the contact form is submitted
**When** network traffic is inspected
**Then** no personal data (name, email, message) is stored in localStorage or sessionStorage (NFR9)

**Given** the production build
**When** network traffic is monitored on page load
**Then** no third-party analytics or tracking scripts load before user interaction (NFR11)
