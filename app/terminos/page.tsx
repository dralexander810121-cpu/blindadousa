import type { Metadata } from 'next'
import { MarketingContentShell } from '@/components/landing/MarketingContentShell'

export const metadata: Metadata = {
  title: 'Términos de uso | BlindadoUSA',
  description:
    'Términos y condiciones de uso de BlindadoUSA para usuarios en Estados Unidos.',
  alternates: { canonical: 'https://blindadousa.com/terminos' },
}

export default function TerminosPage() {
  return (
    <MarketingContentShell title="TÉRMINOS DE USO">
      <p>
        Al utilizar BlindadoUSA aceptas estos términos de uso. La plataforma es de carácter
        educativo y de apoyo organizativo; no sustituye asesoría legal, fiscal, financiera ni
        contable profesional.
      </p>
      <p>
        Es responsabilidad del usuario validar decisiones relevantes con profesionales autorizados
        en su jurisdicción. BlindadoUSA no garantiza resultados específicos derivados del uso de
        herramientas, simuladores o contenido publicado.
      </p>
      <p>
        Nos reservamos el derecho de actualizar funciones, precios, políticas y condiciones de
        acceso cuando sea necesario para la operación del servicio.
      </p>
      <p className="text-sm text-[var(--text-muted)]">
        © 2026 BlindadoUSA · Dr. Alexander Jesús Figueredo Izaguirre · Houston, Texas
      </p>
    </MarketingContentShell>
  )
}
