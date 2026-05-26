/**
 * Shared certificate data layer — single fetch, in-memory cache.
 */
const CERTIFICATE_API_URL =
  "https://script.google.com/macros/s/AKfycbwW79mfaIZX5DHGSV9jX2o95GDWxCK_GqVlWqTxwmV9ZxVO4RnJnDsCLxF_9HpVM-WZ/exec";

/** @type {Array<object>|null} */
let certificateCache = null;

/** @type {Promise<Array<object>>|null} */
let certificateFetchPromise = null;

/**
 * Load all certificates once; subsequent calls reuse cache or in-flight request.
 * @returns {Promise<Array<object>>}
 */
async function loadCertificates() {
  if (certificateCache) {
    return certificateCache;
  }

  if (certificateFetchPromise) {
    return certificateFetchPromise;
  }

  certificateFetchPromise = (async () => {
    const response = await fetch(CERTIFICATE_API_URL);

    if (!response.ok) {
      throw new Error(`Failed to load certificates (${response.status})`);
    }

    const data = await response.json();
    certificateCache = Array.isArray(data.certificate) ? data.certificate : [];
    return certificateCache;
  })();

  try {
    return await certificateFetchPromise;
  } catch (error) {
    certificateFetchPromise = null;
    throw error;
  }
}
