document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  // === Apply saved theme from localStorage or default 'light' ===
  const savedTheme = localStorage.getItem("theme") || "light";
  html.setAttribute("data-theme", savedTheme);

  const modeToggle = document.getElementById("modeToggle");
  const modeToggleOverlay = document.getElementById("modeToggleOverlay");

  // Fungsi untuk update ikon tema dengan img src
  function updateModeIcon(theme) {
    const iconSrc = theme === "light" ? "assets/img/moon.svg" : "assets/img/sun.svg";
    const altText = theme === "light" ? "Switch to dark mode" : "Switch to light mode";

    [modeToggle, modeToggleOverlay].forEach(btn => {
      if (!btn) return;
      const img = btn.querySelector("img");
      if (img) {
        img.src = iconSrc;
        img.alt = altText;
      }
    });
  }

  updateModeIcon(savedTheme);

  // Toggle tema dan simpan di localStorage
  function toggleTheme() {
    const current = html.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateModeIcon(next);
  }

  modeToggle?.addEventListener("click", toggleTheme);
  modeToggleOverlay?.addEventListener("click", toggleTheme);

  // === Toggle Language dengan simpan ke localStorage ===
  const langToggle = document.getElementById("langToggle");
  const langToggleOverlay = document.getElementById("langToggleOverlay");

  // Ambil bahasa dari localStorage atau default "ID"
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

  // === Toggle Overlay Menu menggunakan GSAP ===
  const menuToggle = document.getElementById("menuToggle");
  const closeMenu = document.getElementById("closeMenu");
  const overlay = document.getElementById("overlayMenu");

  menuToggle?.addEventListener("click", () => {
    if (overlay) {
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
        },
      });
    }
  });

  closeMenu?.addEventListener("click", () => {
    if (overlay) {
      gsap.to(overlay, {
        opacity: 0,
        y: "-100%",
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          overlay.classList.remove("visible");
          gsap.set(overlay, { display: "none" });
        },
      });
    }
  });
});
