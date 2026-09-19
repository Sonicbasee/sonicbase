-- Add Flutterwave fields to orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS flutterwave_tx_id TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS flutterwave_ref TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'flutterwave';
