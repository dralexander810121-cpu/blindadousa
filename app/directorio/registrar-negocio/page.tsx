import type { Metadata } from 'next'
import Link from 'next/link'
import { Button3D } from '@/components/ui/Button3D'
import { Card3D } from '@/components/ui/Card3D'
import { ImageHero4K } from '@/components/ui/ImageHero4K'
import { MarketingFooter } from '@/components/landing/MarketingFooter'
import { MarketingNav } from '@/components/landing/MarketingNav'
import { IMG } from '@/lib/images'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata('directorioRegistrar')

const PLANES = [
  {
    id: 'basico',
    name: 'Básico',
    price: '$299',
    once: 'pago único',
    features: [
      'Perfil en tu categoría',
      'Badge verificado BlindadoUSA',
      'Visible en /directorio',
      'Revisión en 24-48 h',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$500',
    once: 'pago único',
    featured: true,
    features: [
      'Todo lo del plan Básico',
      'Destacado arriba en búsquedas',
      'Recomendaciones de la IA Maestra',
      'Mayor visibilidad en Houston y TX',
    ],
  },
]

export default function RegistrarNegocioPage() {
  return (
    <>
      <MarketingNav />
      <main id="main-content" className="pt-24">
        <ImageHero4K imageUrl={IMG.registro} minHeight="min-h-[360px]">
          <div className="marketing-container py-14">
            <Link
              href="/directorio"
              className="text-sm text-[var(--cyan-bright)] hover:underline mb-4 inline-block"
            >
              ← Volver al directorio
            </Link>
            <p className="section-kicker">Para negocios B2B</p>
            <h1 className="section-title font-display !text-5xl md:!text-6xl leading-tight">
              Tu negocio frente a{' '}
              <span className="hero-accent">millones de hispanos</span> en USA
            </h1>
            <p className="section-lead max-w-2xl mt-4">
              Aparece en el directorio verificado de BlindadoUSA. Cuando un usuario pregunta a la IA por abogados,
              dealers, taxes o clínicas en su ciudad, tu negocio puede ser la recomendación.
            </p>
          </div>
        </ImageHero4K>

        <section className="marketing-section bg-section-panel pb-16">
          <div className="marketing-container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {PLANES.map((plan) => (
                <Card3D
                  key={plan.id}
                  premium={plan.featured}
                  className={`p-6 md:p-8 flex flex-col ${plan.featured ? 'card-premium--featured' : ''}`}
                >
                  {plan.featured && (
                    <span className="text-xs uppercase text-[var(--cyan-bright)] font-bold">Recomendado</span>
                  )}
                  <h2 className="font-display text-3xl text-[var(--text-primary)] mt-1">{plan.name}</h2>
                  <p className="font-display text-5xl text-[var(--cyan-bright)] my-2">
                    {plan.price}
                    <span className="text-base text-[var(--text-muted)] font-sans font-normal ml-2">
                      {plan.once}
                    </span>
                  </p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="text-sm text-[var(--text-secondary)] flex gap-2">
                        <span className="text-[var(--cyan-bright)]">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </Card3D>
              ))}
            </div>

            <div className="auth-card card-3d text-center max-w-xl mx-auto mb-12">
              <h2 className="auth-title !text-xl mb-2">Listo para registrarte</h2>
              <p className="auth-subtitle mb-6">
                Crea tu cuenta o inicia sesión. El pago es seguro con Stripe y tu listing queda pendiente de
                verificación (24-48 h).
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button3D href="/entrar?next=/dashboard/negocios" variant="gold">
                  Iniciar sesión y pagar →
                </Button3D>
                <Button3D href="/registrarse?next=/dashboard/negocios" variant="glass">
                  Crear cuenta gratis
                </Button3D>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-5">
                ¿Ya pagaste? Tu negocio aparecerá en{' '}
                <Link href="/directorio" className="text-[var(--cyan-bright)] hover:underline">
                  /directorio
                </Link>{' '}
                tras la verificación.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 text-center">
              {[
                { n: '1', t: 'Completa el formulario', d: 'Nombre, categoría, ciudad y contacto.' },
                { n: '2', t: 'Paga con Stripe', d: 'Básico $299 o Premium $500.' },
                { n: '3', t: 'Te verificamos', d: 'Publicamos tu perfil en el directorio.' },
              ].map((step) => (
                <Card3D key={step.n} className="p-5">
                  <p className="font-display text-3xl text-[var(--cyan-bright)]">{step.n}</p>
                  <p className="font-bold text-sm text-[var(--text-primary)] mt-2">{step.t}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-2">{step.d}</p>
                </Card3D>
              ))}
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  )
}
