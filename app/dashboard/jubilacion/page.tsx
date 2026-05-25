'use client'
import { useState } from 'react'

function fmt(n: number) { return '$' + Math.round(n).toLocaleString('en-US') }

export default function JubilacionPage() {
  const [edad, setEdad] = useState(35)
  const [retiro, setRetiro] = useState(65)
  const [ingreso, setIngreso] = useState(4000)
  const [ahorro, setAhorro] = useState(0)

  const anos = Math.max(1, retiro - edad)
  const meses = anos * 12
  const tasaAnual = 0.07
  const tasaMes = tasaAnual / 12

  const futuro = ahorro > 0 ? ahorro * ((Math.pow(1 + tasaMes, meses) - 1) / tasaMes) : 0
  const metaRetiro = ingreso * 12 * 25
  const faltante = Math.max(0, metaRetiro - futuro)
  const necesitaMes = faltante > 0 ? faltante * tasaMes / (Math.pow(1 + tasaMes, meses) - 1) : 0

  const futuroSi5 = ahorro > 0 ? ahorro * ((Math.pow(1 + tasaMes, Math.max(1, (retiro - edad - 5)) * 12) - 1) / tasaMes) : 0
  const perdida = futuro - futuroSi5

  const CUENTAS = [
    { n: '401K', icon: '🏢', quien: 'Tu trabajo te lo da', como: 'Si tu empresa pone $1 por cada $1 tuyo (match) y no lo usas, estás regalando dinero gratis.', limite: '$23,500/año (2026)', tip: 'Pon al menos lo suficiente para recibir el match completo de tu empresa. Es dinero gratis.' },
    { n: 'IRA Tradicional', icon: '🏦', quien: 'Lo abres tú', como: 'Ahorras hoy y pagas menos impuestos este año. Pagas impuestos cuando lo sacas al retirarte.', limite: '$7,000/año (2026)', tip: 'Ideal si piensas que al retirarte ganarás menos que ahora (pagarás menos impuestos entonces).' },
    { n: 'Roth IRA', icon: '⭐', quien: 'Lo abres tú', como: 'Pagas impuestos ahora. Pero cuando te retires, TODO ese dinero es tuyo libre de impuestos.', limite: '$7,000/año (2026)', tip: 'Ideal si eres joven y piensas que en el futuro ganarás más. Es la favorita de los expertos.' },
  ]

  const S = (l: string, v: number, set: (n: number) => void, min: number, max: number, step: number, f: (n: number) => string) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
        <span style={{ color: 'var(--gray)' }}>{l}</span><span style={{ fontWeight: 600 }}>{f(v)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={v} onChange={e => set(+e.target.value)} style={{ width: '100%' }} />
    </div>
  )

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Jubilación / Retiro 🏦</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 20 }}>El 83% de hispanos millennials no tiene NADA ahorrado. Tú puedes cambiar eso hoy.</p>

      <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 12, padding: '14px 18px', marginBottom: 24, fontSize: 15, color: '#991B1B', fontWeight: 600 }}>
        ⚠️ 8 de cada 10 hispanos jóvenes NO tienen ahorros para el retiro
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 28 }}>
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Tu situación</h2>
          {S('Tu edad actual', edad, setEdad, 18, 60, 1, n => n + ' años')}
          {S('¿A qué edad quieres retirarte?', retiro, setRetiro, 55, 75, 1, n => n + ' años')}
          {S('Ingreso mensual actual', ingreso, setIngreso, 1500, 15000, 250, fmt)}
          {S('¿Cuánto ahorras al mes para retiro?', ahorro, setAhorro, 0, 2000, 25, fmt)}
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Tus números de retiro</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: 'var(--light)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--gray)' }}>Años para retirarte</div>
                <div className="font-bebas" style={{ fontSize: 36, color: 'var(--primary)' }}>{anos}</div>
              </div>
              <div style={{ background: 'var(--light)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--gray)' }}>Meta de ahorro</div>
                <div className="font-bebas" style={{ fontSize: 24, color: 'var(--primary)' }}>{fmt(metaRetiro)}</div>
              </div>
              <div style={{ background: ahorro > 0 ? '#D1FAE5' : '#FEE2E2', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--gray)' }}>Tendrás si sigues así</div>
                <div className="font-bebas" style={{ fontSize: 24, color: ahorro > 0 ? '#065F46' : '#991B1B' }}>{ahorro > 0 ? fmt(futuro) : '$0'}</div>
              </div>
              <div style={{ background: 'var(--light)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--gray)' }}>Necesitas ahorrar/mes</div>
                <div className="font-bebas" style={{ fontSize: 24, color: 'var(--accent-dark)' }}>{fmt(necesitaMes)}</div>
              </div>
            </div>
          </div>

          {/* Poder del tiempo */}
          <div className="card" style={{ background: 'var(--pale-green)' }}>
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: 'var(--primary)' }}>⏰ El poder del tiempo</h3>
            <p style={{ fontSize: 14, color: 'var(--dark)', lineHeight: 1.7 }}>
              Si empiezas HOY ahorrando {fmt(ahorro || 200)}/mes → tendrás <strong>{fmt(futuro || 200 * ((Math.pow(1 + tasaMes, meses) - 1) / tasaMes))}</strong> a los {retiro}.<br />
              Si esperas 5 años → tendrás solo <strong>{fmt(futuroSi5 || 200 * ((Math.pow(1 + tasaMes, Math.max(1, anos - 5) * 12) - 1) / tasaMes))}</strong>.<br />
              <strong style={{ color: '#D62828' }}>Esperar 5 años te cuesta {fmt(perdida || futuro * 0.35)} en dinero perdido.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Tipos de cuenta */}
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Los 3 tipos de cuenta de retiro explicados simple</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {CUENTAS.map(c => (
          <div key={c.n} className="card" style={{ borderTop: '4px solid var(--primary)' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
            <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 4, color: 'var(--primary)' }}>{c.n}</h3>
            <p style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 8 }}><strong>¿Quién lo abre?</strong> {c.quien}</p>
            <p style={{ fontSize: 14, color: 'var(--dark)', lineHeight: 1.6, marginBottom: 8 }}>{c.como}</p>
            <div style={{ fontSize: 12, color: 'var(--gray)', marginBottom: 8 }}>Límite: {c.limite}</div>
            <div style={{ background: 'var(--pale-green)', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: 'var(--primary)' }}>
              💡 <strong>Tip:</strong> {c.tip}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
