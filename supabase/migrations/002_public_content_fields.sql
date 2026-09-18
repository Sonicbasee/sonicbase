-- Public-facing content fields managed from the admin dashboard.
ALTER TABLE artists
  ADD COLUMN IF NOT EXISTS spotify_url TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS apple_music_url TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS instagram_url TEXT DEFAULT '';

ALTER TABLE releases
  ADD COLUMN IF NOT EXISTS listen_url TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS watch_url TEXT DEFAULT '';
