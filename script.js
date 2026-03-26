/* =========================================
   NoLimit LP JavaScript
   - Smooth Scroll
   - Mobile Nav Close
   - FAQ Accordion
   - Contact Form Validation (Formspree)
   - Fade-up animation
========================================= */

(function () {
  "use strict";

  /* -----------------------------
     Smooth scroll + mobile nav close
  ----------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.replace("#", "");
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.offsetHeight : 0;
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: y,
        behavior: "smooth"
      });

      const navToggle = document.getElementById("nav-toggle");
      if (navToggle && navToggle.checked) {
        navToggle.checked = false;
      }
    });
  });

  /* -----------------------------
     FAQ accordion (one open only)
  ----------------------------- */
  const faqItems = document.querySelectorAll("#faq details");
  faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach(other => {
        if (other !== item) {
          other.removeAttribute("open");
        }
      });
    });
  });

  /* -----------------------------
     Contact form validation (Formspree)
  ----------------------------- */
  const form = document.querySelector("#contact-form");

  if (form) {
    form.addEventListener("submit", e => {
      let hasError = false;

      const requiredFields = form.querySelectorAll("[required]");
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.classList.add("invalid");
          hasError = true;
        } else {
          field.classList.remove("invalid");
        }
      });

      if (hasError) {
        e.preventDefault();
        alert("必須項目が未入力です。内容をご確認ください。");
        return;
      }

      const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "送信中...";
      }
    });

    form.querySelectorAll("input, textarea").forEach(field => {
      field.addEventListener("input", () => {
        if (field.hasAttribute("required") && field.value.trim()) {
          field.classList.remove("invalid");
        }
      });
    });
  }

  /* -----------------------------
     Fade-up animation (LP用)
  ----------------------------- */
  const fadeTargets = document.querySelectorAll(".section, .card, .service-card, .testimonial");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1
      }
    );

    fadeTargets.forEach(el => {
      el.classList.add("fade-up");
      observer.observe(el);
    });
  } else {
    fadeTargets.forEach(el => {
      el.classList.add("is-visible");
    });
  }
})();