document.addEventListener("DOMContentLoaded", () => {
  const DEFAULT_LOCALE = "en";
  const LOCALE_STORAGE_KEY = "locale";

  const localeSelect = document.getElementById("locale-select");

  if (!localeSelect) {
    console.error("Element #locale-select not found.");
    return;
  }

  function getSavedLocale() {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);

    if (savedLocale && window.siteLocales?.[savedLocale]) {
      return savedLocale;
    }

    return DEFAULT_LOCALE;
  }

  function updateLocaleSelectLabels(locale) {
    localeSelect.querySelectorAll("option").forEach((option) => {
      const label = option.getAttribute(`data-label-${locale}`);

      if (label) {
        option.textContent = label;
      }
    });
  }

  function updatePageText(locale) {
    const translations = window.siteLocales?.[locale];

    if (!translations) {
      console.error(`Locale "${locale}" not found.`);
      return;
    }

    document.documentElement.lang = locale;

    document.querySelectorAll("[data-locale]").forEach((element) => {
      const key = element.getAttribute("data-locale");
      const text = translations[key];

      if (text !== undefined) {
        element.textContent = text;
      }
    });
  }

  function setLocale(locale) {
    if (!window.siteLocales?.[locale]) {
      console.error(`Locale "${locale}" not found.`);
      return;
    }

    localeSelect.value = locale;
    document.documentElement.setAttribute("data-current-locale", locale);

    updateLocaleSelectLabels(locale);
    updatePageText(locale);

    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }

  localeSelect.addEventListener("change", (event) => {
    setLocale(event.target.value);
  });

  const savedLocale = getSavedLocale();
  setLocale(savedLocale);
});