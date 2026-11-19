# ZATONA Website Project Report

**Prepared:** November 19, 2026  
**Project:** ZATONA — Build • Innovate • Grow  
**Purpose of this report:** Explain what the repository contains, what the website is intended to do, how its main parts work together, and what remains unfinished.

## 1. Executive summary

ZATONA is a bilingual, static website for a digital services agency. It presents the brand in English and Arabic, explains its services, displays package and pricing information, and gives potential clients a way to prepare a project inquiry.

The site is built with:

- **HTML** for the two language pages and their content structure.
- **CSS** for the brand system, layouts, responsive behavior, and visual effects.
- **Vanilla JavaScript** for localized service and pricing cards, navigation behavior, form validation, and other page interactions.
- **GitHub Pages** as the static frontend host, with a separate Google Apps Script backend intended to write requests to a private Google Sheet. The website itself has no application server.

The current deployed repository version is commit `65216a4` on `main`; the request-form and Apps Script work described here is local and has not been committed or deployed. At the time this report was prepared, a separate local SVG file, `assets/images/3D Social Media Marketing Dashboard.svg`, was present but untracked and was not referenced by either website page. That local file is therefore not part of the deployed version.

## 2. What the website is for

The website is ZATONA's public-facing agency landing page. Its main goals are to:

1. Introduce ZATONA and its “Build • Innovate • Grow” brand promise.
2. Describe the agency's digital services in English and Arabic.
3. Explain available service packages, prices, limits, and conditions.
4. Encourage a potential client to start a project inquiry.
5. Provide an honest place for future approved portfolio work without inventing clients or results.

The intended audience is people or businesses considering digital marketing, customer-support, advertising, design, or career-profile services.

## 3. Pages and page sections

### English page — `index.html`

The root page uses English content and left-to-right layout (`lang="en"`, `dir="ltr"`). The header links to sections on the same page and provides a link to Arabic.

### Arabic page — `ar/index.html`

The Arabic page uses Arabic content and right-to-left layout (`lang="ar"`, `dir="rtl"`). It shares the same stylesheet, scripts, and service data as the English page, and links back to English.

### Sections on both pages

1. **Header and navigation:** Logo, section links, language switch, and a compact mobile menu.
2. **Hero:** Agency introduction, “Build • Innovate • Grow” message, primary contact link, and brand illustration.
3. **About:** Short agency description and the About illustration, displayed on an olive background.
4. **Services and pricing:** Service cards, package tabs, package details, conditions, add-ons, and discounts.
5. **Selected work:** An explicit empty state. There are no approved project examples in the repository, so the site does not fabricate portfolio cards.
6. **Contact:** Inquiry form, optional direct contact links, and optional social links.
7. **Footer:** Brand lockup, slogan, copyright year, and a return-to-top link.

There are no separate **process** or **FAQ** sections in the current HTML. The navigation also does not currently link to either section.

## 4. Services and pricing content

The service catalog is stored centrally in `assets/js/site-data.js`. It currently contains five bilingual services:

| Service | What it covers |
|---|---|
| Social Media Management | Planning, content, design, scheduling, and community engagement |
| Customer Support | Messages, comments, order and booking follow-up, and complaint handling |
| Paid Advertising | Campaign setup, audience targeting, optimization, and reporting |
| Graphic Design | Social and advertising creatives, carousels, posters, and short-form video assets |
| CV & Career Services | CVs, bilingual CVs, cover letters, and LinkedIn profile support |

Each service has localized names and descriptions, highlights, a visual, package details, and service conditions. The pricing data also includes:

- Three monthly social-media management packages.
- Three monthly customer-support packages.
- Four paid-advertising management tiers based on ad-budget ranges.
- Individual graphic-design services and design bundles.
- Individual career services and a complete career package.
- Optional add-ons and subscription discounts, with a stated maximum combined discount.

Prices and ad-budget examples are expressed in EGP. Specific quantities, limits, included work, turnaround expectations, and exclusions are encoded in the data file and are presented on the page when a visitor selects a service.

The JavaScript builds service cards and pricing tabs from this shared data. This avoids maintaining separate service and price copies in the two HTML pages.

## 5. How the code is organized

| Path | Purpose |
|---|---|
| `index.html` | English document structure, page copy, metadata, form, and asset references |
| `ar/index.html` | Arabic/RTL equivalent of the English page |
| `assets/css/styles.css` | Shared colors, typography, section layouts, cards, form styling, breakpoints, and reduced-motion behavior |
| `assets/js/site-data.js` | Bilingual service/pricing catalog, request-form options and canonical values, and optional contact/social settings |
| `assets/js/config.js` | Single public configuration location for the Apps Script web-app endpoint |
| `assets/js/main.js` | Menu, service/pricing rendering, three-step request form, validation, confirmation handling, contact links, and scroll/reveal interactions |
| `google-apps-script/Code.gs` | Apps Script endpoint, server-side validation, spreadsheet initialization, locking, row writes, and retry handling |
| `google-apps-script/Code.test.js` | Local Node.js tests using mocked Apps Script/Sheets services |
| `GOOGLE_APPS_SCRIPT_SETUP.md` | Spreadsheet, deployment, endpoint configuration, privacy, and end-to-end test instructions |
| `README.md` | Project overview, content-editing guidance, request-form setup, and GitHub Pages publishing notes |
| `PROJECT_REPORT.md` | This report |

The two HTML pages contain the primary page structure. The service and pricing areas are initially empty containers and are populated by JavaScript after the shared data loads.

## 6. Brand system and assets

### Brand colors

The central CSS variables define the brand palette:

| Variable | Color | Role |
|---|---|---|
| `--color-primary` | `#35452D` | Dark olive, prominent brand color |
| `--color-background` | `#F3EFE4` | Warm cream page and card background |
| `--color-secondary` | `#78836A` | Sage/light olive accents |
| `--color-muted` | `#DCD4C2` | Muted beige surfaces and borders |
| `--color-text` | `#25291F` | Dark body text |

The design direction is restrained and editorial: large headings, neutral backgrounds, olive sections, fine borders, and soft illustrations.

### Runtime assets used by the pages

- `assets/branding/`: horizontal dark logo, horizontal light logo, and compact mark. The header switches to the mark at the mobile breakpoint; the footer uses the light logo on a dark background.
- `assets/favicon/`: SVG favicon, ICO fallback, and Apple touch icon.
- `assets/images/hero-visual.svg`: main hero illustration; loaded eagerly because it is above the fold.
- `assets/images/about-zatona.svg`: About illustration. The deployed version embeds the supplied PNG artwork inside the SVG so it does not depend on a path on someone's computer.
- `assets/images/3D Social Media Marketing Dashboard.png`: supplied PNG source image for the About artwork. The page uses the embedded copy in the SVG rather than referencing this PNG directly.
- `assets/images/services/`: five service-card WebP illustrations and a sixth optional photography/video illustration.
- `assets/social/og-image.png`: social-sharing preview image referenced by Open Graph and Twitter metadata.

Below-the-fold About and service images use lazy loading. Image elements provide intrinsic width and height, and CSS preserves their aspect ratios.

### Supplied source and alternate assets

- `ZATONA_Assets_Pack/` preserves the supplied brand package, including multiple logo variants, favicon exports, hero/About artwork, three abstract service SVGs, and social-preview formats.
- `assets/services/service-visual-01.svg` through `service-visual-03.svg` are available generic SVG illustrations. The current service cards use the more specific WebP images instead.
- `assets/images/extras/services-visual-overview.webp` is present but is not referenced by the current page scripts.
- The service asset source package under `assets/ZATONA_Service_Visual_Assets/` includes the README, implementation notes, five primary service visuals, an optional photo/video visual, and an overview image.
- No approved portfolio project images are present. The source brand package describes its portfolio directory as a placeholder, but an empty directory itself is not represented as a tracked file.
- No self-hosted font files are present.
- A newer local file, `assets/images/3D Social Media Marketing Dashboard.svg`, was untracked at report time and not referenced by the site. It will not be published unless it is intentionally added and integrated.

## 7. Interactive behavior

`assets/js/main.js` provides:

- Mobile navigation open/close behavior, including closing after following a link and closing with Escape.
- Language selection based on the document's `lang` attribute.
- Service-card creation and localized image descriptions.
- Pricing tabs that replace the displayed package panel for the selected service.
- Service-card links that select the corresponding pricing tab and scroll to pricing.
- Package quotation links that preselect the service in the contact form.
- Optional `mailto:`, telephone, WhatsApp, and social links when their values are configured.
- A bilingual three-step company, contact-person, and project request form with localized choices, field-level validation, live summary counter, and progress indicator.
- Service-dependent package choices and a conditional monthly advertising-budget field.
- Native form POST to a hidden iframe, with a one-time nonce-checked Apps Script response; no Google credentials are sent to the browser.
- A hidden honeypot, minimum completion-time check, submission token, and server-side validation/locking intended to limit basic spam and duplicate rows.
- Current-year display and optional scroll-triggered reveal/active-navigation effects.

The script respects the system's reduced-motion preference for animations and reveal behavior.

## 8. Responsive behavior and accessibility

The layout uses CSS grid and flexbox, fluid `clamp()` sizing, and logical spacing properties. The key responsive breakpoints are:

- **800px:** Tablet adjustments, including a two-column service grid.
- **620px:** Mobile navigation, stacked hero and section layouts, single-column service cards/forms, and compact header logo.

Accessibility features include document language and direction, labeled form controls, visible keyboard focus styles, a skip link, semantic section headings, status announcements for form feedback, accessible tab labels/states, meaningful illustration alt text, and a reduced-motion mode.

The project has no build system or full automated browser suite. The Apps Script logic can be checked locally with `node --test google-apps-script/Code.test.js`; those mocks do not validate Google account permissions or a deployed integration. The website is plain HTML/CSS/JavaScript and can be served as static files.

## 9. Hosting, paths, and metadata

Asset references are relative to each page location: the English page uses `./assets/...`, while the Arabic page uses `../assets/...`. This supports hosting from the repository root or a GitHub Pages repository subpath.

Both pages declare:

- Page title and description.
- Open Graph title, description, image, and type.
- Twitter card, title, description, and image.
- SVG and ICO favicon references plus an Apple touch icon.

The site does not currently declare a canonical URL or `og:url`. In the Arabic page, the same `og:image` metadata line appears twice; one copy is redundant.

The stylesheet imports Manrope, DM Sans, and Noto Sans Arabic from Google Fonts, with local system fallback fonts. As a result, the preferred fonts require a network connection to Google Fonts; the page still has fallback fonts if that request is unavailable.

## 10. Current limitations and unfinished setup

1. **Google Sheets delivery is not active.** `assets/js/config.js` has an empty `appsScriptUrl`. The Apps Script source exists, but it has not been installed in a Google account, authorized, deployed, or connected to a private spreadsheet. The form correctly reports that it has not sent the request while the endpoint is blank.
2. **The integration has not been tested end-to-end.** No Google account, deployed endpoint, or owner-controlled Sheet was supplied. Do not claim a request was received until a live test from both language pages produces the matching row in the Sheet.
3. **Direct contact details are not configured.** Email, phone, and WhatsApp values are blank.
4. **Social links are not configured.** The `socials` array is empty.
5. **Portfolio content is intentionally empty.** The website says approved work will be added when it is ready; this is more accurate than publishing fictional projects.
6. **No process or FAQ section exists yet.** These would need approved copy and corresponding bilingual page sections if they are wanted.
7. **JavaScript is required for the service, pricing, and request-form choices.** The static HTML has empty service/pricing containers and request options are populated from the shared data object.
8. **The Apps Script web-app endpoint is public by design.** Server validation, honeypot, a minimum completion-time check, idempotency, and a lock reduce basic abuse and duplicate writes, but they are not a full CAPTCHA or IP rate limiter. The setup guide calls this out.
9. **The About SVG is comparatively large.** Its embedded PNG makes the SVG approximately 1.6 MB. Embedding makes the illustration portable and reliable, but an optimized WebP or separately hosted image could reduce transfer size if visual quality is retained.
10. **Some assets are retained but unused.** This includes the generic service SVGs and the service-overview image. They are not loaded by the current pages.
11. **Social metadata can be completed.** Add a canonical link and `og:url` once the preferred canonical site URL is confirmed; the Arabic page also currently contains a duplicate `og:image` entry.
12. **A local SVG is not published.** `assets/images/3D Social Media Marketing Dashboard.svg` was untracked and unreferenced at report time. It is not part of the deployed site.

## 11. Where to make common updates

| Change needed | Primary file(s) |
|---|---|
| Change English page text or layout structure | `index.html` |
| Change Arabic page text or layout structure | `ar/index.html` |
| Change colors, type sizes, spacing, layout, or breakpoints | `assets/css/styles.css` |
| Change approved services, descriptions, packages, prices, conditions, add-ons, or discounts | `assets/js/site-data.js` |
| Change menu, service/pricing interactions, form behavior, or rendered links | `assets/js/main.js` |
| Replace the hero, About, logo, favicon, service, or social-preview artwork | Corresponding file under `assets/` and its references in HTML/data |
| Configure inquiry delivery | Follow `GOOGLE_APPS_SCRIPT_SETUP.md`, deploy the web app, and set its `/exec` URL in `assets/js/config.js` |
| Add approved contact or social channels | Configure `contact` and `socials` in `assets/js/site-data.js` |
| Add real portfolio work | Add only approved project images and copy; update both language pages |

When public-facing content is changed, update English and Arabic together and preserve matching section IDs and navigation behavior.

## 12. Overall assessment

The repository is a small, framework-free static agency website with a separately deployed Apps Script backend planned for client requests. It has the core brand presentation, two languages, five service categories, pricing detail, responsive layouts, and a developed but not yet activated request workflow. Portfolio and contact details remain honest placeholders.

The most important next operational step is for the account owner to deploy the Apps Script, authorize access to the private Sheet, configure the endpoint URL, and complete the documented English and Arabic end-to-end checks. The most useful content step is adding only approved work examples and any finalized FAQ/process content. The most useful technical follow-up is reviewing the large About illustration for a smaller web-optimized delivery format.
