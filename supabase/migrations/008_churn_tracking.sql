-- Tracking de riesgo de abandono (churn) y emails de retención
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS churn_risk INTEGER;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS churn_checked_at TIMESTAMPTZ;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS churn_email_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_usuarios_churn ON usuarios(trial_activo, acceso_pagado, churn_email_at);
