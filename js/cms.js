/* ============================================================
   AURA CMS bridge — shared between site and admin panel
   Settings live in localStorage ('aura.cms') and are applied
   at runtime. The Admin Panel writes; the site reads.
   ============================================================ */

const DEFAULT_STAGES = [
  { id:"excavation", name:"Excavation",  ar:"الحفر",      from:1,   to:16,  color:"#b08d5f", icon:"◧", desc:"Site survey, excavation pit and foundation set-out." },
  { id:"foundation", name:"Foundation",  ar:"الأساسات",   from:17,  to:32,  color:"#8e8e93", icon:"▦", desc:"Rebar grids, concrete pour, waterproofing." },
  { id:"structure",  name:"Structure",   ar:"الهيكل",     from:33,  to:48,  color:"#7d7d82", icon:"▤", desc:"Columns, beams, slabs — the concrete skeleton." },
  { id:"shell",      name:"Shell",       ar:"البناء",     from:49,  to:64,  color:"#a4a4a8", icon:"◫", desc:"Blockwork, wall infill, window openings." },
  { id:"facade",     name:"Facade",      ar:"الواجهات",   from:65,  to:80,  color:"#cbb99a", icon:"◨", desc:"Travertine cladding, glazing, bronze frames." },
  { id:"complete",   name:"Completed",   ar:"الإنجاز",    from:81,  to:96,  color:"#3c82f6", icon:"◆", desc:"Interiors, landscape, pool and lighting." },
  { id:"night",      name:"Night View",  ar:"المشهد الليلي", from:97, to:97, color:"#f0a54c", icon:"☾", desc:"Evening scene — the villa fully alive." }
];

const DEFAULT_INTERIOR = {
  theme: "luxury-modern",
  themes: ["modern-minimal","luxury-modern","scandinavian","japandi","contemporary","classic-luxury","arabic-luxury","industrial","mediterranean"],
  rooms: [
    { id:"living",  name:"Living Room",     ar:"غرفة المعيشة", area:"58 m²", height:"3.4 m", seq:31, interactive:true,
      plan:[6,34,34,44], adj:["kitchen","master"],
      finishes:"Travertine wall · Oak floor · Lime plaster", lighting:"Cove LED 2700K + floor lamp", hvac:"VRF concealed duct · 2 zones", acoustic:"Fabric panels behind art", smart:"Scenes · curtains · matter" },
    { id:"kitchen", name:"Kitchen",          ar:"المطبخ",       area:"32 m²", height:"3.1 m", seq:31, interactive:true,
      plan:[62,52,30,28], adj:["living"],
      finishes:"Travertine island · Oak cabinets · Stone splash", lighting:"3× pendant + task LED", hvac:"VRF + extract 650 m³/h", acoustic:"—", smart:"Appliance monitoring" },
    { id:"master",  name:"Master Bedroom",   ar:"غرفة النوم الرئيسية", area:"41 m²", height:"3.2 m", seq:31, interactive:true,
      plan:[6,6,30,24], adj:["bath","living"],
      finishes:"Fabric headboard wall · Oak floor", lighting:"Cove 2700K + bronze pendants", hvac:"VRF · silent mode 22 dB", acoustic:"Upholstered wall panels", smart:"Wake scenes · blackout" },
    { id:"bath",    name:"Master Bathroom",  ar:"الحمام الرئيسي", area:"14 m²", height:"2.8 m", seq:16, interactive:true,
      plan:[38,6,18,20], adj:["master"],
      finishes:"Full-height travertine · Stone tub", lighting:"Halo mirrors + recessed", hvac:"Underfloor heating + extract", acoustic:"—", smart:"Water temp presets" },
    { id:"majlis",  name:"Majlis",           ar:"المجلس",       area:"36 m²", height:"3.4 m", seq:0, interactive:false, plan:[6,80,34,16], adj:["living"] },
    { id:"dining",  name:"Dining Room",      ar:"غرفة الطعام",  area:"24 m²", height:"3.4 m", seq:0, interactive:false, plan:[42,42,18,22], adj:["kitchen","living"] },
    { id:"office",  name:"Office",           ar:"المكتب",       area:"16 m²", height:"3.1 m", seq:0, interactive:false, plan:[62,6,30,22], adj:["kitchen"] },
    { id:"terrace", name:"Terrace & Pool",   ar:"التراس والمسبح", area:"120 m²", height:"—", seq:0, interactive:false, plan:[42,80,52,16], adj:["living"] }
  ],
  furniture: {
    living: [
      { x:62, y:66, name:"Curve Sofa", nameAr:"كنبة كيرف", materialAr:"بوكليه كريمي · هيكل بلوط", material:"Cream bouclé · FSC oak frame", brand:"Living Divani", color:"Ivory 02", dims:"320 × 105 × 72 cm", finish:"Bouclé, kiln-dried frame", supplier:"Studio Forma KW", price:"4,850 KD" },
      { x:56, y:78, name:"Orbit Coffee Table", nameAr:"طاولة أوربت", materialAr:"جوز صلب · سطح حجري", material:"Solid walnut · honed stone top", brand:"Porro", color:"Canaletto", dims:"Ø 110 × 33 cm", finish:"Matte oil", supplier:"Studio Forma KW", price:"1,320 KD" },
      { x:88, y:44, name:"Aria Artwork", nameAr:"لوحة آريا", materialAr:"وسائط مختلطة على كتان", material:"Mixed media on linen", brand:"Local artist — N. Al-Sabah", color:"Sand tones", dims:"180 × 140 cm", finish:"Museum glass", supplier:"Dar Gallery", price:"—" },
      { x:38, y:52, name:"Olive Tree", nameAr:"شجرة زيتون", materialAr:"طبيعية · أصيص فخاري", material:"Live · terracotta pot", brand:"—", color:"—", dims:"H 240 cm", finish:"—", supplier:"Green Studio", price:"180 KD" }
    ],
    kitchen: [
      { x:52, y:66, name:"Monolith Island", nameAr:"جزيرة مونوليث", materialAr:"ترافرتين نافونا · حواف متتالية", material:"Travertine Navona · waterfall edges", brand:"Custom — AURA", color:"Navona cream", dims:"320 × 120 × 92 cm", finish:"Honed, sealed", supplier:"Marmi KW", price:"6,200 KD" },
      { x:50, y:26, name:"Trio Pendants", nameAr:"ثريات تريو", materialAr:"نحاس مخروط", material:"Spun brass", brand:"Apparatus", color:"Aged brass", dims:"Ø 25 cm each", finish:"Living patina", supplier:"Light House KW", price:"2,940 KD" },
      { x:18, y:44, name:"Column Cabinets", nameAr:"خزائن عمودية", materialAr:"بلوط مقطع · فتح باللمس", material:"Rift oak · push-latch", brand:"Custom — AURA", color:"Natural oak", dims:"H 300 cm run", finish:"Matte 2K lacquer", supplier:"Joinery Works", price:"—" }
    ],
    master: [
      { x:62, y:62, name:"Cloud Platform Bed", nameAr:"سرير كلاود", materialAr:"قاعدة بلوط · تنجيد كتان", material:"Oak base · linen upholstery", brand:"Flexform", color:"Greige", dims:"200 × 210 cm", finish:"Removable linen", supplier:"Studio Forma KW", price:"3,750 KD" },
      { x:80, y:38, name:"Drop Pendant Pair", nameAr:"معلقتا دروب", materialAr:"برونز · زجاج أوبال", material:"Bronze · opal glass", brand:"Articolo", color:"Burnished bronze", dims:"Ø 18 cm", finish:"Hand-blown", supplier:"Light House KW", price:"1,160 KD" },
      { x:20, y:60, name:"Ply Armchair", nameAr:"كرسي بلاي", materialAr:"بوكليه · أرجل جوز", material:"Bouclé · walnut legs", brand:"&Tradition", color:"Ivory", dims:"78 × 82 × 76 cm", finish:"—", supplier:"Studio Forma KW", price:"980 KD" }
    ],
    bath: [
      { x:30, y:70, name:"Oval Stone Tub", nameAr:"حوض حجري بيضاوي", materialAr:"حجر جيري صلب", material:"Solid limestone", brand:"Agape", color:"Bone", dims:"178 × 88 × 52 cm", finish:"Honed", supplier:"Marmi KW", price:"5,400 KD" },
      { x:58, y:48, name:"Halo Mirrors", nameAr:"مرايا هالو", materialAr:"إضاءة خلفية LED · إطار برونزي", material:"Backlit LED · bronze rim", brand:"Custom — AURA", color:"2700K", dims:"Ø 70 cm ×2", finish:"—", supplier:"Light House KW", price:"760 KD" }
    ]
  }
};

const DEFAULT_WIDGETS = {
  "01": {
    title: "01 Design",
    titleAr: "01 التصميم",
    desc: "Parametric concept design, photoreal visualization and generative optioning before laying the first stone. Our computational design pipeline evaluates solar gain, structural efficiency, and spatial flow in real-time.",
    descAr: "تصميم بارامتري وإخراج واقعي وخيارات توليدية قبل وضع أول حجر. نظام التصميم الرقمي لدينا يقيّم الإضاءة الشمسية، الكفاءة الإنشائية، وانسيابية الحركة في الوقت الفعلي.",
    images: ["assets/villa-blueprint.png", "assets/villa-wireframe.png", "assets/villa-clean.png"],
    contact: { whatsapp: "https://wa.me/96500000000?text=Inquiry+about+Design+Phase", email: "info@aura.studio", formTitle: "Inquire about Parametric Design · استفسر عن التصميم البارامتري" }
  },
  "02": {
    title: "02 Execution",
    titleAr: "02 التنفيذ",
    desc: "Robotic surveying, laser-guided structural framework, and millimeter-precision tolerances monitored live on site. Every column and slab is verified against the digital twin.",
    descAr: "مساحة روبوتية وهيكل موجّه بالليزر بدقة مليمترية — بمراقبة حية في الموقع. يتم التحقق من كل عمود وبلاطة ومطابقتها مع التوأم الرقمي للمشروع.",
    images: ["assets/stages/s2-foundation.png", "assets/stages/s3-structure.png", "assets/stages/s4-shell.png"],
    contact: { whatsapp: "https://wa.me/96500000000?text=Inquiry+about+Execution+Phase", email: "info@aura.studio", formTitle: "Inquire about Site Execution · استفسر عن تنفيذ الموقع" }
  },
  "03": {
    title: "03 Finishing",
    titleAr: "03 التشطيبات",
    desc: "Book-matched Italian travertine, low-E architectural glazing, and custom bronze detailing. Every material batch is traced from quarry to installation.",
    descAr: "ترافرتين إيطالي متطابق الألواح وزجاج عازل للحرارة وتفاصيل برونزية مخصصة. كل خامة موثقة ومتبعة من المحجر حتى التركيب النهائي.",
    images: ["assets/stages/s5-facade.png", "assets/villa.png", "assets/rooms/living-complete.png"],
    contact: { whatsapp: "https://wa.me/96500000000?text=Inquiry+about+Finishing+Phase", email: "info@aura.studio", formTitle: "Inquire about Materials & Finishes · استفسر عن المواد والتشطيبات" }
  },
  "04": {
    title: "04 Project Management",
    titleAr: "04 إدارة المشاريع",
    desc: "One live dashboard for cost, schedule, and quality assurance. AI algorithms flag risks and schedule deviations early, ensuring delivery on time and within budget.",
    descAr: "لوحة واحدة حية للتكلفة والجدول والرقابة على الجودة — والذكاء الاصطناعي ينذر بالمخاطر مبكرًا لضمان التسليم في الوقت والميزانية المحددة.",
    images: ["assets/villa.png", "assets/stages/s7-night.png", "assets/rooms/master-complete.png"],
    contact: { whatsapp: "https://wa.me/96500000000?text=Inquiry+about+Project+Management", email: "info@aura.studio", formTitle: "Inquire about Project Management · استفسر عن إدارة المشاريع" }
  },
  "progress": {
    title: "Build & Quality Progress",
    titleAr: "تقدم البناء والجودة",
    desc: "Continuous automated monitoring of construction progress and QA compliance. Laser scanning and site drones report completion percentage per discipline daily.",
    descAr: "مراقبة مستمرة وتلقائية لتقدم البناء ومطابقة معايير الجودة. المسح بالليزر وطائرات الدرون في الموقع ترصد نسبة الإنجاز اليومية لكل التخصصات.",
    images: ["assets/stages/s1-excavation.png", "assets/stages/s3-structure.png", "assets/stages/s5-facade.png"],
    contact: { whatsapp: "https://wa.me/96500000000?text=Inquiry+about+Construction+Progress", email: "info@aura.studio", formTitle: "Inquire about Progress Reports · استفسر عن تقارير الإنجاز" }
  },
  "fea": {
    title: "Structural FEA Engineering",
    titleAr: "الحسابات الإنشائية (FEA)",
    desc: "Finite Element Analysis models verifying 99.8% structural integrity, earthquake resilience, load distribution, and minimal deflection across all cantilevered spans.",
    descAr: "نماذج تحليل العناصر المحدودة تضمن سلامة إنشائية بنسبة 99.8%، مع مقاومة عالية وتوزيع دقيق للأحمال وتقليل الترخيم في كافة البروزات الهندسية.",
    images: ["assets/villa-wireframe.png", "assets/stages/s3-structure.png"],
    contact: { whatsapp: "https://wa.me/96500000000?text=Inquiry+about+Structural+FEA", email: "info@aura.studio", formTitle: "Inquire about Structural Engineering · استفسر عن الهندسة الإنشائية" }
  },
  "materials": {
    title: "Material SCAN & Testing",
    titleAr: "فحص المواد والجودة",
    desc: "Comprehensive lab testing and traceability for soil compaction, C40/50 rebar concrete mix, and travertine stone density before arrival on site.",
    descAr: "فحص مخبري متكامل وتتبع كامل لدمك التربة وخلطات الخرسانة والحديد C40/50 وكثافة حجر الترافرتين قبل وصول المواد للموقع.",
    images: ["assets/villa-clean.png", "assets/villa.png"],
    contact: { whatsapp: "https://wa.me/96500000000?text=Inquiry+about+Material+Testing", email: "info@aura.studio", formTitle: "Inquire about Material Quality · استفسر عن جودة المواد" }
  },
  "schedule": {
    title: "CPM Timeline & Schedule",
    titleAr: "الجدول الزمني ومراحل الإنجاز",
    desc: "Critical Path Method schedule tracking excavation, foundation, superstructure, facade cladding, and final interior commissioning with zero delay tolerances.",
    descAr: "جدول المسار الحرج يتتبع بدقة مراحل الحفر والأساسات والهيكل وأعمال الواجهات والتشطيب الداخلي بدون أي نسب تأخير.",
    images: ["assets/stages/s4-shell.png", "assets/stages/s7-night.png"],
    contact: { whatsapp: "https://wa.me/96500000000?text=Inquiry+about+Project+Schedule", email: "info@aura.studio", formTitle: "Inquire about Timeline · استفسر عن الجدول الزمني" }
  },
  "cost_qa": {
    title: "Budget & QA Inspections",
    titleAr: "الميزانية وفحوصات الجودة",
    desc: "Transparent financial tracking and 24 milestone QA inspections certified by senior architectural supervisors prior to stage sign-off.",
    descAr: "تتبع مالي شفاف و24 فحص جودة معتمد من كبار المهندسين المشرفين قبل اعتماد انتقال المشروع إلى أي مرحلة تالية.",
    images: ["assets/villa.png", "assets/stages/s5-facade.png"],
    contact: { whatsapp: "https://wa.me/96500000000?text=Inquiry+about+Budget+and+QA", email: "info@aura.studio", formTitle: "Inquire about Budget & Inspections · استفسر عن الميزانية والفحوصات" }
  },
  "room_progress": {
    title: "Room Progress Tracking",
    titleAr: "تقدم إنجاز الغرف",
    desc: "AI-monitored interior completion stages tracking shell, rough-in MEP, plastering, flooring, and final joinery installation per room.",
    descAr: "مراقبة ذكية لمراحل إنجاز الغرف الداخلية تتتبع البناء الخام، التمديدات، اللياسة، الأرضيات وتركيب الأعمال الخشبية لكل غرفة على حدة.",
    images: ["assets/rooms/living-shell.png", "assets/rooms/living-finish.png", "assets/rooms/living-complete.png"],
    contact: { whatsapp: "https://wa.me/96500000000?text=Inquiry+about+Room+Progress", email: "info@aura.studio", formTitle: "Inquire about Interior Execution · استفسر عن تنفيذ الديكور الداخلي" }
  },
  "room_data": {
    title: "Room Architectural Data",
    titleAr: "البيانات المعمارية للغرف",
    desc: "Detailed spatial metrics including ceiling heights, acoustic insulation properties, lighting design calculations, and HVAC air changes per hour.",
    descAr: "بيانات تفصيلية للمساحات تشمل ارتفاعات الأسقف، العزل الصوتي، حسابات تصميم الإضاءة ومعدلات تجديد هواء التكييف في الساعة.",
    images: ["assets/rooms/plan.png", "assets/rooms/living-complete.png"],
    contact: { whatsapp: "https://wa.me/96500000000?text=Inquiry+about+Room+Data", email: "info@aura.studio", formTitle: "Inquire about Architectural Specifications · استفسر عن المواصفات المعمارية" }
  },
  "smart_systems": {
    title: "Smart Home & MEP Systems",
    titleAr: "الأنظمة الذكية والميكانيكية",
    desc: "Integrated VRF silent-mode HVAC, KNX/Matter automation, automated lighting scenes, and motorized drapery controls centralized in one app.",
    descAr: "تكييف VRF صامت، أتمتة منزلية KNX/Matter، مشاهد إضاءة آلية وستائر كهربائية مبرمجة يتم التحكم بها بالكامل عبر تطبيق واحد.",
    images: ["assets/rooms/master-complete.png", "assets/rooms/kitchen-complete.png"],
    contact: { whatsapp: "https://wa.me/96500000000?text=Inquiry+about+Smart+Systems", email: "info@aura.studio", formTitle: "Inquire about Smart Automation · استفسر عن الأنظمة الذكية" }
  }
};

const DEFAULT_BEFORE_AFTER = [
  { id:"01", name:"Design", nameAr:"التصميم", beforeImg:"assets/villa-blueprint.png", afterImg:"assets/villa-wireframe.png", beforeLabel:"Blueprint", beforeLabelAr:"مخطط هندسي", afterLabel:"Wireframe", afterLabelAr:"هيكل إنشائي" },
  { id:"02", name:"Execution", nameAr:"التنفيذ", beforeImg:"assets/villa-wireframe.png", afterImg:"assets/stages/s5-facade.png", beforeLabel:"Raw Structure", beforeLabelAr:"هيكل إنشائي خام", afterLabel:"Outer Finish", afterLabelAr:"تشطيب خارجي (أرضيات وحيطان)" },
  { id:"03", name:"Finishing", nameAr:"التشطيبات", beforeImg:"assets/villa-clean.png", afterImg:"assets/villa.png", beforeLabel:"Initial Exterior", beforeLabelAr:"تشطيب خارجي أولي", afterLabel:"Completed Villa", afterLabelAr:"المبنى الكامل النهائي من الخارج" },
  { id:"04", name:"Project Management", nameAr:"إدارة المشاريع", beforeImg:"assets/villa.png", afterImg:"assets/rooms/living-complete.png", beforeLabel:"Exterior", beforeLabelAr:"المبنى من الخارج", afterLabel:"Interior & Delivery", afterLabelAr:"تصميم داخلي / التسليم النهائي" }
];

window.AURA_DEFAULTS = {
  brand: { name: "AURA", accent: "#3c82f6", tagline: "Future Architecture Studio" },
  ui: { glassOpacity: 0.55, blur: 28, radius: 22, glow: 0.6, animSpeed: 1, theme: "light" },
  scroll: {
    framesPerScroll: 1.6,     // frames advanced per wheel notch
    smoothness: 0.085,        // lerp factor (lower = smoother)
    reverse: false,
    loop: false,
    snap: true,               // snap to stage boundaries when idle
    touch: true,
    keyboard: true,
    sensitivity: 1.0
  },
  playback: {
    fpsExt: 9,        // exterior speed (frames/sec)
    fpsInt: 6,        // rooms speed (frames/sec)
    pauseExplore: 5,  // seconds at Explore button
    pauseRoom: 2.5,   // seconds at each room end
    autoplay: true
  },
  activeProjectId: "solara",
  projects: [
    {
      id: "solara",
      title: "Villa Solara",
      titleAr: "فيلا سولارا",
      location: "Kuwait — Al Ahmadi",
      locationAr: "الكويت — الأحمدي",
      area: "742 m²",
      year: "2026",
      status: "Completed",
      statusAr: "مكتمل",
      cover: "assets/villa.png",
      isDefault: true,
      order: 0,
      project: {
        title: "Villa Solara",
        titleAr: "فيلا سولارا",
        location: "Kuwait — Al Ahmadi",
        locationAr: "الكويت — الأحمدي",
        area: "742 m²",
        year: "2026",
        status: "Completed",
        statusAr: "مكتمل",
        progress: 100
      },
      progressData: {
        buildPct: 100,
        qualPct: 100,
        roomPhase: "Shell",
        integrity: "99.8%",
        loadPath: "Verified",
        deflection: "0.4 mm",
        foundation: "C40/50",
        travertine: "640 m²",
        costUsed: "100%",
        qaInspections: "24/24"
      },
      sequence: {
        path: "assets/seq/",
        prefix: "frame",
        digits: 3,
        ext: ".webp",
        count: 97
      },
      stages: JSON.parse(JSON.stringify(DEFAULT_STAGES)),
      interior: JSON.parse(JSON.stringify(DEFAULT_INTERIOR)),
      widgets: JSON.parse(JSON.stringify(DEFAULT_WIDGETS)),
      beforeAfter: JSON.parse(JSON.stringify(DEFAULT_BEFORE_AFTER))
    },
    {
      id: "marina",
      title: "Marina Court",
      titleAr: "مارينا كورت",
      location: "Kuwait — Sharq",
      locationAr: "الكويت — شرق",
      area: "1,850 m²",
      year: "2026",
      status: "In Progress",
      statusAr: "قيد الإنشاء",
      cover: "assets/stages/s5-facade.png",
      isDefault: false,
      order: 1,
      project: {
        title: "Marina Court",
        titleAr: "مارينا كورت",
        location: "Kuwait — Sharq",
        locationAr: "الكويت — شرق",
        area: "1,850 m²",
        year: "2026",
        status: "In Progress",
        statusAr: "قيد الإنشاء",
        progress: 64
      },
      progressData: {
        buildPct: 64,
        qualPct: 88,
        roomPhase: "Structure",
        integrity: "99.2%",
        loadPath: "Verified",
        deflection: "0.8 mm",
        foundation: "C45/55",
        travertine: "1,200 m²",
        costUsed: "64%",
        qaInspections: "16/24"
      },
      sequence: {
        path: "assets/seq/",
        prefix: "frame",
        digits: 3,
        ext: ".webp",
        count: 97
      },
      stages: JSON.parse(JSON.stringify(DEFAULT_STAGES)),
      interior: JSON.parse(JSON.stringify(DEFAULT_INTERIOR)),
      widgets: JSON.parse(JSON.stringify(DEFAULT_WIDGETS)),
      beforeAfter: [
        { id:"01", name:"Design", nameAr:"التصميم", beforeImg:"assets/villa-blueprint.png", afterImg:"assets/villa-wireframe.png", beforeLabel:"Blueprint", beforeLabelAr:"مخطط هندسي", afterLabel:"Wireframe", afterLabelAr:"هيكل إنشائي" },
        { id:"02", name:"Execution", nameAr:"التنفيذ", beforeImg:"assets/villa-wireframe.png", afterImg:"assets/stages/s3-structure.png", beforeLabel:"Raw Structure", beforeLabelAr:"هيكل إنشائي خام", afterLabel:"Superstructure", afterLabelAr:"الهيكل الخرساني" },
        { id:"03", name:"Finishing", nameAr:"التشطيبات", beforeImg:"assets/stages/s3-structure.png", afterImg:"assets/stages/s5-facade.png", beforeLabel:"Structural Frame", beforeLabelAr:"الهيكل الإنشائي", afterLabel:"Facade Progress", afterLabelAr:"أعمال الواجهات" },
        { id:"04", name:"Project Management", nameAr:"إدارة المشاريع", beforeImg:"assets/stages/s5-facade.png", afterImg:"assets/villa.png", beforeLabel:"Current Progress", beforeLabelAr:"الإنجاز الحالي", afterLabel:"Target Outcome", afterLabelAr:"النتيجة المستهدفة" }
      ]
    },
    {
      id: "desert",
      title: "Desert Pavilion",
      titleAr: "جناح الصحراء",
      location: "Kuwait — Wafra",
      locationAr: "الكويت — الوفرة",
      area: "520 m²",
      year: "2027",
      status: "In Progress",
      statusAr: "قيد الإنشاء",
      cover: "assets/stages/s3-structure.png",
      isDefault: false,
      order: 2,
      project: {
        title: "Desert Pavilion",
        titleAr: "جناح الصحراء",
        location: "Kuwait — Wafra",
        locationAr: "الكويت — الوفرة",
        area: "520 m²",
        year: "2027",
        status: "In Progress",
        statusAr: "قيد الإنشاء",
        progress: 38
      },
      progressData: {
        buildPct: 38,
        qualPct: 92,
        roomPhase: "Foundation",
        integrity: "99.5%",
        loadPath: "Verified",
        deflection: "0.5 mm",
        foundation: "C35/45",
        travertine: "380 m²",
        costUsed: "38%",
        qaInspections: "9/24"
      },
      sequence: {
        path: "assets/seq/",
        prefix: "frame",
        digits: 3,
        ext: ".webp",
        count: 97
      },
      stages: JSON.parse(JSON.stringify(DEFAULT_STAGES)),
      interior: JSON.parse(JSON.stringify(DEFAULT_INTERIOR)),
      widgets: JSON.parse(JSON.stringify(DEFAULT_WIDGETS)),
      beforeAfter: JSON.parse(JSON.stringify(DEFAULT_BEFORE_AFTER))
    },
    {
      id: "coastal",
      title: "Coastal House",
      titleAr: "البيت الساحلي",
      location: "Kuwait — Khiran",
      locationAr: "الكويت — الخيران",
      area: "910 m²",
      year: "2027",
      status: "Design Phase",
      statusAr: "مرحلة التصميم",
      cover: "assets/villa-clean.png",
      isDefault: false,
      order: 3,
      project: {
        title: "Coastal House",
        titleAr: "البيت الساحلي",
        location: "Kuwait — Khiran",
        locationAr: "الكويت — الخيران",
        area: "910 m²",
        year: "2027",
        status: "Design Phase",
        statusAr: "مرحلة التصميم",
        progress: 15
      },
      progressData: {
        buildPct: 15,
        qualPct: 95,
        roomPhase: "Excavation",
        integrity: "99.9%",
        loadPath: "In Design",
        deflection: "0.2 mm",
        foundation: "C40/50",
        travertine: "850 m²",
        costUsed: "15%",
        qaInspections: "4/24"
      },
      sequence: {
        path: "assets/seq/",
        prefix: "frame",
        digits: 3,
        ext: ".webp",
        count: 97
      },
      stages: JSON.parse(JSON.stringify(DEFAULT_STAGES)),
      interior: JSON.parse(JSON.stringify(DEFAULT_INTERIOR)),
      widgets: JSON.parse(JSON.stringify(DEFAULT_WIDGETS)),
      beforeAfter: JSON.parse(JSON.stringify(DEFAULT_BEFORE_AFTER))
    }
  ],
  // Keep legacy top-level shortcuts pointing to default villa solara
  project: {
    title: "Villa Solara",
    titleAr: "فيلا سولارا",
    location: "Kuwait — Al Ahmadi",
    locationAr: "الكويت — الأحمدي",
    area: "742 m²",
    year: "2026",
    status: "Completed",
    statusAr: "مكتمل",
    progress: 100
  },
  sequence: {
    path: "assets/seq/",
    prefix: "frame",
    digits: 3,
    ext: ".webp",
    count: 97
  },
  stages: JSON.parse(JSON.stringify(DEFAULT_STAGES)),
  interior: JSON.parse(JSON.stringify(DEFAULT_INTERIOR))
};

window.AURA = (function(){
  const KEY = 'aura.cms';
  const ACTIVE_KEY = 'aura.activeProject';

  function deepMerge(a, b){
    const o = Array.isArray(a) ? [...a] : {...a};
    if(!b) return o;
    for(const k in b){
      if(b[k] && typeof b[k]==='object' && !Array.isArray(b[k]) && a[k] && typeof a[k]==='object' && !Array.isArray(a[k]))
        o[k] = deepMerge(a[k], b[k]);
      else o[k] = b[k];
    }
    return o;
  }

  function getStoredActiveId(){
    try {
      return localStorage.getItem(ACTIVE_KEY) || '';
    } catch(e){
      return '';
    }
  }

  function setStoredActiveId(id){
    try {
      localStorage.setItem(ACTIVE_KEY, id);
    } catch(e){}
  }

  function normalizeCfg(cfg){
    if(!cfg.projects || !Array.isArray(cfg.projects) || cfg.projects.length === 0){
      cfg.projects = JSON.parse(JSON.stringify(window.AURA_DEFAULTS.projects));
    }
    // Ensure all projects have required structures
    cfg.projects.forEach(p => {
      if(!p.id) p.id = 'proj_' + Math.random().toString(36).substr(2, 6);
      if(!p.stages) p.stages = JSON.parse(JSON.stringify(DEFAULT_STAGES));
      if(!p.interior) p.interior = JSON.parse(JSON.stringify(DEFAULT_INTERIOR));
      if(!p.widgets) p.widgets = JSON.parse(JSON.stringify(DEFAULT_WIDGETS));
      if(!p.beforeAfter) p.beforeAfter = JSON.parse(JSON.stringify(DEFAULT_BEFORE_AFTER));
      if(!p.progressData){
        p.progressData = {
          buildPct: p.project ? (p.project.progress || 100) : 100,
          qualPct: 100,
          roomPhase: "Shell",
          integrity: "99.8%",
          loadPath: "Verified",
          deflection: "0.4 mm",
          foundation: "C40/50",
          travertine: "640 m²",
          costUsed: "100%",
          qaInspections: "24/24"
        };
      }
      if(!p.project){
        p.project = {
          title: p.title || "Untitled Project",
          titleAr: p.titleAr || "مشروع",
          location: p.location || "Kuwait",
          locationAr: p.locationAr || "الكويت",
          area: p.area || "500 m²",
          year: p.year || "2026",
          status: p.status || "In Progress",
          statusAr: p.statusAr || "قيد الإنشاء",
          progress: p.progressData.buildPct || 100
        };
      }
    });

    // Sort projects by order property
    cfg.projects.sort((a,b) => (a.order !== undefined && b.order !== undefined ? a.order - b.order : 0));

    let activeId = getStoredActiveId() || cfg.activeProjectId;
    let activeProj = cfg.projects.find(p => p.id === activeId);
    if(!activeProj){
      activeProj = cfg.projects.find(p => p.isDefault) || cfg.projects[0];
      activeId = activeProj ? activeProj.id : 'solara';
    }
    cfg.activeProjectId = activeId;

    if(activeProj){
      cfg.project = activeProj.project;
      cfg.stages = activeProj.stages;
      cfg.interior = activeProj.interior;
      cfg.sequence = activeProj.sequence;
      cfg.progressData = activeProj.progressData;
      cfg.widgets = activeProj.widgets;
      cfg.beforeAfter = activeProj.beforeAfter;
    }
    return cfg;
  }

  function load(){
    let cfg;
    try{
      const stored = localStorage.getItem(KEY);
      cfg = stored ? deepMerge(window.AURA_DEFAULTS, JSON.parse(stored)) : deepMerge(window.AURA_DEFAULTS, {});
    }catch(e){
      cfg = deepMerge(window.AURA_DEFAULTS, {});
    }
    return normalizeCfg(cfg);
  }

  function save(cfg){
    const norm = normalizeCfg(cfg);
    try {
      localStorage.setItem(KEY, JSON.stringify(norm));
      setStoredActiveId(norm.activeProjectId);
    } catch(e){}
  }

  function reset(){
    try {
      localStorage.removeItem(KEY);
      localStorage.removeItem(ACTIVE_KEY);
    } catch(e){}
  }

  function getActiveProject(cfg){
    const norm = cfg || load();
    return norm.projects.find(p => p.id === norm.activeProjectId) || norm.projects[0];
  }

  function setActiveProject(id){
    const cfg = load();
    if(cfg.projects.some(p => p.id === id)){
      cfg.activeProjectId = id;
      setStoredActiveId(id);
      save(cfg);
      if(typeof window.dispatchEvent === 'function'){
        try {
          window.dispatchEvent(new CustomEvent('aura-project-change', { detail: { projectId: id } }));
        } catch(e){}
      }
    }
    return load();
  }

  function getProjectById(cfg, id){
    const norm = cfg || load();
    return norm.projects.find(p => p.id === id);
  }

  function addProject(cfg, newProj){
    if(!newProj.id) newProj.id = 'proj_' + Math.random().toString(36).substr(2, 6);
    newProj.order = cfg.projects.length;
    cfg.projects.push(newProj);
    save(cfg);
    return cfg;
  }

  function deleteProject(cfg, id){
    if(cfg.projects.length <= 1) return cfg;
    cfg.projects = cfg.projects.filter(p => p.id !== id);
    cfg.projects.forEach((p, idx) => p.order = idx);
    if(cfg.activeProjectId === id){
      cfg.activeProjectId = cfg.projects[0].id;
      setStoredActiveId(cfg.activeProjectId);
    }
    save(cfg);
    return cfg;
  }

  function reorderProjects(cfg, orderedIds){
    const newArr = [];
    orderedIds.forEach((id, idx) => {
      const found = cfg.projects.find(p => p.id === id);
      if(found){
        found.order = idx;
        newArr.push(found);
      }
    });
    cfg.projects.forEach(p => {
      if(!newArr.includes(p)){
        p.order = newArr.length;
        newArr.push(p);
      }
    });
    cfg.projects = newArr;
    save(cfg);
    return cfg;
  }

  function setDefaultProject(cfg, id){
    cfg.projects.forEach(p => {
      p.isDefault = (p.id === id);
    });
    save(cfg);
    return cfg;
  }

  function frameSrc(cfg, n){
    const s = cfg.sequence;
    return s.path + s.prefix + String(n).padStart(s.digits,'0') + s.ext;
  }

  function applyTheme(cfg, rootEl){
    const r = (rootEl||document.documentElement).style;
    r.setProperty('--blue', cfg.brand.accent);
    r.setProperty('--glass-a', cfg.ui.glassOpacity);
    r.setProperty('--blur', cfg.ui.blur+'px');
    r.setProperty('--r', cfg.ui.radius+'px');
    r.setProperty('--glow', cfg.ui.glow);
  }

  return {
    load, save, reset,
    getActiveProject, setActiveProject, getProjectById,
    addProject, deleteProject, reorderProjects, setDefaultProject,
    frameSrc, applyTheme, KEY, DEFAULT_STAGES, DEFAULT_INTERIOR, DEFAULT_WIDGETS, DEFAULT_BEFORE_AFTER
  };
})();

/* ============================================================
   AURA i18n — one-language display with EN/AR toggle
   - localStorage 'aura.lang' ('en' | 'ar'), reload on switch
   - splits "English · عربي" pair strings to the active language
   - shows/hides .ar/.arh/.far2 spans; strips Latin siblings in AR
   - MutationObserver localizes dynamically-built content too
   ============================================================ */
window.AURA_I18N=(function(){
  const KEY='aura.lang';
  let lang='en';
  try{lang=localStorage.getItem(KEY)||'en';}catch(e){}
  const ARX=/[\u0600-\u06FF]/, LAT=/[A-Za-z]/;
  const pick=(en,ar)=>lang==='ar'?(ar||en):(en||ar);
  function setLang(l){try{localStorage.setItem(KEY,l);}catch(e){}location.reload();}
  const toggle=()=>setLang(lang==='ar'?'en':'ar');
  function splitPair(v){
    if(!v||v.indexOf('\u00b7')<0)return null;
    const p=v.split('\u00b7');if(p.length!==2)return null;
    const a=p[0],b=p[1];
    if(LAT.test(a)&&!ARX.test(a)&&ARX.test(b)&&!LAT.test(b))return lang==='ar'?b:a;
    if(ARX.test(a)&&!LAT.test(a)&&LAT.test(b)&&!ARX.test(b))return lang==='ar'?a:b;
    return null;
  }
  function process(root){
    if(!root)return;
    if(root.nodeType===3){const r=splitPair(root.nodeValue);if(r!==null)root.nodeValue=r.trim();return;}
    if(root.nodeType!==1)return;
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const ts=[];let n;while(n=w.nextNode())ts.push(n);
    ts.forEach(t=>{const r=splitPair(t.nodeValue);if(r!==null)t.nodeValue=r.trim()?' '+r.trim()+' ':'';});
    const sel='.ar,.arh,.far2';
    const spans=[...root.querySelectorAll(sel)];
    if(root.matches&&root.matches(sel))spans.push(root);
    spans.forEach(sp=>{
      if(lang==='en'){sp.style.display='none';return;}
      sp.style.removeProperty('display');
      if(!sp.parentNode)return;
      [...sp.parentNode.childNodes].forEach(c=>{
        if(c.nodeType===3&&LAT.test(c.nodeValue)&&!ARX.test(c.nodeValue))c.nodeValue='';
      });
    });
  }
  function init(){
    document.documentElement.lang=lang;
    if(lang==='ar')document.documentElement.dir='rtl';
    document.querySelectorAll('.langLbl').forEach(e=>e.textContent=lang==='ar'?'English':'العربية');
    process(document.body);
    new MutationObserver(muts=>{
      muts.forEach(m=>m.addedNodes.forEach(nd=>process(nd)));
    }).observe(document.body,{childList:true,subtree:true});
  }
  return {lang,pick,toggle,init,process};
})();
