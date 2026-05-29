# SEO — Cobertura de rutas BlindadoUSA

**Dominio canónico:** `https://blindadousa.com`  
**Generado:** 2026-05-28  
**Fuentes:** `app/**/page.tsx`, `app/**/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `lib/seo/metadata.ts`

## Resumen ejecutivo

| Métrica | Valor |
|--------|--------|
| Rutas públicas indexables (estáticas) | 10 |
| Artículos de blog indexables | 21 |
| Fichas de directorio indexables | Dinámico (Supabase) — no en sitemap aún |
| Rutas noindex (layouts) | Dashboard, auth, pagar, post-login |
| Redirect 308/307 | `/` → `/inicio` |

## Leyenda

- **Index:** `robots` permite indexación y hay título/descripción/canonical útiles.
- **Noindex:** `robots: noindex` en layout o `generateMetadata`.
- **Sitemap:** URL incluida en `app/sitemap.ts`.
- **Canonical:** `alternates.canonical` vía `pageMetadata` / `routeMetadata`.

---

## Rutas indexables (marketing + legal + blog)

| Ruta | Sitemap | Metadata | Notas |
|------|---------|----------|-------|
| `/inicio` | Sí (P1.0) | `pageMetadata('home')` → canonical `/inicio` | `/` redirige aquí; no listar `/` en sitemap |
| `/precios` | Sí | `pageMetadata('precios')` | Copy: $20/mes, $100/año |
| `/como-funciona` | Sí | `pageMetadata('comoFunciona')` | |
| `/trial` | Sí | `app/trial/layout.tsx` → `pageMetadata('trial')` | Formulario de registro trial |
| `/directorio` | Sí | `app/directorio/layout.tsx` | Listado |
| `/directorio/registrar-negocio` | Sí | Hereda layout directorio | Alta B2B |
| `/directorio/[slug]` | No* | `generateMetadata` + `routeMetadata` | Solo index si existe negocio en DB; plantillas Stitch → **noindex** |
| `/blog` | Sí | `pageMetadata('blog')` | |
| `/blog/[slug]` | Sí (21 URLs) | `generateMetadata` por post | `force-static` + `generateStaticParams` |
| `/terminos` | Sí | Inline en `page.tsx` | |
| `/privacidad` | Sí | Inline en `page.tsx` | |
| `/descargo` | Sí | Inline en `page.tsx` | |

\*Mejora futura: alimentar sitemap con slugs de `directorio_negocios` activos.

---

## Rutas no indexables (intencional)

| Ruta | Mecanismo | robots.txt disallow |
|------|-----------|---------------------|
| `/dashboard/**` | `app/dashboard/layout.tsx` noindex | `/dashboard/` |
| `/entrar` | `app/(auth)/layout.tsx` | `/entrar` |
| `/registrarse` | `app/(auth)/layout.tsx` | `/registrarse` |
| `/pagar`, `/pagar/exito` | `app/pagar/layout.tsx` | `/pagar` |
| `/bienvenido` | `app/bienvenido/layout.tsx` | `/bienvenido` |
| `/recuperar` | `app/recuperar/layout.tsx` | `/recuperar` |
| `/nueva-contrasena` | `app/nueva-contrasena/layout.tsx` | `/nueva-contrasena` |
| `/api/**` | — | `/api/` |
| `/directorio/[slug]` (Stitch) | `generateMetadata` index:false | — |

Las páginas del dashboard pueden exportar `pageMetadata('credito')` etc.; quedan anuladas por el layout `noindex` (útil si algún módulo se hace público después).

---

## Redirects

| Desde | Hacia | Archivo |
|-------|--------|---------|
| `/` | `/inicio` | `app/page.tsx` |

---

## Archivos globales SEO

| Archivo | Rol |
|---------|-----|
| `app/robots.ts` | Reglas crawl + enlace sitemap |
| `app/sitemap.xml/route.ts` + `lib/seo/sitemap-xml.ts` | XML explícito · 10 estáticas + 21 blog |
| `app/opengraph-image.tsx` | OG por defecto · copy `$20/mes` |
| `app/twitter-image.tsx` | Twitter card |
| `app/layout.tsx` | `metadataBase`, JSON-LD Organization + WebSite |
| `lib/seo/metadata.ts` | `PAGE_SEO`, `pageMetadata`, `routeMetadata` |

---

## Helpers añadidos (2026-05-28)

- **`routeMetadata()`** — canonical + OG/Twitter para rutas dinámicas.
- **`generateMetadata`** en `app/blog/[slug]/page.tsx` y `app/directorio/[slug]/page.tsx`.

---

## Copy de precios (alineación)

| Superficie | Estado |
|------------|--------|
| `lib/seo/metadata.ts` | $20/mes · $100/año |
| OG / Twitter images | $20/mes |
| `/precios`, `HomePage` | Suscripción |
| `/trial`, `/pagar` UI | Actualizado (sin “de por vida”) |
| Stripe Checkout `product_data` | Texto mensual |

### Pendiente técnico (no SEO)

- **`/api/stripe/checkout`** sigue en `mode: 'payment'` (pago único $20/$15). Los CTAs usan `?plan=mensual` / `?plan=anual` pero la página `/pagar` aún no bifurca planes ni crea suscripción recurrente en Stripe. Migrar a `mode: 'subscription'` + Price IDs en Vercel cuando estén listos.

---

## Checklist post-deploy (producción)

```text
https://blindadousa.com/robots.txt
https://blindadousa.com/sitemap.xml
https://blindadousa.com/inicio          → canonical /inicio
https://blindadousa.com/blog/subir-score-credito-90-dias → title + description del post
https://blindadousa.com/dashboard         → noindex
https://blindadousa.com/pagar             → noindex
```

Search Console: enviar sitemap, inspeccionar `/inicio` y 2–3 URLs de blog.

---

## Rutas dashboard (referencia — todas noindex)

`/dashboard`, `/dashboard/asistente`, `/dashboard/credito` (+ disputas, cartas, tarjetas, estrategia, simulador, prestamistas), `/dashboard/casa`, `/dashboard/carro`, `/dashboard/taxes`, `/dashboard/remesas`, `/dashboard/banco`, `/dashboard/trabajo`, `/dashboard/jubilacion`, `/dashboard/subsidios`, `/dashboard/emergencia`, `/dashboard/derechos`, `/dashboard/prestamos`, `/dashboard/negocios`, `/dashboard/referidos`, `/dashboard/documentos`, `/dashboard/ia-dios`, `/dashboard/onboarding`, `/dashboard/configuracion`, `/dashboard/admin/directorio`, `/dashboard/negocios/exito`.
