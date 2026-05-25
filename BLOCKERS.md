# Blockers de Emergencia

Fecha: 2026-05-25

## 1) Supabase Auth SMTP / confirmacion de email (manual dashboard)

Accion manual pendiente en Supabase Dashboard:

1. Authentication -> Settings.
2. Si "Enable email confirmations" esta ON y no hay SMTP operativo:
   - desactivar temporalmente para no bloquear registro en produccion.
3. Configurar:
   - Site URL: `https://blindadousa.com`
   - Redirect URLs:
     - `https://blindadousa.com/bienvenido`
     - `https://blindadousa.com/nueva-contrasena`
     - `https://blindadousa.com/dashboard`

Sin acceso al dashboard desde este entorno no se puede aplicar automaticamente.

## 2) Verificacion de variables en Vercel (manual dashboard)

Validar en Vercel Production:

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_BASE_URL`

Sin acceso directo al dashboard, queda como paso manual de operacion.
