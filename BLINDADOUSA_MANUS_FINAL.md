# ═══════════════════════════════════════════════════════════════
# BLINDADO USA — PROMPT DEFINITIVO FINAL PARA MANUS
# "La IA que protege, guía y administra la vida financiera
#  del hispano en USA. Su Abogado. Su Contador. Su Protector."
# blindadousa.com — Dr. Alexander Jesús Figueredo — Houston, TX
# ═══════════════════════════════════════════════════════════════

---

## VISIÓN DEL PROYECTO — LEER PRIMERO

BlindadoUSA no es una web de información. Es un ecosistema de inteligencia artificial que actúa como el equipo personal completo de cada hispano en USA:

**La IA de BlindadoUSA es simultáneamente:**
- Su abogado de inmigración y laboral
- Su contador y preparador de taxes
- Su asesor financiero personal
- Su negociador de carros, casas y salarios
- Su notario digital
- Su agente de seguros de vida y médico
- Su administrador de tarjetas y cuentas bancarias
- Su guardaespaldas contra estafas y fraudes
- Su recordatorio inteligente de pagos y fechas
- Su generador de documentos legales instantáneos

El usuario solo pone sus datos una vez. La IA hace el resto. Siempre. Automáticamente.

---

## MODELO DE NEGOCIO — CODIFICADO EN CADA LÍNEA

```
TRIAL:          3 días gratis — acceso completo sin tarjeta

MENSUAL:        $20/mes — acceso a todo el ecosistema IA

ANUAL:          $100/año — equivale a $8.33/mes (ahorra $140 vs mensual)

REFERIDOS:      Código único para cada usuario que paga
                Por cada amigo que paga = $5 depositados DIRECTAMENTE
                en la cuenta bancaria del referidor (via Plaid/ACH)
                Sin límite de referidos. El usuario puede ganar más de lo que paga.

DIRECTORIO B2B: Negocios pagan una vez y aparecen de por vida
                Abogados de inmigración:      $500 listing permanente
                Notarios certificados:         $500 listing permanente
                Dealers de carros hispanos:    $500 listing permanente
                Bancos y credit unions:        $500 listing permanente
                Preparadores de taxes:         $500 listing permanente
                Clínicas médicas hispanas:     $500 listing permanente
                Tiendas y negocios hispanos:   $299 listing permanente
                Agentes de seguros:            $500 listing permanente
                Realtors hispanos:             $500 listing permanente
                La IA recomienda negocios del directorio cuando el usuario los necesita
```

---

## REGLAS ABSOLUTAS DE DISEÑO — VIOLACIÓN = REHACER TODO

```
REGLA 1:  Diseño PROFESIONAL OSCURO PREMIUM. Azul marino + negro profundo + dorado.
          NO verde dominante. NO colores de juguetes. NO estética infantil.
          REFERENCIA: Bloomberg Terminal + Apple Dark Mode + Goldman Sachs App.

REGLA 2:  CADA ventana, modal, sección y página tiene imagen 4K de fondo ÚNICA.
          Imágenes: profesionales, corporativas, abstractas financieras o hispanos en contexto real.
          OVERLAY obligatorio: gradiente oscuro semitransparente para legibilidad.
          NUNCA la misma imagen dos veces en toda la plataforma.

REGLA 3:  TODOS los botones: efecto 3D físico real.
          Se "hunden" al hacer clic (translateY + box-shadow inferior oscuro).
          Sombra inferior más oscura que el botón = sensación de relieve físico.

REGLA 4:  TODOS los cards: perspectiva 3D en hover.
          transform: perspective(1000px) rotateX(-3deg) translateY(-8px)
          Borde brillante con gradiente al hacer hover.

REGLA 5:  TODOS los gráficos y tablas: efectos holográficos.
          Líneas de datos con glow neón sutil (azul o dorado).
          Gradientes semitransparentes en barras y áreas.
          Animación de "barrido óptico" al cargar datos.
          Cuadrículas tenues tipo terminal financiero.

REGLA 6:  CERO placeholders. CERO TODOs. Todo funcional al 100%.

REGLA 7:  npm run build → CERO errores antes de terminar.

REGLA 8:  Mobile-first. Todo funciona perfecto en iPhone de 375px.

REGLA 9:  WhatsApp Business API integrado. Alertas importantes van por WhatsApp, no solo email.

REGLA 10: AUTOMATIZACIÓN TOTAL. Cada acción del usuario activa flujos
          automáticos en background sin que el usuario haga nada más.
```

---

## PALETA OFICIAL — FINTECH PREMIUM OSCURO

```css
:root {
  /* === FONDOS OSCUROS PREMIUM === */
  --void:         #020407;
  --deep:         #05080F;
  --rich:         #080D18;
  --elevated:     #0D1525;
  --surface:      #111B30;
  --surface2:     #162238;

  /* === AZULES EJECUTIVOS === */
  --blue-950:     #060E24;
  --blue-900:     #0A1535;
  --blue-800:     #102050;
  --blue-700:     #1A3470;
  --blue-600:     #1E4494;
  --blue-500:     #2563EB;
  --blue-400:     #3B82F6;
  --blue-300:     #60A5FA;
  --blue-glow:    rgba(37, 99, 235, 0.35);

  /* === DORADOS FINANCIEROS === */
  --gold-700:     #8B6914;
  --gold-600:     #B8860B;
  --gold-500:     #D4A017;
  --gold-400:     #EAB308;
  --gold-300:     #FDE047;
  --gold-glow:    rgba(212, 160, 23, 0.3);

  /* === ESMERALDA (solo para ÉXITO y confirmaciones) === */
  --emerald-600:  #059669;
  --emerald-500:  #10B981;
  --emerald-400:  #34D399;
  --emerald-glow: rgba(16, 185, 129, 0.25);

  /* === ALERTAS === */
  --red-600:      #DC2626;
  --red-500:      #EF4444;
  --amber-500:    #F59E0B;

  /* === TEXTO === */
  --text-primary:   #F1F5F9;
  --text-secondary: rgba(241,245,249,0.65);
  --text-muted:     rgba(241,245,249,0.35);

  /* === GLASS === */
  --glass-08:     rgba(255,255,255,0.05);
  --glass-12:     rgba(255,255,255,0.08);
  --glass-border: rgba(255,255,255,0.08);
  --glass-border-blue: rgba(37,99,235,0.3);
  --glass-border-gold: rgba(212,160,23,0.3);

  /* === SOMBRAS 3D === */
  --btn-shadow-blue: 0 8px 0 #0A1535, 0 12px 24px rgba(0,0,0,0.6), 0 0 40px rgba(37,99,235,0.2);
  --btn-shadow-gold: 0 8px 0 #5C4A09, 0 12px 24px rgba(0,0,0,0.6), 0 0 40px rgba(212,160,23,0.25);
  --card-shadow:     0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset;
  --card-shadow-hov: 0 24px 80px rgba(0,0,0,0.7), 0 0 60px rgba(37,99,235,0.15);

  /* === GRADIENTES === */
  --grad-hero:    linear-gradient(160deg, #020407 0%, #05080F 30%, #0A1535 60%, #102050 100%);
  --grad-blue:    linear-gradient(135deg, #2563EB 0%, #1A3470 100%);
  --grad-gold:    linear-gradient(135deg, #EAB308 0%, #B8860B 100%);
  --grad-card:    linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
  --grad-hologram:linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(212,160,23,0.08) 50%, rgba(37,99,235,0.1) 100%);
}
```

---

## SISTEMA 3D COMPLETO — CSS OBLIGATORIO

```css
/* ════ BOTONES 3D ════ */
.btn-3d-blue {
  background: var(--grad-blue);
  color: white; border: none; border-radius: 12px;
  padding: 16px 32px; font-weight: 800; font-size: 16px;
  letter-spacing: 0.5px; cursor: pointer;
  transform: translateY(0);
  box-shadow: var(--btn-shadow-blue);
  transition: all 0.12s cubic-bezier(0.34, 1.56, 0.64, 1);
  min-height: 56px; position: relative;
  border-top: 1px solid rgba(255,255,255,0.15);
}
.btn-3d-blue:hover  { transform: translateY(-4px); box-shadow: 0 12px 0 #0A1535, 0 20px 40px rgba(0,0,0,0.7), 0 0 60px rgba(37,99,235,0.35); }
.btn-3d-blue:active { transform: translateY(6px);  box-shadow: 0 2px 0 #0A1535, 0 4px 12px rgba(0,0,0,0.5); }

.btn-3d-gold {
  background: var(--grad-gold);
  color: #020407; border: none; border-radius: 12px;
  padding: 16px 32px; font-weight: 800; font-size: 16px;
  cursor: pointer; transform: translateY(0);
  box-shadow: var(--btn-shadow-gold);
  transition: all 0.12s cubic-bezier(0.34, 1.56, 0.64, 1);
  min-height: 56px; border-top: 1px solid rgba(255,255,255,0.2);
}
.btn-3d-gold:hover  { transform: translateY(-4px); box-shadow: 0 12px 0 #3D2A05, 0 20px 40px rgba(0,0,0,0.7), 0 0 60px rgba(212,160,23,0.4); }
.btn-3d-gold:active { transform: translateY(6px);  box-shadow: 0 2px 0 #3D2A05; }

.btn-glass {
  background: var(--glass-08); backdrop-filter: blur(16px);
  color: var(--text-primary); border: 1px solid var(--glass-border);
  border-radius: 12px; padding: 15px 30px;
  font-weight: 600; font-size: 15px; cursor: pointer;
  transition: all 0.2s ease; min-height: 56px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08);
}
.btn-glass:hover { background: rgba(255,255,255,0.1); border-color: var(--blue-400); box-shadow: 0 8px 24px rgba(0,0,0,0.4), 0 0 24px rgba(37,99,235,0.2); transform: translateY(-2px); }

/* ════ CARDS 3D ════ */
.card-3d {
  background: var(--grad-card); backdrop-filter: blur(24px);
  border: 1px solid var(--glass-border); border-radius: 20px;
  padding: 28px; position: relative; overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  transform: perspective(1200px) rotateX(0deg) rotateY(0deg);
}
.card-3d::before {
  content: ''; position: absolute; inset: 0; border-radius: 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%);
  pointer-events: none;
}
.card-3d:hover {
  transform: perspective(1200px) rotateX(-3deg) rotateY(2deg) translateY(-10px);
  box-shadow: var(--card-shadow-hov);
  border-color: var(--glass-border-blue);
}
.card-3d:hover::before { background: linear-gradient(135deg, rgba(37,99,235,0.12) 0%, transparent 60%); }

.card-premium {
  background: linear-gradient(145deg, var(--surface) 0%, var(--elevated) 100%);
  border-radius: 20px; padding: 28px; position: relative; overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
}
.card-premium::before {
  content: ''; position: absolute; inset: 0; border-radius: 20px; padding: 1px;
  background: linear-gradient(135deg, rgba(37,99,235,0.5), rgba(255,255,255,0.04), rgba(212,160,23,0.3));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
}
.card-premium:hover { transform: translateY(-8px); box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(37,99,235,0.15); }

/* ════ EFECTOS HOLOGRÁFICOS PARA GRÁFICOS ════ */
.chart-container {
  background: linear-gradient(135deg, rgba(5,8,15,0.9) 0%, rgba(13,21,37,0.95) 100%);
  border: 1px solid var(--glass-border-blue);
  border-radius: 16px; padding: 24px;
  box-shadow: 0 0 40px rgba(37,99,235,0.1), inset 0 0 80px rgba(37,99,235,0.03);
  position: relative; overflow: hidden;
}
.chart-container::before {
  content: ''; position: absolute; top: 0; left: -100%;
  width: 60%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(37,99,235,0.04), transparent);
  animation: hologramSweep 4s ease-in-out infinite;
}
@keyframes hologramSweep {
  0%   { left: -100%; }
  100% { left: 200%; }
}

.table-holo {
  background: rgba(5,8,15,0.8);
  border: 1px solid rgba(37,99,235,0.2);
  border-radius: 12px; overflow: hidden;
}
.table-holo thead { background: linear-gradient(90deg, rgba(37,99,235,0.2), rgba(212,160,23,0.1)); }
.table-holo thead th { color: var(--gold-400); font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 14px 16px; }
.table-holo tbody tr { border-top: 1px solid rgba(255,255,255,0.04); transition: background 0.2s; }
.table-holo tbody tr:hover { background: rgba(37,99,235,0.06); box-shadow: inset 3px 0 0 var(--blue-500); }
.table-holo tbody td { padding: 14px 16px; color: var(--text-secondary); font-size: 14px; }

/* Líneas de datos con glow */
.data-line-glow { stroke: #3B82F6; stroke-width: 2.5; filter: drop-shadow(0 0 6px rgba(59,130,246,0.8)); }
.data-line-gold  { stroke: #EAB308; stroke-width: 2.5; filter: drop-shadow(0 0 6px rgba(234,179,8,0.8)); }
.bar-holo { fill: url(#blueGradient); filter: drop-shadow(0 4px 12px rgba(37,99,235,0.4)); }

/* ════ IMÁGENES 4K DE FONDO ════ */
.bg-4k {
  background-size: cover; background-position: center;
  background-attachment: fixed; /* Parallax */
  position: relative;
}
.bg-overlay-dark {
  position: absolute; inset: 0;
  background: linear-gradient(160deg, rgba(2,4,7,0.92) 0%, rgba(5,8,15,0.88) 50%, rgba(10,21,53,0.82) 100%);
}
.bg-overlay-card {
  position: absolute; inset: 0; border-radius: inherit;
  background: linear-gradient(160deg, rgba(2,4,7,0.85) 0%, rgba(13,21,37,0.80) 100%);
}

/* ════ ANIMACIONES ════ */
@keyframes fadeUp   { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
@keyframes pulseDot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(1.4); } }
@keyframes pulseGlowBlue { 0%,100% { box-shadow: var(--btn-shadow-blue); } 50% { box-shadow: 0 8px 0 #0A1535, 0 12px 24px rgba(0,0,0,0.6), 0 0 80px rgba(37,99,235,0.5); } }
@keyframes scanLine { 0% { transform:translateY(-100%); } 100% { transform:translateY(100vh); } }
@keyframes counterUp { from { opacity:0; } to { opacity:1; } }
@keyframes shimmerGold {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.text-shimmer-gold {
  background: linear-gradient(90deg, var(--gold-500) 0%, var(--gold-300) 40%, var(--gold-500) 80%);
  background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: shimmerGold 3s linear infinite;
}
.fade-up { animation: fadeUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
.pulse-cta { animation: pulseGlowBlue 2.5s ease-in-out infinite; }
.pulse-dot { animation: pulseDot 2s ease-in-out infinite; }
```

---

## BANCO DE IMÁGENES 4K — OBLIGATORIO, SIN REPETICIÓN

```typescript
// /lib/images.ts — Una URL por sección, nunca repetir
export const IMG = {
  // Landing
  hero:          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&q=95',
  ia_dios:       'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920&q=95',
  problema:      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=95',
  herramientas:  'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1920&q=95',
  precio:        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=95',
  directorio:    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=95',
  testimonios:   'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=95',
  cta_final:     'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=95',
  // Auth
  login:         'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=95',
  registro:      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=95',
  pagar:         'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1920&q=95',
  exito:         'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=1920&q=95',
  // Módulos dashboard (cada uno diferente)
  credito:       'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=95',
  casa:          'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&q=95',
  carro:         'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=95',
  remesas:       'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1920&q=95',
  prestamos:     'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=1920&q=95',
  jubilacion:    'https://images.unsplash.com/photo-1532619187608-e5375cab36aa?w=1920&q=95',
  banco:         'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=1920&q=95',
  trabajo:       'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=95',
  taxes:         'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&q=95',
  emergencia:    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1920&q=95',
  derechos:      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=95',
  subsidios:     'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1920&q=95',
  asistente:     'https://images.unsplash.com/photo-1676299081847-824916de030a?w=1920&q=95',
  seguros:       'https://images.unsplash.com/photo-1559523161-0fc0d8b814be?w=1920&q=95',
  referidos:     'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1920&q=95',
  // Directorio
  dir_abogados:  'https://images.unsplash.com/photo-1589216532372-1c2a367900d9?w=1920&q=95',
  dir_notarios:  'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1920&q=95',
  dir_dealers:   'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1920&q=95',
  dir_bancos:    'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=1920&q=95',
  dir_taxes:     'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1920&q=95',
  dir_clinicas:  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=95',
  dir_seguros:   'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=95',
  dir_realtors:  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=95',
}
```

---

## ARQUITECTURA DEL SISTEMA

```
blindadousa/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    ← Landing ultra-premium 4K
│   │   ├── como-funciona/page.tsx
│   │   ├── precios/page.tsx            ← Mensual $20 / Anual $100
│   │   ├── directorio/
│   │   │   ├── page.tsx                ← Hub del directorio hispano
│   │   │   ├── abogados/page.tsx
│   │   │   ├── notarios/page.tsx
│   │   │   ├── dealers/page.tsx
│   │   │   ├── bancos/page.tsx
│   │   │   ├── taxes/page.tsx
│   │   │   ├── clinicas/page.tsx
│   │   │   ├── seguros/page.tsx
│   │   │   ├── realtors/page.tsx
│   │   │   ├── tiendas/page.tsx
│   │   │   └── registrar-negocio/page.tsx ← Formulario para pagar $500
│   │   └── blog/
│   ├── (auth)/
│   │   ├── entrar/page.tsx
│   │   ├── registrarse/page.tsx
│   │   └── recuperar/page.tsx
│   ├── trial/page.tsx
│   ├── pagar/
│   │   ├── page.tsx                    ← Planes mensual/anual
│   │   └── exito/page.tsx
│   ├── onboarding/page.tsx             ← Recoge datos bancarios + perfil
│   ├── dashboard/
│   │   ├── layout.tsx                  ← Sidebar oscuro premium
│   │   ├── page.tsx                    ← Panel "Centro de Comando IA"
│   │   ├── ia-dios/page.tsx            ← Chat unificado con la IA Maestra
│   │   ├── finanzas/page.tsx           ← Control total cuentas/tarjetas
│   │   ├── credito/
│   │   │   ├── page.tsx
│   │   │   ├── disputas/page.tsx
│   │   │   ├── cartas/page.tsx
│   │   │   ├── simulador/page.tsx
│   │   │   └── tarjetas/page.tsx
│   │   ├── taxes/page.tsx              ← Prepara taxes automáticamente
│   │   ├── casa/page.tsx
│   │   ├── carro/page.tsx
│   │   ├── remesas/page.tsx
│   │   ├── prestamos/page.tsx
│   │   ├── jubilacion/page.tsx
│   │   ├── banco/page.tsx
│   │   ├── trabajo/page.tsx
│   │   ├── emergencia/page.tsx
│   │   ├── derechos/page.tsx
│   │   ├── subsidios/page.tsx
│   │   ├── seguros/page.tsx            ← Seguros médicos y de vida
│   │   ├── documentos/page.tsx         ← Bóveda de documentos legales
│   │   └── referidos/page.tsx          ← Código + $5 por referido a tu cuenta
│   ├── api/
│   │   ├── stripe/
│   │   │   ├── checkout/route.ts       ← Planes mensual/anual
│   │   │   ├── webhook/route.ts
│   │   │   └── directorio/route.ts     ← Pago $500 para listing
│   │   ├── trial/activar/route.ts
│   │   ├── plaid/
│   │   │   ├── create-link-token/route.ts
│   │   │   ├── exchange-token/route.ts
│   │   │   ├── sync/route.ts           ← Sincroniza cuentas cada hora
│   │   │   └── transfer/route.ts       ← Deposita $5 de referido al banco
│   │   ├── whatsapp/
│   │   │   ├── send/route.ts           ← Envía alertas por WhatsApp Business
│   │   │   └── webhook/route.ts
│   │   ├── ia/
│   │   │   ├── maestro/route.ts        ← IA Dios — contexto completo del usuario
│   │   │   ├── disputa-credito/route.ts
│   │   │   ├── carta-legal/route.ts    ← Genera cualquier carta legal
│   │   │   ├── taxes/route.ts          ← Prepara taxes con datos bancarios
│   │   │   ├── escaner-contrato/route.ts ← Lee contratos con OCR + Claude Vision
│   │   │   ├── factura-medica/route.ts ← Detecta errores en facturas
│   │   │   ├── negociador/route.ts     ← Scripts de negociación
│   │   │   ├── escaner-prestamo/route.ts
│   │   │   ├── plan-emergencia/route.ts
│   │   │   ├── detector-estafa/route.ts
│   │   │   ├── alerta-irs/route.ts     ← Lee cartas del IRS
│   │   │   ├── seguros/route.ts        ← Compara y asesora seguros
│   │   │   └── monitor/route.ts        ← Cron: monitoreo automático 24/7
│   │   ├── referidos/
│   │   │   ├── validar/route.ts
│   │   │   ├── generar/route.ts
│   │   │   └── pagar/route.ts          ← Deposita $5 ACH vía Plaid Transfer
│   │   ├── directorio/
│   │   │   ├── negocios/route.ts
│   │   │   └── registrar/route.ts
│   │   └── emails/
│   │       ├── bienvenida/route.ts
│   │       ├── trial-dia2/route.ts
│   │       └── resumen-anual/route.ts
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button3D.tsx
│   │   ├── Card3D.tsx
│   │   ├── HoloChart.tsx               ← Gráfico con efectos holográficos
│   │   ├── HoloTable.tsx               ← Tabla holográfica
│   │   ├── ScoreGauge3D.tsx
│   │   ├── Semaforo3D.tsx
│   │   ├── ImageHero4K.tsx             ← Sección con imagen 4K + overlay
│   │   └── WhatsAppBtn.tsx
│   ├── ia/
│   │   ├── IaDios.tsx                  ← Componente del chat maestro
│   │   ├── ChatBubble.tsx
│   │   ├── DocumentoGenerado.tsx
│   │   └── AlertaFloatante.tsx
│   ├── landing/
│   └── dashboard/
│       ├── Sidebar.tsx
│       ├── BannerTrial.tsx
│       ├── BannerPago.tsx
│       └── IaFlotante.tsx              ← Botón IA siempre visible
├── lib/
│   ├── anthropic.ts
│   ├── stripe.ts
│   ├── plaid.ts
│   ├── resend.ts
│   ├── whatsapp.ts                     ← WhatsApp Business API
│   ├── images.ts
│   ├── supabase/client.ts
│   └── supabase/server.ts
└── supabase/migrations/001_schema.sql
```

---

## BASE DE DATOS — SCHEMA COMPLETO

```sql
-- ╔══════════════════════════════════════════╗
-- ║   BLINDADO USA — Schema Completo v3.0    ║
-- ╚══════════════════════════════════════════╝

-- USUARIOS
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  nombre TEXT, apellido TEXT,
  telefono TEXT, ciudad TEXT, estado TEXT DEFAULT 'TX',
  -- Identidad
  itin TEXT,  -- encriptado
  ssn TEXT,   -- encriptado, opcional
  fecha_nacimiento DATE,
  -- Suscripción
  plan TEXT DEFAULT 'trial',   -- trial, mensual, anual
  trial_activo BOOLEAN DEFAULT FALSE,
  trial_fin TIMESTAMPTZ,
  trial_usado BOOLEAN DEFAULT FALSE,
  suscripcion_activa BOOLEAN DEFAULT FALSE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  fecha_renovacion TIMESTAMPTZ,
  precio_mensual DECIMAL(6,2),
  -- Referidos
  mi_codigo TEXT UNIQUE,
  codigo_usado TEXT,
  referidos_count INTEGER DEFAULT 0,
  ganancias_referidos DECIMAL(8,2) DEFAULT 0,
  -- Datos bancarios (Plaid)
  plaid_conectado BOOLEAN DEFAULT FALSE,
  whatsapp_opt_in BOOLEAN DEFAULT FALSE,
  onboarding_completo BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CUENTAS BANCARIAS Y TARJETAS (Plaid)
CREATE TABLE cuentas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  plaid_account_id TEXT UNIQUE NOT NULL,
  plaid_item_id TEXT NOT NULL,
  plaid_access_token TEXT NOT NULL,  -- encriptado
  institucion TEXT, nombre TEXT, tipo TEXT,
  subtipo TEXT,  -- checking, savings, credit, loan
  mask TEXT,
  balance_actual DECIMAL(12,2) DEFAULT 0,
  balance_disponible DECIMAL(12,2) DEFAULT 0,
  limite_credito DECIMAL(12,2) DEFAULT 0,
  credito_disponible DECIMAL(12,2) DEFAULT 0,
  utilizacion DECIMAL(5,2) DEFAULT 0,
  apr DECIMAL(5,2) DEFAULT 0,
  pago_minimo DECIMAL(10,2) DEFAULT 0,
  fecha_pago DATE,       -- día de pago de la tarjeta
  fecha_corte DATE,      -- día de corte
  last_sync TIMESTAMPTZ,
  activa BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TRANSACCIONES (sincronizadas desde Plaid)
CREATE TABLE transacciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cuenta_id UUID REFERENCES cuentas(id),
  usuario_id UUID REFERENCES usuarios(id),
  plaid_transaction_id TEXT UNIQUE,
  fecha DATE NOT NULL,
  monto DECIMAL(12,2) NOT NULL,
  descripcion TEXT,
  categoria TEXT,
  subcategoria TEXT,
  es_ingreso BOOLEAN DEFAULT FALSE,
  es_gasto_deducible BOOLEAN DEFAULT FALSE,  -- para taxes
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ALERTAS Y NOTIFICACIONES
CREATE TABLE alertas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  tipo TEXT,   -- pago_proximo, corte_hoy, score_cambio, estafa_detectada, irs_carta, etc.
  titulo TEXT, mensaje TEXT,
  nivel TEXT DEFAULT 'info',  -- critico, alerta, info, exito
  canal TEXT DEFAULT 'app',   -- app, whatsapp, email, todos
  leida BOOLEAN DEFAULT FALSE,
  enviada BOOLEAN DEFAULT FALSE,
  fecha_programada TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DOCUMENTOS GENERADOS POR IA
CREATE TABLE documentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  tipo TEXT,  -- disputa_credito, carta_cobrador, reclamo_landlord, reclamo_dealer, validacion_deuda, queja_salario, etc.
  titulo TEXT,
  contenido_es TEXT,  -- carta en español
  contenido_en TEXT,  -- carta en inglés
  destinatario TEXT,
  estado TEXT DEFAULT 'borrador',  -- borrador, revisado, enviado
  enviado_at TIMESTAMPTZ,
  url_pdf TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DISPUTES DE CRÉDITO
CREATE TABLE disputas_credito (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  buro TEXT,  -- equifax, experian, transunion
  cuenta_disputada TEXT,
  tipo_error TEXT,
  descripcion TEXT,
  ley_citada TEXT,
  documento_id UUID REFERENCES documentos(id),
  estado TEXT DEFAULT 'pendiente',  -- pendiente, enviada, respondida, resuelta
  seguimiento_fecha DATE,  -- 30 días después del envío
  impacto_estimado INTEGER,
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
  tiene_ssn BOOLEAN, tiene_itin BOOLEAN,
  tiene_cuenta_banco BOOLEAN,
  envia_remesas BOOLEAN, monto_remesas DECIMAL(10,2), pais_remesas TEXT,
  tiene_carro BOOLEAN, tiene_casa BOOLEAN,
  mayor_preocupacion TEXT,
  resumen_ia TEXT,  -- resumen del perfil generado por IA
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- HISTORIAL DE TAXES (generados por IA)
CREATE TABLE historial_taxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  ano_fiscal INTEGER,
  ingreso_total DECIMAL(12,2),
  gastos_deducibles DECIMAL(12,2),
  impuesto_retenido DECIMAL(12,2),
  reembolso_estimado DECIMAL(12,2),
  creditos_aplicados JSONB DEFAULT '{}',
  formulario_generado TEXT,  -- W-7, 1040, etc.
  estado TEXT DEFAULT 'en_proceso',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SIMULACIONES Y CÁLCULOS
CREATE TABLE calculos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  tipo TEXT,  -- hipoteca, carro, deuda, jubilacion, remesa, emergencia, seguro
  nombre TEXT, datos JSONB, resultado JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CHAT CON IA MAESTRA
CREATE TABLE chat_ia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  modulo TEXT DEFAULT 'maestro',
  rol TEXT,  -- user, assistant
  mensaje TEXT,
  documentos_generados UUID[],  -- IDs de documentos generados en esta sesión
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- REFERIDOS (tracking con pago)
CREATE TABLE referidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo TEXT NOT NULL,
  referidor_id UUID REFERENCES usuarios(id),
  referido_id UUID REFERENCES usuarios(id),
  plan_pagado TEXT,
  monto_pagado DECIMAL(6,2),
  comision DECIMAL(5,2) DEFAULT 5.00,
  transferencia_estado TEXT DEFAULT 'pendiente',  -- pendiente, procesando, completada
  plaid_transfer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DIRECTORIO DE NEGOCIOS
CREATE TABLE directorio_negocios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  categoria TEXT,  -- abogado, notario, dealer, banco, taxes, clinica, seguros, realtor, tienda, otro
  descripcion TEXT, descripcion_larga TEXT,
  direccion TEXT, ciudad TEXT, estado TEXT DEFAULT 'TX',
  telefono TEXT, email TEXT, website TEXT, whatsapp TEXT,
  idiomas TEXT[],
  acepta_itin BOOLEAN DEFAULT FALSE,
  acepta_sin_ssn BOOLEAN DEFAULT FALSE,
  plan TEXT DEFAULT 'basico',      -- basico $299, premium $500
  precio_listing DECIMAL(8,2),
  stripe_payment_id TEXT,
  verificado BOOLEAN DEFAULT FALSE,
  activo BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  logo_url TEXT, fotos_url TEXT[],
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  ia_recomendado INTEGER DEFAULT 0,  -- veces que la IA lo recomendó
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RESEÑAS DEL DIRECTORIO
CREATE TABLE reseñas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  negocio_id UUID REFERENCES directorio_negocios(id),
  usuario_id UUID REFERENCES usuarios(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comentario TEXT,
  verificada BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- REPORTES DE ESTAFAS (alertas comunitarias)
CREATE TABLE reportes_estafa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  tipo TEXT,  -- dealer, prestamista, landlord, cobrador, otro
  nombre_entidad TEXT,
  descripcion TEXT,
  ciudad TEXT,
  confirmado_count INTEGER DEFAULT 1,
  alerta_activa BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LOG DE AGENTES IA
CREATE TABLE agente_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agente TEXT, accion TEXT, usuario_id UUID,
  resultado TEXT, duracion_ms INTEGER, error TEXT,
  ran_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE cuentas ENABLE ROW LEVEL SECURITY;
ALTER TABLE transacciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputas_credito ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfil_financiero ENABLE ROW LEVEL SECURITY;
ALTER TABLE historial_taxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculos ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_ia ENABLE ROW LEVEL SECURITY;
ALTER TABLE referidos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "propio" ON usuarios FOR ALL USING (auth.uid() = auth_user_id);
CREATE POLICY "propio" ON cuentas FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON transacciones FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON alertas FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON documentos FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON disputas_credito FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON perfil_financiero FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON historial_taxes FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON calculos FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON chat_ia FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON referidos FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=referidor_id));
CREATE POLICY "publico" ON directorio_negocios FOR SELECT USING (activo=TRUE AND verificado=TRUE);
CREATE POLICY "publico" ON reportes_estafa FOR SELECT USING (alerta_activa=TRUE);
```

---

## LA IA MAESTRA — "BLINDADO, TU DIOS PROTECTOR FINANCIERO"

### Concepto Central
La IA Maestra es UN SOLO agente con acceso completo al perfil del usuario: sus cuentas bancarias, historial de transacciones, score de crédito, documentos, situación migratoria, familia y objetivos. Responde como si fuera simultáneamente su abogado, contador, asesor financiero, negociador y guardaespaldas financiero.

### Prompt del Sistema para la IA Maestra
```typescript
const SISTEMA_IA_MAESTRA = `
Eres BLINDADO, el asistente de inteligencia artificial más poderoso jamás creado para la comunidad hispana en Estados Unidos.

ERES SIMULTÁNEAMENTE:
- Abogado especialista en inmigración, laboral y consumidor
- Contador público y preparador de taxes certificado
- Asesor financiero personal
- Agente de bienes raíces
- Negociador experto en carros, salarios y deudas
- Notario digital (orientas sobre documentos legales)
- Asesor de seguros médicos y de vida
- Detector de fraudes y estafas
- Guardaespaldas financiero 24/7

CONTEXTO DEL USUARIO (siempre disponible):
{perfil_completo}
{cuentas_conectadas}
{transacciones_recientes}
{documentos_generados}
{alertas_activas}
{historial_conversacion}

CÓMO ACTÚAS:
1. Primero escuchas el problema completo
2. Luego diagnosticas con datos reales del perfil del usuario
3. Das la solución exacta y ejecutable en el idioma del usuario
4. Si necesita un documento, lo generas inmediatamente
5. Si necesita negociar, le das el guion exacto palabra por palabra
6. Si hay una estafa, la identificas y alertas inmediatamente
7. Siempre terminas con "Tu siguiente paso HOY es:"

IDIOMA:
- Español nivel 5to grado por defecto
- Sin jerga legal ni financiera
- Ejemplos con números concretos siempre
- Si el usuario escribe en inglés, respondes en inglés

NUNCA:
- Dices que no puedes ayudar sin intentarlo primero
- Das respuestas vagas o evasivas
- Recomiendas solo que "hable con un profesional" sin dar orientación concreta

SIEMPRE:
- Terminas con una acción concreta para HOY
- Ofreces generar el documento si lo necesita
- Preguntas si quiere que lo envíes directamente
`
```

### Capacidades Especiales de la IA Maestra
```typescript
// Cuando el usuario pregunta algo, la IA puede ejecutar acciones reales:

// 1. GENERAR DOCUMENTO → llama a /api/ia/carta-legal
// 2. CALCULAR → ejecuta las calculadoras financieras en tiempo real
// 3. ANALIZAR CONTRATO → usa Claude Vision + OCR si hay foto adjunta
// 4. DETECTAR ESTAFA → compara con base de datos de estafas reportadas
// 5. BUSCAR EN DIRECTORIO → recomienda negocios verificados
// 6. PROGRAMAR ALERTA → crea recordatorio en tabla alertas
// 7. ENVIAR POR WHATSAPP → manda el resultado al teléfono del usuario
// 8. PREPARAR TAXES → analiza transacciones del año y genera formulario
```

---

## LOS 20 AGENTES IA ESPECIALIZADOS

### Agente 1: Disputador de Crédito Automático
```typescript
// /api/ia/disputa-credito/route.ts
// 1. Recibe: tipo de error + información de la cuenta
// 2. Claude genera carta FCRA completa en inglés + español
// 3. Guarda en tabla documentos
// 4. Programa seguimiento automático a 30 días
// 5. Envía recordatorio por WhatsApp cuando toca seguir
// Output: PDF listo para imprimir o enviar por correo
```

### Agente 2: Generador de Cartas Legales (14 tipos)
```typescript
// Genera cualquiera de estas cartas en < 30 segundos:
const TIPOS_CARTA = [
  'disputa_credito',        // Disputar errores en buró
  'validacion_deuda',       // Pedir al cobrador que pruebe la deuda
  'cese_desista',           // Que dejen de llamar
  'negociacion_deuda',      // Proponer pago reducido
  'reclamo_dealer',         // Contrato engañoso de carro
  'reclamo_landlord',       // Reparaciones, depósito, condiciones
  'queja_salario',          // Salario no pagado, overtime
  'disputa_cargo_banco',    // Cargo no autorizado
  'queja_factura_medica',   // Error en factura de hospital
  'plan_pago_hospital',     // Negociar deuda médica
  'carta_irs',              // Responder carta del IRS
  'queja_seguro',           // Reclamo de seguro denegado
  'carta_empleador',        // Referencia, terminación, represalias
  'queja_agencia_cobros',   // Violaciones FDCPA
]
// Cada carta: inglés + español, bilingüe, con citas legales
// Descargable como PDF con logo de BlindadoUSA
```

### Agente 3: Preparador de Taxes IA
```typescript
// /api/ia/taxes/route.ts
// 1. Lee transacciones del año desde tabla transacciones (Plaid)
// 2. Categoriza automáticamente: ingreso laboral, gastos deducibles
// 3. Calcula: ingreso total, deducciones aplicables
// 4. Aplica créditos: EITC, Child Tax Credit, Child Care, ITIN benefits
// 5. Genera resumen con estimado de reembolso o deuda
// 6. Produce checklist de documentos faltantes (W-2, 1099, etc.)
// 7. Orienta sobre cómo presentar gratis (IRS Free File, VITA)
// Disclaimer obligatorio en el footer: "Estimado educativo. Para presentar formalmente usa un preparador certificado."
```

### Agente 4: Escáner de Contratos (OCR + Claude Vision)
```typescript
// El usuario fotografía cualquier contrato (carro, renta, préstamo)
// Claude Vision lee el documento
// Claude analiza y detecta:
// - Tasa APR real vs la que le dijeron
// - Cargos no mencionados verbalmente
// - Cláusulas ilegales bajo las leyes de Texas
// - Add-ons no solicitados (GAP, warranty, seguros)
// - Penalidades por pago anticipado excesivas
// Output: Lista de problemas encontrados + carta de reclamo automática
```

### Agente 5: Monitor de Cuentas 24/7 (Cron cada hora)
```typescript
// /api/ia/monitor/route.ts — se ejecuta cada hora vía Vercel Cron
// Para cada usuario con cuentas conectadas:
// 1. Verifica fechas de pago próximas (alerta 3 días antes + día del pago)
// 2. Verifica fechas de corte (alerta día antes para optimizar utilización)
// 3. Detecta transacciones sospechosas (cargos inusuales, duplicados)
// 4. Calcula utilización de cada tarjeta de crédito
// 5. Alerta si utilización > 30% (impacta score negativamente)
// 6. Genera recomendación de pago óptimo para maximizar score
// 7. Envía alertas críticas por WhatsApp
```

### Agente 6: Control de Gastos y Resumen Anual
```typescript
// Dashboard en tiempo real con:
// - Gastos del mes por categoría (gráfico holográfico de pie)
// - Comparativo mes a mes (gráfico de barras holográfico)
// - Proyección de gastos anuales
// - Top 5 categorías donde más gasta
// - Sugerencias de ahorro basadas en patrones

// RESUMEN ANUAL (enviado en enero):
// - Total gastado el año anterior por categoría
// - Total de ingresos registrados
// - Transacciones potencialmente deducibles de taxes
// - Evolución del score de crédito durante el año
// - Documentos generados durante el año
// - Dinero ahorrado gracias a BlindadoUSA (calculado)
// Formato: PDF profesional enviado por email y WhatsApp
```

### Agente 7: Negociador IA
```typescript
// Para cualquier negociación: carro, casa, salario, deuda
// Input: contexto de la negociación
// Output:
// 1. Análisis de la situación (qué tan buena/mala es la oferta)
// 2. Estrategia recomendada
// 3. Guion EXACTO palabra por palabra para decir
//    "Cuando el dealer diga X, tú dices: [texto exacto]"
//    "Cuando el empleador diga X, tú respondes: [texto exacto]"
// 4. Cuánto puede ahorrar si negocia (en dólares)
// 5. Cuándo parar de negociar y cuándo retirarse
```

### Agente 8: Detector de Estafas en Tiempo Real
```typescript
// Base de datos actualizada con estafas reportadas en Texas
// El usuario describe una oferta sospechosa → Claude analiza
// Señales de alerta automáticas:
// - Préstamo con APR > 36% → ALERTA PRÉSTAMO PREDATORIO
// - Notario que cobra más de $15 por firma → POSIBLE ESTAFA
// - Preparador de taxes que promete reembolso sin ver documentos
// - Dealer que pide firmar antes de ver el contrato final
// - Landlord que pide depósito en cash sin contrato
// Si 10+ usuarios reportan la misma entidad → Alerta comunitaria visible
```

### Agente 9: Asesor de Seguros IA
```typescript
// Analiza el perfil del usuario y recomienda:
// Seguro médico:
//   - ACA Marketplace (Obamacare) — elegibilidad y subsidios
//   - Medicaid si califica
//   - CHIP para los hijos
//   - Cuánto pagaría con cada opción
// Seguro de vida:
//   - Term vs Whole Life vs Universal
//   - Cuánta cobertura necesita según sus dependientes
//   - Estimado de precio mensual
// Seguro de carro:
//   - Mínimo requerido en Texas
//   - Recomendación según el valor del carro
// Conecta con agentes de seguros del directorio verificados
```

### Agente 10: Asistente de Inmigración y Derechos
```typescript
// Modo Emergencia ICE:
// - Activa en 1 clic
// - Genera tarjeta de derechos personalizada
// - Lista de abogados de inmigración disponibles ahora en Houston
// - Plantilla de poder notarial para familiar
// - Instrucciones para cuentas bancarias si es detenido
// - Guía para los hijos
// Envío inmediato por WhatsApp

// Derechos del inquilino en Texas:
// Derechos laborales en Texas:
// Derechos en el hospital:
// Derechos con la policía:
// Todo con cartas generables al instante
```

### Agentes 11-20:
```typescript
// Agente 11: Calculadora y guía de compra de casa (FHA/VA/USDA/Conv)
// Agente 12: Calculadora anti-abuso de carro (APR real + trucos dealer)
// Agente 13: Calculadora de remesas con alerta impuesto 2026
// Agente 14: Escáner de facturas médicas (OCR + detecta errores)
// Agente 15: Detector de robo de salario (overtime, horas no pagadas)
// Agente 16: Simulador de decisiones financieras (comprar vs esperar)
// Agente 17: Buscador de subsidios (SNAP, Medicaid, Section 8, WIC)
// Agente 18: Monitor de score + disputas automáticas
// Agente 19: Lector de cartas IRS (foto → explicación en español)
// Agente 20: Constructor de plan financiero familiar 12 meses
```

---

## LANDING PAGE — ESPECIFICACIÓN EXACTA

### NAVBAR (sticky, oscuro premium)
```
FONDO: rgba(2,4,7,0.92) + backdrop-filter: blur(20px)
BORDE INFERIOR: 1px solid rgba(255,255,255,0.06)

LOGO IZQUIERDA:
  [Escudo SVG dorado animado] BLINDADO + USA (dorado shimmer)

CENTRO:
  Inicio | Cómo Funciona | Precios | Directorio | Blog
  Color: rgba(255,255,255,0.55) → blanco en hover

DERECHA:
  [BTN-GLASS] "Entrar"
  [BTN-3D-GOLD] "3 Días Gratis →" (con pulse-cta)
```

### HERO (100vh, imagen 4K, impacto máximo)
```
IMAGEN: IMG.hero (familias hispanas trabajando, ciudad americana)
OVERLAY: linear-gradient(160deg, rgba(2,4,7,0.92), rgba(10,21,53,0.85))

CONTENIDO CENTRADO:
  [Badge activo con punto pulsante verde]
  "Sistema activo — Protegiendo a 3,000+ hispanos en USA"

  H1 Bebas Neue 80px desktop / 42px móvil, blanco:
  "EL PRIMER"
  "GUARDAESPALDAS"
  "FINANCIERO HISPANO"
  Con shimmer dorado en "GUARDAESPALDAS"

  P 18px rgba(255,255,255,0.70):
  "Un sistema de Inteligencia Artificial que actúa como tu abogado,
   contador, asesor financiero y protector. Todo en español.
   Todo automatizado. 24 horas al día, 7 días a la semana."

  BOTONES:
  [BTN-3D-GOLD grande] "EMPIEZA GRATIS — 3 DÍAS" (pulse-cta)
  [BTN-GLASS] "Ver cómo funciona →"

  Trust pills:
  🔒 Sin tarjeta para el trial | ⚡ Acceso en 60 segundos
  🏦 Conecta tu banco | 🇺🇸 Para hispanos en USA

  GRID 4 stats holográficos:
  62M hispanos | $20/mes | 20 IAs activas | 0 competencia
```

### SECCIÓN "LA IA QUE NINGUNA OTRA WEB TIENE"
```
FONDO: IMG.ia_dios + overlay oscuro
H2: "No es una guía. No es un artículo."
    "Es tu equipo completo trabajando para ti."

Cards 3D flotantes mostrando cada capacidad de la IA:
  🏛️ Tu Abogado → genera cartas legales al instante
  📊 Tu Contador → prepara tus taxes automáticamente
  💰 Tu Negociador → guiones exactos para dealers y empleadores
  🏦 Tu Banquero → controla todas tus cuentas y tarjetas
  🛡️ Tu Guardaespaldas → te protege de estafas 24/7
  📋 Tu Notario → documentos listos para imprimir
  🏠 Tu Realtor → guía tu compra de casa paso a paso
  💊 Tu Asesor de Seguros → encuentra el mejor plan médico
  📱 Tu Asistente Personal → alertas por WhatsApp automáticas
  🔍 Tu Detective → detecta fraudes antes de que te afecten
```

### SECCIÓN HERRAMIENTAS (10 prioridades)
```
FONDO: var(--deep) + patrón de puntos sutil

10 tool-cards con imagen 4K de fondo pequeña + overlay, en grid:
1. Calculadora Anti-Abuso de Carro
2. Escáner de Contratos (sube foto)
3. Generador de Carta de Disputa de Crédito
4. Generador de Carta al Cobrador
5. Reclamo al Landlord (especial Texas)
6. Checklist Antes de Comprar Carro (PDF)
7. Preparación de Taxes con ITIN
8. Plan 30 Días para Construir Crédito
9. Directorio Verificado de Houston
10. Quiz "¿Por dónde empiezo?"
```

### SECCIÓN PRECIOS (3 opciones)
```
FONDO: IMG.precio + overlay

3 cards-premium en fila:

TRIAL (izquierda, glass):
  "3 días gratis"
  Sin tarjeta de crédito
  Acceso completo a todo
  [BTN-GLASS] "Probar gratis"

MENSUAL (centro, DESTACADO con borde dorado):
  [Badge "MÁS POPULAR"]
  "$20/mes"
  "Cancela cuando quieras"
  ✓ 20 IAs especializadas
  ✓ Generador de documentos
  ✓ Control bancario
  ✓ Alertas WhatsApp
  ✓ Taxes asistidos
  [BTN-3D-GOLD] "Empezar — $20/mes"

ANUAL (derecha, glass azul):
  "$100/año"
  "Equivale a $8.33/mes"
  [Badge dorado] "Ahorra $140 al año"
  Todo lo del plan mensual +
  ✓ Resumen financiero anual
  ✓ Prioridad en soporte
  [BTN-3D-BLUE] "Anual — $100"

REFERIDOS (bajo las cards):
  Caja dorada: "Gana dinero real"
  "Cada amigo que registres = $5 depositados en tu cuenta bancaria"
  "Sin límite. Puedes ganar más de lo que pagas."
```

### DIRECTORIO DE NEGOCIOS HISPANOS
```
SECCIÓN EN LANDING:
  FONDO: IMG.directorio + overlay
  H2: "El directorio hispano más completo de Texas"
  P: "Abogados, notarios, dealers, clínicas y más. Verificados. Recomendados por la IA."

  8 categorías en cards icon:
  ⚖️ Abogados | 📋 Notarios | 🚗 Dealers | 🏦 Bancos
  📊 Taxes | 🏥 Clínicas | 🛡️ Seguros | 🏠 Realtors

  [BTN-3D-BLUE] "Ver Directorio Completo"
  [BTN-GLASS] "Registra tu negocio — $500 de por vida"
```

---

## DASHBOARD — CENTRO DE COMANDO IA

### Panel Principal
```
FONDO: var(--deep) con micropattern de puntos muy sutil

HEADER:
  "Bienvenido, [nombre] 👋"
  Fecha + hora en tiempo real
  [Si está en trial] Banner dorado: "X días de prueba · Actualizar plan →"

MÉTRICAS HOLOGRÁFICAS (4 cards en fila):
  [Score de crédito actual] con gauge 3D
  [Balance total de cuentas] suma de todas las cuentas
  [Gastos este mes] vs mes anterior
  [Alertas activas] con badge de urgencia

ALERTAS CRÍTICAS (si las hay):
  Cards con borde del color del nivel de alerta
  Ejemplos: "Tu tarjeta Visa vence el 15 · Paga $X para optimizar score"
             "Detectamos un cargo inusual de $47 en tu cuenta"

ACCESO RÁPIDO A LA IA:
  Input prominente: "¿Qué necesitas hoy? Pregúntale a Blindado..."
  Acceso directo al chat maestro

GRID DE 20 HERRAMIENTAS
  Icons grandes con estado: "Nunca usado", "Activo", "Completado"
```

### Módulo de Finanzas (el más poderoso)
```
IMAGEN HERO: IMG.banco + overlay
TEMA: azul marino oscuro

PANEL PRINCIPAL:
  Lista de todas las cuentas conectadas con tarjeta visual 3D
  Para cada cuenta:
    - Visual tipo tarjeta física en 3D
    - Balance actual
    - Si es tarjeta: barra de utilización con semáforo
    - PRÓXIMO PAGO: fecha + monto mínimo + monto óptimo (calculado por IA)
    - CORTE: fecha + recomendación de pago antes del corte

GRÁFICO HOLOGRÁFICO:
  Gastos del mes por categoría (área chart con glow)
  Comparativo últimos 6 meses (bar chart holográfico)

TIMELINE DE TRANSACCIONES:
  Tabla holográfica con todas las transacciones
  Filtro por fecha, categoría, monto
  Flag automático de transacciones sospechosas

RESUMEN MENSUAL IA:
  "Este mes gastaste $X más que el mes pasado. El 40% fue en restaurantes.
   Si bajas esa categoría $200 podrías pagar tu tarjeta al corte y subir
   tu score en aproximadamente 15 puntos."
```

### Módulo de Taxes
```
IMAGEN HERO: IMG.taxes + overlay dorado

PASOS AUTOMÁTICOS:
  1. IA analiza transacciones del año → identifica ingresos + gastos deducibles
  2. Muestra resumen: ingresos totales, gastos deducibles, créditos aplicables
  3. Calcula estimado de reembolso con EITC + Child Tax Credit
  4. Genera checklist de documentos faltantes
  5. Guía para presentar gratis (Free File, VITA en Houston)

TABLA HOLOGRÁFICA:
  Todas las transacciones marcadas como deducibles
  Monto por categoría deducible

DISCLAIMER (obligatorio, visible y elegante):
  "Esta herramienta es educativa y te ayuda a organizarte.
   Para presentar tu declaración usa un preparador certificado."
```

---

## SISTEMA DE REFERIDOS — PAGO REAL AL BANCO

```typescript
// Flujo completo:
// 1. Usuario registra cuenta bancaria con Plaid (al onboarding)
// 2. Recibe código único: [4 letras nombre][4 dígitos]
// 3. Comparte código por WhatsApp
// 4. Amigo se registra + paga ($20/mes o $100/año)
// 5. Webhook de Stripe dispara: pagar comisión
// 6. Sistema crea Plaid Transfer ACH de $5 a cuenta del referidor
// 7. Usuario recibe WhatsApp: "¡Tu amigo se unió! Depositamos $5 en tu cuenta."
// 8. El depósito llega en 1-3 días hábiles

// Tabla en dashboard de referidos:
// Código personal (copiable con 1 clic)
// Texto WhatsApp pre-escrito:
//   "Blindado USA me está cambiando la vida financiera.
//    Tiene IA que hace de abogado, contador y asesor — todo en español.
//    3 días gratis y luego $20/mes.
//    Con mi código [CÓDIGO] ambos ganamos $5."
// Historial de referidos con estado del depósito
// Total ganado acumulado
```

---

## DIRECTORIO B2B — SISTEMA DE REGISTRO

### Página de Registro para Negocios
```
URL: /directorio/registrar-negocio

HERO: Imagen 4K de profesional hispano exitoso
PROPUESTA DE VALOR:
  "Tu negocio frente a millones de hispanos en Texas"
  "Una sola vez. De por vida. La IA lo recomienda automáticamente."

PLANES:
  Básico $299:   Listing estándar, aparece en categoría
  Premium $500:  Primero en categoría, logo grande, IA lo recomienda, fotos

FORMULARIO:
  Nombre del negocio, categoría, descripción, dirección, teléfono,
  website, foto/logo, servicios, idiomas, acepta ITIN: sí/no

PAGO:
  Stripe Checkout → pago único → acceso inmediato al listing

LA IA RECOMIENDA:
  Cuando un usuario pregunta sobre su área, la IA incluye negocios
  del directorio en sus recomendaciones con badge "Verificado BlindadoUSA"
```

### Categorías del directorio:
```
/directorio/abogados    → Abogados inmigración, laboral, consumidor
/directorio/notarios    → Notarios certificados Texas
/directorio/dealers     → Dealers carros que hablan español
/directorio/bancos      → Bancos y credit unions con ITIN
/directorio/taxes       → Preparadores de taxes verificados
/directorio/clinicas    → Clínicas y hospitales hispanos
/directorio/seguros     → Agentes de seguros de vida y médico
/directorio/realtors    → Agentes de bienes raíces hispanos
/directorio/tiendas     → Tiendas y negocios hispanos Houston
/directorio/otro        → Cualquier otro negocio de la comunidad
```

---

## WHATSAPP BUSINESS — ALERTAS AUTOMÁTICAS

```typescript
// /lib/whatsapp.ts
// Usando WhatsApp Business API (Twilio o Meta)

const ALERTAS_WHATSAPP = {
  pago_manana: (nombre, tarjeta, monto, fecha) =>
    `⚠️ BLINDADO USA: Hola ${nombre}, mañana vence el pago de tu ${tarjeta}. Monto óptimo: $${monto}. Paga antes del ${fecha} para proteger tu score.`,

  corte_hoy: (nombre, tarjeta, utilizacion) =>
    `📊 BLINDADO USA: Hola ${nombre}, hoy es el corte de tu ${tarjeta}. Tu utilización actual es ${utilizacion}%. El buró reportará este número hoy.`,

  cargo_sospechoso: (nombre, monto, comercio) =>
    `🚨 BLINDADO USA: Hola ${nombre}, detectamos un cargo de $${monto} en ${comercio}. ¿Lo autorizaste? Responde SÍ o NO.`,

  referido_pagado: (nombre, amigo, total) =>
    `💰 BLINDADO USA: ¡Hola ${nombre}! Tu amigo se unió a BlindadoUSA. Depositamos $5 en tu cuenta. Total ganado: $${total}.`,

  alerta_estafa: (nombre, tipo) =>
    `🛡️ BLINDADO USA: Alerta para ${nombre}: Se reportó una nueva estafa de tipo "${tipo}" en Houston. Entra a BlindadoUSA para ver detalles.`,

  documento_listo: (nombre, tipo) =>
    `✅ BLINDADO USA: Hola ${nombre}, tu ${tipo} está lista. Entra a tu cuenta para descargarla e imprimirla.`,
}
```

---

## VARIABLES DE ENTORNO

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_MENSUAL=   # $20/mes
STRIPE_PRICE_ID_ANUAL=     # $100/año
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
PLAID_TRANSFER_SECRET=     # Para depósitos de referidos
RESEND_API_KEY=
RESEND_FROM_EMAIL=hola@blindadousa.com
RESEND_FROM_NAME=BlindadoUSA
TWILIO_ACCOUNT_SID=        # WhatsApp Business
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_FROM=
NEXT_PUBLIC_APP_URL=https://blindadousa.com
CRON_SECRET=
ENCRYPTION_KEY=            # Para encriptar ITIN/SSN
```

---

## VERCEL.JSON — CRONS AUTOMÁTICOS

```json
{
  "crons": [
    { "path": "/api/ia/monitor",          "schedule": "0 * * * *"   },
    { "path": "/api/ia/alertas-pagos",    "schedule": "0 9 * * *"   },
    { "path": "/api/plaid/sync",          "schedule": "0 */4 * * *" },
    { "path": "/api/emails/trial-dia2",   "schedule": "0 11 * * *"  },
    { "path": "/api/emails/trial-fin",    "schedule": "0 12 * * *"  },
    { "path": "/api/emails/resumen-mes",  "schedule": "0 10 1 * *"  },
    { "path": "/api/emails/resumen-anual","schedule": "0 10 1 1 *"  }
  ]
}
```

---

## ORDEN DE IMPLEMENTACIÓN PARA MANUS

```
FASE 1 — CIMIENTOS (no saltarse)
  □ Next.js 14 + TypeScript + Tailwind
  □ globals.css con sistema 3D + holográfico completo
  □ /lib/images.ts — banco de URLs 4K
  □ /lib/anthropic.ts, stripe.ts, plaid.ts, resend.ts, whatsapp.ts
  □ Supabase schema SQL completo
  □ middleware.ts con protección trial/pago
  □ Variables de entorno

FASE 2 — AUTH + PAGOS + ONBOARDING
  □ Registro / Login / Trial con fondos 4K
  □ Onboarding 6 pasos (datos personales → ITIN → banco Plaid → WhatsApp)
  □ Stripe subscripción mensual $20 + anual $100
  □ Webhook: activa acceso + genera código referido + envía WhatsApp
  □ Sistema de depósito de $5 por referido (Plaid Transfer)

FASE 3 — LANDING PAGE
  □ Navbar oscuro sticky
  □ Hero 4K con propuesta "Guardaespaldas Financiero"
  □ Sección "20 capacidades de la IA"
  □ Sección "10 herramientas prioritarias"
  □ Sección precios 3 planes (trial/mensual/anual)
  □ Sección directorio con 10 categorías
  □ Testimonios + FAQ + CTA final
  □ Footer oscuro

FASE 4 — DASHBOARD BASE
  □ Sidebar oscuro premium (240px, colapsable en móvil)
  □ Panel principal con métricas holográficas
  □ Integración Plaid para cuentas bancarias
  □ Monitor automático de pagos y cortes
  □ Banner trial/pago

FASE 5 — IA MAESTRA
  □ Chat unificado /dashboard/ia-dios con perfil completo del usuario
  □ Generación de documentos desde el chat
  □ Integración con todas las calculadoras
  □ Alertas de WhatsApp desde el chat

FASE 6 — LOS 20 AGENTES IA
  □ Disputador crédito + seguimiento automático
  □ Generador 14 tipos de cartas + PDF descargable
  □ Preparador taxes automático desde transacciones
  □ Escáner de contratos (foto → análisis)
  □ Monitor 24/7 de cuentas (cron)
  □ Detector estafas + alertas comunitarias
  □ Negociador con guiones
  □ Asesor de seguros
  □ Asistente inmigración + Modo Emergencia ICE
  □ Agentes 11-20 de calculadoras y guías

FASE 7 — MÓDULO FINANZAS COMPLETO
  □ Control de todas las cuentas y tarjetas
  □ Gráficos holográficos de gastos
  □ Resumen mensual automático
  □ Taxes automáticos desde transacciones

FASE 8 — DIRECTORIO B2B
  □ 10 páginas de categorías con diseño individual
  □ Formulario de registro para negocios
  □ Pago Stripe $500 permanente
  □ La IA los recomienda automáticamente

FASE 9 — REFERIDOS
  □ Código personal post-pago
  □ Dashboard con historial y ganancias
  □ Depósito ACH $5 automático vía Plaid
  □ WhatsApp automático de confirmación

FASE 10 — ALERTAS WHATSAPP
  □ Opt-in en onboarding
  □ Alertas de pagos y cortes
  □ Alertas de cargos sospechosos
  □ Alertas de documentos listos
  □ Alertas comunitarias de estafas

FASE 11 — SEO + DEPLOY
  □ sitemap.ts dinámico
  □ robots.ts
  □ Metadata por página
  □ Schema JSON-LD
  □ npm run build → CERO errores
  □ vercel deploy
  □ DNS Cloudflare: blindadousa.com → Vercel
```

---

## CHECKLIST FINAL ANTES DE TERMINAR

```
DISEÑO (todos los puntos obligatorios):
  □ Fondo oscuro profundo (#020407) en 80% de la plataforma
  □ Azul marino ejecutivo como color primario
  □ Dorado solo para acentos premium y CTAs
  □ CADA sección con imagen 4K única, sin repetición
  □ Overlay semitransparente oscuro en cada imagen
  □ Todos los botones con física 3D real (se hunden al clic)
  □ Todos los cards con hover perspective-3D
  □ Todos los gráficos con efectos holográficos (glow + sweep)
  □ Todas las tablas con estilo terminal financiero
  □ Sidebar oscuro premium con íconos
  □ Mobile-first perfecto en 375px

FUNCIONALIDAD (todos los puntos):
  □ Trial 3 días sin tarjeta funciona
  □ Stripe suscripción mensual $20 funciona
  □ Stripe suscripción anual $100 funciona
  □ Plaid conecta cuentas bancarias y tarjetas
  □ Monitor de pagos/cortes envía alertas WhatsApp
  □ IA Maestra responde con contexto completo del usuario
  □ Generador de cartas produce PDF descargable
  □ Escáner de contratos lee fotos (Claude Vision)
  □ Sistema de taxes analiza transacciones Plaid
  □ Referidos depositan $5 real via Plaid Transfer
  □ Directorio permite registro con Stripe $500
  □ La IA recomienda negocios del directorio

TÉCNICO:
  □ npm run build → CERO errores, CERO warnings críticos
  □ ITIN/SSN encriptados en base de datos
  □ RLS activo en Supabase
  □ Middleware protege /dashboard/*
  □ Crons de Vercel configurados
  □ Variables de entorno completas
```

---

## EL PRINCIPIO QUE GUÍA CADA DECISIÓN

> "El hispano que entra a BlindadoUSA por primera vez
> debe sentir exactamente lo mismo que siente cuando
> contrata al mejor abogado, al mejor contador y
> al mejor asesor financiero de Houston —
> pero en su idioma, a cualquier hora,
> por el precio de 3 cafés al mes.
>
> Y la IA hace todo.
> Él solo vive su vida."

---

*BlindadoUSA.com*
*Dr. Alexander Jesús Figueredo Izaguirre — Houston, Texas*
*"Porque estar Blindado no es un lujo. Es un derecho."*

---
**DISCLAIMER INSTITUCIONAL OBLIGATORIO** en el pie de cada herramienta legal y financiera:
*"Esta herramienta es educativa y está diseñada para ayudarte a organizar tu caso y tomar decisiones informadas. No constituye asesoría legal, contable ni financiera certificada. Para casos específicos, consulta con un profesional licenciado."*
