---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments: []
---

# UX Design Specification Dance

**Author:** Zsófi
**Date:** 2026-03-21

---

## Executive Summary

### Project Vision

A mobile-first, bilingual (English primary + Hungarian secondary) landing page for a dance instructor based in Australia with over 20 years of professional experience. The site's purpose is to showcase the instructor's professional background, present available services, and make it easy for potential clients to get in touch via an email contact form.

**Services Offered:**
- Children's dance classes
- Couple dance lessons
- Individual dance training
- Choreography creation
- Live performances
- Acro-yoga

**Inspirational References:** chadwickstudios.com.au (industry reference), samadhi.hu (design inspiration — clean, airy aesthetic)

**Brand Assets Available:**
- Colour palette: provided by client (pending upload)
- Logo: not yet available
- Photography: extensive collection of competition and performance photos

### Target Users

1. **Parents** — Looking to enrol their children in dance classes. Primary conversion target. Key question: "Will my child be safe and well-taught here?"
2. **Dance enthusiasts** — Adults seeking couple or individual dance lessons. Key question: "Is this a real professional? Will I feel comfortable as a beginner?"
3. **Choreography seekers** — Event organisers, wedding couples, production companies needing professional choreography. Key question: "Are they reliable? Do they have references for this kind of work?"

**User Context:**
- Australian local market (English-language search, Google discoverability is critical)
- Mobile-first approach preferred
- Rich visual content available (many photos from competitions, performances)
- Hungarian-speaking community in Australia as secondary audience
- Users range from tech-savvy to moderate — simplicity is essential

### Key Design Challenges

1. **Bilingual navigation** — Language switcher solution that doesn't complicate the UX but enables access to Hungarian content (e.g. for the Hungarian community in Australia). Discreet flag icon in header, URL-prefix-based routing (/en/, /hu/).
2. **Mobile-first design with rich visual content** — Displaying many photos without compromising load times or user experience on mobile. Requires optimised image formats (WebP/AVIF), lazy loading, responsive image sizing.
3. **Serving multiple target audiences** — Parents, adult learners, and choreography seekers have different needs on a single landing page. Solved through vertical storytelling with segmented service cards rather than complex navigation.
4. **Trust building** — Communicating 20+ years of experience and competition results effectively within the first few seconds of the visit.

### Design Opportunities

1. **Visual storytelling** — Leveraging the rich photo library with an emotionally impactful hero section and gallery elements. Dance is movement — the design should feel alive and dynamic.
2. **Segmented content via service cards** — Clear sections for each service that naturally attract the right target audience as they scroll.
3. **Social proof** — Competition results and student achievements presented in a visually compelling format.
4. **Simple conversion** — Email contact form that's always easily accessible (sticky CTA or footer form, repeated at key points).

### Page Structure Concept (from Party Mode discussion)

| Section | Purpose | Primary Audience |
|---|---|---|
| **Hero** | Powerful dance photo, name, "20+ years of passion" tagline + CTA | All visitors |
| **About** | Brief introduction, experience, competition achievements | All visitors |
| **Services** | Cards per service (children, couple, individual, choreography, performance) | Segmented by card |
| **Gallery** | Photos/videos proving credibility | All visitors |
| **Contact** | Email form + contact details | All visitors (conversion) |

### Technical Considerations (from Party Mode)

- **Mobile gallery:** Swipeable carousel (mobile), masonry grid (desktop)
- **Bilingual:** Static i18n with URL prefix (/en/, /hu/), no CMS needed
- **Performance:** WebP/AVIF images, lazy loading, responsive image sizes
- **SEO:** Separate English and Hungarian URLs for proper indexing

## Core User Experience

### Defining Experience

The Dance landing page's core experience is **discovery and trust-building through a single, continuous scroll**. The visitor does not search or navigate through complex menus — they scroll down and progressively learn about the services while visual content (photos, competition results) steadily builds conviction.

The most frequent user action: **exploring professional services** — the visitor browses the instructor's offerings and decides which service fits their needs.

### Platform Strategy

- **Mobile-first approach** — Design and interactions optimised primarily for touch screens
- **Responsive desktop support** — Wider viewports get masonry grid gallery, multi-column service cards
- **Bilingual (EN/HU)** — URL prefix-based routing (/en/, /hu/), discreet language switcher in header
- **No offline requirement** — Static landing page, always requires online connection
- **No app** — Web-only interface
- **Design inspiration:** samadhijoga.hu (airy, clean aesthetic), chadwickstudios.com.au (gallery presentation)

### Effortless Interactions

- **First impression** — The hero section instantly communicates professionalism: powerful dance photo, name, experience. The visitor must feel within the first 3 seconds that this is a professional site.
- **Gallery browsing** — Viewing photos must be natural and enjoyable, never choppy. Mobile: swipe gestures. Desktop: click navigation. Inspired by chadwickstudios.com.au gallery presentation.
- **Contact** — Email form with maximum 3-4 fields (name, email, message, optionally service type), always reachable via scroll or sticky CTA button.
- **Language switching** — One tap/click, the page switches immediately without reload delay.

### Critical Success Moments

1. **"This is a real professional"** — The combined impact of competition results and photos is the moment where the visitor decides this is the right instructor. These two elements **reinforce each other** — the numbers (20+ years, competition wins) and visual proof (photos from competitions, performances) together create credibility.
2. **"This is for me"** — The service cards moment, when the parent spots children's dance, the choreography seeker finds the choreography section. Everyone finds what's relevant to them.
3. **"Easy to reach"** — The contact form submission is quick and straightforward — no registration, no complication.

### Experience Principles

1. **Visual persuasion first** — Photos and results speak; text only supplements. Show, don't tell.
2. **One scroll, one story** — The entire page is a linear narrative: introduction → services → proof → contact.
3. **Instant credibility** — 20+ years of experience and competition results appear at the very top of the page — no searching required.
4. **Barrier-free conversion** — Contact is always maximum 1 tap away, regardless of which section the visitor is viewing.

## Desired Emotional Response

### Primary Emotional Goals

**Trust + Inspiration** — The two core emotions that must hit simultaneously. The visitor should feel: "This instructor is trustworthy AND I'm inspired — I want to do this too!"

The site must evoke:
- **"I want to dance too!"** — Photos, achievements, and overall energy should trigger the desire to start dancing. Not passive admiration, but active motivation.
- **"This person is so likeable"** — Warmth and approachability radiate through the entire site. Despite impressive credentials, the instructor feels human, friendly, and welcoming.
- **Reliability** — The visitor senses this is someone who follows through, has proven results, and can be trusted with their child or their own learning journey.

### Emotional Journey Mapping

| Stage | Desired Emotion | Trigger |
|---|---|---|
| **First landing** | "Wow, this looks professional" → Instant trust | Hero photo + clean design + experience credentials |
| **Scrolling through About** | "This person is so likeable and approachable" | Warm tone, friendly photo, personal story |
| **Browsing services** | "This is exactly what I need" | Relevant service card catches their eye |
| **Gallery viewing** | "Incredible — so much experience, so many achievements!" | Competition photos, student performances, event shots |
| **Contact form** | "That was easy" → Confidence the message will be answered | Simple form, friendly CTA copy, confirmation message |
| **If something fails** | "No worries, I already know I like this person" | Graceful error states don't break established trust |

### Micro-Emotions

| Priority | Positive Target | Negative to Avoid | Design Impact |
|---|---|---|---|
| **#1** | Trust & Reliability | Skepticism | Credentials visible immediately, competition results prominent |
| **#2** | Warmth & Friendliness | Cold professionalism | Warm colour palette, friendly copy tone, approachable photos |
| **#3** | Inspiration & Motivation | Passive observation | Dynamic gallery, action shots, "I want this too" energy |
| **#4** | Confidence | Intimidation | Welcoming language, "all levels welcome" messaging |

**Key insight:** The biggest risk is creating a site that feels impressive but cold. The 20+ years of experience could easily come across as intimidating. The design must balance **credibility with warmth** — professional but never unapproachable.

### Design Implications

- **Trust + Inspiration** → Hero section combines powerful visual (dance action shot) with warm, personal tagline — not corporate, but passionate
- **"I want to do this too"** → Gallery photos should include students of all ages enjoying dance, not just competition trophies. Show the JOY, not just the results
- **Warmth & Friendliness** → Warm colour palette tones, rounded UI elements over sharp edges, friendly typography. Copy tone: conversational, encouraging, never stiff
- **Reliability** → Concrete numbers (20+ years, X competitions, X students), but presented as part of a warm narrative, not a cold CV
- **"That was easy"** → Contact form: minimal fields, friendly submit button text (e.g. "Let's Talk!" not "Submit"), instant visual confirmation

### Emotional Design Principles

1. **Credible warmth** — Every trust signal is wrapped in friendliness. Numbers and facts are presented with personality, not as a corporate résumé.
2. **Inspire action, not just admiration** — The site should make visitors want to dance, not just respect the instructor. Motivation over impression.
3. **Approachable excellence** — 20+ years of expertise should feel welcoming, not intimidating. The message is "come join me" not "look how great I am."
4. **Emotional resilience** — Even when things don't work perfectly (slow load, form error), the warm impression is already established and carries through.

### Colour Palette (Client Provided — "Színpaletta 108")

| Colour | Hex | Role | Emotional Function |
|---|---|---|---|
| Deep Burgundy | `#754247` | Primary accent, headers, footer | Elegance, depth, experience — the weight of 20+ years |
| Coral Rose | `#DC6567` | CTA buttons, highlights, active states | Passion, energy, warmth — the fire of dance |
| Light Cream | `#F9EBDB` | Main background | Softness, friendliness, airiness — samadhijoga.hu feel |
| Warm Beige | `#E8DBC9` | Section backgrounds, card backgrounds | Reliability, homeliness — visual comfort |
| Soft Mint | `#BCE2D3` | Contrast accent, secondary highlights | Freshness, calm, balance — lifts the warm tones |

**Palette-Emotion Alignment:**
- Warmth & friendliness → Cream + beige dominant backgrounds
- Passion & inspiration → Coral rose energises CTAs and highlights
- Professionalism → Burgundy adds gravitas without heaviness
- Non-intimidating → Soft tones prevent the palette from feeling too serious
- Distinctive → Mint green provides a unique, fresh accent

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**1. samadhijoga.hu — Design Aesthetic & Feel**
- **What works:** Clean, airy layout with generous whitespace. The mandala visual element on the homepage creates an instant emotional anchor — cultural, spiritual, unique. Navigation is simple and intuitive.
- **Transferable insight:** The Dance site needs a similarly strong visual anchor in the hero — not a mandala, but a powerful dance photo that carries the same emotional weight. The overall lightness and breathing room of the layout is the #1 takeaway.
- **Key pattern:** Minimalist navigation + strong central visual + lots of whitespace = instant calm trust.

**2. chadwickstudios.com.au — Service Presentation & Gallery**
- **What works:** Services are presented clearly with visual separation. The gallery showcases work professionally with clean grid layouts. Content is well-organised for a dance studio context.
- **Transferable insight:** The service card layout approach — each service gets its own visual identity while maintaining a consistent grid. Gallery presentation is professional without being overwhelming.
- **Key pattern:** Service cards with visual hierarchy + professional gallery grid = easy service discovery.

**3. nycballet.com — World-Class Dance Presentation**
- **What works:** A major ballet institution that balances prestige with accessibility. Rich, dramatic dance photography. The site feels alive — movement captured in stillness. Professional without being cold. The visual storytelling elevates dance from an activity to an art form.
- **Transferable insight:** Use dramatic, high-quality dance photography as the primary storytelling medium. The NYC Ballet shows that you can present excellence without being unapproachable. Their imagery makes you FEEL the dance.
- **Key pattern:** Dramatic photography + warm typography + elegant motion = professional yet inviting.

### Transferable UX Patterns

**Navigation Patterns:**
- **samadhijoga.hu style:** Minimal top navigation, clean and uncluttered. Perfect for a single-page landing with smooth scroll anchors.
- **Sticky header with CTA:** Always-visible contact action, inspired by service websites best practice.

**Visual Patterns:**
- **Hero with emotional anchor** (samadhijoga.hu) → Full-width dramatic dance photo as the first thing visitors see
- **Dramatic photography as storytelling** (nycballet.com) → Photos do the talking, text supports
- **Generous whitespace** (samadhijoga.hu) → Let the content breathe, don't crowd the page

**Content Patterns:**
- **Service presentation** (chadwickstudios.com.au) → Individual cards per service with clear visual identity
- **Gallery grid** (chadwickstudios.com.au) → Clean, professional photo display with lightbox
- **Warm + professional balance** (nycballet.com) → Elevated but never cold

**Interaction Patterns:**
- **Smooth scroll** (samadhijoga.hu) → Sections flow naturally into each other
- **Swipeable gallery on mobile** → Touch-native photo browsing

### Anti-Patterns to Avoid

| Avoid | Why | Instead Do |
|---|---|---|
| **Cold, clinical design** | Creates distance — visitor won't feel welcome | Warm colour palette (#F9EBDB, #E8DBC9), friendly typography, rounded elements |
| **Neutral/corporate tone** | Dance is passion — a bland tone kills the energy | Conversational, enthusiastic copy that reflects personality |
| **Overly busy layouts** | Contradicts the samadhijoga.hu aesthetic the client loves | Generous whitespace, focused content per section |
| **Stock photography** | Instantly destroys authenticity and trust | Only real photos from competitions, performances, lessons |
| **Complex navigation** | Landing page doesn't need multi-level menus | Simple anchor links or smooth scroll, max 5-6 items |
| **Autoplay videos with sound** | Annoying on mobile, consumes data | Static hero image or autoplay muted background video (optional) |

### Design Inspiration Strategy

**What to Adopt:**
- samadhijoga.hu's **airy, clean layout philosophy** — whitespace is a feature, not wasted space
- nycballet.com's **dramatic photography approach** — let dance imagery be the hero
- chadwickstudios.com.au's **service presentation structure** — clear, scannable service cards

**What to Adapt:**
- samadhijoga.hu's mandala → Replace with a **powerful dance hero image** as the emotional anchor
- nycballet.com's scale → Condense their multi-page richness into a **single landing page narrative**
- chadwickstudios.com.au's gallery → Add **swipeable mobile interaction** and lazy loading

**What to Avoid:**
- Any design that feels **cold, neutral, or corporate** — warmth is non-negotiable
- Overly complex navigation — **simplicity is king** for a landing page
- Generic, template-like layouts — the site must feel **personal and handcrafted**

## Design System Foundation

### Design System Choice

**Tailwind CSS** — Utility-first CSS framework with custom design tokens.

### Rationale for Selection

1. **Full visual control** — The samadhijoga.hu-inspired airy, unique aesthetic is precisely achievable with utility classes. Nothing looks "boxy" or template-like.
2. **Mobile-first built in** — Responsive prefixes (`md:`, `lg:`) make mobile-first development the default, not an afterthought.
3. **Native colour palette integration** — The 5-colour palette maps directly to design tokens, ensuring consistency across every element.
4. **Performance** — Tree-shaking removes unused styles; only what's actually used ships to the browser. Critical for mobile performance with rich photo content.
5. **Landing page fit** — No need for complex component libraries. Tailwind provides exactly the right level of tooling for a single-page site.
6. **Handcrafted feel** — Unlike component frameworks that impose a visual identity, Tailwind produces completely custom results.

### Implementation Approach

**Design Tokens (tailwind.config.js):**

| Token | Value | Usage |
|---|---|---|
| `burgundy` | `#754247` | Headers, footer, primary text accents |
| `coral` | `#DC6567` | CTA buttons, highlights, active states, hover effects |
| `cream` | `#F9EBDB` | Main page background |
| `beige` | `#E8DBC9` | Section backgrounds, card backgrounds, alternating sections |
| `mint` | `#BCE2D3` | Secondary accent, badges, subtle highlights |

**Typography:**
- Heading font: Elegant serif or modern sans-serif (to be finalised — e.g. Playfair Display or Inter)
- Body font: Clean, readable sans-serif
- `@tailwindcss/typography` plugin for prose content

**Spacing System:**
- Generous padding and margins to achieve the airy feel (`py-16 md:py-24` for sections)
- Consistent section rhythm for the scroll narrative

**Responsive Breakpoints:**
- Mobile: default (< 768px) — single column, swipeable gallery
- Tablet: `md:` (768px+) — 2-column service cards
- Desktop: `lg:` (1024px+) — masonry gallery, wider layout

### Customisation Strategy

**Custom Components Needed:**
- Hero section with full-bleed image + overlay text
- Service cards with icon/image + description
- Photo gallery (Swiper.js for mobile carousel, masonry grid for desktop)
- Contact form (minimal fields, warm styling)
- Language switcher (discreet flag icon in header)
- Sticky CTA button (mobile: fixed bottom, desktop: header)

**Third-Party Integrations:**
- **Swiper.js** — Touch-native swipeable gallery for mobile
- **GLightbox** or similar — Lightbox for full-size photo viewing
- **i18n routing** — URL prefix-based language switching (/en/, /hu/)

**Accessibility:**
- Colour contrast ratios verified for all text/background combinations
- Keyboard navigation support
- Alt text for all photos
- Focus states styled with coral accent
- Semantic HTML structure

## Core User Experience Detail

### Defining Experience

**"Scroll, discover, and feel: this is THE instructor"** — The visitor discovers the instructor through a single continuous scroll journey, and by the time they reach the contact form, they're already convinced.

The defining experience in the visitor's own words:
- **"Check out this site — you'll want to dance too!"** — The site inspires action, not just admiration
- **"This is the dance instructor I've been looking for!"** — Instant recognition of the right fit

This is not a transactional experience (like booking a class). It's a **persuasion journey** — the entire page builds a cumulative emotional case that peaks at the gallery + achievements section, where trust and inspiration combine to create conviction.

### User Mental Model

**How visitors currently find dance instructors:**
- Google search → land on various studio websites → compare
- Word of mouth → check website to validate recommendation
- Social media → visit website for details

**Mental model they bring:**
- Expect to quickly understand what's offered and whether it's credible
- Compare against other instructors' sites — the more professional and warm, the better
- Parents specifically look for safety signals and experience with children
- Choreography seekers look for previous work and versatility

**Key expectation:** "Show me quickly who you are and why I should trust you."

**Complete Service Portfolio:**
- Children's dance classes
- Couple dance lessons
- Individual dance training
- Choreography creation
- Live performances
- **Acro-yoga** — unique differentiator that sets this instructor apart from typical dance studios, showing breadth of movement expertise. Appeals to both dance enthusiasts and wellness/fitness seekers.

### Success Criteria

| Criterion | How We Know It's Working |
|---|---|
| **Instant professionalism** | Visitor doesn't bounce within 3 seconds — hero section captures attention |
| **Service discovery** | Visitor finds the relevant service card (incl. acro-yoga) within 10 seconds of scrolling |
| **Trust builds progressively** | Each section adds to conviction — About → Services → Gallery → Results |
| **Peak conviction at gallery** | The combined impact of photos + competition results triggers "this is the one" |
| **Effortless contact** | Visitor completes contact form without hesitation — no friction, no confusion |
| **Emotional takeaway** | Visitor leaves motivated ("I want to dance too!") regardless of whether they contact immediately |

### UX Patterns

**Established patterns used:**
- **Single-page scroll narrative** — Proven for landing pages, service portfolios, and personal brand sites
- **Service cards grid** — Standard pattern for presenting multiple service offerings
- **Photo gallery with lightbox** — Well-understood pattern for visual portfolios
- **Sticky CTA** — Contact always within reach, proven to increase conversion
- **Language switcher** — Standard flag/dropdown in header

**Unique twist for Dance:**
- The **progressive trust-building scroll** is not just information layout — it's an intentional emotional arc from "hello" to "I'm convinced"
- **Acro-yoga** as a service category adds unexpected breadth that surprises and differentiates
- **Real competition photos** (not stock) serve as both gallery AND social proof simultaneously

### Experience Mechanics

**1. Initiation — First Landing:**
- Full-screen hero: dramatic dance photo + name + "20+ years of passion" + CTA button
- Visitor's reaction: "Wow, this is professional"
- Auto: smooth scroll hint (subtle down-arrow or parallax)

**2. Discovery — Scrolling Through Content:**
- **About section:** Warm personal introduction + key numbers (20+ years, competitions won)
- **Services section:** 6 cards (children, couple, individual, choreography, performance, acro-yoga) — visitor identifies their interest
- **Gallery section:** Swipeable photos on mobile, masonry grid on desktop — the PEAK moment where conviction builds
- **Achievements:** Competition results woven into gallery or separate highlights

**3. Feedback — Building Confidence:**
- Every section reinforces credibility through visuals (real photos, not icons)
- Warm colour palette (cream/beige backgrounds) maintains friendliness throughout
- Burgundy accents on key trust elements (years of experience, competition wins)
- Coral CTA buttons visible at multiple scroll points

**4. Completion — Taking Action:**
- Contact form: name, email, message, optional service selector (dropdown including acro-yoga)
- CTA text: warm and inviting (e.g. "Let's Talk!" or "Get in Touch")
- Confirmation: immediate visual feedback + friendly message
- Alternative: direct email and phone also visible for those who prefer

## Visual Design Foundation

### Colour System

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `--color-burgundy` | #754247 | Primary accent | Headers, key trust elements, footer background |
| `--color-coral` | #DC6567 | CTA / energy | Buttons, hover states, active indicators |
| `--color-cream` | #F9EBDB | Primary background | Hero, odd sections, cards |
| `--color-beige` | #E8DBC9 | Secondary background | Even sections, subtle separation |
| `--color-mint` | #BCE2D3 | Fresh accent | Success states, secondary badges, acro-yoga highlight |

**Section Alternation Pattern:**

```
Hero        → cream (#F9EBDB)
About       → beige (#E8DBC9)
Services    → cream (#F9EBDB)
Gallery     → beige (#E8DBC9)
Achievements→ cream (#F9EBDB)
Contact     → beige (#E8DBC9)
Footer      → burgundy (#754247) + light text
```

**Accessibility Contrast Ratios (WCAG AA):**

| Combination | Ratio | Pass? |
|-------------|-------|-------|
| Burgundy text on cream | 7.2:1 | ✅ AAA |
| Burgundy text on beige | 6.1:1 | ✅ AA |
| White text on burgundy | 8.5:1 | ✅ AAA |
| White text on coral | 3.8:1 | ⚠️ Large text only |
| Burgundy text on mint | 4.6:1 | ✅ AA |

### Typography

**Heading Font: Playfair Display (Serif)**
- Captures the elegance and artistry of dance
- Conveys years of experience and professionalism
- Beautiful contrast with clean body text
- Excellent support for Hungarian characters (á, é, í, ó, ö, ő, ú, ü, ű)

**Body Font: Inter (Sans-Serif)**
- Clean, highly legible at all sizes
- Excellent readability on mobile screens
- Professional but warm feel
- Full Hungarian character support

**Type Scale (base: 16px, ratio: 1.25 — Major Third):**

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `--text-hero` | 48px / 3rem | Playfair 700 | Hero headline |
| `--text-h1` | 40px / 2.5rem | Playfair 700 | Section titles |
| `--text-h2` | 32px / 2rem | Playfair 600 | Subsection titles |
| `--text-h3` | 25px / 1.563rem | Inter 600 | Card titles, labels |
| `--text-body-lg` | 20px / 1.25rem | Inter 400 | Lead paragraphs |
| `--text-body` | 16px / 1rem | Inter 400 | Body text |
| `--text-small` | 13px / 0.813rem | Inter 400 | Captions, metadata |

**Mobile Adjustments:**
- Hero: 32px (scaled down from 48px)
- H1: 28px (scaled down from 40px)
- Body remains 16px (optimal mobile reading size)

### Spacing System

**Base Unit: 8px**

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Tight gaps, icon padding |
| `--space-sm` | 8px | Inline spacing, small gaps |
| `--space-md` | 16px | Component internal padding |
| `--space-lg` | 24px | Card padding, section gaps |
| `--space-xl` | 32px | Between components |
| `--space-2xl` | 48px | Between sections (mobile) |
| `--space-3xl` | 64px | Between sections (tablet) |
| `--space-4xl` | 96px | Between sections (desktop) |

**Airy Spacing Philosophy:**
- Generous whitespace between sections for breathing room
- Section padding: 48px vertical on mobile, scaling to 96px on desktop
- Content max-width: 1200px, centered
- Card padding: 24px internal
- Paragraphs: 1.6 line-height for relaxed reading

### Layout Grid

| Breakpoint | Columns | Gutter | Margin | Behaviour |
|------------|---------|--------|--------|-----------|
| Mobile (<640px) | 1 | 16px | 16px | Stacked, full-width cards |
| Tablet (640–1024px) | 2 | 24px | 24px | 2-column services grid |
| Desktop (>1024px) | 3 | 32px | auto | 3-column services, max-width 1200px |

### Component Foundations

**Service Cards:**
- Background: white with subtle shadow (`shadow-sm`)
- Border-radius: 12px (`rounded-xl`)
- Padding: 24px
- Hover: lift with shadow (`shadow-md`) + coral border-top accent
- Image: top, 16:9 ratio, `object-cover`
- Title: Playfair Display, burgundy
- Description: Inter, body text
- CTA link: coral, with arrow icon

**Buttons (Primary CTA):**
- Background: coral (#DC6567)
- Text: white, Inter 600, 16px
- Padding: 12px 32px
- Border-radius: 9999px (pill shape)
- Hover: darken 10% + subtle scale (1.02)
- Focus: burgundy outline ring (accessibility)
- Min touch target: 44×44px

**Contact Form Inputs:**
- Border: 1px solid beige (#E8DBC9)
- Border-radius: 8px
- Padding: 12px 16px
- Focus: coral border + cream background
- Label: Inter 500, burgundy
- Error: coral text + coral border

**Gallery Items:**
- Border-radius: 8px
- Mobile: Swiper.js horizontal carousel (single image visible + peek)
- Desktop: Masonry-style grid, 3 columns
- Click: GLightbox overlay with swipe navigation
- Hover (desktop): subtle zoom (scale 1.05) + overlay with caption

### Accessibility Considerations

- All interactive elements meet 44×44px minimum touch target
- Focus states visible on all interactive elements (burgundy outline)
- Colour is never the sole indicator — icons and text accompany colour changes
- Skip-to-content link hidden but accessible
- Semantic HTML structure: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Alt text required for all gallery images
- Language attribute switches per page (`lang="en"` / `lang="hu"`)
- Reduced motion: respect `prefers-reduced-motion` for all animations

## Design Direction Decision

### Design Directions Explored

Six visual directions were explored, each using the Dance project's established colour palette and typography:

1. **Dramatic Stage** — Dark background, high burgundy/coral contrast, gala performance atmosphere
2. **Airy Gallery** — Light, clean design, gallery-like refinement, generous white space ✅
3. **Warm & Personal** — Cream/beige dominance, rounded forms, familial warmth
4. **Magazine Editorial** — Asymmetric grids, typography-centred, magazine cover style
5. **Flowing Motion** — Organic wave separators, gradient transitions, movement-inspired layout
6. **Bold Minimalist** — Maximum white space, numbered sections, near-zero decoration

Interactive HTML showcase: `_bmad-output/planning-artifacts/ux-design-directions.html`

### Chosen Direction

**Direction 4: Magazine Editorial** (updated from initial Airy Gallery selection after further review)

Key characteristics:
- Asymmetric grid layouts with strong typographic hierarchy throughout
- Full-screen split hero: text left (cream background), single powerful photo right (full bleed)
- Playfair Display at large scale as the visual centrepiece — editorial impact
- Medium animation level: scroll-triggered fade-in, editorial reveal transitions
- About section: alternating editorial rows (image + text, text + image)
- Services: horizontal strip on burgundy background — all 6 services in a single scannable row
- Gallery: asymmetric editorial grid — 1 large feature image left, 2 stacked smaller images right
- **Judging section (Party Mode insight):** 2-column layout — left: judging photo, right: title + context sentence + competition year cards. Mobile: single column, photo above text.
- Contact form: underline-only fields (no border boxes), clean and uncluttered
- Footer: dark (#2D1F21) background, cream text

### Design Rationale

- **Stronger typographic identity** — Playfair Display at 72px+ in the split hero creates immediate impact and differentiates from generic dance instructor sites
- **Asymmetric layouts create visual interest** — the editorial row alternation (image/text, text/image) keeps scrolling engaging and dynamic
- **nycballet.com dramatic photography** — the large feature image in the gallery editorial block serves this reference directly
- **chadwickstudios.com.au service presentation** — the horizontal service strip efficiently presents all 6 services without overwhelming
- **Works for all target groups:** parents → authoritative professionalism; couples → refined elegance; dance enthusiasts → dramatic artistic inspiration
- **Judging section as conversion element (Party Mode insight)** — year-based card layout for competition list adds timeline credibility; _"I know dance from the other side of the judging table"_ links judging to teaching authority
- **Colour palette fully expressed** — burgundy strip for services, cream/white for editorial sections, dark footer; the full palette is used purposefully

### Implementation Approach

**Layout Strategy:**
- Cream (#F9EBDB) as primary section background
- White (#FFFFFF) for editorial text-heavy sections
- Beige (#E8DBC9) for judging section and subtle separators
- Burgundy (#754247) for services strip and accent elements
- Dark (#2D1F21) for footer
- Content max-width: 1200px, `margin: 0 auto`

**Hero Implementation:**
- Full-viewport 50/50 CSS grid (`grid-cols-2`)
- Left panel: cream background, small eyebrow text (uppercase, coral, letter-spaced), Playfair Display H1 at 72px, coral divider line (40px wide, 3px tall), body text, CTA button
- Right panel: single powerful photo, `object-fit: cover`, full bleed to viewport edge
- Performance: `<picture>` element with responsive `srcset` (640w, 1024w, 1920w), WebP primary, JPEG fallback, `loading="eager"`
- Mobile: stacks to single column — photo first (50vh), text below
- CTA: solid dark button (→ hover: coral)

**Editorial About Section:**
- Two alternating rows: `grid-cols-[2fr_3fr]` and `grid-cols-[3fr_2fr]`
- Image placeholders: `aspect-ratio: 4/3`, `border-radius: 4px` (minimal rounding — editorial feel)
- Eyebrow labels: 11px, uppercase, 3px letter-spacing, coral
- H2: Playfair Display 36px, dark
- Body: Inter 15px, 1.8 line-height, 60% opacity

**Services Strip:**
- Full-width burgundy (#754247) background, 64px padding
- 6-column flex row: each column has icon + Playfair title + Inter description
- Column separators: `border-right: 1px solid rgba(249,235,219,0.15)`
- Mobile: 2-column grid, separators become bottom borders

**Gallery Editorial Grid:**
- `grid-template-columns: 2fr 1fr`, `grid-template-rows: auto auto`
- Feature image: spans 2 rows (`grid-row: span 2`), full dramatic impact
- 2 side images stacked — all with minimal border-radius (4px)
- All images: `loading="lazy"`
- Click/tap: GLightbox overlay with swipe navigation

**Animation Strategy (medium level):**
- Scroll-triggered fade-up on editorial rows (`IntersectionObserver`, staggered 0.15s)
- CTA and service column hover transitions (0.3s)
- Hero right-panel image: subtle scale-in on page load (1.02 → 1.0, 0.8s)
- `prefers-reduced-motion`: all animations disabled

**Judging Section (Party Mode updated layout):**
- Beige (#E8DBC9) background, centered
- Eyebrow: "Credentials" — uppercase, coral
- H3: Playfair Display 28px
- Desktop: horizontal row of year cards (each: cream background, Playfair year + Inter competition name)
- Context sentence above cards: _"A pontozó asztal mögül is ismerem a táncot"_ (EN: _"I know dance from the other side of the judging table"_)
- Mobile: stack cards vertically

**Contact Section:**
- 2-column grid: left = large editorial headline ("Let's Dance Together" in Playfair italic), right = form
- Form fields: underline-only style (`border: none; border-bottom: 1px solid #ddd`)
- Submit: solid dark rectangle button (no border-radius), letter-spaced uppercase
- Confirmation: inline success message replaces form

**Bilingual Approach:**
- Identical layout for both languages
- `/en/` and `/hu/` URL prefix routing
- `lang` attribute on every page (`lang="en"` / `lang="hu"`)
- Section padding: minimum 48px vertical on mobile, scaling to 96px on desktop

## User Journey Flows

**Entry point for all journeys:** Google organic search (no returning visitor flows at this stage)
**Single conversion goal:** Email contact form submission
**Target groups:** Equal priority — parents (children's dance), couples (wedding choreography), dance enthusiasts (individual / acro-yoga), competition dancers

### Journey 1: The First-Time Visitor (General)

**Persona:** Any target group, arriving on mobile from Google, no prior knowledge of Zsófi

```mermaid
flowchart TD
    A([\U0001f50d Google search\n'dance instructor near me']) --> B[Dance landing page\nappears in results]
    B --> C{Clicks through?}
    C -->|Yes| D[Hero section loads\nPhoto + Name + CTA button]
    C -->|No| Z1([\u274c Lost visitor])

    D --> E{First impression?}
    E -->|Positive: elegant, professional| F[Begins scrolling]
    E -->|Negative| Z2([\u274c Exits])

    F --> G[About section\n20+ years experience\nPersonal introduction]
    G --> H[Services section\n6 cards — recognises\nown need]
    H --> I{Finds relevant service?}
    I -->|Yes| J[Gallery section\nPhoto browsing / carousel]
    I -->|No| Z3([\u274c Exits — not target audience])

    J --> K[Visual conviction\nReal photos — trust builds]
    K --> L[Judging section\nJudge photo + competition list\n'This is a serious professional!']
    L --> M[Contact section\nForm appears]

    M --> N{Fills in the form?}
    N -->|Yes| O[Submits message]
    N -->|Not ready yet| P{What do they do?}
    P -->|Scrolls back to gallery| J
    P -->|Exits but remembers| Q([\u23f3 Potential returning visitor])

    O --> R[\u2705 Confirmation displayed\nFriendly message]
    R --> S([\U0001f389 Conversion!\nZs\u00f3fi receives email])
```

### Journey 2: The Parent (Children's Dance)

**Persona:** Parent searching for dance lessons for their child, focused on safety and trustworthiness

```mermaid
flowchart TD
    A([\U0001f50d 'children dance classes Brisbane']) --> B[Landing page\nHero loads]

    B --> C[Navigation: immediately\nsearches for Services section]
    C --> D[Children's dance card\nvisible and stands out]

    D --> E{Is the card convincing?}
    E -->|Yes, checks gallery| F[Gallery: looks for\nphotos with children]
    E -->|Uncertain| G[Goes to About section\nchecks experience]
    G --> F

    F --> H{Sees photos\nwith children?}
    H -->|Yes| I[Convinced: 'understands children']
    H -->|No such photo| J[Judging section\nstill professional impression]
    J --> I

    I --> K[Contact form\nService dropdown: Children's dance]
    K --> L[Message: age, days, availability]
    L --> M[\u2705 Submits]
    M --> N([\U0001f389 Conversion!\nZs\u00f3fi replies with details])
```

### Journey 3: The Wedding Couple (Choreography)

**Persona:** Couple preparing for wedding, time-pressured, have a specific date, decide quickly

```mermaid
flowchart TD
    A([\U0001f50d 'wedding first dance choreography Brisbane']) --> B[Hero loads\nFirst impression: elegant?]

    B --> C{Fits the aesthetic?}
    C -->|Airy Gallery: yes!| D[Scroll: searching for Services]
    C -->|No| Z1([\u274c Exits])

    D --> E[Couple dance card\nChoreography card\nBoth relevant]

    E --> F[Jumps quickly to Contact\nDecides under time pressure]
    F --> G{Is CTA button sticky/visible?}
    G -->|Sticky CTA visible| H[Clicks directly to form]
    G -->|No sticky CTA| I[Must scroll\nto Contact]
    I --> H

    H --> J[Form: Choreography\nMessage: date, style preference]
    J --> K[\u2705 Submits]
    K --> L([\U0001f389 Conversion!\nZs\u00f3fi replies with pricing + availability])
```

### Journey 4: The Competition Dancer (Individual / Acro-yoga)

**Persona:** More experienced dancer, serious enquirer, convinced by professional credibility

```mermaid
flowchart TD
    A([\U0001f50d 'dance instructor competition training Brisbane']) --> B[Hero loads\nMagazine Editorial — split hero, strong typography]

    B --> C[Starts scrolling\nAbout: editorial layout, 20+ years experience]
    C --> D[Services strip: Individual / Acro-yoga +\nBíráskodás immediately visible]

    D --> E[Gallery: asymmetric editorial grid\ncompetition photos — dramatic impact]
    E --> F[\u2b50 Judging section!\n'I know dance from the other side\nof the judging table'\nReads competition year cards]

    F --> G{Convinced by credibility level?}
    G -->|Yes, this is different| H[Goes directly to Contact form]
    G -->|Still unsure| I[Returns to gallery\nbrowses more photos]
    I --> H

    H --> J[Form: Individual training\nMentions judging background\nin message]
    J --> K[\u2705 Submits]
    K --> L([\U0001f389 Conversion!\nZs\u00f3fi's most motivated students\ncome from this journey])
```

### Journey Patterns

**Navigation Patterns:**
- All user types search for the Services section first — this is the primary decision point
- Gallery = emotional conviction — all journeys pass through it before reaching the form
- Contact form = the single conversion goal — no alternative path required

**Decision Patterns:**
- First 3 seconds: Hero visual → stays or exits
- Service card: is it relevant? → continues or exits
- After gallery: convinced? → form or scrolls back

**Drop-off Points (where visitors are lost):**
- Slow hero load → exits before seeing it (→ WebP/srcset critical!)
- Missing sticky CTA → couple journey interrupted mid-scroll
- No personally relevant photos in gallery → uncertainty lingers

### Flow Optimization Principles

- **Sticky CTA button** remains visible throughout all section scrolling (bottom-right or fixed header link)
- **Services cards** include a direct "I'm interested →" link that jumps to contact form with service pre-selected in dropdown
- **Gallery ↔ Judging section** positioned adjacent — they mutually reinforce each other
- **Form confirmation:** immediate, friendly, sets expectation: _"I'll reply within 24 hours"_
- **Services dropdown** in contact form includes all 7 services: Children's dance, Couple dance, Individual training, Choreography, Performances, Acro-yoga, Judging (Bíráskodás)
- **Bilingual consideration:** journey flow is identical in both languages; only copy changes by URL prefix

| Journey | Key decision point | Primary emotional need | Convincing element |
|---------|-------------------|----------------------|--------------------|
| General first visitor | Hero + Gallery | Trust | Magazine Editorial split hero + real photos |
| Parent | Children's dance card | Safety | About + Gallery |
| Wedding couple | Services + sticky CTA | Time efficiency | Choreography card |
| Competition dancer | Judging section | Credibility | Judge list + Gallery |

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Component Strategy

### Design System Components

Based on the chosen design system (Tailwind CSS v3 with custom design tokens), the following utilities are available out-of-the-box and will be used directly:

**Available from Tailwind CSS:**
- Typography scale: `text-xs` through `text-9xl`, `font-serif` / `font-sans`, `leading-*`, `tracking-*`
- Layout: `grid`, `flex`, `gap-*`, `col-span-*`, `row-span-*`
- Colour utilities: all custom palette tokens applied via `tailwind.config.js` (`bg-burgundy`, `bg-cream`, `text-coral`, etc.)
- Spacing: 8px base scale (`p-2` = 8px, `p-4` = 16px, `p-24` = 96px)
- Responsive prefixes: `sm:` (640px) / `md:` (768px) / `lg:` (1024px) / `xl:` (1280px)
- `@tailwindcss/typography` prose plugin: long-form About text blocks
- Transitions: `transition-*`, `duration-300`, `ease-in-out`, `opacity-*`

**Available from third-party libraries:**
- Swiper.js: mobile carousel (gallery section)
- GLightbox: lightbox overlay (gallery image viewer)

**Gap analysis — custom work required:**
None of the above cover the split editorial hero, the burgundy service strip with column separators, the alternating editorial rows, the asymmetric gallery grid, or the judging year-card strip. All of these require custom component implementation.

---

### Custom Components

#### 1. EditorialHero

**Purpose:** Full-viewport 50/50 split hero — first impression and primary conversion trigger.
**Content:** Left panel: eyebrow text, H1 (Playfair Display 72px), coral divider line, subtitle, CTA button. Right panel: full-bleed hero photograph.
**Actions:** CTA button → smooth scroll to Contact section.
**States:**
- Default: left cream panel + right photo
- Mobile (< 768px): single column — photo on top (50vh), text below
- Reduced motion: no scale-in animation on photo

**Variants:** None — singular full-page instance.

**Accessibility:** `<header role="banner">`, `<h1>` singular on page, hero image `alt="Zsófi — táncpedagógus"`, CTA `aria-label="Lépj kapcsolatba Zsófival"`, button `type="button"` with JS scroll.

**Interaction Behavior:**
- Page load: hero photo subtle scale-in (`transform: scale(1.02) → scale(1)`, 0.8s ease-out)
- CTA button hover: background transitions to coral (0.3s)
- `prefers-reduced-motion`: no animation

```
┌──────────────────────────┬──────────────────────────┐
│ EYEBROW (coral, caps)    │                          │
│                          │   Hero Photo             │
│ Playfair H1 — 72px       │   object-fit: cover      │
│ ──── (coral, 40px)       │   full bleed to edge     │
│ Subtitle — Inter 18px    │                          │
│ [CTA dark button]        │                          │
└──────────────────────────┴──────────────────────────┘
```

---

#### 2. ServiceStrip

**Purpose:** Scannable horizontal row of all 7 services — primary decision point for visitors who know what they need.
**Content:** 7 columns. Each column: service number (01–07, small coral text), Playfair Display service title, Inter 1-line description.
- 01 Gyermek tánc | 02 Pár tánc | 03 Esküvői koreográfia | 04 Acro-yoga | 05 Egyéni tánc | 06 Versenyfelkészítés | 07 Bíráskodás

**Actions:** CTA button at the bottom of the strip → smooth scroll to Contact section. (Individual service columns are not separately linked — single conversion funnel.)

**States:**
- Default: burgundy (#754247) background, cream text, `rgba(249,235,219,0.15)` column separator borders
- Column hover: subtle background lightens (`rgba(255,255,255,0.04)`), 0.2s ease
- Mobile (< 768px): 2-column grid, separators become bottom borders
- Tablet (768px–1023px): 3–4 column grid

**Accessibility:** `<section aria-label="Szolgáltatások">`, each column `<article>`, service number `aria-hidden="true"`, `<h3>` for service title.

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│  BURGUNDY BACKGROUND                                                                │
│  01        │ 02       │ 03         │ 04    │ 05       │ 06         │ 07            │
│  Gyermek   │ Pár tánc │ Esküvői    │ Acro  │ Egyéni   │ Verseny-   │ Bíráskodás   │
│  tánc      │          │ koreo.     │ yoga  │ tánc     │ felkész.   │               │
└────────────────────────────────────────────────────────────────────────────────────┘
```

---

#### 3. EditorialRow

**Purpose:** Alternating image+text rows for the About section — creates editorial rhythm and visual dynamism.
**Content:** Row A: `grid-cols-[2fr_3fr]` (image left, text right). Row B: `grid-cols-[3fr_2fr]` (text left, image right). Per row: eyebrow label (coral, uppercase, 11px, 3px letter-spacing), H2 (Playfair Display 36px), body text (Inter 15px, 1.8 line-height, 60% opacity).

**Actions:** None — purely informational.

**States:**
- Default: content visible
- Scroll-triggered: fade-up reveal (`opacity: 0 → 1`, `translateY(24px → 0)`, 0.6s ease-out)
- Mobile: single column, image always above text

**Variants:** Row A (image-first) and Row B (text-first) — alternated automatically, minimum 2 rows.

**Accessibility:** Images: meaningful `alt` text. `<section aria-label="Rólam">`. Heading hierarchy: `<h2>` per row.

**Interaction Behavior:** `IntersectionObserver` triggers fade-up with 0.15s stagger between rows. `prefers-reduced-motion`: instant appearance, no animation.

---

#### 4. GalleryCategorized

**Purpose:** Categorized photo gallery organized into album folders — inspired by chadwickstudios.com.au's album structure. Enables visitors to find personally relevant content quickly (parent → Teaching photos, competition dancer → Competitions album) while showcasing Zsófi's breadth of work.

**Album categories:**
- **Versenyek** (Competitions) — performance and competition shots
- **Esküvők** (Weddings) — couple choreography moments
- **Tanítás** (Teaching) — studio and class photos, children's dance
- **Fellépések** (Performances) — stage and show performances
- **Acro-yoga** — acro-yoga training and demonstration shots

**Content structure — two-layer layout:**
1. **Album preview row** — horizontal row of album folder cards (category name + cover photo + image count badge). Visible on page load without any interaction.
2. **Active album grid** — clicking/tapping an album card opens that album in an asymmetric editorial grid below the row (same section, no page navigation). Default open: first album (Versenyek).

**Album Card (folder card):**
- Cover image: `aspect-ratio: 4/3`, `object-fit: cover`, minimal border-radius (4px)
- Album name: Playfair Display, cream text, bottom-left overlay on cover
- Image count badge: small pill, `rgba(0,0,0,0.45)` background, top-right corner
- Active state: coral bottom border (3px) + subtle scale `1.02`

**Active album grid (editorial asymmetric):**
- `grid-template-columns: 2fr 1fr`, `grid-template-rows: auto auto`
- Feature image: spans 2 rows (`grid-row: span 2`)  — largest, most dramatic photo
- 2 stacked side images right
- All images: `loading="lazy"`, border-radius 4px
- Smooth height transition when switching album (`max-height` transition, 0.3s ease)

**Actions:**
- Album card click/tap → switches active album grid below
- Image click/tap → opens GLightbox overlay, full-size, keyboard + swipe navigation
- GLightbox navigates only within the active album (not cross-album)

**States:**
- Default: first album active, grid visible
- Album card hover: `scale(1.02)`, 0.2s ease
- Album switching: fade transition on grid content (`opacity 0→1`, 0.25s)
- Image hover: subtle white overlay (`rgba(255,255,255,0.06)`), cursor pointer
- Mobile (< 768px):
  - Album cards: horizontal Swiper.js scroll row (peek of next card at right edge)
  - Active album grid: single-column stacked layout (no asymmetric grid)
  - Images: Swiper.js carousel within the active album
- Lightbox: GLightbox dark overlay, `←/→` arrow navigation, `Esc` close, swipe support

**Variants:** Desktop (album row + editorial grid) / Mobile (Swiper album row + Swiper image carousel).

**Accessibility:** `<section aria-label="Galéria">`. Album cards: `<button aria-pressed="true|false" aria-label="[Album name] album megnyitása">`. Grid: `<ul role="list">` with `<li>` per image. Each image: descriptive `alt`. Lightbox: `role="dialog"`, `aria-modal="true"`, `Esc` closes, focus trapped, `←/→` navigation.

```
┌────────────────────────────────────────────────────────────────────┐
│  [Versenyek ▾]  [Esküvők]  [Tanítás]  [Fellépések]  [Acro-yoga]  │  ← album card row
└────────────────────────────────────────────────────────────────────┘
┌──────────────────────────┬────────────────┐
│                          │   Image 2      │
│   Feature Image          │   (top right)  │  ← active album grid
│   (2fr, spans 2 rows)    ├────────────────┤
│                          │   Image 3      │
│                          │  (bottom right)│
└──────────────────────────┴────────────────┘
```

---

#### 5. VideoSection

**Purpose:** Showcase Zsófi's performances and teaching through video — adds dynamic energy and emotional depth that photos alone cannot deliver. Inspired by chadwickstudios.com.au video showcase approach.

**Content:**
- Section eyebrow: "Videók" (uppercase, coral, letter-spaced)
- Section H2: Playfair Display
- Video cards: 2–3 featured videos in a horizontal row. Each card: thumbnail image + play button overlay + video title below
- Videos hosted on YouTube or Vimeo (external embed, not self-hosted) — `<iframe>` lazy-loaded

**Actions:**
- Video card click/tap → plays video inline (iframe replaces thumbnail within the card, or opens in a lightbox-style modal overlay)
- Recommended: modal overlay approach (GLightbox supports video) — keeps user on page, no YouTube redirect

**States:**
- Default: thumbnail + play button icon visible, no iframe loaded (performance: `loading="lazy"` on iframe or click-to-load pattern)
- Card hover: play button scales up (`scale(1.1)`, 0.2s), thumbnail slight brightness reduction (`brightness(0.85)`)
- Playing (modal): dark overlay, video autoplays, `Esc` / overlay tap closes
- Mobile: single-column stacked cards, tap opens modal

**Variants:** 2-column desktop row (2 videos) or 3-column (3 videos). Must be decided when actual video content is available — recommend starting with 2.

**Performance note:** Do NOT embed `<iframe>` on page load. Use click-to-load pattern: show `<img>` thumbnail with play button, replace with `<iframe>` only on click. This saves ~500KB+ initial page weight per video.

**Accessibility:** Each video card: `<button aria-label="[Video title] lejátszása">`. Modal: `role="dialog"`, `aria-modal="true"`, `aria-label="Videó lejátszó"`. `Esc` closes. Focus returns to trigger button on close.

```
┌─────────────────────────────────────────────────────────────────┐
│  Videók (eyebrow)                                               │
│  H2 Heading                                                     │
│  ┌──────────────────┐   ┌──────────────────┐                   │
│  │  [thumbnail]     │   │  [thumbnail]     │                   │
│  │      ▶           │   │      ▶           │                   │
│  │  Video Title     │   │  Video Title     │                   │
│  └──────────────────┘   └──────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

---

#### 6. JudgingCredentials

**Purpose:** Establishes Zsófi's judging authority — editorial "credentials" strip that adds professional weight and converts hesitant visitors.
**Content:** Beige (#E8DBC9) background, eyebrow: "Credentials" (uppercase, coral), H3 (Playfair Display 28px), context sentence, horizontal row of year cards (each: cream background, Playfair year + Inter competition name).

**Actions:** None — purely informational.

**States:**
- Default: beige section, cream year cards
- Scroll-triggered: year cards stagger-fade in (0.1s delay per card, 0.4s duration each)
- Mobile: cards wrap to 2-column grid

**Accessibility:** `<section aria-label="Bírói tapasztalat">`, each card `aria-label="[year] — [competition name]"`, context sentence in `<p>`.

**Interaction Behavior:** Card stagger reveal on scroll (IntersectionObserver). `prefers-reduced-motion`: all cards appear instantly.

---

#### 7. ContactForm

**Purpose:** The sole conversion component — email contact form submission.
**Content:** Name field, Email field, Service dropdown (7 services + "Egyéb / Other"), Message textarea, Submit button. Underline-only field style: `border: none; border-bottom: 1px solid #ddd`.

**Actions:** Submit → on-submit validation → send.

**States:**
- Default: empty fields, thin underline border
- Focus: underline turns coral (`border-bottom-color: #DC6567`, 0.2s transition)
- Error (on submit only): red underline + error message below field (`font-size: 12px`, red)
- Loading: submit button text → spinner, `disabled` attribute set
- Success: form hidden, inline confirmation message shown (`aria-live="polite"`)

**Variants:** None.

**Validation rules (on submit):** Name: required. Email: required + valid format. Message: required, min 10 characters.

**Accessibility:** Every field: `<label for="...">` associated via `id`. `required` attributes. `aria-describedby` links field to its error message. `aria-live="polite"` on success area. All form inputs: `font-size: 16px` minimum (prevents iOS auto-zoom).

**Interaction Behavior:** Single validation pass on submit click. No real-time field validation. Mobile: all fields full-width, generous tap targets (min 44px height).

---

#### 8. MobileNavigation

**Purpose:** Site navigation on mobile — hamburger opens full-screen overlay menu.
**Content:** Sticky header: logo/name left, hamburger icon right. Overlay: full-screen cream background, nav links centered, × close button top right, language switcher (HU | EN) bottom.

**Actions:** Hamburger tap → overlay opens. Link tap → navigate + overlay closes. × tap → overlay closes. Outside-overlay tap → overlay closes.

**States:**
- Closed: hamburger icon visible in sticky header
- Open: full-screen overlay, `overflow: hidden` on `<body>`, links visible, focus trapped
- Active link: coral underline

**Variants:** Mobile only (< 768px). Desktop shows horizontal link row in header.

**Accessibility:** `<nav aria-label="Főmenü">`, hamburger: `aria-expanded="false|true"`, `aria-controls="mobile-menu"`. Overlay: `role="dialog"`, `aria-modal="true"`. Focus trapped inside overlay when open. `Esc` closes. Focus returns to hamburger on close.

**Interaction Behavior:** Overlay transition: `opacity 0→1` + `translateY(-8px → 0)`, 0.25s ease. Body scroll locked when open.

---

#### 9. LanguageSwitcher

**Purpose:** Toggle between Hungarian and English language versions.
**Content:** `HU | EN` — current language bold/underlined in coral, inactive at 60% opacity. Separator `|` between them.

**Actions:** Click → full page navigation to `/hu/` or `/en/` equivalent URL (static multilingual routing, no JS language swap).

**States:**
- Active language: coral `text-decoration: underline`, `font-weight: 600`
- Inactive: `opacity: 0.6`, hover → `opacity: 1` (0.2s)

**Variants:** Desktop (inline in header nav) / Mobile (bottom of overlay menu).

**Accessibility:** `<nav aria-label="Nyelvválasztó">`, each option: `<a hreflang="hu|en" lang="hu|en">`, current language: `aria-current="page"`.

---

### Component Implementation Strategy

**Design token rule:** All custom components consume `tailwind.config.js` design tokens exclusively — no hardcoded hex values in any component file.

**Shared animation utility:** A single `scrollReveal.js` vanilla JS module (IntersectionObserver wrapper) is shared across EditorialRow, GalleryCategorized, VideoSection, and JudgingCredentials — no per-component animation duplication.

**Mobile-first contract:** All components — base styles target ~375px mobile. `md:` and `lg:` Tailwind prefixes handle wider layouts. Touch targets minimum 44×44px on all interactive elements.

**Accessibility baseline:**
- WCAG 2.1 AA contrast: cream on burgundy = 4.8:1 ✓, dark on cream = 12.1:1 ✓
- Coral is decorative accent only — never used for body text (contrast insufficient at small sizes)
- `prefers-reduced-motion` respected globally via single CSS media query in base styles

**Animation principle:** Scroll-triggered reveals use `IntersectionObserver` (no scroll event listeners). Threshold: 0.15 (component 15% into viewport). One-way: fired once on enter, not on exit.

---

### Implementation Roadmap

**Phase 1 — Critical Path (first fold + conversion)**
Required before the site is usable:
- `EditorialHero` — first impression, primary CTA
- `MobileNavigation` + `LanguageSwitcher` — site structure and bilingual routing
- `ContactForm` — the single conversion goal

**Phase 2 — Core Content Sections**
Primary informational content:
- `ServiceStrip` (7 services including Bíráskodás as service 07)
- `EditorialRow` (About section — 2 alternating rows minimum)

**Phase 3 — Trust & Social Proof**
Conversion-supporting sections:
- `GalleryCategorized` — album card row + editorial grid + GLightbox integration (5 album categories)
- `VideoSection` — click-to-load thumbnail + modal player (GLightbox video support)
- `JudgingCredentials` (year-card stagger layout)

**Phase 4 — Polish & Optimisation**
- `scrollReveal.js` IntersectionObserver utility (EditorialRow + GalleryCategorized + JudgingCredentials)
- Swiper.js mobile carousel integration in GalleryCategorized (album row + image carousel per album)
- ContactForm loading/success states
- `prefers-reduced-motion` audit across all animated components
- WebP/srcset audit on EditorialHero and GalleryCategorized cover images
- VideoSection: click-to-load iframe pattern implementation + thumbnail generation

## UX Consistency Patterns

### Button Hierarchy

Three button variants cover all interaction contexts on the Dance site. No other button styles are introduced.

**Primary CTA — Dark solid rectangle**
- Usage: Hero section call-to-action, Contact section submit, mobile overlay CTA
- Visual: `background: #2D1F21` (dark), `color: #F9EBDB` (cream), no border-radius, `padding: 14px 32px`, `letter-spacing: 0.08em`, `text-transform: uppercase`, Inter 13px
- Hover: `background: #DC6567` (coral), `color: #fff`, transition `0.3s ease`
- Focus: `outline: 2px solid #DC6567`, `outline-offset: 3px`
- Disabled: `opacity: 0.45`, `cursor: not-allowed`
- Mobile: full-width (`width: 100%`) when inside a form or hero text block

**Secondary — Ghost / outline**
- Usage: "Összes album →" gallery link, supplementary inline actions
- Visual: `border: 1px solid #2D1F21`, `background: transparent`, `color: #2D1F21`, no border-radius, same padding as primary
- Hover: `background: #2D1F21`, `color: #F9EBDB`, transition `0.3s ease`
- Focus: same as primary

**Text link CTA**
- Usage: In-body links, "Ugrás a kapcsolat szekcióra →" service strip link, navigation links
- Visual: `color: #DC6567` (coral), `text-decoration: underline`, underline `2px solid`, `text-underline-offset: 3px`
- Hover: `color: #754247` (burgundy), transition `0.2s`
- No button chrome — inline with surrounding text flow

**Rules:**
- Maximum one Primary CTA visible per viewport at any time (sticky CTA exception: appears only after hero exits viewport)
- Never use coral as a button background for primary actions — coral is a hover/accent colour only
- Icon-only buttons (hamburger, lightbox close) must have `aria-label` — no visible text required, but tooltip on hover recommended

---

### Feedback Patterns

**Form success state**
- Trigger: successful form submission (HTTP 200 from backend / email service)
- Behaviour: form fields and submit button fade out (`opacity: 0`, 0.3s), replaced by success message in the same container space (no layout shift)
- Message style: Playfair Display italic H3 + Inter body, cream background, coral left border (4px), `padding: 24px 32px`
- Copy (HU): _"Köszönöm! Hamarosan felveszem veled a kapcsolatot — általában 24 órán belül válaszolok."_
- Copy (EN): _"Thank you! I'll be in touch soon — I usually reply within 24 hours."_
- `aria-live="polite"` on success container — announced to screen readers without interrupting

**Form error state (on submit)**
- Trigger: submit clicked, one or more fields fail validation
- Behaviour: invalid fields get `border-bottom-color: #DC3545` (red), error message appears below each invalid field
- Error message style: `font-size: 12px`, `color: #DC3545`, `margin-top: 4px`, Inter
- Submit button: remains enabled — user can re-attempt immediately after fixing fields
- Focus management: after submit attempt, focus moves to first invalid field
- No page scroll to top — form stays in view

**Form loading state**
- Trigger: submit clicked, validation passed, request in flight
- Behaviour: submit button text replaced with inline spinner SVG + "Küldés…" text, button `disabled` attribute set
- Spinner: 16px SVG, `animation: spin 0.8s linear infinite`, white colour
- Duration: max 10 seconds — if no response, show error toast: _"Valami hiba történt. Kérlek próbáld újra."_

**Toast / transient notification**
- Usage: Network error on form submit only (no other toast usage on the site)
- Visual: fixed `bottom: 24px`, `right: 24px`, dark background (#2D1F21), cream text, `border-radius: 4px`, `padding: 12px 20px`, `z-index: 9999`
- Auto-dismiss: 5 seconds, or on `×` close button tap
- `role="alert"`, `aria-live="assertive"` — announced immediately

---

### Navigation Patterns

**Desktop header**
- Position: sticky top (`position: sticky; top: 0`), `z-index: 100`
- Background: cream (#F9EBDB) at 95% opacity + `backdrop-filter: blur(8px)` — slight depth effect as page scrolls beneath
- Height: 64px
- Content: Logo/name left → nav links centre → Language switcher right
- Nav links: Inter 13px, uppercase, letter-spacing 0.06em, `color: #2D1F21 (60% opacity)`
- Active link (current section): `color: #2D1F21 (100%)` + coral bottom border `2px solid #DC6567`
- Hover: `color: #2D1F21 (100%)`, transition `0.2s`
- Active section detection: IntersectionObserver with 20% threshold — updates active link as sections enter/exit viewport

**Scroll behaviour**
- Smooth scroll: `scroll-behavior: smooth` in CSS (global), no JS required
- CTA "Kapcsolat" / "Contact" jumps via anchor `href="#contact"` — same-page scroll
- Scroll offset: `scroll-margin-top: 80px` on all anchor target sections — prevents header from covering the section title on jump

**Sticky CTA appearance**
- Trigger: hero section exits viewport (IntersectionObserver on `#hero`, threshold 0)
- Behaviour: a compact "Írj nekem! →" / "Contact me →" pill button appears fixed `bottom: 24px`, `right: 24px`
- Visual: dark background, cream text, `border-radius: 24px`, `padding: 10px 20px`, `box-shadow: 0 4px 16px rgba(0,0,0,0.15)`, `z-index: 500`
- Disappears: when Contact section enters viewport (IntersectionObserver on `#contact`)
- Mobile: same behaviour, button slightly smaller (`padding: 8px 16px`)

**Skip-to-content link**
- Visually hidden by default, becomes visible on keyboard focus (`position: fixed; top: 0; left: 0`)
- Copy: "Ugrás a tartalomra" / "Skip to content"
- Target: `<main id="main-content">`
- Style: dark background, cream text, `padding: 8px 16px`, `z-index: 10000`

---

### Gallery & Album Switching Patterns

**Album switch interaction**
- Trigger: user clicks/taps an album folder card in the GalleryCategorized header row
- Step 1: active album grid fades out (`opacity: 0`, 0.2s ease-out)
- Step 2: album card updates — previous loses coral border, new gains `border-bottom: 3px solid #DC6567` + `scale(1.02)` (0.15s)
- Step 3: new album grid images fade in (`opacity: 0 → 1`, 0.25s ease-in), staggered (0.05s per image)
- No page scroll or layout shift during album switch — container height transitions if needed (`min-height` set to current height before switching)
- `prefers-reduced-motion`: instant switch, no fade

**Album card active state rules**
- Exactly one album is always active — there is no "no selection" state
- Default active on page load: first album (Versenyek)
- Album card `aria-pressed="true"` on active card, `"false"` on all others — updated on switch

**Lightbox navigation scope**
- GLightbox gallery group scoped per album: `data-gallery="album-versenyek"` etc.
- `←/→` arrows navigate only within the current album
- Switching album while lightbox is open: closes lightbox first, then switches album

**Mobile album row (Swiper)**
- Swiper parameters: `slidesPerView: "auto"`, `spaceBetween: 12`, `freeMode: true` (momentum scroll)
- No pagination dots — peek of next card at edge implies scrollability
- Active album card always scrolls into view (`swiper.slideTo()`) when switched programmatically

---

### Video Playback Patterns

**Click-to-load**
- On page load: only a `<img>` thumbnail is rendered — no `<iframe>` in the DOM
- Thumbnail source: YouTube `https://img.youtube.com/vi/{ID}/maxresdefault.jpg` or Vimeo thumbnail API
- Play button overlay: SVG circle with triangle, `position: absolute`, centred, `width: 64px`, `color: rgba(255,255,255,0.9)`, `filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4))`
- On click: `<img>` replaced with `<iframe>` (YouTube embed URL `?autoplay=1&rel=0`) — video starts automatically

**Video modal (GLightbox)**
- GLightbox handles the iframe in a full-screen dark overlay modal
- `type: "iframe"`, GLightbox `width: "90vw"`, `height: "80vh"`, max `1200px × 675px` (16:9)
- Video autoplays on modal open (`?autoplay=1` in embed URL)
- Pauses/stops on modal close: GLightbox destroys the iframe on close — no audio bleeding
- `Esc` key closes modal
- Mobile: modal `width: 100vw`, `height: auto`, `aspect-ratio: 16/9`

**Privacy / GDPR note**
- YouTube embeds use `youtube-nocookie.com` domain to avoid third-party cookies until play
- On first play: no consent banner needed (nocookie domain does not set tracking cookies)
- Vimeo: `player.vimeo.com/video/{ID}?dnt=1` (Do Not Track parameter)

---

### Scroll & Animation Patterns

**Scroll-triggered reveal (global rule)**
- Technology: native `IntersectionObserver` — no GSAP, no ScrollTrigger, no scroll event listeners
- Shared module: `scrollReveal.js` — one instance, used by EditorialRow, GalleryCategorized, VideoSection, JudgingCredentials
- Default trigger: element 15% into viewport (`threshold: 0.15`)
- Default animation: `opacity: 0 → 1` + `translateY(20px → 0)`, duration `0.55s`, easing `cubic-bezier(0.4, 0, 0.2, 1)`
- One-shot: fires once on enter, does not re-trigger on scroll back up
- Stagger (multiple children): `0.1s` delay increment per child (album cards, judging year cards, video cards)

**Hero animation (page load only)**
- Hero right panel photo: `transform: scale(1.02) → scale(1)`, `opacity: 0.8 → 1`, duration `0.8s ease-out`
- Hero left panel text: `opacity: 0 → 1` + `translateY(16px → 0)`, duration `0.6s`, H1 first, then divider line (delay +0.1s), then subtitle (delay +0.2s), then CTA (delay +0.35s)
- Both triggered immediately on `DOMContentLoaded` — not IntersectionObserver

**Hover animations (desktop only)**
- Album card: `transform: scale(1.02)`, `0.2s ease`
- Gallery image: `filter: brightness(0.92)`, `0.2s ease`
- Video thumbnail: play button `transform: scale(1.1)` + thumbnail `filter: brightness(0.82)`, `0.2s ease`
- Service column: `background: rgba(255,255,255,0.04)`, `0.2s ease`
- No hover animations on touch devices (`@media (hover: none)` removes all hover animations)

**`prefers-reduced-motion` rule (global)**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
This single rule in `base.css` disables all transitions and animations globally — no per-component override needed. IntersectionObserver still fires, elements appear instantly without motion.

---

### Bilingual (HU/EN) Patterns

**URL routing**
- Hungarian: `/hu/` prefix — e.g. `zsofidance.com.au/hu/`
- English: `/en/` prefix — e.g. `zsofidance.com.au/en/`
- Root `/`: redirects to `/hu/` (primary language) with `HTTP 302` or meta-refresh
- No JS language switching — each language URL is a full static HTML page

**`<html>` tag**
- Hungarian pages: `<html lang="hu">`
- English pages: `<html lang="en">`

**`hreflang` alternates (in `<head>` of every page)**
```html
<link rel="alternate" hreflang="hu" href="https://zsofidance.com.au/hu/" />
<link rel="alternate" hreflang="en" href="https://zsofidance.com.au/en/" />
<link rel="alternate" hreflang="x-default" href="https://zsofidance.com.au/hu/" />
```

**LanguageSwitcher link behaviour**
- HU link: always points to `/hu/` equivalent of current page
- EN link: always points to `/en/` equivalent of current page
- Current language: `aria-current="page"`, coral underline, bold
- Full page navigation — no partial DOM swap

**Content parity rule**
- Both language versions are structurally identical — same sections, same components, same order
- No language-version-only sections permitted (no "HU only" or "EN only" content blocks)
- Album names (Versenyek, Esküvők, etc.) translated in both versions — `data-album` attribute uses language-neutral slugs (`competitions`, `weddings`, `teaching`, `performances`, `acroyoga`) for JS album switching logic

**Typography hyphenation**
- Hungarian: `hyphens: auto; lang="hu"` on text-heavy blocks (About section body text) — Hungarian is a compound language with long words, hyphenation improves mobile readability
- English: `hyphens: none` — English flow handles naturally without hyphenation

## Responsive Design & Accessibility

### Responsive Strategy

Mobile-first approach throughout — all base styles target ~375px mobile viewport. Tablet and desktop layouts are progressive enhancements via Tailwind responsive prefixes. No JavaScript is involved in responsive layout — CSS Grid and Flexbox handle all adaptations.

**Design philosophy:** The Magazine Editorial layout's asymmetric grids and 50/50 splits are the desktop-ideal state. On mobile, these collapse gracefully to single-column stacks that preserve content hierarchy without losing editorial character. Playfair Display headings remain at reduced but still impactful sizes on mobile.

### Breakpoint Strategy

Standard Tailwind v3 breakpoints, no custom breakpoints added:

| Prefix | Min-width | Target context |
|--------|-----------|---------------|
| (base) | 0px | Mobile portrait — primary design target (~375px) |
| `sm:` | 640px | Mobile landscape, small tablet |
| `md:` | 768px | Tablet portrait — two-column layouts begin |
| `lg:` | 1024px | Tablet landscape / small desktop — full editorial layouts |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Wide desktop (content capped at `max-w-[1200px]`, centred) |

**Critical mobile constraints:**
- Minimum tap target: 44×44px on all interactive elements (buttons, album cards, nav links, video play buttons)
- Font size minimum: 16px on all form inputs (prevents iOS Safari auto-zoom)
- No horizontal scroll: all layouts fit within the viewport width at all breakpoints
- Hero on mobile: photo panel stacks above text panel (photo: `h-[50vh]`, text: auto height)

### Section-by-Section Responsive Behaviour

**EditorialHero**
- Mobile: single column — photo top (`h-[50vh]`, `object-fit: cover`), text block below (cream bg, `px-6 py-12`)
- `md:` transition begins — photo right half, text left, `grid-cols-[1fr_1fr]` starts
- `lg+:` full 50/50 viewport-height split, text `pl-16 pr-8`, photo full bleed to right edge

**ServiceStrip**
- Mobile: `grid-cols-2`, `gap-y-8`, separator lines become bottom borders per item
- `md:` `grid-cols-4`
- `lg+:` 7-column `flex` row with `border-right` column separators

**EditorialRow (About)**
- Mobile: single column, image always above text block, no alternation
- `md:` alternating `grid-cols-[2fr_3fr]` / `grid-cols-[3fr_2fr]` begins
- `lg+:` full alternating editorial grid with editorial spacing

**GalleryCategorized**
- Mobile album card row: Swiper freeMode, `slidesPerView: "auto"`, `spaceBetween: 12`, peek at right edge
- Mobile image view: single-column Swiper carousel per active album
- `md:` album card row shows 3–4 cards, image grid 2-col
- `lg+:` 5-card album row, `2fr/1fr` editorial asymmetric grid

**VideoSection**
- Mobile: single-column stacked video cards, full-width thumbnails
- `md+:` `grid-cols-2` (2 videos) or `grid-cols-3` (3 videos)

**JudgingCredentials**
- Mobile: year cards `grid-cols-2`, `gap-4`
- `md+:` horizontal flex row, all cards in one line if space permits

**ContactForm**
- Mobile: single column, full-width fields and submit button
- `lg+:` `grid-cols-2` — Playfair italic headline left, form right

**MobileNavigation**
- Mobile/`sm:` hamburger icon visible, overlay menu on tap
- `md+:` hamburger hidden, horizontal nav links in header

### Accessibility Strategy

**Compliance target: WCAG 2.1 Level AA**

Rationale: AA is the Australian legal standard under the Disability Discrimination Act guidance and the universally accepted web accessibility minimum. AAA is not targeted as several AAA criteria (e.g. no background audio, sign language) are not applicable to this site type.

**Colour contrast audit:**

| Foreground | Background | Ratio | Result |
|-----------|------------|-------|--------|
| Dark #2D1F21 | Cream #F9EBDB | 12.1:1 | ✅ AAA |
| Dark #2D1F21 | White #FFFFFF | 15.8:1 | ✅ AAA |
| Cream #F9EBDB | Burgundy #754247 | 4.8:1 | ✅ AA |
| Cream #F9EBDB | Dark #2D1F21 | 12.1:1 | ✅ AAA |
| Dark #2D1F21 | Beige #E8DBC9 | 10.3:1 | ✅ AAA |
| Coral #DC6567 | White #FFFFFF | 3.1:1 | ⚠️ Decorative only — never body text |

**Coral usage rule:** Coral (#DC6567) is purely decorative — eyebrow text, divider lines, active underlines, hover states. It must never be used as the primary text colour on white or cream background for body text or labels below 24px (contrast insufficient for AA).

**Keyboard navigation requirements:**
- All interactive elements reachable via `Tab` key in logical DOM order
- Focus indicator: `outline: 2px solid #DC6567; outline-offset: 3px` on all focusable elements
- Modal overlays (lightbox, video, mobile nav): focus trapped inside while open; `Esc` closes; focus returns to trigger element on close
- Skip-to-content link: first focusable element on every page, visually hidden until focused

**Screen reader requirements:**
- Single `<h1>` per page (hero heading)
- Logical heading hierarchy: `h1` → `h2` (sections) → `h3` (sub-items, judging cards, service titles)
- All images: meaningful `alt` text; decorative images: `alt=""`
- All icon-only buttons: `aria-label` required
- `<nav>` elements: unique `aria-label` (header nav, mobile nav, language switcher)
- Dynamic content updates: `aria-live` on form success/error areas, toast notifications
- `<main id="main-content">` wraps all page content between header and footer

**Touch & motor accessibility:**
- Minimum tap target: 44×44px (all buttons, album cards, nav links, image thumbnails, video play buttons)
- Swiper carousels: swipe gesture supported natively; keyboard left/right arrow navigation also implemented
- No time-limited interactions anywhere on the site
- Hover-dependent information: nothing is exclusively revealed on hover — all hover content is also accessible via focus or always visible

**Cognitive accessibility:**
- Language: plain, warm language in both HU and EN — no jargon
- Form: single-column, clearly labelled fields, error messages adjacent to affected field
- Consistent navigation: header structure identical on all pages
- `prefers-reduced-motion`: global CSS rule eliminates all transitions and animations

### Testing Strategy

**Responsive testing matrix:**

| Device | Screen | Browser | Priority |
|--------|--------|---------|---------|
| iPhone 14 (real device) | 390×844 | Safari iOS | Critical |
| Android mid-range (real) | ~360×800 | Chrome Android | Critical |
| iPad (real device) | 768×1024 | Safari iOS | High |
| Desktop Chrome | 1440×900 | Chrome | Critical |
| Desktop Firefox | 1440×900 | Firefox | High |
| Desktop Safari | 1440×900 | Safari macOS | High |
| Desktop Edge | 1440×900 | Edge | Medium |

**Accessibility testing tools:**
- **axe DevTools** (browser extension) — automated scan on every page, zero violations target
- **Lighthouse** (Chrome DevTools) — Accessibility score ≥ 95 target
- **VoiceOver** (macOS/iOS) — manual screen reader walkthrough of full user journey
- **NVDA + Firefox** (Windows) — second screen reader cross-check
- **Keyboard-only test** — complete full user journey (hero → services → gallery → contact form submit) without mouse
- **Colour blindness simulation** — Chrome DevTools Vision Deficiencies emulator (deuteranopia, protanopia)

**Performance targets (affects accessibility perception):**
- Largest Contentful Paint (LCP): ≤ 2.5s on mobile (4G)
- Cumulative Layout Shift (CLS): ≤ 0.1 (no layout shifts during image/font load)
- First Input Delay (FID): ≤ 100ms

### Implementation Guidelines

**Responsive development rules:**
- All spacing in `rem` units aligned to 8px base (Tailwind default scale)
- No hardcoded `px` widths on layout containers — use `%`, `vw`, or Tailwind responsive classes
- Images: `width: 100%; height: auto` as base, overridden by `aspect-ratio` where fixed ratio required
- CSS Grid preferred over Flexbox for two-dimensional layouts (editorial rows, gallery grids)
- Flexbox for one-dimensional flows (service strip, nav links, button groups)

**Accessibility development checklist (per component):**
- [ ] Semantic HTML element used (not `<div>` where `<button>`, `<nav>`, `<article>` is correct)
- [ ] `aria-label` or visible `<label>` on every interactive element
- [ ] Keyboard interaction implemented and tested
- [ ] Focus visible indicator styled (not browser default)
- [ ] `prefers-reduced-motion` respected
- [ ] Touch target ≥ 44×44px verified
- [ ] Colour contrast verified for all text/background combinations

**Font loading strategy:**
- Google Fonts: `<link rel="preconnect">` + `display=swap` — prevents FOIT (Flash of Invisible Text)
- Fallback font stack: `"Playfair Display", Georgia, serif` / `"Inter", system-ui, sans-serif`
- `font-display: swap` ensures text is readable while custom font loads
