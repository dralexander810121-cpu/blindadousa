# Blockers de lanzamiento — CEO checklist

Actualizado: operaciones que **no** se resuelven solo con código.

## Hecho en código (no repetir)

- Auth callback, trial, pagos, webhook script, copy honesto, stubs crédito → IA Maestra, grid 13 módulos alineado.

## Tú — 15 minutos en dashboards

### 1. Supabase Auth
- Site URL: `https://blindadousa.com`
- Redirect URLs: ver `SETUP-SUPABASE-AUTH.md` (incluye `/auth/callback`)
- Si el registro se traba: desactivar “Enable email confirmations” hasta tener SMTP, o configurar SMTP.

### 2. SQL en Supabase (SQL Editor)
Ejecutar contenido de `supabase/migrations/004_usuarios_stripe_subscription.sql`:

```sql
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
CREATE INDEX IF NOT EXISTS idx_usuarios_stripe_sub ON usuarios(stripe_subscription_id);
```

### 3. Vercel Production — env vars
| Variable | Obligatorio |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_*` + `SUPABASE_SERVICE_ROLE_KEY` | Sí |
| `GEMINI_API_KEY` o `ANTHROPIC_API_KEY` | Sí (IA) |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, publishable | Sí (pagos) |
| `ADMIN_EMAILS` | Sí (aprobar directorio B2B) |
| `PLAID_*` | Recomendado (home + tarjetas + referidos ACH) |
| `TWILIO_*` | Opcional (WhatsApp) |

### 4. Stripe
- Webhook: `https://blindadousa.com/api/stripe/webhook`
- Eventos: checkout.session.completed, customer.subscription.*, invoice.payment_failed
- Rotar secret key si se expuso en chat.

### 5. Smoke test humano
1. `/trial` → `/bienvenido` → dashboard  
2. IA Maestra responde  
3. `/pagar` mismo email → Stripe → `/pagar/exito` → dashboard con acceso  
4. `/dashboard/configuracion` → portal Stripe (tras pago)

---

Sin pasos 1–4 el producto **se ve** bien pero **no convierte** trial → pago → retención con datos reales.
