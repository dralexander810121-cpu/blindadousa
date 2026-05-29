import Link from 'next/link'
import { Button3D } from '@/components/ui/Button3D'

type Props = {
  diasRestantes: number
}

export function BannerTrial({ diasRestantes }: Props) {
  return (
    <div className="dash-banner dash-banner--trial" role="status">
      <div>
        <p className="dash-banner-title">
          ⏰ Trial activo — te quedan{' '}
          <strong>
            {diasRestantes} día{diasRestantes !== 1 ? 's' : ''}
          </strong>{' '}
          de acceso completo
        </p>
        <p className="dash-banner-sub">Sin tarjeta requerida. Actualiza antes de que expire.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button3D href="/pagar?plan=mensual" variant="gold" className="!min-h-[48px] !py-3 !text-sm">
          Activar — $20/mes
        </Button3D>
        <Button3D href="/pagar?plan=anual" variant="glass" className="!min-h-[48px] !py-3 !text-sm">
          Anual $100
        </Button3D>
      </div>
    </div>
  )
}

export function BannerPagoVencido() {
  return (
    <div className="dash-banner dash-banner--danger" role="alert">
      <div>
        <p className="dash-banner-title">Tu acceso expiró</p>
        <p className="dash-banner-sub">Renueva para seguir usando las 20 IAs y alertas automáticas.</p>
      </div>
      <Button3D href="/pagar" variant="gold" className="!min-h-[48px] !py-3 !text-sm">
        Renovar acceso
      </Button3D>
    </div>
  )
}
