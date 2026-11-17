/* Copyright (c) Fiascko. All rights reserved. | Project: fiascko.com | File: csp-debug.js */

(() => {
  const STORAGE_KEY = "csp-debug-events";
  const events = [];

  function saveEvent(data) {
    events.push(data);

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.warn("CSP DEBUG: Unable to save events.", error);
    }

    console.log("CSP DEBUG:", data);
  }

  document.addEventListener("securitypolicyviolation", (event) => {
    saveEvent({
      timestamp: new Date().toISOString(),
      documentURI: event.documentURI,
      disposition: event.disposition,
      violatedDirective: event.violatedDirective,
      effectiveDirective: event.effectiveDirective,
      originalPolicy: event.originalPolicy,
      blockedURI: event.blockedURI,
      sourceFile: event.sourceFile,
      lineNumber: event.lineNumber,
      columnNumber: event.columnNumber,
      sample: event.sample,
      statusCode: event.statusCode
    });
  });

  window.addEventListener("load", () => {
    console.log("CSP DEBUG: Page loaded.", {
      url: location.href,
      userAgent: navigator.userAgent,
      stylesheets: Array.from(document.styleSheets, (sheet) => sheet.href),
      inlineStyles: document.querySelectorAll("style, [style]").length,
      violations: events.length
    });
  });
})();
