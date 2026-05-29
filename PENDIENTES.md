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

## Acción manual (5 minutos)

1. **Stripe webhook** — Si no corriste el script, en [Stripe Webhooks](https://dashboard.stripe.com/webhooks) añade los 4 eventos de arriba al endpoint de `blindadousa.com`.
2. **Vercel** — Añadir en Production al menos una de:
   - `ANTHROPIC_API_KEY` (recomendado), o
   - `GEMINI_API_KEY` (ya usas Gemini para imágenes; misma clave sirve para chat).
3. **Supabase Auth** — Site URL `https://blindadousa.com`, redirects: `/bienvenido`, `/nueva-contrasena`, `/dashboard` (ver `BLOCKERS.md`).

## Verificación E2E (usuario real)

- Trial `/trial` con email real.
- Recuperar contraseña `/recuperar`.
- Pago test o live en `/pagar` + evento webhook 200 en Stripe.
- Móvil &lt;480px en formularios críticos.
