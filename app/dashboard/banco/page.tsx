'use client'
import { DashDisplay, DashPanel } from '@/components/dashboard/DashPanel'

const BANCOS = [
  { n: 'Wells Fargo', itin: true, pasaporte: true, matricula: true, fee: '$0 (algunos)', espanol: true },
  { n: 'Bank of America', itin: true, pasaporte: true, matricula: false, fee: '$12/mes', espanol: true },
  { n: 'Chase', itin: true, pasaporte: true, matricula: false, fee: '$12/mes', espanol: true },
  { n: 'Citibank', itin: true, pasaporte: true, matricula: false, fee: '$12/mes', espanol: true },
  { n: 'Chime', itin: false, pasaporte: false, matricula: false, fee: '$0', espanol: false },
  { n: 'Current', itin: false, pasaporte: false, matricula: false, fee: '$0', espanol: false },
  { n: 'Majority', itin: true, pasaporte: true, matricula: true, fee: '$5/mes', espanol: true },
  { n: 'Credit Unions locales', itin: true, pasaporte: true, matricula: true, fee: '$0–$5', espanol: true },
]

const PASOS = [
  { n: 1, t: 'Elige un banco', d: 'Mira la tabla de abajo. Si no tienes SSN, busca uno que acepte ITIN o pasaporte.' },
  {
    n: 2,
    t: 'Junta tus documentos',
    d: 'Necesitas: identificación con foto (pasaporte, matrícula consular o ID estatal) + comprobante de domicilio (recibo de luz o contrato de renta) + ITIN o SSN si lo tienes.',
  },
  { n: 3, t: 'Visita una sucursal', d: 'Lleva todos tus documentos. Pide hablar con alguien en español si lo necesitas — es tu derecho.' },
  {
    n: 4,
    t: 'Abre Checking Y Savings',
    d: 'La Checking es tu billetera (para pagar). La Savings es tu alcancía (para guardar). Abre las dos.',
  },
  {
    n: 5,
    t: 'Configura depósito directo',
    d: 'Pide a tu empleador que deposite tu cheque directo a tu cuenta. Es gratis y más seguro que cobrar cheques.',
  },
  { n: 6, t: 'Activa la tarjeta de débito', d: 'Usarla construye historial bancario. Esto te ayuda después para pedir crédito.' },
  { n: 7, t: 'Pon alertas en la app', d: 'Activa notificaciones para cada compra y cuando tu balance baje de cierto monto.' },
  {
    n: 8,
    t: 'Empieza a construir crédito',
    d: 'Después de 3–6 meses con cuenta activa, pide una tarjeta de crédito asegurada en el mismo banco.',
  },
]

function CellMark({ ok }: { ok: boolean }) {
  return (
    <span className={ok ? 'text-[var(--emerald-400)] font-bold' : 'text-[var(--red-500)]'}>
      {ok ? '✓' : '✗'}
    </span>
  )
}

export default function BancoPage() {
  return (
    <div className="dash-page dash-page--banana">
      <h1 className="dash-page-title">Mi primera cuenta</h1>
      <p className="dash-page-date mb-6">
        Cómo abrir tu primera cuenta bancaria — con o sin SSN
      </p>

      <DashPanel tone="success" className="text-center mb-6">
        <p className="text-sm text-[var(--text-secondary)] mb-2">La pregunta más frecuente:</p>
        <h2 className="!text-xl !mb-2">¿Necesito SSN para abrir una cuenta?</h2>
        <DashDisplay value="NO" tone="positive" className="!text-5xl my-2" />
        <p className="m-0">Muchos bancos aceptan ITIN, pasaporte o matrícula consular</p>
      </DashPanel>

      <DashPanel className="mb-6">
        <h2>¿Qué banco acepta qué?</h2>
        <div className="table-holo overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {['Banco', 'Acepta ITIN', 'Pasaporte', 'Matrícula', 'Fee mensual', 'App español'].map(
                  (h) => (
                    <th key={h} className="text-left py-2 px-2">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {BANCOS.map((b) => (
                <tr key={b.n}>
                  <td className="font-semibold text-[var(--text-primary)] py-2 px-2">{b.n}</td>
                  <td className="text-center py-2">
                    <CellMark ok={b.itin} />
                  </td>
                  <td className="text-center py-2">
                    <CellMark ok={b.pasaporte} />
                  </td>
                  <td className="text-center py-2">
                    <CellMark ok={b.matricula} />
                  </td>
                  <td className="py-2 px-2">{b.fee}</td>
                  <td className="text-center py-2">
                    <CellMark ok={b.espanol} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashPanel>

      <h2 className="dash-section-title">8 pasos para abrir tu primera cuenta</h2>
      <div className="dash-steps mb-6">
        {PASOS.map((p) => (
          <div key={p.n} className="dash-step">
            <span className="dash-step-num">{String(p.n).padStart(2, '0')}</span>
            <div>
              <p className="dash-step-title">{p.t}</p>
              <p className="dash-step-desc">{p.d}</p>
            </div>
          </div>
        ))}
      </div>

      <DashPanel className="mb-5">
        <h2>Checking vs Savings — ¿Cuál es cuál?</h2>
        <div className="dash-grid-2 mt-3">
          <div className="dash-panel dash-panel--success !p-5 text-center">
            <h3 className="!text-[var(--emerald-400)] !mb-2">Checking = Tu billetera</h3>
            <p className="m-0 text-sm">
              Para gastos del día a día. Pagar renta, comprar comida, gasolina. Viene con tarjeta de débito.
            </p>
          </div>
          <div className="dash-panel dash-panel--warn !p-5 text-center">
            <h3 className="!text-[var(--amber-500)] !mb-2">Savings = Tu alcancía</h3>
            <p className="m-0 text-sm">
              Para guardar dinero que no vas a tocar. Emergencias, metas, fondo de retiro. Gana un poquito de interés.
            </p>
          </div>
        </div>
      </DashPanel>

      <DashPanel tone="info" className="text-center">
        <h3>Tu cuenta de banco → tu crédito → tu futuro</h3>
        <div className="flex flex-wrap justify-center items-center gap-3 text-sm mt-3">
          {['Abres cuenta', 'Creas historial', 'Pides tarjeta', 'Casa · Carro'].map((step, i) => (
            <span key={step}>
              {i > 0 && <span className="text-[var(--text-muted)] mx-1">→</span>}
              <span
                className={`inline-block px-3 py-1.5 rounded-full ${
                  i === 3
                    ? 'bg-[rgba(53,232,212,0.15)] text-[var(--cyan-bright)] font-bold'
                    : 'bg-white/5 text-[var(--text-secondary)]'
                }`}
              >
                {step}
              </span>
            </span>
          ))}
        </div>
      </DashPanel>
    </div>
  )
}
