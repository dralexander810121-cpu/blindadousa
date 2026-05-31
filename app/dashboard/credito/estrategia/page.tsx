'use client'
import { useState } from 'react'
import { DashPanel } from '@/components/dashboard/DashPanel'

type Deuda = { acreedor: string; saldo: string; interes: string; minimo: string }
const EMPTY_DEUDA: Deuda = { acreedor: '', saldo: '', interes: '', minimo: '' }

export default function EstrategiaPage() {
  const [deudas, setDeudas] = useState<Deuda[]>([{ ...EMPTY_DEUDA }])
  const [presupuesto, setPresupuesto] = useState('')
  const [meta, setMeta] = useState('salir_de_deudas')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resultado, setResultado] = useState('')

  function updateDeuda(i: number, field: keyof Deuda, val: string) {
    setDeudas((prev) => prev.map((d, idx) => idx === i ? { ...d, [field]: val } : d))
  }

  function addDeuda() {
    setDeudas((prev) => [...prev, { ...EMPTY_DEUDA }])
  }

  function removeDeuda(i: number) {
    setDeudas((prev) => prev.filter((_, idx) => idx !== i))
  }

  async function generarEstrategia() {
    const valid = deudas.filter(d => d.acreedor.trim() && d.saldo.trim())
    if (!valid.length) { setError('Agrega al menos una deuda con acreedor y saldo.'); return }
    setError('')
    setLoading(true)
    setResultado('')
    try {
      const mensaje = `Tengo estas deudas y quiero una estrategia personalizada:

${valid.map(d => `- ${d.acreedor}: $${d.saldo} saldo, ${d.interes}% interés, $${d.minimo} mínimo mensual`).join('\n')}

Presupuesto extra para pagar: $${presupuesto || '0'}/mes
Meta principal: ${meta === 'salir_de_deudas' ? 'Salir de deudas lo más rápido posible' : 'Pagar menos intereses en total'}

Dame:
1. Comparación método avalancha vs bola de nieve para MI situación específica
2. Cuál recomiendas y por qué
3. Plan mes a mes concreto con los primeros 3 meses detallados
4. Cuánto tiempo me tomará salir de deudas con cada método
5. Cuánto pagaré en intereses con cada método
6. 3 tips extra para acelerar el proceso`

      const res = await fetch('/api/ia/maestro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje, historial: [] }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al generar estrategia')
      setResultado(data.respuesta)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dash-page">
      <h1 className="dash-page-title">Estrategia de Deuda</h1>
      <p className="dash-page-date mb-6">Avalancha vs bola de nieve — la IA analiza tu situación y elige el mejor método para ti.</p>

      <DashPanel className="mb-6">
        <h2 className="mb-4">Tus deudas actuales</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[var(--text-muted)] border-b border-white/10">
                <th className="text-left py-2 pr-3">Acreedor</th>
                <th className="text-left py-2 pr-3">Saldo ($)</th>
                <th className="text-left py-2 pr-3">Interés (%)</th>
                <th className="text-left py-2 pr-3">Mínimo ($)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {deudas.map((d, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-2 pr-3"><input value={d.acreedor} onChange={e => updateDeuda(i, 'acreedor', e.target.value)} placeholder="Ej: Chase Visa" className="dash-input !py-1" /></td>
                  <td className="py-2 pr-3"><input value={d.saldo} onChange={e => updateDeuda(i, 'saldo', e.target.value)} placeholder="5000" type="number" className="dash-input !py-1 w-24" /></td>
                  <td className="py-2 pr-3"><input value={d.interes} onChange={e => updateDeuda(i, 'interes', e.target.value)} placeholder="24.9" type="number" className="dash-input !py-1 w-20" /></td>
                  <td className="py-2 pr-3"><input value={d.minimo} onChange={e => updateDeuda(i, 'minimo', e.target.value)} placeholder="150" type="number" className="dash-input !py-1 w-20" /></td>
                  <td className="py-2">{deudas.length > 1 && <button onClick={() => removeDeuda(i)} className="text-red-400 hover:text-red-300 text-lg px-2">×</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={addDeuda} className="btn-ghost mt-3 text-sm">+ Agregar deuda</button>

        <div className="dash-grid-2 mt-6 gap-4">
          <div>
            <label className="dash-form-label">Dinero extra para pagar deudas/mes</label>
            <input value={presupuesto} onChange={e => setPresupuesto(e.target.value)} placeholder="200" type="number" className="dash-input" />
          </div>
          <div>
            <label className="dash-form-label">Tu meta principal</label>
            <select value={meta} onChange={e => setMeta(e.target.value)} className="dash-select">
              <option value="salir_de_deudas">Salir de deudas lo más rápido</option>
              <option value="menos_intereses">Pagar menos intereses en total</option>
            </select>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

        <button onClick={generarEstrategia} disabled={loading} className="btn-accent w-full mt-4">
          {loading ? 'Generando tu estrategia personalizada...' : '🤖 Generar estrategia con IA'}
        </button>
      </DashPanel>

      {resultado && (
        <DashPanel tone="info" className="animate-fade-in">
          <h2 className="mb-4">📊 Tu estrategia personalizada</h2>
          <div className="prose prose-invert prose-sm max-w-none">
            {resultado.split('\n').map((line, i) => (
              <p key={i} className={`mb-2 text-sm leading-relaxed ${line.startsWith('#') ? 'font-bold text-[var(--text-primary)] text-base' : 'text-[var(--text-secondary)]'}`}>
                {line}
              </p>
            ))}
          </div>
        </DashPanel>
      )}
    </div>
  )
}
