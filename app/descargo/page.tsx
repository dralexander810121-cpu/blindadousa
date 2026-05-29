import type { Metadata } from 'next'
import { MarketingContentShell } from '@/components/landing/MarketingContentShell'

export const metadata: Metadata = {
  title: 'Descargo de responsabilidad | BlindadoUSA',
  description:
    'Aviso legal sobre el alcance educativo de BlindadoUSA y límites de responsabilidad.',
  alternates: { canonical: 'https://blindadousa.com/descargo' },
}

export default function DescargoPage() {
  return (
    <MarketingContentShell title="DESCARGO DE RESPONSABILIDAD">
      <p>
        BlindadoUSA es una plataforma educativa para orientar a la comunidad hispana en temas de
        crédito, deudas, taxes, vivienda, contratos y prevención de estafas. El contenido
        publicado no constituye asesoría legal, fiscal, contable, financiera ni migratoria
        profesional.
      </p>
      <p>
        BlindadoUSA no promete ni garantiza resultados específicos. Cualquier decisión tomada a
        partir del contenido, guías, simulaciones o documentos generados es responsabilidad
        exclusiva del usuario.
      </p>
      <p>
        Los documentos o cartas generados son plantillas de apoyo informativo y deben ser
        revisados por un profesional licenciado cuando el caso lo requiera o pueda implicar
        consecuencias legales relevantes.
      </p>
      <p>
        Si necesitas asesoría profesional, contacta un abogado, contador público certificado u
        otro especialista autorizado en tu jurisdicción.
      </p>
      <p className="text-sm text-[var(--text-muted)]">
        © 2026 BlindadoUSA · Dr. Alexander Jesús Figueredo Izaguirre
      </p>
    </MarketingContentShell>
  )
}
