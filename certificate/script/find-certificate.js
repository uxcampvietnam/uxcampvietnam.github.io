/**
 * Find-your-certificate page: validate email only, no API fetch (data loads on individual page).
 */
(function initFindCertificatePage() {
  const form = document.getElementById("certificate-lookup-form");
  const emailInput = document.getElementById("certificate-email");
  const submitButton = document.getElementById("certificate-submit");
  const fieldError = document.getElementById("certificate-field-error");

  if (!form || !emailInput || !submitButton) {
    return;
  }

  function clearFieldError() {
    if (fieldError) {
      fieldError.hidden = true;
      fieldError.textContent = "";
    }
    emailInput.removeAttribute("aria-invalid");
  }

  function showFieldError(message) {
    if (fieldError) {
      fieldError.hidden = false;
      fieldError.textContent = message;
    }
    emailInput.setAttribute("aria-invalid", "true");
  }

  function setSubmitting(isSubmitting) {
    submitButton.setAttribute("aria-busy", String(isSubmitting));
    submitButton.textContent = isSubmitting ? "Continuing…" : "Find certificate";
    emailInput.disabled = isSubmitting;
    submitButton.disabled = isSubmitting;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFieldError();

    const email = emailInput.value.trim();

    if (!email) {
      showFieldError("Con vợ nhập email vào đã.");
      return;
    }

    if (!isValidEmail(email)) {
      showFieldError("Con vợ bịp à!. Đây có phải là format email đâu??");
      return;
    }

    setSubmitting(true);
    persistCertificateEmail(email);
    window.location.assign(buildIndividualCertificateUrlByEmail(email));
  });

  emailInput.addEventListener("input", clearFieldError);
})();
