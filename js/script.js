// AURELLE — shared site behaviour

document.addEventListener("DOMContentLoaded", () => {
  /* Mobile nav toggle ----------------------------------------------------- */
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* Shop category filter ---------------------------------------------------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll("[data-category]");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      productCards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });

  /* Gallery lightbox ---------------------------------------------------------- */
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox img");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const caption = item.querySelector(".caption");
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      if (lightboxCaption) lightboxCaption.textContent = caption ? caption.textContent : "";
      lightbox.classList.add("open");
    });
  });
  const lightboxClose = document.querySelector(".lightbox-close");
  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener("click", () => lightbox.classList.remove("open"));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("open");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") lightbox.classList.remove("open");
    });
  }

  /* FAQ accordion --------------------------------------------------------------- */
  document.querySelectorAll(".faq-question").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq-item");
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((el) => el.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });

  /* Contact / query form ------------------------------------------------------------ */
  const contactForm = document.getElementById("contact-form");
  const statusBox = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          statusBox.textContent =
            "Thank you — your query has been received. Our team will get back to you within 1–2 business days.";
          statusBox.className = "form-status ok";
          contactForm.reset();
        } else {
          const data = await response.json().catch(() => null);
          const message =
            data && data.errors
              ? data.errors.map((err) => err.message).join(", ")
              : "Something went wrong while sending your message. Please try again or email us directly.";
          statusBox.textContent = message;
          statusBox.className = "form-status err";
        }
      } catch (err) {
        statusBox.textContent =
          "We couldn't send your message — please check your connection and try again, or email us directly.";
        statusBox.className = "form-status err";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }

  /* Newsletter form (footer + homepage band) ----------------------------------------- */
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const note = form.querySelector(".newsletter-note");
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (response.ok) {
          if (note) note.textContent = "You're on the list — welcome to AURELLE.";
          form.reset();
        } else if (note) {
          note.textContent = "Something went wrong. Please try again.";
        }
      } catch {
        if (note) note.textContent = "Something went wrong. Please try again.";
      }
    });
  });

  /* Footer year ---------------------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
