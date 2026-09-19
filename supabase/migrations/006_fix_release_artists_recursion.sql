-- Fix infinite recursion in release_artists RLS
DROP POLICY IF EXISTS "Artist read own release artists" ON release_artists;
DROP POLICY IF EXISTS "Public read published releases artists" ON release_artists;

-- Public can read artists for published releases
CREATE POLICY "Public read published releases artists" ON release_artists FOR SELECT USING (
  EXISTS (SELECT 1 FROM releases r WHERE r.id = release_id AND r.status = 'Published')
);

-- Artists can read their own release_artists rows
CREATE POLICY "Artist read own release artists" ON release_artists FOR SELECT USING (
  artist_id IN (SELECT id FROM artists WHERE email = auth.email())
);

-- Also allow artists to read releases they are featured on (via junction) — fix releases policy without recursion
DROP POLICY IF EXISTS "Artist read own" ON releases;
CREATE POLICY "Artist read own" ON releases FOR SELECT USING (
  artist_id IN (SELECT id FROM artists WHERE email = auth.email())
  OR id IN (SELECT release_id FROM release_artists WHERE artist_id IN (SELECT id FROM artists WHERE email = auth.email()))
);
