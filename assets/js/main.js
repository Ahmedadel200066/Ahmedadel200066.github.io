(() => {
  const assetsBase = new URL("../", document.currentScript.src);
  const formMessages = {
    en: {
      required: "Please complete this field.",
      invalidEmail: "Enter a valid email address.",
      tooShort: "Please enter at least {count} characters.",
      loading: "Sending your message…",
      success: "Thank you. Your message has been sent.",
      error: "We couldn’t send your message. Please try again.",
      notConfigured: "The contact form is not configured yet. Please contact ZATONA through a confirmed channel.",
      discuss: "I’m not sure yet — let’s discuss",
      whatsapp: "Chat on WhatsApp"
    },
    ar: {
      required: "يرجى إكمال هذا الحقل.",
      invalidEmail: "يرجى إدخال بريد إلكتروني صحيح.",
      tooShort: "يرجى إدخال {count} أحرف على الأقل.",
      loading: "جارٍ إرسال رسالتك…",
      success: "شكرًا لك. تم إرسال رسالتك.",
      error: "تعذر إرسال رسالتك. يرجى المحاولة مرة أخرى.",
      notConfigured: "نموذج التواصل غير مُعدّ بعد. يرجى التواصل مع زتونة عبر قناة مؤكدة.",
      discuss: "لست متأكدًا بعد — لنتحدث",
      whatsapp: "تواصل عبر واتساب"
    }
  };

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");
  const currentYear = document.querySelector("[data-current-year]");

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  if (menuToggle && navigation) {
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      navigation.classList.toggle("is-open", !isExpanded);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  const language = document.documentElement.lang === "ar" ? "ar" : "en";
  const messages = formMessages[language];
  const data = window.ZATONA_SITE_DATA;

  if (data) {
    renderServices(data.services || [], language);
    renderServiceOptions(data.services || [], language, messages);
    renderContact(data.contact || {}, language, messages);
    renderSocials(data.socials || []);
    initializeContactForm(data.formspreeEndpoint);
  }

  const revealItems = document.querySelectorAll(".intro-content, .section-heading, .work-empty, .contact-card");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => {
      item.classList.add("will-reveal");
      observer.observe(item);
    });
  }

  function renderServices(services, locale) {
    const list = document.querySelector("[data-services-list]");
    const emptyState = document.querySelector("[data-services-empty]");
    if (!list || !emptyState) return;

    services.forEach((service) => {
      const name = service.name?.[locale] || service.name?.en;
      const description = service.description?.[locale] || service.description?.en;
      if (!name || !description) {
        console.warn("Skipping a ZATONA service with missing localized content.", service);
        return;
      }

      const card = document.createElement("article");
      card.className = "service-card";

      if (service.visual) {
        const visual = document.createElement("img");
        visual.className = "service-card-visual";
        visual.src = new URL(`services/${service.visual}`, assetsBase).href;
        visual.alt = "";
        visual.width = 640;
        visual.height = 640;
        visual.loading = "lazy";
        visual.decoding = "async";
        card.append(visual);
      }

      const title = document.createElement("h3");
      title.textContent = name;
      const copy = document.createElement("p");
      copy.textContent = description;
      const marker = document.createElement("span");
      marker.className = "service-card-marker";
      marker.setAttribute("aria-hidden", "true");
      marker.textContent = "↗";

      card.append(title, copy, marker);
      list.append(card);
    });

    emptyState.hidden = list.childElementCount > 0;
  }

  function renderServiceOptions(services, locale, messages) {
    const select = document.querySelector("#service-interest");
    const discussOption = select?.querySelector("[data-discuss-option]");
    if (!select || !discussOption) return;

    discussOption.textContent = messages.discuss;
    services.forEach((service) => {
      const name = service.name?.[locale] || service.name?.en;
      if (!name) return;

      const option = document.createElement("option");
      option.value = service.id || service.name?.en || name;
      option.textContent = name;
      select.insertBefore(option, discussOption);
    });
  }

  function renderContact(contact, locale, messages) {
    const details = document.querySelector("[data-contact-details]");
    const emptyState = document.querySelector("[data-contact-empty]");
    if (!details || !emptyState) return;

    if (contact.email) {
      const emailLink = document.createElement("a");
      emailLink.href = `mailto:${contact.email}`;
      emailLink.textContent = contact.email;
      details.append(emailLink);
    }

    if (contact.whatsapp) {
      const whatsappNumber = contact.whatsapp.replace(/\D/g, "");
      if (whatsappNumber) {
        const whatsappLink = document.createElement("a");
        whatsappLink.href = `https://wa.me/${whatsappNumber}`;
        whatsappLink.textContent = messages.whatsapp;
        whatsappLink.target = "_blank";
        whatsappLink.rel = "noopener noreferrer";
        details.append(whatsappLink);
      }
    }

    if (contact.phone) {
      const phoneLink = document.createElement("a");
      phoneLink.href = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;
      phoneLink.textContent = contact.phone;
      details.append(phoneLink);
    }

    emptyState.hidden = details.childElementCount > 0;
    if (locale === "ar") details.dir = "ltr";
  }

  function initializeContactForm(endpointValue) {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    const status = form.querySelector("[data-form-status]");
    const submitButton = form.querySelector('button[type="submit"]');
    const submitLabel = form.querySelector("[data-submit-label]");
    const honeypot = form.querySelector('[name="_gotcha"]');
    if (!status || !submitButton || !submitLabel) return;

    const originalButtonLabel = submitLabel.textContent;
    let isSubmitting = false;

    form.addEventListener("input", (event) => {
      if (event.target instanceof HTMLElement && event.target.hasAttribute("aria-invalid")) {
        event.target.removeAttribute("aria-invalid");
      }
      setFormStatus(status, "", "");
    });

    form.addEventListener("change", () => setFormStatus(status, "", ""));

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (isSubmitting) return;

      if (!validateForm(form, status)) return;

      if (honeypot?.value.trim()) {
        form.reset();
        setFormStatus(status, formMessages[language].success, "success");
        return;
      }

      const endpoint = getFormspreeEndpoint(endpointValue);
      if (!endpoint) {
        setFormStatus(status, formMessages[language].notConfigured, "error");
        return;
      }

      isSubmitting = true;
      submitButton.disabled = true;
      submitLabel.textContent = formMessages[language].loading;
      form.setAttribute("aria-busy", "true");
      setFormStatus(status, formMessages[language].loading, "loading");

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });

        if (!response.ok) {
          throw new Error(`Formspree returned HTTP ${response.status}.`);
        }

        form.reset();
        setFormStatus(status, formMessages[language].success, "success");
      } catch (error) {
        console.error("ZATONA Formspree submission failed.", error);
        setFormStatus(status, formMessages[language].error, "error");
      } finally {
        isSubmitting = false;
        submitButton.disabled = false;
        submitLabel.textContent = originalButtonLabel;
        form.removeAttribute("aria-busy");
      }
    });

    submitButton.disabled = false;
  }

  function validateForm(form, status) {
    const invalidFields = [];
    form.querySelectorAll("input[required], select[required], textarea[required]").forEach((field) => {
      field.removeAttribute("aria-invalid");
      const value = field.value.trim();
      if (value) field.value = value;
      let message = "";

      if (!value) {
        message = formMessages[language].required;
      } else if (field.type === "email" && field.validity.typeMismatch) {
        message = formMessages[language].invalidEmail;
      } else if (field.minLength > 0 && value.length < field.minLength) {
        message = formMessages[language].tooShort.replace("{count}", String(field.minLength));
      }

      if (message) {
        field.setAttribute("aria-invalid", "true");
        invalidFields.push({ field, message });
      }
    });

    if (invalidFields.length) {
      setFormStatus(status, invalidFields[0].message, "error");
      invalidFields[0].field.focus();
      return false;
    }
    return true;
  }

  function getFormspreeEndpoint(value) {
    if (typeof value !== "string" || !value.trim()) return "";

    try {
      const endpoint = new URL(value.trim());
      const isFormspreeEndpoint = endpoint.protocol === "https:"
        && endpoint.hostname === "formspree.io"
        && /^\/f\/[A-Za-z0-9]+$/.test(endpoint.pathname);
      return isFormspreeEndpoint ? endpoint.href : "";
    } catch {
      return "";
    }
  }

  function setFormStatus(status, message, state) {
    status.textContent = message;
    if (state) status.dataset.state = state;
    else delete status.dataset.state;
  }

  function renderSocials(socials) {
    const container = document.querySelector("[data-social-links]");
    if (!container) return;

    socials.forEach((social) => {
      if (!social.label || !social.url) {
        console.warn("Skipping a ZATONA social link with missing label or URL.", social);
        return;
      }

      const link = document.createElement("a");
      link.href = social.url;
      link.textContent = social.label;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      container.append(link);
    });
  }
})();
