# ZATONA / زتونة

A bilingual, static landing page for ZATONA, built with HTML, CSS, and vanilla JavaScript. It can be hosted directly on GitHub Pages.

## Pages

- `index.html` — English (left-to-right)
- `ar/index.html` — Arabic (right-to-left)

Both pages use shared styles and scripts in `assets/`. Their content is kept in HTML so the pages remain readable without JavaScript.

## Brand assets

The supplied source package is preserved in `ZATONA_Assets_Pack/`; the files used by the site are served from `assets/branding/`, `assets/favicon/`, `assets/images/`, `assets/services/`, and `assets/social/`.
The hero and About illustrations and the social preview are integrated. No portfolio project images or self-hosted fonts were supplied.
The approved service catalog and pricing are maintained in `assets/js/site-data.js`. Primary service visuals are in `assets/images/services/`; the optional photography/video visual is in the same directory.

## Updating approved content

Edit `assets/js/site-data.js` to add finalized services, contact details, and social links. Do not add placeholder accounts, unapproved work, or unconfirmed contact information.

Service, price, and request-form data are stored in one shared object. A service shown in the request form needs a stable `requestValue`, translated `requestName`, and canonical package values. Use `requestPackages` when visitors need to choose individual items within a grouped pricing card. The request-form taxonomies and canonical values are in `window.ZATONA_SITE_DATA.requestForm`; keep these values consistent with the server allowlists in `google-apps-script/Code.gs`.

Each service entry needs English and Arabic values:

```js
{
  requestValue: "approved_service_key",
  requestName: { en: "Approved request label", ar: "اسم الخدمة المعتمد" },
  name: { en: "Approved service name", ar: "اسم الخدمة المعتمد" },
  description: { en: "Approved description.", ar: "وصف الخدمة المعتمد." },
  visual: "service-visual-01.svg" // optional; only when relevant
}
```

Email, phone, and WhatsApp values are optional. Set WhatsApp to the full international number (digits; no `+` or spaces). Social entries use a display label and a full URL:

```js
contact: {
  email: "hello@example.com",
  phone: "+000 000 0000",
  whatsapp: "0000000000"
},
socials: [
  { label: "Instagram", url: "https://www.instagram.com/your-approved-account" }
]
```

When adding public-facing content, update both language pages and keep their section structure and IDs in sync.

## Client request form

The bilingual three-step request form submits URL-encoded form data to a Google Apps Script web app. The `payload` parameter contains the JSON object with the agreed company, contact, and project fields. The browser follows the Apps Script redirect and reads its JSON response; success is shown only when the response is readable and contains `success: true`. An opaque response, network error, malformed JSON, or server error never produces a success message.

The public endpoint URL is configured in `assets/js/config.js`. Form values use stable canonical values and a centralized state object. A session-scoped draft preserves entries when moving between steps or switching language pages; it is cleared only after confirmed success or when the user starts a new request. An in-progress browser submission is guarded against repeat clicks. On an ambiguous timeout the form retains its values and asks the visitor to contact ZATONA before retrying, since the server may have saved the request without the browser receiving its response.

The website sends the exact JSON property names `companyName`, `industry`, `companySize`, `companyWebsite`, `contactName`, `jobTitle`, `email`, `phone`, `requestedService`, `requestedPackage`, `estimatedBudget`, `projectSummary`, `language`, and `website`. `website` is the empty honeypot value for a legitimate visitor. The serial number and submission timestamp are not sent by the browser. Do not add spreadsheet credentials, OAuth secrets, or private account data to this static website. The website endpoint is public by design.

The Apps Script code and spreadsheet schema must match the deployed endpoint contract. See [GOOGLE_APPS_SCRIPT_SETUP.md](./GOOGLE_APPS_SCRIPT_SETUP.md) for the agreed column layout, response requirements, and live verification notes. Do not deploy a different Apps Script source version over the working web app without checking its schema and endpoint behavior.

The repository's earlier Apps Script source has isolated Node.js mock tests; run them with `node --test google-apps-script/Code.test.js`. They do not verify the supplied live endpoint, its A:M schema, or a real spreadsheet.

## Publish

In the repository settings, enable GitHub Pages for the branch and folder containing these files (the repository root). Asset and navigation links are page-relative so they work from both a user site and a repository subpath. Canonical metadata is intentionally omitted until the deployed website URL is confirmed.
