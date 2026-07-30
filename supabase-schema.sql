-- ============================================================
-- AURA Studio — Supabase Schema (نسخة آمنة كاملة)
-- افتح: Supabase Dashboard → SQL Editor → New Query
-- الصق ده كله → اضغط Run
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

-- تفعيل Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- سياسات المشاريع (حذف آمن لو موجودة قبل كده)
DROP POLICY IF EXISTS "Public read projects" ON projects;
DROP POLICY IF EXISTS "Public write projects" ON projects;
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public write projects" ON projects FOR ALL USING (true);

-- سياسات محتوى الموقع
DROP POLICY IF EXISTS "Public read site_content" ON site_content;
DROP POLICY IF EXISTS "Public write site_content" ON site_content;
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public write site_content" ON site_content FOR ALL USING (true);

-- سياسات الطلبات
DROP POLICY IF EXISTS "Public read inquiries" ON inquiries;
DROP POLICY IF EXISTS "Public write inquiries" ON inquiries;
CREATE POLICY "Public read inquiries" ON inquiries FOR SELECT USING (true);
CREATE POLICY "Public write inquiries" ON inquiries FOR ALL USING (true);

-- سياسات الصور
DROP POLICY IF EXISTS "Public read images" ON images;
DROP POLICY IF EXISTS "Public write images" ON images;
CREATE POLICY "Public read images" ON images FOR SELECT USING (true);
CREATE POLICY "Public write images" ON images FOR ALL USING (true);

-- إدراج محتوى افتراضي
INSERT INTO site_content (id, data) VALUES ('main', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- إنشاء bucket للصور
INSERT INTO storage.buckets (id, name, public) VALUES ('aura-images', 'aura-images', true)
ON CONFLICT (id) DO NOTHING;

-- سياسات Storage (حذف آمن لو موجودة)
DROP POLICY IF EXISTS "Public read storage" ON storage.objects;
DROP POLICY IF EXISTS "Public write storage" ON storage.objects;
DROP POLICY IF EXISTS "Public update storage" ON storage.objects;
DROP POLICY IF EXISTS "Public delete storage" ON storage.objects;

CREATE POLICY "Public read storage" ON storage.objects FOR SELECT USING (bucket_id = 'aura-images');
CREATE POLICY "Public write storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'aura-images');
CREATE POLICY "Public update storage" ON storage.objects FOR UPDATE USING (bucket_id = 'aura-images');
CREATE POLICY "Public delete storage" ON storage.objects FOR DELETE USING (bucket_id = 'aura-images');

-- ============================================================
-- تم! ✓
-- الجداول الأربعة + Storage bucket جاهزة
-- ============================================================
