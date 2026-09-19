-- Monthly revenue per release/artist
CREATE TABLE IF NOT EXISTS revenue_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  release_id UUID REFERENCES releases(id) ON DELETE CASCADE,
  amount INT NOT NULL DEFAULT 0,
  streams INT NOT NULL DEFAULT 0,
  month DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (artist_id, release_id, month)
);

ALTER TABLE revenue_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access revenue" ON revenue_entries FOR ALL
  USING (auth.jwt()->'user_metadata'->>'role' = 'admin')
  WITH CHECK (auth.jwt()->'user_metadata'->>'role' = 'admin');

CREATE POLICY "Artist read own revenue" ON revenue_entries FOR SELECT USING (
  artist_id IN (SELECT id FROM artists WHERE email = auth.email())
);

CREATE INDEX IF NOT EXISTS idx_revenue_artist ON revenue_entries(artist_id);
CREATE INDEX IF NOT EXISTS idx_revenue_release ON revenue_entries(release_id);
CREATE INDEX IF NOT EXISTS idx_revenue_month ON revenue_entries(month);
