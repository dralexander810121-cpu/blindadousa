import { redirect } from 'next/navigation'

export default function EstrategiaPage() {
  redirect(
    '/dashboard/asistente?q=' +
      encodeURIComponent(
        'Arma mi estrategia de deuda: método avalancha vs bola de nieve según mi situación. Pregúntame lo que necesites y dame pasos concretos.',
      ),
  )
}
