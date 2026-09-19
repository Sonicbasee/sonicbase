-- Multi-artist support for releases (features, collaborations, lead/main)
-- Keeps releases.artist_id as primary/legacy for backwards compatibility

CREATE TABLE IF NOT EXISTS release_artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  release_id UUID NOT NULL REFERENCES releases(id) ON DELETE CASCADE,
  artist_id UUID NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'Main Artist' CHECK (role IN ('Main Artist','Lead Artist','Featured','Collaborator','Producer')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (release_id, artist_id, role)
);

-- Backfill existing releases into junction table as Main Artist
INSERT INTO release_artists (release_id, artist_id, role)
SELECT id, artist_id, 'Main Artist'
FROM releases
WHERE artist_id IS NOT NULL
ON CONFLICT (release_id, artist_id, role) DO NOTHING;

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_release_artists_release ON release_artists(release_id);
CREATE INDEX IF NOT EXISTS idx_release_artists_artist ON release_artists(artist_id);

-- RLS
ALTER TABLE release_artists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access" ON release_artists FOR ALL USING (auth.jwt()->'user_metadata'->>'role' = 'admin');
CREATE POLICY "Public read published releases artists" ON release_artists FOR SELECT USING (
  EXISTS (SELECT 1 FROM releases r WHERE r.id = release_id AND r.status = 'Published')
);
CREATE POLICY "Artist read own release artists" ON release_artists FOR SELECT USING (
  artist_id IN (SELECT id FROM artists WHERE email = auth.email())
  OR release_id IN (SELECT release_id FROM release_artists WHERE artist_id IN (SELECT id FROM artists WHERE email = auth.email()))
);
