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
        tooShort: "Please enter at least {count} characters.",
        summaryTooLongForAdvertisingBudget: "Shorten the project summary to leave room for the advertising budget.",
        formIncomplete: "Please review the highlighted fields before submitting."
      },
      submit: "Send request",
      sending: "Sending securely…",
      configError: "The request service is not configured yet. Your information has not been sent.",
      error: "We couldn’t confirm that your request was saved. Your details are still here. Please contact ZATONA before retrying to avoid a duplicate.",
      timeout: "We couldn’t confirm whether your request was saved. Your details are still here. Please contact ZATONA before retrying to avoid a duplicate.",
      honeypot: "The request could not be submitted. Please refresh the page and try again.",
      stepDescriptions: {
        company: "Tell us a little about your company and what it does.",
        contact: "Share the best way to reach the person responsible for this request.",
        project: "Choose the service you need and describe the result you are looking for."
      },
      placeholders: {
        companyName: "Enter the company name",
        industry: "Choose an industry",
        companySize: "Choose company size",
        companyWebsite: "Example: https://example.com",
        contactName: "Enter your full name",
        jobTitle: "Choose a job title",
        email: "name@example.com",
        phone: "Include your country calling code",
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
        tooShort: "يرجى إدخال {count} أحرف على الأقل.",
        summaryTooLongForAdvertisingBudget: "اختصر ملخص المشروع لإتاحة مساحة لميزانية الإعلان.",
        formIncomplete: "يرجى مراجعة الحقول المحددة قبل إرسال الطلب."
      },
      submit: "إرسال الطلب",
      sending: "جارٍ إرسال الطلب بأمان…",
      configError: "خدمة استقبال الطلبات غير مُعدّة بعد. لم يتم إرسال معلوماتك.",
      error: "تعذر تأكيد حفظ الطلب. ما زالت بياناتك موجودة. يرجى التواصل مع زتونة قبل إعادة الإرسال لتجنب تكرار الطلب.",
      timeout: "تعذر التأكد من حفظ الطلب. ما زالت بياناتك موجودة. يرجى التواصل مع زتونة قبل إعادة الإرسال لتجنب تكرار الطلب.",
      honeypot: "تعذر إرسال الطلب. حدّث الصفحة ثم حاول مرة أخرى.",
      stepDescriptions: {
        company: "أخبرنا قليلًا عن شركتك وطبيعة نشاطها.",
        contact: "أخبرنا كيف يمكننا التواصل مع الشخص المسؤول عن هذا الطلب.",
        project: "اختر الخدمة التي تحتاج إليها واشرح النتيجة التي تسعى إليها."
      },
      placeholders: {
        companyName: "أدخل اسم الشركة",
        industry: "اختر نشاط الشركة",
        companySize: "اختر حجم الشركة",
        companyWebsite: "رابط مثال: https://example.com",
        contactName: "أدخل الاسم بالكامل",
        jobTitle: "اختر المسمى الوظيفي",
        email: "أدخل البريد الإلكتروني",
        phone: "أدخل رقم الهاتف مع رمز الدولة",
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
    const packageSelect = form.querySelector('[name="requestedPackage"]');
    const serviceSelect = form.querySelector('[name="requestedService"]');
    const advertisingField = form.querySelector("[data-advertising-budget-field]");
    const advertisingSelect = form.querySelector('[name="advertisingBudget"]');
    const summary = form.querySelector('[name="projectSummary"]');
    const counter = form.querySelector("[data-character-count]");
    const tokenField = form.querySelector("[data-submission-token]");
    const honeypot = form.querySelector('[name="website"]');
    const requestIdNode = successPanel?.querySelector("[data-request-id]");
    const requestReference = successPanel?.querySelector(".request-reference");
    const newRequestButton = successPanel?.querySelector("[data-new-request]");
    if (!config || !status || !steps.length || !progress || !backButton || !nextButton
      || !submitButton || !submitLabel || !successPanel || !packageSelect
      || !serviceSelect || !advertisingField || !advertisingSelect || !summary || !counter
      || !tokenField || !honeypot || !newRequestButton) {
      console.error("ZATONA request form markup is incomplete.");
      return;
    }

    const formData = {
      companyName: form.elements.namedItem("companyName").value,
      companyIndustry: form.elements.namedItem("companyIndustry").value,
      companySize: form.elements.namedItem("companySize").value,
      companyWebsite: form.elements.namedItem("companyWebsite").value,
      contactName: form.elements.namedItem("contactName").value,
      jobTitle: form.elements.namedItem("jobTitle").value,
      email: form.elements.namedItem("email").value,
      phone: form.elements.namedItem("phone").value,
      requestedService: form.elements.namedItem("requestedService").value,
      requestedPackage: form.elements.namedItem("requestedPackage").value,
      estimatedBudget: form.elements.namedItem("estimatedBudget").value,
      advertisingBudget: form.elements.namedItem("advertisingBudget").value,
      projectSummary: form.elements.namedItem("projectSummary").value
    };
    const formStateKey = "zatona-request-form-v1";
    const formDataFields = Object.keys(formData);
    let requestConfirmed = false;
    const restoreFormData = () => {
      try {
        const stored = window.sessionStorage.getItem(formStateKey);
        if (!stored) return;
        const saved = JSON.parse(stored);
        if (!saved || typeof saved !== "object" || Array.isArray(saved)) return;
        formDataFields.forEach((name) => {
          if (typeof saved[name] === "string") formData[name] = saved[name];
        });
      } catch (error) {
        console.warn("Could not restore the saved ZATONA request form state.", error);
      }
    };
    const persistFormData = () => {
      if (requestConfirmed) return;
      formDataFields.forEach((name) => {
        formData[name] = form.elements.namedItem(name).value;
      });
      try {
        window.sessionStorage.setItem(formStateKey, JSON.stringify(formData));
      } catch (error) {
        console.warn("Could not save the ZATONA request form state.", error);
      }
    };
    const clearFormData = () => {
      formDataFields.forEach((name) => {
        formData[name] = "";
      });
      try {
        window.sessionStorage.removeItem(formStateKey);
      } catch (error) {
        console.warn("Could not clear the saved ZATONA request form state.", error);
      }
    };
    restoreFormData();
    form.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    form.elements.namedItem("companyName").placeholder = localized.placeholders.companyName;
    form.elements.namedItem("companyWebsite").placeholder = localized.placeholders.companyWebsite;
    form.elements.namedItem("contactName").placeholder = localized.placeholders.contactName;
    form.elements.namedItem("email").placeholder = localized.placeholders.email;
    form.elements.namedItem("phone").placeholder = localized.placeholders.phone;
    summary.placeholder = localized.placeholders.summary;

    const fillSelect = (select, options, placeholder, selectedValue = select.value) => {
      select.replaceChildren(new Option(placeholder, "", true, true));
      select.options[0].disabled = true;
      options.forEach((item) => {
        const label = item.label?.[language];
        if (item.value && label) {
          select.add(new Option(label, item.value));
        } else {
          console.error("A ZATONA request option is missing its localized label.", {
            value: item.value,
            language
          });
        }
      });
      if (selectedValue && Array.from(select.options).some((option) => option.value === selectedValue)) {
        select.value = selectedValue;
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

    formDataFields
      .filter((name) => name !== "requestedPackage" && name !== "advertisingBudget")
      .forEach((name) => {
        form.elements.namedItem(name).value = formData[name];
      });

    const packageOptionsFor = (service) => {
      if (!service) return [];
      if (service.id === "design" || service.id === "career") return service.requestPackages || [];
      if (service.id === "other_custom_request") return config.otherPackages || [];
      return (service.packages || []).map((item) => ({
          value: item.requestValue,
          label: {
            en: [item.name?.en, typeof item.price === "string" ? item.price : item.price?.en].filter(Boolean).join(" — "),
            ar: [
              item.name?.ar,
              typeof item.price === "string"
                ? item.price.replace(/^EGP\s*([\d,]+)(.*)$/i, "$1 جنيه$2")
                : item.price?.ar
            ].filter(Boolean).join(" — ")
          }
        }));
    };

    const updatePackages = () => {
      const service = selectableServices.find((item) => item.requestValue === serviceSelect.value)
        || (serviceSelect.value === "other_custom_request" ? { id: "other_custom_request" } : null);
      const placeholder = service ? localized.choose : localized.placeholders.package;
      fillSelect(packageSelect, packageOptionsFor(service), placeholder, formData.requestedPackage);
      packageSelect.disabled = !service;
      const isAdvertising = service?.requestValue === "paid_advertising";
      advertisingField.hidden = !isAdvertising;
      advertisingSelect.disabled = !isAdvertising;
      advertisingSelect.required = isAdvertising;
      fillSelect(advertisingSelect, config.advertisingBudgets || [], localized.placeholders.advertisingBudget, formData.advertisingBudget);
      if (!isAdvertising) advertisingSelect.value = "";
      formData.requestedPackage = packageSelect.value;
      formData.advertisingBudget = advertisingSelect.value;
      clearFieldError(packageSelect);
      clearFieldError(advertisingSelect);
    };
    serviceSelect.addEventListener("change", () => {
      formData.requestedService = serviceSelect.value;
      formData.requestedPackage = "";
      formData.advertisingBudget = "";
      updatePackages();
      persistFormData();
    });

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

    nextButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (validateRequestStep(steps[activeStep - 1], localized)) {
        updateStep(activeStep + 1, true);
      } else {
        setFormStatus(status, localized.validation.formIncomplete, "error");
      }
    });
    backButton.addEventListener("click", (event) => {
      event.preventDefault();
      updateStep(Math.max(1, activeStep - 1), true);
    });

    const formatCount = () => {
      const formatter = new Intl.NumberFormat(language === "ar" ? "ar" : "en");
      counter.textContent = `${formatter.format(summary.value.length)} / ${formatter.format(2000)}`;
    };
    summary.addEventListener("input", formatCount);
    formatCount();

    form.addEventListener("input", (event) => {
      if (event.target instanceof HTMLElement) clearFieldError(event.target);
      setFormStatus(status, "", "");
      persistFormData();
    });
    form.addEventListener("change", (event) => {
      if (event.target instanceof HTMLElement) clearFieldError(event.target);
      setFormStatus(status, "", "");
      persistFormData();
    });
    window.addEventListener("pagehide", persistFormData);

    let isSubmitting = false;
    let tokenPayload = "";

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (isSubmitting) return;
      if (event.submitter !== submitButton) {
        if (activeStep < steps.length && validateRequestStep(steps[activeStep - 1], localized)) {
          updateStep(activeStep + 1, true);
        }
        return;
      }
      if (activeStep !== steps.length) return;
      const invalidSteps = steps.filter((step) => !validateRequestStep(step, localized, false));
      const firstInvalidStep = invalidSteps[0];
      if (firstInvalidStep) {
        const invalidStepNumber = Number(firstInvalidStep.dataset.formStep);
        updateStep(invalidStepNumber, true);
        firstInvalidStep.querySelector('[aria-invalid="true"]')?.focus();
        setFormStatus(status, localized.validation.formIncomplete, "error");
        return;
      }

      const endpoint = getAppsScriptEndpoint(endpointValue);
      if (!endpoint) {
        setFormStatus(status, localized.configError, "error");
        return;
      }

      if (honeypot.value.trim()) {
        setFormStatus(status, localized.honeypot, "error");
        return;
      }

      const advertisingBudget = advertisingSelect.disabled
        ? ""
        : advertisingSelect.selectedOptions[0]?.textContent?.trim() || "";
      const projectSummary = advertisingBudget
        ? `${formData.projectSummary.trim()}\n\n${language === "ar" ? "الإنفاق الإعلاني الشهري" : "Monthly advertising spend"}: ${advertisingBudget}`
        : formData.projectSummary.trim();
      if (projectSummary.length > 2000) {
        setFieldError(summary, localized.validation.summaryTooLongForAdvertisingBudget);
        setFormStatus(status, localized.validation.formIncomplete, "error");
        return;
      }
      const payload = {
        companyName: formData.companyName.trim(),
        industry: formData.companyIndustry,
        companySize: formData.companySize,
        companyWebsite: formData.companyWebsite.trim(),
        contactName: formData.contactName.trim(),
        jobTitle: formData.jobTitle,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        requestedService: formData.requestedService,
        requestedPackage: formData.requestedPackage,
        estimatedBudget: formData.estimatedBudget,
        projectSummary,
        language,
        website: ""
      };
      const payloadFingerprint = JSON.stringify(payload);
      const submissionToken = tokenField.value;
      if (!submissionToken || tokenPayload !== payloadFingerprint) {
        tokenField.value = createRequestToken();
        tokenPayload = payloadFingerprint;
      }
      isSubmitting = true;
      submitButton.disabled = true;
      backButton.disabled = true;
      nextButton.disabled = true;
      submitLabel.textContent = localized.sending;
      form.setAttribute("aria-busy", "true");
      setFormStatus(status, localized.sending, "loading");
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 45000);
      fetch(endpoint, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        redirect: "follow",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: new URLSearchParams({
          payload: JSON.stringify(payload),
          submissionToken: tokenField.value
        }),
        signal: controller.signal
      }).then(async (response) => {
        if (!response.ok || response.type === "opaque") {
          throw new Error(`Apps Script returned HTTP ${response.status} without a readable response.`);
        }
        const result = await response.json();
        if (!result || typeof result !== "object" || Array.isArray(result)) {
          throw new Error("Apps Script returned an invalid response.");
        }
        if (result.success !== true) {
          setFormStatus(status, localized.error, "error");
          return;
        }

        requestConfirmed = true;
        clearFormData();
        form.hidden = true;
        successPanel.hidden = false;
        const requestId = [result.requestId, result.serialNumber, result.serial]
          .find((value) => typeof value === "string" && value.trim());
        if (requestIdNode && requestReference) {
          requestIdNode.textContent = requestId || "";
          requestReference.hidden = !requestId;
        }
        setFormStatus(status, "", "");
        successPanel.querySelector("h3")?.focus();
      }).catch((error) => {
        if (error.name === "AbortError") {
          setFormStatus(status, localized.timeout, "error");
        } else {
          console.error("ZATONA Apps Script submission failed.", error);
          setFormStatus(status, localized.error, "error");
        }
      }).finally(() => {
        window.clearTimeout(timeoutId);
        isSubmitting = false;
        submitButton.disabled = false;
        backButton.disabled = false;
        nextButton.disabled = false;
        submitLabel.textContent = localized.submit;
        form.removeAttribute("aria-busy");
      });
    });

    newRequestButton.addEventListener("click", () => {
      form.reset();
      requestConfirmed = false;
      clearFormData();
      tokenField.value = "";
      tokenPayload = "";
      formDataFields.forEach((name) => {
        formData[name] = form.elements.namedItem(name).value;
      });
      successPanel.hidden = true;
      if (requestReference) requestReference.hidden = true;
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
    persistFormData();
    updateStep(1);
  }

  function validateRequestStep(step, localized, focusInvalid = true) {
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
        const count = new Intl.NumberFormat(language).format(field.minLength);
        message = localized.validation.tooShort.replace("{count}", count);
      }
      if (message) {
        setFieldError(field, message);
        invalidFields.push(field);
      }
    });
    if (!invalidFields.length) return true;
    if (focusInvalid) invalidFields[0].focus();
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
