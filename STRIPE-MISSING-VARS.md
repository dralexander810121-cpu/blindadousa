# Stripe Missing Vars (Emergency Audit)

Fecha: 2026-05-25

## Estado local (.env.local)

El archivo `.env.local` esta vacio en este entorno local.  
No hay variables Stripe configuradas localmente.

## Variables requeridas en Vercel (produccion)

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_BASE_URL=https://blindadousa.com`

## Riesgo si faltan

- Sin `STRIPE_SECRET_KEY`: falla `/api/stripe/checkout`.
- Sin `STRIPE_WEBHOOK_SECRET`: falla validacion de firma en `/api/stripe/webhook`.
- Sin `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: el frontend no puede inicializar Stripe JS correctamente.
- Sin `NEXT_PUBLIC_BASE_URL`: callbacks y redirects pueden quedar mal apuntados.
