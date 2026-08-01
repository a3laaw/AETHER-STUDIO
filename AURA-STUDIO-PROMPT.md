# AURA STUDIO — Complete Prompt & Feature Documentation

## نسخ البرومبت الكامل لكل ميزات الموقع

---

## انسخ هذا البرومبت كاملاً:

```
أنت مطور Full-Stack خبير. ابنِ منصة AURA Studio — منصة توثيق وبناء متواصل لمشاريع البناء والتشطيبات.

### المفهوم الأساسي
"من أول حجر… حتى آخر غرفة — فيلم واحد متواصل لمشروعك"

الموقع عبارة عن شاشة سينمائية رئيسية تعرض بناء المشروع كتتابع صوري (Sequence). كل شيء آخر يُفتح من خلال overlays شفافة (Apple Liquid Glass) على الفيديو.

### البنية التقنية
- HTML/CSS/JS خالص (بلا framework)
- Supabase كـ backend (قاعدة بيانات + Storage للصور)
- localStorage كـ fallback
- Vercel للاستضافة (auto-deploy من GitHub)
- Arabic-first (RTL) مع تبديل للإنجليزية (LTR)

### 1. الشاشة الرئيسية (Hero)
- Canvas يعرض تتابع صور (97 إطار كافتراضي، قابل للتخصيص لكل مشروع)
- الصور تظهر متتابعة — البيت يتبني أمامك تدريجياً
- مبدّل مشاريع في الأعلى (Villa Solara + Villa Nairo + أي مشاريع جديدة)
- تبديل لغة (عربي/إنجليزي) بخلفية ذهبية واضحة
- زر "اطلب تجربة حية" (CTA ذهبي بارز)
- العنوان: "من أول حجر… حتى آخر غرفة"

### 2. Apple Liquid Glass UI
كل العناصر على الفيديو بستايل زجاج Apple السائل:
- background: rgba(255,255,255,.55)
- backdrop-filter: blur(24px) saturate(180%)
- border: rgba(255,255,255,.5)
- box-shadow: inset 0 1px 0 rgba(255,255,255,.7)
العناصر: playbar, stage caption, pause badge, widget overlay, hero eyebrow, tour button

### 3. نظام التوقفات (Pause System)
- الفيديو يتوقف تلقائياً عند **بداية كل مرحلة** (وليس عند رقم إطار محدد)
- عند التوقف: يظهر overlay widget بداخل الفيديو
- الـ overlay يورّي: أيقونة + عنوان المرحلة + وصف + القيمة + زر "عرض التفاصيل"
- بعد 5 ثواني (قابلة للتعديل) → يكمّل للمرحلة التالية
- زر "🎬 جولة كاملة" يلعب المشروع كامل من الأول للآخر

### 4. Apple Liquid Glass HUD
- **أعلى يسار:** كرت زجاجي فيه حلقة دائرية (SVG) بنسبة الإنجاز الكلية + اسم المشروع + المرحلة الحالية + رقم الإطار
- **أعلى يمين:** 7 كروت زجاجية لكل مرحلة، كل واحد فيه:
  - رقم المرحلة + الاسم
  - شريط تقدم ذهبي بيتملى live
  - حالة: مكتمل (أخضر) / حالي (ذهبي) / قادم (رمادي)
- **أسفل الفيديو:** شريط أفقي ملون (Build Timeline) — كل مرحلة = segment بلونها، ينقر للقفز

### 5. المراحل (Stages)
- 7 مراحل افتراضية: الحفر → الأساسات → الهيكل → البناء → الواجهات → الإنجاز → المشهد الليلي
- كل مرحلة لها: id, name (AR+EN), from/to (نطاق الإطارات), color, icon, desc
- **من الـ Admin:** إضافة/حذف/ترتيب المراحل بالسحب
- تعديل from/to لكل مرحلة (حقول رقمية)
- تعديل الاسم عربي + إنجليزي + اللون

### 6. الويدجات (8 Widgets)
تظهر كـ overlay عند كل توقف:
1. التقدّم (Progress) — نسبة الإنجاز
2. الإنشائي (Structural) — FEA + integrity
3. المواد (Materials) — QR-tracked
4. الجدول (Schedule) — CPM
5. التكلفة (Cost) — budget variance
6. الجودة (QA) — inspections
7. الغرف (Rooms) — 360° tour
8. قبل/بعد (Before/After) — comparison

كل ويدجت لها:
- محتوى قابل للتعديل (عنوان + وصف + نقاط)
- معرض صور (رفع من admin)
- تسلسل صور متتابعة (auto-play كل 3.5 ثانية)
- عند الضغط → مودال أبيض → "عرض التفاصيل" → صفحة كاملة

### 7. المودالات البيضاء
- خلفية: #FAFAF7 (أبيض دافئ)
- نص: #1A1A1C (أسود قريب)
- كل مودال فيه: أيقونة + عنوان + وصف + نقاط + زر "عرض التفاصيل" + زر "إغلاق"
- "عرض التفاصيل" يفتح صفحة بيضاء كاملة ببيانات تفصيلية

### 8. الصفحات التفصيلية (View Details)
- التقدّم: نسبة + إحصائيات + جدول الـ 7 مراحل
- قبل/بعد: 4 أزواج صور في grid
- الغرف: 4 كروت غرف بصور + مساحة
- الإنشائي/المواد/الجدول/التكلفة/الجودة: جداول بيانات

### 9. الأقسام تحت الفيديو (White Theme)
1. **خدماتنا:** 4 كروت (Design/Execution/Finishing/Management) — الضغط يفتح مودال
2. **من نحن:** مقدمة + رؤية + اقتباس + 3 إحصائيات + صورة
3. **عملاؤنا:** marquee auto-scroll (12 شعار، يتوقف عند hover، صور شعارات قابلة للرفع)
4. **تواصل معنا:** فورم (اسم/تليفون/شركة/رسالة) + WhatsApp مباشر + خريطة (click to interact)

### 10. لوحة التحكم (Admin Panel)
بوابة سرية: 3 clicks على شعار AURA / Ctrl+Shift+A
كلمة مرور: [hashed — ask project owner]

#### الأقسام:
1. **إدارة المشاريع** (6 تبويبات داخلية):
   - البيانات (identity + cover + status + progress + رفع صورة غلاف)
   - المراحل (add/delete/reorder + from/to + color + نقاط توقف)
   - التسلسل (رفع صور + ترتيب بالسحب + استبدال + حذف)
   - المعارض (معرض لكل مرحلة)
   - الداخلي (غرف + أثاث + ثيمات)
   - تواصل (واتساب + إيميل + هاتف لكل مشروع)
   - زر "📋 نسخ المشروع" (duplicate الهيكل بدون الصور)

2. **الويدجات:** محتوى + صور + تسلسل لكل ويدجت
3. **قبل/بعد:** 4 أزواج صور قابلة للتعديل
4. **محرر النقاط الشامل** (4 أوضاع):
   - الغرف (furniture hotspots)
   - الفيديو (نقاط على إطارات)
   - قبل/بعد (نقاط على صور BA)
   - المعارض (نقاط على صور المعرض)
5. **المواد:** مكتبة مواد
6. **إعدادات الموقع:** WhatsApp + Phone + Email + Location + Map URL + نصوص الهيرو + من نحن + العملاء (مع رفع شعارات)
7. **الطلبات:** من Supabase (filter/status/CSV export/WhatsApp direct)
8. **سرعة الفيديو:** fps + pause durations + autoplay toggle + presets
9. **تخصيص الواجهة:** accent color + glass opacity + blur + radius
10. **SEO + Analytics**

#### ميزات الـ Admin:
- زر معاينة عائم (يفتح الموقع في tab جديد)
- حفظ تلقائي كل 30 ثانية
- تحذير قبل الخروج بدون حفظ (beforeunload)
- كل التعديلات تنعكس على الموقع فوراً (storage event + polling)

### 11. كل مشروع له صوره الخاصة
- sequence.images[] — array من URLs
- رفع صور من admin → Supabase Storage (أو Base64 fallback)
- ترتيب بالسحب
- استبدال/حذف إطارات
- لو images فاضي → يستخدم النمط الافتراضي (assets/seq/frame001.webp)

### 12. Supabase Backend
- جدول projects (JSONB لكل مشروع)
- جدول site_content (محتوى الموقع العام)
- جدول inquiries (طلبات العملاء)
- جدول images (رفع الصور)
- Storage bucket: aura-images
- Smart fallback: لو Supabase مش متاح → localStorage

### 13. روابط مباشرة للمشاريع
- aether-studio-beta.vercel.app/#villa-solara
- aether-studio-beta.vercel.app/#villa-nairo

### 14. التصميم
- الثيم: أبيض/فاتح (#FAFAF7) موحد في كل الصفحة
- اللون الذهبي: #BFA76A (accent)
- الخطوط: Tajawal (عربي) + Inter (لاتيني) + Cormorant (display)
- Mobile-first responsive
- Apple Liquid Glass على كل العناصر فوق الفيديو

### 15. التزامن (Sync)
- storage event listener: لما admin يحفظ → الموقع يتحدث فوراً (عبر tabs)
- setInterval 3 ثواني: للكشف عن التغييرات في نفس الـ tab
- _lastUpdate timestamp في AURA.save()
- applyAllFromStorage(): يعيد تحميل CFG + PROJ + theme + playback + siteContent + projectBar + playbar + widgets
```

---

## ملخص الملفات:

```
aether-studio/
├── index.html          (1500+ سطر — الموقع الرئيسي)
├── admin.html          (1900+ سطر — لوحة التحكم)
├── js/
│   ├── cms.js          (560+ سطر — البيانات + i18n + store)
│   └── supabase.js     (240+ سطر — backend client)
├── assets/             (59MB صور)
├── supabase-schema.sql (SQL لإنشاء الجداول)
├── vercel.json         (إعدادات النشر)
├── README.md
├── LICENSE
└── .gitignore
```

## الإصدارات:
- v1: الموقع الأصلي (HTML static)
- v2-v2.1: Multi-project + widgets + admin
- v3-v3.3: Next.js redesign (محذوف)
- v4: Single-structure cinematic
- v5: Corporate white sections
- v6: White theme + overlay widgets + marquee + map
- v7: WhatsApp + View Details + admin settings
- v8-v8.1: Unified project manager + image upload
- v9: Supabase backend
- v10: Sync fix + project management + client logos
- v11: Pause points + widget sequences
- v12: Comprehensive hotspots + full Supabase
- v13: Per-project custom sequences
- v14: Apple Liquid Glass + progress HUD
- v14.1: Full stage management
- v15: Preview + auto-save + links + Full Tour + timeline
- v15.1: Pause at stage start (current)
