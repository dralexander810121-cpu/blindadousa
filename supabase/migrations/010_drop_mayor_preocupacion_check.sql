-- The check constraint was auto-created by an earlier Supabase AI migration and
-- restricts mayor_preocupacion to a hardcoded list that no longer matches the UI.
-- Drop it so any free-text value is accepted (the column stays TEXT).
ALTER TABLE perfil_financiero
  DROP CONSTRAINT IF EXISTS perfil_financiero_mayor_preocupacion_check;
