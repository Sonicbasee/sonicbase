-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL CHECK (topic IN ('General','Artist submissions','Press & partnerships','Licensing request')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Admin can read all
CREATE POLICY "Admin read contact_messages" ON contact_messages FOR SELECT USING (auth.jwt()->'user_metadata'->>'role' = 'admin');
-- Anyone can insert (public contact form)
CREATE POLICY "Public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
