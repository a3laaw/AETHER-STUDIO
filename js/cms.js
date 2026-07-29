/* ============================================================
   AURA CMS bridge — shared between site and admin panel
   Settings live in localStorage ('aura.cms') and are applied
   at runtime. The Admin Panel writes; the site reads.
   ============================================================ */
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
  sequence: {
    path: "assets/seq/",
    prefix: "frame",
    digits: 3,
    ext: ".webp",
    count: 97
  },
  stages: [
    { id:"excavation", name:"Excavation",  ar:"الحفر",      from:1,   to:16,  color:"#b08d5f", icon:"◧", desc:"Site survey, excavation pit and foundation set-out." },
    { id:"foundation", name:"Foundation",  ar:"الأساسات",   from:17,  to:32,  color:"#8e8e93", icon:"▦", desc:"Rebar grids, concrete pour, waterproofing." },
    { id:"structure",  name:"Structure",   ar:"الهيكل",     from:33,  to:48,  color:"#7d7d82", icon:"▤", desc:"Columns, beams, slabs — the concrete skeleton." },
    { id:"shell",      name:"Shell",       ar:"البناء",     from:49,  to:64,  color:"#a4a4a8", icon:"◫", desc:"Blockwork, wall infill, window openings." },
    { id:"facade",     name:"Facade",      ar:"الواجهات",   from:65,  to:80,  color:"#cbb99a", icon:"◨", desc:"Travertine cladding, glazing, bronze frames." },
    { id:"complete",   name:"Completed",   ar:"الإنجاز",    from:81,  to:96,  color:"#3c82f6", icon:"◆", desc:"Interiors, landscape, pool and lighting." },
    { id:"night",      name:"Night View",  ar:"المشهد الليلي", from:97, to:97, color:"#f0a54c", icon:"☾", desc:"Evening scene — the villa fully alive." }
  ],
  project: {
    title: "Villa Solara",
    location: "Kuwait — Al Ahmadi",
    area: "742 m²",
    year: "2026",
    status: "Completed",
    progress: 100
  },
  interior: {
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
  }
};

window.AURA = (function(){
  const KEY = 'aura.cms';
  function deepMerge(a,b){
    const o = Array.isArray(a) ? [...a] : {...a};
    if(!b) return o;
    for(const k in b){
      if(b[k] && typeof b[k]==='object' && !Array.isArray(b[k]) && a[k] && typeof a[k]==='object' && !Array.isArray(a[k]))
        o[k]=deepMerge(a[k],b[k]);
      else o[k]=b[k];
    }
    return o;
  }
  function load(){
    try{ return deepMerge(window.AURA_DEFAULTS, JSON.parse(localStorage.getItem(KEY)||'{}')); }
    catch(e){ return {...window.AURA_DEFAULTS}; }
  }
  function save(cfg){ localStorage.setItem(KEY, JSON.stringify(cfg)); }
  function reset(){ localStorage.removeItem(KEY); }
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
  return { load, save, reset, frameSrc, applyTheme, KEY };
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
