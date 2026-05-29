import { Suspense } from 'react'
import { IaMaestraChat } from '@/components/ia/IaMaestraChat'
import { pageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = pageMetadata('asistente', {
  title: 'IA Maestra Blindado — Chat 24/7 con contexto completo | BlindadoUSA',
})

export default function AsistentePage() {
  return (
    <div className="dash-page dash-page--banana">
      <div className="dash-page-head">
        <div>
          <p className="section-kicker !mb-2">Oracle · IA Maestra</p>
          <h1 className="dash-page-title">Tu equipo completo en un chat</h1>
          <p className="dash-page-date">
            Abogado, contador, negociador y protector — con acceso a tu perfil y cuentas.
          </p>
        </div>
      </div>
      <Suspense fallback={<p className="text-sm text-[var(--text-muted)] p-4">Cargando asistente…</p>}>
        <IaMaestraChat />
      </Suspense>
    </div>
  )
}
