# Migrar de Stripe a Lemon Squeezy

Stripe suele **restringir o cerrar** cuentas que venden:

- Educación sobre crédito / disputas FCRA  
- Herramientas de “subir score”  
- Contenido percibido como *credit repair* (industria regulada en USA)

BlindadoUSA encaja en esa zona gris aunque sea educativo. **Lemon Squeezy** actúa como *merchant of record* (ellos facturan y llevan impuestos), y suele aceptar SaaS educativo más fácil que Stripe.

---

## Paso 1 — Crear cuenta Lemon Squeezy (15 min)

1. Regístrate en [lemonsqueezy.com](https://www.lemonsqueezy.com)
2. Crea una **Store**
3. Crea **2 productos de suscripción**:
   - **Mensual** — $20/mes  
   - **Anual** — $100/año  
4. (Opcional) Duplica variantes a **$15** para referidos, o crea cupones `AETHERIS` / códigos de referido
5. Copia los **Variant ID** (números) de cada plan

**Nombre del producto en Lemon Squeezy (importante):**

- Usa: *“BlindadoUSA — Educación financiera en español”*
- Evita: *“Credit repair”*, *“Fix your credit”*, *“Remove negative items”*

---

## Paso 2 — Variables en Vercel (Production)

```env
PAYMENT_PROVIDER=lemonsqueezy
LEMONSQUEEZY_API_KEY=...
LEMONSQUEEZY_STORE_ID=...
LEMONSQUEEZY_VARIANT_MENSUAL=123456
LEMONSQUEEZY_VARIANT_ANUAL=123457
LEMONSQUEEZY_VARIANT_MENSUAL_REF=...   # opcional $15
LEMONSQUEEZY_VARIANT_ANUAL_REF=...     # opcional
LEMONSQUEEZY_WEBHOOK_SECRET=...        # paso 3
```

Puedes **eliminar o dejar vacías** las variables `STRIPE_*` si ya no usarás Stripe.

Redeploy en Vercel después de guardar.

---

## Paso 3 — Webhook Lemon Squeezy

1. Lemon Squeezy → **Settings → Webhooks**
2. URL: `https://blindadousa.com/api/lemonsqueezy/webhook`
3. Secret: genera uno aleatorio → mismo valor en `LEMONSQUEEZY_WEBHOOK_SECRET`
4. Eventos mínimos:
   - `subscription_created`
   - `subscription_updated`
   - `subscription_expired`
   - `subscription_cancelled`
   - `subscription_payment_success`

---

## Paso 4 — Probar

1. Modo **Test** en Lemon Squeezy primero
2. `/trial` con email real → `/pagar` → pagar con tarjeta test
3. Debe llegar a `/pagar/exito` y luego `/dashboard` con acceso
4. Referido: código válido → variant con descuento o precio $15

---

## Qué cambió en el código

| Antes | Ahora |
|-------|--------|
| `POST /api/stripe/checkout` | `POST /api/checkout` (elige LS o Stripe) |
| Solo Stripe en `/pagar` | Texto neutro “pago seguro” |
| Portal Stripe | `POST /api/billing/portal` (LS o Stripe) |
| Webhook Stripe | + `POST /api/lemonsqueezy/webhook` |

Los clientes **antiguos en Stripe** siguen funcionando si mantienes `STRIPE_*` y `PAYMENT_PROVIDER=stripe` temporalmente.

---

## Si Lemon Squeezy también te rechaza

Plan B en orden:

1. **Paddle** — similar a Lemon Squeezy (MoR)  
2. **PayPal Subscriptions** — más lento de integrar pero alta confianza hispana  
3. **Reescribir copy** del sitio: menos “disputa/score”, más “educación y plantillas” antes de volver a aplicar a cualquier procesador

---

## Apelación Stripe (opcional)

Si quieres recuperar fondos retenidos:

1. Stripe Dashboard → mensaje de restricción → **Reply**
2. Explica: *software educativo*, no CRO, no garantías de score, usuario envía sus propias cartas
3. Adjunta link a `/descargo` y `/que-incluye`

Muchas restricciones **no se revierten**. Por eso la migración a Lemon Squeezy ya está cableada en el repo.
