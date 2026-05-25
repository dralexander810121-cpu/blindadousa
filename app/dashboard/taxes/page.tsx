'use client'
import { useState } from 'react'

function fmt(n: number) { return '$' + Math.round(n).toLocaleString('en-US') }

export default function TaxesPage() {
  const [ingresos, setIngresos] = useState(40000)
  const [hijos, setHijos] = useState(2)
  const [estado, setEstado] = useState('soltero')
  const [retenido, setRetenido] = useState(4000)

  const stdDeduction = estado === 'casado' ? 30000 : 15000
  const taxable = Math.max(0, ingresos - stdDeduction)
  const taxEstimado = taxable <= 11600 ? taxable * 0.10 : taxable <= 47150 ? 1160 + (taxable - 11600) * 0.12 : 1160 + 4266 + (taxable - 47150) * 0.22
  const ctc = hijos * 2000
  const eitc = ingresos < 59000 && hijos > 0 ? Math.min(hijos >= 3 ? 7830 : hijos >= 2 ? 6960 : 4213, ingresos * 0.15) : 0
  const totalCreditos = ctc + eitc
  const impuesto = Math.max(0, taxEstimado - totalCreditos)
  const devolucion = retenido - impuesto

  const PASOS_ITIN = [
    { n: 1, t: 'Llena el formulario W-7', d: 'Descárgalo del IRS.gov. Necesitas llenarlo en inglés.' },
    { n: 2, t: 'Junta tus documentos', d: 'Pasaporte vigente (original o copia certificada por la embajada).' },
    { n: 3, t: 'Prepara tu declaración de impuestos', d: 'El W-7 se envía JUNTO con tu declaración del año.' },
    { n: 4, t: 'Envía todo al IRS', d: 'Por correo certificado a: IRS ITIN Operation, P.O. Box 149342, Austin, TX 78714-9342.' },
    { n: 5, t: 'Espera 7-11 semanas', d: 'El IRS te envía tu número ITIN por correo. Guárdalo — es para siempre.' },
  ]

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Taxes e ITIN 📋</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Declara y recupera lo que es tuyo. Sí, puedes declarar sin SSN.</p>

      <div style={{ background: '#D1FAE5', borderRadius: 14, padding: '20px 24px', marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#065F46', marginBottom: 4 }}>¿Necesito declarar impuestos sin SSN?</h2>
        <div className="font-bebas" style={{ fontSize: 48, color: '#52B788' }}>SÍ — Y TE CONVIENE</div>
        <p style={{ fontSize: 14, color: '#065F46' }}>Declarar con ITIN te da acceso a créditos tributarios que pueden devolverte miles de dólares. Además, crea historial que ayuda para la residencia.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 28 }}>
        {/* Calculadora */}
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Calculadora de devolución estimada</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
              <span style={{ color: 'var(--gray)' }}>Ingresos del año</span><span style={{ fontWeight: 600 }}>{fmt(ingresos)}</span>
            </div>
            <input type="range" min={10000} max={120000} step={1000} value={ingresos} onChange={e => setIngresos(+e.target.value)} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
              <span style={{ color: 'var(--gray)' }}>Hijos menores de 17</span><span style={{ fontWeight: 600 }}>{hijos}</span>
            </div>
            <input type="range" min={0} max={6} step={1} value={hijos} onChange={e => setHijos(+e.target.value)} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 14, color: 'var(--gray)', display: 'block', marginBottom: 6 }}>Estado civil</label>
            <select value={estado} onChange={e => setEstado(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 14 }}>
              <option value="soltero">Soltero/a</option>
              <option value="casado">Casado/a declarando juntos</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
              <span style={{ color: 'var(--gray)' }}>Impuestos ya retenidos (W-2 Box 2)</span><span style={{ fontWeight: 600 }}>{fmt(retenido)}</span>
            </div>
            <input type="range" min={0} max={15000} step={250} value={retenido} onChange={e => setRetenido(+e.target.value)} style={{ width: '100%' }} />
          </div>
        </div>

        {/* Resultado */}
        <div>
          <div className="card" style={{ marginBottom: 16, textAlign: 'center', background: devolucion > 0 ? '#ECFDF5' : '#FEF2F2' }}>
            <p style={{ fontSize: 14, color: 'var(--gray)', marginBottom: 4 }}>{devolucion > 0 ? 'El IRS te DEVUELVE aproximadamente:' : 'Le DEBES al IRS aproximadamente:'}</p>
            <div className="font-bebas" style={{ fontSize: 56, color: devolucion > 0 ? '#52B788' : '#D62828' }}>{fmt(Math.abs(devolucion))}</div>
            <p style={{ fontSize: 12, color: 'var(--gray)', marginTop: 8 }}>Esto es solo un estimado. Un preparador profesional puede encontrar más.</p>
          </div>

          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Desglose de tus créditos</h3>
            {[
              { n: 'Child Tax Credit', v: ctc, d: `$2,000 × ${hijos} hijos` },
              { n: 'Earned Income Credit (EITC)', v: eitc, d: 'Crédito por ingreso bajo-medio con hijos' },
              { n: 'Total créditos', v: totalCreditos, d: 'Dinero que te devuelven', bold: true },
            ].map(c => (
              <div key={c.n} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F3F4F6', fontWeight: c.bold ? 700 : 400 }}>
                <div><div style={{ fontSize: 14 }}>{c.n}</div><div style={{ fontSize: 11, color: 'var(--gray)' }}>{c.d}</div></div>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{fmt(c.v)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ITIN */}
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>¿Qué es el ITIN y cómo obtenerlo?</h2>
      <div className="card" style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 15, color: 'var(--dark)', lineHeight: 1.7, marginBottom: 16 }}>
          El <strong>ITIN</strong> (Individual Taxpayer Identification Number) es un número del IRS para personas que necesitan declarar impuestos pero no califican para SSN. <strong>No es un número de inmigración</strong> — es solo para impuestos. Tener ITIN te permite declarar, recibir créditos tributarios y construir historial financiero.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PASOS_ITIN.map(p => (
            <div key={p.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{p.n}</div>
              <div><div style={{ fontWeight: 600, fontSize: 14 }}>{p.t}</div><div style={{ fontSize: 13, color: 'var(--gray)' }}>{p.d}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* Declarar gratis */}
      <div className="card" style={{ background: 'var(--pale-green)' }}>
        <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>📌 Cómo declarar GRATIS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ background: 'white', borderRadius: 10, padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>IRS Free File</div>
            <p style={{ fontSize: 13, color: 'var(--gray)', lineHeight: 1.5 }}>Si ganas menos de $79,000, puedes declarar gratis en irs.gov/freefile. Software guiado en español.</p>
          </div>
          <div style={{ background: 'white', borderRadius: 10, padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>VITA (voluntarios)</div>
            <p style={{ fontSize: 13, color: 'var(--gray)', lineHeight: 1.5 }}>Preparación de impuestos gratis en persona. Busca un sitio VITA cerca de ti en irs.gov/vita.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
