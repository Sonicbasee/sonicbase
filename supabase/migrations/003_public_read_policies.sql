-- Allow the public site to read only content intended for publication.
CREATE POLICY "Public read active artists" ON artists
  FOR SELECT USING (status = 'Active');

CREATE POLICY "Public read published releases" ON releases
  FOR SELECT USING (status = 'Published');
