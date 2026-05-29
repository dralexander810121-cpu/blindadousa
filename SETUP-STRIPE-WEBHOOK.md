# Stripe webhook — BlindadoUSA

URL de producción: `https://blindadousa.com/api/stripe/webhook`

## Eventos requeridos

- `checkout.session.completed`
- `customer.subscription.deleted`
- `customer.subscription.updated`
- `invoice.payment_failed`

## Sincronizar automáticamente (recomendado)

Con la **secret key** de Stripe en el entorno:

```powershell
cd C:\Users\Alex\Desktop\blindadousa
$env:STRIPE_SECRET_KEY = "sk_live_..."   # Dashboard → API keys
npm run stripe:sync-webhook
```

El script fusiona los eventos anteriores con los que ya tenga tu endpoint (no los borra).

## Portal de facturación (usuarios)

En **Configuración** del dashboard, los usuarios con `stripe_customer_id` pueden abrir el **Customer Portal** de Stripe (cancelar, cambiar tarjeta, facturas).

## Variables en Vercel (Production)

| Variable | Uso |
|----------|-----|
| `STRIPE_SECRET_KEY` | Checkout + webhook + portal |
| `STRIPE_WEBHOOK_SECRET` | Firma del webhook |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Cliente (si aplica) |
| `ANTHROPIC_API_KEY` o `GEMINI_API_KEY` | IA Maestra |

## Prueba manual

Stripe Dashboard → Webhooks → tu endpoint → **Send test webhook** → `checkout.session.completed` → debe responder **200**.
