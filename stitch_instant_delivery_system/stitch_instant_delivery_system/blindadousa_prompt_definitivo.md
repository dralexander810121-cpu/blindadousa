# ============================================================
#  BLINDADO USA — PROMPT FINAL PARA CURSOR
#  La Biblia Financiera y Legal del Hispano en USA
#  blindadousa.com — Proyecto independiente
#  Dr. Alexander Jesús Figueredo Izaguirre — Houston, Texas
# ============================================================

## TU ROL

Eres un equipo completo de desarrollo actuando simultáneamente como:
- Arquitecto Full-Stack Senior (Next.js + Supabase + Stripe)
- Experto SEO en español (Google ranking #1 para hispanos USA)
- UX/UI Designer (diseño para usuarios con educación básica)
- Consultor de Monetización (maximizar revenue desde día 1)
- DevOps (Vercel + Cloudflare + DNS)

Construyes BlindadoUSA.com desde CERO. Sin placeholders. Sin TODOs.
Código 100% funcional en cada archivo que crees.

---

## QUÉ ES BLINDADO USA

Una plataforma web en español para hispanos en Estados Unidos que en
lenguaje simple, visual e interactivo les enseña sus derechos financieros
y legales. La biblia del hispano en USA. El recurso que nadie más les da.

**Referencia visual y funcional:** credithispano.com era una app básica
de mejora de crédito (React/Vite, título "Credit Med"). BlindadoUSA la
supera completamente — es 10 veces más completa, más bonita y más útil.

---

## MODELO DE NEGOCIO — GRÁBALO EN TODO EL SISTEMA

```
ACCESO GRATUITO:   3 días de prueba (trial completo, todas las funciones)
ACCESO COMPLETO:   $20 pago único de por vida
CÓDIGO AETHERIS:   Descuento especial → solo $15 (código fijo: AETHERIS)
REFERIDOS PROPIOS: Cada usuario recibe su código único para compartir
                   Sus amigos pagan $15 en vez de $20

REVENUE ADICIONAL (el más importante a largo plazo):
→ Directorio de negocios verificados: abogados de inmigración,
  bancos y credit unions, dealers de carros, notarios, agencias
  de seguros, realtors. Ellos pagan mensualmente para aparecer.
  Tier básico $49/mes | Tier destacado $149/mes | Tier premium $349/mes
```

---

## STACK TECNOLÓGICO

```
Frontend:    Next.js 14 App Router + TypeScript + Tailwind CSS
Base datos:  Supabase (PostgreSQL + Auth + Realtime + Storage)
Pagos:       Stripe (checkout + webhooks)
IA:          Anthropic Claude API claude-sonnet-4-20250514
Emails:      Resend API
Deploy:      Vercel
DNS/CDN:     Cloudflare (dominio: blindadousa.com)
Analytics:   Vercel Analytics + Google Tag Manager
```

---

## SISTEMA DE DISEÑO — IDENTIDAD VISUAL COMPLETA

### Paleta
```css
--primary:       #1B4332   /* Verde oscuro — confianza, seriedad */
--primary-mid:   #2D6A4F   /* Verde medio */
--primary-light: #40916C   /* Verde claro */
--pale-green:    #D8F3DC   /* Fondos de sección */
--accent:        #F4A261   /* Naranja — CTAs, urgencia */
--accent-dark:   #E76F51   /* Naranja oscuro — hover */
--gold:          #FFB703   /* Dorado — premium, logros */
--danger:        #D62828   /* Rojo — alertas críticas */
--warning:       #F77F00   /* Naranja — cuidado */
--success:       #52B788   /* Verde — bien, correcto */
--dark:          #1A1A2E   /* Texto principal */
--gray:          #6B7280   /* Texto secundario */
--light:         #F9FAFB   /* Fondos */
--white:         #FFFFFF
--gradient-hero: linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #40916C 100%)
```

### Tipografía
```
Display:   'Bebas Neue' (Google Fonts) — números grandes, scores, impacto
Headings:  'Inter' 700 — títulos
Body:      'Inter' 400/500 — todo el texto
Números:   'JetBrains Mono' — precios, porcentajes, scores
```

### Reglas de diseño obligatorias (NUNCA violar)
```
✓ Texto mínimo 16px — usuario lee en celular
✓ Botones mínimo 48px de alto — fácil tocar con dedo
✓ Mobile-first en TODO
✓ Semáforo visual en cada resultado: 🔴 peligro 🟡 cuidado 🟢 bien
✓ Cada número acompañado de explicación en texto simple
✓ Cada concepto técnico con ejemplo: "Por ejemplo: si tienes $200..."
✓ Loading skeletons en toda sección asíncrona
✓ Errores en español simple, nunca mensajes técnicos
✓ Contraste WCAG AA mínimo
✓ Íconos siempre con etiqueta de texto debajo
```

---

## ESTRUCTURA COMPLETA DEL PROYECTO

```
blindadousa/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    ← Landing principal
│   │   ├── layout.tsx                  ← Layout público con SEO
│   │   ├── como-funciona/page.tsx
│   │   ├── precios/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx                ← Lista de artículos
│   │   │   └── [slug]/page.tsx         ← Artículo individual
│   │   └── directorio/
│   │       ├── page.tsx                ← Directorio de negocios
│   │       ├── abogados/page.tsx
│   │       ├── bancos/page.tsx
│   │       ├── dealers/page.tsx
│   │       ├── realtors/page.tsx
│   │       └── notarios/page.tsx
│   ├── (auth)/
│   │   ├── registrarse/page.tsx
│   │   ├── entrar/page.tsx
│   │   └── recuperar/page.tsx
│   ├── trial/
│   │   └── page.tsx                    ← Activar trial de 3 días
│   ├── pagar/
│   │   ├── page.tsx                    ← Checkout $20 o $15
│   │   └── exito/page.tsx              ← Confirmación post-pago
│   ├── dashboard/
│   │   ├── layout.tsx                  ← Sidebar + header
│   │   ├── page.tsx                    ← Panel principal
│   │   ├── credito/
│   │   │   ├── page.tsx                ← Mi score y plan
│   │   │   ├── tarjetas/page.tsx       ← Mis tarjetas (Plaid)
│   │   │   ├── disputas/page.tsx       ← Disputas a burós
│   │   │   ├── cartas/page.tsx         ← Cartas generadas
│   │   │   ├── prestamistas/page.tsx   ← Lenders encontrados
│   │   │   ├── estrategia/page.tsx     ← Plan hardship
│   │   │   └── simulador/page.tsx      ← Simulador de score
│   │   ├── casa/page.tsx
│   │   ├── carro/page.tsx
│   │   ├── remesas/page.tsx
│   │   ├── prestamos/page.tsx
│   │   ├── jubilacion/page.tsx
│   │   ├── banco/page.tsx
│   │   ├── trabajo/page.tsx
│   │   ├── taxes/page.tsx
│   │   ├── emergencia/page.tsx
│   │   ├── derechos/page.tsx
│   │   ├── subsidios/page.tsx
│   │   ├── asistente/page.tsx          ← Chat IA 24/7
│   │   └── referidos/page.tsx          ← Mi código + stats
│   ├── api/
│   │   ├── stripe/
│   │   │   ├── checkout/route.ts
│   │   │   ├── webhook/route.ts
│   │   │   └── portal/route.ts
│   │   ├── trial/
│   │   │   └── activar/route.ts
│   │   ├── ai/
│   │   │   ├── asistente/route.ts
│   │   │   ├── disputa/route.ts
│   │   │   ├── carta/route.ts
│   │   │   ├── prestamo-scan/route.ts
│   │   │   ├── plan-emergencia/route.ts
│   │   │   ├── optimizer/route.ts
│   │   │   └── simulador/route.ts
│   │   ├── plaid/
│   │   │   ├── create-link-token/route.ts
│   │   │   ├── exchange-token/route.ts
│   │   │   └── sync/route.ts
│   │   ├── referidos/
│   │   │   ├── validar/route.ts
│   │   │   └── generar/route.ts
│   │   ├── directorio/
│   │   │   └── negocios/route.ts
│   │   └── blog/
│   │       └── posts/route.ts
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── ScoreGauge.tsx
│   │   ├── SemaforoResultado.tsx
│   │   ├── CalculadoraSlider.tsx
│   │   ├── EjemploReal.tsx
│   │   ├── TerminoLegal.tsx
│   │   ├── AfiliacionCard.tsx
│   │   └── BotonPrincipal.tsx
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── SeccionProblema.tsx
│   │   ├── SeccionModulos.tsx
│   │   ├── SeccionPrecio.tsx
│   │   ├── SeccionTestimonios.tsx
│   │   ├── SeccionFAQ.tsx
│   │   └── Footer.tsx
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── HeaderDash.tsx
│   │   ├── BannerTrial.tsx            ← Banner cuando está en trial
│   │   └── AsistenteFlotante.tsx      ← Botón chat siempre visible
│   └── directorio/
│       ├── NegocioCard.tsx
│       └── FiltroDirectorio.tsx
├── lib/
│   ├── anthropic.ts
│   ├── stripe.ts
│   ├── plaid.ts
│   ├── resend.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── seo/
│   │   └── metadata.ts
│   └── calculos/
│       ├── hipoteca.ts
│       ├── auto.ts
│       ├── remesas.ts
│       ├── jubilacion.ts
│       └── fico.ts
└── supabase/
    └── migrations/
        └── 001_schema_completo.sql
```

---

## BASE DE DATOS — SCHEMA COMPLETO

```sql
-- ================================================
-- BLINDADO USA — Schema completo v1.0
-- ================================================

-- USUARIOS
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  nombre TEXT,
  estado TEXT DEFAULT 'TX',
  stripe_customer_id TEXT,
  -- Trial
  trial_activo BOOLEAN DEFAULT FALSE,
  trial_inicio TIMESTAMPTZ,
  trial_fin TIMESTAMPTZ,          -- trial_inicio + 3 días
  trial_usado BOOLEAN DEFAULT FALSE,
  -- Acceso
  acceso_pagado BOOLEAN DEFAULT FALSE,
  fecha_pago TIMESTAMPTZ,
  precio_pagado DECIMAL(6,2),
  -- Referidos
  codigo_usado TEXT,               -- código que usó al pagar (AETHERIS u otro)
  mi_codigo TEXT UNIQUE,           -- su código personal para compartir
  referidos_count INTEGER DEFAULT 0,
  -- Meta
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- REFERIDOS (tracking)
CREATE TABLE referidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo TEXT NOT NULL,
  referidor_id UUID REFERENCES usuarios(id),
  referido_id UUID REFERENCES usuarios(id),
  precio_pagado DECIMAL(6,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PERFIL FINANCIERO
CREATE TABLE perfil_financiero (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id) UNIQUE,
  credit_score INTEGER,
  ingreso_mensual DECIMAL(10,2),
  gastos_mensuales DECIMAL(10,2),
  deuda_total DECIMAL(10,2),
  tiene_ssn BOOLEAN,
  tiene_itin BOOLEAN,
  tiene_cuenta_banco BOOLEAN,
  envia_remesas BOOLEAN,
  monto_remesas DECIMAL(10,2),
  pais_remesas TEXT,
  tiene_carro BOOLEAN,
  tiene_casa BOOLEAN,
  mayor_preocupacion TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TARJETAS CONECTADAS (Plaid)
CREATE TABLE cuentas_conectadas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  plaid_account_id TEXT UNIQUE NOT NULL,
  plaid_item_id TEXT NOT NULL,
  plaid_access_token TEXT NOT NULL,
  institucion TEXT,
  nombre_cuenta TEXT,
  tipo TEXT,                  -- credit, checking, savings
  mask TEXT,
  balance_actual DECIMAL(10,2) DEFAULT 0,
  credito_disponible DECIMAL(10,2) DEFAULT 0,
  limite_credito DECIMAL(10,2) DEFAULT 0,
  pago_minimo DECIMAL(10,2) DEFAULT 0,
  fecha_pago DATE,
  fecha_corte DATE,
  apr DECIMAL(5,2) DEFAULT 0,
  utilizacion DECIMAL(5,2) DEFAULT 0,
  last_sync TIMESTAMPTZ,
  activa BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RECOMENDACIONES DE PAGO (Agente Optimizador)
CREATE TABLE recomendaciones_pago (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cuenta_id UUID REFERENCES cuentas_conectadas(id),
  monto_recomendado DECIMAL(10,2),
  fecha_optima DATE,
  utilizacion_proyectada DECIMAL(5,2),
  impacto_score_estimado INTEGER,
  razonamiento TEXT,
  estado TEXT DEFAULT 'pendiente',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ALERTAS
CREATE TABLE alertas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  tipo TEXT,
  titulo TEXT,
  mensaje TEXT,
  nivel TEXT DEFAULT 'amarillo',  -- rojo, amarillo, verde
  leida BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DISPUTAS DE CRÉDITO
CREATE TABLE disputas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  buro TEXT,
  cuenta TEXT,
  tipo_disputa TEXT,
  descripcion TEXT,
  ley_aplicable TEXT,
  severidad TEXT DEFAULT 'media',
  estado TEXT DEFAULT 'identificada',
  carta_id UUID,
  impacto_estimado INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CARTAS GENERADAS
CREATE TABLE cartas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  disputa_id UUID REFERENCES disputas(id),
  tipo TEXT,
  destinatario TEXT,
  direccion_destinatario TEXT,
  asunto TEXT,
  cuerpo TEXT,
  citas_legales TEXT[],
  estado TEXT DEFAULT 'borrador',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  enviada_at TIMESTAMPTZ
);

-- PRESTAMISTAS ENCONTRADOS (Agente 5)
CREATE TABLE prestamistas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  tipo TEXT,
  producto TEXT,
  score_minimo INTEGER,
  apr_min DECIMAL(5,2),
  apr_max DECIMAL(5,2),
  monto_min DECIMAL(10,2),
  monto_max DECIMAL(10,2),
  soft_pull BOOLEAN DEFAULT FALSE,
  url_aplicacion TEXT,
  match_score INTEGER DEFAULT 0,
  razonamiento TEXT,
  encontrado_at TIMESTAMPTZ DEFAULT NOW(),
  activo BOOLEAN DEFAULT TRUE
);

-- ESCÁNER DE PRÉSTAMOS PREDATORIOS
CREATE TABLE escaneos_prestamos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  monto DECIMAL(10,2),
  tasa_ofrecida DECIMAL(5,2),
  plazo_meses INTEGER,
  pago_mensual DECIMAL(10,2),
  apr_real DECIMAL(5,2),
  total_a_pagar DECIMAL(10,2),
  veredicto TEXT,            -- razonable, abusivo, muy_abusivo
  exceso_vs_justo DECIMAL(10,2),
  analisis_ia TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ESTRATEGIAS DE DEUDA (Agente Hardship)
CREATE TABLE estrategias_deuda (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  escenario TEXT,
  ingreso_mensual DECIMAL(10,2),
  gastos_mensuales DECIMAL(10,2),
  deuda_total DECIMAL(10,2),
  dti DECIMAL(5,2),
  resumen TEXT,
  pasos JSONB DEFAULT '[]',
  nivel_riesgo TEXT DEFAULT 'medio',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SIMULACIONES DE SCORE
CREATE TABLE simulaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  escenario TEXT,
  score_actual INTEGER,
  score_proyectado INTEGER,
  delta INTEGER,
  factores JSONB DEFAULT '[]',
  tiempo_impacto TEXT,
  confianza TEXT DEFAULT 'media',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CÁLCULOS GUARDADOS
CREATE TABLE calculos_guardados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  tipo TEXT,       -- casa, carro, remesa, jubilacion, emergencia
  nombre TEXT,
  datos JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CHAT CON IA
CREATE TABLE chat_historial (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  modulo TEXT DEFAULT 'asistente',
  rol TEXT,        -- user, assistant
  mensaje TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LOG DE AGENTES IA
CREATE TABLE agente_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agente TEXT,
  accion TEXT,
  resultado TEXT,
  items INTEGER DEFAULT 0,
  error TEXT,
  duracion_ms INTEGER,
  ran_at TIMESTAMPTZ DEFAULT NOW()
);

-- DIRECTORIO DE NEGOCIOS (B2B — pagan para aparecer)
CREATE TABLE directorio_negocios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  categoria TEXT,    -- abogado, banco, dealer, realtor, notario, seguro
  descripcion TEXT,
  direccion TEXT,
  ciudad TEXT,
  estado TEXT DEFAULT 'TX',
  telefono TEXT,
  email TEXT,
  website TEXT,
  idiomas TEXT[],
  acepta_itin BOOLEAN DEFAULT FALSE,
  acepta_sin_ssn BOOLEAN DEFAULT FALSE,
  plan TEXT DEFAULT 'basico',   -- basico $49, destacado $149, premium $349
  stripe_subscription_id TEXT,
  verificado BOOLEAN DEFAULT FALSE,
  activo BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CLICKS A AFILIADOS (tracking revenue)
CREATE TABLE afiliado_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  servicio TEXT,
  negocio_id UUID REFERENCES directorio_negocios(id),
  url_destino TEXT,
  converted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ARTÍCULOS DE BLOG (SEO)
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  descripcion TEXT,
  contenido TEXT,
  categoria TEXT,
  imagen_url TEXT,
  publicado BOOLEAN DEFAULT FALSE,
  publicado_at TIMESTAMPTZ,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS en todas las tablas
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE referidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfil_financiero ENABLE ROW LEVEL SECURITY;
ALTER TABLE cuentas_conectadas ENABLE ROW LEVEL SECURITY;
ALTER TABLE recomendaciones_pago ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputas ENABLE ROW LEVEL SECURITY;
ALTER TABLE cartas ENABLE ROW LEVEL SECURITY;
ALTER TABLE escaneos_prestamos ENABLE ROW LEVEL SECURITY;
ALTER TABLE estrategias_deuda ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculos_guardados ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_historial ENABLE ROW LEVEL SECURITY;
ALTER TABLE afiliado_clicks ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso
CREATE POLICY "propio" ON usuarios FOR ALL USING (auth.uid() = auth_user_id);
CREATE POLICY "propio" ON perfil_financiero FOR ALL USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
CREATE POLICY "propio" ON cuentas_conectadas FOR ALL USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
CREATE POLICY "propio" ON alertas FOR ALL USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
CREATE POLICY "propio" ON disputas FOR ALL USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
CREATE POLICY "propio" ON cartas FOR ALL USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
CREATE POLICY "propio" ON escaneos_prestamos FOR ALL USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
CREATE POLICY "propio" ON estrategias_deuda FOR ALL USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
CREATE POLICY "propio" ON simulaciones FOR ALL USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
CREATE POLICY "propio" ON calculos_guardados FOR ALL USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
CREATE POLICY "propio" ON chat_historial FOR ALL USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
CREATE POLICY "propio" ON afiliado_clicks FOR ALL USING (auth.uid() = (SELECT auth_user_id FROM usuarios WHERE id = usuario_id));
CREATE POLICY "publico" ON directorio_negocios FOR SELECT USING (activo = TRUE AND verificado = TRUE);
CREATE POLICY "publico" ON blog_posts FOR SELECT USING (publicado = TRUE);
CREATE POLICY "prestamistas_publicos" ON prestamistas FOR SELECT USING (activo = TRUE);
```

---

## MIDDLEWARE — CONTROL DE ACCESO

```typescript
// middleware.ts
// Rutas públicas (sin auth): /, /como-funciona, /precios, /blog, /directorio
// Rutas con auth pero sin pago: /trial (activar prueba), /pagar
// Rutas protegidas (requieren auth + trial_activo O acceso_pagado):
//   /dashboard y todas las subrutas

export async function middleware(request: NextRequest) {
  // 1. Verificar sesión Supabase
  // 2. Si ruta es pública → pasar
  // 3. Si ruta es /dashboard/* y no hay sesión → redirect /entrar
  // 4. Si tiene sesión:
  //    a. Verificar trial_activo (y que trial_fin > now())
  //    b. O verificar acceso_pagado = true
  //    c. Si ninguno → redirect /pagar con banner "Tu trial expiró"
  // 5. Si está en trial: mostrar banner con días restantes (componente BannerTrial)
}
```

---

## SISTEMA DE TRIAL Y PAGOS

### Trial de 3 días

```typescript
// /app/trial/page.tsx
// Pantalla para activar el trial gratis:
// "Prueba BlindadoUSA GRATIS por 3 días"
// "Sin tarjeta de crédito. Acceso completo a todo."
// Botón: "ACTIVAR MI PRUEBA GRATIS"
// → Crea usuario en Supabase Auth si no existe
// → Llama /api/trial/activar
// → Redirige a onboarding → dashboard

// /app/api/trial/activar/route.ts
// POST: verificar que el usuario no haya usado trial antes (trial_usado = false)
// Si no ha usado trial:
//   trial_activo = true
//   trial_inicio = now()
//   trial_fin = now() + 3 días
//   trial_usado = true
//   Enviar email de bienvenida de trial
// Si ya usó trial → mostrar mensaje y redirect a /pagar
```

### Checkout Stripe

```typescript
// /app/pagar/page.tsx
// Formulario con:
// - Email (pre-llenado si ya está logueado)
// - Campo: "¿Tienes un código?" (validación en tiempo real)
//   Códigos aceptados:
//   a. "AETHERIS" → precio $15 (código fijo de la plataforma)
//   b. Código personal de otro usuario → precio $15
//   c. Sin código → precio $20
// - Precio dinámico visible en grande: $20 o $15
// - Botón naranja: "ACCEDER DE POR VIDA — $20" (o $15)
// - Apple Pay / Google Pay cuando disponible
// - Badges: Stripe | SSL | Garantía 30 días

// /app/api/stripe/checkout/route.ts
// 1. Recibir: email, codigo
// 2. Validar código (AETHERIS = válido siempre | código usuario = verificar en BD)
// 3. Precio: código válido = 1500 centavos | sin código = 2000 centavos
// 4. Crear Stripe Checkout Session con metadata: email, codigo
// 5. Retornar { url }

// /app/api/stripe/webhook/route.ts
// Evento: checkout.session.completed
// 1. Verificar firma Stripe
// 2. Obtener email + metadata.codigo
// 3. Actualizar usuario:
//    acceso_pagado = true, fecha_pago = now(), precio_pagado
//    trial_activo = false (ya no necesita trial)
// 4. Generar mi_codigo único: primeras 4 letras del nombre + número random
//    Ejemplo: ALEX1247 | MARIA823 | JOSE4521
// 5. Si hubo código de usuario: incrementar referidos_count del referidor
// 6. Si código = AETHERIS: registrar en tabla referidos con referidor_id = NULL
// 7. Enviar email de bienvenida con Resend
// 8. Crear alerta de bienvenida en tabla alertas
```

---

## LANDING PAGE — CONVERSIÓN MÁXIMA

### /app/(marketing)/page.tsx — ESTRUCTURA COMPLETA

**SECCIÓN HERO**
```
Fondo: gradiente --gradient-hero
Texto encima del headline (badge naranja pequeño):
"🔒 Únete a más de 3,000 hispanos ya Blindados"

Headline (Bebas Neue 64px desktop / 40px móvil, blanco):
"TODO LO QUE NECESITAS SABER
PARA VIVIR BIEN EN USA"
"EN TU IDIOMA. SIN MENTIRAS. SIN ENGAÑOS."

Subheadline (Inter 400, 18px, blanco 80%):
"La guía completa que los bancos, dealers y realtors
no quieren que tengas."

DOS CTAs:
[Botón naranja grande] "EMPIEZA GRATIS — 3 DÍAS SIN TARJETA"
[Texto verde claro abajo] "Después solo $20 de por vida. Con código: $15."

Badges de confianza en fila:
🔒 Sin tarjeta para el trial | ✓ Cancela cuando quieras | 🇺🇸 Hecho para USA
```

**SECCIÓN EL PROBLEMA**
```
Título: "¿Por qué te está yendo mal?"
Subtítulo: "No porque seas menos. Porque nadie te explicó las reglas."

6 tarjetas grandes con ícono + título + 2 líneas:

💳 El crédito
"Te cobran más interés porque no saben tu score ni cómo mejorarlo."

🏠 La casa
"El realtor te vende la más cara que puedes pagar, no la que conviene."

🚗 El carro
"El dealer sabe que el banco aprobó 7% pero te cobra 14%."

💸 Las remesas
"Desde enero 2026 hay impuesto nuevo. El 70% lo paga sin saberlo."

⚖️ El trabajo
"La mitad de hispanos gana menos de lo que le corresponde por ley."

📋 Los taxes
"Miles no reclaman créditos tributarios que son suyos."
```

**SECCIÓN LA SOLUCIÓN (fondo verde pálido)**
```
Título: "BlindadoUSA te lo explica todo"
Subtítulo: "13 módulos. En español. Con calculadoras reales."

Grid de 13 módulos (íconos grandes + nombre + badge):
1. Mi Crédito [CALCULADORA + IA]
2. Comprar Casa [CALCULADORA + GUÍA LEGAL]
3. Comprar Carro [CALCULADORA + GUÍA LEGAL]
4. Remesas 2026 [CALCULADORA + AHORRO]
5. Préstamos Predatorios [ESCÁNER IA]
6. Jubilación / Retiro [CALCULADORA]
7. Mi Primera Cuenta [GUÍA PASO A PASO]
8. Salario Justo [CALCULADORA + DERECHOS]
9. Taxes e ITIN [CALCULADORA + GUÍA]
10. Fondo de Emergencia [PLAN IA]
11. Mis Derechos [GUÍA LEGAL]
12. Subsidios y Ayudas [QUIZ PERSONALIZADO]
13. Asistente IA 24/7 [CHAT EN ESPAÑOL]
```

**SECCIÓN DIRECTORIO**
```
Título: "¿Necesitas un profesional de confianza?"
Subtítulo: "Abogados, bancos, dealers y más. Verificados. En español."

4 categorías en grid con íconos y cantidad de profesionales
Botón: "Ver Directorio Completo →"
```

**SECCIÓN PRECIO**
```
Una caja centrada con sombra verde sutil:

[Texto pequeño gris tachado]: "Servicios similares cobran $297/año"
[Badge rojo]: "Lo que cobran otros por separado"

Precio en grande (Bebas Neue 80px):
$20
[Texto]: "UNA SOLA VEZ. PARA SIEMPRE."

Lista con 13 checkmarks verdes (uno por módulo)

[Botón naranja grande, 100% ancho en móvil]:
"EMPEZAR GRATIS — 3 DÍAS SIN TARJETA"

[Texto verde pequeño]: "Después solo $20. Con código AETHERIS: $15."

Badges: Stripe | SSL | 30 días de garantía
```

**SECCIÓN TESTIMONIOS (3 cards)**

**SECCIÓN FAQ (8 preguntas en accordion)**
```
1. ¿Necesito tarjeta de crédito para el trial?
   No. 3 días gratis sin ingresar ningún dato de pago.

2. ¿Qué pasa cuando termina el trial?
   Puedes continuar por $20 de por vida o $15 con código.

3. ¿Qué es el código AETHERIS?
   Es un código especial que te da $5 de descuento. Pagas $15 en vez de $20.

4. ¿Puedo conseguir mi propio código de descuento?
   Sí. Después de pagar recibes tu código personal para compartir.

5. ¿La información está actualizada?
   Sí. Se actualiza con cada cambio de ley relevante.

6. ¿Funciona en mi celular?
   Sí. BlindadoUSA funciona perfecto en iPhone y Android.

7. ¿Esto es asesoría legal?
   Es información educativa. Para casos específicos recomendamos un abogado.

8. ¿Tienen garantía?
   Sí. 30 días de garantía total. Te devolvemos el dinero sin preguntas.
```

---

## ONBOARDING — FLUJO POST-REGISTRO

```typescript
// Después de activar trial o después de pagar:
// Pantalla de bienvenida con 5 preguntas rápidas (botones grandes, no texto):

// P1: ¿En qué estado vives?
// [Texas] [Florida] [California] [Nueva York] [Otro]

// P2: ¿Tienes número de Seguro Social (SSN)?
// [Sí, tengo SSN] [No, tengo ITIN] [Ninguno todavía]

// P3: ¿Tienes cuenta de banco en USA?
// [Sí] [No] [Estoy abriendo una]

// P4: Más o menos, ¿cuánto ganas al mes?
// [Menos de $2,000] [$2,000-$4,000] [$4,000-$7,000] [Más de $7,000]

// P5: ¿Cuál es tu mayor preocupación ahora mismo?
// [Mi crédito] [Comprar casa] [Comprar carro]
// [Mandar remesas] [Mis taxes] [Mis derechos]

// → Guardar en perfil_financiero
// → Llevar al módulo más relevante según respuesta P5
// → Mostrar dashboard personalizado
```

---

## DASHBOARD PRINCIPAL

```typescript
// /app/dashboard/page.tsx

// HEADER DEL DASHBOARD
// "Hola, [nombre] 👋" + fecha
// Si está en trial: BannerTrial (amarillo, días restantes)
// Botón "Ir a pagar" si quedan menos de 24h de trial

// BANNER DE TRIAL (componente BannerTrial)
// Fondo amarillo suave con borde naranja
// "⏰ Te quedan X días de prueba gratis"
// Botón: "Continuar por $20" | "Usar código AETHERIS → $15"

// RESUMEN EN 4 MÉTRICAS
// [Score de crédito] [Alertas activas] [Días de trial / Miembro] [Módulos explorados]

// ALERTAS ACTIVAS (si las hay)
// Lista de alertas con semáforo visual

// GRID DE 13 MÓDULOS
// Íconos grandes, nombre, descripción en 1 línea
// Estado: "Por explorar" | "Visitado" | "✓ Completado"

// ASISTENTE IA FLOTANTE
// Botón circular fijo en esquina inferior derecha
// Ícono de chat + badge si hay respuesta nueva
```

---

## LOS 13 MÓDULOS — ESPECIFICACIONES TÉCNICAS

### MÓDULO 1 — MI CRÉDITO (el más completo)

Tiene 6 sub-páginas. Es el corazón de la plataforma.

**/dashboard/credito/page.tsx — Panel de crédito**
```
1. SCORE GAUGE ANIMADO
   Arco SVG 180° con color por rango
   Número grande en Bebas Neue
   Etiqueta: Poor/Fair/Good/Very Good/Exceptional en español
   Delta vs mes anterior

2. LOS 5 FACTORES FICO (barras visuales + explicación simple)
   ¿Pagas a tiempo? (35%) → barra verde/roja + "Tienes X pagos tarde"
   ¿Cuánto debes vs cuánto puedes? (30%) → barra con % utilización
   ¿Cuánto tiempo llevas? (15%) → fecha apertura cuenta más antigua
   ¿Pediste crédito nuevo? (10%) → hard pulls recientes
   ¿Tienes variedad? (10%) → tipos de crédito

3. PLAN DE MEJORA PERSONALIZADO (IA)
   Botón: "¿Qué hago PRIMERO para subir mi score?"
   Claude analiza el perfil → 3 acciones ordenadas por impacto
   Cada acción: qué hacer + por qué + cuántos puntos puede subir

4. ACCESO RÁPIDO A HERRAMIENTAS
   4 botones: "Conectar Tarjeta" | "Buscar Disputas" | "Ver Cartas" | "Simular"
```

**/dashboard/credito/tarjetas/page.tsx — Mis tarjetas (Plaid)**
```
Botón Plaid Link para conectar cuentas
Grid de tarjetas con:
  - Visualización estilo tarjeta física
  - Balance actual / límite
  - Barra de utilización con semáforo
  - Fecha de pago y fecha de corte
  - Pago mínimo
Panel "Pago Óptimo" del Agente 2:
  - Cuánto pagar en cada tarjeta
  - Fecha ideal para pagarlo (antes del corte)
  - Impacto estimado en el score
```

**/dashboard/credito/disputas/page.tsx — Disputas**
```
Herramienta para ingresar ítems del reporte
Agente IA (Claude) analiza y detecta:
  - Errores factuales
  - Violaciones de FCRA
  - Deudas fuera del statute of limitations (4 años Texas)
  - Duplicados entre los 3 burós
  - Deudas no reconocidas
Lista de disputas encontradas con severidad + botón "Generar carta"
```

**/dashboard/credito/cartas/page.tsx — Cartas**
```
Lista de cartas generadas
Vista previa en modal
Tipos: disputa_buro, goodwill, debt_validation, settlement, hardship
Instrucciones de envío (dirección exacta del buró + USPS Certified Mail)
Descarga como PDF
```

**/dashboard/credito/prestamistas/page.tsx — Prestamistas**
```
Tabla de lenders con match score
Filtros: tipo, APR, monto, soft pull
Badge "Soft Pull" donde aplica
Botón "Buscar ahora" → Agente 5 (Claude + web search)
```

**/dashboard/credito/simulador/page.tsx — Simulador**
```
Campo libre: "¿Qué pasa si...?"
Presets: pago todas al 10% | nueva tarjeta | pago deuda antigua | hard pull nuevo
Resultado: score actual → score proyectado (animado) + delta + factores + tiempo
```

---

### MÓDULO 2 — COMPRAR CASA (/dashboard/casa)
```
1. Calculadora hipoteca completa
   Sliders: precio ($100K-$800K), score (500-850), plazo (15/20/30 años)
   Selector tipo préstamo: FHA / Convencional / VA / USDA
   Resultados: PITI real, costos de cierre, DTI, elegibilidad
   Botón "Guardar este cálculo"

2. Tipos de préstamo explicados (accordion visual)
   FHA: "Solo 3.5% de enganche. Mínimo 580 de score."
   Con ejemplo de dólares reales según el precio ingresado

3. Proceso de compra paso a paso (timeline visual de 8 pasos)

4. Lo que el realtor NO puede hacer legalmente (6 cards)

5. Calculadora "¿Estoy listo para comprar?" (semáforo final)

6. Glosario (30 términos: inglés + español simple + ejemplo)

7. Afiliado: "Precalifica sin afectar tu score →"
```

### MÓDULO 3 — COMPRAR CARRO (/dashboard/carro)
```
1. Calculadora principal
   Sliders: precio, score, down %, trade-in, ingreso, plazo
   Tasa APR automática según score
   Regla 20/4/10 con semáforo
   Alerta si plazo >72 meses

2. Tabla de tasas reales por score (visual con highlights)

3. Calculadora del precio justo (marca/modelo/año → rango de mercado)

4. Lo que el dealer NO puede hacer (6 trucos con guion de respuesta)

5. Glosario del carro (20 términos)

6. Afiliado: credit union con mejores tasas
```

### MÓDULO 4 — REMESAS (/dashboard/remesas)
```
1. Banner alerta en rojo: "Impuesto activo desde enero 2026"

2. Calculadora principal
   Input: monto mensual + método (efectivo vs banco/tarjeta)
   Output: cuánto paga de impuesto al año + cuánto ahorra cambiando

3. Comparador de servicios (Wise, Remitly, Western Union, MoneyGram)
   Tabla: tarifa + tiempo + ¿paga impuesto? + app en español
   Links de afiliado con tracking

4. Calculadora "¿Cuánto llega realmente?"
```

### MÓDULO 5 — PRÉSTAMOS PREDATORIOS (/dashboard/prestamos)
```
1. EL ESCÁNER (herramienta principal)
   Inputs: monto, tasa que te dijeron, pagos, cuota mensual
   Claude calcula APR real y veredicto
   Resultado grande: RAZONABLE / ABUSIVO / MUY ABUSIVO
   Cuánto pagaría de más vs préstamo justo
   Alternativas legales sugeridas

2. Tipos de préstamos peligrosos con gráfica del ciclo de deuda
   Payday loans | Title loans | Rent-to-own | Tax refund loans

3. Tus derechos con los cobradores (FDCPA simple)

4. Generador de carta "Cese y Desista" (Claude)
```

### MÓDULO 6 — JUBILACIÓN (/dashboard/jubilacion)
```
1. Dato impactante: "8 de cada 10 hispanos millennials no tiene NADA ahorrado"

2. Calculadora de retiro
   Sliders: edad actual, edad de retiro, ingreso, ahorro mensual actual
   Gráfica: crecimiento del ahorro en el tiempo

3. Los 3 tipos de cuenta explicados como si fuera a un niño
   401K | IRA Regular | Roth IRA

4. El poder del tiempo (comparación visual animada)

5. Afiliados: Acorns "Empieza con $5" | Betterment
```

### MÓDULO 7 — MI PRIMERA CUENTA (/dashboard/banco)
```
1. "¿Necesito SSN para abrir cuenta?" → NO en grande y verde

2. Lista de bancos que aceptan ITIN/pasaporte/matrícula consular
   Cards con logo, requisitos y link

3. Guía 8 pasos para abrir la primera cuenta

4. Checking vs Savings (analogía: billetera vs alcancía)

5. Cómo la cuenta construye tu crédito (flecha visual)
```

### MÓDULO 8 — SALARIO JUSTO (/dashboard/trabajo)
```
1. Calculadora de salario justo
   Dropdown: 50+ ocupaciones comunes para hispanos
   Input: ciudad + experiencia
   Output: salario mercado vs lo que ganas (semáforo)

2. Calculadora de robo de salario
   Horas trabajadas vs horas pagadas → cuánto te deben al año

3. Derechos laborales en Texas (6 cards con ley aplicable)

4. Agencias que te protegen con links directos
   EEOC | TWC | NLRB | OSHA

5. Afiliado: abogado laboral de contingencia
```

### MÓDULO 9 — TAXES E ITIN (/dashboard/taxes)
```
1. "¿Necesito declarar sin SSN?" → SÍ con explicación

2. Qué es el ITIN y cómo obtenerlo (5 pasos)

3. Créditos tributarios que puedes reclamar
   EITC + Child Tax Credit + Child Care (calculadoras)

4. Calculadora de devolución estimada

5. Cómo declarar GRATIS (IRS Free File + VITA)

6. Afiliados: TurboTax | H&R Block
```

### MÓDULO 10 — EMERGENCIA (/dashboard/emergencia)
```
1. Test: "¿Cuánto tiempo sobrevivirías sin trabajo?" (semáforo)

2. Calculadora del fondo
   Gastos fijos → meta $1K → 1 mes → 3 meses
   Cuánto ahorrar por semana

3. Plan 90 días generado por Claude (personalizado)

4. Emergencia vs No-emergencia (visual)

5. Dónde guardar el fondo (high-yield savings)
```

### MÓDULO 11 — MIS DERECHOS (/dashboard/derechos)
```
1. Si ICE llega a tu casa/trabajo (instrucciones simples + guardable en cel)

2. Derechos como inquilino en Texas

3. Derechos en el hospital (intérprete gratis, charity care)

4. Derechos con la policía (4ta y 5ta enmienda, simple)

5. Generador de cartas de queja con Claude
   Para: landlord, empleador, hospital, colector, empresa de servicios
```

### MÓDULO 12 — SUBSIDIOS (/dashboard/subsidios)
```
1. Quiz de 8 preguntas → lista personalizada de programas

2. Los programas explicados:
   SNAP | Medicaid/CHIP | Section 8 | WIC | LIHEAP | Head Start
   Para cada uno: qué es + quién califica + cómo aplicar + ¿afecta estatus?

3. "¿Usar esto me afecta para la residencia?" (Public Charge 2026)

4. Mapa de recursos en Texas por ciudad
```

### MÓDULO 13 — ASISTENTE BLINDADO (/dashboard/asistente)
```
Chat limpio estilo WhatsApp con Claude.

Prompt del sistema para Claude:
"Eres Blindado, el asistente personal de BlindadoUSA. Ayudas a hispanos
en USA a entender sus derechos financieros y legales.

CÓMO HABLAS:
- Español simple, nivel 5to grado
- Sin palabras difíciles (si usas una, la explicas)
- Con ejemplos de vida real y números concretos
- Con empatía — el usuario probablemente está estresado
- Directo — respuesta concreta primero, luego la explicación

LO QUE PUEDES HACER:
Crédito FICO, hipotecas, préstamos de auto, remesas, préstamos predatorios,
derechos laborales Texas, taxes con ITIN, subsidios disponibles,
derechos como inquilino, derechos con la policía, jubilación.

LO QUE NO HACES:
Asesoría legal específica (siempre recomendar abogado).
Garantizar resultados. Mencionar empresas por nombre negativamente.

SIEMPRE TERMINA CON:
Una acción concreta que el usuario puede hacer HOY."

Funcionalidades del chat:
- Historial guardado entre sesiones
- Sugerencias de preguntas al inicio (chips clickeables)
- Botón "Guardar esta respuesta" → PDF
- Botón "Compartir por WhatsApp"
- Indicador de escritura animado
- Botón flotante en TODAS las páginas del dashboard (56px, esquina inferior derecha)
```

---

## DIRECTORIO DE NEGOCIOS (B2B — Revenue Recurrente)

### /directorio/page.tsx y subcategorías

```typescript
// El directorio es PÚBLICO — no requiere login ni pago
// Es una herramienta de generación de tráfico orgánico (SEO)
// Y fuente de revenue B2B por suscripciones de negocios

// CATEGORÍAS:
// /directorio/abogados   — Abogados de inmigración y laborales
// /directorio/bancos     — Bancos y credit unions para hispanos
// /directorio/dealers    — Dealers de carros que hablan español
// /directorio/realtors   — Agentes de bienes raíces
// /directorio/notarios   — Notarios certificados

// CADA NEGOCIO MUESTRA:
// Logo | Nombre | Categoría | Ciudad | Teléfono
// Badges: "Habla español" | "Acepta ITIN" | "Sin SSN" | "Verificado ✓"
// Plan destacado: aparece primero + borde dorado
// Plan premium: aparece primero + borde dorado + descripción larga + fotos

// PLANES DE LISTING (stripe suscripción mensual):
// Básico $49/mes     → listado simple, aparece en categoría
// Destacado $149/mes → primeros 3 lugares, borde dorado, logo grande
// Premium $349/mes   → primero siempre, fotos, descripción larga, badge "Premium"

// CTA PARA NEGOCIOS:
// Banner en el directorio: "¿Eres un profesional? Aparece aquí →"
// Formulario de registro para negocios → Stripe suscripción
```

---

## BLOG (SEO — Tráfico Orgánico)

```typescript
// /blog/page.tsx — Lista de artículos con:
// Imagen | Título | Categoría | Fecha | Tiempo de lectura

// /blog/[slug]/page.tsx — Artículo individual con:
// Metadata SEO completa
// Schema Article JSON-LD
// CTA al final: "¿Quieres más información como esta? Únete a BlindadoUSA →"

// Categorías de artículos (para SEO):
// "cómo mejorar crédito hispanos usa"
// "comprar casa siendo inmigrante usa"
// "qué es el score fico en español"
// "impuesto remesas 2026 como evitarlo"
// "derechos trabajador hispano texas"
// "subsidios disponibles hispanos texas 2026"
// "como declarar taxes sin ssn"

// Los primeros 10 artículos crearlos con Claude al momento del deploy
// Luego se pueden agregar desde Supabase
```

---

## SEO COMPLETO

### /app/layout.tsx (metadata global)
```typescript
export const metadata: Metadata = {
  title: { default: 'BlindadoUSA', template: '%s | BlindadoUSA' },
  description: 'La guía financiera y legal más completa para hispanos en USA. Crédito, casa, carro, remesas, taxes, derechos. En español sin mentiras. 3 días gratis.',
  keywords: ['credito hispanos usa', 'guia financiera hispanos', 'derechos hispanos estados unidos', 'comprar casa hispano usa', 'prestamos hispanos', 'score credito español', 'taxes itin hispanos', 'subsidios hispanos usa'],
  openGraph: { type: 'website', locale: 'es_US', url: 'https://blindadousa.com', siteName: 'BlindadoUSA' },
  robots: { index: true, follow: true },
  verification: { google: 'PONER_KEY_DE_SEARCH_CONSOLE' },
}
```

### /app/sitemap.ts — Dinámico con blog posts
### /app/robots.ts — Permitir todo excepto /api/ y /dashboard/
### Schema JSON-LD en la landing page (WebApplication + Offer)
### Open Graph images personalizadas por página (/og/*.jpg)

---

## EMAILS CON RESEND

```typescript
// 4 emails automáticos:

// 1. BIENVENIDA TRIAL (inmediato al activar)
// Asunto: "¡Tu prueba gratis está activa! 3 días para explorar todo 🔒"
// Contenido: por dónde empezar, los 3 módulos más útiles

// 2. DÍA 2 DEL TRIAL (recordatorio)
// Asunto: "Te queda 1 día de prueba gratis en BlindadoUSA"
// Contenido: lo que encontraron otros usuarios + CTA a pagar

// 3. EXPIRACIÓN TRIAL (cuando termina)
// Asunto: "Tu acceso gratis terminó — continúa por $20"
// Contenido: resumen de lo que exploró + botón pagar + código AETHERIS

// 4. BIENVENIDA POST-PAGO (inmediato al pagar)
// Asunto: "¡Ya estás Blindado de por vida! 🎉"
// Contenido: tu código personal + texto pre-escrito para WhatsApp + ir al panel
```

---

## SISTEMA DE REFERIDOS

```typescript
// /app/dashboard/referidos/page.tsx

// MI CÓDIGO PERSONAL (generado post-pago)
// Formato: primeras 4 letras del nombre + número (ALEX1247)
// Caja grande con el código + botón "Copiar"

// TEXTO PRE-ESCRITO PARA WHATSAPP (botón directo)
// "Mira esta página que me está ayudando MUCHO.
//  Explica todo para hispanos en USA: crédito, casa, carro, taxes, 
//  tus derechos. En español y sin mentiras.
//  Puedes probarla GRATIS 3 días. Y si quieres quedarte, 
//  con mi código [CÓDIGO] pagas $15 en vez de $20.
//  Entra aquí: blindadousa.com"

// ESTADÍSTICAS
// Total de referidos: X personas
// Tabla: fecha + código usado (sin datos personales del referido)
// Badge si tiene 10+ referidos: "Embajador Blindado 🏆"
```

---

## AGENTES IA — 7 PROCESOS AUTOMATIZADOS

```typescript
// Todos los agentes usan Claude API y logean en tabla agente_log

// AGENTE 1 — Monitor de cuentas
// /api/ai/monitor/route.ts (también como cron Vercel cada 6h)
// Sincroniza Plaid → calcula utilización → genera alertas

// AGENTE 2 — Optimizador de pagos
// /api/ai/optimizer/route.ts
// Calcula monto exacto a pagar por tarjeta para utilización < 8%

// AGENTE 3 — Cazador de disputas
// /api/ai/disputa/route.ts
// Claude analiza reporte → detecta violaciones FCRA → crea disputas en BD

// AGENTE 4 — Redactor de cartas
// /api/ai/carta/route.ts
// Claude genera carta legal completa según tipo de disputa

// AGENTE 5 — Buscador de prestamistas
// /api/ai/prestamistas/route.ts
// Claude + web search → encuentra lenders compatibles con el perfil

// AGENTE 6 — Estrategia de deudas (Hardship)
// /api/ai/hardship/route.ts
// Claude genera plan legal completo según escenario del usuario

// AGENTE 7 — Simulador de score
// /api/ai/simulador/route.ts
// Claude calcula impacto en FICO 8 según pregunta del usuario

// AGENTE 8 — Escáner de préstamos predatorios
// /api/ai/prestamo-scan/route.ts (nuevo para BlindadoUSA)
// Claude analiza términos del préstamo → veredicto + APR real + alternativas

// AGENTE 9 — Plan de emergencia
// /api/ai/plan-emergencia/route.ts (nuevo)
// Claude genera plan de 90 días personalizado según perfil financiero
```

---

## CRONS DE VERCEL (vercel.json)

```json
{
  "crons": [
    { "path": "/api/ai/monitor",          "schedule": "0 */6 * * *"  },
    { "path": "/api/ai/optimizer",        "schedule": "0 8 * * *"    },
    { "path": "/api/ai/prestamistas",     "schedule": "0 10 * * 3"   },
    { "path": "/api/emails/trial-dia2",   "schedule": "0 11 * * *"   },
    { "path": "/api/emails/trial-fin",    "schedule": "0 12 * * *"   },
    { "path": "/api/emails/tip-semanal",  "schedule": "0 10 * * 0"   }
  ]
}
```

---

## VARIABLES DE ENTORNO (.env.local.example)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Anthropic
ANTHROPIC_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Plaid
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=hola@blindadousa.com
RESEND_FROM_NAME=BlindadoUSA

# App
NEXT_PUBLIC_APP_URL=https://blindadousa.com
NEXT_PUBLIC_APP_NAME=BlindadoUSA

# Códigos especiales (hardcoded en la app)
# CÓDIGO FIJO: AETHERIS → $15
# Códigos de usuarios → también $15
# Sin código → $20

# Cron security
CRON_SECRET=
```

---

## CLOUDFLARE — CONFIGURACIÓN DNS

```
Dominio: blindadousa.com (ya registrado)

DNS Records en Cloudflare:
┌────────┬─────────┬──────────────────────────┬──────┬───────┐
│ Tipo   │ Nombre  │ Contenido                │ TTL  │ Proxy │
├────────┼─────────┼──────────────────────────┼──────┼───────┤
│ A      │ @       │ 76.76.21.21              │ Auto │ ON    │
│ CNAME  │ www     │ cname.vercel-dns.com     │ Auto │ ON    │
└────────┴─────────┴──────────────────────────┴──────┴───────┘

En Vercel → Settings → Domains:
Agregar: blindadousa.com
Agregar: www.blindadousa.com
```

---

## ORDEN DE IMPLEMENTACIÓN — PASO A PASO

```
PASO 1:  Schema SQL en Supabase (ejecutar 001_schema_completo.sql)
PASO 2:  Variables de entorno (.env.local)
PASO 3:  lib/ completa (supabase, anthropic, stripe, plaid, resend, calculos)
PASO 4:  Middleware de control de acceso
PASO 5:  Auth: /registrarse, /entrar, /recuperar
PASO 6:  Trial: /trial/page.tsx + /api/trial/activar
PASO 7:  Pago: /pagar + Stripe checkout + webhook
PASO 8:  Landing page completa (marketing)
PASO 9:  Dashboard layout (sidebar con 13 módulos)
PASO 10: Dashboard principal (panel con alertas y grid de módulos)
PASO 11: Módulo Crédito completo (6 sub-páginas + Plaid + 7 agentes)
PASO 12: Módulo Casa (calculadora + guías)
PASO 13: Módulo Carro (calculadora + guías)
PASO 14: Módulo Remesas (calculadora + comparador)
PASO 15: Módulo Préstamos Predatorios (escáner IA)
PASO 16: Módulo Jubilación
PASO 17: Módulo Banco
PASO 18: Módulo Trabajo
PASO 19: Módulo Taxes
PASO 20: Módulo Emergencia
PASO 21: Módulo Derechos
PASO 22: Módulo Subsidios
PASO 23: Asistente IA (chat + botón flotante)
PASO 24: Sistema de referidos
PASO 25: Directorio de negocios (público + B2B stripe)
PASO 26: Blog con 10 artículos SEO iniciales
PASO 27: SEO: sitemap, robots, metadata, schema JSON-LD
PASO 28: Emails con Resend (4 emails automáticos)
PASO 29: Crons de Vercel
PASO 30: DNS en Cloudflare + deploy en Vercel
```

---

## PROYECCIÓN DE INGRESOS

```
FUENTE 1 — ACCESOS ($20/$15):
Mes 1:   200 usuarios × $18 promedio = $3,600
Mes 3:   600 usuarios × $18 promedio = $10,800
Mes 6:  2,000 usuarios × $18 promedio = $36,000 acumulado
Mes 12: 8,000 usuarios × $18 promedio = $144,000 acumulado

FUENTE 2 — DIRECTORIO B2B (mensual recurrente):
10 negocios básicos    × $49  = $490/mes
5  negocios destacados × $149 = $745/mes
3  negocios premium    × $349 = $1,047/mes
Total mes 6: ~$2,282/mes → crece mes a mes

FUENTE 3 — AFILIADOS (comisión por referido):
Wise/Remitly: ~$30/usuario referido
Bancos/neobancos: ~$50/cuenta abierta
Abogados laborales: ~$200/caso referido
Total estimado mes 6: ~$3,000/mes

TOTAL MES 6:   $8,000–$15,000/mes
TOTAL MES 12:  $25,000–$40,000/mes
```

---

## LA REGLA QUE GUÍA TODO EL DESARROLLO

> "Si un hispano de 50 años que llegó hace 2 años,
> que habla poco inglés, que lee en celular y
> que nunca ha usado una app financiera,
> puede entender y usar esto sin ayuda de nadie —
> lo construiste bien.
> Si necesita que alguien le explique,
> hay que rehacerlo."

---

*BlindadoUSA.com*
*La Biblia Financiera y Legal del Hispano en Estados Unidos*
*Desarrollado por Dr. Alexander Jesús Figueredo Izaguirre — Houston, Texas*
*"Porque saber es el primer paso para ser libre"*
