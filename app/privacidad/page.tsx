import type { Metadata } from 'next'
import { MarketingContentShell } from '@/components/landing/MarketingContentShell'

export const metadata: Metadata = {
  title: 'Política de privacidad | BlindadoUSA',
  description:
    'Conoce cómo BlindadoUSA recopila, protege y procesa tus datos personales y financieros.',
  alternates: { canonical: 'https://blindadousa.com/privacidad' },
}

export default function PrivacidadPage() {
  return (
    <MarketingContentShell title="POLÍTICA DE PRIVACIDAD">
      <p>
        En BlindadoUSA protegemos tus datos personales y financieros con medidas de seguridad
        razonables para prevenir accesos no autorizados. Solo recopilamos información necesaria
        para operar la plataforma, procesar suscripciones, brindar funcionalidades solicitadas y
        mejorar la experiencia del usuario.
      </p>
      <p>
        No vendemos información personal a terceros. Podemos compartir datos con proveedores
        tecnológicos indispensables para la operación (por ejemplo: infraestructura, pagos,
        analítica o comunicaciones), bajo obligaciones de confidencialidad y uso limitado.
      </p>
      <p>
        Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo a
        hola@blindadousa.com.
      </p>
      <p>
        Al utilizar BlindadoUSA aceptas esta política y sus actualizaciones. Si no estás de acuerdo
        con este tratamiento de datos, debes dejar de usar la plataforma.
      </p>
      <p className="text-sm text-[var(--text-muted)]">
        © 2026 BlindadoUSA · Dr. Alexander Jesús Figueredo Izaguirre
      </p>
    </MarketingContentShell>
  )
}
