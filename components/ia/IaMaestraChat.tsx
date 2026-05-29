'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { CARTA_LABELS } from '@/lib/ia/prompts'

const SUGERENCIAS = [
  '¿Cómo subo mi score de crédito en 90 días?',
  'Genera una carta de disputa de crédito',
  '¿Me están pagando lo justo en Texas?',
  '¿Qué créditos de taxes puedo reclamar con ITIN?',
  'El dealer me cambió el APR — ¿qué hago?',
  '¿Qué hago si ICE llega a mi trabajo?',
]

type CartaPayload = {
  id: string
  titulo: string
  tipo: string
  cuerpo_es: string
  cuerpo_en: string
}

type Msg = {
  rol: 'user' | 'assistant'
  mensaje: string
  carta?: CartaPayload | null
}

const INTRO: Msg = {
  rol: 'assistant',
  mensaje:
    'Soy Blindado, tu IA Maestra. Tengo acceso a tu perfil, cuentas conectadas y alertas.\n\nPregúntame sobre crédito, taxes, carro, casa, derechos o pídeme generar una carta legal.\n\n¿Qué necesitas hoy?',
}

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function CartaCard({ carta }: { carta: CartaPayload }) {
  const label = CARTA_LABELS[carta.tipo] ?? carta.tipo
  return (
    <div className="ia-carta-card">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--gold-400)] mb-1">
        Documento generado
      </p>
      <p className="font-bold text-[var(--text-primary)] mb-1">{carta.titulo}</p>
      <p className="text-xs text-[var(--text-muted)] mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-glass !min-h-[40px] !py-2 !px-4 !text-xs"
          onClick={() => navigator.clipboard.writeText(carta.cuerpo_es)}
        >
          Copiar ES
        </button>
        <button
          type="button"
          className="btn-glass !min-h-[40px] !py-2 !px-4 !text-xs"
          onClick={() => navigator.clipboard.writeText(carta.cuerpo_en)}
        >
          Copiar EN
        </button>
        <button
          type="button"
          className="btn-3d-blue !min-h-[40px] !py-2 !px-4 !text-xs"
          onClick={() => downloadText(`${carta.tipo}-es.txt`, carta.cuerpo_es)}
        >
          Descargar ES
        </button>
        <Link href="/dashboard/credito/cartas" className="btn-glass !min-h-[40px] !py-2 !px-4 !text-xs">
          Ver todas →
        </Link>
      </div>
    </div>
  )
}

export function IaMaestraChat() {
  const searchParams = useSearchParams()
  const [msgs, setMsgs] = useState<Msg[]>([INTRO])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const prefilled = useRef(false)

  useEffect(() => {
    const q = searchParams.get('q')?.trim()
    if (q && !prefilled.current) {
      prefilled.current = true
      setInput(q)
    }
  }, [searchParams])

  useEffect(() => {
    fetch('/api/ia/maestro')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.mensajes?.length) {
          setMsgs(
            data.mensajes.map((m: { rol: string; mensaje: string }) => ({
              rol: (m.rol === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
              mensaje: m.mensaje,
            })),
          )
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, loading])

  async function enviar(texto?: string) {
    const msg = (texto || input).trim()
    if (!msg || loading) return
    setError(null)
    setInput('')

    const histSource = msgs.length > 0 && msgs[0] === INTRO ? msgs.slice(1) : msgs
    const newMsgs: Msg[] = [...msgs, { rol: 'user', mensaje: msg }]
    setMsgs(newMsgs)
    setLoading(true)

    try {
      const res = await fetch('/api/ia/maestro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: msg,
          historial: histSource.slice(-8).map((m) => ({ rol: m.rol, mensaje: m.mensaje })),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'No se pudo obtener respuesta')
        setMsgs((m) => m.slice(0, -1))
        return
      }
      setMsgs([
        ...newMsgs,
        {
          rol: 'assistant',
          mensaje: data.respuesta,
          carta: data.carta ?? null,
        },
      ])
    } catch {
      setError('Error de conexión. Intenta de nuevo.')
      setMsgs((m) => m.slice(0, -1))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ia-maestra-wrap">
      <div className="ia-maestra-status">
        <span className="pulse-dot" aria-hidden />
        IA Maestra activa · contexto de perfil y cuentas cargado
      </div>

      <div className="ia-maestra-chat">
        <div className="ia-maestra-messages">
          {msgs.map((m, i) => (
            <div key={i} className={`ia-bubble-row ia-bubble-row--${m.rol}`}>
              {m.rol === 'assistant' && (
                <span className="ia-avatar" aria-hidden>
                  🔮
                </span>
              )}
              <div className={`ia-bubble ia-bubble--${m.rol}`}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.mensaje}</p>
                {m.carta && <CartaCard carta={m.carta} />}
              </div>
            </div>
          ))}
          {loading && (
            <div className="ia-bubble-row ia-bubble-row--assistant">
              <span className="ia-avatar" aria-hidden>
                🔮
              </span>
              <div className="ia-bubble ia-bubble--assistant ia-bubble--typing">
                Analizando tu caso…
              </div>
            </div>
          )}
          {error && <p className="text-sm text-[var(--red-500)] px-2">{error}</p>}
          <div ref={bottomRef} />
        </div>

        {msgs.length <= 1 && (
          <div className="ia-suggestions">
            {SUGERENCIAS.map((s) => (
              <button key={s} type="button" className="ia-suggestion-chip" onClick={() => enviar(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          className="ia-input-bar"
          onSubmit={(e) => {
            e.preventDefault()
            enviar()
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="¿Qué necesitas hoy? Crédito, taxes, carta legal, negociación…"
            disabled={loading}
            aria-label="Mensaje para la IA Maestra"
          />
          <button type="submit" className="btn-3d-gold !min-h-[48px] !px-5" disabled={loading || !input.trim()}>
            Enviar
          </button>
        </form>
      </div>

      <p className="dash-disclaimer mt-4">
        Herramienta educativa. No constituye asesoría legal, contable ni financiera certificada.
      </p>
    </div>
  )
}
