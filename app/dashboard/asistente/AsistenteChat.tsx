'use client'
import { useState, useRef, useEffect } from 'react'

interface Mensaje {
  rol: 'user' | 'assistant'
  mensaje: string
  ts: number
}

export default function AsistenteChat({ sugerencias }: { sugerencias: string[] }) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  async function enviar(texto: string) {
    if (!texto.trim() || loading) return
    setError(null)
    const userMsg: Mensaje = { rol: 'user', mensaje: texto.trim(), ts: Date.now() }
    setMensajes(m => [...m, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/ai/asistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: texto.trim(),
          historial: mensajes.map(m => ({ rol: m.rol, mensaje: m.mensaje })),
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'Error generando respuesta')
        return
      }
      setMensajes(m => [...m, { rol: 'assistant', mensaje: json.respuesta, ts: Date.now() }])
    } catch (err: any) {
      setError(err?.message || 'Error de red')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {mensajes.length === 0 && (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">🤖</div>
            <p className="font-bold text-primary mb-1">Hola, soy Blindado</p>
            <p className="text-sm text-muted mb-6">Preguntame lo que sea sobre tu vida financiera en USA.</p>
            <p className="text-xs text-muted mb-3 font-bold uppercase tracking-wide">Probá una pregunta:</p>
            <div className="grid gap-2 max-w-md mx-auto">
              {sugerencias.slice(0, 4).map(s => (
                <button key={s} onClick={() => enviar(s)}
                  className="text-left bg-pale hover:bg-primary hover:text-white transition-colors p-3 rounded-lg text-sm">
                  💬 {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {mensajes.map((m, i) => (
          <div key={i} className={`flex ${m.rol === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              m.rol === 'user' ? 'bg-primary text-white' : 'bg-pale text-dark'
            }`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.mensaje}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-pale rounded-2xl px-4 py-3">
              <span className="inline-flex gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}
        {error && <p className="alert-rojo text-sm">{error}</p>}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form onSubmit={e => { e.preventDefault(); enviar(input) }}
        className="border-t border-gray-100 p-3 flex gap-2">
        <input type="text" value={input} onChange={e => setInput(e.target.value)}
          placeholder="Escribí tu pregunta…" disabled={loading}
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none text-base" />
        <button type="submit" disabled={loading || !input.trim()}
          className="btn-primary px-5 py-3 text-sm disabled:opacity-50">
          {loading ? '...' : 'Enviar'}
        </button>
      </form>
    </div>
  )
}
