-- Fix infinite recursion on releases (public read)
DROP POLICY IF EXISTS "Artist read own" ON releases;
DROP POLICY IF EXISTS "Public read published releases" ON releases;
DROP POLICY IF EXISTS "Admin full access" ON releases;

CREATE POLICY "Admin full access" ON releases FOR ALL
  USING (auth.jwt()->'user_metadata'->>'role' = 'admin')
  WITH CHECK (auth.jwt()->'user_metadata'->>'role' = 'admin');

CREATE POLICY "Public read published releases" ON releases FOR SELECT USING (status = 'Published');

CREATE POLICY "Artist read own" ON releases FOR SELECT USING (
  artist_id IN (SELECT id FROM artists WHERE email = auth.email())
);
