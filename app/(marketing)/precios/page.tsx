import Link from 'next/link'
import { pageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = pageMetadata('precios')

export default function PreciosPage() {
  return (
    <main className="bg-pale py-16 min-h-screen">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl md:text-6xl text-primary mb-3">PRECIOS HONESTOS</h1>
          <p className="text-xl text-muted">Un pago. Para siempre. Sin cobros recurrentes.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Sin código */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border-2 border-gray-100">
            <p className="text-sm text-muted uppercase tracking-wide font-bold mb-2">Precio normal</p>
            <p className="font-display text-6xl text-primary leading-none my-3">$20</p>
            <p className="text-muted mb-6">Pago único · De por vida</p>
            <ul className="space-y-2 text-sm mb-6">
              <li>✓ Los 13 módulos completos</li>
              <li>✓ Asistente IA Blindado 24/7</li>
              <li>✓ Calculadoras ilimitadas</li>
              <li>✓ Acceso al directorio</li>
              <li>✓ 30 días de garantía</li>
            </ul>
            <Link href="/trial" className="btn-secondary w-full">Empezar gratis 3 días</Link>
          </div>

          {/* Con código */}
          <div className="bg-primary text-white rounded-2xl shadow-2xl p-8 border-2 border-gold relative overflow-hidden">
            <div className="absolute top-3 right-3 bg-gold text-primary text-xs font-bold px-3 py-1 rounded-full">
              ⭐ MÁS POPULAR
            </div>
            <p className="text-sm text-white/70 uppercase tracking-wide font-bold mb-2">Con código de descuento</p>
            <p className="font-display text-6xl text-gold leading-none my-3">$15</p>
            <p className="text-white/85 mb-6">Pago único · De por vida</p>
            <ul className="space-y-2 text-sm mb-6">
              <li>✓ Todo lo del plan normal</li>
              <li>✓ Mismo acceso completo</li>
              <li>✓ Mismo asistente IA</li>
              <li>✓ Mismas calculadoras</li>
              <li>✓ <strong>Ahorrás $5</strong></li>
            </ul>
            <Link href="/pagar?codigo=AETHERIS"
              className="bg-accent hover:bg-accent-dark text-white font-bold px-6 py-4 rounded-xl block text-center transition-colors">
              Pagar con código AETHERIS
            </Link>
            <p className="text-xs text-white/60 mt-3 text-center">
              También funciona con el código personal de cualquier usuario actual.
            </p>
          </div>
        </div>

        {/* Sistema referidos */}
        <div className="bg-white rounded-2xl p-6 text-center mt-12">
          <h2 className="text-2xl font-bold text-primary mb-2">🎁 Sistema de referidos</h2>
          <p className="text-muted mb-2">Después de pagar recibís TU código personal único.</p>
          <p className="text-muted">Compartilo con familia y amigos — ellos pagan $15 en vez de $20.</p>
        </div>
      </div>
    </main>
  )
}
