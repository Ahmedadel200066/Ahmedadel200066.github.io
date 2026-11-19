# ZATONA Website — Project Report

**Last updated:** November 20, 2026
**Project:** ZATONA — Build • Innovate • Grow
**Repository:** `Ahmedadel200066/Ahmedadel200066.github.io`
**Production site:** <https://ahmedadel200066.github.io/>
**Published branch and revision:** `main`, `d54e7ab`

## 1. Executive summary

This repository contains ZATONA's public bilingual agency website and the source of an earlier Google Apps Script implementation for client inquiries. The website is a static, framework-free frontend made from HTML, CSS, and vanilla JavaScript; GitHub Pages serves it, and there is no website application server or build step.

The site introduces the agency, explains five service categories and their prices, provides English and Arabic versions, and lets prospective clients submit a three-step project request. Service and pricing content is data-driven and localized. Portfolio work, direct contact information, and social accounts are intentionally not fabricated.

The frontend is published and configured with the Apps Script URL supplied for the project. A clearly labeled synthetic English form submission from the published site received the response required for the website to show its success screen. The private spreadsheet itself was not available for inspection, so the resulting row and the A:M-only write guarantee have not been independently verified.

**Important integration distinction:** the Apps Script file checked into this repository is an older implementation with a different request protocol and a 17-column sheet layout. It is not the source of the currently configured Apps Script web app unless its owner has separately deployed it. Do not deploy the repository's `Code.gs` over the live endpoint without first aligning it with the agreed frontend and spreadsheet contract.

## 2. Audience and purpose

The website is intended for organizations and individuals considering ZATONA's digital services. It is designed to:

1. Establish the agency's identity and explain its “Build • Innovate • Grow” positioning.
2. Present service descriptions, packages, conditions, and prices in both English and Arabic.
3. Give visitors a structured way to describe a project and request follow-up.
4. Provide an honest portfolio placeholder until approved work is available.

## 3. Pages and sections

### English — `index.html`

The root page declares English and left-to-right direction (`lang="en"`, `dir="ltr"`).

### Arabic — `ar/index.html`

The Arabic page declares Arabic and right-to-left direction (`lang="ar"`, `dir="rtl"`). It shares the stylesheet, JavaScript, and content catalog with the English page while keeping translated copy in its own HTML.

### Page structure

Both pages have these sections:

1. **Header:** responsive brand logo, anchor navigation, mobile menu, and language switch.
2. **Hero:** ZATONA introduction, headline, contact call-to-action, and hero illustration.
3. **About:** agency description, brand stamp, and About artwork.
4. **Services and pricing:** five service cards, pricing tabs and cards, service conditions, add-ons, and discounts.
5. **Selected work:** an explicit empty state; no fictional clients or projects are shown.
6. **Contact:** the three-step client request form and optional contact/social areas.
7. **Footer:** logo, slogan, copyright year, and back-to-top link.

There are no process or FAQ sections in the current HTML.

## 4. Services and commercial content

The English and Arabic catalog lives in `assets/js/site-data.js`. It currently contains five services:

| Service | Main scope | Displayed package/pricing structure |
|---|---|---|
| Social Media Management | Planning, writing, design, publishing, and engagement | Basic: EGP 4,500; Professional: EGP 8,500; Advanced: EGP 15,000 per month |
| Customer Support | Messages, comments, orders/bookings, complaint handling, and follow-up | Basic: EGP 6,500; Integrated: EGP 12,500; Advanced: EGP 24,000 per month |
| Paid Advertising | Campaign setup, targeting, optimization, and reporting | Management fees by ad-spend tier: EGP 3,000/month up to EGP 20,000 spend; EGP 5,500/month for EGP 20,001–60,000; 10% for EGP 60,001–150,000; above that by agreement |
| Graphic Design | Social and advertising creatives, print designs, carousels, and short videos | Individual services from EGP 120; design bundles from EGP 1,200 to EGP 3,000 |
| CV & Career Services | CVs, bilingual CVs, cover letters, and LinkedIn support | Individual services from EGP 250; complete career package: EGP 1,200 |

The central data file also contains the localized features and conditions for each package. Graphic design has nine selectable request items; career services has five. The form also offers a custom/unsure option.

### Shared add-ons and discounts

- Additional managed platform: EGP 1,200 monthly.
- Ten additional posts: EGP 1,800.
- Additional short video: EGP 450.
- Field photography: by agreement.
- Subscription discounts: 5% for three months, 10% for six months, and 15% for twelve months.
- Social media plus customer support has an additional 10% discount; the stated maximum combined discount is 20% of monthly service fees.

The data includes important limits and exclusions—for example, advertising spend is paid directly by the client and is not included in management fees; field photography and professional video production are not included in social packages. Update prices and quantities only from approved business information.

## 5. Repository contents and responsibilities

| Path | Purpose |
|---|---|
| `index.html` | English page structure, copy, metadata, form markup, and asset references |
| `ar/index.html` | Arabic/RTL page structure, translated copy, metadata, and form markup |
| `assets/css/styles.css` | Shared design tokens, typography, layout, responsive rules, component styling, and motion preferences |
| `assets/js/site-data.js` | Bilingual service/pricing catalog, request-form options, add-ons, discounts, contact configuration, and social links |
| `assets/js/config.js` | Public configuration for the Apps Script web-app endpoint |
| `assets/js/main.js` | Navigation, service/pricing rendering, form validation and submission, contact/social rendering, and scroll effects |
| `assets/images/` | Hero, About, service illustrations, and related image exports |
| `assets/branding/` | Runtime header/footer logos and mobile mark |
| `assets/favicon/` | Runtime SVG/ICO favicon and Apple touch icon |
| `assets/social/` | Runtime Open Graph preview image |
| `assets/services/` | Three generic source-package SVG service illustrations; not used by current service cards |
| `ZATONA_Assets_Pack/` | Preserved supplied brand package, including source logo variants, favicon exports, illustrations, and social preview files |
| `assets/ZATONA_Service_Visual_Assets/` | Preserved service-visual source package, README, implementation notes, six service visuals, and overview image |
| `google-apps-script/Code.gs` | Earlier Apps Script endpoint source; its schema/protocol differs from the current frontend contract |
| `google-apps-script/Code.test.js` | Node.js mock tests for the checked-in Apps Script source |
| `README.md` | Project setup, content-editing, form, and publishing guidance |
| `GOOGLE_APPS_SCRIPT_SETUP.md` | Frontend request contract, intended sheet mapping, endpoint notes, and verification instructions |
| `PROJECT_REPORT.md` | This repository and project report |
| `favicon.svg` | Additional root-level favicon file; the pages reference the copies under `assets/favicon/` |

There is no package manifest, framework, transpiler, bundler, or generated build directory. The checked-in files are served as static assets.

## 6. Brand assets and visual identity

The CSS variables in `assets/css/styles.css` define the core palette:

| Variable | Color | Use |
|---|---|---|
| `--color-primary` | `#35452D` | Dark olive |
| `--color-background` | `#F3EFE4` | Warm cream |
| `--color-secondary` | `#78836A` | Sage/light olive |
| `--color-muted` | `#DCD4C2` | Muted beige |
| `--color-text` | `#25291F` | Primary text |

The design uses an editorial/minimal direction: large headings, cream and olive surfaces, restrained borders, and abstract brand artwork.

### Assets used at runtime

- Header: `assets/branding/zatona-logo-horizontal.svg`, changing to `zatona-logo-mark.svg` at the mobile breakpoint.
- Footer: `assets/branding/zatona-logo-horizontal-light.svg`.
- Hero: `assets/images/hero-visual.svg`; eager/high-priority because it is above the fold.
- About: `assets/images/about-zatona.svg`, lazy-loaded. It embeds the supplied 1672×941 PNG artwork and is approximately 1.6 MB.
- Service cards: the first five service-specific WebP illustrations in `assets/images/services/`.
- Pricing add-ons: `06-photo-video-production.webp`, lazy-loaded.
- Sharing image: `assets/social/og-image.png` (1200×630).
- Browser icons: SVG favicon, ICO fallback, and Apple touch icon in `assets/favicon/`.

The service-card and add-on images are generated by JavaScript with explicit dimensions and lazy loading. The hero is not lazy-loaded. The About SVG's embedded raster art makes it portable, but its file size is a performance consideration.

### Assets retained but not used by the current pages

- `assets/services/service-visual-01.svg` through `service-visual-03.svg`: generic illustrations; the page instead uses service-specific WebP images.
- `assets/images/extras/services-visual-overview.webp`: overview image not referenced by the page.
- `assets/images/3D Social Media Marketing Dashboard.png` and `.svg`: retained source/export copies; the About section references the composite `about-zatona.svg`.
- `ZATONA_Assets_Pack/` contains source logo variants, PNG exports, favicon app-size exports, the SVG social preview, and three generic service SVGs. Runtime uses only selected, copied/served versions.
- The source package's portfolio and fonts directories are documented as empty placeholders; no approved project-image set or self-hosted font files is present.

No portfolio cards, client names, testimonials, results, or statistics have been invented.

## 7. Frontend behavior

`assets/js/main.js` provides:

- Mobile navigation toggling, close-on-link, and Escape-key handling.
- Localized service cards, package tabs, conditions, add-ons, and discounts.
- Service-card links that select the corresponding pricing tab.
- Package quotation links that preselect the service in the request form.
- A three-step request form: company, contact person, and project details.
- Dynamic industry, company-size, job-title, budget, service, and package choices.
- Conditional ad-spend input for paid-advertising requests.
- Required-field, email, URL, phone, and minimum-summary-length validation; a live character count; field-level error messages; and localized progress/status text.
- Draft persistence in `sessionStorage` while moving between steps/pages, and retention on failure. Draft data is cleared only after a confirmed success or when the visitor starts a new request.
- A honeypot named `website`, which is sent empty for legitimate submissions.
- A request-in-progress guard against concurrent/double-click submissions. A UUID submission token is sent separately as retry metadata, not inside the JSON payload.
- Scroll reveal and active-navigation behavior when supported, respecting `prefers-reduced-motion`.
- Current-year display and optional `mailto:`, telephone, WhatsApp, and social links.

The script uses `assetsBase` derived from the loaded script URL to build image paths for both page locations. This supports GitHub Pages repository subpaths.

## 8. Client request form and Apps Script status

### Current frontend request

The frontend endpoint is configured in `assets/js/config.js`:

`https://script.google.com/macros/s/AKfycbx3Qjgl6jTR3Kmvpt-afHC0Q5IiVjbU65DgCStO8-2WuehAvn3A_tliZ6xhQAMqutrgRg/exec`

The browser sends an `application/x-www-form-urlencoded` POST with a `payload` parameter containing JSON. The JSON has exactly these properties:

`companyName`, `industry`, `companySize`, `companyWebsite`, `contactName`, `jobTitle`, `email`, `phone`, `requestedService`, `requestedPackage`, `estimatedBudget`, `projectSummary`, `language`, and `website`.

`website` remains empty as the honeypot. The browser does not send a serial number or timestamp. The submission token is a separate URL-encoded parameter. Since there is no separate advertising-budget field in the agreed JSON contract, a selected ad-spend range is appended as a labeled line in `projectSummary`.

The website shows success only after parsing a readable response with `success: true`. An opaque response, invalid JSON, network/HTTP error, or timeout does not show success. A timeout preserves the form values and tells the visitor to contact ZATONA before retrying because the server may have received the request.

### Intended external Google Sheet mapping

The external sheet contract described in `GOOGLE_APPS_SCRIPT_SETUP.md` is:

| Column | Intended value |
|---|---|
| A | Apps Script-generated serial number |
| B | Company name |
| C | Company industry |
| D | Company size |
| E | Company website |
| F | Contact name |
| G | Job title |
| H | Email |
| I | Phone |
| J | Requested service and package |
| K | Estimated budget |
| L | Project summary |
| M | Server-generated date/time |

The agreement is to preserve the existing merged headings in row 1 and headers in row 2, append submissions from row 3, and never write after column M.

### Repository source and external endpoint are not the same verified artifact

The checked-in `google-apps-script/Code.gs` currently:

- Expects separate flat Apps Script parameters plus `parentOrigin`, `responseNonce`, `formStartedAt`, and `honeypot`; it does not parse the frontend's `payload` JSON.
- Returns HTML using a `postMessage` confirmation, whereas the current frontend expects readable JSON with `success: true`.
- Defines 17 headers, including request status and advertising budget, instead of the agreed A:M 13-column layout.
- Creates a spreadsheet named `ZATONA - Client Requests` and a `Requests` worksheet if no spreadsheet ID is configured in script properties; it initializes or checks its own header row.
- Uses the `Africa/Cairo` timezone, a script lock, UUID-based request IDs, and a cache intended to make retries idempotent.

Therefore, the repository source must **not** be redeployed over the currently configured external web app without first reconciling its contract and spreadsheet behavior. The user-managed live Apps Script source is not stored here and was not inspected.

### Real-site check performed

- From the published English GitHub Pages site, a synthetic request labeled **ZATONA Website Integration Test** was submitted using an `example.com` test email. The page displayed the success confirmation; this indicates the frontend received a readable success response matching its `success: true` check.
- The published Arabic page was loaded separately and verified to initialize in RTL with its localized options and the configured endpoint. An Arabic submission was not made.
- The private Google Sheet was not accessible for independent confirmation. The test row's existence, its serial/timestamp, preservation of rows 1–2, and the no-writes-after-M guarantee remain unverified. The test request may have been recorded by the endpoint; remove any test row only with the sheet owner's approval.
- The local Apps Script tests validate the checked-in older `Code.gs`, not the live external endpoint or its actual spreadsheet.

## 9. Responsive design, accessibility, and performance

The shared stylesheet uses CSS Grid/Flexbox, fluid `clamp()` sizing, logical properties, and a content width capped at 1440px. Main responsive breakpoints are:

- **800px:** tablet layout changes and reduced-column grids.
- **620px:** mobile logo and navigation, stacked hero/sections, and single-column forms/cards.
- **420px:** additional narrow-phone adjustments.

The HTML includes viewport metadata, semantic headings/sections, labeled controls, a skip link, language/direction attributes, and useful image alternatives. Interactive tabs and form feedback expose accessible labels/state; focus-visible styling and reduced-motion handling are included.

Performance measures include SVG logos and hero art, WebP service illustrations, lazy loading for below-the-fold imagery, explicit image dimensions, and asynchronous image decoding. The CSS imports Manrope, DM Sans, and Noto Sans Arabic from Google Fonts; the site falls back to system fonts if that external request is unavailable. Fonts are not self-hosted.

The script URLs in both HTML documents currently include `?v=37a9992`. This cache-busting query was added after the browser reused an old version of the form scripts and failed to initialize the form. When changing the JavaScript assets, update this query in both HTML files so browsers fetch the new scripts.

## 10. Hosting, metadata, and discoverability

GitHub Pages serves the root of `main` at <https://ahmedadel200066.github.io/>. Relative asset paths use `./assets/...` in English and `../assets/...` in Arabic, so they also work if the site is served from a repository subpath.

Both pages define a title, description, Open Graph title/description/image/type, Twitter card/title/description/image, SVG and ICO favicons, and an Apple touch icon. The canonical production URL is now known, but canonical-link and `og:url` metadata are not currently present. The Arabic HTML also has a duplicate `og:image` tag.

## 11. Validation and deployment

The current production branch is `main` at `d54e7ab` (November 20, 2026). The latest deployment was confirmed successful.

Checks performed for the recent integration work:

- `node --check assets/js/main.js` and `node --check assets/js/config.js` passed.
- `node --test google-apps-script/Code.test.js` passed all 3 tests. These are mocks for the repository's Apps Script source and do not reach Google Sheets.
- Published English form: a synthetic submission reached the site's confirmed-success state.
- Published Arabic form: localized form options loaded and RTL direction was active.
- The website has no full automated browser test suite or build pipeline.

## 12. Current limitations and follow-up considerations

1. **Spreadsheet row verification:** request access from the sheet owner to confirm the synthetic row, server-generated values, and A:M-only writes.
2. **Apps Script source mismatch:** reconcile the checked-in `Code.gs` with the active web app and agreed A:M contract before deploying or changing the backend.
3. **Retry idempotency:** the frontend blocks concurrent submissions and sends a token, but the live endpoint's idempotent retry behavior has not been independently checked.
4. **Contact channels:** email, phone, WhatsApp, and social links are blank in `site-data.js`; the site displays its direct-contact placeholder.
5. **Portfolio and other content:** no approved portfolio projects, process section, or FAQ section exist yet.
6. **About image weight:** `about-zatona.svg` is approximately 1.6 MB because it embeds PNG artwork; optimize only if the visual result can be preserved.
7. **SEO metadata:** add canonical and `og:url` tags now that the production URL is known, and remove the duplicate Arabic `og:image`.
8. **External font dependency:** Google Fonts needs a network connection to load the preferred typefaces; system fallbacks are available.
9. **Asset copies:** some source-package and exported images are intentionally retained but are not loaded by the current site.

## 13. Common maintenance map

| Task | Main file(s) |
|---|---|
| Edit English wording or page structure | `index.html` |
| Edit Arabic wording or page structure | `ar/index.html` |
| Change brand colors, typography, spacing, layout, or breakpoints | `assets/css/styles.css` |
| Change service descriptions, packages, prices, conditions, add-ons, discounts, or request options | `assets/js/site-data.js` |
| Change navigation, rendering, form validation/submission, or interaction behavior | `assets/js/main.js` |
| Change the public Apps Script endpoint | `assets/js/config.js` |
| Replace runtime brand, hero, About, service, favicon, or sharing artwork | Corresponding file in `assets/`, plus its HTML/data reference |
| Change Apps Script or spreadsheet behavior | Coordinate with the Apps Script owner; verify the request contract and sheet schema before deployment |
| Publish the static website | Push approved changes to the GitHub Pages source branch (`main`) |

When public content changes, update both languages and keep section IDs, service values, and request-form options consistent.
