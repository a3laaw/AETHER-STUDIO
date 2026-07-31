/* ============================================================
   AURA CMS — multi-project data model
   - projects[]         : list of all projects
   - CURRENT_PROJECT_ID : which project the site shows
   - per-project data   : brand, ui, scroll, playback, sequence,
                          stages, project, interior, widgets, beforeAfter, contact
   - settings live in localStorage 'aura.cms' (root = projects + current)
   ============================================================ */

/* ---------- helpers ---------- */
function _deepMerge(a, b){
  const o = Array.isArray(a) ? [...a] : {...a};
  if (!b) return o;
  for (const k in b){
    if (b[k] && typeof b[k]==='object' && !Array.isArray(b[k]) && a[k] && typeof a[k]==='object' && !Array.isArray(a[k]))
      o[k] = _deepMerge(a[k], b[k]);
    else o[k] = b[k];
  }
  return o;
}

/* ---------- DEFAULT PROJECT (Villa Solara — full data, as before) ---------- */
const VILLA_SOLARA = {
  id: 'villa-solara',
  cover: 'assets/villa-clean.png',
  status: 'completed', /* 'completed' | 'in-progress' | 'concept' */
  brand: { name: 'AURA', accent: '#3c82f6', tagline: 'Future Architecture Studio' },
  ui: { glassOpacity: 0.55, blur: 28, radius: 22, glow: 0.6, animSpeed: 1, theme: 'light' },
  scroll: {
    framesPerScroll: 1.6, smoothness: 0.085, reverse: false, loop: false,
    snap: true, touch: true, keyboard: true, sensitivity: 1.0
  },
  playback: { fpsExt: 9, fpsInt: 6, pauseExplore: 5, pauseRoom: 2.5, autoplay: true },
  sequence: { path: 'assets/seq/', prefix: 'frame', digits: 3, ext: '.webp', count: 97,
    /* per-project custom images (if empty, falls back to path/prefix) */
    images: []
  },
  stages: [
    { id:'excavation', name:'Excavation',  ar:'الحفر',        from:1,  to:16, color:'#b08d5f', icon:'◧', desc:'Site survey, excavation pit and foundation set-out.',
      pausePoints:[
        {frame:5,title:{ar:'بداية الحفر',en:'Excavation start'},desc:{ar:'تحديد الموقع والأبعاد النهائية للحفرة',en:'Site set-out and final excavation dimensions'},images:['assets/gallery/excavation-01.webp'],widget:'progress'},
        {frame:12,title:{ar:'اكتمال الحفر',en:'Excavation complete'},desc:{ar:'الحفر يصل لمستوى التأسيس المطلوب',en:'Excavation reaches formation level'},images:['assets/gallery/excavation-04.webp'],widget:'materials'}
      ]},
    { id:'foundation', name:'Foundation',  ar:'الأساسات',     from:17, to:32, color:'#8e8e93', icon:'▦', desc:'Rebar grids, concrete pour, waterproofing.',
      pausePoints:[
        {frame:20,title:{ar:'حديد التسليح',en:'Rebar installation'},desc:{ar:'شبكة حديد B500B بقطر 16مم',en:'B500B rebar grid Ø16mm'},images:['assets/gallery/foundation-02.webp'],widget:'structural'},
        {frame:28,title:{ar:'صب الخرسانة',en:'Concrete pour'},desc:{ar:'صب 210 م³ خرسانة C40 مقاومة للكبريتات',en:'210m³ C40 sulphate-resistant concrete pour'},images:['assets/gallery/foundation-05.webp'],widget:'cost'}
      ]},
    { id:'structure',  name:'Structure',   ar:'الهيكل',       from:33, to:48, color:'#7d7d82', icon:'▤', desc:'Columns, beams, slabs — the concrete skeleton.',
      pausePoints:[
        {frame:38,title:{ar:'الأعمدة',en:'Columns'},desc:{ar:'أعمدة 400×400 خرسانية',en:'400×400 concrete columns'},images:['assets/gallery/structure-02.webp'],widget:'structural'},
        {frame:45,title:{ar:'البلاطات',en:'Slabs'},desc:{ar:'بلاطات لاحقة 220مم',en:'220mm post-tensioned slabs'},images:['assets/gallery/structure-05.webp'],widget:'schedule'}
      ]},
    { id:'shell',      name:'Shell',       ar:'البناء',       from:49, to:64, color:'#a4a4a8', icon:'◫', desc:'Blockwork, wall infill, window openings.',
      pausePoints:[
        {frame:55,title:{ar:'مبانى طوبية',en:'Blockwork'},desc:{ar:'حوائط AAC بسماكة 200مم',en:'200mm AAC blockwork walls'},images:['assets/gallery/shell-02.webp'],widget:'materials'}
      ]},
    { id:'facade',     name:'Facade',      ar:'الواجهات',     from:65, to:80, color:'#cbb99a', icon:'◨', desc:'Travertine cladding, glazing, bronze frames.',
      pausePoints:[
        {frame:70,title:{ar:'ترافرتين',en:'Travertine'},desc:{ar:'ترافرتين نافونا متطابق',en:'Book-matched Travertine Navona'},images:['assets/gallery/facade-02.webp'],widget:'qa'},
        {frame:76,title:{ar:'زجاج وبرونز',en:'Glazing & Bronze'},desc:{ar:'زجاج Low-E ثلاثي + إطارات برونزية',en:'Triple Low-E glazing + bronze frames'},images:['assets/gallery/facade-05.webp'],widget:'finishing'}
      ]},
    { id:'complete',   name:'Completed',   ar:'الإنجاز',      from:81, to:96, color:'#3c82f6', icon:'◆', desc:'Interiors, landscape, pool and lighting.',
      pausePoints:[
        {frame:85,title:{ar:'التشطيبات الداخلية',en:'Interior finishes'},desc:{ar:'أرضيات بلوط + جير معدني',en:'Oak flooring + mineral lime plaster'},images:['assets/gallery/complete-02.webp'],widget:'rooms'},
        {frame:92,title:{ar:'التنسيق والمسبح',en:'Landscape & pool'},desc:{ar:'تنسيق خارجي + مسبح لا متناهي',en:'Landscape + infinity pool'},images:['assets/gallery/complete-06.webp'],widget:'ba'}
      ]},
    { id:'night',      name:'Night View',  ar:'المشهد الليلي', from:97, to:97, color:'#f0a54c', icon:'☾', desc:'Evening scene — the villa fully alive.',
      pausePoints:[
        {frame:97,title:{ar:'التسليم النهائي',en:'Final handover'},desc:{ar:'إضاءة ليلية + تسليم المشروع',en:'Night lighting + project handover'},images:['assets/stages/s7-night.png'],widget:'progress'}
      ]}
  ],
  project: {
    title: 'Villa Solara',
    location: 'Kuwait — Al Ahmadi',
    area: '742 m²',
    year: '2026',
    status: 'Completed',
    progress: 100
  },
  interior: {
    theme: 'luxury-modern',
    themes: ['modern-minimal','luxury-modern','scandinavian','japandi','contemporary','classic-luxury','arabic-luxury','industrial','mediterranean'],
    rooms: [
      { id:'living',  name:'Living Room',     ar:'غرفة المعيشة', area:'58 m²', height:'3.4 m', seq:31, interactive:true,
        plan:[6,34,34,44], adj:['kitchen','master'],
        finishes:'Travertine wall · Oak floor · Lime plaster', lighting:'Cove LED 2700K + floor lamp', hvac:'VRF concealed duct · 2 zones', acoustic:'Fabric panels behind art', smart:'Scenes · curtains · matter' },
      { id:'kitchen', name:'Kitchen',          ar:'المطبخ',       area:'32 m²', height:'3.1 m', seq:31, interactive:true,
        plan:[62,52,30,28], adj:['living'],
        finishes:'Travertine island · Oak cabinets · Stone splash', lighting:'3× pendant + task LED', hvac:'VRF + extract 650 m³/h', acoustic:'—', smart:'Appliance monitoring' },
      { id:'master',  name:'Master Bedroom',   ar:'غرفة النوم الرئيسية', area:'41 m²', height:'3.2 m', seq:31, interactive:true,
        plan:[6,6,30,24], adj:['bath','living'],
        finishes:'Fabric headboard wall · Oak floor', lighting:'Cove 2700K + bronze pendants', hvac:'VRF · silent mode 22 dB', acoustic:'Upholstered wall panels', smart:'Wake scenes · blackout' },
      { id:'bath',    name:'Master Bathroom',  ar:'الحمام الرئيسي', area:'14 m²', height:'2.8 m', seq:16, interactive:true,
        plan:[38,6,18,20], adj:['master'],
        finishes:'Full-height travertine · Stone tub', lighting:'Halo mirrors + recessed', hvac:'Underfloor heating + extract', acoustic:'—', smart:'Water temp presets' },
      { id:'majlis',  name:'Majlis',           ar:'المجلس',       area:'36 m²', height:'3.4 m', seq:0, interactive:false, plan:[6,80,34,16], adj:['living'] },
      { id:'dining',  name:'Dining Room',      ar:'غرفة الطعام',  area:'24 m²', height:'3.4 m', seq:0, interactive:false, plan:[42,42,18,22], adj:['kitchen','living'] },
      { id:'office',  name:'Office',           ar:'المكتب',       area:'16 m²', height:'3.1 m', seq:0, interactive:false, plan:[62,6,30,22], adj:['kitchen'] },
      { id:'terrace', name:'Terrace & Pool',   ar:'التراس والمسبح', area:'120 m²', height:'—', seq:0, interactive:false, plan:[42,80,52,16], adj:['living'] }
    ],
    furniture: {
      living: [
        { x:62, y:66, name:'Curve Sofa', nameAr:'كنبة كيرف', materialAr:'بوكليه كريمي · هيكل بلوط', material:'Cream bouclé · FSC oak frame', brand:'Living Divani', color:'Ivory 02', dims:'320 × 105 × 72 cm', finish:'Bouclé, kiln-dried frame', supplier:'Studio Forma KW', price:'4,850 KD' },
        { x:56, y:78, name:'Orbit Coffee Table', nameAr:'طاولة أوربت', materialAr:'جوز صلب · سطح حجري', material:'Solid walnut · honed stone top', brand:'Porro', color:'Canaletto', dims:'Ø 110 × 33 cm', finish:'Matte oil', supplier:'Studio Forma KW', price:'1,320 KD' },
        { x:88, y:44, name:'Aria Artwork', nameAr:'لوحة آريا', materialAr:'وسائط مختلطة على كتان', material:'Mixed media on linen', brand:'Local artist — N. Al-Sabah', color:'Sand tones', dims:'180 × 140 cm', finish:'Museum glass', supplier:'Dar Gallery', price:'—' },
        { x:38, y:52, name:'Olive Tree', nameAr:'شجرة زيتون', materialAr:'طبيعية · أصيص فخاري', material:'Live · terracotta pot', brand:'—', color:'—', dims:'H 240 cm', finish:'—', supplier:'Green Studio', price:'180 KD' }
      ],
      kitchen: [
        { x:52, y:66, name:'Monolith Island', nameAr:'جزيرة مونوليث', materialAr:'ترافرتين نافونا · حواف متتالية', material:'Travertine Navona · waterfall edges', brand:'Custom — AURA', color:'Navona cream', dims:'320 × 120 × 92 cm', finish:'Honed, sealed', supplier:'Marmi KW', price:'6,200 KD' },
        { x:50, y:26, name:'Trio Pendants', nameAr:'ثريات تريو', materialAr:'نحاس مخروط', material:'Spun brass', brand:'Apparatus', color:'Aged brass', dims:'Ø 25 cm each', finish:'Living patina', supplier:'Light House KW', price:'2,940 KD' },
        { x:18, y:44, name:'Column Cabinets', nameAr:'خزائن عمودية', materialAr:'بلوط مقطع · فتح باللمس', material:'Rift oak · push-latch', brand:'Custom — AURA', color:'Natural oak', dims:'H 300 cm run', finish:'Matte 2K lacquer', supplier:'Joinery Works', price:'—' }
      ],
      master: [
        { x:62, y:62, name:'Cloud Platform Bed', nameAr:'سرير كلاود', materialAr:'قاعدة بلوط · تنجيد كتان', material:'Oak base · linen upholstery', brand:'Flexform', color:'Greige', dims:'200 × 210 cm', finish:'Removable linen', supplier:'Studio Forma KW', price:'3,750 KD' },
        { x:80, y:38, name:'Drop Pendant Pair', nameAr:'معلقتا دروب', materialAr:'برونز · زجاج أوبال', material:'Bronze · opal glass', brand:'Articolo', color:'Burnished bronze', dims:'Ø 18 cm', finish:'Hand-blown', supplier:'Light House KW', price:'1,160 KD' },
        { x:20, y:60, name:'Ply Armchair', nameAr:'كرسي بلاي', materialAr:'بوكليه · أرجل جوز', material:'Bouclé · walnut legs', brand:'&Tradition', color:'Ivory', dims:'78 × 82 × 76 cm', finish:'—', supplier:'Studio Forma KW', price:'980 KD' }
      ],
      bath: [
        { x:30, y:70, name:'Oval Stone Tub', nameAr:'حوض حجري بيضاوي', materialAr:'حجر جيري صلب', material:'Solid limestone', brand:'Agape', color:'Bone', dims:'178 × 88 × 52 cm', finish:'Honed', supplier:'Marmi KW', price:'5,400 KD' },
        { x:58, y:48, name:'Halo Mirrors', nameAr:'مرايا هالو', materialAr:'إضاءة خلفية LED · إطار برونزي', material:'Backlit LED · bronze rim', brand:'Custom — AURA', color:'2700K', dims:'Ø 70 cm ×2', finish:'—', supplier:'Light House KW', price:'760 KD' }
      ]
    }
  },
  /* ---- NEW: dashboard widgets (clickable → modal) ---- */
  widgets: {
    design: {
      title: 'Design', titleAr: 'التصميم',
      kicker: '01', desc: 'Parametric concept design, photoreal visualization and generative optioning.',
      descAr: 'تصميم بارامتري وإخراج واقعي وخيارات توليدية قبل وضع أول حجر.',
      gallery: ['assets/villa-clean.png', 'assets/villa-blueprint.png', 'assets/villa-wireframe.png'],
      bullets: [
        ['Concept', 'المفهوم', 'Parametric massing + climate response'],
        ['Visualization', 'الإخراج البصري', 'Photoreal stills + cinematic flythrough'],
        ['Optioning', 'البدائل', 'AI-generated variants for client review']
      ]
    },
    execution: {
      title: 'Execution', titleAr: 'التنفيذ',
      kicker: '02', desc: 'Robotic surveying, laser-guided structure, millimetre tolerances — monitored live.',
      descAr: 'مساحة روبوتية وهيكل موجّه بالليزر بدقة مليمترية — بمراقبة حية.',
      gallery: ['assets/stages/s2-foundation.png', 'assets/stages/s3-structure.png', 'assets/stages/s4-shell.png'],
      bullets: [
        ['Survey', 'المساحة', 'Robotic total station ±2 mm'],
        ['Structure', 'الهيكل', 'Laser-guided rebar + concrete'],
        ['Monitoring', 'المراقبة', 'Live IoT sensors on every pour']
      ]
    },
    finishing: {
      title: 'Finishing', titleAr: 'التشطيبات',
      kicker: '03', desc: 'Book-matched travertine, low-E glazing, bronze detailing — every material traced.',
      descAr: 'ترافرتين متطابق وزجاج عازل وتفاصيل برونزية — كل خامة موثقة.',
      gallery: ['assets/stages/s5-facade.png', 'assets/stages/s6-complete.png', 'assets/stages/s7-night.png'],
      bullets: [
        ['Stone', 'الحجر', 'Travertine Navona — book-matched'],
        ['Glazing', 'الزجاج', 'Low-E triple, U-value 0.6'],
        ['Metal', 'المعادن', 'Bronze profiles — thermal break']
      ]
    },
    management: {
      title: 'Project Management', titleAr: 'إدارة المشاريع',
      kicker: '04', desc: 'One live dashboard for cost, schedule and quality. AI flags risk early.',
      descAr: 'لوحة واحدة حية للتكلفة والجدول والجودة — والذكاء الاصطناعي ينذر مبكرًا.',
      gallery: ['assets/villa-clean.png', 'assets/stages/s1-excavation.png', 'assets/stages/s7-night.png'],
      bullets: [
        ['Cost', 'التكلفة', 'Real-time burn-down vs budget'],
        ['Schedule', 'الجدول', 'CPM critical path with AI risk flags'],
        ['Quality', 'الجودة', '24 inspections logged, 0 open issues']
      ]
    },
    /* dashboard widgets — open modal with related info */
    progress: {
      title: 'Build Progress', titleAr: 'تقدم البناء',
      kicker: 'AI', desc: 'Real-time build progress with discipline breakdown and quality scoring.',
      descAr: 'تقدم البناء لحظيًا مع تفصيل المراحل وتقييم الجودة.',
      gallery: ['assets/stages/s3-structure.png', 'assets/stages/s5-facade.png', 'assets/stages/s7-night.png'],
      bullets: [
        ['Overall', 'الإجمالي', 'Composite of 5 disciplines'],
        ['Quality', 'الجودة', 'AI-scored from inspections'],
        ['Forecast', 'التوقعات', 'On-track · 0 risks']
      ]
    },
    structural: {
      title: 'Structural Analysis', titleAr: 'الحسابات الإنشائية',
      kicker: 'FEA', desc: 'Finite-element analysis of integrity, load paths and deflection.',
      descAr: 'تحليل بالعناصر المحدودة للسلامة ومسار الأحمال والترخيم.',
      gallery: ['assets/villa-wireframe.png', 'assets/stages/s3-structure.png'],
      bullets: [
        ['Integrity', 'السلامة', '99% at completion'],
        ['Deflection', 'الترخيم', 'L/540 — within tolerance'],
        ['Foundation', 'الأساس', 'Cured, sulphate-resistant']
      ]
    },
    materials: {
      title: 'Materials Scan', titleAr: 'فحص المواد',
      kicker: 'SCAN', desc: 'Every material QR-traced from source to installation.',
      descAr: 'كل خامة موثقة بـ QR من المصدر حتى التركيب.',
      gallery: ['assets/stages/s5-facade.png'],
      bullets: [
        ['Soil', 'التربة', 'Engineered fill, 95% compaction'],
        ['Rebar', 'الحديد', 'B500B Ø16 @ 150 mm'],
        ['Concrete', 'الخرسانة', 'C40 sulphate-resistant'],
        ['Travertine', 'الترافرتين', 'Navona, book-matched']
      ]
    },
    schedule: {
      title: 'Schedule (CPM)', titleAr: 'الجدول الزمني',
      kicker: 'CPM', desc: 'Critical-path schedule with AI risk flags and live progress.',
      descAr: 'جدول المسار الحرج مع تنبيهات الذكاء الاصطناعي وتقدم حي.',
      gallery: ['assets/stages/s1-excavation.png', 'assets/stages/s7-night.png'],
      bullets: [
        ['Critical Path', 'المسار الحرج', '52 weeks total'],
        ['Current Stage', 'المرحلة الحالية', 'On track'],
        ['Risk Flags', 'مخاطر', '0 active']
      ]
    },
    cost: {
      title: 'Cost Analysis', titleAr: 'تحليل التكلفة',
      kicker: 'AI', desc: 'Live budget burn-down with variance and contingency tracking.',
      descAr: 'متابعة حية للميزانية مع الانحراف والاحتياطي.',
      gallery: ['assets/villa-clean.png'],
      bullets: [
        ['Budget Used', 'المصروف', '86% at 100% progress'],
        ['Variance', 'الانحراف', '−1.2% (under budget)'],
        ['Contingency', 'الاحتياطي', '8.0% remaining']
      ]
    },
    qa: {
      title: 'QA / Safety', titleAr: 'الجودة والسلامة',
      kicker: 'QA', desc: 'Inspection log with zero open issues at handover.',
      descAr: 'سجل الفحوصات بدون ملاحظات مفتوحة عند التسليم.',
      gallery: ['assets/stages/s5-facade.png', 'assets/stages/s6-complete.png'],
      bullets: [
        ['Inspections', 'الفحوصات', '24/24 passed'],
        ['Open Issues', 'ملاحظات', '0 open'],
        ['Safety', 'السلامة', 'Zero incidents']
      ]
    }
  },
  /* ---- NEW: Experiences (360°, Walkthrough, Before/After) — per project ---- */
  experiences: {
    panos: [
      {room:'Living Room',roomAr:'غرفة المعيشة',img:'assets/rooms/pano-living.webp'},
      {room:'Kitchen',roomAr:'المطبخ',img:'assets/rooms/pano-kitchen.webp'},
      {room:'Master Bedroom',roomAr:'غرفة النوم',img:'assets/rooms/pano-master.webp'},
      {room:'Master Bathroom',roomAr:'الحمام',img:'assets/rooms/pano-bath.webp'}
    ],
    walkthrough: {
      img:'assets/rooms/pano-living.webp',
      video:'',
      title:'جولة حرة في فيلا سولارا',
      desc:'اسحب للنظر حولك · انقر الأبواب للتنقل بين الغرف'
    },
    beforeAfter: [
      {label:'Design',labelAr:'التصميم',before:'assets/villa-blueprint.png',after:'assets/villa-wireframe.png'},
      {label:'Execution',labelAr:'التنفيذ',before:'assets/stages/s3-structure.png',after:'assets/stages/s4-shell.png'},
      {label:'Finishing',labelAr:'التشطيبات',before:'assets/stages/s4-shell.png',after:'assets/stages/s5-facade.png'},
      {label:'Handover',labelAr:'التسليم',before:'assets/villa-clean.png',after:'assets/stages/s7-night.png'}
    ]
  },
  widgetSequences: {
    progress: {images:['assets/stages/s1-excavation.png','assets/stages/s2-foundation.png','assets/stages/s3-structure.png'],autoplay:true,interval:3500},
    structural: {images:['assets/villa-wireframe.png','assets/stages/s3-structure.png','assets/gallery/structure-02.webp'],autoplay:true,interval:3500},
    materials: {images:['assets/stages/s5-facade.png','assets/gallery/facade-02.webp','assets/gallery/facade-05.webp'],autoplay:true,interval:3500},
    schedule: {images:['assets/stages/s1-excavation.png','assets/stages/s3-structure.png','assets/stages/s7-night.png'],autoplay:true,interval:3500},
    cost: {images:['assets/villa-clean.png','assets/stages/s3-structure.png','assets/stages/s7-night.png'],autoplay:true,interval:3500},
    qa: {images:['assets/stages/s5-facade.png','assets/gallery/complete-02.webp','assets/gallery/complete-06.webp'],autoplay:true,interval:3500},
    rooms: {images:['assets/rooms/pano-living.webp','assets/rooms/pano-kitchen.webp','assets/rooms/pano-master.webp','assets/rooms/pano-bath.webp'],autoplay:true,interval:3500},
    ba: {images:['assets/villa-blueprint.png','assets/villa-wireframe.png','assets/stages/s5-facade.png','assets/stages/s7-night.png'],autoplay:true,interval:3500}
  },
  beforeAfter: [
    { id:'design',      label:'Design',            labelAr:'التصميم',      before:'assets/villa-blueprint.png',    after:'assets/villa-wireframe.png' },
    { id:'execution',   label:'Execution',         labelAr:'التنفيذ',       before:'assets/stages/s3-structure.png',after:'assets/stages/s4-shell.png' },
    { id:'finishing',   label:'Finishing',         labelAr:'التشطيبات',    before:'assets/stages/s4-shell.png',    after:'assets/stages/s5-facade.png' },
    { id:'management',  label:'Project Management',labelAr:'إدارة المشاريع',before:'assets/villa-clean.png',       after:'assets/stages/s7-night.png' }
  ],
  /* ---- NEW: comprehensive hotspots (video frames + before/after + galleries) ---- */
  hotspots: {
    sequence: {
      '5':  [{x:40,y:35,title:{ar:'بداية الحفر',en:'Excavation start'},type:'info'}],
      '20': [{x:50,y:50,title:{ar:'حديد التسليح',en:'Rebar'},type:'warning'}],
      '70': [{x:30,y:40,title:{ar:'ترافرتين',en:'Travertine'},type:'info'}],
      '97': [{x:50,y:30,title:{ar:'التسليم',en:'Handover'},type:'milestone'}]
    },
    beforeAfter: {
      'design':    [{x:25,y:40,title:{ar:'مخطط تفصيلي',en:'Blueprint detail'},type:'info'}],
      'execution': [{x:55,y:35,title:{ar:'الهيكل',en:'Structure'},type:'info'}],
      'finishing': [{x:40,y:45,title:{ar:'الواجهة',en:'Facade'},type:'info'}],
      'management':[{x:50,y:50,title:{ar:'التسليم',en:'Handover'},type:'milestone'}]
    },
    gallery: {
      'excavation': [{x:50,y:50,title:{ar:'موقع الحفر',en:'Excavation site'},type:'info'}],
      'facade':     [{x:45,y:40,title:{ar:'ترافرتين',en:'Travertine'},type:'info'}],
      'complete':   [{x:50,y:50,title:{ar:'الإنجاز',en:'Complete'},type:'milestone'}]
    }
  },
  /* ---- NEW: contact info shown in widget modals ---- */
  contact: {
    company: 'AURA Architecture Studio',
    companyAr: 'أورا للاستشارات المعمارية',
    phone: '+965 2222 3333',
    whatsapp: '96522223333',
    email: 'studio@aura-arch.com',
    instagram: '@aura.arch',
    location: 'Kuwait City, Kuwait'
  }
};

/* ---------- DEFAULT SECOND PROJECT (placeholder — same structure, simpler content) ---------- */
const VILLA_NAIRO = {
  id: 'villa-nairo',
  cover: 'assets/stages/s5-facade.png',
  status: 'in-progress',
  brand: { name: 'AURA', accent: '#7d5cf0', tagline: 'Future Architecture Studio' },
  ui: { glassOpacity: 0.55, blur: 28, radius: 22, glow: 0.6, animSpeed: 1, theme: 'light' },
  scroll: { framesPerScroll:1.6, smoothness:0.085, reverse:false, loop:false, snap:true, touch:true, keyboard:true, sensitivity:1.0 },
  playback: { fpsExt:9, fpsInt:6, pauseExplore:5, pauseRoom:2.5, autoplay:true },
  sequence: { path:'assets/seq/', prefix:'frame', digits:3, ext:'.webp', count:97, images: [] },
  stages: [
    { id:'excavation', name:'Excavation',  ar:'الحفر',        from:1,  to:16, color:'#b08d5f', icon:'◧', desc:'Site survey, excavation pit and foundation set-out.', images:[], pausePoints:[] },
    { id:'foundation', name:'Foundation',  ar:'الأساسات',     from:17, to:32, color:'#8e8e93', icon:'▦', desc:'Rebar grids, concrete pour, waterproofing.', images:[], pausePoints:[] },
    { id:'structure',  name:'Structure',   ar:'الهيكل',       from:33, to:48, color:'#7d7d82', icon:'▤', desc:'Columns, beams, slabs — the concrete skeleton.', images:[], pausePoints:[] },
    { id:'shell',      name:'Shell',       ar:'البناء',       from:49, to:64, color:'#a4a4a8', icon:'◫', desc:'Blockwork, wall infill, window openings.', images:[], pausePoints:[] },
    { id:'facade',     name:'Facade',      ar:'الواجهات',     from:65, to:80, color:'#cbb99a', icon:'◨', desc:'Travertine cladding, glazing, bronze frames.', images:[], pausePoints:[] },
    { id:'complete',   name:'Completed',   ar:'الإنجاز',      from:81, to:96, color:'#7d5cf0', icon:'◆', desc:'Interiors, landscape, pool and lighting.', images:[], pausePoints:[] },
    { id:'night',      name:'Night View',  ar:'المشهد الليلي', from:97, to:97, color:'#f0a54c', icon:'☾', desc:'Evening scene — the villa fully alive.', images:[], pausePoints:[] }
  ],
  project: {
    title: 'Villa Nairo', location: 'Kuwait — Jabriya', area: '520 m²', year: '2026', status: 'In Progress', progress: 65
  },
  interior: {
    theme: 'japandi',
    themes: ['modern-minimal','luxury-modern','scandinavian','japandi','contemporary','classic-luxury','arabic-luxury','industrial','mediterranean'],
    rooms: [
      { id:'living',  name:'Living Room',     ar:'غرفة المعيشة', area:'46 m²', height:'3.2 m', seq:31, interactive:true,
        plan:[6,34,34,44], adj:['kitchen','master'],
        finishes:'Lime plaster · Oak floor', lighting:'Cove LED 2700K', hvac:'VRF · 2 zones', acoustic:'Fabric panels', smart:'Curtains · scenes' },
      { id:'kitchen', name:'Kitchen',          ar:'المطبخ',       area:'28 m²', height:'3.0 m', seq:31, interactive:true,
        plan:[62,52,30,28], adj:['living'],
        finishes:'Oak island · Stone splash', lighting:'Pendants + task LED', hvac:'VRF + extract', acoustic:'—', smart:'Appliances' },
      { id:'master',  name:'Master Bedroom',   ar:'غرفة النوم الرئيسية', area:'34 m²', height:'3.1 m', seq:31, interactive:true,
        plan:[6,6,30,24], adj:['bath','living'],
        finishes:'Linen headboard · Oak floor', lighting:'Cove + bronze pendants', hvac:'VRF · silent', acoustic:'Upholstered panels', smart:'Wake scenes' },
      { id:'bath',    name:'Master Bathroom',  ar:'الحمام الرئيسي', area:'12 m²', height:'2.7 m', seq:16, interactive:true,
        plan:[38,6,18,20], adj:['master'],
        finishes:'Microcement · Stone tub', lighting:'Halo mirror', hvac:'Underfloor + extract', acoustic:'—', smart:'Temp presets' },
      { id:'majlis',  name:'Majlis',           ar:'المجلس',       area:'30 m²', height:'3.2 m', seq:0, interactive:false, plan:[6,80,34,16], adj:['living'] },
      { id:'dining',  name:'Dining Room',      ar:'غرفة الطعام',  area:'20 m²', height:'3.2 m', seq:0, interactive:false, plan:[42,42,18,22], adj:['kitchen','living'] },
      { id:'office',  name:'Office',           ar:'المكتب',       area:'14 m²', height:'3.0 m', seq:0, interactive:false, plan:[62,6,30,22], adj:['kitchen'] },
      { id:'terrace', name:'Terrace & Pool',   ar:'التراس والمسبح', area:'90 m²', height:'—', seq:0, interactive:false, plan:[42,80,52,16], adj:['living'] }
    ],
    furniture: {
      living:  [{ x:60,y:65, name:'Sofa Nairo', nameAr:'كنبة نايرو', materialAr:'كتان رمادي', material:'Linen grey', brand:'Flexform', color:'Stone', dims:'300 × 100 × 70 cm', finish:'Removable linen', supplier:'Studio Forma KW', price:'3,950 KD' },
                { x:55,y:78, name:'Coffee Table', nameAr:'طاولة قهوة', materialAr:'بلوط', material:'Oak', brand:'Porro', color:'Natural', dims:'Ø 100 × 35 cm', finish:'Oil', supplier:'Studio Forma KW', price:'980 KD' }],
      kitchen: [{ x:50,y:65, name:'Island Nairo', nameAr:'جزيرة نايرو', materialAr:'بلوط وحجر', material:'Oak + stone', brand:'Custom — AURA', color:'Oak', dims:'280 × 110 × 92 cm', finish:'Matte', supplier:'Marmi KW', price:'4,800 KD' }],
      master:  [{ x:60,y:60, name:'Bed Nairo', nameAr:'سرير نايرو', materialAr:'كتان طبيعي', material:'Linen natural', brand:'Flexform', color:'Sand', dims:'200 × 210 cm', finish:'Removable', supplier:'Studio Forma KW', price:'3,200 KD' }],
      bath:    [{ x:30,y:70, name:'Tub Nairo', nameAr:'حوض نايرو', materialAr:'حجر ميكروسمنت', material:'Microcement', brand:'Agape', color:'Bone', dims:'170 × 85 × 50 cm', finish:'Honed', supplier:'Marmi KW', price:'4,200 KD' }]
    }
  },
  widgets: {
    design:     { title:'Design',            titleAr:'التصميم',       kicker:'01', desc:'Parametric concept design — exploratory massing for a coastal villa.', descAr:'تصميم بارامتري — دراسة كتل لمشروع ساحلي.',
                  gallery:['assets/villa-blueprint.png','assets/villa-wireframe.png'],
                  bullets:[['Concept','المفهوم','Coastal massing + shade study'],['Visualization','الإخراج','Real-time flythrough'],['Optioning','البدائل','Three concept variants']] },
    execution:  { title:'Execution',         titleAr:'التنفيذ',        kicker:'02', desc:'Currently at structural stage — slab pours ongoing.', descAr:'حاليًا في المرحلة الإنشائية — صب البلاطات جارية.',
                  gallery:['assets/stages/s2-foundation.png','assets/stages/s3-structure.png'],
                  bullets:[['Survey','المساحة','Robotic total station'],['Structure','الهيكل','Slab pours 60% complete'],['Monitoring','المراقبة','Live IoT sensors']] },
    finishing:  { title:'Finishing',         titleAr:'التشطيبات',     kicker:'03', desc:'Material palette selected — finishing starts Q3 2026.', descAr:'تم اختيار المواد — التشطيب يبدأ الربع الثالث 2026.',
                  gallery:['assets/stages/s5-facade.png'],
                  bullets:[['Stone','الحجر','Travertine Navona'],['Glazing','الزجاج','Low-E triple'],['Metal','المعادن','Bronze profiles']] },
    management: { title:'Project Management',titleAr:'إدارة المشاريع',kicker:'04', desc:'On schedule — 65% complete, on budget.', descAr:'في الموعد — 65% منتهي، ضمن الميزانية.',
                  gallery:['assets/villa-clean.png','assets/stages/s3-structure.png'],
                  bullets:[['Cost','التكلفة','56% budget used — on track'],['Schedule','الجدول','CPM on critical path'],['Quality','الجودة','15 inspections, 0 issues']] },
    /* dashboard widgets (same ids as Villa Solara) */
    progress:   { title:'Build Progress',    titleAr:'تقدم البناء',       kicker:'AI',   desc:'Real-time build progress with discipline breakdown.', descAr:'تقدم البناء لحظيًا مع تفصيل المراحل.',
                  gallery:['assets/stages/s3-structure.png','assets/stages/s5-facade.png'],
                  bullets:[['Overall','الإجمالي','65% complete'],['Quality','الجودة','AI-scored'],['Forecast','التوقعات','On track']] },
    structural: { title:'Structural Analysis',titleAr:'الحسابات الإنشائية',kicker:'FEA',  desc:'FEA of integrity and load paths.', descAr:'تحليل بالعناصر المحدودة.',
                  gallery:['assets/villa-wireframe.png','assets/stages/s3-structure.png'],
                  bullets:[['Integrity','السلامة','75%'],['Deflection','الترخيم','L/480'],['Foundation','الأساس','Curing']] },
    materials:  { title:'Materials Scan',    titleAr:'فحص المواد',         kicker:'SCAN', desc:'QR-tracked materials.', descAr:'مواد موثقة بـ QR.',
                  gallery:['assets/stages/s3-structure.png'],
                  bullets:[['Soil','التربة','OK'],['Rebar','الحديد','OK'],['Concrete','الخرسانة','OK'],['Travertine','الترافرتين','Pending']] },
    schedule:   { title:'Schedule (CPM)',    titleAr:'الجدول الزمني',     kicker:'CPM',  desc:'Critical-path schedule.', descAr:'جدول المسار الحرج.',
                  gallery:['assets/stages/s1-excavation.png','assets/stages/s3-structure.png'],
                  bullets:[['Critical Path','المسار الحرج','52 weeks'],['Current','الحالي','Structure'],['Risk','مخاطر','0 active']] },
    cost:       { title:'Cost Analysis',     titleAr:'تحليل التكلفة',     kicker:'AI',   desc:'Live budget burn-down.', descAr:'متابعة حية للميزانية.',
                  gallery:['assets/villa-clean.png'],
                  bullets:[['Budget Used','المصروف','56%'],['Variance','الانحراف','+0.4%'],['Contingency','الاحتياطي','12.0%']] },
    qa:         { title:'QA / Safety',       titleAr:'الجودة والسلامة',  kicker:'QA',   desc:'Inspection log.', descAr:'سجل الفحوصات.',
                  gallery:['assets/stages/s3-structure.png'],
                  bullets:[['Inspections','الفحوصات','15/24'],['Open Issues','ملاحظات','0'],['Safety','السلامة','Zero incidents']] }
  },
  beforeAfter: [
    { id:'design',     label:'Design',             labelAr:'التصميم',       before:'assets/villa-blueprint.png',    after:'assets/villa-wireframe.png' },
    { id:'execution',  label:'Execution',          labelAr:'التنفيذ',        before:'assets/stages/s2-foundation.png',after:'assets/stages/s3-structure.png' },
    { id:'finishing',  label:'Finishing',          labelAr:'التشطيبات',     before:'assets/stages/s4-shell.png',     after:'assets/stages/s5-facade.png' },
    { id:'management', label:'Project Management', labelAr:'إدارة المشاريع',before:'assets/villa-clean.png',         after:'assets/stages/s7-night.png' }
  ],
  experiences: {
    panos: [
      {room:'Living Room',roomAr:'غرفة المعيشة',img:'assets/rooms/pano-living.webp'},
      {room:'Kitchen',roomAr:'المطبخ',img:'assets/rooms/pano-kitchen.webp'}
    ],
    walkthrough: {
      img:'assets/rooms/pano-living.webp',
      video:'',
      title:'جولة حرة - Villa Nairo',
      desc:'جولة في مشروع نايرو - قيد التنفيذ'
    },
    beforeAfter: [
      {label:'Design',labelAr:'التصميم',before:'assets/villa-blueprint.png',after:'assets/villa-wireframe.png'},
      {label:'Execution',labelAr:'التنفيذ',before:'assets/stages/s2-foundation.png',after:'assets/stages/s3-structure.png'}
    ]
  },
  widgetSequences: {
    progress: {images:['assets/stages/s1-excavation.png','assets/stages/s2-foundation.png','assets/stages/s3-structure.png'],autoplay:true,interval:3500},
    structural: {images:['assets/villa-wireframe.png','assets/stages/s3-structure.png'],autoplay:true,interval:3500},
    materials: {images:['assets/stages/s3-structure.png'],autoplay:true,interval:3500},
    schedule: {images:['assets/stages/s1-excavation.png','assets/stages/s3-structure.png'],autoplay:true,interval:3500},
    cost: {images:['assets/villa-clean.png'],autoplay:true,interval:3500},
    qa: {images:['assets/stages/s3-structure.png'],autoplay:true,interval:3500},
    rooms: {images:['assets/rooms/pano-living.webp','assets/rooms/pano-kitchen.webp'],autoplay:true,interval:3500},
    ba: {images:['assets/villa-blueprint.png','assets/villa-wireframe.png'],autoplay:true,interval:3500}
  },
  hotspots: {
    sequence: {},
    beforeAfter: {},
    gallery: {}
  },
  contact: {
    company: 'AURA Architecture Studio', companyAr: 'أورا للاستشارات المعمارية',
    phone: '+965 2222 3333', whatsapp: '96522223333', email: 'studio@aura-arch.com', instagram: '@aura.arch', location: 'Kuwait City, Kuwait'
  }
};

/* ---------- ROOT DEFAULTS ---------- */
window.AURA_DEFAULTS = {
  currentProjectId: 'villa-solara',
  projects: [VILLA_SOLARA, VILLA_NAIRO],
  siteContent: {
    contact: {
      company: 'AURA Studio',
      companyAr: 'أورا ستوديو',
      whatsapp: '96522223333',
      phone: '+965 2222 3333',
      email: 'studio@aura-arch.com',
      location: 'Kuwait City, Kuwait',
      locationAr: 'مدينة الكويت، الكويت',
      mapUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=47.95%2C29.34%2C48.05%2C29.40&layer=mapnik&marker=29.3702%2C48.0083'
    },
    hero: {
      title1Ar: 'من أول حجر…',
      title2Ar: 'حتى آخر غرفة',
      subtitleAr: 'فيلم واحد متواصل لمشروعك',
      sublineAr: 'منصة واحدة تجمع التوثيق البصري الحي، تقدّم المشروع لحظة بلحظة، وتأخذ عميلك في جولة تفاعلية.',
      title1En: 'From the first stone',
      title2En: 'to the last room',
      subtitleEn: 'One continuous living record of your project',
      sublineEn: 'One platform for live visual documentation, real-time progress, and interactive walkthroughs.'
    },
    about: {
      headingAr: 'نحوّل كل مشروع إلى فيلم متواصل',
      headingEn: 'We turn every project into a continuous film',
      titleAr: 'منصة واحدة، من أول حجر حتى آخر غرفة.',
      titleEn: 'One platform, from the first stone to the last room.',
      p1Ar: 'في AURA Studio نؤمن بأن كل مشروع بناء يستحق أن يُروى كقصة واحدة متواصلة — لا كملفات متناثرة وتقارير شهرية مملة. لذلك بنينا منصة تجمع التوثيق البصري الحي، لوحات التحكم الذكية، والجولات التفاعلية في مكان واحد.',
      p1En: 'At AURA Studio we believe every construction project deserves to be told as one continuous story — not scattered files and boring monthly reports. So we built a platform that combines live visual documentation, smart dashboards, and interactive walkthroughs in one place.',
      p2Ar: 'نعمل مع المطورين العقاريين وشركات المقاولات والتشطيبات في الخليج لنمنحهم شفافية كاملة، حماية من النزاعات، وتجربة عميل تليق بمستوى المشاريع الفاخرة.',
      p2En: 'We work with real estate developers, contractors, and finishing companies in the Gulf to give them full transparency, dispute protection, and a client experience worthy of luxury projects.',
      quoteAr: 'البناء فن، والتوثيق احترام لهذا الفن.',
      quoteEn: 'Construction is art, and documentation is respect for that art.',
      stat1Val: '2+', stat1LabelAr: 'سنوات خبرة', stat1LabelEn: 'Years experience',
      stat2Val: '12+', stat2LabelAr: 'مشروع موثّق', stat2LabelEn: 'Projects documented',
      stat3Val: '97', stat3LabelAr: 'إطار لكل مشروع', stat3LabelEn: 'Frames per project'
    },
    clients: [
      {icon:'▲',name:'Al-Sabah Developments',logo:''},
      {icon:'◆',name:'Marmi Kuwait',logo:''},
      {icon:'●',name:'Studio Forma KW',logo:''},
      {icon:'■',name:'Gulf RMC',logo:''},
      {icon:'★',name:'Light House KW',logo:''},
      {icon:'⬢',name:'Qurain Steel',logo:''},
      {icon:'◐',name:'Joinery Works',logo:''},
      {icon:'◈',name:'Dar Gallery',logo:''},
      {icon:'◇',name:'Green Studio',logo:''},
      {icon:'▼',name:'Apparatus KW',logo:''},
      {icon:'▣',name:'Flexform Gulf',logo:''},
      {icon:'◉',name:'Agape Interiors',logo:''}
    ]
  }
};

/* ---------- STORE API ---------- */
window.AURA = (function(){
  const KEY = 'aura.cms';

  function load(){
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
      return _deepMerge(window.AURA_DEFAULTS, saved);
    } catch(e){
      return JSON.parse(JSON.stringify(window.AURA_DEFAULTS));
    }
  }
  function save(cfg){
    cfg._lastUpdate=Date.now().toString();
    localStorage.setItem(KEY, JSON.stringify(cfg));
  }
  function reset(){ localStorage.removeItem(KEY); }

  function getProjects(cfg){ return cfg.projects || []; }
  function getCurrent(cfg){ return (cfg.projects || []).find(p => p.id === cfg.currentProjectId) || cfg.projects[0]; }
  function setCurrent(cfg, id){
    if (cfg.projects.find(p => p.id === id)) {
      cfg.currentProjectId = id;
      save(cfg);
    }
    return cfg;
  }
  function addProject(cfg, project){
    cfg.projects.push(project);
    save(cfg);
    return project;
  }
  function deleteProject(cfg, id){
    if (cfg.projects.length <= 1) return false; /* keep at least one */
    cfg.projects = cfg.projects.filter(p => p.id !== id);
    if (cfg.currentProjectId === id) cfg.currentProjectId = cfg.projects[0].id;
    save(cfg);
    return true;
  }
  function updateProject(cfg, id, patch){
    const p = cfg.projects.find(x => x.id === id);
    if (!p) return null;
    Object.assign(p, patch);
    save(cfg);
    return p;
  }
  function reorder(cfg, ids){
    cfg.projects.sort((a,b) => ids.indexOf(a.id) - ids.indexOf(b.id));
    save(cfg);
  }

  /* helper: get all images assembled from per-stage images (in order) */
  function getAssembledImages(project){
    /* if sequence has images, use them */
    if(project.sequence && project.sequence.images && project.sequence.images.length > 0){
      return project.sequence.images;
    }
    /* fallback: assemble from per-stage images */
    if(project.stages){
      const all=[];
      project.stages.forEach(s=>{
        if(s.images && s.images.length > 0){
          all.push(...s.images);
        }
      });
      if(all.length > 0) return all;
    }
    return [];
  }

  function frameSrc(project, n){
    const s = project.sequence;
    /* try assembled images (from sequence or per-stage) */
    const allImgs = getAssembledImages(project);
    if(allImgs.length > 0 && n <= allImgs.length){
      return allImgs[n - 1];
    }
    /* fallback to path/prefix (default frames) */
    if(s.path && s.prefix){
      return s.path + s.prefix + String(n).padStart(s.digits || 3, '0') + (s.ext || '.webp');
    }
    /* last resort: empty */
    return '';
  }
  function applyTheme(project, rootEl){
    const r = (rootEl || document.documentElement).style;
    r.setProperty('--blue', project.brand.accent);
    r.setProperty('--glass-a', project.ui.glassOpacity);
    r.setProperty('--blur', project.ui.blur + 'px');
    r.setProperty('--r', project.ui.radius + 'px');
    r.setProperty('--glow', project.ui.glow);
  }

  return {
    KEY, load, save, reset,
    getProjects, getCurrent, setCurrent,
    addProject, deleteProject, updateProject, reorder,
    frameSrc, getAssembledImages, applyTheme
  };
})();

/* ============================================================
   AURA i18n — EN/AR toggle (unchanged from original)
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
