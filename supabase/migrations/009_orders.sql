-- Orders for shop flow (cart -> checkout -> confirmation)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  city TEXT DEFAULT '',
  state TEXT DEFAULT '',
  country TEXT DEFAULT 'Nigeria',
  items JSONB NOT NULL DEFAULT '[]',
  subtotal INT NOT NULL DEFAULT 0,
  shipping INT NOT NULL DEFAULT 0,
  total INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','shipped','delivered','cancelled')),
  payment_ref TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Anyone can create an order (public checkout)
CREATE POLICY "Public create orders" ON orders FOR INSERT WITH CHECK (true);
-- Anyone can read their own order by id (for confirmation) - allow all selects for now, restrict via app
CREATE POLICY "Public read orders" ON orders FOR SELECT USING (true);
-- Admin full access
CREATE POLICY "Admin full access orders" ON orders FOR ALL USING (auth.jwt()->'user_metadata'->>'role' = 'admin') WITH CHECK (auth.jwt()->'user_metadata'->>'role' = 'admin');

CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
