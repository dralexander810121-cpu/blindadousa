-- 012_fix_directorio_rls.sql
-- Corrige un fallo de control de acceso en directorio_negocios.
--
-- En 011_rls_faltante.sql la política "admin_escritura" decía:
--   USING (auth.uid() IS NOT NULL AND activo IS NOT NULL)
-- El nombre dice "admin" pero el predicado solo exige estar LOGUEADO, por lo que
-- CUALQUIER usuario autenticado (con la anon key pública) podía insertar, editar,
-- borrar y auto-verificarse filas del directorio.
--
-- Fix: se elimina esa política. Sin política de escritura para los roles anon/authenticated,
-- RLS bloquea toda escritura desde el cliente. Las escrituras legítimas las hace el
-- backend con la SERVICE_ROLE key (que ignora RLS por diseño). La lectura pública sigue
-- funcionando vía la política "lectura_publica" (SELECT con activo = true).

DROP POLICY IF EXISTS "admin_escritura" ON directorio_negocios;

-- (Sin reemplazo permisivo: escritura = solo service_role / backend.)
-- Si en el futuro se quiere permitir que admins logueados escriban desde el cliente,
-- crear aquí una política que valide un rol/columna de admin REAL (no solo auth.uid() IS NOT NULL).
