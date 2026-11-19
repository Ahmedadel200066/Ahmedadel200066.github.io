# ZATONA request form: Google Sheets setup

This guide connects the static GitHub Pages form to a private Google spreadsheet through Google Apps Script. It does not deploy anything to a Google account automatically. The site must not be described as accepting requests until the owner completes the deployment and verifies a real test row.

## Architecture and confirmation

The browser submits a standard URL-encoded HTML form to the Apps Script web app, targeting a hidden iframe. This avoids frontend Google credentials and does not rely on a cross-origin `fetch()` response or an opaque `no-cors` response. After validation and a successful spreadsheet write, Apps Script returns a small HTML response that posts the generated Request ID to the page. The page checks the response origin and a one-time random nonce before showing success.

If the app cannot confirm the save, the form keeps its values and shows an error instead of success. Repeating an unchanged submission uses the same client idempotency token; the backend serializes writes with `LockService`, derives a request ID for that token, checks for an existing row, and keeps a short-lived cache entry to make retries safe.

The Apps Script URL is a public endpoint, not a credential. It is stored in one place, `assets/js/config.js`. The spreadsheet ID is stored only in Apps Script Script Properties; it is not included in website source.

## 1. Create and initialize the private spreadsheet

1. Sign in to the Google account that should own ZATONA's requests.
2. Open [script.google.com](https://script.google.com/) and create a standalone Apps Script project.
3. Give the project a recognizable name, such as **ZATONA Client Request API**.
4. Replace the starter file contents with `google-apps-script/Code.gs` from this repository.
5. Save the project.
6. In the function selector, choose `initializeSpreadsheet` and click **Run**.
7. Review the requested Google Sheets permission and authorize it as the intended owner.
8. In Google Drive, confirm that **ZATONA - Client Requests** was created. Open it and confirm it is private and has a `Requests` worksheet with the 17 columns listed below.

The initializer stores the spreadsheet ID in the Apps Script project's Script Properties and sets the spreadsheet timezone to `Africa/Cairo`. Do not make the spreadsheet public. If a spreadsheet with the exact name already exists, the initializer does not search Drive for it; it creates and stores a new one. Use the ID of an existing authorized spreadsheet only by deliberately setting `ZATONA_SPREADSHEET_ID` in the Apps Script project's Script Properties before initialization.

## 2. Deploy the Apps Script web app

1. In the Apps Script editor, choose **Deploy → New deployment**.
2. Select **Web app** as the deployment type.
3. Set **Execute as** to the spreadsheet-owning account.
4. Set **Who has access** to **Anyone** if public website visitors must be able to submit without signing in. If the Google account does not permit anonymous web apps, deployment must be arranged under an account or Workspace policy that does.
5. Click **Deploy**, complete any authorization prompt, and copy the deployment URL ending in `/exec`.
6. Do not copy the spreadsheet URL or spreadsheet ID into the website.

For code updates later, create a new Apps Script version and update the deployment to that version. The `/exec` URL normally remains the same for an existing deployment.

### Public endpoint warning

An anonymous client form necessarily exposes its Apps Script endpoint URL to website visitors. The endpoint accepts only the form's allowlisted fields and validates them server-side, rejects a filled honeypot, requires a short minimum form-completion time, checks an idempotency token, and serializes writes. It does not expose spreadsheet read access or credentials. These measures reduce accidental duplicates and basic bot noise, but they are not a full CAPTCHA or per-IP abuse-control system. Apps Script web-app events do not provide a dependable visitor IP address for rate limiting. If the endpoint is abused, pause the deployment and add a trusted CAPTCHA or a separate rate-limited backend before reopening it.

## 3. Configure the website URL

In [assets/js/config.js](./assets/js/config.js), set the single `appsScriptUrl` value to the deployed `/exec` URL:

```js
window.ZATONA_CONFIG = {
  appsScriptUrl: "https://script.google.com/macros/s/DEPLOYMENT_ID/exec"
};
```

The endpoint URL is public configuration, not a secret. Do not add OAuth tokens, service-account keys, spreadsheet credentials, or private account data to this file.

The Apps Script response origin is restricted in `ALLOWED_PARENT_ORIGINS` near the top of `google-apps-script/Code.gs`. The current entries cover the confirmed GitHub Pages site and the local preview at port `8765`. If the website moves to a custom domain or the local preview port changes, add the exact new origin to that server-side allowlist, save, and update the web-app deployment.

## 4. Request worksheet schema

The `Requests` sheet has exactly these columns, in order:

1. Request ID
2. Request Date & Time
3. Website Language
4. Company Name
5. Company Industry
6. Company Size
7. Company Website
8. Contact Person Name
9. Contact Person Job Title
10. Contact Person Email
11. Contact Person Phone
12. Requested Service
13. Requested Package
14. Estimated Budget
15. Advertising Budget (if applicable)
16. Project Summary
17. Request Status

The server creates the header row for an empty worksheet. It writes the timestamp as a date value, sets the spreadsheet timezone to `Africa/Cairo`, creates Request IDs in the form `ZA-YYYYMMDD-XXXXXXXX`, and sets the status to `New`. The company industry, company size, job title, service, package, and budget fields are stored as canonical values, not translated labels.

## 5. Safe end-to-end verification

Do not use real client or personal information for the first check. Use clearly marked test details, such as company name **TEST — ZATONA integration check** and a test mailbox/phone controlled by the owner.

1. Configure the URL and publish the website change to the site owner-approved branch.
2. Open the live English form and submit a valid test request.
3. Confirm the page shows a success state only after receiving the Apps Script response, and record its Request ID.
4. Open the private spreadsheet and confirm exactly one matching row, a server-generated Cairo date/time, canonical values, and `New` status.
5. Open the Arabic page and submit a second clearly marked test request. Confirm the language is `ar`, labels are Arabic, values remain canonical, and one row is added.
6. Retry an unchanged test request after forcing a timeout or temporarily interrupting the response. Confirm the Request ID is reused and no duplicate row is added.
7. After verification, remove test rows only if the spreadsheet owner explicitly approves their deletion. Otherwise leave them clearly marked as test data.

Do not report a production integration as complete until these checks have been done against the actual deployed website and Google Sheet.

## 6. Test checklist

The Apps Script logic also has local Node.js mock tests. From the repository root, run:

```sh
node --test google-apps-script/Code.test.js
```

These tests verify validation, canonical data, schema setup, generated IDs, timestamp values, and retry behavior against mocked Google services. They do not replace the live deployment and spreadsheet checks below.

### Frontend checks

- [ ] English labels, options, LTR direction, and progress steps.
- [ ] Arabic labels, translated options, RTL direction, and progress steps.
- [ ] Required fields on each step block progress and focus the first invalid field.
- [ ] Invalid email, malformed website/social URL, and invalid international phone number show field-level messages.
- [ ] Back/Continue preserves the values entered on each step.
- [ ] Company industries, company sizes, job titles, service labels, and budget options submit canonical values.
- [ ] Package options change for all five services and the Other/Custom choice.
- [ ] Graphic-design individual items and bundles are available.
- [ ] Career individual options and the complete package are available.
- [ ] Advertising spend appears only for Paid Advertising and is separate from the service budget.
- [ ] Project summary enforces its 20–2,000 character range and updates the live counter.
- [ ] A rapid double click cannot start two browser submissions.
- [ ] No endpoint or an invalid endpoint produces a configuration error, not success.
- [ ] Backend errors/timeouts retain entered values and allow retry.
- [ ] Success UI appears only after a response with the matching nonce and Request ID.
- [ ] The responsive layout is usable at phone, tablet, and desktop sizes and with reduced motion.

### Backend checks (require the owner's deployed script and private sheet)

- [ ] Empty sheet receives the exact header row.
- [ ] Missing required fields, unsupported canonical values, invalid email/URL/phone, too-long fields, and forged package/service combinations are rejected.
- [ ] A filled honeypot is rejected without adding a row.
- [ ] Advertising budget is required only for Paid Advertising.
- [ ] The server generates a Cairo-dated Request ID and date value.
- [ ] Request status is `New`.
- [ ] A valid submission adds one 17-cell row; an unchanged retry adds no row and returns the same ID.
- [ ] Concurrent submissions do not overwrite or interleave rows.
- [ ] Browser-visible errors contain no spreadsheet ID, stack trace, or private server details.
- [ ] A clearly marked test submission from both published language pages appears in the private sheet.

The browser and server checks above have **not** been run against a deployed Apps Script deployment from this repository. No Google account, spreadsheet, or web-app endpoint was supplied, and this project does not deploy to the user's Google account.

## 7. Data handling

The form collects company information and contact details so ZATONA can review a service request. The form displays a notice explaining this purpose. The sheet should remain private and be shared only with people authorized to handle inquiries. Do not place client data in source files, browser storage, URL parameters, or console logs.

The endpoint uses a client-generated random token only to make retries idempotent; it does not persist visitor credentials. The spreadsheet contains the submitted lead information and should be handled according to the owner's retention and privacy policy.
