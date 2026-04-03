/* ══════════════════════════════════════════════════════
CLEAN 941 LLC — script.js
Hero Slider | Scroll Animations | Counter | Forms
══════════════════════════════════════════════════════ */
"use strict";

/* ── DOM READY ─────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHeroSlider();
  initTestimonialSlider();
  initScrollReveal();
  initCounters();
  initFloatingButton();
  initBookingForm();
  initNewsletterForm();
  initMobileMenu();
  initBackToTop();
  initFooterYear();
});

/* ══════════════════════════════════════════════════════
NAVBAR — scroll behaviour
══════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ══════════════════════════════════════════════════════
HERO SLIDER
══════════════════════════════════════════════════════ */
function initHeroSlider() {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;
  let current = 0;
  const INTERVAL = 5500;
  function resetImage(slide) {
    const img = slide.querySelector(".slide-img");
    if (!img) return;
    img.style.transition = "none";
    img.style.transform = "scale(1.08)";
    void img.offsetWidth;
    img.style.transition = "";
  }
  function next() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    resetImage(slides[current]);
    slides[current].classList.add("active");
  }
  setInterval(next, INTERVAL);
}

/* ══════════════════════════════════════════════════════
TESTIMONIALS SLIDER
══════════════════════════════════════════════════════ */
function initTestimonialSlider() {
  const track = document.getElementById("testiTrack");
  const prevBtn = document.getElementById("testiPrev");
  const nextBtn = document.getElementById("testiNext");
  if (!track) return;
  const cards = Array.from(track.querySelectorAll(".testi-card"));
  const cardCount = cards.length;
  let current = 0;
  const GAP = 24;
  const getVisible = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };
  function setCardWidths() {
    const visible = getVisible();
    const container = track.parentElement.offsetWidth;
    const cardW = (container - GAP * (visible - 1)) / visible;
    cards.forEach(c => {
      c.style.minWidth = cardW + "px";
      c.style.width = cardW + "px";
    });
    return cardW;
  }
  function slideTo(index) {
    const cardW = setCardWidths();
    const maxIdx = Math.max(0, cardCount - getVisible());
    current = Math.max(0, Math.min(index, maxIdx));
    track.style.transform = `translateX(-${current * (cardW + GAP)}px)`;
  }
  if (prevBtn) prevBtn.addEventListener("click", () => slideTo(current - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => slideTo(current + 1));
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => slideTo(0), 150);
  }, { passive: true });
  slideTo(0);
}

/* ══════════════════════════════════════════════════════
SCROLL REVEAL — Intersection Observer
══════════════════════════════════════════════════════ */
function initScrollReveal() {
  const elements = document.querySelectorAll(
    ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right"
  );
  if (!elements.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  elements.forEach((el) => {
    const delay = el.dataset.delay || "0";
    el.style.setProperty("--delay", `${delay}ms`);
    observer.observe(el);
  });
}

/* ══════════════════════════════════════════════════════
ANIMATED COUNTERS
══════════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll(".stat-num");
  if (!counters.length) return;
  const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(ease(progress) * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => observer.observe(el));
}

/* ══════════════════════════════════════════════════════
FLOATING CALL BUTTON — show after scroll
══════════════════════════════════════════════════════ */
function initFloatingButton() {
  const btn = document.getElementById("floatCall");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 300) {
        btn.style.opacity = "1";
        btn.style.pointerEvents = "all";
      } else {
        btn.style.opacity = "0";
        btn.style.pointerEvents = "none";
      }
    },
    { passive: true }
  );
  btn.style.opacity = "0";
  btn.style.transition = "opacity 0.4s ease";
  btn.style.pointerEvents = "none";
}

/* ══════════════════════════════════════════════════════
BACK TO TOP BUTTON
══════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 600) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    },
    { passive: true }
  );
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ══════════════════════════════════════════════════════
BOOKING FORM — Formspree AJAX Submission
══════════════════════════════════════════════════════ */
function initBookingForm() {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector("button[type='submit']");
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        btn.innerHTML = `<i class="fas fa-check"></i> Quote Requested! We'll call you soon.`;
        btn.style.background = "#228B22";
        btn.style.color = "#fff";
        form.reset();

        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = original;
          btn.style.background = "";
          btn.style.color = "";
        }, 4000);
      } else {
        const data = await response.json();
        throw new Error(data.errors ? data.errors.map(e => e.message).join(", ") : "Submission failed");
      }
    } catch (error) {
      btn.innerHTML = original;
      btn.disabled = false;
      alert("Submission failed. Please call us directly at (941) 646-9087");
      console.error("Formspree error:", error);
    }
  });
}

/* ══════════════════════════════════════════════════════
NEWSLETTER FORM — Formspree AJAX Submission
══════════════════════════════════════════════════════ */
function initNewsletterForm() {
  const form = document.querySelector(".newsletter-form");
  const msg = document.getElementById("form-msg");
  if (!form || !msg) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.querySelector('input[type="email"]').value.trim();
    if (!email || !validateEmail(email)) {
      showMsg(msg, "error", "Please enter a valid email address.");
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const original = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Subscribing...`;
    msg.className = "form-msg";
    msg.textContent = "";

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      submitBtn.disabled = false;
      submitBtn.innerHTML = original;

      if (response.ok) {
        showMsg(msg, "success", "🎉 You're subscribed! Check your inbox.");
        form.reset();
      } else {
        const data = await response.json();
        showMsg(msg, "error", data.errors ? data.errors[0].message : "Something went wrong. Please try again.");
      }
    } catch (error) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = original;
      showMsg(msg, "error", "Could not connect. Please try again later.");
      console.error("Formspree error:", error);
    }
  });
}

/* ══════════════════════════════════════════════════════
MOBILE MENU
══════════════════════════════════════════════════════ */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
}
function closeMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!mobileMenu) return;
  mobileMenu.classList.remove("open");
  if (hamburger) hamburger.classList.remove("open");
  document.body.style.overflow = "";
}

/* ══════════════════════════════════════════════════════
FOOTER YEAR
══════════════════════════════════════════════════════ */
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ── HELPERS ───────────────────────────────────────── */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function showMsg(el, type, text) {
  el.className = `form-msg ${type}`;
  el.textContent = text;
}