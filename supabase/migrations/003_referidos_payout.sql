-- Comisiones de referidos ($5 ACH vía Plaid cuando esté configurado)

ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS ganancias_referidos DECIMAL(8,2) DEFAULT 0;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS cuenta_pago_plaid_id TEXT;

ALTER TABLE referidos ADD COLUMN IF NOT EXISTS monto_comision DECIMAL(6,2) DEFAULT 5;
ALTER TABLE referidos ADD COLUMN IF NOT EXISTS transferencia_estado TEXT DEFAULT 'pendiente';
ALTER TABLE referidos ADD COLUMN IF NOT EXISTS plaid_transfer_id TEXT;
ALTER TABLE referidos ADD COLUMN IF NOT EXISTS referido_nombre TEXT;
ALTER TABLE referidos ADD COLUMN IF NOT EXISTS error_transferencia TEXT;
ALTER TABLE referidos ADD COLUMN IF NOT EXISTS pagado_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_referidos_referidor ON referidos(referidor_id);
CREATE INDEX IF NOT EXISTS idx_directorio_pendiente ON directorio_negocios(verificado, activo);
