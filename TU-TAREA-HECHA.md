# Tu tarea — estado automático

Generado por el agente de lanzamiento (skill `blindadousa-launch-guide`).

## ✅ Ya hecho por el agente (no toques)

| Tarea | Estado |
|-------|--------|
| Migración SQL `stripe_subscription_id` | ✅ Columna existe en Supabase |
| Stripe webhook + eventos | ✅ `we_1TcRANI4klE5kZfU1qKC3tO4` |
| Vercel env core (Supabase, Stripe, Gemini) | ✅ Production |
| `ADMIN_EMAILS` en Vercel | ✅ `dralexander810121@gmail.com` |
| Smoke rutas públicas | ✅ 10/10 |
| Deploy producción | ✅ https://blindadousa.com |

Comando repetible: `npm run blockers:apply`

---

## ⚠️ Solo tú — 3 clics en Supabase (~2 min)

El MCP de Supabase **no puede** cambiar Site URL. Abre este enlace directo:

**[→ Configurar Auth URLs en Supabase](https://supabase.com/dashboard/project/syswhmtbbrpuvoehnjcq/auth/url-configuration)**

1. **Site URL:** `https://blindadousa.com`
2. **Redirect URLs** — pega cada línea (Add URL):

```
https://blindadousa.com/**
https://blindadousa.com/auth/callback
https://blindadousa.com/bienvenido
https://blindadousa.com/nueva-contrasena
https://blindadousa.com/dashboard
```

3. Si el registro se traba en “confirma tu email”:
   **[→ Email provider](https://supabase.com/dashboard/project/syswhmtbbrpuvoehnjcq/auth/providers)**  
   Desactiva **Confirm email** hasta tener SMTP (Resend).

---

## Prueba que funcionó (2 min)

1. Abre https://blindadousa.com/trial con un email real  
2. Debe llegar a `/bienvenido` y luego `/dashboard`  
3. https://blindadousa.com/pagar → tarjeta `4242 4242 4242 4242` → `/pagar/exito`  
4. https://blindadousa.com/dashboard/admin/directorio — debe abrir (eres admin)

---

## Opcional después

- Rotar `STRIPE_SECRET_KEY` si se filtró en chat → [Stripe API keys](https://dashboard.stripe.com/apikeys)
- `ANTHROPIC_API_KEY` en Vercel (mejor IA + fotos de contratos)
- Plaid / Twilio cuando quieras datos bancarios reales
