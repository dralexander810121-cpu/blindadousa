import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card3D } from '@/components/ui/Card3D'
import { ImageHero4K } from '@/components/ui/ImageHero4K'
import { MarketingFooter } from '@/components/landing/MarketingFooter'
import { MarketingNav } from '@/components/landing/MarketingNav'
import { fetchNegocioById } from '@/lib/directorio/query'
import { CATEGORIAS_DIRECTORIO } from '@/lib/directorio/seed'
import { IMG } from '@/lib/images'
import { listStitchTemplates } from '@/lib/stitchTemplates'
import { routeMetadata } from '@/lib/seo/metadata'

export const dynamic = 'force-dynamic'

type Params = { slug: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const negocio = await fetchNegocioById(slug)
  if (!negocio) {
    return routeMetadata({
      title: 'Vista previa | BlindadoUSA',
      description: 'Plantilla interna de directorio. No indexable.',
      path: `/directorio/${slug}`,
      index: false,
    })
  }
  const cat = CATEGORIAS_DIRECTORIO.find((c) => c.id === negocio.categoria)
  const desc =
    negocio.descripcion.slice(0, 155) +
    (negocio.descripcion.length > 155 ? '…' : '')
  return routeMetadata({
    title: `${negocio.nombre} — ${cat?.label ?? 'Directorio'} | BlindadoUSA`,
    description: `${desc} · ${negocio.ciudad}, ${negocio.estado}. Profesional en español.`,
    path: `/directorio/${slug}`,
  })
}

export default async function DirectorioSlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params

  const negocio = await fetchNegocioById(slug)
  if (negocio) {
    const cat = CATEGORIAS_DIRECTORIO.find((c) => c.id === negocio.categoria)
    return (
      <>
        <MarketingNav />
        <main id="main-content" className="pt-24">
          <ImageHero4K imageUrl={IMG.directorio} minHeight="min-h-[320px]">
            <div className="marketing-container py-12 md:py-14">
              <Link
                href="/directorio"
                className="text-sm text-[var(--cyan-bright)] hover:underline mb-4 inline-block"
              >
                ← Directorio
              </Link>
              {negocio.featured && (
                <span className="text-xs uppercase tracking-wider text-[var(--cyan-bright)] font-bold block mb-2">
                  Negocio destacado
                </span>
              )}
              <h1 className="section-title font-display !text-4xl md:!text-5xl !mb-2">{negocio.nombre}</h1>
              <p className="text-sm text-[var(--text-muted)]">
                {cat ? `${cat.icon} ${cat.label}` : negocio.categoria} · {negocio.ciudad}, {negocio.estado}
                {negocio.verificado ? ' · Verificado BlindadoUSA' : ''}
              </p>
            </div>
          </ImageHero4K>

          <section className="marketing-section bg-section-panel pb-16">
            <div className="marketing-container max-w-3xl">
              <Card3D className="p-6 md:p-8 mb-8">
                <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                  {negocio.descripcion}
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {negocio.acepta_itin && (
                    <span className="text-xs px-3 py-1 rounded-full bg-[var(--trust-teal-dim)] text-[var(--cyan-bright)] font-semibold">
                      Acepta ITIN
                    </span>
                  )}
                  {negocio.idiomas?.map((lang) => (
                    <span
                      key={lang}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 text-[var(--text-muted)] uppercase"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </Card3D>

              <div className="flex flex-wrap gap-3">
                {negocio.telefono && (
                  <a href={`tel:${negocio.telefono}`} className="btn-3d-blue ux-focus-ring">
                    Llamar {negocio.telefono}
                  </a>
                )}
                {negocio.website && (
                  <a
                    href={
                      negocio.website.startsWith('http') ? negocio.website : `https://${negocio.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass ux-focus-ring"
                  >
                    Sitio web →
                  </a>
                )}
                {negocio.email && (
                  <a href={`mailto:${negocio.email}`} className="btn-glass ux-focus-ring">
                    Email →
                  </a>
                )}
              </div>

              <p className="text-xs text-[var(--text-muted)] mt-8 leading-relaxed">
                La IA Maestra puede recomendar negocios verificados cuando preguntas por servicios en tu área.
              </p>
            </div>
          </section>
        </main>
        <MarketingFooter />
      </>
    )
  }

  const template = listStitchTemplates().find((item) => item.slug === slug)
  if (!template) notFound()

  return (
    <main style={{ minHeight: '100vh', background: '#050505', color: '#fff' }}>
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '1rem 1rem 0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <p style={{ fontSize: 12, color: '#a3a3a3', marginBottom: 6 }}>Vista previa de plantilla</p>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{template.title}</h1>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/directorio" style={{ color: '#2dd4bf', textDecoration: 'none' }}>
            Volver al directorio
          </Link>
          <a
            href={`/api/stitch/html/${template.slug}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#86efac', textDecoration: 'none' }}
          >
            Abrir HTML directo
          </a>
        </div>
      </div>
      <div style={{ padding: '0 1rem 1rem' }}>
        <iframe
          title={template.title}
          src={`/api/stitch/html/${template.slug}`}
          style={{
            width: '100%',
            height: 'calc(100vh - 90px)',
            border: '1px solid #262626',
            borderRadius: 12,
            background: '#fff',
          }}
        />
      </div>
    </main>
  )
}
