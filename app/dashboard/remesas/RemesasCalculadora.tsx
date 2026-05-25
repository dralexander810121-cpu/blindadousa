'use client'
import { useState, useMemo } from 'react'
import { calcularRemesa, type MetodoRemesa } from '@/lib/calculos/remesas'
import { formatDollars } from '@/lib/utils'

export default function RemesasCalculadora() {
  const [monto, setMonto] = useState(500)
  const [metodo, setMetodo] = useState<MetodoRemesa>('efectivo')

  const r = useMemo(() => calcularRemesa({ montoMensual: monto, metodo }), [monto, metodo])

  return (
    <div className="space-y-6">
      {/* Sliders */}
      <div>
        <label className="flex justify-between mb-2">
          <span className="text-sm font-medium">¿Cuánto mandás por mes?</span>
          <span className="font-mono text-lg text-primary font-bold">{formatDollars(monto)}</span>
        </label>
        <input type="range" min="50" max="3000" step="50" value={monto}
          onChange={e => setMonto(Number(e.target.value))}
          className="w-full h-2 bg-pale rounded-lg appearance-none cursor-pointer accent-primary" />
        <div className="flex justify-between text-xs text-muted mt-1">
          <span>$50</span><span>$3,000</span>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">¿Cómo lo mandás?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            { v: 'efectivo' as MetodoRemesa, l: '💵 Efectivo en Western Union/MoneyGram', warn: true },
            { v: 'money_order' as MetodoRemesa, l: '📄 Money order', warn: true },
            { v: 'banco_directo' as MetodoRemesa, l: '🏦 Transferencia bancaria (ACH)', warn: false },
            { v: 'tarjeta' as MetodoRemesa, l: '💳 Tarjeta de débito/crédito', warn: false },
            { v: 'app' as MetodoRemesa, l: '📱 App (Wise, Remitly, Xoom)', warn: false },
          ].map(opt => (
            <label key={opt.v}
              className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                metodo === opt.v
                  ? opt.warn ? 'border-danger bg-red-50' : 'border-success bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
              <input type="radio" name="metodo" value={opt.v} checked={metodo === opt.v}
                onChange={() => setMetodo(opt.v)} className="accent-primary" />
              <span className="text-sm">{opt.l}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Resultados */}
      <div className={`rounded-xl p-6 ${r.pagaImpuesto ? 'bg-red-50 border-2 border-danger' : 'bg-green-50 border-2 border-success'}`}>
        {r.pagaImpuesto ? (
          <>
            <p className="text-danger font-bold text-lg mb-3">⚠️ Estás pagando el impuesto</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted uppercase tracking-wide font-bold">Al mes</p>
                <p className="font-mono text-2xl text-danger">{formatDollars(r.impuestoMensual)}</p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wide font-bold">Al año</p>
                <p className="font-mono text-3xl text-danger font-bold">{formatDollars(r.impuestoAnual)}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 text-sm">
              <p className="font-bold text-primary mb-1">💡 Cómo evitarlo legalmente:</p>
              <p>Cambiá a transferencia bancaria, tarjeta o una app como Wise/Remitly.
              Ahorrás <strong>{formatDollars(r.ahorroPotencialAnual)}/año</strong>.</p>
            </div>
          </>
        ) : (
          <>
            <p className="text-success font-bold text-lg mb-2">✓ Tu método NO paga el impuesto</p>
            <p className="text-sm text-dark mb-3">{r.recomendacion}</p>
            <p className="text-xs text-muted">
              Total enviado al año: <strong>{formatDollars(r.totalEnviadoAnual)}</strong> a tu familia.
            </p>
          </>
        )}
      </div>

      <p className="text-xs text-muted text-center">
        Cálculo basado en la regla del impuesto del 1% federal sobre remesas pagadas en efectivo (vigente desde enero 2026).
      </p>
    </div>
  )
}
