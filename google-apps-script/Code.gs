const SPREADSHEET_NAME = "ZATONA - Client Requests";
const WORKSHEET_NAME = "Requests";
const SPREADSHEET_ID_PROPERTY = "ZATONA_SPREADSHEET_ID";
const SPREADSHEET_TIMEZONE = "Africa/Cairo";
const IDEMPOTENCY_CACHE_SECONDS = 21600;
const RESPONSE_MESSAGE_TYPE = "zatona-request-result";
const ALLOWED_PARENT_ORIGINS = [
  "https://ahmedadel200066.github.io",
  "http://127.0.0.1:8765",
  "http://localhost:8765"
];

const REQUEST_HEADERS = [
  "Request ID",
  "Request Date & Time",
  "Website Language",
  "Company Name",
  "Company Industry",
  "Company Size",
  "Company Website",
  "Contact Person Name",
  "Contact Person Job Title",
  "Contact Person Email",
  "Contact Person Phone",
  "Requested Service",
  "Requested Package",
  "Estimated Budget",
  "Advertising Budget (if applicable)",
  "Project Summary",
  "Request Status"
];

const ALLOWED_INDUSTRIES = [
  "ecommerce", "education", "healthcare", "real_estate", "hospitality",
  "technology", "professional_services", "manufacturing", "retail", "other"
];
const ALLOWED_COMPANY_SIZES = ["startup", "small", "established"];
const ALLOWED_JOB_TITLES = [
  "founder", "ceo", "marketing_manager", "business_owner", "hr_manager", "other"
];
const ALLOWED_BUDGETS = [
  "under_3000", "egp_3000_5000", "egp_5001_10000", "egp_10001_20000",
  "egp_20001_50000", "over_50000", "undecided"
];
const ALLOWED_ADVERTISING_BUDGETS = [
  "under_20000", "egp_20001_60000", "egp_60001_150000", "over_150000", "undecided"
];
const ALLOWED_PACKAGES = {
  social_media_management: [
    "basic", "professional", "advanced"
  ],
  customer_support: [
    "basic", "integrated", "advanced"
  ],
  paid_advertising: [
    "ad_spend_under_20000", "ad_spend_20001_60000",
    "ad_spend_60001_150000", "ad_spend_over_150000"
  ],
  graphic_design: [
    "social_post", "story_or_cover", "advertising_creative", "carousel_up_to_5",
    "print_poster_flyer", "short_video_up_to_30", "design_bundle_10",
    "design_bundle_20", "design_bundle_30"
  ],
  cv_career_services: [
    "professional_cv", "bilingual_cv", "cv_cover_letter",
    "linkedin_optimization", "complete_career_package"
  ],
  other_custom_request: ["not_sure", "custom_request"]
};
const ALLOWED_SERVICES = Object.keys(ALLOWED_PACKAGES);

function initializeSpreadsheet() {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const spreadsheet = getOrCreateSpreadsheet_();
    const sheet = getOrCreateRequestsSheet_(spreadsheet);
    console.log("ZATONA request spreadsheet initialized: " + spreadsheet.getUrl());
    return {
      spreadsheetName: spreadsheet.getName(),
      worksheetName: sheet.getName(),
      timezone: spreadsheet.getSpreadsheetTimeZone()
    };
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return HtmlService.createHtmlOutput(
    '<!doctype html><html><meta charset="utf-8"><title>ZATONA request endpoint</title>' +
    '<body style="font:16px sans-serif;padding:2rem;color:#25291f">' +
    '<h1>ZATONA request endpoint</h1><p>This endpoint accepts client request form submissions.</p></body></html>'
  );
}

function doPost(event) {
  const parameters = event && event.parameter ? event.parameter : {};
  const responseOrigin = getAllowedParentOrigin_(parameters.parentOrigin);
  const nonce = isUuid_(parameters.responseNonce) ? parameters.responseNonce : "";

  if (!responseOrigin || !nonce) {
    return buildResponse_({ ok: false, code: "invalid_request" }, "", "");
  }
  if (typeof parameters.honeypot === "string" && parameters.honeypot.trim()) {
    return buildResponse_({ ok: false, code: "invalid_request" }, nonce, responseOrigin);
  }

  const validation = validateSubmission_(parameters);
  if (!validation.ok) {
    return buildResponse_({ ok: false, code: "invalid_request" }, nonce, responseOrigin);
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const result = saveSubmission_(validation.value, parameters.submissionToken);
    return buildResponse_({ ok: true, requestId: result.requestId }, nonce, responseOrigin);
  } catch (error) {
    console.error("ZATONA request processing failed: " + (error && error.name ? error.name : "Error"));
    return buildResponse_({ ok: false, code: "temporarily_unavailable" }, nonce, responseOrigin);
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function validateSubmission_(parameters) {
  const value = {
    websiteLanguage: normalizeString_(parameters.websiteLanguage, 2),
    companyName: normalizeString_(parameters.companyName, 160),
    companyIndustry: normalizeString_(parameters.companyIndustry, 50),
    companySize: normalizeString_(parameters.companySize, 30),
    companyWebsite: normalizeString_(parameters.companyWebsite, 500),
    contactName: normalizeString_(parameters.contactName, 120),
    jobTitle: normalizeString_(parameters.jobTitle, 50),
    email: normalizeString_(parameters.email, 254).toLowerCase(),
    phone: normalizeString_(parameters.phone, 32),
    requestedService: normalizeString_(parameters.requestedService, 50),
    requestedPackage: normalizeString_(parameters.requestedPackage, 60),
    estimatedBudget: normalizeString_(parameters.estimatedBudget, 50),
    advertisingBudget: normalizeString_(parameters.advertisingBudget, 50),
    projectSummary: normalizeMultiline_(parameters.projectSummary, 2000),
    submissionToken: normalizeString_(parameters.submissionToken, 36)
  };

  const requiredValues = [
    value.websiteLanguage,
    value.companyName,
    value.companyIndustry,
    value.companySize,
    value.contactName,
    value.jobTitle,
    value.email,
    value.phone,
    value.requestedService,
    value.requestedPackage,
    value.estimatedBudget,
    value.projectSummary
  ];
  if (requiredValues.some(function (item) { return !item; })) return { ok: false };
  if (value.websiteLanguage !== "en" && value.websiteLanguage !== "ar") return { ok: false };
  if (!includes_(ALLOWED_INDUSTRIES, value.companyIndustry)
    || !includes_(ALLOWED_COMPANY_SIZES, value.companySize)
    || !includes_(ALLOWED_JOB_TITLES, value.jobTitle)
    || !includes_(ALLOWED_BUDGETS, value.estimatedBudget)
    || !includes_(ALLOWED_SERVICES, value.requestedService)
    || !includes_(ALLOWED_PACKAGES[value.requestedService], value.requestedPackage)) {
    return { ok: false };
  }
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value.submissionToken)) {
    return { ok: false };
  }
  if (value.projectSummary.length < 20 || !isValidEmail_(value.email) || !isValidPhone_(value.phone)) {
    return { ok: false };
  }
  if (String(parameters.companyWebsite || "").length > 500) return { ok: false };
  if (value.companyWebsite && !isValidUrl_(value.companyWebsite)) return { ok: false };
  if (value.requestedService === "paid_advertising") {
    if (!includes_(ALLOWED_ADVERTISING_BUDGETS, value.advertisingBudget)) return { ok: false };
  } else if (value.advertisingBudget) {
    return { ok: false };
  }
  if (!isPlausibleSubmissionTime_(parameters.formStartedAt)) return { ok: false };
  return { ok: true, value: value };
}

function saveSubmission_(value, token) {
  const spreadsheet = getOrCreateSpreadsheet_();
  const sheet = getOrCreateRequestsSheet_(spreadsheet);
  const submittedAt = new Date();
  const datePart = Utilities.formatDate(submittedAt, SPREADSHEET_TIMEZONE, "yyyyMMdd");
  const cache = CacheService.getScriptCache();
  let requestId = "";
  const cached = cache.get("submission_" + token);
  if (cached) {
    try {
      requestId = JSON.parse(cached).requestId || "";
    } catch (error) {
      requestId = "";
    }
  }
  if (!/^ZA-\d{8}-[A-F0-9]{8}$/.test(requestId)) {
    requestId = createRequestId_(datePart, token);
  }
  const row = buildRequestRow_(requestId, submittedAt, value);

  const existingRow = findRequestRow_(sheet, requestId);
  if (existingRow) {
    if (rowsMatchSubmission_(existingRow, row)) return { requestId: requestId };
    throw new Error("Request identifier collision.");
  }

  // Find the next available row using column A (Serial Number / Request ID) only.
  // Start at row 3 (after merged headings row 1 and headers row 2).
  // Ignore content in columns after M (manually managed columns).
  // Use getLastRow() to limit the range to actual data, not the entire sheet capacity.
  const firstDataRow = 3;
  const serialColumn = 1; // Column A

  const lastRow = sheet.getLastRow();
  if (lastRow < firstDataRow) {
    // No data rows yet, use row 3
    const serialNumber = generateNextSerialNumber_(sheet, firstDataRow);
    row[0] = serialNumber;
    sheet.getRange(firstDataRow, 1, 1, REQUEST_HEADERS.length).setValues([row]);
    cache.put(
      "submission_" + token,
      JSON.stringify({ requestId: row[0] }),
      IDEMPOTENCY_CACHE_SECONDS
    );
    return { requestId: row[0] };
  }

  // Read only column A from row 3 to lastRow with data
  const numRows = lastRow - firstDataRow + 1;
  const columnAValues = sheet.getRange(firstDataRow, serialColumn, numRows, 1).getValues();

  // Find the first row where column A is empty
  let nextRow = lastRow + 1; // Default: append after last row
  for (let i = 0; i < columnAValues.length; i += 1) {
    const cellValue = columnAValues[i][0];
    if (cellValue === "" || cellValue === null || cellValue === undefined) {
      nextRow = firstDataRow + i;
      break;
    }
  }

  // Generate the next serial number based on existing entries in column A
  const serialNumber = generateNextSerialNumber_(sheet, nextRow);
  row[0] = serialNumber;

  // Write only to columns A:M (REQUEST_HEADERS.length columns)
  sheet.getRange(nextRow, 1, 1, REQUEST_HEADERS.length).setValues([row]);
  cache.put(
    "submission_" + token,
    JSON.stringify({ requestId: requestId }),
    IDEMPOTENCY_CACHE_SECONDS
  );
  return { requestId: requestId };
}

/**
 * Generates the next serial number based on existing serial numbers in column A.
 * Serial format: ZA-YYYYMMDD-XXXXXXXX (hex sequence).
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @param {number} nextRow - The row where the new entry will be inserted
 * @return {string} The next serial number
 */
function generateNextSerialNumber_(sheet, nextRow) {
  const today = Utilities.formatDate(new Date(), SPREADSHEET_TIMEZONE, "yyyyMMdd");
  const prefix = "ZA-" + today + "-";

  // Read existing serial numbers from column A (rows 3 to nextRow - 1)
  const serialRange = sheet.getRange(3, 1, Math.max(0, nextRow - 3), 1).getValues();
  let maxSequence = 0;
  for (let i = 0; i < serialRange.length; i++) {
    const value = String(serialRange[i][0] || "").trim();
    if (value.startsWith(prefix)) {
      const sequenceStr = value.slice(prefix.length);
      const sequence = parseInt(sequenceStr, 16);
      if (!isNaN(sequence) && sequence > maxSequence) {
        maxSequence = sequence;
      }
    }
  }

  const nextSequence = maxSequence + 1;
  const sequenceHex = nextSequence.toString(16).toUpperCase().padStart(8, "0");
  return prefix + sequenceHex;
}

function buildRequestRow_(requestId, submittedAt, value) {
  return [
    requestId,
    submittedAt,
    value.websiteLanguage,
    safeSheetText_(value.companyName),
    value.companyIndustry,
    value.companySize,
    safeSheetText_(value.companyWebsite),
    safeSheetText_(value.contactName),
    value.jobTitle,
    safeSheetText_(value.email),
    safeSheetText_(value.phone),
    value.requestedService,
    value.requestedPackage,
    value.estimatedBudget,
    value.advertisingBudget,
    safeSheetText_(value.projectSummary),
    "New"
  ];
}

function createRequestId_(datePart, token) {
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    datePart + ":" + token,
    Utilities.Charset.UTF_8
  );
  const suffix = digest.slice(0, 4).map(function (byte) {
    return ("0" + ((byte + 256) % 256).toString(16)).slice(-2);
  }).join("").toUpperCase();
  return "ZA-" + datePart + "-" + suffix;
}

function getOrCreateSpreadsheet_() {
  const properties = PropertiesService.getScriptProperties();
  const savedId = properties.getProperty(SPREADSHEET_ID_PROPERTY);
  if (savedId) return SpreadsheetApp.openById(savedId);

  const spreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);
  spreadsheet.setSpreadsheetTimeZone(SPREADSHEET_TIMEZONE);
  properties.setProperty(SPREADSHEET_ID_PROPERTY, spreadsheet.getId());
  return spreadsheet;
}

function getOrCreateRequestsSheet_(spreadsheet) {
  if (spreadsheet.getSpreadsheetTimeZone() !== SPREADSHEET_TIMEZONE) {
    spreadsheet.setSpreadsheetTimeZone(SPREADSHEET_TIMEZONE);
  }
  let sheet = spreadsheet.getSheetByName(WORKSHEET_NAME);
  if (!sheet) {
    const sheets = spreadsheet.getSheets();
    const defaultSheet = sheets.length === 1 && sheets[0].getLastRow() === 0 ? sheets[0] : null;
    if (defaultSheet) {
      defaultSheet.setName(WORKSHEET_NAME);
      sheet = defaultSheet;
    } else {
      sheet = spreadsheet.insertSheet(WORKSHEET_NAME);
    }
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, REQUEST_HEADERS.length).setValues([REQUEST_HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange("B:B").setNumberFormat("yyyy-mm-dd hh:mm:ss");
  } else {
    const currentHeaders = sheet.getRange(1, 1, 1, REQUEST_HEADERS.length).getValues()[0];
    if (REQUEST_HEADERS.some(function (header, index) { return currentHeaders[index] !== header; })) {
      throw new Error("The Requests worksheet headers do not match the required schema.");
    }
  }
  return sheet;
}

function findRequestRow_(sheet, requestId) {
  if (sheet.getLastRow() < 2) return null;
  const match = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1)
    .createTextFinder(requestId)
    .matchEntireCell(true)
    .findNext();
  return match ? sheet.getRange(match.getRow(), 1, 1, REQUEST_HEADERS.length).getValues()[0] : null;
}

function rowsMatchSubmission_(existingRow, newRow) {
  for (let column = 2; column < REQUEST_HEADERS.length - 1; column += 1) {
    if (String(existingRow[column]) !== String(newRow[column])) return false;
  }
  return existingRow[REQUEST_HEADERS.length - 1] === "New";
}

function buildResponse_(result, nonce, targetOrigin) {
  const message = {
    type: RESPONSE_MESSAGE_TYPE,
    nonce: nonce,
    ok: result.ok === true,
    requestId: result.ok === true ? result.requestId : ""
  };
  const payload = JSON.stringify(message).replace(/</g, "\\u003c");
  const safeOrigin = targetOrigin || "null";
  const page = [
    "<!doctype html><html><head><meta charset=\"utf-8\">",
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
    "<title>ZATONA request response</title></head><body>",
    "<p>This window is used to securely confirm the request submission.</p>",
    "<script>",
    "const message = " + payload + ";",
    "if (message.nonce && " + JSON.stringify(ALLOWED_PARENT_ORIGINS) + ".includes(" + JSON.stringify(safeOrigin) + ")) {",
    "  window.top.postMessage(message, " + JSON.stringify(safeOrigin) + ");",
    "}",
    "</script></body></html>"
  ].join("");
  return HtmlService.createHtmlOutput(page)
    .setTitle("ZATONA request response")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getAllowedParentOrigin_(value) {
  const origin = normalizeString_(value, 300);
  return includes_(ALLOWED_PARENT_ORIGINS, origin) ? origin : "";
}

function normalizeString_(value, maxLength) {
  if (typeof value !== "string") return "";
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length <= maxLength ? normalized : "";
}

function normalizeMultiline_(value, maxLength) {
  if (typeof value !== "string") return "";
  const normalized = value.replace(/\r\n?/g, "\n").trim();
  return normalized.length <= maxLength ? normalized : "";
}

function includes_(allowedValues, value) {
  return Array.isArray(allowedValues) && allowedValues.indexOf(value) !== -1;
}

function isValidEmail_(value) {
  return value.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isValidPhone_(value) {
  const digits = value.replace(/\D/g, "");
  return /^\+?[0-9][0-9\s().-]*$/.test(value) && digits.length >= 7 && digits.length <= 15;
}

function isValidUrl_(value) {
  if (value.length > 500) return false;
  const match = value.match(/^(https?):\/\/(\[[0-9a-f:.]+\]|[^/?#\s:]+)(?::(\d{1,5}))?(?:[/?#][^\s]*)?$/i);
  if (!match) return false;
  const hostname = match[2];
  if (match[3] && (Number(match[3]) < 1 || Number(match[3]) > 65535)) return false;
  if (hostname.charAt(0) === "[") return true;
  const labels = hostname.split(".");
  return labels.length >= 2 && labels.every(function (label) {
    return label.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label);
  });
}

function isPlausibleSubmissionTime_(value) {
  const startedAt = Number(value);
  const elapsed = Date.now() - startedAt;
  return Number.isFinite(startedAt) && startedAt > 0 && elapsed >= 2500;
}

function isUuid_(value) {
  return typeof value === "string"
    && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function safeSheetText_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}
