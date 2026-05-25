import Link from 'next/link'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata('home')

const MODULOS = [
  { icon: '💳', name: 'Mi Crédito', desc: 'Score, disputas y plan de mejora con IA', badge: 'IA' },
  { icon: '🏠', name: 'Comprar Casa', desc: 'Calculadora de hipoteca y guía legal', badge: 'CALCULADORA' },
  { icon: '🚗', name: 'Comprar Carro', desc: 'Tasa justa y trucos del dealer', badge: 'CALCULADORA' },
  { icon: '💸', name: 'Remesas 2026', desc: 'Evita el impuesto del 1% activo', badge: 'AHORRO' },
  { icon: '🔍', name: 'Escáner Préstamos', desc: 'Detecta si te quieren engañar', badge: 'IA' },
  { icon: '📈', name: 'Jubilación', desc: '401K, IRA y Roth explicados simple', badge: 'CALCULADORA' },
  { icon: '🏦', name: 'Mi Primera Cuenta', desc: 'Abre cuenta sin SSN', badge: 'GUÍA' },
  { icon: '⚖️', name: 'Salario Justo', desc: '¿Te pagan lo que mereces?', badge: 'CALCULADORA' },
  { icon: '📋', name: 'Taxes e ITIN', desc: 'Declara y recupera lo tuyo', badge: 'CALCULADORA' },
  { icon: '🛟', name: 'Emergencias', desc: 'Plan de 90 días con IA', badge: 'IA' },
  { icon: '🛡️', name: 'Mis Derechos', desc: 'ICE, trabajo, hospital, policía', badge: 'LEGAL' },
  { icon: '🎯', name: 'Subsidios', desc: 'SNAP, Medicaid, WIC y más', badge: 'QUIZ' },
  { icon: '🤖', name: 'Asistente 24/7', desc: 'Chat IA en español siempre', badge: 'IA' },
]

const STATS = [
  { n: '62M', d: 'hispanos en USA' },
  { n: '83%', d: 'sin ahorro de retiro' },
  { n: '$93B', d: 'en remesas anuales' },
  { n: '50%', d: 'mal pagados en trabajo' },
]

export default function LandingPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BlindadoUSA',
    url: 'https://blindadousa.com',
    logo: 'https://blindadousa.com/opengraph-image',
    sameAs: ['https://www.instagram.com/blindadousa', 'https://www.tiktok.com/@blindadousa'],
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'BlindadoUSA',
    description: 'Plataforma en español con 13 herramientas financieras y legales para hispanos en Estados Unidos.',
    brand: { '@type': 'Brand', name: 'BlindadoUSA' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '20.00',
      availability: 'https://schema.org/InStock',
      url: 'https://blindadousa.com/precios',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Necesito tarjeta de crédito para el trial?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. 3 días gratis sin ingresar datos de pago.' },
      },
      {
        '@type': 'Question',
        name: '¿Qué pasa cuando termina el trial?',
        acceptedAnswer: { '@type': 'Answer', text: 'Puedes continuar por $20 de por vida o $15 con código de descuento.' },
      },
      {
        '@type': 'Question',
        name: '¿Funciona en mi celular?',
        acceptedAnswer: { '@type': 'Answer', text: 'Sí, BlindadoUSA está diseñado mobile-first para iPhone y Android.' },
      },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* NAV */}
      <nav style={{ background: 'rgba(12,23,19,.95)', backdropFilter: 'blur(12px)', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <span className="font-bebas" style={{ fontSize: 28, color: 'white', letterSpacing: 3 }}>BLINDADO<span style={{ color: 'var(--accent)' }}>USA</span></span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/entrar" style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Entrar</Link>
          <Link href="/trial" className="btn-primary" style={{ padding: '10px 22px', fontSize: 14, minHeight: 40, borderRadius: 10 }}>Prueba Gratis →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-pattern hero-grid" style={{ background: 'var(--gradient-hero)', paddingTop: 140, paddingBottom: 100, paddingLeft: 24, paddingRight: 24, position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,145,58,.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -150, left: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(39,174,96,.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* Trust badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(39,174,96,.12)', border: '1px solid rgba(39,174,96,.2)', borderRadius: 30, padding: '8px 20px', marginBottom: 32 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27AE60', boxShadow: '0 0 8px #27AE60' }} />
            <span style={{ color: '#7DCEA0', fontSize: 14, fontWeight: 600 }}>Más de 3,000 hispanos ya están Blindados</span>
          </div>

          <h1 className="font-bebas" style={{ fontSize: 'clamp(42px, 9vw, 80px)', color: 'white', lineHeight: 1.02, marginBottom: 20, letterSpacing: 2 }}>
            LA GUÍA QUE NADIE<br />
            <span style={{ color: 'var(--accent)' }}>TE QUISO DAR</span>
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'rgba(255,255,255,.6)', marginBottom: 12, lineHeight: 1.7, maxWidth: 600, margin: '0 auto 40px' }}>
            Crédito. Casa. Carro. Remesas. Taxes. Tus derechos.<br />
            <span style={{ color: 'rgba(255,255,255,.85)', fontWeight: 600 }}>Todo en español. Sin mentiras. Sin que nadie te engañe.</span>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <Link href="/trial" className="btn-primary" style={{ fontSize: 18, padding: '20px 48px', borderRadius: 14, width: '100%', maxWidth: 440, animation: 'pulse-glow 3s ease infinite' }}>
              EMPIEZA GRATIS — 3 DÍAS
            </Link>
            <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 14 }}>
              Sin tarjeta. Después <strong style={{ color: 'var(--accent)' }}>$20 de por vida</strong> · Código <strong style={{ color: 'var(--gold)' }}>AETHERIS</strong>: $15
            </p>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 36 }}>
            {['🔒 Pago seguro SSL', '⚡ Acceso inmediato', '↩ Garantía 30 días', '🇺🇸 Hecho para hispanos en USA'].map(b => (
              <span key={b} className="trust-badge">{b}</span>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 56, maxWidth: 700, margin: '56px auto 0' }}>
            {STATS.map(s => (
              <div key={s.n} className="stat-glass">
                <div className="font-bebas" style={{ fontSize: 32, color: 'var(--accent)', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 4 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section id="como-funciona" style={{ background: 'var(--white)', padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 2 }}>El problema real</span>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: 'var(--dark)', marginTop: 12, lineHeight: 1.15 }}>
              No es que no puedas.<br />Es que <span style={{ color: 'var(--accent)' }}>nadie te explicó las reglas.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {[
              { icon: '💳', title: 'El crédito', desc: 'Te cobran más interés porque no conoces tu score ni cómo funciona. Cada punto que no subes te cuesta miles.', stat: '→ 28% de hispanos entiende el sistema de crédito' },
              { icon: '🏠', title: 'La casa', desc: 'El realtor te muestra lo más caro que puedes pagar, no lo que más te conviene. Y nunca te explican los costos ocultos.', stat: '→ Hispanos pagan 0.5% más de tasa promedio' },
              { icon: '🚗', title: 'El carro', desc: 'El dealer ve tu apellido y te sube la tasa. Saben que el banco aprobó 7% pero te cobran 14% y se guardan la diferencia.', stat: '→ Markup promedio del dealer: 2-2.5% extra' },
              { icon: '💸', title: 'Las remesas', desc: 'Desde enero 2026 hay impuesto del 1% en efectivo. El 70% de hispanos lo paga sin saberlo. Son miles de dólares al año.', stat: '→ $93 mil millones enviados en 2024' },
              { icon: '⚖️', title: 'El trabajo', desc: 'La mitad de hispanos reporta trato injusto: pagados menos, horas no pagadas, sin oportunidades de ascenso.', stat: '→ 50% reporta discriminación salarial' },
              { icon: '📋', title: 'Los taxes', desc: 'Miles no reclaman créditos tributarios que les pertenecen por ley. Child Tax Credit, EITC — dinero que el gobierno te debe.', stat: '→ $7,830 máximo de EITC no reclamado' },
            ].map(p => (
              <div key={p.title} className="card" style={{ borderLeft: 'none', borderTop: '3px solid var(--primary-mid)', padding: 28 }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 10, color: 'var(--dark)' }}>{p.title}</h3>
                <p style={{ color: 'var(--gray)', lineHeight: 1.7, fontSize: 15, marginBottom: 12 }}>{p.desc}</p>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-light)', background: 'var(--pale-green)', padding: '4px 10px', borderRadius: 6 }}>{p.stat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUCIÓN */}
      <section style={{ background: 'var(--dark)', padding: '100px 24px', position: 'relative' }}>
        <div className="hero-grid" style={{ position: 'absolute', inset: 0, opacity: .3 }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 2 }}>La solución</span>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: 'white', marginTop: 12, lineHeight: 1.15 }}>
              13 herramientas.<br />Una sola plataforma. <span style={{ color: 'var(--accent)' }}>$20.</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 17, marginTop: 12 }}>Calculadoras reales. Guías legales. Inteligencia artificial. En español.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
            {MODULOS.map(m => (
              <div key={m.name} className="card-dark" style={{ padding: '22px 18px', position: 'relative', overflow: 'hidden', transition: 'all .3s', cursor: 'default' }}>
                <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(232,145,58,.15)', color: 'var(--accent)', borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700, letterSpacing: .5 }}>{m.badge}</div>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{m.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: 'white', marginBottom: 6 }}>{m.name}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.5 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIO */}
      <section id="precio" style={{ background: 'var(--pale-green)', padding: '100px 24px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 2 }}>Precio</span>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: 'var(--dark)', marginTop: 12, marginBottom: 40 }}>Inversión única. Acceso de por vida.</h2>

          <div className="card" style={{ border: '2px solid var(--primary-mid)', padding: '52px 36px', boxShadow: '0 20px 60px rgba(15,43,28,.12)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--primary-mid), var(--accent), var(--primary-mid))' }} />
            <p style={{ fontSize: 14, color: 'var(--gray-light)', textDecoration: 'line-through' }}>Otros cobran $297/año por servicios similares por separado</p>
            <div className="font-bebas" style={{ fontSize: 110, color: 'var(--primary-mid)', lineHeight: 1, margin: '8px 0 4px' }}>$20</div>
            <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--dark)', marginBottom: 36 }}>UNA SOLA VEZ. PARA SIEMPRE.</p>

            <div style={{ textAlign: 'left', marginBottom: 36 }}>
              {MODULOS.map(m => (
                <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid #E8EFE9' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 700, fontSize: 16 }}>✓</span>
                  <span style={{ fontSize: 15 }}>{m.icon} {m.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--gray-light)', fontWeight: 600 }}>{m.badge}</span>
                </div>
              ))}
            </div>

            <Link href="/trial" className="btn-primary" style={{ width: '100%', fontSize: 18, padding: '20px', borderRadius: 14, justifyContent: 'center', display: 'flex' }}>
              EMPEZAR GRATIS — 3 DÍAS SIN TARJETA
            </Link>
            <p style={{ color: 'var(--gray-light)', fontSize: 13, marginTop: 14 }}>
              Después: $20 de por vida · Código <strong style={{ color: 'var(--accent)' }}>AETHERIS</strong>: $15
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
              {['🔒 Stripe SSL', '✓ Garantía 30 días', '⚡ Acceso inmediato'].map(b => (
                <span key={b} style={{ fontSize: 12, color: 'var(--gray-light)' }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section style={{ background: 'var(--white)', padding: '100px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 2 }}>Testimonios</span>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginTop: 12, color: 'var(--dark)' }}>Lo que dicen los que ya están Blindados</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { name: 'María G.', city: 'Houston, TX', text: 'Gracias a BlindadoUSA supe que mi dealer me cobraba 4% más de lo que aprobó el banco. Pedí la devolución y recuperé más de $3,000.', role: 'Enfermera' },
              { name: 'Carlos R.', city: 'Miami, FL', text: 'Nunca entendí lo del crédito. Ahora sé exactamente qué pagar y cuándo. En 6 meses subí 80 puntos. El asistente IA es increíble.', role: 'Construcción' },
              { name: 'Ana M.', city: 'Dallas, TX', text: 'Pensé que sin SSN no podía abrir cuenta. La guía me explicó que muchos bancos aceptan ITIN. Ya estoy construyendo crédito.', role: 'Restaurante' },
            ].map(t => (
              <div key={t.name} className="card" style={{ padding: 28, borderTop: '3px solid var(--primary-mid)' }}>
                <div style={{ color: 'var(--gold)', fontSize: 16, marginBottom: 16, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ color: 'var(--dark)', lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--primary-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 16 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                    <div style={{ color: 'var(--gray-light)', fontSize: 13 }}>{t.role} · {t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--pale-green)', padding: '100px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 2 }}>FAQ</span>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginTop: 12, color: 'var(--dark)' }}>Preguntas frecuentes</h2>
          </div>
          {[
            ['¿Necesito tarjeta de crédito para el trial?', 'No. 3 días gratis sin ingresar ningún dato de pago. Cero riesgo.'],
            ['¿Qué pasa cuando termina el trial?', 'Puedes continuar por $20 de por vida, o $15 si usas un código.'],
            ['¿Qué es el código AETHERIS?', 'Es un código especial que te da $5 de descuento. Pagas $15 en vez de $20.'],
            ['¿Puedo conseguir mi propio código?', 'Sí. Después de pagar recibes tu código personal. Tus amigos pagan $15 con él.'],
            ['¿Funciona en mi celular?', 'Sí. BlindadoUSA funciona perfecto en iPhone y Android. Diseñado mobile-first.'],
            ['¿Esto es asesoría legal?', 'Es información educativa basada en leyes reales. Para casos específicos recomendamos un abogado.'],
            ['¿La información está actualizada?', 'Sí. Se actualiza con cada cambio de ley. Los datos de remesas, taxes y subsidios son de 2026.'],
            ['¿Tienen garantía?', 'Sí. 30 días de garantía total. Si no te sirve, te devolvemos el dinero sin preguntas.'],
          ].map(([q, a]) => (
            <details key={q} style={{ borderBottom: '1px solid #D5E8D9', padding: '20px 0' }}>
              <summary style={{ fontWeight: 700, fontSize: 16, cursor: 'pointer', color: 'var(--dark)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {q} <span style={{ color: 'var(--primary-light)', fontSize: 22, fontWeight: 300 }}>+</span>
              </summary>
              <p style={{ color: 'var(--gray)', marginTop: 14, lineHeight: 1.8, fontSize: 15 }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="hero-pattern" style={{ background: 'var(--gradient-hero)', padding: '100px 24px', textAlign: 'center', position: 'relative' }}>
        <div className="hero-grid" style={{ position: 'absolute', inset: 0, opacity: .3 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 7vw, 60px)', color: 'white', marginBottom: 16, letterSpacing: 2 }}>¿LISTO PARA ESTAR<br /><span style={{ color: 'var(--accent)' }}>BLINDADO?</span></h2>
          <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 18, marginBottom: 36 }}>3 días gratis. Sin tarjeta. Acceso completo a todo.</p>
          <Link href="/trial" className="btn-primary" style={{ fontSize: 18, padding: '20px 52px', borderRadius: 14, animation: 'pulse-glow 3s ease infinite' }}>
            EMPEZAR GRATIS AHORA →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--dark)', padding: '60px 24px 40px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
            <div>
              <span className="font-bebas" style={{ fontSize: 26, color: 'white', letterSpacing: 3 }}>BLINDADO<span style={{ color: 'var(--accent)' }}>USA</span></span>
              <p style={{ color: 'rgba(255,255,255,.35)', fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>La biblia financiera y legal del hispano en Estados Unidos.</p>
            </div>
            <div>
              <h4 style={{ color: 'rgba(255,255,255,.6)', fontSize: 13, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>Plataforma</h4>
              <div style={{ fontSize: 14, padding: '4px 0' }}>
                <Link href="/#como-funciona" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Cómo funciona</Link>
              </div>
              <div style={{ fontSize: 14, padding: '4px 0' }}>
                <Link href="/#precio" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Precios</Link>
              </div>
              <div style={{ fontSize: 14, padding: '4px 0' }}>
                <Link href="/blog" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Blog</Link>
              </div>
              <div style={{ fontSize: 14, padding: '4px 0' }}>
                <Link href="/directorio" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Directorio</Link>
              </div>
            </div>
            <div>
              <h4 style={{ color: 'rgba(255,255,255,.6)', fontSize: 13, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>Legal</h4>
              <div style={{ fontSize: 14, padding: '4px 0' }}>
                <Link href="/terminos" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Términos de uso</Link>
              </div>
              <div style={{ fontSize: 14, padding: '4px 0' }}>
                <Link href="/privacidad" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Privacidad</Link>
              </div>
              <div style={{ fontSize: 14, padding: '4px 0' }}>
                <Link href="/descargo" style={{ color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Descargo de responsabilidad</Link>
              </div>
            </div>
            <div>
              <h4 style={{ color: 'rgba(255,255,255,.6)', fontSize: 13, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>Contacto</h4>
              <div style={{ color: 'rgba(255,255,255,.35)', fontSize: 14, lineHeight: 2 }}>Houston, Texas<br/>hola@blindadousa.com</div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ color: 'rgba(255,255,255,.25)', fontSize: 12 }}>© 2026 BlindadoUSA · Dr. Alexander Jesús Figueredo Izaguirre</p>
            <p style={{ color: 'rgba(255,255,255,.2)', fontSize: 11 }}>Información educativa, no asesoría legal ni financiera.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
