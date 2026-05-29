'use client'

import { useEffect, useState } from 'react'
import { Button3D } from '@/components/ui/Button3D'
import { Card3D } from '@/components/ui/Card3D'
import { Card3DLink } from '@/components/ui/Card3DLink'
import { ImageHero4K } from '@/components/ui/ImageHero4K'
import { MarketingFooter } from '@/components/landing/MarketingFooter'
import { MarketingNav } from '@/components/landing/MarketingNav'
import { IMG } from '@/lib/images'

type Categoria = { id: string; label: string; icon: string }
type Negocio = {
  id: string
  nombre: string
  categoria: string
  descripcion: string
  ciudad: string
  estado: string
  telefono?: string
  acepta_itin: boolean
  verificado: boolean
  featured: boolean
}

export default function DirectorioPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [negocios, setNegocios] = useState<Negocio[]>([])
  const [cat, setCat] = useState<string | null>(null)
  const [ciudad, setCiudad] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams()
    if (cat) params.set('categoria', cat)
    if (ciudad.trim()) params.set('ciudad', ciudad.trim())
    setLoading(true)
    fetch(`/api/directorio?${params}`)
      .then((r) => r.json())
      .then((d) => {
        setCategorias(d.categorias ?? [])
        setNegocios(d.negocios ?? [])
      })
      .finally(() => setLoading(false))
  }, [cat, ciudad])

  return (
    <>
      <MarketingNav />
      <main id="main-content" className="pt-24">
        <ImageHero4K imageUrl={IMG.directorio} minHeight="min-h-[360px]">
          <div className="marketing-container py-14">
            <p className="section-kicker">Directorio B2B</p>
            <h1 className="section-title font-display !text-5xl md:!text-6xl">
              Directorio <span className="hero-accent">verificado</span>
            </h1>
            <p className="section-lead max-w-2xl mt-4">
              Abogados, dealers, bancos, taxes y más — negocios que hablan español y entienden a la comunidad.
            </p>
          </div>
        </ImageHero4K>

        <section className="marketing-section bg-section-panel pb-16">
          <div className="marketing-container">
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                type="button"
                onClick={() => setCat(null)}
                className={`dir-filter ${!cat ? 'dir-filter--active' : ''}`}
              >
                Todos
              </button>
              {categorias.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCat(c.id)}
                  className={`dir-filter ${cat === c.id ? 'dir-filter--active' : ''}`}
                >
                  {c.icon} {c.label}
                </button>
              ))}
            </div>

            <input
              className="auth-input ux-focus-ring w-full max-w-sm mb-10"
              placeholder="Filtrar por ciudad (ej. Houston)"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
            />

            {loading ? (
              <p className="text-[var(--text-muted)]">Cargando negocios…</p>
            ) : negocios.length === 0 ? (
              <p className="text-[var(--text-muted)] mb-10">
                No hay negocios con esos filtros. Prueba otra categoría o ciudad.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {negocios.map((n) => (
                  <Card3DLink key={n.id} href={`/directorio/${n.id}`} className="p-5 flex flex-col">
                    {n.featured && (
                      <span className="text-xs uppercase tracking-wider text-[var(--cyan-bright)] font-bold">
                        Destacado
                      </span>
                    )}
                    <h2 className="font-bold text-[var(--text-primary)] mt-1 mb-2 group-hover:text-[var(--cyan-bright)]">
                      {n.nombre}
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-3 flex-1">
                      {n.descripcion}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mb-3">
                      {n.ciudad}, {n.estado}
                      {n.acepta_itin ? ' · Acepta ITIN' : ''}
                      {n.verificado ? ' · Verificado' : ''}
                    </p>
                    {n.telefono && (
                      <a
                        href={`tel:${n.telefono}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-[var(--cyan-bright)] font-semibold hover:underline mt-auto"
                      >
                        Llamar →
                      </a>
                    )}
                  </Card3DLink>
                ))}
              </div>
            )}

            <Card3D className="p-6 md:p-8 border border-[var(--cyan-bright)]/20 max-w-xl">
              <h2 className="font-bold text-lg mb-2 text-[var(--text-primary)]">¿Tienes un negocio?</h2>
              <p className="text-sm text-[var(--text-muted)] mb-5">
                Aparece en el directorio y la IA Maestra puede recomendarte a usuarios en tu área.
              </p>
              <Button3D href="/directorio/registrar-negocio" variant="gold">
                Registrar mi negocio →
              </Button3D>
            </Card3D>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  )
}
