import type { Metadata } from 'next'
import Link from 'next/link'
import { Button3D } from '@/components/ui/Button3D'
import { Card3DLink } from '@/components/ui/Card3DLink'
import { ImageHero4K } from '@/components/ui/ImageHero4K'
import { MarketingFooter } from '@/components/landing/MarketingFooter'
import { MarketingNav } from '@/components/landing/MarketingNav'
import { IMG } from '@/lib/images'
import { PRICING, PRODUCT_MODULES } from '@/lib/siteFacts'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata('comoFunciona')

const PASOS = [
  {
    n: '01',
    t: 'Crea tu cuenta gratis',
    d: `Solo email y contraseña. Trial de ${PRICING.trialDays} días sin tarjeta.`,
    href: '/trial',
  },
  {
    n: '02',
    t: 'Completa tu perfil',
    d: 'Indica crédito, trabajo, familia y objetivos para personalizar alertas.',
    href: '/dashboard/onboarding',
  },
  {
    n: '03',
    t: 'Conecta tu banco (opcional)',
    d: 'Plaid sincroniza cuentas para pagos, cortes y gastos.',
    href: '/dashboard/banco',
  },
  {
    n: '04',
    t: 'Usa la IA Maestra',
    d: 'Pregunta sobre taxes, crédito, carro o derechos y genera documentos.',
    href: '/dashboard/asistente',
  },
  {
    n: '05',
    t: 'Elige tu plan',
    d: `$${PRICING.monthly}/mes o $${PRICING.annual}/año después del trial. Cancela cuando quieras.`,
    href: '/precios',
  },
  {
    n: '06',
    t: `Comparte y gana $${PRICING.referralPayout}`,
    d: 'Tu código deposita por cada amigo que paga, según términos publicados.',
    href: '/dashboard/referidos',
  },
]

export default function ComoFuncionaPage() {
  return (
    <>
      <MarketingNav />
      <main id="main-content" className="pt-24">
        <ImageHero4K imageUrl={IMG.como_funciona} minHeight="min-h-[480px]">
          <div className="marketing-container py-16">
            <p className="section-kicker">Proceso simple</p>
            <h1 className="hero-title font-display !text-5xl md:!text-6xl">
              Cómo funciona <span className="hero-accent">Blindado</span>
            </h1>
            <p className="hero-sub">
              Seis pasos con enlaces directos. Cada botón abre la pantalla real del producto.
            </p>
          </div>
        </ImageHero4K>

        <section className="marketing-section bg-section-dark">
          <div className="marketing-container max-w-3xl">
            <div className="space-y-6">
              {PASOS.map((p) => (
                <Card3DLink key={p.n} href={p.href} className="flex gap-5 items-start !p-6">
                  <span className="font-mono text-[var(--cyan-bright)] font-bold text-lg shrink-0">
                    {p.n}
                  </span>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">{p.t}</h2>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{p.d}</p>
                  </div>
                  <span className="tool-card-arrow !static self-end" aria-hidden>
                    →
                  </span>
                </Card3DLink>
              ))}
            </div>
          </div>
        </section>

        <section className="marketing-section bg-section-panel">
          <div className="marketing-container">
            <h2 className="section-title text-center mb-4">{PRODUCT_MODULES.length} módulos incluidos</h2>
            <p className="section-lead mx-auto text-center mb-10">
              Disponibles desde el primer día del trial. Cada ítem abre su módulo.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {PRODUCT_MODULES.map((m) => (
                <Link
                  key={m.label}
                  href={m.href}
                  className="stat-holo !text-left !py-4 !px-4 text-sm font-semibold text-[var(--text-secondary)] hover:!border-[rgba(45,212,191,0.35)] ux-focus-ring"
                >
                  ✓ {m.label}
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button3D href="/trial" variant="gold" pulse className="text-lg">
                EMPEZAR GRATIS — {PRICING.trialDays} DÍAS
              </Button3D>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  )
}
