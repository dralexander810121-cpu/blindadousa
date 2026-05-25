'use client'
import { useState } from 'react'

function fmt(n: number) { return '$' + Math.round(n).toLocaleString('en-US') }

const TRABAJOS: Record<string, number> = {
  'Construcción': 19, 'Limpieza / Housekeeping': 14, 'Restaurante / Cocina': 16, 'Cuidado de niños': 15,
  'Conducción / Delivery': 18, 'Almacén / Warehouse': 17, 'Agricultura / Landscaping': 16, 'Manufactura': 18,
  'Retail / Tiendas': 15, 'Plomería': 26, 'Electricista': 28, 'Pintura': 20, 'Mecánico de carros': 22,
  'Carpintería': 23, 'Enfermería / CNA': 17, 'Seguridad': 16, 'Lavado de carros': 13, 'Mudanzas': 17,
}

const DERECHOS = [
  { t: 'Salario mínimo federal', d: '$7.25/hora (Texas usa el federal). Pero NADIE debería aceptar menos de $12-15/hora en 2026.', color: '#F77F00' },
  { t: 'Overtime (horas extra)', d: 'Más de 40 horas por semana = 1.5 veces tu sueldo por hora. OBLIGATORIO por ley federal.', color: '#D62828' },
  { t: 'Discriminación por origen', d: 'Es ILEGAL pagarte menos por ser hispano o no hablar inglés perfecto. Reporta al EEOC.', color: '#D62828' },
  { t: 'Represalias', d: 'Tu empleador NO puede despedirte por quejarte de condiciones injustas. Es ilegal.', color: '#D62828' },
  { t: 'Pago por todas las horas', d: 'Llegar temprano, limpiar después, esperar — todo eso es tiempo trabajado y debe pagarse.', color: '#F77F00' },
  { t: 'Seguridad en el trabajo', d: 'OSHA requiere que tu empleador provea equipo de seguridad y un ambiente sin peligros.', color: '#52B788' },
]

const AGENCIAS = [
  { n: 'EEOC', d: 'Discriminación laboral por origen, raza o idioma', url: 'https://www.eeoc.gov/es', tel: '1-800-669-4000' },
  { n: 'TWC', d: 'Texas Workforce Commission — robo de salario, desempleo', url: 'https://www.twc.texas.gov', tel: '512-463-2222' },
  { n: 'OSHA', d: 'Seguridad y salud en el trabajo', url: 'https://www.osha.gov/workers/file-complaint', tel: '1-800-321-6742' },
  { n: 'NLRB', d: 'Derecho a organizarte, represalias por quejarte', url: 'https://www.nlrb.gov', tel: '1-844-762-6572' },
]

export default function TrabajoPage() {
  const [trabajo, setTrabajo] = useState('Construcción')
  const [pago, setPago] = useState(16)
  const [horas, setHoras] = useState(45)
  const [pagadas, setPagadas] = useState(40)

  const mercado = TRABAJOS[trabajo] || 16
  const diff = pago - mercado
  const diffAnual = diff * 40 * 52
  const roboHoras = horas - pagadas
  const roboSemanal = roboHoras * pago
  const roboAnual = roboSemanal * 52

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Salario Justo ⚖️</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 24 }}>¿Te están pagando lo justo? Compara con el mercado y conoce tus derechos.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 28 }}>
        {/* Calculator */}
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>¿Te pagan lo justo?</h2>
          <label style={{ fontSize: 14, color: 'var(--gray)', display: 'block', marginBottom: 6 }}>Tu tipo de trabajo</label>
          <select value={trabajo} onChange={e => setTrabajo(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 14, marginBottom: 16 }}>
            {Object.keys(TRABAJOS).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
              <span style={{ color: 'var(--gray)' }}>¿Cuánto te pagan por hora?</span><span style={{ fontWeight: 600 }}>${pago}/hr</span>
            </div>
            <input type="range" min={7} max={40} step={0.5} value={pago} onChange={e => setPago(+e.target.value)} style={{ width: '100%' }} />
          </div>

          {/* Result */}
          <div style={{ background: diff >= 0 ? '#D1FAE5' : '#FEE2E2', borderRadius: 10, padding: 16, textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 4 }}>Salario promedio del mercado para "{trabajo}" en Texas:</div>
            <div className="font-bebas" style={{ fontSize: 36, color: 'var(--primary)' }}>${mercado}/hora</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: diff >= 0 ? '#065F46' : '#991B1B', marginTop: 8 }}>
              {diff >= 0 ? `✓ Te pagan ${fmt(Math.abs(diffAnual))}/año POR ENCIMA del mercado` : `✗ Te pagan ${fmt(Math.abs(diffAnual))}/año POR DEBAJO del mercado`}
            </div>
          </div>

          {/* Robo de salario */}
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, marginTop: 20 }}>¿Te roban horas?</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
            <span style={{ color: 'var(--gray)' }}>Horas que trabajas por semana</span><span style={{ fontWeight: 600 }}>{horas}h</span>
          </div>
          <input type="range" min={20} max={70} step={1} value={horas} onChange={e => setHoras(+e.target.value)} style={{ width: '100%', marginBottom: 12 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
            <span style={{ color: 'var(--gray)' }}>Horas que te pagan</span><span style={{ fontWeight: 600 }}>{pagadas}h</span>
          </div>
          <input type="range" min={20} max={70} step={1} value={pagadas} onChange={e => setPagadas(+e.target.value)} style={{ width: '100%', marginBottom: 12 }} />
          {roboHoras > 0 && (
            <div style={{ background: '#FEE2E2', borderRadius: 10, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#991B1B', marginBottom: 4 }}>🚨 Te deben {roboHoras} horas por semana</div>
              <div className="font-bebas" style={{ fontSize: 32, color: '#D62828' }}>{fmt(roboAnual)}/año en robo de salario</div>
              <p style={{ fontSize: 12, color: '#7F1D1D', marginTop: 4 }}>Reporta al TWC: 512-463-2222 — es gratis y confidencial</p>
            </div>
          )}
        </div>

        {/* Derechos */}
        <div>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>Tus derechos laborales en Texas</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {DERECHOS.map(d => (
              <div key={d.t} className="card" style={{ padding: '12px 16px', borderLeft: `4px solid ${d.color}` }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{d.t}</div>
                <div style={{ fontSize: 13, color: 'var(--gray)', lineHeight: 1.5 }}>{d.d}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Agencias que te protegen</h3>
          {AGENCIAS.map(a => (
            <div key={a.n} className="card" style={{ padding: '12px 16px', marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)' }}>{a.n}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray)' }}>{a.d}</div>
                </div>
                <a href={`tel:${a.tel}`} style={{ background: 'var(--primary)', color: 'white', padding: '6px 12px', borderRadius: 6, fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>📞 Llamar</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
