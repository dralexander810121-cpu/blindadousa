'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'

type Analisis = {
  resumen: string
  nivel_riesgo: string
  problemas: { titulo: string; explicacion: string; gravedad: string }[]
  clausulas_sospechosas: string[]
  preguntas_antes_firmar: string[]
}

const TIPOS = [
  { id: 'auto', label: '🚗 Auto / dealer' },
  { id: 'renta', label: '🏠 Renta' },
  { id: 'prestamo', label: '💰 Préstamo' },
  { id: 'medico', label: '🏥 Médico' },
  { id: 'otro', label: '📄 Otro' },
]

const RIESGO_COLOR: Record<string, string> = {
  bajo: 'var(--emerald-400)',
  medio: 'var(--gold-400)',
  alto: '#f87171',
}

type Props = { tipoInicial?: string }

export function EscanearContrato({ tipoInicial }: Props) {
  const validTipo = TIPOS.some((t) => t.id === tipoInicial) ? tipoInicial! : 'auto'
  const [tipo, setTipo] = useState(validTipo)
  const [texto, setTexto] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg')
  const [imagenBase64, setImagenBase64] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [analisis, setAnalisis] = useState<Analisis | null>(null)
  const [carta, setCarta] = useState<{ titulo: string; cuerpo_es: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function onFile(file: File | null) {
    if (!file) return
    if (file.size > 4_500_000) {
      setError('La imagen es muy grande (máx. ~4 MB).')
      return
    }
    const mt = file.type as 'image/jpeg' | 'image/png' | 'image/webp'
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(mt)) {
      setError('Usa JPG, PNG o WebP. Para PDF, pega el texto abajo.')
      return
    }
    setMediaType(mt)
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setPreview(result)
      setImagenBase64(result)
      setError('')
    }
    reader.readAsDataURL(file)
  }

  async function escanear() {
    if (!texto.trim() && !imagenBase64) {
      setError('Sube una foto o pega el texto del contrato.')
      return
    }
    setLoading(true)
    setError('')
    setAnalisis(null)
    setCarta(null)
    try {
      const res = await fetch('/api/ia/escanear-contrato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo,
          texto: texto.trim() || undefined,
          imagenBase64,
          mediaType,
          generarCarta: true,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      setAnalisis(data.analisis)
      if (data.carta) setCarta({ titulo: data.carta.titulo, cuerpo_es: data.carta.cuerpo_es })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo escanear')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap gap-2 mb-4">
        {TIPOS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`ia-suggestion-chip ${tipo === t.id ? '!border-[var(--cyan-bright)] !bg-[rgba(34,211,238,0.2)]' : ''}`}
            onClick={() => setTipo(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="card-3d dash-panel mb-4">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
        <div className="flex flex-wrap gap-3 mb-4">
          <button type="button" className="btn-glass !min-h-[40px] !text-xs" onClick={() => fileRef.current?.click()}>
            📷 Subir foto del contrato
          </button>
          {preview && (
            <button
              type="button"
              className="btn-glass !min-h-[40px] !text-xs"
              onClick={() => {
                setPreview(null)
                setImagenBase64(null)
              }}
            >
              Quitar imagen
            </button>
          )}
        </div>
        {preview && (
          <img
            src={preview}
            alt="Vista previa"
            className="max-h-48 rounded-lg border border-white/10 mb-4 object-contain"
          />
        )}
        <textarea
          className="w-full min-h-[120px] px-3 py-2 rounded-lg bg-[var(--void)] border border-white/10 text-sm text-[var(--text-primary)]"
          placeholder="O pega aquí el texto del contrato (cláusulas, precios, APR, fees…)"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button
          type="button"
          className="btn-3d-gold !min-h-[44px] !text-sm mt-4 w-full sm:w-auto"
          disabled={loading}
          onClick={escanear}
        >
          {loading ? 'Escaneando con IA…' : '🔍 Escanear contrato'}
        </button>
        {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
      </div>

      {analisis && (
        <div className="card-3d dash-panel mb-4">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="dash-panel-title">Resultado</h2>
            <span
              className="text-xs font-bold uppercase px-2 py-1 rounded-full"
              style={{
                color: RIESGO_COLOR[analisis.nivel_riesgo] ?? RIESGO_COLOR.medio,
                border: `1px solid ${RIESGO_COLOR[analisis.nivel_riesgo] ?? RIESGO_COLOR.medio}`,
              }}
            >
              Riesgo {analisis.nivel_riesgo}
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4">{analisis.resumen}</p>
          {analisis.problemas?.map((p, i) => (
            <div key={i} className="mb-3 p-3 rounded-lg bg-[var(--void)] border border-white/5">
              <p className="font-bold text-sm text-[var(--text-primary)]">
                {p.titulo}{' '}
                <span className="text-xs text-[var(--text-muted)]">({p.gravedad})</span>
              </p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{p.explicacion}</p>
            </div>
          ))}
          {analisis.preguntas_antes_firmar?.length > 0 && (
            <>
              <h3 className="text-sm font-bold mt-4 mb-2">Pregunta antes de firmar</h3>
              <ul className="list-disc list-inside text-sm text-[var(--text-secondary)] space-y-1">
                {analisis.preguntas_antes_firmar.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {carta && (
        <div className="card-3d dash-panel">
          <h2 className="dash-panel-title mb-2">{carta.titulo}</h2>
          <p className="text-xs text-[var(--text-muted)] mb-3">
            <Link href="/dashboard/credito/cartas" className="text-[var(--blue-300)]">
              Ver en mis cartas →
            </Link>
          </p>
          <pre className="text-xs whitespace-pre-wrap bg-[var(--void)] p-4 rounded-lg border border-white/5 max-h-64 overflow-y-auto">
            {carta.cuerpo_es}
          </pre>
        </div>
      )}
    </div>
  )
}
