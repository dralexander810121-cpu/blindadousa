'use client'
import { useState, useRef, useEffect } from 'react'

const SUGERENCIAS = [
  '¿Cómo subo mi score de crédito?',
  '¿Puedo comprar casa sin SSN?',
  '¿El dealer puede cambiar el contrato después de firmar?',
  '¿Qué pasa si no declaro taxes?',
  '¿Tengo derecho a intérprete en el hospital?',
  '¿Qué hago si ICE llega a mi trabajo?',
  '¿Cómo evito el impuesto de remesas 2026?',
  '¿Qué es el statute of limitations en Texas?',
]

type Msg = { rol: 'user' | 'assistant', mensaje: string }

export default function AsistentePage() {
  const [msgs, setMsgs] = useState<Msg[]>([{ rol: 'assistant', mensaje: 'Hola, soy Blindado 👋 Estoy aquí para explicarte todo sobre tus derechos y finanzas en USA. Sin jerga. Sin mentiras.\n\n¿Sobre qué quieres saber hoy?' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  async function enviar(texto?: string) {
    const msg = texto || input
    if (!msg.trim() || loading) return
    setInput('')
    const newMsgs: Msg[] = [...msgs, { rol: 'user', mensaje: msg }]
    setMsgs(newMsgs)
    setLoading(true)

    const res = await fetch('/api/ai/asistente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensaje: msg, historial: newMsgs.slice(-6) })
    })
    const data = await res.json()
    setMsgs([...newMsgs, { rol: 'assistant', mensaje: data.respuesta || 'Hubo un error. Intenta de nuevo.' }])
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, color: 'var(--dark)' }}>Asistente Blindado 🤖</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 20, fontSize: 14 }}>Chat en español disponible 24/7. Te explica todo como si fuera un amigo de confianza.</p>

      {/* Chat window */}
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 14, height: '60vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.rol === 'user' ? 'flex-end' : 'flex-start' }}>
              {m.rol === 'assistant' && <div style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, marginRight: 8, flexShrink: 0 }}>🤖</div>}
              <div style={{ maxWidth: '80%', padding: '12px 16px', borderRadius: m.rol === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: m.rol === 'user' ? 'var(--primary)' : 'var(--pale-green)', color: m.rol === 'user' ? 'white' : 'var(--dark)', fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {m.mensaje}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
              <div style={{ background: 'var(--pale-green)', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', fontSize: 14, color: 'var(--gray)' }}>Escribiendo...</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Sugerencias (solo al inicio) */}
        {msgs.length === 1 && (
          <div style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SUGERENCIAS.map(s => (
              <button key={s} onClick={() => enviar(s)} style={{ background: 'var(--pale-green)', border: '1px solid #B7E4C7', borderRadius: 20, padding: '6px 14px', fontSize: 12, color: 'var(--primary)', cursor: 'pointer', fontWeight: 500 }}>{s}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid #F3F4F6', display: 'flex', gap: 10 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), enviar())}
            placeholder="Escribe tu pregunta aquí..."
            style={{ flex: 1, border: '1.5px solid #E5E7EB', borderRadius: 24, padding: '10px 18px', fontSize: 14, outline: 'none', fontFamily: 'Inter' }} />
          <button onClick={() => enviar()} disabled={loading || !input.trim()} className="btn-green" style={{ borderRadius: '50%', width: 44, height: 44, padding: 0, minHeight: 44, fontSize: 18 }}>→</button>
        </div>
      </div>
    </div>
  )
}
