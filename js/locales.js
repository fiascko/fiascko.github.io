/* Copyright (c) Fiascko. All rights reserved. | Project: fiascko.com | File: locales.js */

document.addEventListener("DOMContentLoaded", () => {
  const DEFAULT_LOCALE = "en";
  const LOCALE_STORAGE_KEY = "locale";

  const localeSelect = document.getElementById("locale-select");
  const localeSelectWrapper = localeSelect?.closest(".locale-select-wrapper");
  const navLinks = localeSelect?.closest(".nav-links");

  if (!localeSelect || !localeSelectWrapper || !navLinks) {
    console.error("Locale selector or navigation not found.");
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

  function updateLocaleSelectDisplay() {
    localeSelectWrapper.classList.remove("is-compact");

    const items = Array.from(navLinks.children);
    const gap = parseFloat(getComputedStyle(navLinks).columnGap) || 0;

    const requiredWidth = items.reduce((width, item) => {
      return width + Math.max(item.scrollWidth, item.getBoundingClientRect().width);
    }, gap * Math.max(0, items.length - 1));

    localeSelectWrapper.classList.toggle("is-compact", requiredWidth > navLinks.clientWidth + 1);
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
    localeSelectWrapper.dataset.shortLabel = locale.toUpperCase();
    document.documentElement.setAttribute("data-current-locale", locale);

    updateLocaleSelectLabels(locale);
    updatePageText(locale);
    updateLocaleSelectDisplay();

    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }

  localeSelect.addEventListener("change", (event) => {
    setLocale(event.target.value);
  });

  window.addEventListener("resize", updateLocaleSelectDisplay);

  setLocale(getSavedLocale());
});
