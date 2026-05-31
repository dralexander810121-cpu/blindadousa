-- Agente Financiero Autónomo: planes multi-paso con seguimiento de progreso
CREATE TABLE IF NOT EXISTS agente_planes (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id  UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  meta        TEXT NOT NULL,
  horizonte   TEXT,
  resumen     TEXT,
  pasos       JSONB NOT NULL DEFAULT '[]',
  estado      TEXT NOT NULL DEFAULT 'activo',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (usuario_id)
);

CREATE INDEX IF NOT EXISTS idx_agente_planes_usuario ON agente_planes(usuario_id);

ALTER TABLE agente_planes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios ven su propio plan agente" ON agente_planes
  FOR SELECT USING (
    usuario_id IN (SELECT id FROM usuarios WHERE auth_user_id = auth.uid())
  );
