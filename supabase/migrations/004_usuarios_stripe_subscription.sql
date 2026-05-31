-- Suscripción Stripe del plan principal (no confundir con directorio_negocios)
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
CREATE INDEX IF NOT EXISTS idx_usuarios_stripe_sub ON usuarios(stripe_subscription_id);
