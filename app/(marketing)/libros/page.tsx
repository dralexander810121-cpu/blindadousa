import type { Metadata } from 'next'
import { MarketingNav } from '@/components/landing/MarketingNav'
import { MarketingFooter } from '@/components/landing/MarketingFooter'
import { LIBROS_HISPANO, LIBROS_GRUPOS } from '@/lib/librosHispano'

export const metadata: Metadata = {
  title: 'Libros y guías para hispanos — Dr. Figueredo | BlindadoUSA',
  description:
    'Crédito, finanzas, seguros, inmigración y trabajo del hispano en EE.UU., explicados claro. Libros y guías en PDF para comprar y descargar al instante.',
  alternates: { canonical: '/libros' },
}

const money = (n: number) => '$' + (Number.isInteger(n) ? String(n) : n.toFixed(2))

export default function LibrosPage() {
  return (
    <>
      <MarketingNav />
      <main id="main-content" className="pt-24">
        <section className="marketing-section">
          <div className="marketing-container text-center">
            <p className="section-kicker">Libros y guías</p>
            <h1 className="section-title font-display !text-4xl md:!text-5xl">
              Los libros del <span className="hero-accent">Dr. Figueredo</span>
            </h1>
            <p className="section-lead mx-auto mt-4 max-w-2xl">
              Crédito, finanzas, seguros, inmigración y trabajo del hispano en EE.UU.,
              explicados claro. {LIBROS_HISPANO.length} libros y guías en PDF para comprar
              y descargar al instante.
            </p>
          </div>
        </section>

        {LIBROS_GRUPOS.map((g) => {
          const items = LIBROS_HISPANO.filter((b) => b.grupo === g.key)
          if (items.length === 0) return null
          return (
            <section key={g.key} className="marketing-section" aria-labelledby={`grupo-${g.key}`}>
              <div className="marketing-container">
                <h2
                  id={`grupo-${g.key}`}
                  className="section-title font-display mb-6 !text-2xl md:!text-3xl"
                >
                  {g.label}
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gap: '1.5rem',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
                  }}
                >
                  {items.map((b) => (
                    <article
                      key={b.buyUrl}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        borderRadius: '16px',
                        border: '1px solid rgba(34,211,238,0.18)',
                        background: 'rgba(255,255,255,0.03)',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={b.cover}
                        alt={`Portada del libro: ${b.title}`}
                        loading="lazy"
                        style={{
                          display: 'block',
                          width: '100%',
                          aspectRatio: '3 / 4',
                          objectFit: 'cover',
                          objectPosition: 'top',
                        }}
                      />
                      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '1.25rem' }}>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                          {b.spec}
                        </p>
                        <h3 className="mt-2 text-base font-bold leading-snug text-white">
                          {b.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm text-[var(--text-muted)]">{b.desc}</p>
                        <a
                          href={b.buyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-3d-gold ux-focus-ring mt-4 text-center"
                          aria-label={`Comprar PDF: ${b.title} por ${money(b.price)}`}
                        >
                          💳 Comprar PDF — {money(b.price)}
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        <section className="marketing-section">
          <div className="marketing-container text-center">
            <p className="section-lead">
              ¿Buscas tecnología, electrónica o carros? Eso está en la tienda.
            </p>
            <a
              href="https://market.figueredomed.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass ux-focus-ring mt-4 inline-block"
            >
              🛒 Ir a Figueredo Market →
            </a>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  )
}
