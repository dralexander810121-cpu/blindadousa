import type { Metadata } from 'next'
import Link from 'next/link'
import { Button3D } from '@/components/ui/Button3D'
import { Card3D } from '@/components/ui/Card3D'
import { ImageHero4K } from '@/components/ui/ImageHero4K'
import { MarketingFooter } from '@/components/landing/MarketingFooter'
import { MarketingNav } from '@/components/landing/MarketingNav'
import { IMG } from '@/lib/images'
import { MODULE_COUNT_LABEL } from '@/lib/productCatalog'
import { PRICING } from '@/lib/siteFacts'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata('precios')

export default function PreciosPage() {
  return (
    <>
      <MarketingNav />
      <main id="main-content" className="pt-24">
        <ImageHero4K imageUrl={IMG.precio} minHeight="min-h-[360px]">
          <div className="marketing-container py-14 text-center">
            <p className="section-kicker">Inversión clara</p>
            <h1 className="section-title font-display !text-5xl md:!text-6xl">
              Precios <span className="hero-accent">publicados</span>
            </h1>
            <p className="section-lead mx-auto text-center mt-4">
              Trial sin tarjeta. Planes mensual y anual visibles. Sin letra pequeña oculta.
            </p>
          </div>
        </ImageHero4K>

        <section className="marketing-section bg-section-panel pb-16">
          <div className="marketing-container">
            <div className="pricing-grid max-w-4xl mx-auto">
              <Card3D className="flex flex-col">
                <p className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">Trial</p>
                <p className="price-amount">$0</p>
                <p className="text-[var(--text-secondary)] mb-4">{PRICING.trialDays} días · Sin tarjeta</p>
                <ul className="price-features flex-1">
                  <li>Ecosistema completo</li>
                  <li>{MODULE_COUNT_LABEL}</li>
                  <li>21 guías en el blog</li>
                </ul>
                <Button3D href="/trial" variant="glass" className="w-full">
                  Activar trial
                </Button3D>
              </Card3D>

              <Card3D premium className="card-premium--featured flex flex-col">
                <span className="text-sm font-bold uppercase text-[var(--gold-400)] mb-2">Plan mensual</span>
                <p className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">Stripe Checkout</p>
                <p className="price-amount">${PRICING.monthly}</p>
                <p className="text-[var(--text-secondary)] mb-4">/mes</p>
                <ul className="price-features flex-1">
                  <li>IA Maestra y documentos</li>
                  <li>Plaid + alertas WhatsApp</li>
                  <li>Referidos ${PRICING.referralPayout} ACH</li>
                </ul>
                <Button3D href="/pagar?plan=mensual" variant="gold" pulse className="w-full">
                  Suscribirme — ${PRICING.monthly}/mes
                </Button3D>
              </Card3D>

              <Card3D className="flex flex-col">
                <p className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">Anual</p>
                <p className="price-amount">${PRICING.annual}</p>
                <p className="text-[var(--text-secondary)]">
                  /año · ${PRICING.annualPerMonth}/mes
                </p>
                <p className="text-sm text-[var(--gold-400)] font-bold mb-4">
                  Ahorra ${PRICING.annualSavings}
                </p>
                <ul className="price-features flex-1">
                  <li>Todo el plan mensual</li>
                  <li>Resumen anual PDF</li>
                  <li>Soporte prioritario</li>
                </ul>
                <Button3D href="/pagar?plan=anual" variant="blue" className="w-full">
                  Plan anual — ${PRICING.annual}
                </Button3D>
              </Card3D>
            </div>

            <div className="referidos-banner max-w-2xl mx-auto">
              <h2 className="text-xl font-bold mb-2">Programa de referidos</h2>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Tras pagar recibes tu código. Por cada amigo suscrito depositamos{' '}
                <strong className="text-[var(--text-primary)]">${PRICING.referralPayout}</strong> vía ACH,
                según términos publicados.
              </p>
              <Button3D href="/dashboard/referidos" variant="glass" className="mt-4">
                Ver detalle del programa →
              </Button3D>
            </div>

            <p className="text-center text-sm text-[var(--text-muted)] mt-8">
              <Link href="/que-incluye" className="text-[var(--cyan-bright)] font-semibold hover:underline">
                Ver tabla completa: qué incluye $20/mes →
              </Link>
            </p>

            <p className="text-center text-sm text-[var(--text-muted)] mt-6 max-w-lg mx-auto leading-relaxed">
              Herramienta educativa. No constituye asesoría legal, contable ni financiera certificada.
            </p>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  )
}
