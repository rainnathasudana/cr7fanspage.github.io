// === anim.js ===

window.addEventListener('DOMContentLoaded', () => {
  const page = document.body.id;

  if (page === "index") {
    // ANIMASI INDEX
    gsap.to('.hero-title .line', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    });

    gsap.to(".wavy-hover", {
      y: 0,
      opacity: 1,
      delay: 0.6,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });

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
  }

  if (page === "about") {
    // ANIMASI ABOUT
    gsap.to(".about-title", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.to(".about-line", {
      scaleX: 1,
      transformOrigin: "left",
      duration: 0.6,
      delay: 0.2,
      ease: "power2.out"
    });

    gsap.to(".about-description", {
      y: 0,
      opacity: 1,
      delay: 0.4,
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.to(".about-resume", {
      y: 0,
      opacity: 1,
      delay: 0.6,
      duration: 0.5,
      ease: "power2.out"
    });

    gsap.to(".photo-container img", {
      x: 0,
      opacity: 1,
      delay: 0.5,
      duration: 0.7,
      ease: "power2.out"
    });
  }

  // ANIMASI MENU OVERLAY (global)
  const menuToggle = document.getElementById('menuToggle');
  const overlayMenu = document.getElementById('overlayMenu');
  const closeMenu = document.getElementById('closeMenu');

  function animateOverlayContent() {
    gsap.from(".nav-item", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1
    });

    gsap.from(".social-item", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.5
    });
  }

  menuToggle?.addEventListener("click", () => {
    overlayMenu.classList.remove("hidden");
    gsap.to(overlayMenu, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      onStart: () => overlayMenu.classList.add("visible"),
      onComplete: animateOverlayContent
    });
  });

  closeMenu?.addEventListener("click", () => {
    gsap.to(overlayMenu, {
      y: "-100%",
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        overlayMenu.classList.remove("visible");
        overlayMenu.classList.add("hidden");
      }
    });
  });
});
