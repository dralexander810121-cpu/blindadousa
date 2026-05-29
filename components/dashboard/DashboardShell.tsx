'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { IaFlotante } from '@/components/dashboard/IaFlotante'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { banana2FallbacksForPrimary, IMG } from '@/lib/images'
import { useBanana2Background } from '@/lib/useBanana2Background'

function resolveDashboardBg(pathname: string) {
  if (pathname.startsWith('/dashboard/credito')) return IMG.credito
  if (pathname.startsWith('/dashboard/carro')) return IMG.carro
  if (pathname.startsWith('/dashboard/casa')) return IMG.casa
  if (pathname.startsWith('/dashboard/taxes')) return IMG.taxes
  if (pathname.startsWith('/dashboard/banco')) return IMG.banco
  if (pathname.startsWith('/dashboard/prestamos')) return IMG.prestamos
  if (pathname.startsWith('/dashboard/remesas')) return IMG.remesas
  if (pathname.startsWith('/dashboard/referidos')) return IMG.referidos
  if (pathname.startsWith('/dashboard/trabajo')) return IMG.trabajo
  if (pathname.startsWith('/dashboard/emergencia')) return IMG.emergencia
  if (pathname.startsWith('/dashboard/derechos')) return IMG.derechos
  if (pathname.startsWith('/dashboard/subsidios')) return IMG.subsidios
  if (pathname.startsWith('/dashboard/asistente')) return IMG.asistente
  if (pathname.startsWith('/dashboard/documentos')) return IMG.documentos
  if (pathname.startsWith('/dashboard/jubilacion')) return IMG.jubilacion
  if (pathname.startsWith('/dashboard/onboarding')) return IMG.login
  if (pathname.startsWith('/dashboard/configuracion')) return IMG.login
  if (pathname.startsWith('/dashboard/negocios')) return IMG.directorio
  if (pathname.startsWith('/dashboard/ia-dios')) return IMG.ia_dios
  if (pathname.startsWith('/dashboard/admin')) return IMG.directorio
  return IMG.hero
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const bgPrimary = resolveDashboardBg(pathname || '/dashboard')
  const bgImage = useBanana2Background(bgPrimary, banana2FallbacksForPrimary(bgPrimary))

  return (
    <div className="dash-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dash-main-wrap">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main
          id="main-content"
          className="dash-content dash-content--banana"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {children}
        </main>
      </div>
      <IaFlotante />
    </div>
  )
}
