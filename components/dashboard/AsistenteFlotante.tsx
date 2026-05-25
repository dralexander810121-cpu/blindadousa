'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function AsistenteFlotante() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir asistente Blindado"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-accent hover:bg-accent-dark text-white shadow-lg flex items-center justify-center text-2xl transition-transform hover:scale-110"
      >
        💬
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-primary/10 p-5">
          <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-muted text-xl" aria-label="Cerrar">×</button>
          <div className="text-3xl mb-2">🤖</div>
          <h3 className="font-bold text-primary mb-1">Soy Blindado</h3>
          <p className="text-sm text-muted mb-4">Tu asistente IA personal. Preguntame cualquier duda sobre crédito, casa, taxes, derechos…</p>
          <Link href="/dashboard/asistente" onClick={() => setOpen(false)}
            className="btn-primary w-full text-sm py-3">
            Abrir chat →
          </Link>
        </div>
      )}
    </>
  )
}
