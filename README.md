# ZATONA / زتونة

A bilingual, static landing page for ZATONA, built with HTML, CSS, and vanilla JavaScript. It can be hosted directly on GitHub Pages.

## Pages

- `index.html` — English (left-to-right)
- `ar/index.html` — Arabic (right-to-left)

Both pages use shared styles and scripts in `assets/`. Their content is kept in HTML so the pages remain readable without JavaScript.

## Brand assets

The supplied source package is preserved in `ZATONA_Assets_Pack/`; the files used by the site are served from `assets/branding/`, `assets/favicon/`, `assets/images/`, `assets/services/`, and `assets/social/`.
The hero and About illustrations and the social preview are integrated. The service catalog remains empty, so generic service illustrations are not assigned to unconfirmed services. No portfolio project images or self-hosted fonts were supplied.

## Updating approved content

Edit `assets/js/site-data.js` to add finalized services, contact details, and social links. Do not add placeholder accounts, unapproved work, or unconfirmed contact information.

Each service entry needs English and Arabic values:

```js
{
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

## Contact form

The bilingual form submits asynchronously to Formspree and does not navigate away from the site. To enable it, set `formspreeEndpoint` in `assets/js/site-data.js` to the actual public form endpoint, for example `https://formspree.io/f/your-form-id`. The endpoint provided in the project request was a placeholder, so the repository intentionally leaves this value blank. While blank, the form validates locally and displays an explicit not-configured message without sending data.

The form sends the name, email, service interest, optional budget, message, and `_gotcha` honeypot field. The selected service list is populated from the `services` configuration; the “not sure yet” option remains available until services are finalized. Formspree's endpoint is public configuration, not a private API key. Do not add private credentials to this static website.

After adding the real endpoint, submit a test inquiry in both languages and verify receipt in the Formspree account before treating delivery as active. An unset endpoint cannot be tested as a live integration.

## Publish

In the repository settings, enable GitHub Pages for the branch and folder containing these files (the repository root). Asset and navigation links are page-relative so they work from both a user site and a repository subpath. Canonical metadata is intentionally omitted until the deployed website URL is confirmed.
