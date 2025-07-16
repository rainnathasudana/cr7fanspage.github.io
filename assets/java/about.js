document.addEventListener("DOMContentLoaded", () => {
  // === Elements ===
  const modeToggle = document.getElementById("modeToggle");
  const modeToggleOverlay = document.getElementById("modeToggleOverlay");
  const langToggle = document.getElementById("langToggle");
  const langToggleOverlay = document.getElementById("langToggleOverlay");
  const menuToggle = document.getElementById("menuToggle");
  const closeMenu = document.getElementById("closeMenu");
  const overlay = document.querySelector(".overlay");

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

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateModeIcon(theme);
  }

  // Load saved theme or default light
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  // Add event listeners for theme toggle buttons
  [modeToggle, modeToggleOverlay].forEach(btn => {
    btn?.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      setTheme(nextTheme);
    });
  });

  // === Language Toggle ===
  function setLang(lang) {
    [langToggle, langToggleOverlay].forEach(btn => {
      if (btn) btn.textContent = lang;
    });
    localStorage.setItem("lang", lang);
  }

  // Load saved language or default "ID"
  const savedLang = localStorage.getItem("lang") || "ID";
  setLang(savedLang);

  // Toggle language on click
  function toggleLang() {
    const currentLang = langToggle?.textContent || "EN";
    const newLang = currentLang === "EN" ? "ID" : "EN";
    setLang(newLang);
  }

  [langToggle, langToggleOverlay].forEach(btn => {
    btn?.addEventListener("click", toggleLang);
  });

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

  // === Optional GSAP entrance animation for about section ===
  if (typeof gsap !== "undefined") {
    gsap.from(".about-title", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.from(".about-line", {
      width: 0,
      duration: 0.6,
      delay: 0.2,
      ease: "power2.out",
    });

    gsap.from(".about-description", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.3,
      ease: "power2.out",
    });

    gsap.from(".about-resume", {
      y: 10,
      opacity: 0,
      duration: 0.4,
      delay: 0.4,
      ease: "power2.out",
    });

    gsap.from(".photo-container img", {
      x: 40,
      opacity: 0,
      duration: 0.7,
      delay: 0.4,
      ease: "power2.out",
    });
  }
});
