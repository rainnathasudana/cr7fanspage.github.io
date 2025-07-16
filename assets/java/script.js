window.addEventListener('DOMContentLoaded', () => {
  gsap.to('.hero-title .line', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });

  // Fade-in untuk teks .wavy-hover setelah line muncul
  gsap.to(".wavy-hover", {
    y: 0,
    opacity: 1,
    delay: 0.6,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  });

  gsap.to(".hero-links", {
    opacity: 1,
    y: 0,
    delay: 1.4,
    duration: 0.6,
    ease: "power2.out"
  });
});

// === HERO TEXT ANIMATION ===
window.addEventListener('DOMContentLoaded', () => {
  gsap.to(".hero-subline", {
    opacity: 1,
    y: 0,
    delay: 1.2,
    duration: 0.6,
    ease: "power2.out"
  });

  gsap.to(".hero-links", {
    opacity: 1,
    y: 0,
    delay: 1.4,
    duration: 0.6,
    ease: "power2.out"
  });
});

// === THEME TOGGLE with localStorage ===
function setTheme(mode) {
  const html = document.documentElement;
  html.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);

  const iconSrc = mode === "light" ? "assets/img/moon.svg" : "assets/img/sun.svg";
  const iconAlt = mode === "light" ? "Switch to dark mode" : "Switch to light mode";

  document.querySelectorAll("#modeToggle img, #modeToggleOverlay img").forEach((img) => {
    img.src = iconSrc;
    img.alt = iconAlt;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  document.querySelectorAll("#modeToggle, #modeToggleOverlay").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      setTheme(next);
    });
  });
});

// === LANGUAGE TOGGLE SYNC ===
const langToggles = document.querySelectorAll("#langToggle, #langToggleOverlay");
let currentLang = "en";

langToggles.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "id" : "en";
    langToggles.forEach((btn) => btn.textContent = currentLang.toUpperCase());
  });
});

// === GSAP ANIMASI OVERLAY NAV & SOCIAL ===
function animateOverlayContent() {
  // Menu items
  gsap.from(".nav-item", {
    y: 40,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.1
  });

  // Social links
  gsap.from(".social-item", {
    y: 20,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    delay: 0.5
  });
}

// === MENU OVERLAY ===
const menuToggle = document.getElementById('menuToggle');
const overlayMenu = document.getElementById('overlayMenu');
const closeMenu = document.getElementById('closeMenu');

menuToggle.addEventListener('click', () => {
  overlayMenu.classList.remove('hidden');
  gsap.to(overlayMenu, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power2.out",
    onStart: () => overlayMenu.classList.add('visible'),
    onComplete: animateOverlayContent
  });
});

closeMenu.addEventListener('click', () => {
  gsap.to(overlayMenu, {
    y: "-100%",
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      overlayMenu.classList.remove('visible');
      overlayMenu.classList.add('hidden');
    }
  });
});
