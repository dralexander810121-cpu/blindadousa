# Configurar pagos — PayPal y Klarna (BlindadoUSA)

La página `/pagar` ofrece tres formas de pago:

1. **PayPal** — suscripción recurrente directo a tu cuenta PayPal Business  
2. **Klarna** — pago a plazos (Pay in 4) para el cliente  
3. **Tarjeta** — Lemon Squeezy o Stripe (solo si están configurados)

El dinero de PayPal y Klarna llega a **tu** cuenta de comerciante, no a un intermediario genérico.

---

## 1. PayPal (recomendado — suscripción mensual/anual)

### Cuenta
1. Crea o usa una cuenta **PayPal Business**: https://www.paypal.com/business  
2. Entra a **Developer**: https://developer.paypal.com/dashboard/  
3. Crea una app **Live** y copia **Client ID** y **Secret**.

### Planes de suscripción
En PayPal Dashboard → **Pay & Get Paid** → **Subscriptions** → **Plans**:

| Plan | Precio | Intervalo |
|------|--------|-----------|
| Mensual | $20/mes | Monthly |
| Anual | $100/año | Yearly |
| Mensual referido | $15/mes | Monthly (opcional) |
| Anual referido | (tu precio) | Yearly (opcional) |

Copia el **Plan ID** (empieza con `P-...`) de cada uno.

### Variables en Vercel
```
PAYPAL_MODE=live
PAYPAL_CLIENT_ID=...    ← sale de client-id= en el script de PayPal
PAYPAL_CLIENT_SECRET=... ← NO está en el script; cópialo en developer.paypal.com → tu app → Secret
PAYPAL_PLAN_MENSUAL=P-... ← Plan ID del plan $20/mes (empieza con P-)
PAYPAL_PLAN_ANUAL=P-...
PAYPAL_PLAN_MENSUAL_REF=P-...   (opcional)
PAYPAL_PLAN_ANUAL_REF=P-...     (opcional)
```

**Si PayPal te dio dos partes de código** (instrucciones “Parte 1” y “Parte 2”):

| Lo que dice PayPal | Qué es | Dónde va en BlindadoUSA |
|--------------------|--------|-------------------------|
| **Parte 1** — `<script src="...sdk/js?client-id=...&components=hosted-buttons">` | Carga el SDK | Ya está en `components/payments/PayPalHostedButton.tsx` (no pegues nada a mano) |
| **Parte 2** — `<div id="paypal-container-...">` + `paypal.HostedButtons({ hostedButtonId: "..." })` | Botón $20/mes | Ya está en la página `/pagar` cuando configuras las variables abajo |

**No pegues esos scripts en el HTML del sitio.** Solo pon esto en **Vercel**:

```
NEXT_PUBLIC_PAYPAL_CLIENT_ID=BAAeCPWnWYNf9sDrX6RKmwEJ8g57oNNEM4mtmOOygDLFfeKviAIf7f0LEWlAVxqVcNjXC1R17_yW3UER4s
PAYPAL_CLIENT_ID=(el mismo valor)
PAYPAL_CLIENT_SECRET=(developer.paypal.com → tu app Live → Secret)
PAYPAL_HOSTED_BUTTON_MENSUAL=LL5F7EW8C7FFQ
PAYPAL_HOSTED_BUTTON_ANUAL=6FBGBVWZ9ASN8
PAYPAL_MODE=live
```

| Plan | Hosted Button ID | Precio |
|------|------------------|--------|
| Mensual | `LL5F7EW8C7FFQ` | $20/mes |
| Anual | `6FBGBVWZ9ASN8` | $100/año |

En la configuración de **cada botón** en PayPal, pon **URL de éxito**: `https://blindadousa.com/pagar/exito?provider=paypal`

Cuenta Business: **alexanderfigueredo180@gmail.com**

### Webhook PayPal
1. Developer Dashboard → tu app → **Webhooks**  
2. URL: `https://blindadousa.com/api/paypal/webhook`  
3. Eventos: `BILLING.SUBSCRIPTION.ACTIVATED`, `BILLING.SUBSCRIPTION.CANCELLED`, `BILLING.SUBSCRIPTION.SUSPENDED`

Tras pagar, el cliente vuelve a `/pagar/exito?provider=paypal&subscription_id=I-...` y se activa el acceso.

---

## 2. Klarna (pago a plazos)

### Cuenta
1. Solicita acceso como comerciante en US: https://www.klarna.com/us/business/  
2. En el **Merchant Portal** obtén credenciales API (username + password).

### Variables en Vercel
```
KLARNA_REGION=na
KLARNA_USERNAME=...
KLARNA_PASSWORD=...
```

### Cómo funciona
- El cliente elige **“Pagar a plazos con Klarna”** en `/pagar`.  
- Klarna divide el pago (típicamente 4 cuotas sin intereses, según elegibilidad).  
- El importe completo se acredita a tu cuenta Klarna; el cliente paga a Klarna en cuotas.  
- Es un **pago único por periodo** (no suscripción automática como PayPal). Para renovación mensual, el cliente vuelve a pagar o migra a PayPal.

---

## 3. Tarjeta (opcional)

Si también quieres tarjeta sin PayPal:

**Lemon Squeezy** (MoR, menos fricción con categoría “educación”):
```
PAYMENT_PROVIDER=lemonsqueezy
LEMONSQUEEZY_API_KEY=...
LEMONSQUEEZY_STORE_ID=...
LEMONSQUEEZY_VARIANT_MENSUAL=...
LEMONSQUEEZY_VARIANT_ANUAL=...
LEMONSQUEEZY_WEBHOOK_SECRET=...
```

Webhook: `https://blindadousa.com/api/lemonsqueezy/webhook`

---

## Probar en local

1. Copia `.env.example` → `.env.local` y rellena PayPal **Sandbox** (`PAYPAL_MODE=sandbox`).  
2. `npm run dev`  
3. Crea trial en `/trial` con un email de prueba.  
4. Ve a `/pagar` y prueba PayPal sandbox o Klarna playground.

---

## Gestión de suscripción (dashboard)

En **Configuración** → **Gestionar suscripción**:

- **PayPal** → enlace a autopay de PayPal  
- **Klarna** → app Klarna del cliente (pagos a plazos)  
- **Stripe / Lemon** → portal del proveedor  

---

## Copy del producto (importante)

Al crear planes en PayPal/Klarna, describe el producto como:

> **BlindadoUSA — educación financiera en español** (herramientas, guías, IA informativa)

Evita términos como “reparación de crédito”, “disputas FCRA” o “eliminación de deudas” en el nombre del producto del procesador de pagos.

---

## Perfil del comerciante (copiar en formularios PayPal / Klarna)

Usa estos datos cuando PayPal o Klarna pidan verificación de identidad o datos del negocio. **No guardes contraseñas en Vercel ni en el código** — solo API keys del panel de desarrollador.

| Campo | Valor |
|-------|--------|
| Nombre legal / titular | Alexander (según tu ID) |
| Email admin BlindadoUSA | dralexander810121@gmail.com |
| Email cuenta PayPal Business (cobros) | alexanderfigueredo180@gmail.com |
| Teléfono | +1 305 360 6892 |
| Fecha de nacimiento | 01/21/1981 |
| Dirección | 7710 Antoine Dr |
| Ciudad | Houston |
| Estado | Texas |
| ZIP | 77088 |
| País | United States |
| Sitio web | https://blindadousa.com |
| Nombre comercial | BlindadoUSA |
| Descripción del producto | Educación financiera en español — suscripción digital |

**PayPal Developer:** inicia sesión con **alexanderfigueredo180@gmail.com** (cuenta Business donde recibes el dinero), no con el email de admin del dashboard (dralexander810121@gmail.com).

**Klarna merchant:** usa el mismo teléfono, dirección Houston y URL blindadousa.com.

