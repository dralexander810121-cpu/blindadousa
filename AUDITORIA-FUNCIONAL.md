# Auditoría funcional — BlindadoUSA

Fecha: revisión página por página, botón por botón.  
Build: OK · Smoke producción: ampliado a 17 rutas públicas.

## Veredicto ejecutivo

| Área | Rutas | OK | Parcial | Placeholder |
|------|-------|-----|---------|-------------|
| Marketing | 18 | 14 | 4 | 0 |
| Auth | 6 | 5 | 1 | 0 |
| Pagos | 2 | 1 | 1 | 0 |
| Dashboard | 28 | 12 | 11 | 5 |
| **Total** | **54** | **32** | **17** | **5** |

**Conclusión:** El producto es **vendible hoy** como plataforma educativa + IA + calculadoras + directorio. Lo marcado PARCIAL depende de env vars (Stripe, Plaid, IA) o es contenido estático honesto (guías, tasas de referencia). Lo PLACEHOLDER son redirects intencionales a IA Maestra.

---

## Marketing — botón por botón

### `/` → `/inicio`
- Redirect 307. Canonical home = `/inicio`. Nav y logo apuntan ahí. **OK.**

### `/inicio` (HomePage)
| Control | Destino | Funcional |
|---------|---------|-----------|
| CTA trial | `/trial` | ✅ |
| CTA cómo funciona | `/como-funciona` | ✅ |
| 10 módulos IA | `/dashboard/*` | ✅ (requiere login) |
| Precios | `/pagar?plan=`, `/trial` | ✅ |
| Directorio | `/directorio`, `/registrar-negocio` | ✅ |
| Trust | `/precios`, `/blog`, `/descargo` | ✅ |
| Categorías directorio | Solo texto | ⚠️ decorativo — no enlazan |

### `/precios`, `/que-incluye`, `/como-funciona`
- Todos los CTAs van a rutas reales. **OK.**
- `/que-incluye`: 1 fila “Próximamente” (PDF anual) — **honesto**, no roto.

### Auth: `/trial`, `/registrarse`, `/entrar`, `/recuperar`, `/nueva-contrasena`
- Formularios → Supabase + `/api/trial/activar`. **OK.**
- `/bienvenido`: ahora **exige sesión**; sin login → `/trial`. **Corregido.**

### `/pagar`, `/pagar/exito`
- Checkout → Stripe + validación referidos. **OK** si Stripe configurado.
- Éxito → poll `/api/stripe/verify-session`. **OK.**

### `/blog`, `/blog/[slug]`
- 21 artículos estáticos reales. Imágenes = gradiente CSS. **OK** (contenido real, hero decorativo).

### `/directorio`
- Filtros + `GET /api/directorio`. Seed si BD vacía. **OK.**
- `/directorio/registrar-negocio`: CTAs → login + `/dashboard/negocios`. Copy paso 1 **corregido**.
- `/directorio/[slug]`: negocios reales OK. Stitch preview **bloqueado en producción**. **Corregido.**

### Legal: `/descargo`, `/privacidad`, `/terminos`
- Prosa legal, enlace volver. **OK.**

---

## Dashboard — módulo por módulo

### ✅ Funcional completo (12)
`onboarding`, `asistente`, `disputas`, `carro`, `casa`, `banco`, `taxes`, `trabajo`, `jubilacion`, `remesas`, `negocios`, `documentos`, `admin/directorio`

### ⚠️ Parcial — funciona con límites conocidos (11)
| Módulo | Qué hace | Límite |
|--------|----------|--------|
| `/dashboard` | Plaid + métricas | Plaid requiere keys |
| `/configuracion` | Portal Stripe, WhatsApp | Twilio opcional |
| `/credito` | Perfil + IA plan | Score = estimado local |
| `/credito/cartas` | GET cartas | **+ error UI** |
| `/credito/tarjetas` | Plaid | **+ error UI** |
| `/derechos` | Carta IA + guía | Errores en texto carta |
| `/emergencia` | Calc + IA plan | **+ try/catch** |
| `/prestamos` | Calc + IA | **+ try/catch** |
| `/subsidios` | Quiz + programas | **Bug 0 resultados corregido** |
| `/referidos` | API + WhatsApp | ACH requiere Plaid; **+ error UI** |

### 🔀 Placeholder intencional (5)
- `ia-dios`, `credito/simulador`, `credito/estrategia`, `credito/prestamistas` → redirect IA Maestra
- `negocios/exito` → **ahora verifica Stripe session**

---

## APIs — estado

| API | Uso | Estado |
|-----|-----|--------|
| `/api/trial/activar` | Trial | ✅ |
| `/api/stripe/checkout` | Suscripción | ✅ (env) |
| `/api/stripe/checkout-negocio` | B2B | ✅ |
| `/api/stripe/webhook` | Pagos | ✅ |
| `/api/stripe/verify-session` | Éxito | ✅ |
| `/api/ia/maestro` | Chat | ✅ (Gemini/Anthropic) |
| `/api/ia/carta-legal`, `disputa-credito`, `escanear-contrato` | Crédito/docs | ✅ |
| `/api/plaid/*` | Banco | ⚠️ requiere Plaid |
| `/api/referidos` | Referidos | ⚠️ ACH parcial |
| `/api/directorio` | Directorio | ✅ |
| `/api/admin/directorio` | Admin | ✅ (ADMIN_EMAILS) |

---

## Correcciones aplicadas en esta auditoría

1. **Subsidios** — ya no muestra todos los programas cuando calificas para 0
2. **Emergencia / préstamos** — try/catch; botón no queda colgado
3. **Cartas / tarjetas / referidos** — errores visibles + reintentar
4. **negocios/exito** — verificación Stripe con poll
5. **registrar-negocio** — copy alineado al flujo real
6. **directorio/[slug]** — stitch preview solo en dev
7. **bienvenido** — requiere sesión activa
8. **smoke-production** — 17 rutas públicas

---

## Pendiente externo (no es bug de UI)

1. Supabase Auth URLs en dashboard (Site URL + redirects)
2. Plaid keys para banco/tarjetas/referidos ACH
3. Rotar Stripe key si se expuso
4. Poblar `directorio_negocios` en Supabase (menos seed demo)

---

## Prueba humana recomendada (15 min)

1. `/trial` → email → `/bienvenido` → `/dashboard`
2. IA Maestra: enviar mensaje → respuesta
3. `/dashboard/carro` → mover sliders → ver cálculo
4. `/dashboard/subsidios` → responder No a todo → debe decir SIN RESULTADOS sin listar programas
5. `/pagar` → `4242…` → `/pagar/exito` → dashboard
6. `/directorio` → abrir un negocio → tel/mail funcionan
