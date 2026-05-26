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
  const socialLinkContainer = document.getElementById("social-link-container");

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

    const learnerName = certificate.individual_name || "Learner";
    const endDate = formatCertificateDate(certificate.bootcamp_cohort_end_date);
    const hours = content?.learningDurationHours;

    const title = content?.title || certificate.bootcamp_name || "Bootcamp";
    const tagline = content?.tagline || "";

    let completionLine = `UXCamp Vietnam certifies that ${learnerName} has successfully completed the bootcamp: ${title}`;
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

    bootcampContentRoot.innerHTML = `
      <p class="paragraph">UXCAMP VIETNAM</p>
      <div class="bootcamp-title">
        <h3 class="medium">${title}</h3>
        ${tagline ? `<p class="h5 extralight sub-title"><i>${tagline}</i></p>` : ""}
      </div>

      <hr>

      <div class="certificate-meta">
        ${completionLine ? `<p class="font-sans-caption certificate-completion">${completionLine}</p>` : ""}
        ${cohortLine ? `<p class="font-sans-caption certificate-cohort-meta">${cohortLine}</p>` : ""}
      </div>

      <hr>
      
      ${whatYouWillLearnHtml
        ? `<div class="certificate-learn-section">
              <h5 class="certificate-learn-heading extralight italic">What you will learn</h5>
              <div class="certificate-learn-list">
                ${whatYouWillLearnHtml}
              </div>
            </div>`
        : ""
      }

      ${whatYouWillLearnHtml && skillsHtml ? `<hr class="certificate-learn-divider">` : ""}

      ${skillsHtml
        ? `<div class="certificate-skills-section">
              <h5 class="certificate-skills-heading extralight italic">Skills you will gain</h5>
              <div class="certificate-skills-list">
                ${skillsHtml}
              </div>
            </div>`
        : ""
      }

      ${ctaHtml}`;
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
      } else {
        pdfButton.removeAttribute("href");
        pdfButton.setAttribute("aria-disabled", "true");
        pdfButton.classList.add("is-disabled");
      }
    }

    const socialLink = (certificate.individual_social_link || "").trim();
    if (socialLinkContainer) {
      if (socialLink) {
        socialLinkContainer.innerHTML = `<a class="font-sans-caption certificate-social-link" href="${socialLink}" target="_blank" rel="noopener noreferrer">View learner profile</a>`;
        socialLinkContainer.hidden = false;
      } else {
        socialLinkContainer.innerHTML = "";
        socialLinkContainer.hidden = true;
      }
    }

    const content = getBootcampContent(certificate.bootcamp_name);
    renderBootcampContent(certificate, content);

    document.title = `${certificate.individual_name || "Certificate"} — UXCamp Vietnam`;
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
    showEmptyState();
  } finally {
    setPageLoading(false);
  }
})();
