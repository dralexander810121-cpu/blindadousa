import { redirect } from 'next/navigation'

export default function PrestamistasPage() {
  redirect(
    '/dashboard/asistente?q=' +
      encodeURIComponent(
        'Necesito comparar opciones de préstamo personal legítimas para hispanos en Texas con ITIN o SSN. ¿Qué prestamistas evitar y qué APR es razonable?',
      ),
  )
}
