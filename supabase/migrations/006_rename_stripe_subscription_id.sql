-- Renombrar columna stripe_subscription_id → external_subscription_id
-- Soporta todos los proveedores: PayPal, LemonSqueezy, Klarna, Stripe

ALTER TABLE usuarios
  RENAME COLUMN stripe_subscription_id TO external_subscription_id;

-- Actualizar indice
DROP INDEX IF EXISTS idx_usuarios_stripe_sub;
CREATE INDEX IF NOT EXISTS idx_usuarios_external_sub ON usuarios(external_subscription_id);
