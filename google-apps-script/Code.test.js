const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "Code.gs"), "utf8");
const headers = [
  "Request ID", "Request Date & Time", "Website Language", "Company Name",
  "Company Industry", "Company Size", "Company Website", "Contact Person Name",
  "Contact Person Job Title", "Contact Person Email", "Contact Person Phone",
  "Requested Service", "Requested Package", "Estimated Budget",
  "Advertising Budget (if applicable)", "Project Summary", "Request Status"
];

test("valid submissions append one private, Cairo-timestamped row and retries reuse its ID", () => {
  const app = createAppsScriptMock();
  app.context.initializeSpreadsheet();
  const sheet = app.spreadsheet.getSheetByName("Requests");
  assert.deepEqual(Array.from(sheet.rows[0]), headers);
  assert.equal(app.spreadsheet.timezone, "Africa/Cairo");

  const request = validRequest();
  const firstResponse = app.submit(request);
  const firstId = requestIdFrom(firstResponse);
  assert.match(firstId, /^ZA-\d{8}-[A-F0-9]{8}$/);
  assert.equal(sheet.rows.length, 2);
  assert.equal(Object.prototype.toString.call(sheet.rows[1][1]), "[object Date]");
  assert.equal(sheet.rows[1][2], "en");
  assert.equal(sheet.rows[1][4], "technology");
  assert.equal(sheet.rows[1][11], "paid_advertising");
  assert.equal(sheet.rows[1][12], "ad_spend_under_20000");
  assert.equal(sheet.rows[1][16], "New");

  const retryResponse = app.submit(request);
  assert.equal(requestIdFrom(retryResponse), firstId);
  assert.equal(sheet.rows.length, 2);
});

test("invalid options, invalid URLs, and honeypot submissions never append a row", () => {
  const app = createAppsScriptMock();
  app.context.initializeSpreadsheet();
  const sheet = app.spreadsheet.getSheetByName("Requests");

  app.submit({ ...validRequest(), requestedPackage: "not-an-advertising-package" });
  app.submit({ ...validRequest(), submissionToken: uuid(2), companyWebsite: "javascript:alert(1)" });
  app.submit({ ...validRequest(), submissionToken: uuid(3), honeypot: "bot-filled" });
  app.submit({ ...validRequest(), submissionToken: uuid(4), formStartedAt: String(Date.now() + 5000) });
  app.submit({ ...validRequest(), submissionToken: uuid(7), email: "not-an-email" });
  app.submit({ ...validRequest(), submissionToken: uuid(8), projectSummary: "x".repeat(2001) });
  app.submit({ ...validRequest(), submissionToken: uuid(9), advertisingBudget: "" });
  assert.equal(sheet.rows.length, 1);
});

test("non-advertising requests reject an advertising budget and Arabic values remain canonical", () => {
  const app = createAppsScriptMock();
  app.context.initializeSpreadsheet();
  const sheet = app.spreadsheet.getSheetByName("Requests");

  app.submit({
    ...validRequest(),
    requestedService: "graphic_design",
    requestedPackage: "social_post",
    advertisingBudget: "under_20000",
    submissionToken: uuid(5)
  });
  assert.equal(sheet.rows.length, 1);

  app.submit({
    ...validRequest(),
    websiteLanguage: "ar",
    requestedService: "graphic_design",
    requestedPackage: "social_post",
    advertisingBudget: "",
    companyIndustry: "ecommerce",
    submissionToken: uuid(6)
  });
  assert.equal(sheet.rows.length, 2);
  assert.equal(sheet.rows[1][2], "ar");
  assert.equal(sheet.rows[1][4], "ecommerce");
  assert.equal(sheet.rows[1][11], "graphic_design");
  assert.equal(sheet.rows[1][12], "social_post");
});

function createAppsScriptMock() {
  const properties = new Map();
  const cache = new Map();
  const spreadsheet = new MockSpreadsheet();
  let locked = false;
  const lock = {
    waitLock() {
      if (locked) throw new Error("Lock is already held.");
      locked = true;
    },
    hasLock() {
      return locked;
    },
    releaseLock() {
      locked = false;
    }
  };
  const context = {
    console: { log() {}, error() {} },
    Date,
    JSON,
    URL,
    Math,
    Number,
    String,
    Array,
    Object,
    RegExp,
    LockService: { getScriptLock: () => lock },
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: (key) => properties.get(key) || null,
        setProperty: (key, value) => properties.set(key, value)
      })
    },
    SpreadsheetApp: {
      create: () => spreadsheet,
      openById: (id) => {
        assert.equal(id, spreadsheet.id);
        return spreadsheet;
      }
    },
    CacheService: {
      getScriptCache: () => ({
        get: (key) => cache.get(key) || null,
        put: (key, value) => cache.set(key, value)
      })
    },
    Utilities: {
      DigestAlgorithm: { SHA_256: "sha256" },
      Charset: { UTF_8: "utf8" },
      formatDate: (date) => date.toISOString().slice(0, 10).replaceAll("-", ""),
      computeDigest: (_algorithm, value) => Array.from(
        crypto.createHash("sha256").update(value).digest(),
        (byte) => byte > 127 ? byte - 256 : byte
      )
    },
    HtmlService: {
      XFrameOptionsMode: { ALLOWALL: "ALLOWALL" },
      createHtmlOutput: (content) => ({
        content,
        setTitle() { return this; },
        setXFrameOptionsMode() { return this; }
      })
    }
  };
  vm.createContext(context);
  vm.runInContext(source, context);
  return {
    context,
    spreadsheet,
    submit(parameters) {
      return context.doPost({ parameter: parameters }).content;
    }
  };
}

function validRequest() {
  return {
    websiteLanguage: "en",
    companyName: "TEST — ZATONA CRM",
    companyIndustry: "technology",
    companySize: "startup",
    companyWebsite: "https://example.com",
    contactName: "Test Owner",
    jobTitle: "founder",
    email: "test@example.com",
    phone: "+20 100 123 4567",
    requestedService: "paid_advertising",
    requestedPackage: "ad_spend_under_20000",
    estimatedBudget: "egp_3000_5000",
    advertisingBudget: "under_20000",
    projectSummary: "TEST request to verify the client form.",
    submissionToken: uuid(1),
    responseNonce: uuid(101),
    formStartedAt: String(Date.now() - 10000),
    parentOrigin: "https://ahmedadel200066.github.io",
    honeypot: ""
  };
}

function uuid(seed) {
  const tail = String(seed).padStart(12, "0");
  return `123e4567-e89b-42d3-a456-${tail}`;
}

function requestIdFrom(html) {
  const match = html.match(/"requestId":"(ZA-\d{8}-[A-F0-9]{8})"/);
  assert.ok(match, "successful response includes a generated Request ID");
  return match[1];
}

class MockSpreadsheet {
  constructor() {
    this.id = "private-spreadsheet-id";
    this.timezone = "Etc/GMT";
    this.sheets = [new MockSheet("Sheet1")];
  }
  getName() { return "ZATONA - Client Requests"; }
  getId() { return this.id; }
  getUrl() { return "https://docs.google.com/spreadsheets/private"; }
  getSpreadsheetTimeZone() { return this.timezone; }
  setSpreadsheetTimeZone(timezone) { this.timezone = timezone; }
  getSheetByName(name) { return this.sheets.find((sheet) => sheet.name === name) || null; }
  getSheets() { return this.sheets; }
  insertSheet(name) {
    const sheet = new MockSheet(name);
    this.sheets.push(sheet);
    return sheet;
  }
}

class MockSheet {
  constructor(name) {
    this.name = name;
    this.rows = [];
  }
  getName() { return this.name; }
  setName(name) { this.name = name; }
  getLastRow() { return this.rows.length; }
  setFrozenRows() {}
  getRange(row, column, rowCount, columnCount) {
    if (typeof row === "string") return { setNumberFormat() {} };
    return {
      setValues: (values) => {
        values.forEach((value, offset) => {
          this.rows[row - 1 + offset] = value.slice(0, columnCount);
        });
      },
      getValues: () => this.rows.slice(row - 1, row - 1 + rowCount)
        .map((value) => value.slice(column - 1, column - 1 + columnCount)),
      createTextFinder: (text) => ({
        matchEntireCell() { return this; },
        findNext: () => {
          const index = this.rows.findIndex((value, offset) =>
            offset >= row - 1 && String(value[column - 1]) === text);
          return index < 0 ? null : { getRow: () => index + 1 };
        }
      })
    };
  }
}
