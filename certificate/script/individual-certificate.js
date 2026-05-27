/**
 * Individual certificate page: fetch data here, resolve by id or email from lookup flow.
 */
(async function initIndividualCertificatePage() {
  const mainContent = document.getElementById("certificate-main");
  const emptyState = document.getElementById("certificate-empty-state");
  const emptyStateMessage = document.getElementById("certificate-empty-message");
  const pageLoading = document.getElementById("certificate-page-loading");
  const pageError = document.getElementById("certificate-page-error");

  const certificateImage = document.getElementById("certificate-image");
  const pdfButton = document.getElementById("certificate-pdf-download");
  const bootcampContentRoot = document.getElementById("bootcamp-content-root");

  const certificateId = getCertificateIdFromPage();
  const certificateEmail = getCertificateEmailFromPage();

  function setPageLoading(isLoading) {
    if (pageLoading) {
      pageLoading.hidden = !isLoading;
    }
  }

  function showPageError(message) {
    if (pageError) {
      pageError.hidden = false;
      pageError.textContent = message;
    }
  }

  function hidePageError() {
    if (pageError) {
      pageError.hidden = true;
      pageError.textContent = "";
    }
  }

  function showEmptyState(message) {
    if (mainContent) {
      mainContent.hidden = true;
    }
    if (emptyState) {
      emptyState.hidden = false;
    }
    if (emptyStateMessage && message) {
      emptyStateMessage.textContent = message;
    }
  }

  function showMainContent() {
    if (mainContent) {
      mainContent.hidden = false;
    }
    if (emptyState) {
      emptyState.hidden = true;
    }
    hidePageError();
  }

  /**
   * Prefer shareable ?id= URL after email lookup without reloading.
   * @param {string} id
   */
  function replaceUrlWithCertificateId(id) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("email");
      url.searchParams.set("id", id);
      window.history.replaceState(null, "", url.href);
      persistCertificateId(id);
    } catch (error) {
      console.warn("Could not update certificate URL", error);
    }
  }

  /**
   * @param {object} certificate
   * @param {object|null} content
   */
  function renderBootcampContent(certificate, content) {
    if (!bootcampContentRoot) {
      return;
    }

    const socialLink = (certificate.individual_social_link || "").trim();
    const learnerName = certificate.individual_name || "Learner";
    const displayName = socialLink
      ? `<a class="certificate-learner-link" href="${socialLink}" target="_blank" rel="noopener noreferrer">${learnerName}</a>`
      : learnerName;
    const endDate = formatCertificateDate(certificate.bootcamp_cohort_end_date);
    const hours = content?.learningDurationHours;

    const title = content?.title || certificate.bootcamp_name || "Bootcamp";
    const tagline = content?.tagline || "";

    let completionLine = `UXCamp Vietnam certifies that ${displayName} has successfully completed the bootcamp: ${title}`;
    if (endDate) {
      completionLine += ` on ${endDate}`;
    }
    if (hours) {
      completionLine += `.<br> Total learning duration: approximately ${hours} hours.`;
    } else {
      completionLine += ".";
    }

    const cohortLine = [
      certificate.bootcamp_cohort_name
        ? `Cohort: ${certificate.bootcamp_cohort_name}`
        : "",
    ]
      .filter(Boolean)
      .join(" · ");

    const whatYouWillLearnHtml = (content?.whatYouWillLearn || [])
      .map(
        (item) => `
        <div class="certificate-learn-item">
          <img class="certificate-learn-checkmark" src="../asset/icon/check.svg" alt="check mark" width="16" height="14" onload="SVGInject(this)">
          <p class="font-sans-caption">${item}</p>
        </div>`
      )
      .join("");

    const skillsHtml = (content?.skills || [])
      .map(
        (skill) => `<span class="certificate-skill-chip font-sans-small">${skill}</span>`
      )
      .join("");

    const ctaHtml = content?.cta
      ? `<a class="font-sans-caption certificate-bootcamp-cta" href="${content.cta.href}">${content.cta.label}  ›</a>`
      : "";

    const alumniCtaHtml = `<a class="font-sans-caption certificate-alumni-cta" href="find-your-certificate.html">For Alumni: Find your certificate here  ›</a>`;

    bootcampContentRoot.innerHTML = `
      <p class="paragraph">UXCAMP VIETNAM</p>
      <div class="bootcamp-title">
        <p class="font-serif-title medium">${title}</p>
        ${tagline ? `<p class="h3 extralight sub-title"><i>${tagline}</i></p>` : ""}
      </div>

      <hr>

      <div class="certificate-meta">
        ${completionLine ? `<p class="font-sans-caption certificate-completion">${completionLine}</p>` : ""}
        ${cohortLine ? `<p class="font-sans-caption certificate-cohort-meta">${cohortLine}</p>` : ""}
      </div>

      <hr>
      
      ${whatYouWillLearnHtml
        ? `<div class="certificate-learn-section">
              <h5 class="certificate-learn-heading extralight italic">Included in this bootcamp</h5>
              <div class="certificate-learn-list">
                ${whatYouWillLearnHtml}
              </div>
            </div>`
        : ""
      }

      ${whatYouWillLearnHtml && skillsHtml ? `<hr class="certificate-learn-divider">` : ""}

      ${skillsHtml
        ? `<div class="certificate-skills-section">
              <h5 class="certificate-skills-heading extralight italic">Skills</h5>
              <div class="certificate-skills-list">
                ${skillsHtml}
              </div>
            </div>`
        : ""
      }

      ${ctaHtml}
      ${alumniCtaHtml}`;
  }

  /**
   * @param {object} certificate
   */
  function renderCertificate(certificate) {
    showMainContent();

    const imgFileName = certificate.certificate_img_name;
    const pdfUrl = resolveCertificateAssetUrl(certificate.certificate_pdf_url);

    if (certificateImage) {
      certificateImage.src = "../asset/image/certificate/" + imgFileName + ".webp";
      certificateImage.alt = `Certificate for ${certificate.individual_name || "learner"}`;
    }

    if (pdfButton) {
      if (pdfUrl) {
        pdfButton.href = pdfUrl;
        pdfButton.target = "_blank";
        pdfButton.rel = "noopener noreferrer";
        pdfButton.removeAttribute("aria-disabled");
        pdfButton.classList.remove("is-disabled");

        // newly added event on 27/05/2026
        pdfButton.onclick = () => {
          if (typeof mixpanel !== 'undefined') {
            mixpanel.track('click_download_pdf', {
              email: certificate.individual_email || '',
              certificate_id: certificate.certificate_id || '',
              pdf_url: pdfUrl
            });
          }
        };
      } else {
        pdfButton.removeAttribute("href");
        pdfButton.setAttribute("aria-disabled", "true");
        pdfButton.classList.add("is-disabled");
        pdfButton.onclick = null;
      }
    }

    const content = getBootcampContent(certificate.bootcamp_name);
    renderBootcampContent(certificate, content);

    document.title = `${certificate.individual_name || "Certificate"} — UXCamp Vietnam`;

    // newly added event on 27/05/2026
    if (typeof mixpanel !== 'undefined') {
      mixpanel.track('view_certificate', {
        ...certificate
      });
    }

    // newly added event on 27/05/2026
    if (bootcampContentRoot) {
      bootcampContentRoot.onclick = (event) => {
        const target = event.target.closest('a');
        if (!target) return;

        if (target.classList.contains('certificate-bootcamp-cta')) {
          // newly added event on 27/05/2026
          if (typeof mixpanel !== 'undefined') {
            mixpanel.track('click_bootcamp_cta', {
              email: certificate.individual_email || '',
              certificate_id: certificate.certificate_id || '',
              bootcamp_name: certificate.bootcamp_name || '',
              cta_label: content?.cta?.label || '',
              cta_href: content?.cta?.href || ''
            });
          }
        } else if (target.classList.contains('certificate-alumni-cta')) {
          // newly added event on 27/05/2026
          if (typeof mixpanel !== 'undefined') {
            mixpanel.track('click_alumni_cta', {
              email: certificate.individual_email || '',
              certificate_id: certificate.certificate_id || ''
            });
          }
        } else if (target.classList.contains('certificate-learner-link')) {
          // newly added event on 27/05/2026
          if (typeof mixpanel !== 'undefined') {
            mixpanel.track('click_learner_social_link', {
              email: certificate.individual_email || '',
              certificate_id: certificate.certificate_id || '',
              social_link: target.href
            });
          }
        }
      };
    }
  }

  if (!certificateId && !certificateEmail) {
    setPageLoading(false);
    showEmptyState(
      "We could not find a certificate matching this link. It may have been removed or the URL is incorrect."
    );
    return;
  }

  setPageLoading(true);

  try {
    const certificates = await loadCertificates();

    let certificate = null;
    if (certificateId) {
      certificate = findCertificateById(certificateId, certificates);
    } else {
      certificate = findCertificateByEmail(certificateEmail, certificates);
    }

    if (!certificate) {
      const notFoundMessage = certificateEmail
        ? "No certificate was found for this email. Please use the email you registered with."
        : "We could not find a certificate matching this link. It may have been removed or the URL is incorrect.";

      // newly added event on 27/05/2026
      if (typeof mixpanel !== 'undefined') {
        mixpanel.track('certificate_not_found', {
          email: certificateEmail || '',
          certificate_id: certificateId || ''
        });
      }

      showEmptyState(notFoundMessage);
      return;
    }

    if (certificate.certificate_id && certificateEmail) {
      replaceUrlWithCertificateId(certificate.certificate_id);
    }

    renderCertificate(certificate);
  } catch (error) {
    console.error(error);
    showPageError(
      "We could not load your certificate. Please check your connection and refresh the page."
    );

    // newly added event on 27/05/2026
    if (typeof mixpanel !== 'undefined') {
      mixpanel.track('certificate_load_error', {
        email: certificateEmail || '',
        certificate_id: certificateId || '',
        error: error.message || String(error)
      });
    }

    showEmptyState();
  } finally {
    setPageLoading(false);
  }
})();
