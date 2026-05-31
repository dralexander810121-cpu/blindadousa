import { redirect } from 'next/navigation'

export default function SimuladorPage() {
  redirect(
    '/dashboard/asistente?q=' +
      encodeURIComponent(
        'Simula cómo subiría mi score de crédito si pago a tiempo, bajo utilización al 10% y sin consultas nuevas en 90 días. Dame proyección por semanas.',
      ),
  )
}
