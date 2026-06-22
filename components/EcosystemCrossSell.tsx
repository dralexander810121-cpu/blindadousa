'use client'

type CrossSellVariant = 'health' | 'market'

const VARIANTS = {
  health: {
    emoji: '🩺',
    headline: 'Tu crédito está blindado. ¿Y tu salud?',
    body: 'FigueredoMed te da enciclopedia médica, calculadoras clínicas y guías de salud en español — desde $2.99/mes.',
    cta: 'Ver FigueredoMed',
    href: 'https://figueredomed.com',
    accent: 'from-cyan-500/20 to-blue-600/20 border-cyan-500/30',
    btn: 'bg-cyan-600 hover:bg-cyan-500',
  },
  market: {
    emoji: '📚',
    headline: '¿Quieres entender el sistema aún más?',
    body: 'Los libros del Dr. Figueredo te explican la economía, la salud y los derechos del hispano en EE.UU. con claridad.',
    cta: 'Ver Figueredo Market',
    href: 'https://market.figueredomed.com',
    accent: 'from-yellow-500/20 to-amber-600/20 border-yellow-500/30',
    btn: 'bg-yellow-600 hover:bg-yellow-500',
  },
}

export default function EcosystemCrossSell({ variant = 'health' }: { variant?: CrossSellVariant }) {
  const v = VARIANTS[variant]
  return (
    <div className={`my-6 rounded-2xl border bg-gradient-to-r p-5 ${v.accent} flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}>
      <div>
        <p className="text-lg font-bold text-white">
          {v.emoji} {v.headline}
        </p>
        <p className="mt-1 text-sm text-slate-300">{v.body}</p>
      </div>
      <a
        href={v.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`shrink-0 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition ${v.btn}`}
      >
        {v.cta} →
      </a>
    </div>
  )
}
