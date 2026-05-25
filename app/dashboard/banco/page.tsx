'use client'
const BANCOS = [
  { n: 'Wells Fargo', itin: true, pasaporte: true, matricula: true, fee: '$0 (algunos)', espanol: true },
  { n: 'Bank of America', itin: true, pasaporte: true, matricula: false, fee: '$12/mes', espanol: true },
  { n: 'Chase', itin: true, pasaporte: true, matricula: false, fee: '$12/mes', espanol: true },
  { n: 'Citibank', itin: true, pasaporte: true, matricula: false, fee: '$12/mes', espanol: true },
  { n: 'Chime', itin: false, pasaporte: false, matricula: false, fee: '$0', espanol: false },
  { n: 'Current', itin: false, pasaporte: false, matricula: false, fee: '$0', espanol: false },
  { n: 'Majority', itin: true, pasaporte: true, matricula: true, fee: '$5/mes', espanol: true },
  { n: 'Credit Unions locales', itin: true, pasaporte: true, matricula: true, fee: '$0-$5', espanol: true },
]
const PASOS = [
  { n: 1, t: 'Elige un banco', d: 'Mira la tabla de abajo. Si no tienes SSN, busca uno que acepte ITIN o pasaporte.' },
  { n: 2, t: 'Junta tus documentos', d: 'Necesitas: identificación con foto (pasaporte, matrícula consular o ID estatal) + comprobante de domicilio (recibo de luz o contrato de renta) + ITIN o SSN si lo tienes.' },
  { n: 3, t: 'Visita una sucursal', d: 'Lleva todos tus documentos. Pide hablar con alguien en español si lo necesitas — es tu derecho.' },
  { n: 4, t: 'Abre Checking Y Savings', d: 'La Checking es tu billetera (para pagar). La Savings es tu alcancía (para guardar). Abre las dos.' },
  { n: 5, t: 'Configura depósito directo', d: 'Pide a tu empleador que deposite tu cheque directo a tu cuenta. Es gratis y más seguro que cobrar cheques.' },
  { n: 6, t: 'Activa la tarjeta de débito', d: 'Usarla construye historial bancario. Esto te ayuda después para pedir crédito.' },
  { n: 7, t: 'Pon alertas en la app', d: 'Activa notificaciones para cada compra y cuando tu balance baje de cierto monto.' },
  { n: 8, t: 'Empieza a construir crédito', d: 'Después de 3-6 meses con cuenta activa, pide una tarjeta de crédito asegurada en el mismo banco.' },
]

export default function BancoPage() {
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Mi Primera Cuenta 🏧</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Cómo abrir tu primera cuenta bancaria — con o sin SSN</p>

      {/* Pregunta principal */}
      <div style={{ background: '#D1FAE5', borderRadius: 14, padding: '24px 28px', marginBottom: 28, textAlign: 'center' }}>
        <p style={{ fontSize: 16, color: 'var(--gray)', marginBottom: 8 }}>La pregunta más frecuente:</p>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#065F46', marginBottom: 8 }}>¿Necesito SSN para abrir una cuenta?</h2>
        <div className="font-bebas" style={{ fontSize: 56, color: '#52B788' }}>NO</div>
        <p style={{ fontSize: 15, color: '#065F46' }}>Muchos bancos aceptan ITIN, pasaporte o matrícula consular</p>
      </div>

      {/* Tabla de bancos */}
      <div className="card" style={{ marginBottom: 28, overflowX: 'auto' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>¿Qué banco acepta qué?</h2>
        <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--primary)' }}>
              {['Banco','Acepta ITIN','Pasaporte','Matrícula','Fee mensual','App español'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 8px', fontWeight: 700, fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BANCOS.map(b => (
              <tr key={b.n} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '10px 8px', fontWeight: 600 }}>{b.n}</td>
                {[b.itin, b.pasaporte, b.matricula, null, b.espanol].map((v, i) => (
                  <td key={i} style={{ padding: '10px 8px', textAlign: i === 3 ? 'left' : 'center' }}>
                    {i === 3 ? b.fee : v === true ? <span style={{ color: '#52B788', fontWeight: 700 }}>✓</span> : v === false ? <span style={{ color: '#D62828' }}>✗</span> : b.fee}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pasos */}
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>8 pasos para abrir tu primera cuenta</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {PASOS.map(p => (
          <div key={p.n} className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 20px' }}>
            <div style={{ width: 36, height: 36, background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{p.n}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{p.t}</div>
              <div style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.6 }}>{p.d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Checking vs Savings */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Checking vs Savings — ¿Cuál es cuál?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: 'var(--pale-green)', borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>👛</div>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--primary)', marginBottom: 6 }}>Checking = Tu billetera</h3>
            <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.6 }}>Para gastos del día a día. Pagar renta, comprar comida, gasolina. Viene con tarjeta de débito.</p>
          </div>
          <div style={{ background: '#FEF9C3', borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🐖</div>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: '#92400E', marginBottom: 6 }}>Savings = Tu alcancía</h3>
            <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.6 }}>Para guardar dinero que no vas a tocar. Emergencias, metas, fondo de retiro. Gana un poquito de interés.</p>
          </div>
        </div>
      </div>

      {/* Conexión con crédito */}
      <div style={{ background: 'var(--primary)', borderRadius: 14, padding: '24px 28px', textAlign: 'center', color: 'white' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Tu cuenta de banco → tu crédito → tu futuro</h3>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, flexWrap: 'wrap', fontSize: 14 }}>
          <span style={{ background: 'rgba(255,255,255,.15)', padding: '8px 14px', borderRadius: 20 }}>🏧 Abres cuenta</span>
          <span>→</span>
          <span style={{ background: 'rgba(255,255,255,.15)', padding: '8px 14px', borderRadius: 20 }}>📊 Creas historial</span>
          <span>→</span>
          <span style={{ background: 'rgba(255,255,255,.15)', padding: '8px 14px', borderRadius: 20 }}>💳 Pides tarjeta</span>
          <span>→</span>
          <span style={{ background: 'rgba(255,255,255,.2)', padding: '8px 14px', borderRadius: 20, fontWeight: 700 }}>🏠 Casa · 🚗 Carro</span>
        </div>
      </div>
    </div>
  )
}
