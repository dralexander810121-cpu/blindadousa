-- Alertas WhatsApp (Twilio)
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS telefono_whatsapp TEXT;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS whatsapp_opt_in BOOLEAN DEFAULT FALSE;
