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
    renderPricing(data, language);
    renderServiceOptions(data.services || [], language, messages);
    renderContact(data.contact || {}, language, messages);
    renderSocials(data.socials || []);
    initializeContactForm(data.formspreeEndpoint);
  }

  const revealItems = document.querySelectorAll(".intro-content, .section-heading, .service-card, .pricing-shell, .work-empty, .contact-card");
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

  const sectionObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        document.querySelectorAll(".primary-navigation a[href^='#']").forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
        });
      }, { rootMargin: "-20% 0px -55%", threshold: [0.1, 0.25] })
    : null;
  if (sectionObserver) {
    document.querySelectorAll("main > section[id]").forEach((section) => sectionObserver.observe(section));
  }

  function renderServices(services, locale) {
    const list = document.querySelector("[data-services-list]");
    if (!list) return;

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
        visual.src = new URL(`images/services/${service.visual}`, assetsBase).href;
        visual.alt = service.alt?.[locale] || service.alt?.en || "";
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
      const highlights = document.createElement("ul");
      highlights.className = "service-card-highlights";
      (service.highlights?.[locale] || service.highlights?.en || []).forEach((item) => {
        const highlight = document.createElement("li");
        highlight.textContent = item;
        highlights.append(highlight);
      });
      const cta = document.createElement("a");
      cta.className = "service-card-cta";
      cta.href = "#pricing-details";
      cta.dataset.pricingService = service.id;
      cta.textContent = locale === "ar" ? "اكتشف الخدمة" : "Explore Service";
      const arrow = document.createElement("span");
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";
      cta.append(arrow);

      card.append(title, copy, highlights, cta);
      list.append(card);
    });

  }

  function renderPricing(data, locale) {
    const tabs = document.querySelector("[data-pricing-tabs]");
    const panel = document.querySelector("[data-pricing-panel]");
    if (!tabs || !panel) return;

    const services = data.services || [];
    if (!services.length) {
      document.querySelector("[data-pricing-shell]")?.setAttribute("hidden", "");
      return;
    }

    const displayValue = (value) => typeof value === "string"
      ? value
      : value?.[locale] || value?.en || "";

    const renderPanel = (serviceId) => {
      const service = services.find((item) => item.id === serviceId) || services[0];
      panel.replaceChildren();
      panel.id = "pricing-details";

      const serviceHeading = document.createElement("div");
      serviceHeading.className = "pricing-service-heading";
      const title = document.createElement("h4");
      title.textContent = service.name?.[locale] || service.name?.en;
      const label = document.createElement("p");
      label.textContent = service.pricingLabel?.[locale] || service.pricingLabel?.en;
      serviceHeading.append(label, title);
      panel.append(serviceHeading);

      const packageGrid = document.createElement("div");
      packageGrid.className = "package-grid";
      (service.packages || []).forEach((pkg) => {
        const card = document.createElement("article");
        card.className = "package-card";
        if (pkg.featured) card.classList.add("package-card-featured");

        const packageName = document.createElement("h5");
        packageName.textContent = pkg.name?.[locale] || pkg.name?.en;
        const price = document.createElement("p");
        price.className = "package-price";
        price.textContent = displayValue(pkg.price);
        const features = document.createElement("ul");
        (pkg.features?.[locale] || pkg.features?.en || []).forEach((feature) => {
          const item = document.createElement("li");
          item.textContent = feature;
          features.append(item);
        });
        const cta = document.createElement("a");
        cta.className = "button button-primary package-cta";
        cta.href = "#contact";
        cta.textContent = locale === "ar" ? "اطلب عرض سعر" : "Request a quotation";
        cta.dataset.requestService = service.name?.[locale] || service.name?.en;
        card.append(packageName, price, features, cta);
        packageGrid.append(card);
      });
      panel.append(packageGrid);

      if (service.conditions?.[locale] || service.conditions?.en) {
        const conditions = document.createElement("div");
        conditions.className = "pricing-conditions";
        const conditionTitle = document.createElement("h5");
        conditionTitle.textContent = locale === "ar" ? "الشروط وملاحظات الخدمة" : "Service conditions";
        const list = document.createElement("ul");
        (service.conditions?.[locale] || service.conditions?.en || []).forEach((condition) => {
          const item = document.createElement("li");
          item.textContent = condition;
          list.append(item);
        });
        conditions.append(conditionTitle, list);
        panel.append(conditions);
      }

      const addOnsTitle = document.createElement("h5");
      addOnsTitle.className = "add-ons-title";
      addOnsTitle.textContent = locale === "ar" ? "إضافات وخصومات" : "Add-ons & discounts";
      panel.append(addOnsTitle);

      const extrasGrid = document.createElement("div");
      extrasGrid.className = "extras-grid";
      const extraVisual = document.createElement("div");
      extraVisual.className = "extra-visual";
      const extraImage = document.createElement("img");
      extraImage.src = new URL("images/services/06-photo-video-production.webp", assetsBase).href;
      extraImage.alt = locale === "ar"
        ? "رسم توضيحي لخدمات التصوير والفيديو الإضافية"
        : "Illustration of optional photography and video services";
      extraImage.width = 504;
      extraImage.height = 504;
      extraImage.loading = "lazy";
      extraImage.decoding = "async";
      extraVisual.append(extraImage);
      extrasGrid.append(extraVisual);

      {
        (data.addOns || []).forEach((addOn) => {
          const item = document.createElement("div");
          item.className = "extra-item";
          const name = document.createElement("span");
          name.textContent = addOn.name?.[locale] || addOn.name?.en;
          const price = document.createElement("strong");
          price.textContent = displayValue(addOn.price);
          item.append(name, price);
          extrasGrid.append(item);
        });

        (data.discounts || []).forEach((discount) => {
          const item = document.createElement("div");
          item.className = "extra-item";
          const name = document.createElement("span");
          name.textContent = discount.name?.[locale] || discount.name?.en;
          const value = document.createElement("strong");
          value.textContent = displayValue(discount.value);
          item.append(name, value);
          extrasGrid.append(item);
        });
        panel.append(extrasGrid);

        if (data.discountCondition) {
          const condition = document.createElement("p");
          condition.className = "discount-condition";
          condition.textContent = data.discountCondition?.[locale] || data.discountCondition?.en;
          panel.append(condition);
        }
      }
    };

    services.forEach((service, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "pricing-tab";
      button.id = `pricing-tab-${service.id}`;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-controls", "pricing-details");
      button.setAttribute("aria-selected", String(index === 0));
      button.textContent = service.name?.[locale] || service.name?.en;
      button.addEventListener("click", () => {
        tabs.querySelectorAll(".pricing-tab").forEach((tab) => tab.setAttribute("aria-selected", "false"));
        button.setAttribute("aria-selected", "true");
        renderPanel(service.id);
      });
      tabs.append(button);
    });

    document.querySelector("[data-services-list]")?.addEventListener("click", (event) => {
      const cta = event.target.closest("[data-pricing-service]");
      if (!cta) return;
      event.preventDefault();
      const tab = document.querySelector(`#pricing-tab-${CSS.escape(cta.dataset.pricingService)}`);
      tab?.click();
      document.querySelector("[data-pricing-shell]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    panel.addEventListener("click", (event) => {
      const cta = event.target.closest("[data-request-service]");
      if (!cta) return;
      const select = document.querySelector("#service-interest");
      if (select) {
        const option = Array.from(select.options).find((item) => item.textContent === cta.dataset.requestService);
        if (option) select.value = option.value;
      }
    });

    renderPanel(services[0].id);
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
