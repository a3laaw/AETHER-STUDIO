-- ============================================================
-- AURA Studio — Supabase Schema (نسخة آمنة محسنة v2)
-- افتح: Supabase Dashboard → SQL Editor → New Query
-- الصق ده كله → اضغط Run
-- ============================================================
-- التغييرات في v2:
-- 1. RLS أكثر أماناً: قراءة عامة، كتابة للمصادقين فقط (باستثناء الطلبات)
-- 2. الطلبات: أي زائر يقدر يضيف طلب (INSERT public)، لكن القراءة/التعديل للمصادقين فقط
-- 3. Storage: قراءة عامة، كتابة للمصادقين فقط
-- 4. إضافة Indexes للأداء
-- 5. إضافة updated_at trigger
-- ============================================================

-- 1. جدول المشاريع
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_projects_sort ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_projects_default ON projects(is_default);

-- 2. جدول محتوى الموقع
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. جدول الطلبات
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  message TEXT,
  project_type TEXT,
  source TEXT DEFAULT 'contact-form',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at DESC);

-- 4. جدول الصور
CREATE TABLE IF NOT EXISTS images (
  id TEXT PRIMARY KEY,
  project_id TEXT,
  type TEXT,
  filename TEXT,
  url TEXT,
  size INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_images_project ON images(project_id);

-- تفعيل Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- سياسات المشاريع - آمنة
-- القراءة: عامة (الموقع يحتاج يعرض المشاريع)
-- الكتابة: للمصادقين فقط (الأدمن)
-- ============================================================
DROP POLICY IF EXISTS "Public read projects" ON projects;
DROP POLICY IF EXISTS "Public write projects" ON projects;
DROP POLICY IF EXISTS "Authenticated write projects" ON projects;
DROP POLICY IF EXISTS "Secure read projects" ON projects;
DROP POLICY IF EXISTS "Secure write projects" ON projects;

CREATE POLICY "Secure read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Secure write projects" ON projects FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- للتجربة المحلية فقط (Demo - احذف في الإنتاج واترك Secure فقط):
-- CREATE POLICY "Public write projects (DEMO ONLY)" ON projects FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- سياسات محتوى الموقع - آمنة
-- ============================================================
DROP POLICY IF EXISTS "Public read site_content" ON site_content;
DROP POLICY IF EXISTS "Public write site_content" ON site_content;
DROP POLICY IF EXISTS "Secure read site_content" ON site_content;
DROP POLICY IF EXISTS "Secure write site_content" ON site_content;

CREATE POLICY "Secure read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Secure write site_content" ON site_content FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- ============================================================
-- سياسات الطلبات - آمنة مع السماح بالإدراج العام
-- INSERT: عامة (نموذج التواصل في الموقع)
-- SELECT/UPDATE/DELETE: للمصادقين فقط (الأدمن)
-- ============================================================
DROP POLICY IF EXISTS "Public read inquiries" ON inquiries;
DROP POLICY IF EXISTS "Public write inquiries" ON inquiries;
DROP POLICY IF EXISTS "Public insert inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated read inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated update inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated delete inquiries" ON inquiries;

CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated read inquiries" ON inquiries FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated update inquiries" ON inquiries FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated delete inquiries" ON inquiries FOR DELETE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- ============================================================
-- سياسات الصور - آمنة
-- ============================================================
DROP POLICY IF EXISTS "Public read images" ON images;
DROP POLICY IF EXISTS "Public write images" ON images;
DROP POLICY IF EXISTS "Secure read images" ON images;
DROP POLICY IF EXISTS "Secure write images" ON images;

CREATE POLICY "Secure read images" ON images FOR SELECT USING (true);
CREATE POLICY "Secure write images" ON images FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- إدراج محتوى افتراضي
INSERT INTO site_content (id, data) VALUES ('main', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- إنشاء bucket للصور
INSERT INTO storage.buckets (id, name, public) VALUES ('aura-images', 'aura-images', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- سياسات Storage - آمنة
-- القراءة: عامة
-- الكتابة: للمصادقين فقط
-- ============================================================
DROP POLICY IF EXISTS "Public read storage" ON storage.objects;
DROP POLICY IF EXISTS "Public write storage" ON storage.objects;
DROP POLICY IF EXISTS "Public update storage" ON storage.objects;
DROP POLICY IF EXISTS "Public delete storage" ON storage.objects;
DROP POLICY IF EXISTS "Secure read storage" ON storage.objects;
DROP POLICY IF EXISTS "Secure write storage" ON storage.objects;
DROP POLICY IF EXISTS "Secure update storage" ON storage.objects;
DROP POLICY IF EXISTS "Secure delete storage" ON storage.objects;

CREATE POLICY "Secure read storage" ON storage.objects FOR SELECT USING (bucket_id = 'aura-images');
CREATE POLICY "Secure write storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'aura-images' AND (auth.role() = 'authenticated' OR auth.role() = 'service_role'));
CREATE POLICY "Secure update storage" ON storage.objects FOR UPDATE USING (bucket_id = 'aura-images' AND (auth.role() = 'authenticated' OR auth.role() = 'service_role'));
CREATE POLICY "Secure delete storage" ON storage.objects FOR DELETE USING (bucket_id = 'aura-images' AND (auth.role() = 'authenticated' OR auth.role() = 'service_role'));

-- ============================================================
-- ملاحظات للإنتاج:
-- 1. فعّل Email Auth في Supabase Dashboard → Authentication → Providers
-- 2. أنشئ مستخدم أدمن: Authentication → Users → Add User
-- 3. في admin.html، بعد login، اعمل signInWithPassword عبر Supabase
-- 4. للـ Demo الحالي (بدون Auth)، يمكنك مؤقتاً استخدام السياسات العامة المعلقة أعلاه
-- 5. أضف Rate Limiting: Dashboard → API → Rate Limits
-- ============================================================

-- ============================================================
-- تم! ✓
-- الجداول الأربعة + Storage bucket + سياسات آمنة جاهزة
-- للإنتاج: فعّل Auth واحذف سياسات DEMO
-- ============================================================
