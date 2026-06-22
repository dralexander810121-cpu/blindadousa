import Link from 'next/link'
import { Button3D } from '@/components/ui/Button3D'
import { Card3D } from '@/components/ui/Card3D'
import { Card3DLink } from '@/components/ui/Card3DLink'
import { ImageHero4K } from '@/components/ui/ImageHero4K'
import { StatHoloGrid } from '@/components/ui/StatHoloGrid'
import { HOME_FAQ, HomeJsonLd } from '@/components/landing/HomeJsonLd'
import { MarketingFooter } from '@/components/landing/MarketingFooter'
import { MarketingNav } from '@/components/landing/MarketingNav'
import { IMG } from '@/lib/images'
import {
  FEATURED_TOOLS,
  IA_MODULES,
  PRICING,
  SITE_STATS,
  TRUST_SIGNALS,
} from '@/lib/siteFacts'

const DIR_CATS = [
  { icon: '⚖️', label: 'Abogados' },
  { icon: '📋', label: 'Notarios' },
  { icon: '🚗', label: 'Dealers' },
  { icon: '🏦', label: 'Bancos' },
  { icon: '📊', label: 'Taxes' },
  { icon: '🏥', label: 'Clínicas' },
  { icon: '🛡️', label: 'Seguros' },
  { icon: '🏠', label: 'Realtors' },
]

export function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <MarketingNav />

      <main id="main-content">
        <ImageHero4K imageUrl={IMG.hero} minHeight="min-h-screen" className="hero-premium">
          <div className="marketing-container hero-premium-inner flex flex-col justify-center min-h-[calc(100vh-80px)]">
            <div className="hero-badge">
              <span className="pulse-dot" aria-hidden />
              Plataforma educativa · Houston, TX · Español
            </div>

            <h1 className="hero-title font-display ux-density-tight">
              El primer
              <br />
              <span className="hero-accent">guardaespaldas</span>
              <br />
              financiero hispano
            </h1>

            <p className="hero-sub">
              Herramientas reales de crédito, taxes, vivienda, derechos y banco. IA en español,
              documentos listos para usar y calculadoras basadas en leyes y tarifas publicadas.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button3D href="/trial" variant="gold" pulse>
                EMPIEZA GRATIS — {PRICING.trialDays} DÍAS
              </Button3D>
              <Button3D href="/como-funciona" variant="glass">
                Ver cómo funciona →
              </Button3D>
            </div>

            <div className="hero-pills">
              <span className="hero-pill">Sin tarjeta en el trial</span>
              <span className="hero-pill">${PRICING.monthly}/mes publicado</span>
              <span className="hero-pill">Pagos con Stripe</span>
              <span className="hero-pill">Para hispanos en USA</span>
            </div>

            <StatHoloGrid stats={SITE_STATS} className="mt-12 max-w-3xl" />

            <p className="text-sm text-[var(--text-muted)] mt-8 max-w-xl leading-relaxed">
              Herramienta educativa. No sustituye asesoría legal, contable ni financiera licenciada.
              Consulta profesionales para decisiones específicas.
            </p>
          </div>
        </ImageHero4K>

        {/* BANNER OFICIAL BLINDADO USA — sello de marca (desktop + móvil) */}
        <section style={{ width: '100%', background: '#05140d', lineHeight: 0 }} aria-label="Blindado USA — Tu Escudo Financiero">
          <picture>
            <source media="(max-width: 640px)" srcSet="/images/blindado-banner-mobile.jpeg" />
            <img
              src="/images/blindado-banner.png"
              alt="Blindado USA — Tu Escudo Financiero · Protección financiera y legal"
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
          </picture>
        </section>

        <ImageHero4K imageUrl={IMG.ia_dios} className="marketing-section">
          <div className="marketing-container py-16 md:py-24">
            <p className="section-kicker">Módulos activos</p>
            <h2 className="section-title font-display !text-4xl md:!text-5xl">
              Cada área financiera
              <br />
              con su <span className="hero-accent">propia herramienta</span>
            </h2>
            <p className="section-lead mb-12">
              Cada tarjeta abre un módulo real del dashboard. Sin demos decorativas.
            </p>
            <div className="ia-cap-grid">
              {IA_MODULES.map((c) => (
                <Card3DLink key={c.t} href={c.href} className="ia-cap-card">
                  <div className="ia-cap-icon" aria-hidden>
                    {c.icon}
                  </div>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  <span className="tool-card-arrow" aria-hidden>
                    Abrir →
                  </span>
                </Card3DLink>
              ))}
            </div>
          </div>
        </ImageHero4K>

        <section className="marketing-section bg-section-dark" aria-labelledby="tools-heading">
          <div className="marketing-container">
            <p className="section-kicker">Herramientas publicadas</p>
            <h2 id="tools-heading" className="section-title">
              10 flujos listos para usar hoy
            </h2>
            <p className="section-lead mb-12">
              Calculadoras, generadores de cartas y escáneres con rutas directas al producto.
            </p>
            <div className="tool-grid">
              {FEATURED_TOOLS.map((tool) => (
                <Card3DLink key={tool.n} href={tool.href} className="tool-card-link">
                  <p className="tool-card-num">{tool.n}</p>
                  <h3>{tool.t}</h3>
                  <p>{tool.d}</p>
                  <span className="tool-card-arrow" aria-hidden>
                    Ir →
                  </span>
                </Card3DLink>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button3D href="/trial" variant="gold">
                Probar todo gratis — {PRICING.trialDays} días
              </Button3D>
            </div>
          </div>
        </section>

        {/* LIBROS Y GUÍAS — acceso a los libros del Dr. (Figueredo Market) */}
        <section className="marketing-section" aria-labelledby="libros-heading">
          <div className="marketing-container text-center">
            <p className="section-kicker">Libros y guías</p>
            <h2 id="libros-heading" className="section-title">
              Los libros del <span className="hero-accent">Dr. Figueredo</span>
            </h2>
            <p className="section-lead mb-10 mx-auto max-w-2xl">
              Crédito, finanzas, bienes raíces, taxes y derechos del hispano en EE.UU.,
              explicados claro. Más de 20 libros y guías para comprar y descargar.
            </p>
            <a
              href="https://market.figueredomed.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-gold ux-focus-ring pulse-cta"
            >
              📚 Ver los libros →
            </a>
          </div>
        </section>

        <ImageHero4K imageUrl={IMG.precio} className="marketing-section">
          <div className="marketing-container py-16 md:py-24">
            <div className="text-center mb-12">
              <p className="section-kicker">Precios publicados</p>
              <h2 className="section-title font-display !text-4xl md:!text-5xl mx-auto text-center">
                Inversión <span className="hero-accent">transparente</span>
              </h2>
            </div>

            <div className="pricing-grid max-w-4xl mx-auto">
              <Card3D className="flex flex-col text-center">
                <p className="text-sm font-bold uppercase text-[var(--text-muted)]">Trial</p>
                <p className="price-amount">$0</p>
                <p className="text-[var(--text-secondary)] mb-4">{PRICING.trialDays} días · Sin tarjeta</p>
                <ul className="price-features flex-1">
                  <li>Acceso completo al ecosistema</li>
                  <li>13 módulos + IA Maestra</li>
                  <li>21 guías en el blog</li>
                </ul>
                <Button3D href="/trial" variant="glass" className="w-full">
                  Activar trial
                </Button3D>
              </Card3D>

              <Card3D premium className="card-premium--featured flex flex-col text-center">
                <span className="text-sm font-bold uppercase text-[var(--gold-400)]">Plan mensual</span>
                <p className="text-sm font-bold uppercase text-[var(--text-muted)] mt-2">Publicado</p>
                <p className="price-amount">${PRICING.monthly}</p>
                <p className="text-[var(--text-secondary)] mb-4">/mes · cancela cuando quieras</p>
                <ul className="price-features flex-1">
                  <li>IA Maestra y documentos</li>
                  <li>Plaid + alertas WhatsApp</li>
                  <li>Directorio y referidos ${PRICING.referralPayout}</li>
                </ul>
                <Button3D href="/pagar?plan=mensual" variant="gold" pulse className="w-full">
                  Suscribirme — ${PRICING.monthly}/mes
                </Button3D>
              </Card3D>

              <Card3D className="flex flex-col text-center">
                <p className="text-sm font-bold uppercase text-[var(--text-muted)]">Anual</p>
                <p className="price-amount">${PRICING.annual}</p>
                <p className="text-[var(--text-secondary)]">
                  /año · ${PRICING.annualPerMonth}/mes
                </p>
                <p className="text-sm text-[var(--gold-400)] font-bold mb-4">
                  Ahorra ${PRICING.annualSavings} vs mensual
                </p>
                <ul className="price-features flex-1">
                  <li>Todo el plan mensual</li>
                  <li>Resumen financiero anual</li>
                  <li>Soporte prioritario</li>
                </ul>
                <Button3D href="/pagar?plan=anual" variant="blue" className="w-full">
                  Plan anual — ${PRICING.annual}
                </Button3D>
              </Card3D>
            </div>

            <p className="text-center text-sm text-[var(--text-muted)] mt-8">
              <Link href="/que-incluye" className="text-[var(--cyan-bright)] font-semibold hover:underline">
                Ver qué incluye cada plan (tabla honesta) →
              </Link>
            </p>

            <div className="referidos-banner max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-2 text-[var(--cyan-bright)]">Programa de referidos</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Tras pagar recibes tu código. Ganas{' '}
                <strong className="text-[var(--text-primary)]">${PRICING.referralPayout}</strong> por cada amigo
                que se suscribe con él, vía ACH según términos publicados.
              </p>
              <Button3D href="/precios" variant="glass" className="mt-4">
                Ver planes y referidos →
              </Button3D>
            </div>
          </div>
        </ImageHero4K>

        <ImageHero4K imageUrl={IMG.directorio} className="marketing-section">
          <div className="marketing-container py-16 md:py-24 text-center">
            <p className="section-kicker">Directorio B2B</p>
            <h2 className="section-title font-display !text-4xl md:!text-5xl mx-auto">
              Profesionales hispanos en <span className="hero-accent">Texas</span>
            </h2>
            <p className="section-lead mx-auto text-center mb-10">
              Abogados, notarios, dealers, clínicas y más. Listado verificable y registro para negocios.
            </p>
            <div className="dir-cats max-w-2xl mx-auto mb-10">
              {DIR_CATS.map((c) => (
                <div key={c.label} className="dir-cat">
                  <span aria-hidden>{c.icon}</span>
                  {c.label}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button3D href="/directorio" variant="blue">
                Ver directorio
              </Button3D>
              <Button3D href="/directorio/registrar-negocio" variant="glass">
                Registrar negocio →
              </Button3D>
            </div>
          </div>
        </ImageHero4K>

        <ImageHero4K imageUrl={IMG.testimonios} className="marketing-section">
          <div className="marketing-container py-16 md:py-24">
            <p className="section-kicker">Confianza verificable</p>
            <h2 className="section-title mb-4">Profesionalismo antes que promesas</h2>
            <p className="section-lead mb-12 max-w-2xl">
              Publicamos precios, descargos y contenido educativo real. No usamos testimonios inventados
              ni resultados garantizados.
            </p>
            <div className="trust-grid">
              {TRUST_SIGNALS.map((item) => (
                <Card3D key={item.title} className="trust-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <Button3D href={item.href} variant="glass" className="w-full !min-h-[48px]">
                    {item.cta}
                  </Button3D>
                </Card3D>
              ))}
            </div>
          </div>
        </ImageHero4K>

        <section className="marketing-section bg-section-panel" aria-labelledby="faq-heading">
          <div className="marketing-container max-w-3xl">
            <h2 id="faq-heading" className="section-title text-center mb-10">
              Preguntas frecuentes
            </h2>
            {HOME_FAQ.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <ImageHero4K imageUrl={IMG.cta_final} minHeight="min-h-[420px]" className="marketing-section">
          <div className="marketing-container py-20 text-center flex flex-col items-center justify-center min-h-[420px]">
            <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Protege tu futuro
              <br />
              <span className="hero-accent">con información real</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mb-8 leading-relaxed">
              Activa tu trial de {PRICING.trialDays} días, explora los módulos y decide con precios
              publicados.
            </p>
            <Button3D href="/trial" variant="gold" pulse className="text-lg">
              ACTIVAR TRIAL GRATIS — {PRICING.trialDays} DÍAS
            </Button3D>
          </div>
        </ImageHero4K>
      </main>

      <MarketingFooter />
    </>
  )
}
