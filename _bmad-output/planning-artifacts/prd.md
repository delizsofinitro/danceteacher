---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain-skipped', 'step-06-innovation-skipped', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
status: complete
inputDocuments: ['ux-design-specification.md', 'project-context.md']
workflowType: 'prd'
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document - Dance

**Author:** Zsófi
**Date:** 2026-03-21

## Executive Summary

Zsófi is an Australia-based dance professional combining active performance, choreography, competition adjudication, and classroom instruction. This project delivers a bilingual (Hungarian / English) single-page landing site designed to convert organic search visitors into contact form enquiries — the sole conversion goal.

The problem: Zsófi's professional credibility and track record are invisible online. Prospective clients (parents seeking children's classes, couples planning wedding choreography, competition athletes, corporate event organisers) have no mechanism to assess her qualifications, see her work, or initiate contact. The site resolves this gap by compressing months of word-of-mouth reputation-building into a 90-second scroll experience.

Target users: Hungarian-speaking diaspora community in Australia, English-speaking locals discovering via Google, and any client segment requiring private or group dance instruction, performance coordination, or official adjudication services.

### What Makes This Special

Most dance instructor websites lead with timetables, pricing, or generic stock imagery. This site leads with professional identity and proof of results — editorial-grade visual design, segmented gallery evidence (5 album types: competitions, weddings, teaching, performances, acro-yoga), and an explicit adjudicating credential that signals an authority level competitors cannot replicate.

The Magazine Editorial design direction (Playfair Display + Inter, burgundy/cream palette, asymmetric editorial grids) communicates "serious creative professional" — not "local hobby instructor." The combined effect of design quality + credential display + categorised visual portfolio creates a high-trust landing experience that stands out in the Australian dance education market.

Core insight: the site is a trust machine. Every section — editorial hero, services strip, categorised gallery, credentials/judging panel, video showcase, contact form — is sequenced to advance one visitor through one decision: **"this person is worth contacting."**

## Project Classification

| Dimension | Value |
|---|---|
| Project Type | Web Application (Angular 18 SPA + SSR) |
| Domain | Creative personal services (dance education & performance) |
| Complexity | Low — single conversion goal, no auth, no e-commerce, no regulated data |
| Project Context | Greenfield — new build from scratch |
| Compliance | WCAG 2.1 AA accessibility, bilingual i18n (/hu/ + /en/ URL prefixes) |

## Success Criteria

### User Success

- A first-time visitor arrives via Google, understands what Zsófi does and who she serves within 30 seconds
- The visitor scrolls through the full page and reaches the contact form without confusion or dead ends
- A Hungarian-speaking visitor switches language instantly and experiences no incomplete translation
- A visitor who saw a photo or video in one gallery can easily identify the service category it relates to
- The user feels confident enough in Zsófi’s credibility to submit a contact enquiry

### Business Success

- Contact form submissions are the single tracked conversion; success = first enquiry received within weeks of launch
- The site appears in Google results for relevant searches (Hungarian dance instructor Australia, wedding choreography, etc.)
- Zero broken pages, missing translations, or layout failures reported on any device in the first 3 months post-launch
- Zsófi can point a prospective client to the site and it reflects her professional standard without qualification

### Technical Success

- Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 on mobile
- SSR renders page content correctly before JS hydration — critical for Google indexing
- Both /hu/ and /en/ routes serve complete, independently indexable content
- No layout or font shifts on slow connections (LCP < 2.5s on 4G)
- Contact form submission works and delivers email notification reliably

### Measurable Outcomes

- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Zero WCAG 2.1 AA violations at launch (automated + manual audit)
- 100% translation coverage — no visible raw translation keys or fallback strings
- All 5 gallery albums populated and navigable at launch
- Contact form delivers to Zsófi’s email within 60 seconds of submission

## User Journeys

### Journey 1 — The Hungarian Parent (Primary, Happy Path)

**Ágnes, 38, Hungarian expat, Brisbane.** Her daughter Lili (7) keeps asking to do dance classes, and Ágnes wants a Hungarian-speaking instructor — someone who understands the culture, speaks the language, and won’t get lost in translation about what she wants for her child.

She asks around in a Facebook group for Hungarians in Brisbane. Someone drops a link. She opens it on her phone, in Hungarian. The editorial hero loads: Zsófi’s name, confident posture, warm palette. She scrolls. The services strip names “Gyermek tánc” first — *this is for Lili.* The teaching gallery album is there; she taps it and sees real children in real classes. She keeps scrolling. The credentials section. The contact form. She fills it in — in Hungarian. Done. She hasn’t even looked at competitors.

**Requirements revealed:** Language switcher with Hungarian as default option, mobile-first layout, services named in Hungarian, gallery album filtering (teaching album prominent), contact form with Hungarian-translated field labels, fast mobile load time.

### Journey 2 — The Engaged Couple (Primary, Alternative Goal)

**James & Priya, late 20s, Sydney.** They want first dance choreography for their wedding but have no idea where to start. Priya Googles “wedding dance choreography private lessons Sydney” — Zsófi’s site ranks. Both English speakers, so they land on /en/.

The hero doesn’t say “wedding” prominently, but the services strip scrolls past quickly and “Wedding Choreography” catches the eye. They tap the weddings gallery album. Photo after photo of real couples, first dances, confetti shots. Enough proof. They scroll to the contact form and submit an enquiry.

**Requirements revealed:** English /en/ route fully complete and independently indexed, wedding gallery album with compelling imagery, contact form accessible from any scroll position, SEO meta tags targeting wedding choreography keywords.

### Journey 3 — The Competition Athlete (Secondary)

**Bence, 22, Hungarian-Australian, competitive Latin dancer.** He’s looking for a judge-level coach to take him to regionals. He knows most local coaches don’t hold adjudicating credentials. He finds Zsófi via a dance forum post, opens the /hu/ site. He scrolls fast — past hero, past services, past gallery — and lands on the JudgingCredentials section. He reads every line. *She judges at this level.* He hits the contact form immediately.

**Requirements revealed:** JudgingCredentials component must be substantive and specific (competitions judged, federations, levels); anchor link from sticky nav to the credentials section; contact form not buried below the fold after credentials.

### Journey 4 — Zsófi (Site Owner / Admin)

**Zsófi** sends the site URL to a prospective client over WhatsApp as her digital business card. She needs the link to load fast, look professional, and deliver a strong first impression. She also needs contact form submissions to arrive in her email reliably — she doesn’t log in to check a dashboard.

**Requirements revealed:** Contact form email notification (no admin dashboard needed for MVP); fast cold-load on mobile; shareable URL with no redirect or login gate; Open Graph meta tags for clean link preview (image, title, description) when shared on WhatsApp/iMessage.

### Journey Requirements Summary

| Journey | Key Capabilities Required |
|---|---|
| Hungarian Parent | HU language detection/switching, mobile performance, teaching gallery album, HU form labels |
| Engaged Couple | EN route complete + indexed, wedding album, SEO meta, contact form always accessible |
| Competition Athlete | JudgingCredentials detail, anchor navigation, contact form post-credentials |
| Zsófi (owner) | Email notification on submission, OG social meta, fast mobile load |

## Web App Specific Requirements

### Project-Type Overview

Single-page Angular 18 application with server-side rendering (`@angular/ssr`). Navigation is anchor-scroll within one page, not multi-route. Bilingual output produces two independently deployable language variants (`/hu/`, `/en/`) via Angular’s build-time i18n (`@angular/localize`).

### Browser Matrix

| Browser | Support Level |
|---|---|
| Chrome / Edge (last 2 versions) | Full |
| Firefox (last 2 versions) | Full |
| Safari iOS 15+ | Full |
| Samsung Internet (last 2 versions) | Full |
| IE 11 / legacy browsers | Not supported |

### Responsive Design

Mobile-first Tailwind CSS v3. Six breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px). All layouts designed at 375px (mobile base) first. No separate mobile site — single codebase adapts fluidly.

### Performance Targets

- LCP < 2.5s on 4G mobile
- CLS < 0.1
- FID < 100ms
- Hero image: next-gen format (WebP), lazy-loaded below fold
- Gallery images: lazy-loaded with `loading="lazy"` attribute
- Video section: click-to-load (`youtube-nocookie.com`), no autoplay
- Google Fonts: `font-display: swap`, preconnect hints in `<head>`
- SSR: full page HTML served before JS hydration

### SEO Strategy

- SSR mandatory — Googlebot indexes pre-rendered HTML
- Separate `<title>` and `<meta name="description">` per language route
- Open Graph meta: `og:title`, `og:description`, `og:image`, `og:locale` per language
- `hreflang` alternate links: `<link rel="alternate" hreflang="hu">` / `hreflang="en"` / `hreflang="x-default"`
- Structured data: `Person` schema for Zsófi, `LocalBusiness` schema optional
- Canonical URLs per language route

### Accessibility Level

WCAG 2.1 AA target. Key requirements:
- All images have descriptive `alt` text in the active language
- Keyboard navigation for gallery album switcher and lightbox
- Focus trap in mobile navigation overlay
- Colour contrast: dark (#2D1F21) on cream (#F9EBDB) = 12.1:1 ✓, cream on burgundy (#754247) = 4.8:1 ✓
- Coral (#DC6567) decorative only — never used for body text
- `prefers-reduced-motion` respected for scroll animations

### Implementation Considerations

- `isPlatformBrowser()` guard required for all `window`/`document` access (SSR safety)
- `afterNextRender()` for Swiper.js and GLightbox initialisation
- GLightbox: `destroy()` in `ngOnDestroy()` to prevent memory leaks
- Contact form: HTML5 native validation + email delivery via server-side handler or third-party service (FormSubmit / Netlify Forms / EmailJS)
- No backend required for MVP — static hosting with SSR pre-rendering acceptable

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP — the site must be complete enough that a visitor has the full trust-building journey in one scroll. A partial launch (e.g. missing gallery albums or incomplete language) would undermine the core value proposition.

**Resource Requirements:** Single developer (solo build), no backend team needed. Contact form via third-party service (FormSubmit recommended — no server required, free tier sufficient).

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:** All 4 journeys (Hungarian Parent, Engaged Couple, Competition Athlete, Zsófi as owner) must be fully functional at launch.

**Must-Have Capabilities:**

| # | Capability | Component |
|---|---|---|
| 1 | Bilingual page (/hu/ + /en/) fully translated | LanguageSwitcher + @angular/localize |
| 2 | Editorial hero section with Zsófi’s photo and headline | EditorialHero |
| 3 | Services strip — all 7 services named | ServiceStrip |
| 4 | About / editorial row section | EditorialRow |
| 5 | Categorised gallery — all 5 albums populated | GalleryCategorized + GLightbox |
| 6 | Video section (click-to-load YouTube embed) | VideoSection |
| 7 | Judging credentials panel | JudgingCredentials |
| 8 | Contact form + email delivery | ContactForm |
| 9 | Mobile navigation (hamburger overlay) | MobileNavigation |
| 10 | SEO meta + hreflang per language | Angular SSR + meta service |
| 11 | OG social meta tags | Angular meta service |
| 12 | Privacy notice adjacent to contact form | Inline content |

### Post-MVP Features

**Phase 2 (Growth — Post-launch, ~3 months):**
- Analytics integration (Plausible or Google Analytics 4)
- Blog / news section (upcoming events, competition results)
- Instagram feed embed or gallery sync
- Online enquiry scheduling (Calendly integration)

**Phase 3 (Expansion — 6–12 months):**
- Student portal with class schedules
- Online booking and payment processing
- Competition results archive with media history
- Additional language support

### Risk Mitigation Strategy

**Technical Risks:** SSR + i18n interaction is the highest-risk combination — Angular 18 `@angular/localize` with `@angular/ssr` requires careful build configuration. Mitigation: validate the build pipeline with a hello-world SSR + i18n prototype before building components.

**Market Risks:** Minimal — the site is for a person who already has clients. Risk is “site doesn’t convert strangers” not “no market exists.” Mitigation: ensure the contact form is prominent and working on day 1.

**Resource Risks:** Solo developer means scope discipline matters. The 9 components are well-specified in the UX design spec — no scope creep risk if that document is followed. If timeline is tight, VideoSection is the lowest-priority MVP component (can be added post-launch).

## Functional Requirements

### Localisation & Language

- FR1: Visitor can switch the interface language between Hungarian and English at any time
- FR2: The site detects or defaults to a language route (/hu/ or /en/) without manual selection
- FR3: All visible text, labels, headings, and form fields are fully translated in both languages — no raw translation keys visible to the user
- FR4: Each language route is independently accessible and indexable by search engines

### Navigation & Page Structure

- FR5: Visitor can navigate to any major section of the page using the site header navigation
- FR6: Visitor can open and close a full-screen mobile navigation overlay on small screens
- FR7: The sticky header remains accessible during scroll on all device sizes
- FR8: Navigation items link to page sections using smooth anchor scroll

### Hero & Identity

- FR9: Visitor sees Zsófi’s name, a professional photo, and a concise professional headline on arrival
- FR10: Visitor can immediately understand the nature of Zsófi’s professional offering from the hero section

### Services

- FR11: Visitor can view a summary of all 7 services Zsófi offers
- FR12: Services are visually grouped and labelled in the active language

### About / Editorial Content

- FR13: Visitor can read a narrative about Zsófi’s background, teaching philosophy, and professional experience
- FR14: The about content is displayed in an editorial layout that reinforces the professional brand

### Gallery

- FR15: Visitor can browse photos organised by category (Competitions, Weddings, Teaching, Performances, Acro-yoga)
- FR16: Visitor can switch between gallery categories without navigating away from the page
- FR17: Visitor can open any gallery photo in a full-screen lightbox
- FR18: Visitor can navigate between photos within the lightbox (next / previous)
- FR19: Gallery images are labelled or contextualised in the active language

### Video

- FR20: Visitor can view an embedded video without leaving the page
- FR21: Video content does not autoplay — the visitor must initiate playback
- FR22: Video playback does not use tracking cookies before the visitor clicks to load

### Credentials & Adjudicating

- FR23: Visitor can read Zsófi’s professional judging credentials and the competitions/federations she adjudicates
- FR24: The credentials section is reachable directly from the navigation

### Contact

- FR25: Visitor can submit a contact enquiry with their name, email address, and a message
- FR26: The contact form validates input before submission (required fields, email format)
- FR27: Zsófi receives an email notification for every successful form submission
- FR28: The visitor receives confirmation feedback after a successful form submission
- FR29: A privacy notice is displayed adjacent to the contact form

### SEO & Discoverability

- FR30: Each language route has a unique page title and meta description
- FR31: The site includes hreflang link tags for the alternate language route
- FR32: The site includes Open Graph meta tags (title, description, image, locale) for link-sharing on social and messaging apps
- FR33: All page content is rendered in HTML before JavaScript executes (SSR)

### Accessibility

- FR34: All images have descriptive alternative text in the active language
- FR35: All interactive elements (navigation, gallery controls, contact form) are operable by keyboard
- FR36: Focus is trapped within the mobile navigation overlay when it is open
- FR37: The site respects the visitor’s reduced-motion preference for animations

## Non-Functional Requirements

### Performance

- Page LCP (Largest Contentful Paint) ≤ 2.5s on a 4G mobile connection
- CLS (Cumulative Layout Shift) < 0.1 — no visible layout jumps during load
- FID (First Input Delay) < 100ms
- Lighthouse Performance score ≥ 90 on mobile
- Lighthouse SEO score ≥ 95
- Time to First Byte (TTFB) ≤ 600ms — SSR response must be fast
- Total page weight ≤ 2MB on first load (excluding deferred gallery images)

### Security

- Contact form submissions are transmitted over HTTPS only
- No personal data (name, email, message) is stored in the browser beyond the active session
- A plaintext privacy notice adjacent to the contact form informs users how their data is used
- The YouTube embed uses `youtube-nocookie.com` to prevent third-party tracking cookies before user interaction
- No third-party tracking scripts loaded without user consent at MVP (analytics deferred to Phase 2)

### Accessibility

- WCAG 2.1 Level AA compliance across all components
- Lighthouse Accessibility score ≥ 95
- All colour combinations meet minimum contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Site is fully navigable by keyboard alone
- Screen reader compatibility: tested with VoiceOver (iOS) and NVDA (Windows)

### Integration

- Contact form email delivery: successful submission triggers email to Zsófi’s inbox within 60 seconds; failure triggers visible error state to the visitor
- YouTube embed: uses privacy-enhanced mode (`youtube-nocookie.com`), loaded only on user click, not on page load
- Google Fonts: loaded via `<link rel="preconnect">` and `font-display: swap` — page renders with fallback fonts if Google Fonts fails

### Reliability

- Site availability target: 99.5% uptime (hosted on a reliable static/SSR-capable platform — Vercel, Netlify, or equivalent)
- Contact form email delivery: if the delivery service is unavailable, the visitor must see a visible error — silent failures are not acceptable
- No single point of failure that takes the entire site offline (CDN-backed static hosting)

## Product Scope

### MVP — Minimum Viable Product

All 9 components live and fully functional: EditorialHero, ServiceStrip (7 services), EditorialRow (about section), GalleryCategorized (5 albums), VideoSection, JudgingCredentials, ContactForm, MobileNavigation, LanguageSwitcher. Both /hu/ and /en/ languages 100% complete. Contact form functional and delivering emails. Site deployed, indexed by Google, passes Lighthouse thresholds.

### Growth Features (Post-MVP)

- Google Analytics / Plausible integration for conversion tracking
- Blog or news section (upcoming events, competition results)
- Online booking or enquiry scheduling integration
- Social media feed embed (Instagram gallery sync)

### Vision (Future)

- Student portal with class schedules and progress tracking
- Online class booking and payment processing
- Competition results archive with photo/video history
- Multilingual expansion beyond HU/EN (e.g. Romanian)
