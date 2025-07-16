document.addEventListener("DOMContentLoaded", () => {
  // === Elements ===
  const modeToggle = document.getElementById("modeToggle");
  const modeToggleOverlay = document.getElementById("modeToggleOverlay");
  const langToggle = document.getElementById("langToggle");
  const langToggleOverlay = document.getElementById("langToggleOverlay");
  const menuToggle = document.getElementById("menuToggle");
  const closeMenu = document.getElementById("closeMenu");
  const overlay = document.querySelector(".overlay");
  const previewImage = document.getElementById("previewImage");
  const projectItems = document.querySelectorAll(".project-item");

  // === Theme Toggle ===
  function updateModeIcon(theme) {
    const iconSrc = theme === "dark" ? "assets/img/sun.svg" : "assets/img/moon.svg";
    const altText = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

    [modeToggle, modeToggleOverlay].forEach(btn => {
      if (!btn) return;
      const img = btn.querySelector("img");
      if (img) {
        img.src = iconSrc;
        img.alt = altText;
      }
    });
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateModeIcon(savedTheme);

  function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateModeIcon(next);
  }

  modeToggle?.addEventListener("click", toggleTheme);
  modeToggleOverlay?.addEventListener("click", toggleTheme);

  // === Language Toggle ===
  const savedLang = localStorage.getItem("lang") || "ID";
  if (langToggle) langToggle.textContent = savedLang;
  if (langToggleOverlay) langToggleOverlay.textContent = savedLang;

  function toggleLang() {
    const currentLang = langToggle?.textContent || "ID";
    const newLang = currentLang === "EN" ? "ID" : "EN";
    if (langToggle) langToggle.textContent = newLang;
    if (langToggleOverlay) langToggleOverlay.textContent = newLang;
    localStorage.setItem("lang", newLang);
  }

  langToggle?.addEventListener("click", toggleLang);
  langToggleOverlay?.addEventListener("click", toggleLang);

  // === Overlay Menu Toggle with GSAP ===
  menuToggle?.addEventListener("click", () => {
    if (!overlay) return;
    gsap.set(overlay, { display: "block", opacity: 0, y: "-100%" });
    gsap.to(overlay, {
      opacity: 1,
      y: "0%",
      duration: 0.6,
      ease: "power2.out",
      onStart: () => overlay.classList.add("visible"),
      onComplete: () => {
        gsap.from(".overlay-nav li", {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.from(".social-links a", {
          opacity: 0,
          y: 10,
          delay: 0.4,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  });

  closeMenu?.addEventListener("click", () => {
    if (!overlay) return;
    gsap.to(overlay, {
      opacity: 0,
      y: "-100%",
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        overlay.classList.remove("visible");
        gsap.set(overlay, { display: "none" });
      }
    });
  });

  // === Project Image Hover Interaction ===
  projectItems.forEach(item => {
    const imageSrc = item.getAttribute("data-img");

    item.addEventListener("mouseenter", () => {
      if (previewImage) {
        previewImage.src = imageSrc;
        previewImage.style.opacity = "1";
        previewImage.style.transform = "scale(1)";
      }
      item.classList.add("hovered");
    });

    item.addEventListener("mouseleave", () => {
      if (previewImage) {
        previewImage.style.opacity = "0";
        previewImage.style.transform = "scale(0.98)";
      }
      item.classList.remove("hovered");
    });
  });
});
