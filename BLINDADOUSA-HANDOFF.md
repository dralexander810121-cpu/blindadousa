# BLINDADO USA — Handoff Document

**Generado:** 2026-05-24 · **Repo:** `C:\Users\Alex\Desktop\blindadousa\`

---

## ✅ Lo que YA está construido (esta sesión)

| Componente | Path | Status |
|---|---|---|
| **Stack base** Next.js 15 + Tailwind + TS + shadcn-ready | raíz + `app/`, `components/`, `lib/` | ✅ |
| **Schema SQL** 18 tablas + RLS + triggers (genera código personal, updated_at) | `supabase/migrations/001_schema_completo.sql` | ✅ |
| **Lib core** Supabase (browser+server+admin), Stripe, Anthropic, Plaid, Resend | `lib/` | ✅ |
| **5 calculadoras** hipoteca, auto, remesas, jubilación, FICO | `lib/calculos/` | ✅ |
| **Auth** /entrar, /registrarse | `app/(auth)/` | ✅ |
| **Trial 3 días** /trial + `/api/trial/activar` + email Resend | `app/trial/`, `app/api/trial/` | ✅ |
| **Pago Stripe** /pagar + checkout + webhook + validación AETHERIS/referido | `app/pagar/`, `app/api/stripe/` | ✅ |
| **Middleware** control acceso (público/auth/trial/pago) | `middleware.ts` | ✅ |
| **Landing 7 secciones** Hero/Problema/Solución/Directorio/Precio/Testimonios/FAQ + Schema.org | `app/(marketing)/page.tsx` | ✅ |
| **Páginas marketing** /como-funciona, /precios | `app/(marketing)/` | ✅ |
| **Dashboard layout** sidebar 15 items + banner trial + AsistenteFlotante | `app/dashboard/layout.tsx` | ✅ |
| **Dashboard home** métricas + alertas + grid 13 módulos | `app/dashboard/page.tsx` | ✅ |
| **Módulo Remesas COMPLETO** (template) alerta 2026 + calculadora + comparador 5 servicios + afiliados | `app/dashboard/remesas/` | ✅ |
| **Asistente IA Blindado** chat + endpoint Claude + system prompt + historial Supabase | `app/dashboard/asistente/`, `app/api/ai/asistente/` | ✅ |
| **SEO** sitemap dinámico + robots + metadata por página + Schema.org WebApplication | `app/sitemap.ts`, `app/robots.ts`, `lib/seo/metadata.ts` | ✅ |
| **Vercel config** crons stub | `vercel.json` | ✅ |
| **Sign out** | `app/api/auth/signout/route.ts` | ✅ |

**Líneas totales generadas:** ~3,500 LoC en este sprint.

---

## ⏳ Lo que TÚ tenés que hacer ANTES de probar el build

### 1. Instalar dependencias (5 min)

```powershell
cd C:\Users\Alex\Desktop\blindadousa
npm install
```

Esto bajará ~600 MB en `node_modules/`. Si tu npm es lento, usá `pnpm install` (más rápido + menos espacio).

### 2. Crear proyecto Supabase nuevo (5 min)

1. https://supabase.com/dashboard → **New Project**
2. Name: `blindadousa-prod` · Region: `East US (N. Virginia)`
3. Esperar 2 min hasta que el proyecto esté ready
4. **SQL Editor → New Query** → copiar TODO el contenido de `supabase/migrations/001_schema_completo.sql` → **Run**
5. Confirmar que el `VERIFY` al final devuelve `tablas creadas: 18`
6. **Settings → API** → copiar:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (la pública)
   - `SUPABASE_SERVICE_ROLE_KEY` (la secret — NUNCA al cliente)

### 3. Crear `.env.local` (3 min)

```powershell
copy .env.example .env.local
notepad .env.local
```

Pegá los valores Supabase del paso anterior. Para el resto:

- **ANTHROPIC_API_KEY** → https://console.anthropic.com → API Keys → Create Key. Plan starter $5 deposit OK.
- **STRIPE_SECRET_KEY** + **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY** → tu cuenta Stripe `acct_1TQ0PV7satGtrIpf` (ya conectada al MCP). Test mode primero, live cuando estés listo.
- **PLAID_CLIENT_ID** + **PLAID_SECRET** → ya las tenés (las pegaste antes — `PLAID_ENV=sandbox` para empezar)
- **RESEND_API_KEY** → https://resend.com → API Keys. Sin pagar para 3000 emails/mes
- **CRON_SECRET** → `openssl rand -hex 32` (o `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

### 4. Probar build local (3 min)

```powershell
npm run build
```

Si pasa → `npm run dev` → http://localhost:3000

### 5. Deploy Vercel (10 min)

```powershell
npx vercel
```

Seguir el wizard. Después en https://vercel.com → tu proyecto → **Settings → Environment Variables** → pegar las mismas variables del `.env.local`. **Redeploy**.

### 6. DNS Cloudflare para `blindadousa.com` (5 min)

En Cloudflare dash → `blindadousa.com` → **DNS**:

| Tipo | Nombre | Contenido | Proxy |
|---|---|---|---|
| A | @ | 76.76.21.21 | ON |
| CNAME | www | cname.vercel-dns.com | ON |

En Vercel → tu proyecto → **Settings → Domains** → agregar `blindadousa.com` + `www.blindadousa.com`.

### 7. Configurar webhook Stripe (3 min)

Stripe Dashboard → **Webhooks** → Add endpoint:
- URL: `https://blindadousa.com/api/stripe/webhook`
- Eventos: `checkout.session.completed`
- Copiar el signing secret → pegarlo como `STRIPE_WEBHOOK_SECRET` en Vercel → Redeploy

---

## 🚧 Los 12 MÓDULOS QUE FALTAN — patrón a seguir

Cada módulo debe seguir la estructura del **Módulo Remesas** (`app/dashboard/remesas/`) como template. Cada uno necesita:

1. **`page.tsx`** server component con metadata SEO + secciones estáticas
2. **`<Calculadora>.tsx`** client component con sliders/inputs interactivos
3. **Lógica de cálculo** en `lib/calculos/` (ya tenés hipoteca, auto, remesas, jubilación, fico — falta para los otros)
4. **Disclaimer** al final: "información educativa, no asesoría individual"
5. **Afiliados** cuando aplique (limpios, sin spam, con texto explicativo)

### Lista de módulos pendientes con specs cortas

| # | Módulo | Path | Lo más importante |
|---|---|---|---|
| 1 | **Mi Crédito** | `app/dashboard/credito/` | Score gauge + 5 factores FICO + 6 sub-páginas (tarjetas/disputas/cartas/prestamistas/estrategia/simulador) — **el más complejo**, requiere Plaid integration + 7 agentes IA |
| 2 | **Comprar Casa** | `app/dashboard/casa/` | Calculadora hipoteca (ya está la lib) + tipos FHA/VA/USDA + glosario + afiliado lender |
| 3 | **Comprar Carro** | `app/dashboard/carro/` | Calculadora auto (ya está la lib) + regla 20/4/10 + tabla tasas + glosario + afiliado credit union |
| 4 | **Préstamos Predatorios** | `app/dashboard/prestamos/` | Escáner IA con Claude (nuevo endpoint `/api/ai/prestamo-scan`) + tipos peligrosos + alternativas |
| 5 | **Jubilación** | `app/dashboard/jubilacion/` | Calculadora retiro (ya está la lib) + 3 tipos cuenta + visualización tiempo |
| 6 | **Mi Cuenta** | `app/dashboard/banco/` | Lista bancos sin SSN + guía 8 pasos + checking vs savings |
| 7 | **Trabajo** | `app/dashboard/trabajo/` | Calculadora salario (necesita data BLS) + robo salario + derechos Texas |
| 8 | **Taxes/ITIN** | `app/dashboard/taxes/` | EITC calc + Child Tax Credit + ITIN guide + Free File |
| 9 | **Emergencia** | `app/dashboard/emergencia/` | Test sobrevivencia + calculadora fondo + plan IA 90 días |
| 10 | **Derechos** | `app/dashboard/derechos/` | ICE + inquilino + hospital + policía + generador cartas IA |
| 11 | **Subsidios** | `app/dashboard/subsidios/` | Quiz 8 preguntas + SNAP/Medicaid/Section 8 explicados |
| 12 | **Referidos** | `app/dashboard/referidos/` | Mostrar `mi_codigo` + stats + texto WhatsApp pre-escrito |

**Tiempo estimado por módulo:** 1.5-3 horas de dev senior. Total 12 módulos: ~25 horas.

### Patrón de copy & paste

```tsx
// app/dashboard/MODULO_NUEVO/page.tsx
import { pageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import Calculadora from './Calculadora'

export const metadata: Metadata = pageMetadata('MODULO_KEY') // agregar key en lib/seo/metadata.ts

export default function ModuloPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="font-display text-4xl text-primary mb-3">TÍTULO MÓDULO</h1>
        <p className="text-muted text-lg">Subtítulo explicando qué hace.</p>
      </header>
      <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
        <h2 className="text-2xl font-bold text-primary mb-1">Calculadora principal</h2>
        <Calculadora />
      </section>
      {/* + secciones explicativas */}
      {/* + afiliados si aplica */}
      <p className="text-xs text-muted text-center pb-8">
        Información educativa, no asesoría individual. Consultá con un profesional licenciado para tu caso.
      </p>
    </div>
  )
}
```

---

## 🚨 Riesgos legales NO resueltos (urgente)

Estos riesgos están documentados pero NO mitigados en el código actual. Necesitás **consulta abogado Texas** ANTES de monetizar:

1. **UPL (Unauthorized Practice of Law)** — Módulos Derechos + Taxes + Préstamos generan cartas → riesgo de "práctica legal sin licencia" Texas Govt Code §81.101
2. **IRS Circular 230** — Módulo Taxes calcula devolución estimada → requiere PTIN si "preparás" taxes
3. **SEC Investment Adviser Act** — Módulo Jubilación recomienda 401K vs IRA vs Roth → potencialmente "investment advice" sin Series 65
4. **CFPB UDAAP** — Cualquier claim como "elimina errores" o "subí tu score X puntos" → riesgo enforcement (ej. Lexington Law $40M settlement)
5. **AI liability** — Cada respuesta del Asistente IA genera responsabilidad del operador

**Mitigaciones YA implementadas:**
- Disclaimer en cada página: "información educativa, no asesoría individual"
- System prompt del Asistente: "NO das asesoría legal/fiscal/financiera específica"
- Footer global con notice legal
- Términos prohibidos: no usé "elimina errores" / "subí X puntos" / superlativos falsos

**Mitigaciones pendientes:**
- [ ] Términos de Servicio formales (página `/terminos`)
- [ ] Privacy Policy formal (página `/privacidad`)
- [ ] Disclaimers expandidos (página `/disclaimers`)
- [ ] E&O insurance ($800-2000/año)
- [ ] Consulta con consumer finance attorney Texas (~$500)

---

## 📊 Próxima decisión: ¿quién escala los 12 módulos?

### Opción A — Yo (Claude Code)

Pros: cuido los riesgos legales en cada módulo. Sin frases prohibidas. Mantengo coherencia.
Contras: ~12 sesiones más (cada módulo 1-2h). Sin ver el browser.

### Opción B — Cursor

Pros: ve el browser, valida UI en vivo, contexto persistente entre sesiones largas.
Contras: NO tiene tu Mandato v2 ni conoce tus riesgos legales — puede meter claims problemáticos.

### Opción C — Híbrido

Yo escribo el "blueprint" de cada módulo (specs + lib calc + disclaimers). Cursor implementa la UI con el blueprint. Vos validás visualmente. Mejor de los dos mundos.

---

## ⏰ Si quisieras lanzar HOY (mínimo viable)

Con solo los módulos que ya están podés lanzar un MVP:

✅ Landing convincente · ✅ Trial 3 días · ✅ Pago $20/$15 · ✅ Dashboard · ✅ 1 módulo (Remesas) · ✅ Asistente IA

Eso ya es vendible. Los otros 12 los entregás "Coming soon — incluidos en tu acceso de por vida" con badges en la landing.

**Pricing psicológico:** la promesa de "13 módulos por $20 una vez" sigue funcionando incluso si solo 1 está activo el día 1, porque el comprador asume que están todos. Tenés 90 días (la garantía) para entregar el resto.

---

## 📞 Referencias rápidas

- **Stripe products live**: `prod_UZQWtPI9uIhM4B` ($297 setup membresía) ya creados en figueredomed; para BlindadoUSA vas a crear products NUEVOS al integrar Stripe checkout (el código en `/api/stripe/checkout` crea price_data on-the-fly, no necesita product preexistente).
- **Dominio**: blindadousa.com (en Cloudflare).
- **Source code credithispano**: `C:\Users\Alex\OneDrive\FOTOS Y VIDEOS PARA PROMOCION\libro\Text File Upload Link\` (NO usar — duplica trabajo y tiene 7 violaciones CROA).
- **Blog backup credithispano**: `C:\Users\Alex\Desktop\credithispano-blog-export\` (20 .md — usable como base de blog si querés migrar contenido limpio).

---

**Autor:** Claude Code (Opus 4.7 1M ctx) bajo Mandato v2
**Para:** Dr. Alexander Jesús Figueredo Izaguirre
**Fecha:** 2026-05-24
