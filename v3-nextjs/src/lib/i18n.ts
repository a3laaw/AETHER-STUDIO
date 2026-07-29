/**
 * AURA Studio — Bilingual content (Arabic primary + English)
 * All copy lives here so the layout components stay clean.
 */

export type Lang = "ar" | "en";

export const t = {
  /* ---------- Header / Nav ---------- */
  nav: {
    projects: { ar: "المشاريع", en: "Projects" },
    how: { ar: "كيف يعمل", en: "How it Works" },
    platform: { ar: "المنصة", en: "Platform" },
    audience: { ar: "لمن", en: "Who it's for" },
    cta: { ar: "اطلب عرضاً تجريبياً", en: "Request Live Demo" },
    explore: { ar: "استكشف فيلا سولارا", en: "Explore Villa Solara" },
  },

  /* ---------- Hero ---------- */
  hero: {
    badge: { ar: "منصة توثيق وبناء متواصل", en: "Continuous build documentation" },
    title1: { ar: "من أول حجر…", en: "From the first stone" },
    title2: { ar: "حتى آخر غرفة", en: "to the last room" },
    subtitle: {
      ar: "فيلم واحد متواصل لمشروعك",
      en: "One continuous living record of your project",
    },
    subline: {
      ar: "منصة واحدة تجمع التوثيق البصري الحي، لوحات التحكم الذكية، والجولات التفاعلية لشركات التطوير والمقاولات والتشطيبات.",
      en: "One platform combining live visual documentation, smart control dashboards, and interactive walkthroughs for developers, contractors, and finishing teams.",
    },
    primaryCta: { ar: "اطلب تجربة حية", en: "Request Live Demo" },
    secondaryCta: { ar: "استكشف فيلا سولارا", en: "Explore Villa Solara" },
    trust: { ar: "يستخدمها مطورون في الخليج", en: "Trusted by Gulf developers" },
  },

  /* ---------- Live Project Proof ---------- */
  proof: {
    eyebrow: { ar: "مشروع حي", en: "Live Project" },
    title: { ar: "فيلا سولارا", en: "Villa Solara" },
    location: { ar: "الكويت — الأحمدي", en: "Kuwait — Al Ahmadi" },
    badge: { ar: "مشروع تجريبي حي", en: "Live Demo Project" },
    completion: { ar: "نسبة الإنجاز", en: "Completion" },
    phase: { ar: "المرحلة الحالية", en: "Current phase" },
    lastUpdate: { ar: "آخر تحديث", en: "Last update" },
    nextMilestone: { ar: "المرحلة التالية", en: "Next milestone" },
    qualityScore: { ar: "نسبة الجودة", en: "Quality score" },
    openIssues: { ar: "ملاحظات مفتوحة", en: "Open issues" },
    budgetVariance: { ar: "انحراف الميزانية", en: "Budget variance" },
    note: {
      ar: "البيانات المعروضة لأغراض العرض. في النسخة الحقيقية تُحدَّث تلقائياً من الموقع.",
      en: "Data shown for demo purposes. In production, it updates automatically from the site.",
    },
    insightStructural: { ar: "السلامة الإنشائية", en: "Structural Health" },
    insightMaterials: { ar: "حالة المواد", en: "Materials Status" },
    insightSmart: { ar: "الأنظمة الذكية", en: "Smart Systems" },
    insightCost: { ar: "التكلفة والجدول", en: "Cost & Schedule" },
    insightQA: { ar: "الجودة والسلامة", en: "QA & Safety" },
  },

  /* ---------- How it Works ---------- */
  how: {
    eyebrow: { ar: "كيف يعمل", en: "How it Works" },
    title: { ar: "أربع خطوات. فيلم واحد.", en: "Four steps. One film." },
    subtitle: {
      ar: "من أول التقطيع في الموقع حتى تسليم الفيلم النهائي للعميل — كل خطوة مدمجة في منصة واحدة.",
      en: "From the first site cut to the final film delivered to your client — every step integrated into one platform.",
    },
    steps: [
      {
        num: "01",
        title: { ar: "وثّق باستمرار", en: "Document continuously" },
        desc: {
          ar: "صور وفيديو ودرون من الموقع — تُرفع وتُنظّم تلقائياً حسب المرحلة والغرفة.",
          en: "Photos, video, and drone captures — auto-organized by stage and room.",
        },
      },
      {
        num: "02",
        title: { ar: "راقب لحظة بلحظة", en: "Monitor in real time" },
        desc: {
          ar: "لوحات حية للجودة والتكلفة والجدول، مع تنبيهات ذكية لأي انحراف.",
          en: "Live dashboards for quality, cost, and schedule with smart deviation alerts.",
        },
      },
      {
        num: "03",
        title: { ar: "جُل بالعميل", en: "Walk the client through" },
        desc: {
          ar: "جولات 360° ومخطط تفاعلي — العميل يدخل المشروع من أي مكان.",
          en: "360° tours and interactive floor plan — your client walks the project from anywhere.",
        },
      },
      {
        num: "04",
        title: { ar: "سلّم فيلماً نهائياً", en: "Deliver the final film" },
        desc: {
          ar: "فيلم متواصل للمشروع + تقارير جاهزة للتسليم والمشاركة.",
          en: "Continuous project film + ready-to-share reports.",
        },
      },
    ],
  },

  /* ---------- Platform Capabilities ---------- */
  capabilities: {
    eyebrow: { ar: "المنصة", en: "Platform" },
    title: { ar: "أربع قدرات. مصدر واحد للحقيقة.", en: "Four capabilities. One source of truth." },
    items: [
      {
        icon: "Camera",
        title: { ar: "توثيق بصري متواصل", en: "Continuous Visual Documentation" },
        desc: {
          ar: "كل صورة ومقطع فيديو يُحفظ تلقائياً في سياقه الصحيح — مرحلة، غرفة، تاريخ.",
          en: "Every photo and clip auto-saved in its correct context — stage, room, date.",
        },
      },
      {
        icon: "Gauge",
        title: { ar: "لوحة ذكاء المشروع", en: "Live Project Intelligence" },
        desc: {
          ar: "تقدّم، جودة، تكلفة، جدول — كلها في لوحة واحدة حية بدلاً من ملفات متناثرة.",
          en: "Progress, quality, cost, schedule — one live dashboard instead of scattered files.",
        },
      },
      {
        icon: "Compass",
        title: { ar: "تجربة عميل غامرة", en: "Immersive Client Experience" },
        desc: {
          ar: "جولات 360° + مخطط تفاعلي + مقارنة قبل/بعد — يفهم العميل ما يحدث دون زيارة الموقع.",
          en: "360° tours + interactive floor plan + before/after — clients understand without site visits.",
        },
      },
      {
        icon: "ShieldCheck",
        title: { ar: "تحكم التكلفة والجودة والمخاطر", en: "Cost, Quality & Risk Control" },
        desc: {
          ar: "تنبيهات مبكرة لأي انحراف، تقارير جاهزة للجهات الرقابية والمستثمرين.",
          en: "Early alerts on any deviation, ready reports for regulators and investors.",
        },
      },
    ],
  },

  /* ---------- Interactive Experience ---------- */
  interactive: {
    eyebrow: { ar: "تجربة تفاعلية", en: "Interactive Experience" },
    title: { ar: "ادخل المشروع. لا تشاهده فقط.", en: "Enter the project. Don't just watch it." },
    subtitle: {
      ar: "مخطط تفاعلي، جولة 360°، ومقارنة قبل/بعد — ثلاث وحدات مدمجة في تجربة واحدة.",
      en: "Interactive floor plan, 360° tour, and before/after — three modules in one experience.",
    },
    floorPlan: { ar: "المخطط التفاعلي", en: "Interactive Floor Plan" },
    floorPlanHint: { ar: "انقر أي غرفة لرؤية تقدّمها وصورها", en: "Click any room to see its progress and photos" },
    tour360: { ar: "جولة 360°", en: "360° Tour" },
    tourHint: { ar: "اسحب للنظر — انقر الأبواب للتنقل", en: "Drag to look — click doors to navigate" },
    beforeAfter: { ar: "قبل / بعد", en: "Before / After" },
    baHint: { ar: "اسحب الشريط للمقارنة", en: "Drag the handle to compare" },
    baTabs: [
      { ar: "الهيكل", en: "Structure" },
      { ar: "التشطيبات", en: "Finishes" },
      { ar: "الأنظمة", en: "Systems" },
    ],
  },

  /* ---------- Construction Timeline ---------- */
  timeline: {
    eyebrow: { ar: "سجل البناء", en: "Construction Record" },
    title: { ar: "كل مرحلة. موثقة.", en: "Every stage. Documented." },
    subtitle: {
      ar: "تسلسل زمني واحد من الحفر حتى التسليم — صور، فيديو، ملاحظات لكل مرحلة.",
      en: "One continuous timeline from excavation to handover — photos, video, notes per stage.",
    },
    filmBtn: { ar: "مشاهدة الفيلم الكامل للمشروع", en: "Watch the Full Project Film" },
    stages: [
      {
        id: "excavation",
        name: { ar: "الحفر", en: "Excavation" },
        weeks: { ar: "أسابيع 0–4", en: "Weeks 0–4" },
        status: { ar: "مكتمل", en: "Complete" },
        note: {
          ar: "تحديد الموقع، الحفر حتى مستوى التأسيس، اختبار التربة.",
          en: "Site set-out, excavation to formation level, soil testing.",
        },
      },
      {
        id: "foundation",
        name: { ar: "الأساسات", en: "Foundation" },
        weeks: { ar: "أسابيع 4–12", en: "Weeks 4–12" },
        status: { ar: "مكتمل", en: "Complete" },
        note: {
          ar: "حديد التسليح، صب الخرسانة، العزل المائي.",
          en: "Rebar grids, concrete pour, waterproofing.",
        },
      },
      {
        id: "structure",
        name: { ar: "الهيكل", en: "Structure" },
        weeks: { ar: "أسابيع 12–18", en: "Weeks 12–18" },
        status: { ar: "مكتمل", en: "Complete" },
        note: {
          ar: "أعمدة، جسور، بلاطات — الهيكل الخرساني الرئيسي.",
          en: "Columns, beams, slabs — the concrete skeleton.",
        },
      },
      {
        id: "shell",
        name: { ar: "البناء", en: "Shell" },
        weeks: { ar: "أسابيع 18–26", en: "Weeks 18–26" },
        status: { ar: "مكتمل", en: "Complete" },
        note: {
          ar: "مبانٍ طوبية، فتحات النوافذ، إغلاق الهيكل.",
          en: "Blockwork, window openings, weather-tight shell.",
        },
      },
      {
        id: "facade",
        name: { ar: "الواجهات", en: "Facade" },
        weeks: { ar: "أسابيع 20–34", en: "Weeks 20–34" },
        status: { ar: "مكتمل", en: "Complete" },
        note: {
          ar: "ترافرتين، زجاج، إطارات برونزية — واجهات فاخرة.",
          en: "Travertine, glazing, bronze frames — luxury facades.",
        },
      },
      {
        id: "complete",
        name: { ar: "الإنجاز", en: "Completed" },
        weeks: { ar: "أسابيع 34–50", en: "Weeks 34–50" },
        status: { ar: "مكتمل", en: "Complete" },
        note: {
          ar: "تشطيبات داخلية، تنسيق خارجي، مسبح، إضاءة.",
          en: "Interiors, landscape, pool, lighting.",
        },
      },
      {
        id: "night",
        name: { ar: "المشهد الليلي", en: "Night View" },
        weeks: { ar: "أسبوع 50+", en: "Week 50+" },
        status: { ar: "مكتمل", en: "Complete" },
        note: {
          ar: "إضاءة المشهد الليلي، التسليم النهائي للعميل.",
          en: "Night lighting scenes, final handover.",
        },
      },
    ],
  },

  /* ---------- Who it's for ---------- */
  audience: {
    eyebrow: { ar: "لمن", en: "Who it's for" },
    title: { ar: "ثلاث جهات. منصة واحدة.", en: "Three audiences. One platform." },
    items: [
      {
        icon: "Building2",
        title: { ar: "المطورون العقاريون", en: "Real Estate Developers" },
        desc: {
          ar: "شفافية كاملة للمستثمرين والمشترين — شارك رابط فيلم المشروع في لحظة.",
          en: "Full transparency for investors and buyers — share a project film link in seconds.",
        },
      },
      {
        icon: "HardHat",
        title: { ar: "شركات المقاولات", en: "Main Contractors" },
        desc: {
          ar: "حماية من النزاعات، تقارير جاهزة للجهة الرقابية، سجل كامل لكل قرار.",
          en: "Dispute protection, ready reports for regulators, full record of every decision.",
        },
      },
      {
        icon: "Sofa",
        title: { ar: "شركات التشطيبات والأثاث", en: "Finishing & Furniture Companies" },
        desc: {
          ar: "تتبع دقيق لكل قطعة، مقارنة قبل/بعد احترافية، تسليم مرئي للعميل.",
          en: "Precise tracking of every piece, pro before/after, visual handover to the client.",
        },
      },
    ],
  },

  /* ---------- Pricing ---------- */
  pricing: {
    eyebrow: { ar: "ابدأ بمشروع", en: "Start with a pilot" },
    title: { ar: "ابدأ بمشروع واحد تجريبي", en: "Start with one pilot project" },
    subtitle: {
      ar: "خطة دخول منخفض المخاطر — فعّل AURA على مشروع واحد خلال أسبوعين.",
      en: "Low-risk entry — activate AURA on a single project within two weeks.",
    },
    pilotBtn: { ar: "ابدأ التجربة", en: "Start the Pilot" },
    salesBtn: { ar: "تحدث مع المبيعات", en: "Talk to Sales" },
    tiers: [
      {
        name: { ar: "تجريبي", en: "Pilot" },
        tagline: { ar: "مشروع واحد، أسبوعان", en: "One project, two weeks" },
        price: { ar: "حسب الطلب", en: "On request" },
        features: {
          ar: [
            "مشروع واحد حي",
            "لوحة تقدّم موحدة",
            "مخطط تفاعلي أساسي",
            "جولة 360° لغرفتين رئيسيتين",
            "مقارنة قبل/بعد",
            "رابط عميل قابل للمشاركة",
            "دورتان: مالك + مدير مشروع",
          ],
          en: [
            "One live project",
            "Unified progress dashboard",
            "Basic interactive floor plan",
            "360° tour of two key rooms",
            "Before/After comparison",
            "Shareable client link",
            "Two roles: Owner + Project Manager",
          ],
        },
        cta: { ar: "ابدأ التجربة", en: "Start the Pilot" },
        highlight: true,
      },
      {
        name: { ar: "استوديو", en: "Studio" },
        tagline: { ar: "حتى 5 مشاريع متوازية", en: "Up to 5 parallel projects" },
        price: { ar: "حسب الطلب", en: "On request" },
        features: {
          ar: [
            "كل مزايا التجريبي",
            "حتى 5 مشاريع متوازية",
            "جولات 360° غير محدودة",
            "مقارنة قبل/بعد متعددة المراحل",
            "أدوار متعددة + صلاحيات",
            "تقارير أسبوعية تلقائية",
            "تكوين العلامة التجارية",
            "دعم أولوية خلال 4 ساعات",
          ],
          en: [
            "Everything in Pilot",
            "Up to 5 parallel projects",
            "Unlimited 360° tours",
            "Multi-stage before/after",
            "Multiple roles + permissions",
            "Auto weekly reports",
            "Brand customization",
            "Priority support within 4h",
          ],
        },
        cta: { ar: "تحدث مع المبيعات", en: "Talk to Sales" },
        highlight: false,
      },
      {
        name: { ar: "مؤسسة", en: "Enterprise" },
        tagline: { ar: "فرق متعددة ومشاريع غير محدودة", en: "Multi-team, unlimited projects" },
        price: { ar: "حسب الطلب", en: "On request" },
        features: {
          ar: [
            "كل مزايا الاستوديو",
            "مشاريع وفرق غير محدودة",
            "تكاملات IoT وBIM (قريباً)",
            "تحليلات ذكاء اصطناعي للمخاطر",
            "API مخصص + SSO",
            "مدير حساب مخصص",
            "اتفاقية مستوى خدمة (SLA)",
            "تدريب ميداني للفريق",
          ],
          en: [
            "Everything in Studio",
            "Unlimited projects and teams",
            "IoT and BIM integrations (soon)",
            "AI risk analytics",
            "Custom API + SSO",
            "Dedicated account manager",
            "SLA",
            "On-site team training",
          ],
        },
        cta: { ar: "تحدث مع المبيعات", en: "Talk to Sales" },
        highlight: false,
      },
    ],
  },

  /* ---------- Final CTA ---------- */
  finalCta: {
    eyebrow: { ar: "ابدأ الآن", en: "Get started" },
    title: { ar: "حوّل مشروعك القادم إلى فيلم متواصل", en: "Turn your next project into one continuous film" },
    subtitle: {
      ar: "اكتب بياناتك وسنتواصل معك خلال 24 ساعة لتحديد موعد العرض التجريبي.",
      en: "Leave your details and we'll reach out within 24 hours to schedule your live demo.",
    },
    name: { ar: "الاسم", en: "Name" },
    phone: { ar: "رقم الهاتف", en: "Phone" },
    company: { ar: "الشركة", en: "Company" },
    projectType: { ar: "نوع المشروع", en: "Project type" },
    projectTypes: {
      ar: ["فيلا خاصة", "مجمع سكني", "مبنى تجاري", "مشروع تشطيبات", "أخرى"],
      en: ["Private villa", "Residential complex", "Commercial building", "Finishing project", "Other"],
    },
    submit: { ar: "أرسل الطلب", en: "Submit Request" },
    whatsapp: { ar: "تواصل عبر واتساب", en: "Chat on WhatsApp" },
    reply: { ar: "نرد خلال 24 ساعة", en: "We reply within 24 hours" },
    success: {
      ar: "تم استلام طلبك. سنتواصل معك خلال 24 ساعة.",
      en: "Request received. We'll reach out within 24 hours.",
    },
  },

  /* ---------- Footer ---------- */
  footer: {
    tagline: {
      ar: "منصة واحدة، من أول حجر حتى آخر غرفة.",
      en: "One platform, from the first stone to the last room.",
    },
    product: { ar: "المنتج", en: "Product" },
    company: { ar: "الشركة", en: "Company" },
    contact: { ar: "تواصل", en: "Contact" },
    rights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
    links: {
      product: [
        { ar: "كيف يعمل", en: "How it Works" },
        { ar: "المنصة", en: "Platform" },
        { ar: "التجربة التفاعلية", en: "Interactive Experience" },
        { ar: "الأسعار", en: "Pricing" },
      ],
      company: [
        { ar: "من نحن", en: "About" },
        { ar: "فيلا سولارا", en: "Villa Solara" },
        { ar: "الوظائف", en: "Careers" },
        { ar: "المدونة", en: "Journal" },
      ],
      contact: [
        { ar: "studio@aura-arch.com", en: "studio@aura-arch.com" },
        { ar: "+965 2222 3333", en: "+965 2222 3333" },
        { ar: "مدينة الكويت، الكويت", en: "Kuwait City, Kuwait" },
        { ar: "@aura.arch", en: "@aura.arch" },
      ],
    },
  },
};

/* ---------- Helper ---------- */
export function tr(node: { ar: string; en: string }, lang: Lang): string {
  return node[lang];
}

export function trList(node: { ar: string[]; en: string[] }, lang: Lang): string[] {
  return node[lang];
}
