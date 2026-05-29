# FIXES APLICADOS — blindadousa.com

## 1) API IA devolvía 500 opaco

- **Archivo modificado:** `lib/anthropic.ts`, `app/api/ai/asistente/route.ts`
- **Error detectado:** `POST /api/ai/asistente` respondía `500` sin mensaje accionable cuando faltaba `ANTHROPIC_API_KEY`.
- **Solución aplicada:** validación explícita de clave; respuesta `503` clara cuando no está configurada; `try/catch` en endpoint para no romper silenciosamente.
- **Verificación #1:** `npm run build` ✅
- **Verificación #2:** request API devuelve estado controlado (ya no falla con excepción no manejada) ✅

## 2) Webhook Stripe con fallback inseguro

- **Archivo modificado:** `app/api/stripe/webhook/route.ts`
- **Error detectado:** se instanciaba Stripe con `sk_test_placeholder` si faltaba variable; riesgo de comportamiento inválido en producción.
- **Solución aplicada:** bloqueo explícito si faltan `STRIPE_SECRET_KEY` o `STRIPE_WEBHOOK_SECRET` reales; respuesta `503` con error claro.
- **Verificación #1:** `npm run build` ✅
- **Verificación #2:** endpoint sigue publicado y responde sin crash de runtime ✅

## 3) Blog vacío (placeholder)

- **Archivo modificado:** `app/blog/page.tsx`
- **Archivo nuevo:** `lib/blogPosts.ts`, `app/blog/[slug]/page.tsx`
- **Error detectado:** `/blog` no tenía contenido real.
- **Solución aplicada:** se cargaron 20 artículos reales, listado con cards y rutas de detalle por slug.
- **Verificación #1:** `npm run build` detecta `/blog/[slug]` con `+17 more paths` (20 total) ✅
- **Verificación #2:** rutas locales prerenderizadas de blog compilan y quedan disponibles para deploy ✅

## 4) Convención `middleware` deprecada

- **Archivo nuevo:** `proxy.ts`
- **Archivo eliminado:** `middleware.ts`
- **Error detectado:** warning deprecado en build por usar `middleware` en Next.js 16.
- **Solución aplicada:** migración del guard de rutas protegidas a `proxy.ts` conservando la misma lógica de acceso.
- **Verificación #1:** `npm run build` muestra `ƒ Proxy (Middleware)` sin warning de deprecación ✅
- **Verificación #2:** rutas `/dashboard/*` siguen protegidas con redirección cuando no hay sesión ✅

## 5) Integración completa de plantillas Stitch

- **Archivo modificado:** `app/directorio/page.tsx`
- **Archivos nuevos:** `lib/stitchTemplates.ts`, `app/directorio/[slug]/page.tsx`, `app/api/stitch/html/[slug]/route.ts`, `app/api/stitch/screen/[slug]/route.ts`
- **Error detectado:** plantillas existían en disco pero no estaban publicadas de forma navegable masiva.
- **Solución aplicada:** índice dinámico + vista individual por slug + endpoint HTML + endpoint de captura.
- **Verificación #1:** `npm run build` incluye rutas dinámicas de directorio y APIs Stitch ✅
- **Verificación #2:** `200` en `/directorio`, `/directorio/[slug]`, `/api/stitch/html/[slug]`, `/api/stitch/screen/[slug]` ✅
