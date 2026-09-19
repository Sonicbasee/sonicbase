-- Fix infinite recursion between releases and release_artists
-- releases Artist policy was querying release_artists which queries releases → loop

DROP POLICY IF EXISTS "Artist read own" ON releases;
CREATE POLICY "Artist read own" ON releases FOR SELECT USING (
  artist_id IN (SELECT id FROM artists WHERE email = auth.email())
);

-- Make release_artists public readable without recursion
DROP POLICY IF EXISTS "Public read published releases artists" ON release_artists;
DROP POLICY IF EXISTS "Artist read own release artists" ON release_artists;

CREATE POLICY "Public read release artists" ON release_artists FOR SELECT USING (true);
CREATE POLICY "Artist read own release artists" ON release_artists FOR SELECT USING (
  artist_id IN (SELECT id FROM artists WHERE email = auth.email())
);
