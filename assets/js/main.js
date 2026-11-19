(() => {
  const assetsBase = new URL("../", document.currentScript.src);
  const messages = {
    en: {
      whatsapp: "Chat on WhatsApp",
      choose: "Choose an option",
      validation: {
        required: "Please complete this field.",
        invalidEmail: "Enter a valid email address.",
        invalidUrl: "Enter a complete website or social profile URL, including https://.",
        invalidPhone: "Enter a valid international phone number with its country code.",
        tooShort: "Please enter at least {count} characters."
      },
      submit: "Send request",
      sending: "Sending securely…",
      configError: "The request service is not configured yet. Your information has not been sent.",
      error: "We couldn’t confirm that your request was saved. Your details are still here; you can safely retry.",
      timeout: "We haven’t received confirmation yet. Your request may still be processing; retrying with these same details won’t create a duplicate.",
      placeholders: {
        industry: "Choose an industry",
        companySize: "Choose company size",
        jobTitle: "Choose a job title",
        service: "Choose a service",
        package: "Select a service first",
        budget: "Choose a budget range",
        advertisingBudget: "Choose an advertising budget",
        summary: "Tell us about your business, what you need, your current challenges, and the outcome you hope to achieve."
      },
    },
    ar: {
      whatsapp: "تواصل عبر واتساب",
      choose: "اختر خيارًا",
      validation: {
        required: "يرجى إكمال هذا الحقل.",
        invalidEmail: "يرجى إدخال بريد إلكتروني صحيح.",
        invalidUrl: "أدخل رابطًا كاملًا للموقع أو الحساب الاجتماعي، يبدأ بـ https://.",
        invalidPhone: "أدخل رقم هاتف دوليًا صحيحًا متضمنًا رمز الدولة.",
        tooShort: "يرجى إدخال {count} أحرف على الأقل."
      },
      submit: "إرسال الطلب",
      sending: "جارٍ إرسال الطلب بأمان…",
      configError: "خدمة استقبال الطلبات غير مُعدّة بعد. لم يتم إرسال معلوماتك.",
      error: "تعذر تأكيد حفظ الطلب. ما زالت بياناتك موجودة ويمكنك إعادة المحاولة بأمان.",
      timeout: "لم يصلنا تأكيد بعد. قد يكون الطلب قيد المعالجة؛ إعادة المحاولة بالبيانات نفسها لن تنشئ طلبًا مكررًا.",
      placeholders: {
        industry: "اختر مجال الشركة",
        companySize: "اختر حجم الشركة",
        jobTitle: "اختر المسمى الوظيفي",
        service: "اختر الخدمة",
        package: "اختر الخدمة أولًا",
        budget: "اختر نطاق الميزانية",
        advertisingBudget: "اختر ميزانية الإعلان",
        summary: "أخبرنا عن نشاطك وما تحتاج إليه والتحديات الحالية والنتيجة التي تتطلع إليها."
      },
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
  const localizedMessages = messages[language];
  const data = window.ZATONA_SITE_DATA;

  if (data) {
    renderServices(data.services || [], language);
    renderPricing(data, language);
    renderContact(data.contact || {}, language, localizedMessages);
    renderSocials(data.socials || []);
    initializeRequestForm(data, window.ZATONA_CONFIG?.appsScriptUrl);
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
        cta.dataset.requestService = service.requestValue || service.id;
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
      const select = document.querySelector('[name="requestedService"]');
      if (select) {
        const option = Array.from(select.options).find((item) => item.value === cta.dataset.requestService);
        if (option) {
          select.value = option.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    });

    renderPanel(services[0].id);
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

  function initializeRequestForm(data, endpointValue) {
    const form = document.querySelector("[data-request-form]");
    if (!form) return;

    const config = data.requestForm;
    const localized = messages[language];
    const status = form.querySelector("[data-form-status]");
    const steps = Array.from(form.querySelectorAll("[data-form-step]"));
    const progress = document.querySelector("[data-request-progress]");
    const backButton = form.querySelector("[data-request-back]");
    const nextButton = form.querySelector("[data-request-next]");
    const submitButton = form.querySelector("[data-request-submit]");
    const submitLabel = form.querySelector("[data-submit-label]");
    const successPanel = document.querySelector("[data-request-success]");
    const responseFrame = document.querySelector('iframe[name="request-response-frame"]');
    const packageSelect = form.querySelector('[name="requestedPackage"]');
    const serviceSelect = form.querySelector('[name="requestedService"]');
    const advertisingField = form.querySelector("[data-advertising-budget-field]");
    const advertisingSelect = form.querySelector('[name="advertisingBudget"]');
    const summary = form.querySelector('[name="projectSummary"]');
    const counter = form.querySelector("[data-character-count]");
    const tokenField = form.querySelector("[data-submission-token]");
    const nonceField = form.querySelector("[data-response-nonce]");
    const startedAtField = form.querySelector("[data-form-started-at]");
    const parentOriginField = form.querySelector("[data-parent-origin]");
    const languageField = form.querySelector('[name="websiteLanguage"]');
    const requestIdNode = successPanel?.querySelector("[data-request-id]");
    const newRequestButton = successPanel?.querySelector("[data-new-request]");
    if (!config || !status || !steps.length || !progress || !backButton || !nextButton
      || !submitButton || !submitLabel || !successPanel || !responseFrame || !packageSelect
      || !serviceSelect || !advertisingField || !advertisingSelect || !summary || !counter
      || !tokenField || !nonceField || !startedAtField || !parentOriginField || !languageField
      || !requestIdNode || !newRequestButton) {
      console.error("ZATONA request form markup is incomplete.");
      return;
    }

    languageField.value = language;
    parentOriginField.value = window.location.origin;
    startedAtField.value = String(Date.now());
    document.documentElement.lang === "ar" ? form.setAttribute("dir", "rtl") : form.setAttribute("dir", "ltr");

    const fillSelect = (select, options, placeholder) => {
      const currentValue = select.value;
      select.replaceChildren(new Option(placeholder, "", true, true));
      select.options[0].disabled = true;
      options.forEach((item) => {
        const label = item.label?.[language] || item.label?.en || "";
        if (item.value && label) select.add(new Option(label, item.value));
      });
      if (currentValue && Array.from(select.options).some((option) => option.value === currentValue)) {
        select.value = currentValue;
      }
    };

    fillSelect(form.querySelector('[name="companyIndustry"]'), config.industries || [], localized.placeholders.industry);
    fillSelect(form.querySelector('[name="companySize"]'), config.companySizes || [], localized.placeholders.companySize);
    fillSelect(form.querySelector('[name="jobTitle"]'), config.jobTitles || [], localized.placeholders.jobTitle);
    fillSelect(form.querySelector('[name="estimatedBudget"]'), config.budgets || [], localized.placeholders.budget);
    fillSelect(advertisingSelect, config.advertisingBudgets || [], localized.placeholders.advertisingBudget);

    const selectableServices = data.services || [];
    fillSelect(serviceSelect, [
      ...selectableServices.map((service) => ({
        value: service.requestValue,
        label: service.requestName
      })),
      { value: "other_custom_request", label: { en: "Other / Custom Request", ar: "خدمة أخرى / طلب مخصص" } }
    ], localized.placeholders.service);

    const packageOptionsFor = (service) => {
      if (!service) return [];
      if (service.id === "design" || service.id === "career") return service.requestPackages || [];
      if (service.id === "other_custom_request") return config.otherPackages || [];
      return (service.packages || []).map((item) => ({
          value: item.requestValue,
          label: {
            en: [item.name?.en, typeof item.price === "string" ? item.price : item.price?.en].filter(Boolean).join(" — "),
            ar: [item.name?.ar || item.name?.en, typeof item.price === "string" ? item.price : item.price?.ar || item.price?.en].filter(Boolean).join(" — ")
          }
        }));
    };

    const updatePackages = () => {
      const service = selectableServices.find((item) => item.requestValue === serviceSelect.value)
        || (serviceSelect.value === "other_custom_request" ? { id: "other_custom_request" } : null);
      const placeholder = service ? localized.choose : localized.placeholders.package;
      packageSelect.value = "";
      fillSelect(packageSelect, packageOptionsFor(service), placeholder);
      packageSelect.disabled = !service;
      const isAdvertising = service?.requestValue === "paid_advertising";
      advertisingField.hidden = !isAdvertising;
      advertisingSelect.disabled = !isAdvertising;
      advertisingSelect.required = isAdvertising;
      if (!isAdvertising) advertisingSelect.value = "";
      clearFieldError(packageSelect);
      clearFieldError(advertisingSelect);
    };
    serviceSelect.addEventListener("change", updatePackages);

    let activeStep = 1;
    const updateStep = (step, focus = false) => {
      activeStep = step;
      steps.forEach((section) => {
        section.hidden = Number(section.dataset.formStep) !== step;
      });
      progress.querySelectorAll("[data-progress-step]").forEach((item) => {
        const stepNumber = Number(item.dataset.progressStep);
        if (stepNumber === step) item.setAttribute("aria-current", "step");
        else item.removeAttribute("aria-current");
      });
      backButton.hidden = step === 1;
      nextButton.hidden = step === steps.length;
      submitButton.hidden = step !== steps.length;
      setFormStatus(status, "", "");
      if (focus) {
        const heading = steps[step - 1].querySelector("h3");
        heading?.setAttribute("tabindex", "-1");
        heading?.focus();
      }
    };

    nextButton.addEventListener("click", () => {
      if (validateRequestStep(steps[activeStep - 1], localized)) updateStep(activeStep + 1, true);
    });
    backButton.addEventListener("click", () => updateStep(Math.max(1, activeStep - 1), true));

    const formatCount = () => {
      const formatter = new Intl.NumberFormat(language === "ar" ? "ar" : "en");
      counter.textContent = `${formatter.format(summary.value.length)} / ${formatter.format(2000)}`;
    };
    summary.addEventListener("input", formatCount);
    formatCount();

    form.addEventListener("input", (event) => {
      if (event.target instanceof HTMLElement) clearFieldError(event.target);
      setFormStatus(status, "", "");
    });
    form.addEventListener("change", (event) => {
      if (event.target instanceof HTMLElement) clearFieldError(event.target);
      setFormStatus(status, "", "");
    });

    let isSubmitting = false;
    let pendingSubmission = null;
    let tokenPayload = "";
    let timeoutId = 0;
    const allowedResponseOrigin = (origin) => {
      try {
        const hostname = new URL(origin).hostname;
        return hostname === "script.google.com" || hostname.endsWith(".googleusercontent.com");
      } catch {
        return false;
      }
    };

    window.addEventListener("message", (event) => {
      const result = event.data;
      if (!pendingSubmission || !allowedResponseOrigin(event.origin)
        || !result || result.type !== "zatona-request-result"
        || result.nonce !== pendingSubmission.nonce) return;
      window.clearTimeout(timeoutId);
      const request = pendingSubmission;
      pendingSubmission = null;
      isSubmitting = false;
      submitButton.disabled = false;
      backButton.disabled = false;
      nextButton.disabled = false;
      submitLabel.textContent = localized.submit;
      form.removeAttribute("aria-busy");
      if (result.ok === true && typeof result.requestId === "string"
        && /^ZA-\d{8}-[A-F0-9]{8}$/.test(result.requestId)) {
        form.hidden = true;
        successPanel.hidden = false;
        requestIdNode.textContent = result.requestId;
        setFormStatus(status, "", "");
        successPanel.querySelector("h3")?.focus();
        return;
      }
      setFormStatus(status, localized.error, "error");
      if (request.payload !== createPayloadFingerprint(form)) {
        tokenField.value = "";
        tokenPayload = "";
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (isSubmitting) return;
      if (!validateRequestStep(steps[activeStep - 1], localized)) return;

      const endpoint = getAppsScriptEndpoint(endpointValue);
      if (!endpoint) {
        setFormStatus(status, localized.configError, "error");
        return;
      }

      const payload = createPayloadFingerprint(form);
      if (!tokenField.value || tokenPayload !== payload) {
        tokenField.value = createRequestToken();
        tokenPayload = payload;
      }
      const nonce = createRequestToken();
      nonceField.value = nonce;
      parentOriginField.value = window.location.origin;
      pendingSubmission = { nonce, payload };
      isSubmitting = true;
      submitButton.disabled = true;
      backButton.disabled = true;
      nextButton.disabled = true;
      submitLabel.textContent = localized.sending;
      form.setAttribute("aria-busy", "true");
      setFormStatus(status, localized.sending, "loading");
      form.action = endpoint;
      form.target = responseFrame.name;
      timeoutId = window.setTimeout(() => {
        if (!pendingSubmission || pendingSubmission.nonce !== nonce) return;
        pendingSubmission = null;
        isSubmitting = false;
        submitButton.disabled = false;
        backButton.disabled = false;
        nextButton.disabled = false;
        submitLabel.textContent = localized.submit;
        form.removeAttribute("aria-busy");
        setFormStatus(status, localized.timeout, "error");
      }, 45000);
      HTMLFormElement.prototype.submit.call(form);
    });

    newRequestButton.addEventListener("click", () => {
      form.reset();
      tokenField.value = "";
      tokenPayload = "";
      nonceField.value = "";
      startedAtField.value = String(Date.now());
      parentOriginField.value = window.location.origin;
      languageField.value = language;
      successPanel.hidden = true;
      form.hidden = false;
      submitButton.disabled = false;
      backButton.disabled = false;
      nextButton.disabled = false;
      updatePackages();
      clearAllFieldErrors(form);
      updateStep(1, true);
      formatCount();
    });
    updatePackages();
    updateStep(1);
  }

  function validateRequestStep(step, localized) {
    if (!step) return false;
    const invalidFields = [];
    step.querySelectorAll("input, select, textarea").forEach((field) => {
      clearFieldError(field);
      const value = field.value.trim();
      let message = "";
      if (field.required && !value) {
        message = localized.validation.required;
      } else if (field.type === "email" && field.validity.typeMismatch) {
        message = localized.validation.invalidEmail;
      } else if (field.type === "url" && field.validity.typeMismatch) {
        message = localized.validation.invalidUrl;
      } else if (field.type === "tel" && !isValidPhone(value)) {
        message = localized.validation.invalidPhone;
      } else if (field.minLength > 0 && value.length < field.minLength) {
        message = localized.validation.tooShort.replace("{count}", String(field.minLength));
      }
      if (message) {
        setFieldError(field, message);
        invalidFields.push(field);
      }
    });
    if (!invalidFields.length) return true;
    invalidFields[0].focus();
    return false;
  }

  function isValidPhone(value) {
    const digits = value.replace(/\D/g, "");
    return /^\+?[0-9][0-9\s().-]*$/.test(value) && digits.length >= 7 && digits.length <= 15;
  }

  function setFieldError(field, message) {
    field.setAttribute("aria-invalid", "true");
    const error = document.querySelector(`[data-field-error="${CSS.escape(field.name)}"]`);
    if (error) error.textContent = message;
  }

  function clearFieldError(field) {
    field.removeAttribute("aria-invalid");
    const error = document.querySelector(`[data-field-error="${CSS.escape(field.name || "")}"]`);
    if (error) error.textContent = "";
  }

  function clearAllFieldErrors(form) {
    form.querySelectorAll("[data-field-error]").forEach((error) => {
      error.textContent = "";
    });
    form.querySelectorAll("[aria-invalid]").forEach((field) => field.removeAttribute("aria-invalid"));
  }

  function getAppsScriptEndpoint(value) {
    if (typeof value !== "string" || !value.trim()) return "";
    try {
      const endpoint = new URL(value.trim());
      return endpoint.protocol === "https:"
        && endpoint.hostname === "script.google.com"
        && /^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(endpoint.pathname)
        ? endpoint.href
        : "";
    } catch {
      return "";
    }
  }

  function createRequestToken() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    const bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  function createPayloadFingerprint(form) {
    return JSON.stringify(Array.from(new FormData(form).entries())
      .filter(([name]) => !["submissionToken", "responseNonce", "formStartedAt", "parentOrigin", "honeypot"].includes(name))
      .sort(([a], [b]) => a.localeCompare(b)));
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
