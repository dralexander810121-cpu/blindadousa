import Link from 'next/link'
import { pageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = pageMetadata('comoFunciona')

const PASOS = [
  { n: 1, t: 'Crea tu cuenta gratis', d: 'Solo email + contraseña. Sin tarjeta de crédito.' },
  { n: 2, t: 'Activá 3 días de prueba', d: 'Acceso completo a los 13 módulos y al asistente IA.' },
  { n: 3, t: 'Respondé 5 preguntas (1 min)', d: 'Nos ayuda a personalizar lo que ves primero.' },
  { n: 4, t: 'Explorá los módulos', d: 'Empezá por el más urgente para tu vida hoy.' },
  { n: 5, t: 'Pagá $20 o $15 con código', d: 'Acceso de por vida. Garantía 30 días.' },
  { n: 6, t: 'Compartí tu código', d: 'Tus amigos pagan $15. Ayudás a más hispanos.' },
]

export default function ComoFuncionaPage() {
  return (
    <main className="bg-white py-16 min-h-screen">
      <div className="container-narrow">
        <h1 className="font-display text-5xl md:text-6xl text-primary mb-3 text-center">CÓMO FUNCIONA</h1>
        <p className="text-xl text-muted text-center mb-12">6 pasos simples para estar Blindado.</p>
        <div className="space-y-6">
          {PASOS.map(p => (
            <div key={p.n} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary text-white font-display text-2xl flex items-center justify-center">
                {p.n}
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">{p.t}</h3>
                <p className="text-muted">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/trial" className="btn-primary text-lg px-10 py-5 inline-block">
            EMPEZAR GRATIS — 3 DÍAS
          </Link>
        </div>
      </div>
    </main>
  )
}
