-- ============================================
-- Sonicbase Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Artists table
CREATE TABLE IF NOT EXISTS artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  city TEXT DEFAULT '',
  genre TEXT DEFAULT '',
  image TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  statement TEXT DEFAULT '',
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Active','Pending','Draft','Archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Releases table
CREATE TABLE IF NOT EXISTS releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  artist_id UUID REFERENCES artists(id) ON DELETE SET NULL,
  type TEXT DEFAULT 'Single' CHECK (type IN ('Album','EP','Single')),
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft','Pending','Published','Processing','Distributed','Failed','Scheduled','Archived')),
  streams INT DEFAULT 0,
  revenue INT DEFAULT 0,
  release_date DATE DEFAULT CURRENT_DATE,
  cover TEXT DEFAULT '',
  description TEXT DEFAULT '',
  tracks TEXT[] DEFAULT '{}',
  platform_breakdown JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Distribution table
CREATE TABLE IF NOT EXISTS distributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES artists(id) ON DELETE SET NULL,
  release_id UUID REFERENCES releases(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft','Processing','Distributed','Requires action','Failed')),
  platforms TEXT[] DEFAULT '{}',
  submitted DATE,
  released DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Contracts table
CREATE TABLE IF NOT EXISTS contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES artists(id) ON DELETE SET NULL,
  type TEXT DEFAULT '',
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Active','Pending signature','Expiring','Draft','Archived','Expired')),
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE DEFAULT CURRENT_DATE,
  last_updated DATE DEFAULT CURRENT_DATE,
  admin TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Legal matters table
CREATE TABLE IF NOT EXISTS legal_matters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter TEXT NOT NULL,
  artist_id UUID REFERENCES artists(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'Open' CHECK (status IN ('Open','In review','Awaiting document','Resolved','Closed')),
  deadline DATE DEFAULT CURRENT_DATE,
  assigned TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Merchandise table
CREATE TABLE IF NOT EXISTS merchandise (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  artist_id UUID REFERENCES artists(id) ON DELETE SET NULL,
  price INT DEFAULT 0,
  description TEXT DEFAULT '',
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Published','Draft','Archived')),
  image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- News table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Feature',
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Published','Draft','Scheduled','Archived')),
  author TEXT DEFAULT '',
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS policies
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_matters ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchandise ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Admin full access, artists read-only on their own data
CREATE POLICY "Admin full access" ON artists FOR ALL USING (auth.jwt()->'app_metadata'->>'role' = 'admin');
CREATE POLICY "Artist read own" ON artists FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Admin full access" ON releases FOR ALL USING (auth.jwt()->'app_metadata'->>'role' = 'admin');
CREATE POLICY "Artist read own" ON releases FOR SELECT USING (artist_id IN (SELECT id FROM artists WHERE email = auth.email()));

CREATE POLICY "Admin full access" ON distributions FOR ALL USING (auth.jwt()->'app_metadata'->>'role' = 'admin');
CREATE POLICY "Artist read own" ON distributions FOR SELECT USING (artist_id IN (SELECT id FROM artists WHERE email = auth.email()));

CREATE POLICY "Admin full access" ON contracts FOR ALL USING (auth.jwt()->'app_metadata'->>'role' = 'admin');
CREATE POLICY "Artist read own" ON contracts FOR SELECT USING (artist_id IN (SELECT id FROM artists WHERE email = auth.email()));

CREATE POLICY "Admin full access" ON legal_matters FOR ALL USING (auth.jwt()->'app_metadata'->>'role' = 'admin');
CREATE POLICY "Artist read own" ON legal_matters FOR SELECT USING (artist_id IN (SELECT id FROM artists WHERE email = auth.email()));

CREATE POLICY "Admin full access" ON merchandise FOR ALL USING (auth.jwt()->'app_metadata'->>'role' = 'admin');
CREATE POLICY "Public read published" ON merchandise FOR SELECT USING (status = 'Published');

CREATE POLICY "Admin full access" ON news FOR ALL USING (auth.jwt()->'app_metadata'->>'role' = 'admin');
CREATE POLICY "Public read published" ON news FOR SELECT USING (status = 'Published');

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Admin upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.jwt()->'app_metadata'->>'role' = 'admin');
CREATE POLICY "Admin update images" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.jwt()->'app_metadata'->>'role' = 'admin');
CREATE POLICY "Admin delete images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.jwt()->'app_metadata'->>'role' = 'admin');
