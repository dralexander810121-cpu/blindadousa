'use client'
import { useState } from 'react'
import { DashDisplay, DashPanel, DashRangeRow } from '@/components/dashboard/DashPanel'

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

type TaxesAnalisis = {
  resumen: string
  estimado_devolucion: string
  creditos_aplicables: string[]
  checklist_documentos: string[]
  recursos_gratis: string[]
  siguiente_paso_hoy: string
}

export default function TaxesPage() {
  const [ingresos, setIngresos] = useState(40000)
  const [hijos, setHijos] = useState(2)
  const [estado, setEstado] = useState('soltero')
  const [retenido, setRetenido] = useState(4000)
  const [notas, setNotas] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [analisis, setAnalisis] = useState<TaxesAnalisis | null>(null)

  const stdDeduction = estado === 'casado' ? 30000 : 15000
  const taxable = Math.max(0, ingresos - stdDeduction)
  const taxEstimado =
    taxable <= 11600
      ? taxable * 0.1
      : taxable <= 47150
        ? 1160 + (taxable - 11600) * 0.12
        : 1160 + 4266 + (taxable - 47150) * 0.22
  const ctc = hijos * 2000
  const eitc =
    ingresos < 59000 && hijos > 0
      ? Math.min(hijos >= 3 ? 7830 : hijos >= 2 ? 6960 : 4213, ingresos * 0.15)
      : 0
  const totalCreditos = ctc + eitc
  const impuesto = Math.max(0, taxEstimado - totalCreditos)
  const devolucion = retenido - impuesto

  async function analizarConIA() {
    setLoading(true)
    setError('')
    setAnalisis(null)
    try {
      const res = await fetch('/api/ia/taxes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingresos, hijos, estadoCivil: estado, retenido, notas }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al analizar')
      setAnalisis(data.analisis)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  const PASOS_ITIN = [
    { n: 1, t: 'Llena el formulario W-7', d: 'Descárgalo del IRS.gov. Necesitas llenarlo en inglés.' },
    { n: 2, t: 'Junta tus documentos', d: 'Pasaporte vigente (original o copia certificada por la embajada).' },
    { n: 3, t: 'Prepara tu declaración de impuestos', d: 'El W-7 se envía junto con tu declaración del año.' },
    { n: 4, t: 'Envía todo al IRS', d: 'Por correo certificado a: IRS ITIN Operation, P.O. Box 149342, Austin, TX 78714-9342.' },
    { n: 5, t: 'Espera 7-11 semanas', d: 'El IRS te envía tu número ITIN por correo.' },
  ]

  return (
    <div className="dash-page dash-page--banana">
      <h1 className="dash-page-title">Taxes e ITIN</h1>
      <p className="dash-page-date mb-6">
        Calculadora educativa con deducción estándar y créditos publicados. No sustituye un preparador certificado.
      </p>

      <DashPanel tone="success" className="mb-6">
        <h2>¿Puedo declarar impuestos sin SSN?</h2>
        <DashDisplay value="SÍ — CON ITIN" tone="positive" className="!text-5xl my-2" />
        <p>Declarar con ITIN te da acceso a créditos tributarios publicados por el IRS y crea historial fiscal.</p>
      </DashPanel>

      <div className="dash-grid-2 mb-6">
        <DashPanel>
          <h2>Calculadora de devolución estimada</h2>
          <DashRangeRow label="Ingresos del año" value={fmt(ingresos)}>
            <input type="range" min={10000} max={120000} step={1000} value={ingresos} onChange={(e) => setIngresos(+e.target.value)} className="w-full accent-[var(--cyan-bright)]" />
          </DashRangeRow>
          <DashRangeRow label="Hijos menores de 17" value={String(hijos)}>
            <input type="range" min={0} max={6} step={1} value={hijos} onChange={(e) => setHijos(+e.target.value)} className="w-full accent-[var(--cyan-bright)]" />
          </DashRangeRow>
          <label className="dash-form-label">Estado civil</label>
          <select value={estado} onChange={(e) => setEstado(e.target.value)} className="dash-select mb-4">
            <option value="soltero">Soltero/a</option>
            <option value="casado">Casado/a declarando juntos</option>
          </select>
          <DashRangeRow label="Impuestos retenidos (W-2 Box 2)" value={fmt(retenido)}>
            <input type="range" min={0} max={15000} step={250} value={retenido} onChange={(e) => setRetenido(+e.target.value)} className="w-full accent-[var(--cyan-bright)]" />
          </DashRangeRow>
          <label className="dash-form-label mt-4">Notas para la IA (opcional)</label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Ej: trabajo por cuenta propia, gastos de negocio, recibí 1099..."
            className="dash-textarea mb-4"
            rows={2}
          />
          <button onClick={analizarConIA} disabled={loading} className="btn-accent w-full">
            {loading ? 'Analizando con IA...' : '🤖 Analizar mi situación con IA'}
          </button>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </DashPanel>

        <div>
          <DashPanel tone={devolucion > 0 ? 'success' : 'danger'} className="text-center mb-4">
            <p className="text-sm text-[var(--text-secondary)] mb-2">
              {devolucion > 0 ? 'El IRS te devolvería aproximadamente:' : 'Le debes al IRS aproximadamente:'}
            </p>
            <DashDisplay value={fmt(Math.abs(devolucion))} tone={devolucion > 0 ? 'positive' : 'negative'} />
            <p className="text-xs text-[var(--text-muted)] mt-3">Estimado educativo. Un preparador puede encontrar créditos adicionales.</p>
          </DashPanel>
          <DashPanel>
            <h3>Desglose de créditos</h3>
            {[
              { n: 'Child Tax Credit', v: ctc, d: `$2,000 × ${hijos} hijos` },
              { n: 'Earned Income Credit (EITC)', v: eitc, d: 'Crédito por ingreso con hijos' },
              { n: 'Total créditos', v: totalCreditos, d: 'Suma estimada', bold: true },
            ].map((c) => (
              <div key={c.n} className="flex justify-between gap-4 py-3 border-b border-white/5 last:border-0">
                <div>
                  <p className={`text-sm ${c.bold ? 'font-bold text-[var(--text-primary)]' : ''}`}>{c.n}</p>
                  <p className="text-xs text-[var(--text-muted)]">{c.d}</p>
                </div>
                <span className="text-[var(--cyan-bright)] font-bold">{fmt(c.v)}</span>
              </div>
            ))}
          </DashPanel>
        </div>
      </div>

      {analisis && (
        <div className="mb-8 animate-fade-in">
          <h2 className="dash-section-title">🤖 Análisis de la IA Maestra</h2>
          <DashPanel tone="info" className="mb-4">
            <h3>Resumen de tu situación</h3>
            <p className="text-sm mt-2 leading-relaxed">{analisis.resumen}</p>
            <div className="mt-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-[var(--text-muted)]">Estimado devolución</p>
              <p className="text-2xl font-bold text-[var(--cyan-bright)]">{analisis.estimado_devolucion}</p>
            </div>
          </DashPanel>
          <div className="dash-grid-2 gap-4">
            <DashPanel>
              <h3>✅ Créditos que podrías aplicar</h3>
              <ul className="mt-2 space-y-1">
                {analisis.creditos_aplicables?.map((c, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)] flex gap-2"><span className="text-green-400">→</span>{c}</li>
                ))}
              </ul>
            </DashPanel>
            <DashPanel>
              <h3>📄 Documentos que necesitas</h3>
              <ul className="mt-2 space-y-1">
                {analisis.checklist_documentos?.map((d, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)] flex gap-2"><span className="text-blue-400">□</span>{d}</li>
                ))}
              </ul>
            </DashPanel>
            <DashPanel>
              <h3>🆓 Recursos gratuitos</h3>
              <ul className="mt-2 space-y-1">
                {analisis.recursos_gratis?.map((r, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)] flex gap-2"><span className="text-yellow-400">•</span>{r}</li>
                ))}
              </ul>
            </DashPanel>
            <DashPanel tone="success">
              <h3>⚡ Tu siguiente paso hoy</h3>
              <p className="text-sm mt-2 leading-relaxed text-[var(--text-primary)] font-medium">{analisis.siguiente_paso_hoy}</p>
            </DashPanel>
          </div>
        </div>
      )}

      <h2 className="dash-section-title">¿Qué es el ITIN y cómo obtenerlo?</h2>
      <DashPanel className="mb-6">
        <p className="mb-4">El <strong className="text-[var(--text-primary)]">ITIN</strong> es un número del IRS para declarar impuestos sin SSN. No es un número de inmigración: es solo para impuestos.</p>
        <div className="dash-steps">
          {PASOS_ITIN.map((p) => (
            <div key={p.n} className="dash-step">
              <span className="dash-step-num">{String(p.n).padStart(2, '0')}</span>
              <div><p className="dash-step-title">{p.t}</p><p className="dash-step-desc">{p.d}</p></div>
            </div>
          ))}
        </div>
      </DashPanel>

      <DashPanel tone="info">
        <h3>Cómo declarar gratis</h3>
        <div className="dash-grid-2 mt-3">
          <div className="dash-panel !p-4">
            <p className="font-bold text-[var(--text-primary)] mb-1">IRS Free File</p>
            <p className="text-sm">Si ganas menos de $79,000, puedes declarar gratis en irs.gov/freefile.</p>
          </div>
          <div className="dash-panel !p-4">
            <p className="font-bold text-[var(--text-primary)] mb-1">VITA (voluntarios)</p>
            <p className="text-sm">Preparación gratuita en persona. Busca sitios en irs.gov/vita.</p>
          </div>
        </div>
      </DashPanel>
    </div>
  )
}
