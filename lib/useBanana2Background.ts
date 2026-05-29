'use client'

import { useEffect, useState } from 'react'

/**
 * Prueba fondos en orden: JPG Banana 2 → PNG Stitch → SVG holo.
 */
export function useBanana2Background(primary: string, fallbacks: string[] = []) {
  const chain = [primary, ...fallbacks.filter((f) => f && f !== primary)]
  const last = chain[chain.length - 1] ?? primary
  const [url, setUrl] = useState(last)

  useEffect(() => {
    if (chain.length <= 1) {
      setUrl(primary)
      return
    }

    let cancelled = false

    const tryNext = (i: number) => {
      if (cancelled) return
      if (i >= chain.length) {
        setUrl(last)
        return
      }
      const src = chain[i]
      const img = new window.Image()
      img.onload = () => {
        if (!cancelled) setUrl(src)
      }
      img.onerror = () => tryNext(i + 1)
      img.src = src
    }

    setUrl(last)
    tryNext(0)

    return () => {
      cancelled = true
    }
  }, [primary, last, chain.join('|')])

  return url
}
