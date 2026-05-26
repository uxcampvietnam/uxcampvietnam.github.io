/**
 * Certificate lookup helpers (email validation, search, URL resolution).
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CERTIFICATE_ID_STORAGE_KEY = "uxcamp_certificate_id";
const CERTIFICATE_EMAIL_STORAGE_KEY = "uxcamp_certificate_email";

/**
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return EMAIL_PATTERN.test(String(email).trim());
}

/**
 * Site root (handles GitHub Pages project sites, e.g. /repo/...).
 * @returns {string}
 */
function getSiteRootUrl() {
  const path = window.location.pathname;
  const certificateIndex = path.indexOf("/certificate/");

  if (certificateIndex >= 0) {
    return `${window.location.origin}${path.slice(0, certificateIndex + 1)}`;
  }

  const directoryEnd = path.lastIndexOf("/");
  const basePath = directoryEnd >= 0 ? path.slice(0, directoryEnd + 1) : "/";
  return `${window.location.origin}${basePath}`;
}

/**
 * Normalize image/PDF paths from the sheet (e.g. ../asset/...) to absolute URLs.
 * @param {string} url
 * @returns {string}
 */
function resolveCertificateAssetUrl(url) {
  if (!url || typeof url !== "string") {
    return "";
  }

  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    return `${window.location.origin}${trimmed}`;
  }

  const siteRelative = trimmed.replace(/^(\.\.\/)+/, "");
  return new URL(siteRelative, getSiteRootUrl()).href;
}

/**
 * @param {string} isoString
 * @returns {string}
 */
function formatCertificateDate(isoString) {
  if (!isoString) {
    return "";
  }

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return isoString;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

/**
 * @param {object} certificate
 * @returns {string}
 */
function formatCohortDateLabel(certificate) {
  const start = certificate.bootcamp_cohort_start_date;
  const end = certificate.bootcamp_cohort_end_date;

  if (start && end) {
    return `${formatCertificateDate(start)} – ${formatCertificateDate(end)}`;
  }

  if (end) {
    return formatCertificateDate(end);
  }

  if (start) {
    return formatCertificateDate(start);
  }

  return "";
}

/**
 * Pick the certificate with the latest cohort end date when multiple share an email.
 * @param {string} email
 * @param {Array<object>} certificates
 * @returns {object|null}
 */
function findCertificateByEmail(email, certificates) {
  const normalized = email.trim().toLowerCase();
  const matches = certificates.filter(
    (item) => (item.individual_email || "").trim().toLowerCase() === normalized
  );

  if (!matches.length) {
    return null;
  }

  return matches.reduce((latest, current) => {
    const latestTime = new Date(latest.bootcamp_cohort_end_date || 0).getTime();
    const currentTime = new Date(current.bootcamp_cohort_end_date || 0).getTime();
    return currentTime > latestTime ? current : latest;
  });
}

/**
 * @param {string} certificateId
 * @param {Array<object>} certificates
 * @returns {object|null}
 */
function findCertificateById(certificateId, certificates) {
  const normalizedId = String(certificateId || "").trim();
  if (!normalizedId) {
    return null;
  }

  return (
    certificates.find(
      (item) => String(item.certificate_id || "").trim() === normalizedId
    ) || null
  );
}

/**
 * @param {string} key
 * @returns {string|null}
 */
function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/**
 * @param {string} certificateId
 * @returns {string}
 */
function buildIndividualCertificateUrl(certificateId) {
  const url = new URL("individual.html", window.location.href);
  url.searchParams.set("id", String(certificateId).trim());
  return url.href;
}

/**
 * Navigate to individual page; certificate data is fetched there.
 * @param {string} email
 * @returns {string}
 */
function buildIndividualCertificateUrlByEmail(email) {
  const url = new URL("individual.html", window.location.href);
  url.searchParams.set("email", String(email).trim());
  return url.href;
}

/**
 * Persist id before navigation so the individual page still works if ?id= is dropped.
 * @param {string} certificateId
 */
function persistCertificateId(certificateId) {
  try {
    sessionStorage.setItem(
      CERTIFICATE_ID_STORAGE_KEY,
      String(certificateId).trim()
    );
  } catch (error) {
    console.warn("Could not persist certificate id", error);
  }
}

/**
 * @returns {string|null}
 */
function getCertificateIdFromPage() {
  const fromQuery = getQueryParam("id");
  if (fromQuery && fromQuery.trim()) {
    return fromQuery.trim();
  }

  try {
    const stored = sessionStorage.getItem(CERTIFICATE_ID_STORAGE_KEY);
    if (stored && stored.trim()) {
      return stored.trim();
    }
  } catch (error) {
    console.warn("Could not read certificate id from sessionStorage", error);
  }

  return null;
}

/**
 * @param {string} email
 */
function persistCertificateEmail(email) {
  try {
    sessionStorage.setItem(
      CERTIFICATE_EMAIL_STORAGE_KEY,
      String(email).trim().toLowerCase()
    );
  } catch (error) {
    console.warn("Could not persist certificate email", error);
  }
}

/**
 * @returns {string|null}
 */
function getCertificateEmailFromPage() {
  const fromQuery = getQueryParam("email");
  if (fromQuery && fromQuery.trim()) {
    return fromQuery.trim().toLowerCase();
  }

  try {
    const stored = sessionStorage.getItem(CERTIFICATE_EMAIL_STORAGE_KEY);
    if (stored && stored.trim()) {
      return stored.trim().toLowerCase();
    }
  } catch (error) {
    console.warn("Could not read certificate email from sessionStorage", error);
  }

  return null;
}
