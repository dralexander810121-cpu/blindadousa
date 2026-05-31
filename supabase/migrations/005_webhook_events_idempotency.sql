-- Tabla de idempotencia para webhooks de pago
-- Evita que PayPal/LemonSqueezy procesen el mismo evento dos veces

CREATE TABLE IF NOT EXISTS webhook_events (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id    TEXT NOT NULL,
  provider    TEXT NOT NULL CHECK (provider IN ('paypal', 'lemonsqueezy', 'stripe', 'klarna')),
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (event_id, provider)
);

CREATE INDEX IF NOT EXISTS idx_webhook_events_lookup ON webhook_events(event_id, provider);

-- Limpiar eventos viejos automaticamente (>90 dias)
CREATE OR REPLACE FUNCTION cleanup_old_webhook_events() RETURNS void AS $$
  DELETE FROM webhook_events WHERE processed_at < now() - INTERVAL '90 days';
$$ LANGUAGE sql;
