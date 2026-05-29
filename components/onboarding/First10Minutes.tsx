'use client'

import Link from 'next/link'
import { FIRST_10_MINUTES } from '@/lib/productCatalog'

export function First10Minutes() {
  return (
    <section className="card-3d dash-panel mt-6 text-left" aria-labelledby="first-10-title">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--cyan-bright)] mb-2">
        Primeros 10 minutos
      </p>
      <h2 id="first-10-title" className="text-lg font-bold text-[var(--text-primary)] mb-2">
        Tu checklist de inicio
      </h2>
      <p className="text-sm text-[var(--text-secondary)] mb-4">
        Tres pasos para ver valor hoy. Marca mentalmente cada uno al terminar.
      </p>
      <ol className="space-y-3 list-none m-0 p-0">
        {FIRST_10_MINUTES.map((item) => (
          <li
            key={item.step}
            className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(34,211,238,0.15)] text-sm font-bold text-[var(--cyan-bright)]"
              aria-hidden
            >
              {item.step}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-[var(--text-primary)]">{item.title}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.body}</p>
              <Link
                href={
                  'prompt' in item && item.prompt
                    ? `/dashboard/asistente?q=${encodeURIComponent(item.prompt)}`
                    : item.href
                }
                className="inline-block mt-2 text-xs font-bold text-[var(--cyan-bright)] hover:underline"
              >
                {item.cta} →
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
