-- Plan personalizado generado por IA en el onboarding adaptativo
-- La IA Maestra crea un checklist de primeros pasos según la meta del usuario

CREATE TABLE IF NOT EXISTS planes_onboarding (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id  UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  meta        TEXT NOT NULL,
  pasos       JSONB NOT NULL DEFAULT '[]',
  resumen     TEXT,
  progreso    JSONB NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (usuario_id)
);

CREATE INDEX IF NOT EXISTS idx_planes_onboarding_usuario ON planes_onboarding(usuario_id);

ALTER TABLE planes_onboarding ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios ven su propio plan" ON planes_onboarding
  FOR SELECT USING (
    usuario_id IN (SELECT id FROM usuarios WHERE auth_user_id = auth.uid())
  );
