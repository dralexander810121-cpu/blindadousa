import type { Metadata } from 'next'
import Link from 'next/link'
import { Button3D } from '@/components/ui/Button3D'
import { Card3D } from '@/components/ui/Card3D'
import { ImageHero4K } from '@/components/ui/ImageHero4K'
import { MarketingFooter } from '@/components/landing/MarketingFooter'
import { MarketingNav } from '@/components/landing/MarketingNav'
import {
  MODULE_COUNT_LABEL,
  PLAN_INCLUDES,
  STATUS_LABELS,
  type PlanIncludeStatus,
} from '@/lib/productCatalog'
import { IMG } from '@/lib/images'
import { PRICING } from '@/lib/siteFacts'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata('queIncluye')

const STATUS_CLASS: Record<PlanIncludeStatus, string> = {
  ready: 'plan-status plan-status--ready',
  partial: 'plan-status plan-status--partial',
  planned: 'plan-status plan-status--planned',
}

export default function QueIncluyePage() {
  const ready = PLAN_INCLUDES.filter((r) => r.status === 'ready')
  const partial = PLAN_INCLUDES.filter((r) => r.status === 'partial')
  const planned = PLAN_INCLUDES.filter((r) => r.status === 'planned')

  return (
    <>
      <MarketingNav />
      <main id="main-content" className="pt-24">
        <ImageHero4K imageUrl={IMG.precio} minHeight="min-h-[320px]">
          <div className="marketing-container py-12 text-center">
            <p className="section-kicker">Transparencia</p>
            <h1 className="section-title font-display !text-4xl md:!text-5xl">
              Qué incluye <span className="hero-accent">${PRICING.monthly}/mes</span>
            </h1>
            <p className="section-lead mx-auto text-center mt-4 max-w-2xl">
              {MODULE_COUNT_LABEL}. Tabla honesta: qué está listo hoy, qué es parcial y qué viene
              pronto. Herramienta educativa — no sustituye abogado, contador ni asesor licenciado.
            </p>
          </div>
        </ImageHero4K>

        <section className="marketing-section bg-section-panel">
          <div className="marketing-container max-w-3xl">
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {(Object.keys(STATUS_LABELS) as PlanIncludeStatus[]).map((key) => (
                <span key={key} className={STATUS_CLASS[key]}>
                  {STATUS_LABELS[key]}
                </span>
              ))}
            </div>

            <IncludeTable title="Listo para usar" rows={ready} />
            <IncludeTable title="Parcial (funciona con límites)" rows={partial} />
            <IncludeTable title="Próximamente" rows={planned} />

            <Card3D premium className="mt-10 text-center">
              <h2 className="text-xl font-bold mb-2">Precios publicados</h2>
              <p className="text-[var(--text-secondary)] text-sm mb-4">
                Mensual ${PRICING.monthly}/mes · Anual ${PRICING.annual}/año (${PRICING.annualPerMonth}
                /mes) · Trial {PRICING.trialDays} días sin tarjeta · Referido −${PRICING.referralPayout}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button3D href="/trial" variant="gold" pulse>
                  Probar gratis
                </Button3D>
                <Button3D href="/precios" variant="blue">
                  Ver planes
                </Button3D>
              </div>
            </Card3D>

            <p className="text-center text-xs text-[var(--text-muted)] mt-8 leading-relaxed">
              Los pagos son suscripciones renovables procesadas por Stripe. Puedes cancelar desde tu
              cuenta o el portal de Stripe cuando esté disponible en tu perfil.
            </p>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  )
}

function IncludeTable({
  title,
  rows,
}: {
  title: string
  rows: typeof PLAN_INCLUDES
}) {
  if (!rows.length) return null
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-3 text-[var(--text-primary)]">{title}</h2>
      <ul className="space-y-2 list-none m-0 p-0">
        {rows.map((row) => (
          <li
            key={row.name}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
          >
            <div className="flex items-center gap-2 min-w-[7rem]">
              <span className={STATUS_CLASS[row.status]}>{STATUS_LABELS[row.status]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <Link href={row.href} className="font-semibold text-[var(--cyan-bright)] hover:underline">
                {row.name}
              </Link>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{row.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
