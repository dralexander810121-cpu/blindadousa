# TAREAS 10/10 — blindadousa.com
# Sistema multi-agente: Claude Code + Gemini CLI

> Auditoría base: 7.2/10 | Meta: 10/10
> Agentes activos: Claude (arquitectura/seguridad) + Gemini (mecánico/rápido)

---

## CRITICOS — bloquean lanzamiento seguro

### [SEC-1] Webhook PayPal sin firma ⚠️ FRAUDE ACTIVO
- **Archivo:** `app/api/paypal/webhook/route.ts`
- **Problema:** cualquier POST activa acceso gratis sin verificar firma
- **Fix:** verificar `PAYPAL-TRANSMISSION-SIG` contra API de PayPal
- **Agente:** Claude
- **Estado:** [ ] pendiente

### [SEC-2] Middleware fuera de raíz
- **Archivo:** revisar si existe `middleware.ts` en raíz (no en `repo/`)
- **Problema:** si solo existe en `repo/`, el dashboard NO está protegido
- **Fix:** mover/crear `middleware.ts` en raíz del proyecto
- **Agente:** Gemini
- **Estado:** [ ] pendiente

### [SEC-3] Webhook Klarna es stub vacío
- **Archivo:** `app/api/klarna/webhook/route.ts`
- **Problema:** eventos de pago/renovación/cancelación ignorados
- **Fix:** implementar handler completo con verificación HMAC
- **Agente:** Claude
- **Estado:** [ ] pendiente

### [SEC-4] Plaid tokens en texto plano
- **Archivo:** `supabase/migrations/001_schema_completo.sql` → `cuentas_conectadas.plaid_access_token`
- **Fix:** cifrado AES-256 a nivel aplicación antes de INSERT
- **Agente:** Claude
- **Estado:** [ ] pendiente

---

## PAGOS — 6/10 → 10/10

### [PAY-1] Lógica referidos duplicada
- **Archivos:** `app/api/stripe/webhook/route.ts` líneas 100-159 + `lib/payments/activate-access.ts`
- **Fix:** webhook Stripe llama a `activateSubscriptionAccess()`, eliminar duplicado
- **Agente:** Gemini
- **Estado:** [ ] pendiente

### [PAY-2] Renombrar columna `stripe_subscription_id`
- **Archivo:** Supabase migration nueva
- **Fix:** `external_subscription_id` + columna `payment_provider`
- **Agente:** Claude
- **Estado:** [ ] pendiente

### [PAY-3] Idempotencia en webhooks PayPal / LemonSqueezy
- **Fix:** verificar `acceso_pagado: true` antes de procesar, guardar event_id
- **Agente:** Gemini
- **Estado:** [ ] pendiente

### [PAY-4] `CODIGO_FIJO` hardcodeado en 2 archivos
- **Fix:** extraer a `lib/constants.ts` → `REFERRAL_CODE_FIXED`
- **Agente:** Gemini
- **Estado:** [ ] pendiente

---

## PRODUCCION — SEO 8/10 → 10/10

### [PROD-1] Headers de seguridad HTTP — QUICK WIN (10 min)
- **Archivo:** `vercel.json`
- **Fix:** agregar bloque `headers` con CSP, X-Frame-Options, HSTS, Permissions-Policy
- **Agente:** Gemini
- **Estado:** [ ] pendiente

### [PROD-2] 3 cron endpoints inexistentes — QUICK WIN (20 min)
- **Archivo:** `vercel.json` + crear `app/api/emails/trial-dia2/`, `trial-fin/`, `tip-semanal/`
- **Fix:** implementar con Resend + verifyCronRequest
- **Agente:** Claude
- **Estado:** [ ] pendiente

### [PROD-3] Directorio `repo/` duplicado
- **Fix:** eliminar o añadir a `.vercelignore` / `.gitignore`
- **Agente:** Gemini
- **Estado:** [ ] pendiente

---

## CODIGO — 7/10 → 10/10

### [CODE-1] `createAdmin` usa require() en lugar de import
- **Archivo:** `lib/supabase/server.ts` línea ~11
- **Fix:** convertir a import ESM estático
- **Agente:** Gemini
- **Estado:** [ ] pendiente

### [CODE-2] Validación Zod en route handlers
- **Archivos:** todos los `app/api/*/route.ts`
- **Fix:** schema Zod en cada handler para inputs del usuario
- **Agente:** Claude
- **Estado:** [ ] pendiente

### [CODE-3] Types de Supabase sin tipo explícito
- **Fix:** generar tipos con `supabase gen types typescript` + tipar `createAdmin`
- **Agente:** Gemini
- **Estado:** [ ] pendiente

---

## IA — 7/10 → 10/10

### [AI-1] Rate limiting en endpoints IA
- **Archivos:** `/api/ia/maestro`, `/api/ia/disputa-credito`, `/api/ia/carta-legal`
- **Fix:** campo `ia_requests_hoy` en tabla `usuarios`, reset diario vía cron
- **Agente:** Claude
- **Estado:** [ ] pendiente

### [AI-2] Cachear contexto de usuario
- **Archivo:** `lib/ia/context.ts`
- **Fix:** `unstable_cache` con revalidate 300s (5 min)
- **Agente:** Gemini
- **Estado:** [ ] pendiente

### [AI-3] Gemini key en URL visible en logs
- **Fix:** usar fetch con header `x-goog-api-key` en lugar de query param
- **Agente:** Gemini
- **Estado:** [ ] pendiente

---

## ACCESIBILIDAD — 7/10 → 10/10

### [A11Y-1] Link de chat sin aria-label
- **Archivo:** `app/dashboard/page.tsx`
- **Fix:** `aria-label="Abrir asistente de IA Maestra"`
- **Agente:** Gemini
- **Estado:** [ ] pendiente

### [A11Y-2] JSON-LD via next/script — patrón incorrecto
- **Fix:** mover a Server Component directo, eliminar next/script wrapper
- **Agente:** Gemini
- **Estado:** [ ] pendiente

---

## EMAILS / FUNNEL — ausente → implementado

### [EMAIL-1] Email día 2 del trial (mayor driver de conversión)
- **Endpoint:** `app/api/emails/trial-dia2/route.ts`
- **Fix:** query usuarios con trial activo día 2 + email Resend con CTA pagar
- **Agente:** Claude
- **Estado:** [ ] pendiente

### [EMAIL-2] Email fin de trial (día 3)
- **Endpoint:** `app/api/emails/trial-fin/route.ts`
- **Agente:** Claude
- **Estado:** [ ] pendiente

### [EMAIL-3] Tip semanal (retención)
- **Endpoint:** `app/api/emails/tip-semanal/route.ts`
- **Agente:** Gemini
- **Estado:** [ ] pendiente

---

## ORDEN DE EJECUCIÓN RECOMENDADO

```
Semana 1 (seguridad + pagos):
Claude:  SEC-1, SEC-3, SEC-4, PAY-2, CODE-2, AI-1
Gemini:  SEC-2, PROD-1, PROD-2, PROD-3, PAY-1, PAY-3, PAY-4, CODE-1, CODE-3

Semana 2 (funnel + polish):
Claude:  EMAIL-1, EMAIL-2, AI-1 (rate limit)
Gemini:  EMAIL-3, A11Y-1, A11Y-2, AI-2, AI-3
```

---

## CÓMO USAR GEMINI EN ESTE PROYECTO

```powershell
# Desde C:\Users\Alex\Desktop\blindadousa
gemini

# Gemini tiene acceso a:
# - Filesystem (leer/escribir código)
# - GitHub (commits, PRs)
# - Vercel (deploys, env vars)
# - Stripe (webhooks, productos)
# - Supabase (migrations, queries)

# Ejemplo de tarea para Gemini:
# "Aplica PROD-1: agrega headers de seguridad HTTP en vercel.json"
# "Aplica CODE-1: convierte createAdmin a import ESM en lib/supabase/server.ts"
```

---

## TOKENS NECESARIOS (una vez, en tu terminal)

```powershell
# GitHub token (ya autenticado con gh CLI — puede reusar)
gh auth token

# Vercel token
# https://vercel.com/account/tokens → crear "blindadousa-agents"

# Supabase Access Token
# https://app.supabase.com/account/tokens → crear "blindadousa-agents"

# Stripe — ya en .env.local como STRIPE_SECRET_KEY
```
