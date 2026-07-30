# AURA Studio — دراسة شاملة لإعادة الهيكلة

## الوضع الحالي vs الرؤية المطلوبة

---

## 1️⃣ مشكلة: الإعدادات لا تنعكس على الموقع

### المشكلة الحالية:
```
Admin → "سرعة الفيديو" → يحفظ في localStorage
Site → يقرأ من localStorage ✓ (لكن مش بيحدث القيم)
Admin → "العملاء" → يحفظ في siteContent.clients
Site → applySiteContent() يقرأهم ✓ (لكن مش بيتحدث بدون reload)
```

### الأسباب:
1. **سرعة الفيديو**: `savePlayback()` يحفظ في `PROJ.playback` لكن `index.html` بيقرأ `PB` مرة واحدة عند التحميل
2. **العملاء**: `applySiteContent()` بيتعمل مرة واحدة عند التحميل، أي تعديل في admin محتاج reload
3. **الصور**: مش بيتحفظ فعلياً لأن admin في صفحة تانية عن index.html

### الحل:
```javascript
// بدل ما نعتمد على reload، نستخدم storage event
window.addEventListener('storage', (e) => {
  if (e.key === 'aura.cms') {
    CFG = AURA.load();
    PROJ = AURA.getCurrent(CFG);
    applySiteContent();
    applyPlayback(); // جديد
    buildProjectBar(); // جديد
  }
});
```

---

## 2️⃣ مشكلة: العملاء محتاجين صور

### الحالي:
```javascript
clients: [{icon:'▲', name:'Al-Sabah'}]  // نص وأيقونة فقط
```

### المطلوب:
```javascript
clients: [
  {name: 'Al-Sabah Developments', logo: 'https://supabase-url/logo1.png', url: 'https://...'},
  {name: 'Marmi Kuwait', logo: 'data:image/jpeg;base64,...', url: ''},
]
```

### الحل:
- في Admin: كل عميل له: اسم + رفع صورة شعار + رابط موقع (اختياري)
- في الموقع: عرض الصورة بدل الأيقونة النصية
- لو ما في صورة: نرجع للأيقونة النصية (fallback)

---

## 3️⃣ مشكلة: محرر النقاط (Hotspots) لكل شيء

### الحالي:
- Hotspots شغّال للغرف الداخلية فقط (furniture)

### الرؤية:
كل عنصر بصري في الموقع يقدر يكون له نقاط:
1. **إطارات الفيديو الرئيسي** — نقاط على كل frame
2. **الغرف الداخلية** — نقاط أثاث (موجود)
3. **صور قبل/بعد** — نقاط على الصور
4. **صور المعارض** — نقاط على صور المعرض

### البنية المقترحة:
```javascript
hotspots: {
  // نقاط على إطارات الفيديو
  sequence: {
    'frame15': [{x:45, y:30, type:'info', title:'Rebar inspection', ...}],
    'frame33': [{x:20, y:50, type:'warning', title:'Pour started', ...}],
  },
  // نقاط على الغرف (موجود حالياً في furniture)
  rooms: {
    'living': [{x:62, y:66, name:'Curve Sofa', ...}],
  },
  // نقاط على قبل/بعد
  beforeAfter: {
    'design': [{x:30, y:45, title:'Blueprint detail', ...}],
  }
}
```

---

## 4️⃣ مشكلة: إدارة المشاريع لا تعمل

### المشكلة:
- `pmAdd()` يضيف مشروع لكن الصور لا تُرفع
- `saveProject()` يحفظ بيانات نصية لكن ليس الصور
- التبويبات الداخلية قد لا تُحدّث عند تبديل المشاريع

### السبب:
1. مش كل الحقول مربوطة بالـ DOM
2. `pmEdit()` بملأ بعض الحقول بس مش كلها
3. الصور تحتاج Supabase Storage (لم يتم تشغيل الـ SQL بعد)

### الحل:
- ربط كل الحقول بـ `getElementById` آمن
- `pmEdit()` لازم يملأ كل التبويبات + يبنيها من جديد
- رفع الصور عبر `AURA_DB.uploadImage()` (يحتاج Supabase Storage مفعّل)

---

## 5️⃣ الرؤية الكاملة للفيديو الرئيسي

### الفكرة:
```
الفيديو = صور متتابعة (97 frame)
         ├── مقسمة لمراحل (7 stages)
         │   ├── Excavation: frames 1-16
         │   ├── Foundation: frames 17-32
         │   ├── Structure: frames 33-48
         │   ├── Shell: frames 49-64
         │   ├── Facade: frames 65-80
         │   ├── Complete: frames 81-96
         │   └── Night: frame 97
         │
         └── كل مرحلة لها:
             ├── صورها الخاصة (gallery)
             ├── وصف + ملاحظات
             └── نقاط توقف (pause points)
                 └── كل نقطة توقف لها:
                     ├── صفحة منبثقة
                     ├── صور إضافية
                     └── شرح (عربي + إنجليزي)
```

### البنية المقترحة في cms.js:
```javascript
stages: [
  {
    id: 'excavation',
    name: {ar:'الحفر', en:'Excavation'},
    from: 1, to: 16,
    color: '#b08d5f',
    icon: '◧',
    desc: {ar:'...', en:'...'},
    gallery: [
      {url: 'assets/gallery/excavation-01.webp', caption: {ar:'...', en:'...'}},
      ...
    ],
    notes: [
      {week:'W01', text:{ar:'...', en:'...'}},
      ...
    ],
    // جديد: نقاط توقف مخصصة
    pausePoints: [
      {
        frame: 5,           // عند الإطار 5
        title: {ar:'بداية الحفر', en:'Excavation start'},
        desc: {ar:'شرح تفصيلي...', en:'Detailed explanation...'},
        images: ['url1', 'url2'],  // صور إضافية
        bullets: [{ar:'...', en:'...'}],  // نقاط معلومات
        widget: 'progress'   // أي ويدجت يظهر
      },
      {
        frame: 12,
        title: {ar:'اكتمال الحفر', en:'Excavation complete'},
        ...
      }
    ]
  },
  ...
]
```

### كيف يعمل في الموقع:
1. الفيديو يشتغل تلقائياً (صور متتابعة)
2. عند الوصول لـ `pausePoint.frame`:
   - الفيديو يتوقف
   - يظهر overlay widget (الويدجت المرتبطة)
   - لو ضغط العميل → صفحة منبثقة بصور + شرح
3. بعد 5 ثواني (أو ضغط العميل) → يكمّل للنقطة التالية

### في الـ Admin:
```
إدارة المشاريع → المراحل → اختيار مرحلة
├── البيانات الأساسية (اسم، نطاق، لون)
├── المعرض (صور المرحلة)
├── الملاحظات (أسبوع + نص)
└── نقاط التوقف (جديد)
    ├── عند الإطار #: ___
    ├── العنوان: ___
    ├── الوصف: ___
    ├── الصور: [رفع/إضافة]
    ├── النقاط: [إضافة]
    └── الويدجت المرتبطة: [اختيار]
```

---

## 6️⃣ الرؤية: كل ويدجت له صور متتابعة

### الفكرة:
كل ويدجت (8 ويدجت) يكون عندها "فيلم مصغر" خاص بها:
```
Progress widget → gallery: [frame1, frame2, frame3, ...]
                   ↓
                 auto-play كل 3.5 ثانية
                   ↓
                 العميل يقدر يوقف ويتحكم
```

### البنية:
```javascript
widgets: {
  progress: {
    title: {ar:'التقدّم', en:'Progress'},
    // موجودة حالياً:
    desc: {...},
    bullets: [...],
    gallery: [...],  // موجود لكن ثابت
    // جديد:
    autoplay: true,
    interval: 3500,  // مللي ثانية
    sequence: [
      {url: '...', caption: {ar:'مرحلة 1', en:'Phase 1'}},
      {url: '...', caption: {ar:'مرحلة 2', en:'Phase 2'}},
      ...
    ]
  }
}
```

### في الموقع:
- لما الويدجت تظهر (overlay) → صورها تبدأ تتتابع تلقائياً
- لو العميل فتح الصفحة التفصيلية → الصور تتتابع في الـ modal

### في الـ Admin:
```
الويدجات → اختيار ويدجت
├── البيانات (عنوان، وصف، نقاط)
├── المعرض (صور ثابتة — موجود)
└── التسلسل (جديد)
    ├── رفع/إضافة صور
    ├── ترتيب (سحب)
    ├── سرعة التتابع (ثوانٍ)
    └── شرح كل صورة
```

---

## 7️⃣ المعمارية الكاملة المقترحة

### البيانات في Supabase:
```sql
-- جدول المشاريع (كل مشروع = صف JSON كامل)
projects: {
  id, data (JSONB), is_default, sort_order
}

-- جدول المحتوى العام
site_content: {
  id='main', data (JSONB)
}

-- جدول الطلبات
inquiries: {
  id, name, phone, company, message, status, created_at
}

-- جدول الصور (للرفع)
images: {
  id, project_id, type, url, metadata (JSONB)
}

-- Storage bucket
aura-images/ (لرفع الصور الفعلية)
```

### بنية JSON للمشروع:
```javascript
{
  id: 'villa-solara',
  cover: 'url',
  status: 'completed',
  
  // بيانات أساسية
  project: {title, location, area, year, status, progress},
  brand: {name, accent, tagline},
  ui: {glassOpacity, blur, radius, glow},
  scroll: {framesPerScroll, smoothness, ...},
  playback: {fpsExt, fpsInt, pauseExplore, pauseRoom, autoplay},
  
  // التسلسل الرئيسي
  sequence: {path, prefix, digits, ext, count},
  
  // المراحل (مع نقاط التوقف الجديدة)
  stages: [
    {
      id, name, ar, from, to, color, icon, desc,
      gallery: [{url, caption}],
      notes: [{week, text}],
      pausePoints: [
        {frame, title, desc, images, bullets, widget}
      ]
    }
  ],
  
  // الداخلي
  interior: {
    theme, themes, rooms, furniture
  },
  
  // الويدجات (مع التسلسل الجديد)
  widgets: {
    progress: {
      title, titleAr, kicker, desc, descAr,
      gallery: [],
      bullets: [],
      // جديد:
      sequence: [{url, caption}],
      autoplay: true,
      interval: 3500
    },
    ...
  },
  
  // قبل/بعد
  beforeAfter: [
    {id, label, labelAr, before, after}
  ],
  
  // النقاط (موسّع)
  hotspots: {
    sequence: {'frame15': [...]},
    rooms: {'living': [...]},
    beforeAfter: {'design': [...]}
  },
  
  // التواصل
  contact: {company, phone, whatsapp, email, ...}
}
```

### بنية الـ Admin:
```
البنال الجديد:

1. إدارة المشاريع
   ├── قائمة المشاريع (إضافة/حذف/ترتيب)
   └── تبويبات لكل مشروع:
       ├── البيانات (identity + cover + status)
       ├── المراحل (مع نقاط التوقف + المعرض + الملاحظات)
       ├── التسلسل (97 frame + رفع + ترتيب)
       ├── الداخلي (غرف + أثاث + ثيمات)
       └── تواصل (واتساب + إيميل + هاتف)

2. الويدجات
   └── لكل ويدجت:
       ├── المحتوى (عنوان + وصف + نقاط)
       ├── المعرض (صور ثابتة)
       └── التسلسل (صور متتابعة + سرعة + شرح)

3. قبل/بعد (لكل مشروع)

4. محرر النقاط (لكل شيء)
   ├── نقاط على إطارات الفيديو
   ├── نقاط على الغرف
   └── نقاط على قبل/بعد

5. إعدادات الموقع
   ├── المحتوى (هيرو + من نحن + عملاء بصور)
   ├── سرعة الفيديو
   ├── تخصيص الواجهة
   └── الطلبات

6. المواد
```

---

## 8️⃣ خطة التنفيذ (مرحلة بمرحلة)

### المرحلة 1: إصلاح الأخطاء الحالية
- [ ] إصلاح sync بين admin و site (storage event)
- [ ] إصلاح إدارة المشاريع (pmEdit يملأ كل الحقول)
- [ ] إضافة صور للعملاء (رفع + عرض)
- [ ] سرعة الفيديو تنعكس على الموقع فوراً

### المرحلة 2: نقاط التوقف (Pause Points)
- [ ] إضافة `pausePoints` لكل مرحلة في cms.js
- [ ] محرر نقاط التوقف في admin (لكل مرحلة)
- [ ] في الموقع: توقف عند الـ frame + صفحة منبثقة
- [ ] كل نقطة: صور + شرح + نقاط معلومات

### المرحلة 3: الويدجات بالتسلسل
- [ ] إضافة `sequence` لكل ويدجت في cms.js
- [ ] محرر التسلسل في admin (رفع + ترتيب + سرعة)
- [ ] في الموقع: auto-play للصور في الـ overlay + الـ modal

### المرحلة 4: محرر النقاط الشامل
- [ ] نقاط على إطارات الفيديو
- [ ] نقاط على قبل/بعد
- [ ] نقاط على صور المعرض
- [ ] الواجهة الموحدة لمحرر النقاط

### المرحلة 5: Supabase كامل
- [ ] تشغيل SQL في Supabase Dashboard
- [ ] ربط كل البيانات (مش بس الطلبات)
- [ ] رفع كل الصور على Storage
- [ ] مزامنة بين admin و site عبر Supabase

---

## 9️⃣ تحديات تقنية وحلولها

### التحدي 1: حجم البيانات في localStorage
**المشكلة:** 97 صورة Base64 × 200KB = 19MB — يتجاوز حد localStorage
**الحل:** Supabase Storage (URL بدل Base64)

### التحدي 2: المزامنة بين admin و site
**المشكلة:** admin و site صفحتان منفصلتان
**الحل:** 
1. قصير المدى: `storage` event + BroadcastChannel
2. طويل المدى: Supabase realtime subscriptions

### التحدي 3: رفع 97 صورة تسلسل
**المشكلة:** كل صورة ~30KB WebP، المجموع ~3MB
**الحل:** 
1. رفع على Supabase Storage (URL لكل صورة)
2. أو إبقاؤها في `/assets/seq/` (لو المشاريع بنفس التسلسل)

### التحدي 4: محرر النقاط على الفيديو
**المشكلة:** الفيديو canvas، مش img — صعب وضع نقاط
**الحل:** 
- overlay div فوق الـ canvas
- النقاط موضعية بالنسبة للـ canvas (نسب مئوية)
- تظهر عند frame معين وتختفي

---

## 🔟 ملخص الأولويات

| الأولوية | المهمة | المدة التقديرية |
|---|---|---|
| 🔴 1 | إصلاح sync (سرعة + عملاء + محتوى) | ساعة |
| 🔴 2 | إصلاح إدارة المشاريع (إضافة + صور) | ساعة |
| 🟡 3 | صور العملاء (رفع + عرض) | نصف ساعة |
| 🟡 4 | نقاط التوقف (بنية + admin + site) | 3 ساعات |
| 🟡 5 | ويدجت بالتسلسل (بنية + admin + site) | 2 ساعة |
| 🟢 6 | محرر النقاط الشامل | 2 ساعة |
| 🟢 7 | Supabase كامل | ساعة |
