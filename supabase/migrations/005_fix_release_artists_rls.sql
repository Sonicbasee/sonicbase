-- Fix RLS for release_artists: admin needs WITH CHECK for inserts
DROP POLICY IF EXISTS "Admin full access" ON release_artists;
CREATE POLICY "Admin full access" ON release_artists FOR ALL
  USING (auth.jwt()->'user_metadata'->>'role' = 'admin')
  WITH CHECK (auth.jwt()->'user_metadata'->>'role' = 'admin');
