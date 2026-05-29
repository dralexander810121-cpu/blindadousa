import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

export function buildBrandOgImage(logoSrc: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.15) 0%, transparent 55%), linear-gradient(160deg, #0a0e14 0%, #02060c 100%)',
          color: 'white',
          padding: '64px',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <img
          src={logoSrc}
          alt=""
          height={200}
          style={{ objectFit: 'contain', maxWidth: '80%' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.1, color: '#f8fafc' }}>
            Guardaespaldas financiero con IA
          </div>
          <div style={{ fontSize: 28, color: '#67e8f9' }}>
            Crédito, casa, carro, taxes y derechos · en español
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#22d3ee', marginTop: 8 }}>
            3 días gratis · Luego $20/mes
          </div>
        </div>
      </div>
    ),
    ogSize,
  )
}
