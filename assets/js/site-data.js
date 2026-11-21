// Quote-only catalog. To restore prices, add optional price fields and enable pricing.showPrices.
// Keep prices separate from names, feature text and request-option labels.
window.ZATONA_SITE_DATA = {
  services: [
    {
      id: "social",
      requestValue: "social_media_management",
      requestName: { en: "Social Media Management & Digital Marketing", ar: "إدارة السوشيال ميديا والتسويق الرقمي" },
      name: { en: "Social Media Management", ar: "إدارة وسائل التواصل والتسويق الرقمي" },
      description: { en: "Consistent planning, content, scheduling, and community engagement across your social channels.", ar: "تخطيط ومحتوى وجدولة ومتابعة تفاعل متناسقة عبر منصات التواصل الخاصة بك." },
      highlights: {
        en: ["Monthly content calendar", "Post writing and design", "Scheduling and engagement"],
        ar: ["تقويم محتوى شهري", "كتابة وتصميم المنشورات", "الجدولة ومتابعة التفاعل"]
      },
      visual: "01-social-media-management.webp",
      alt: { en: "Illustration of social media content planning", ar: "رسم توضيحي لتخطيط محتوى وسائل التواصل" },
      pricingLabel: { en: "Monthly packages", ar: "الباقات الشهرية" },
      packages: [
        {
          requestValue: "basic",
          name: { en: "Basic", ar: "الأساسية" },
          features: {
            en: ["Facebook and Instagram", "12 monthly posts", "Content writing", "12 post designs", "Monthly content calendar", "Weekly scheduling and engagement monitoring", "Monthly performance report"],
            ar: ["فيسبوك وإنستغرام", "12 منشورًا شهريًا", "كتابة المحتوى", "12 تصميم منشور", "تقويم محتوى شهري", "جدولة أسبوعية ومتابعة التفاعل", "تقرير أداء شهري"]
          }
        },
        {
          requestValue: "advanced",
          name: { en: "Advanced", ar: "المتقدمة" },
          featured: true,
          features: {
            en: ["Facebook, Instagram, and TikTok", "20 monthly posts", "Content writing", "20 post designs", "4 short videos", "Monthly content calendar", "Daily scheduling and engagement monitoring", "Comment replies", "Optional paid campaign management by agreement", "Monthly performance report", "Follow-up meeting every two months"],
            ar: ["فيسبوك وإنستغرام وتيك توك", "20 منشورًا شهريًا", "كتابة المحتوى", "20 تصميم منشور", "4 مقاطع قصيرة", "تقويم محتوى شهري", "جدولة ومتابعة تفاعل يومية", "الرد على التعليقات", "إدارة حملات مدفوعة اختيارية باتفاق", "تقرير أداء شهري", "اجتماع متابعة كل شهرين"]
          }
        },
        {
          requestValue: "professional",
          name: { en: "Professional", ar: "الاحترافية" },
          features: {
            en: ["Facebook, Instagram, TikTok, and LinkedIn", "30 monthly posts", "Content writing", "30 post designs", "8 short videos", "Monthly content calendar with review meeting", "Daily scheduling and engagement monitoring", "Comment replies and messages", "Up to 2 advertising campaigns monthly", "Weekly performance reporting and monthly analysis", "Monthly follow-up meeting"],
            ar: ["فيسبوك وإنستغرام وتيك توك ولينكدإن", "30 منشورًا شهريًا", "كتابة المحتوى", "30 تصميم منشور", "8 مقاطع قصيرة", "تقويم محتوى شهري مع اجتماع مراجعة", "جدولة ومتابعة تفاعل يومية", "الرد على التعليقات والرسائل", "حتى حملتين إعلانيين شهريًا", "تقارير أداء أسبوعية وتحليل شهري", "اجتماع متابعة شهري"]
          }
        }
      ],
      conditions: {
        en: ["Field photography and professional video production are available separately on request.", "The client pays advertising spend directly to the platforms, separately from agency management."],
        ar: ["التصوير الميداني وإنتاج الفيديو الاحترافي متاحان بشكل منفصل عند الطلب.", "يدفع العميل ميزانية الإعلانات مباشرة للمنصات، بشكل منفصل عن إدارة الوكالة."]
      }
    },
    {
      id: "support",
      requestValue: "customer_support",
      requestName: { en: "Customer Support", ar: "خدمة العملاء" },
      name: { en: "Customer Support", ar: "خدمة دعم العملاء" },
      description: { en: "Reliable customer communication, order follow-up, complaint handling, and recurring issue reporting.", ar: "تواصل موثوق مع العملاء، ومتابعة الطلبات والحجوزات، ومعالجة الشكاوى وإعداد تقارير المشكلات المتكررة." },
      highlights: {
        en: ["Messages and comments", "Orders and bookings", "Complaint escalation"],
        ar: ["الرسائل والتعليقات", "الطلبات والحجوزات", "تصعيد الشكاوى"]
      },
      visual: "02-customer-support.webp",
      alt: { en: "Illustration of customer support conversations", ar: "رسم توضيحي لمحادثات دعم العملاء" },
      pricingLabel: { en: "Monthly packages", ar: "الباقات الشهرية" },
      packages: [
        {
          requestValue: "basic",
          name: { en: "Basic", ar: "الأساسية" },
          features: {
            en: ["4 hours daily", "6 working days weekly", "2 channels", "Replying to messages and comments", "Initial complaint recording and escalation", "Target response time: within 15 minutes during working hours", "Up to 600 conversations monthly", "Weekly reports"],
            ar: ["4 ساعات يوميًا", "6 أيام عمل أسبوعيًا", "قناتان", "الرد على الرسائل والتعليقات", "تسجيل الشكاوى الأولي وتصعيدها", "استهداف الرد خلال 15 دقيقة أثناء ساعات العمل", "حتى 600 محادثة شهريًا", "تقارير أسبوعية"]
          }
        },
        {
          requestValue: "advanced",
          name: { en: "Advanced", ar: "المتقدمة" },
          featured: true,
          features: {
            en: ["8 hours daily", "6 working days weekly", "Up to 4 channels: WhatsApp, Facebook, Instagram, and email", "Replying to messages and comments", "Order and booking follow-up", "Complaint handling", "After-sales follow-up", "Target response time: within 10 minutes during working hours", "Up to 1,800 conversations monthly", "Weekly reports"],
            ar: ["8 ساعات يوميًا", "6 أيام عمل أسبوعيًا", "حتى 4 قنوات: واتساب وفيسبوك وإنستغرام والبريد", "الرد على الرسائل والتعليقات", "متابعة الطلبات والحجوزات", "معالجة الشكاوى", "متابعة ما بعد البيع", "استهداف الرد خلال 10 دقائق أثناء ساعات العمل", "حتى 1,800 محادثة شهريًا", "تقارير أسبوعية"]
          }
        },
        {
          requestValue: "integrated",
          name: { en: "Complete", ar: "المتكاملة" },
          features: {
            en: ["16 hours daily across two shifts", "7 working days weekly", "All channels and comments", "Replying to messages and comments", "Order and booking follow-up", "Complaint handling with escalation scenarios", "After-sales follow-up", "Target response time: within 5 minutes during working hours", "Up to 5,000 conversations monthly", "Daily reports and monthly analysis of recurring issues", "Quality supervisor"],
            ar: ["16 ساعة يوميًا على ورديتين", "7 أيام عمل أسبوعيًا", "جميع القنوات والتعليقات", "الرد على الرسائل والتعليقات", "متابعة الطلبات والحجوزات", "معالجة الشكاوى مع سيناريوهات التصعيد", "متابعة ما بعد البيع", "استهداف الرد خلال 5 دقائق أثناء ساعات العمل", "حتى 5,000 محادثة شهريًا", "تقارير يومية وتحليل شهري للمشكلات المتكررة", "مشرف جودة"]
          }
        }
      ],
      conditions: {
        en: ["Additional conversations can be arranged in blocks of 100 beyond the included monthly allowance.", "One-time setup and training covers response templates and case-handling scenarios; included at no setup charge with subscriptions of 6 months or longer.", "Response-time targets apply during the agreed working hours."],
        ar: ["يمكن إضافة المحادثات في مجموعات من 100 محادثة فوق الحد الشهري المشمول.", "يشمل التجهيز والتدريب الأولي إعداد الردود الجاهزة وسيناريوهات الحالات؛ ويُعفى من رسوم التجهيز عند الاشتراك لمدة 6 أشهر أو أكثر.", "أزمنة الرد المستهدفة تطبق خلال ساعات العمل المتفق عليها."]
      }
    },
    {
      id: "advertising",
      requestValue: "paid_advertising",
      requestName: { en: "Paid Advertising", ar: "إدارة الإعلانات الممولة" },
      name: { en: "Paid Advertising", ar: "الإعلانات المدفوعة" },
      description: { en: "Campaign setup, audience targeting, optimization, and transparent management reporting.", ar: "إعداد الحملات واستهداف الجمهور والتحسين والتقارير الشفافة لإدارة الحملات." },
      highlights: {
        en: ["Account and pixel setup", "Audience targeting", "Testing and optimization"],
        ar: ["إعداد الحساب والبكسل", "استهداف الجمهور", "الاختبار والتحسين"]
      },
      visual: "03-paid-advertising.webp",
      alt: { en: "Illustration of paid advertising campaign management", ar: "رسم توضيحي لإدارة حملات الإعلانات المدفوعة" },
      pricingLabel: { en: "Campaign management tiers", ar: "مستويات إدارة الحملات" },
      packages: [
        {
          requestValue: "ad_spend_under_20000",
          name: { en: "Management tier 1", ar: "مستوى الإدارة 1" },
          features: {
            en: ["Campaign scope agreed around your advertising budget", "4 advertising creatives per month", "Account setup, tracking and campaign planning", "A/B testing and weekly optimization", "Monthly performance report and recommendations"],
            ar: ["نطاق الحملة يحدد بالاتفاق وفق ميزانيتك الإعلانية", "4 تصاميم إعلانية شهريًا", "إعداد الحساب والتتبع وتخطيط الحملات", "اختبار A/B وتحسين أسبوعي", "تقرير أداء شهري وتوصيات"]
          }
        },
        {
          requestValue: "ad_spend_20001_60000",
          name: { en: "Management tier 2", ar: "مستوى الإدارة 2" },
          features: {
            en: ["Campaign scope agreed around your advertising budget", "4 advertising creatives per month", "Account setup, tracking and campaign planning", "A/B testing and weekly optimization", "Monthly performance report and recommendations"],
            ar: ["نطاق الحملة يحدد بالاتفاق وفق ميزانيتك الإعلانية", "4 تصاميم إعلانية شهريًا", "إعداد الحساب والتتبع وتخطيط الحملات", "اختبار A/B وتحسين أسبوعي", "تقرير أداء شهري وتوصيات"]
          }
        },
        {
          requestValue: "ad_spend_60001_150000",
          name: { en: "Management tier 3", ar: "مستوى الإدارة 3" },
          features: {
            en: ["Campaign scope agreed around your advertising budget", "8 advertising creatives per month", "Account setup, tracking and campaign planning", "A/B testing and weekly optimization", "Monthly performance report and recommendations"],
            ar: ["نطاق الحملة يحدد بالاتفاق وفق ميزانيتك الإعلانية", "8 تصاميم إعلانية شهريًا", "إعداد الحساب والتتبع وتخطيط الحملات", "اختبار A/B وتحسين أسبوعي", "تقرير أداء شهري وتوصيات"]
          }
        },
        {
          requestValue: "ad_spend_over_150000",
          name: { en: "Custom management", ar: "إدارة مخصصة" },
          features: {
            en: ["Campaign scope agreed around your advertising budget", "8 advertising creatives per month", "Account setup, tracking and campaign planning", "A/B testing and weekly optimization", "Monthly performance report and recommendations"],
            ar: ["نطاق الحملة يحدد بالاتفاق وفق ميزانيتك الإعلانية", "8 تصاميم إعلانية شهريًا", "إعداد الحساب والتتبع وتخطيط الحملات", "اختبار A/B وتحسين أسبوعي", "تقرير أداء شهري وتوصيات"]
          }
        }
      ],
      conditions: {
        en: ["Includes advertising account setup and Pixel / Conversions tracking.", "Audience targeting, campaign planning and budget allocation are included.", "The appropriate management tier is confirmed with your quote based on advertising spend and scope.", "Advertising spend is paid directly to platforms by the client, separately from management fees."],
        ar: ["تشمل الخدمة إعداد الحساب الإعلاني وأدوات تتبع البكسل والتحويلات.", "تشمل تحديد الجمهور المستهدف وبناء خطة الحملات وتوزيع الميزانية.", "يحدد مستوى الإدارة المناسب في عرض السعر وفق الإنفاق الإعلاني ونطاق العمل.", "يدفع العميل الإنفاق الإعلاني مباشرة للمنصات، بشكل منفصل عن أتعاب الإدارة."]
      }
    },
    {
      id: "design",
      requestValue: "graphic_design",
      requestName: { en: "Graphic Design", ar: "التصميم الجرافيكي" },
      name: { en: "Design, Posters & Video", ar: "التصميم والبوسترات والفيديو" },
      description: { en: "Focused visual assets for social content, campaigns, print, and short-form video.", ar: "تصاميم بصرية مركزة لمحتوى التواصل والحملات والطباعة والفيديو القصير." },
      highlights: {
        en: ["Social and advertising creatives", "Carousels and posters", "Short branded videos"],
        ar: ["تصاميم تواصل وإعلانات", "كاروسيل وملصقات", "فيديوهات قصيرة"]
      },
      visual: "04-graphic-design.webp",
      alt: { en: "Illustration of graphic design assets", ar: "رسم توضيحي لأعمال التصميم الجرافيكي" },
      pricingLabel: { en: "Individual services & bundles", ar: "الخدمات الفردية والباقات" },
      packages: [
        {
          name: { en: "Individual services", ar: "خدمات فردية" },
          features: {
            en: ["Social media post", "Story or cover", "Advertising creative", "Carousel up to 5 slides", "Print-ready poster or flyer", "Short video up to 30 seconds using client-provided materials"],
            ar: ["منشور وسائل تواصل", "ستوري أو غلاف", "تصميم إعلاني", "كاروسيل حتى 5 شرائح", "ملصق أو فلاير جاهز للطباعة", "فيديو قصير حتى 30 ثانية باستخدام مواد العميل"]
          }
        },
        {
          name: { en: "Design bundles", ar: "باقات التصاميم" },
          featured: true,
          features: {
            en: ["10-design bundle", "20-design bundle", "30-design bundle"],
            ar: ["باقة 10 تصميمات", "باقة 20 تصميمًا", "باقة 30 تصميمًا"]
          }
        }
      ],
      conditions: {
        en: ["Two revision rounds per design.", "Delivery within 2–3 working days.", "Source files cost extra."],
        ar: ["جولتا تعديل لكل تصميم.", "التسليم خلال 2–3 أيام عمل.", "ملفات المصدر بتكلفة إضافية."]
      },
      requestPackages: [
        {
          value: "social_post",
          label: { en: "Social media post", ar: "منشور وسائل تواصل" }
        },
        {
          value: "story_or_cover",
          label: { en: "Story or cover", ar: "ستوري أو غلاف" }
        },
        {
          value: "advertising_creative",
          label: { en: "Advertising creative", ar: "تصميم إعلاني" }
        },
        {
          value: "carousel_up_to_5",
          label: { en: "Carousel up to 5 slides", ar: "كاروسيل حتى 5 شرائح" }
        },
        {
          value: "print_poster_flyer",
          label: { en: "Print-ready poster or flyer", ar: "ملصق أو فلاير جاهز للطباعة" }
        },
        {
          value: "short_video_up_to_30",
          label: { en: "Short video up to 30 seconds", ar: "فيديو قصير حتى 30 ثانية" }
        },
        {
          value: "design_bundle_10",
          label: { en: "10-design bundle", ar: "باقة 10 تصاميم" }
        },
        {
          value: "design_bundle_20",
          label: { en: "20-design bundle", ar: "باقة 20 تصميمًا" }
        },
        {
          value: "design_bundle_30",
          label: { en: "30-design bundle", ar: "باقة 30 تصميمًا" }
        }
      ]
    },
    {
      id: "career",
      requestValue: "cv_career_services",
      requestName: { en: "CV & Career Services", ar: "خدمات السيرة الذاتية والمسار المهني" },
      name: { en: "CV & Career Services", ar: "خدمات السيرة الذاتية والمسار المهني" },
      description: { en: "Professional CV, cover letter, and LinkedIn support for clearer career opportunities.", ar: "سيرة ذاتية احترافية وخطاب تقديم وتحسين لينكدإن لفرص مهنية أوضح." },
      highlights: {
        en: ["Bilingual CVs", "Cover letters", "LinkedIn optimization"],
        ar: ["سير ذاتية ثنائية اللغة", "خطابات تقديم", "تحسين لينكدإن"]
      },
      visual: "05-cv-and-linkedin.webp",
      alt: { en: "Illustration of CV and LinkedIn career services", ar: "رسم توضيحي لخدمات السيرة الذاتية ولينكدإن" },
      pricingLabel: { en: "Career services", ar: "خدمات المسار المهني" },
      packages: [
        {
          name: { en: "Individual services", ar: "خدمات فردية" },
          features: {
            en: ["Professional CV in one language", "Arabic and English CV", "CV with cover letter", "LinkedIn profile optimization"],
            ar: ["سيرة ذاتية احترافية بلغة واحدة", "سيرة ذاتية عربية وإنجليزية", "سيرة ذاتية مع خطاب تقديم", "تحسين ملف لينكدإن"]
          }
        },
        {
          name: { en: "Complete career package", ar: "حزمة المسار المهني الكاملة" },
          featured: true,
          features: {
            en: ["Bilingual CV", "Cover letter", "LinkedIn profile optimization"],
            ar: ["سيرة ذاتية ثنائية اللغة", "خطاب تقديم", "تحسين ملف لينكدإن"]
          }
        }
      ],
      conditions: {
        en: ["Delivery within 48 hours.", "One free revision within 7 days.", "Urgent delivery within 24 hours is available on request; any extra fee is confirmed in your quote."],
        ar: ["التسليم خلال 48 ساعة.", "تعديل مجاني واحد خلال 7 أيام.", "التسليم العاجل خلال 24 ساعة متاح عند الطلب؛ وأي رسوم إضافية توضح في عرض السعر."]
      },
      requestPackages: [
        {
          value: "professional_cv",
          label: { en: "Professional CV", ar: "سيرة ذاتية احترافية" }
        },
        {
          value: "bilingual_cv",
          label: { en: "Bilingual CV", ar: "سيرة ذاتية ثنائية اللغة" }
        },
        {
          value: "cv_cover_letter",
          label: { en: "CV + Cover Letter", ar: "سيرة ذاتية + خطاب تقديم" }
        },
        {
          value: "linkedin_optimization",
          label: { en: "LinkedIn Profile Optimization", ar: "تحسين ملف لينكدإن" }
        },
        {
          value: "complete_career_package",
          label: { en: "Complete Career Package", ar: "حزمة المسار المهني الكاملة" }
        }
      ]
    }
  ],
  requestForm: {
    industries: [
      {
        value: "ecommerce",
        label: { en: "E-commerce", ar: "التجارة الإلكترونية" }
      },
      {
        value: "education",
        label: { en: "Education", ar: "التعليم والتدريب" }
      },
      {
        value: "healthcare",
        label: { en: "Healthcare", ar: "الصحة والطب" }
      },
      {
        value: "real_estate",
        label: { en: "Real Estate", ar: "العقارات" }
      },
      {
        value: "hospitality",
        label: { en: "Hospitality", ar: "المطاعم والضيافة" }
      },
      {
        value: "technology",
        label: { en: "Technology", ar: "التكنولوجيا والبرمجيات" }
      },
      {
        value: "professional_services",
        label: { en: "Professional Services", ar: "الخدمات المهنية" }
      },
      {
        value: "manufacturing",
        label: { en: "Manufacturing", ar: "التصنيع والصناعة" }
      },
      {
        value: "retail",
        label: { en: "Retail", ar: "البيع بالتجزئة" }
      },
      {
        value: "other",
        label: { en: "Other", ar: "أخرى" }
      }
    ],
    companySizes: [
      {
        value: "startup",
        label: { en: "Startup", ar: "شركة ناشئة" }
      },
      {
        value: "small",
        label: { en: "Small Business", ar: "شركة صغيرة" }
      },
      {
        value: "established",
        label: { en: "Established Company", ar: "شركة قائمة" }
      }
    ],
    jobTitles: [
      {
        value: "founder",
        label: { en: "Founder", ar: "مؤسس" }
      },
      {
        value: "ceo",
        label: { en: "CEO", ar: "مدير تنفيذي" }
      },
      {
        value: "marketing_manager",
        label: { en: "Marketing Manager", ar: "مدير تسويق" }
      },
      {
        value: "business_owner",
        label: { en: "Business Owner", ar: "صاحب شركة" }
      },
      {
        value: "hr_manager",
        label: { en: "HR Manager", ar: "مدير موارد بشرية" }
      },
      {
        value: "other",
        label: { en: "Other", ar: "أخرى" }
      }
    ],
    budgets: [
      {
        value: "under_3000",
        label: { en: "Under EGP 3,000", ar: "أقل من 3,000 جنيه" }
      },
      {
        value: "egp_3000_5000",
        label: { en: "EGP 3,000–5,000", ar: "3,000–5,000 جنيه" }
      },
      {
        value: "egp_5001_10000",
        label: { en: "EGP 5,001–10,000", ar: "5,001–10,000 جنيه" }
      },
      {
        value: "egp_10001_20000",
        label: { en: "EGP 10,001–20,000", ar: "10,001–20,000 جنيه" }
      },
      {
        value: "egp_20001_50000",
        label: { en: "EGP 20,001–50,000", ar: "20,001–50,000 جنيه" }
      },
      {
        value: "over_50000",
        label: { en: "Above EGP 50,000", ar: "أكثر من 50,000 جنيه" }
      },
      {
        value: "undecided",
        label: { en: "Not sure yet", ar: "غير محددة بعد" }
      }
    ],
    advertisingBudgets: [
      {
        value: "under_20000",
        label: { en: "Under EGP 20,000", ar: "أقل من 20,000 جنيه" }
      },
      {
        value: "egp_20001_60000",
        label: { en: "EGP 20,001–60,000", ar: "20,001–60,000 جنيه" }
      },
      {
        value: "egp_60001_150000",
        label: { en: "EGP 60,001–150,000", ar: "60,001–150,000 جنيه" }
      },
      {
        value: "over_150000",
        label: { en: "Above EGP 150,000", ar: "أكثر من 150,000 جنيه" }
      },
      {
        value: "undecided",
        label: { en: "Not decided yet", ar: "لم تُحدد بعد" }
      }
    ],
    otherPackages: [
      {
        value: "not_sure",
        label: { en: "Not sure yet", ar: "لست متأكدًا بعد" }
      },
      {
        value: "custom_request",
        label: { en: "Custom request", ar: "طلب مخصص" }
      }
    ]
  },
  addOns: [
    {
      name: { en: "Additional platform: management & content", ar: "منصة إضافية: إدارة ومحتوى" }
    },
    {
      name: { en: "10 extra posts: writing & design", ar: "10 منشورات إضافية: محتوى وتصميم" }
    },
    {
      name: { en: "Additional short video", ar: "مقطع فيديو قصير إضافي" }
    },
    {
      name: { en: "Field photography", ar: "تصوير ميداني" }
    }
  ],
  discounts: [
    {
      name: { en: "3-month subscription", ar: "اشتراك 3 أشهر" },
      value: { en: "5%", ar: "5%" }
    },
    {
      name: { en: "6-month subscription", ar: "اشتراك 6 أشهر" },
      value: { en: "10%", ar: "10%" }
    },
    {
      name: { en: "12-month subscription", ar: "اشتراك 12 شهرًا" },
      value: { en: "15%", ar: "15%" }
    },
    {
      name: { en: "Social media + customer support", ar: "وسائل التواصل + دعم العملاء" },
      value: { en: "Additional 10%", ar: "خصم إضافي 10%" }
    }
  ],
  discountCondition: { en: "Maximum total discount: 20% of monthly service fees.", ar: "الحد الأقصى لإجمالي الخصم: 20% من رسوم الخدمات الشهرية." },
  contact: {
    email: "zatonaagency@gmail.com",
    phone: "",
    whatsapp: ""
  },
  whatsapp: {
    enabled: false,
    number: ""
  },
  socials: [
    {
      label: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61596383833719"
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com/zatonaag/"
    },
    {
      label: "TikTok",
      url: "https://www.tiktok.com/@zatona.agency?_r=1&_t=ZS-9BY0sBPiHpO"
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/zatona-agency-02b350450/"
    }
  ],
  pricing: {
    showPrices: false
  },
  terms: {
    en: ["Monthly packages have a minimum subscription of 3 months. Cancellation requires 30 days of written notice.", "Monthly fees are paid before work begins. Work starts after the first payment, brand information and required account access are received.", "Content calendars need approval at least 5 days before the start of each month. Late approval may delay publication without reducing fees.", "We follow best practices to improve performance. Specific sales or results are not guaranteed and depend on the market, product and budget.", "Client data and accounts are kept confidential and used only to deliver the agreed service.", "Your tailored quote confirms fees, any applicable tax, validity and scope. A change in scope may require a revised quote."],
    ar: ["الحد الأدنى للاشتراك في الباقات الشهرية 3 أشهر، ويتطلب الإنهاء إخطارًا كتابيًا قبل 30 يومًا.", "تسدد أتعاب كل شهر مقدمًا. ويبدأ العمل بعد سداد الدفعة الأولى واستلام بيانات العلامة التجارية والصلاحيات اللازمة.", "يعتمد العميل جدول المحتوى قبل بداية كل شهر بخمسة أيام على الأقل. وقد يؤدي التأخر في الاعتماد إلى تأخر النشر دون خفض الأتعاب.", "نعمل وفق أفضل الممارسات لتحسين الأداء، ولا نضمن مبيعات أو نتائج محددة لارتباطها بالسوق والمنتج والميزانية.", "نلتزم بسرية بيانات العميل وحساباته، ولا نستخدمها إلا لتنفيذ الخدمة المتفق عليها.", "يوضح عرض السعر المخصص الأتعاب والضريبة إن استحقت وصلاحية العرض ونطاق العمل. وقد يتطلب تغيير النطاق تحديث العرض."]
  }
};
