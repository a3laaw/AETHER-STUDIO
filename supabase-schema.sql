-- AURA Studio — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Paste → Run

-- 1. Projects table (stores all project data as JSON)
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Site content table (global site settings)
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Inquiries table (contact form submissions)
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

-- 4. Images table (for uploaded images)
CREATE TABLE IF NOT EXISTS images (
  id TEXT PRIMARY KEY,
  project_id TEXT,
  type TEXT,
  filename TEXT,
  url TEXT,
  size INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Policies: allow public read/write (adjust for production)
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public write projects" ON projects FOR ALL USING (true);
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public write site_content" ON site_content FOR ALL USING (true);
CREATE POLICY "Public read inquiries" ON inquiries FOR SELECT USING (true);
CREATE POLICY "Public write inquiries" ON inquiries FOR ALL USING (true);
CREATE POLICY "Public read images" ON images FOR SELECT USING (true);
CREATE POLICY "Public write images" ON images FOR ALL USING (true);

-- Insert default site content
INSERT INTO site_content (id, data) VALUES ('main', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('aura-images', 'aura-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public read storage" ON storage.objects FOR SELECT USING (bucket_id = 'aura-images');
CREATE POLICY "Public write storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'aura-images');
CREATE POLICY "Public update storage" ON storage.objects FOR UPDATE USING (bucket_id = 'aura-images');
CREATE POLICY "Public delete storage" ON storage.objects FOR DELETE USING (bucket_id = 'aura-images');
