/*
 * Form handling and client-side validation for the analyze page.
 */

function extractHostname(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }
    return url.hostname.replace(/^www\./, "");
  } catch (err) {
    return null;
  }
}

function showError(field, message) {
  const errorEl = document.querySelector("#" + field.id + "-error");
  errorEl.textContent = message;
  errorEl.hidden = false;
  field.setAttribute("aria-invalid", "true");
}

function clearError(field) {
  const errorEl = document.querySelector("#" + field.id + "-error");
  errorEl.textContent = "";
  errorEl.hidden = true;
  field.removeAttribute("aria-invalid");
}

function validateForm(urlField, textField) {
  const urlValue = urlField.value.trim();
  const textValue = textField.value.trim();

  clearError(urlField);
  clearError(textField);

  if (urlValue === "" && textValue === "") {
    showError(urlField, "Enter a policy URL or paste the policy text below.");
    urlField.focus();
    return null;
  }

  if (urlValue !== "") {
    const hostname = extractHostname(urlValue);
    if (hostname === null) {
      showError(urlField, "That does not look like a valid web address. Include https://");
      urlField.focus();
      return null;
    }
    return hostname;
  }

  if (textValue.length < 200) {
    showError(textField, "That text looks too short to be a full privacy policy.");
    textField.focus();
    return null;
  }

  return "pasted-text";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#analyze-form");
  if (!form) return;

  const urlField = document.querySelector("#policy-url");
  const textField = document.querySelector("#policy-text");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const target = validateForm(urlField, textField);
    if (target === null) return;

    const analysis = MOCK_ANALYSES[target] || MOCK_ANALYSES["example-social.com"];
    sessionStorage.setItem("currentAnalysis", JSON.stringify(analysis));
    addToHistory(analysis);
    window.location.href = "results.html";
  });

  urlField.addEventListener("input", function () {
    clearError(urlField);
  });

  textField.addEventListener("input", function () {
    clearError(textField);
  });
});
