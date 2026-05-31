# PENDIENTES — blindadousa.com

Actualizado tras pulido integral (auth, pagos, UX, copy).

## Hecho en código

- **Auth:** `/auth/callback`, recuperar → callback → `/nueva-contrasena`, trial/registro activan trial sin duplicar signup, mensajes en español.
- **Pagos:** checkout exige cuenta existente (mismo email que `/trial`), webhook enlaza usuario por email, `/pagar/exito` verifica sesión Stripe.
- **Producto:** 13 módulos en grid del dashboard, copy referidos corregido, precios honestos (parcial/planned).
- **UX:** nav móvil, inputs 16px (iOS), errores en dashboard, monitor de pagos realista.
- **Ops:** `npm run smoke:production`, `npm run stripe:sync-webhook`, guías `SETUP-SUPABASE-AUTH.md`, `SETUP-STRIPE-WEBHOOK.md`.
- **Migración:** `stripe_subscription_id` en `usuarios` — **aplicada** en Supabase (proyecto blindadousa).
- **CEO batch:** stubs crédito → IA Maestra, grid 13 módulos, admin en configuración, copy referidos, nav móvil.
- **Deploy:** producción en https://blindadousa.com (build + smoke OK).

## Manual (≈5 min) — ver `BLOCKERS.md`

1. **Supabase Auth** — Site URL + redirects + (opcional) desactivar confirm email si SMTP no está listo → `SETUP-SUPABASE-AUTH.md`.
2. **Rotar Stripe key** si se expuso en chat → Vercel `STRIPE_SECRET_KEY`.
3. **Opcional:** `ANTHROPIC_API_KEY`, `ADMIN_EMAILS`, Plaid, Twilio.

## Verificación E2E

```powershell
npm run smoke:production
```

- `/trial` → email → `/bienvenido` → dashboard
- `/recuperar` → email → nueva contraseña
- `/pagar` con cuenta existente → Stripe → `/pagar/exito` → dashboard con acceso
