document.addEventListener("DOMContentLoaded", () => {
  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    function updateBackToTopButton() {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const shouldShow =
        window.scrollY > 250 || window.scrollY > scrollableHeight * 0.4;

      backToTopButton.classList.toggle("visible", shouldShow);
    }

    window.addEventListener("scroll", updateBackToTopButton);
    window.addEventListener("resize", updateBackToTopButton);

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    updateBackToTopButton();
  }

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) {
    return;
  }

  function clearActiveNavLinks() {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
  }

  function setActiveNavLink(sectionId) {
    navLinks.forEach((link) => {
      const linkTarget = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", linkTarget === sectionId);
    });
  }

  function updateActiveNavLink() {
    const activationPoint = window.innerHeight * 0.4;
    let activeSectionId = null;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      if (rect.top <= activationPoint && rect.bottom >= activationPoint) {
        activeSectionId = section.id;
      }
    });

    const firstSection = sections[0];
    const firstSectionTop = firstSection.getBoundingClientRect().top;

    if (firstSectionTop > activationPoint) {
      clearActiveNavLinks();
      return;
    }

    const isAtBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 5;

    if (isAtBottom) {
      const lastSection = sections[sections.length - 1];
      setActiveNavLink(lastSection.id);
      return;
    }

    if (activeSectionId) {
      setActiveNavLink(activeSectionId);
    }
  }

  window.addEventListener("scroll", updateActiveNavLink);
  window.addEventListener("resize", updateActiveNavLink);

  updateActiveNavLink();
});