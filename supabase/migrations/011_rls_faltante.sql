-- Agrega políticas RLS faltantes en tablas que tienen RLS habilitado
-- pero no tenían CREATE POLICY definida.
-- Usa DO/EXCEPTION para no fallar si la política ya existe (idempotente).

DO $$ BEGIN
  CREATE POLICY "propio" ON referidos FOR ALL
    USING (
      auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = referidor_id)
      OR
      auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = referido_id)
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "propio" ON recomendaciones_pago FOR ALL
    USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "propio" ON chat_historial FOR ALL
    USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "propio" ON calculos_guardados FOR ALL
    USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "propio" ON afiliado_clicks FOR ALL
    USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- directorio_negocios: lectura pública, escritura autenticada
ALTER TABLE IF EXISTS directorio_negocios ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "lectura_publica" ON directorio_negocios FOR SELECT
    USING (activo = true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "admin_escritura" ON directorio_negocios FOR ALL
    USING (auth.uid() IS NOT NULL AND activo IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- blog_posts: lectura pública total (contenido SEO)
ALTER TABLE IF EXISTS blog_posts ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "lectura_publica" ON blog_posts FOR SELECT
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- webhook_events: solo service_role (admin), nunca cliente
ALTER TABLE IF EXISTS webhook_events ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "denegado_anon" ON webhook_events FOR ALL
    USING (false);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
