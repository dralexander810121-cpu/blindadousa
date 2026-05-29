# AUDITORIA INICIAL — blindadousa.com

Fecha: 2026-05-25  
Repositorio: `C:\Users\Alex\Desktop\blindadousa`

## 1) Comandos obligatorios ejecutados

- `git log --oneline -15`
- `git status --short --branch`
- `npm run build`
- lectura de `.env.local`, `.env`, `.env.example`

## 2) Hallazgos base antes de fixes nuevos

- Build inicial compilaba, pero mostraba warning de convención `middleware` deprecada (Next.js 16).
- API `POST /api/ai/asistente` respondía `500` en producción sin mensaje útil.
- `/blog` estaba activo pero como placeholder (sin artículos reales).
- Webhook Stripe usaba fallback con `sk_test_placeholder` en código si faltaban vars.
- `.env.local` local estaba vacío; variables estaban definidas en `.env.example` (estructura correcta, valores faltantes locales).

## 3) Mapa de rutas (app router)

### Páginas

- `/`
- `/inicio`
- `/como-funciona`
- `/precios`
- `/trial`
- `/entrar`
- `/registrarse`
- `/recuperar`
- `/nueva-contrasena`
- `/bienvenido`
- `/pagar`
- `/pagar/exito`
- `/blog`
- `/directorio`
- `/directorio/[slug]`
- `/terminos`
- `/privacidad`
- `/descargo`
- `/dashboard`
- `/dashboard/asistente`
- `/dashboard/banco`
- `/dashboard/carro`
- `/dashboard/casa`
- `/dashboard/credito`
- `/dashboard/credito/cartas`
- `/dashboard/credito/disputas`
- `/dashboard/credito/estrategia`
- `/dashboard/credito/prestamistas`
- `/dashboard/credito/simulador`
- `/dashboard/credito/tarjetas`
- `/dashboard/derechos`
- `/dashboard/emergencia`
- `/dashboard/jubilacion`
- `/dashboard/prestamos`
- `/dashboard/referidos`
- `/dashboard/remesas`
- `/dashboard/subsidios`
- `/dashboard/taxes`
- `/dashboard/trabajo`

### Endpoints API

- `POST /api/ai/asistente`
- `POST /api/auth/signout`
- `POST /api/referidos/validar`
- `POST /api/stripe/checkout`
- `POST /api/stripe/webhook`
- `POST /api/trial/activar`
- `GET /api/stitch/html/[slug]`
- `GET /api/stitch/screen/[slug]`

## 4) Mapa de componentes y librerías

### Componentes

- `components/dashboard/AsistenteFlotante.tsx`
- `app/dashboard/asistente/AsistenteChat.tsx`
- `app/dashboard/remesas/RemesasCalculadora.tsx`

### Librerías

- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/stripe.ts`
- `lib/anthropic.ts`
- `lib/plaid.ts`
- `lib/resend.ts`
- `lib/seo/metadata.ts`
- `lib/calculos/*`
- `lib/stitchTemplates.ts`

## 5) Estado inicial de navegación y respuestas HTTP

Verificación inicial de rutas públicas:

- `200`: `/trial`, `/recuperar`, `/nueva-contrasena`, `/bienvenido`, `/pagar`, `/terminos`, `/privacidad`, `/descargo`, `/directorio`, `/blog`
- `307`: rutas protegidas `/dashboard/*` (esperado por auth/proxy)

## 6) Fuentes de referencia y skill

- No se encontró carpeta de skills en este repo.
- Referencia revisada en `figueredomed`: `.cursor/skills/figueredomed-agent/SKILL.md` y `reference.md`.
