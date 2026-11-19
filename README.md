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

The bilingual three-step request form is designed to submit through a browser-native form POST to a Google Apps Script web app. It targets a hidden iframe and waits for an explicit, nonce-checked backend confirmation before showing success. The endpoint URL is configured once in `assets/js/config.js`. While it is blank, the form validates but displays a configuration error and does not claim that a request was sent.

The server-side source is `google-apps-script/Code.gs`. Follow [GOOGLE_APPS_SCRIPT_SETUP.md](./GOOGLE_APPS_SCRIPT_SETUP.md) to create the private spreadsheet, initialize its exact schema, deploy the web app, configure the public endpoint URL, and run clearly marked test submissions. Do not add spreadsheet credentials, OAuth secrets, or private account data to this static website. The website endpoint is publicly visible by design; the setup guide documents the resulting abuse limitations and required verification.

The Apps Script logic has isolated Node.js mock tests; run them with `node --test google-apps-script/Code.test.js`. They do not verify a real Google account, deployed web app, or spreadsheet.

## Publish

In the repository settings, enable GitHub Pages for the branch and folder containing these files (the repository root). Asset and navigation links are page-relative so they work from both a user site and a repository subpath. Canonical metadata is intentionally omitted until the deployed website URL is confirmed.
