# PENDIENTES — blindadousa.com

Actualizado tras Prioridad A + automatización operativa.

## Hecho en código / deploy

- Suscripciones Stripe mensual y anual (`/pagar`, `/api/stripe/checkout`).
- Webhook: `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated`, `invoice.payment_failed`.
- Portal de facturación: `/api/stripe/portal` + botón en `/dashboard/configuracion`.
- Página `/que-incluye`, checklist en `/bienvenido`, copy 13 módulos.
- IA Maestra: `ANTHROPIC_API_KEY` **o** `GEMINI_API_KEY` (fallback).
- Script `npm run stripe:sync-webhook` — ver `SETUP-STRIPE-WEBHOOK.md`.
- ZIPs grandes eliminados del repo (ver `.gitignore`).

## Acción manual (≈3 minutos)

1. **Stripe webhook** — En terminal (con tu `sk_live_...`):
   ```powershell
   $env:STRIPE_SECRET_KEY = "sk_live_..."
   npm run stripe:sync-webhook
   ```
   O en [Stripe Webhooks](https://dashboard.stripe.com/webhooks) añade manualmente los 4 eventos al endpoint `https://blindadousa.com/api/stripe/webhook`.
2. **Vercel** — `GEMINI_API_KEY` ya está en Production (IA Maestra activa con Gemini). Opcional: añadir `ANTHROPIC_API_KEY` para mejor calidad y escaneo de fotos de contratos.
3. **Supabase Auth** — Site URL `https://blindadousa.com`, redirects: `/bienvenido`, `/nueva-contrasena`, `/dashboard` (ver `BLOCKERS.md`).

## Verificación E2E (usuario real)

- Trial `/trial` con email real.
- Recuperar contraseña `/recuperar`.
- Pago test o live en `/pagar` + evento webhook 200 en Stripe.
- Móvil &lt;480px en formularios críticos.
