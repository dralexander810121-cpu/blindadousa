import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 45%, #40916C 100%)',
          color: 'white',
          padding: '64px',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 2 }}>
          BLINDADO<span style={{ color: '#F4A261' }}>USA</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 900, lineHeight: 1 }}>La guia financiera y legal</div>
          <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.05 }}>
            del hispano en USA
          </div>
          <div style={{ fontSize: 30, color: '#D8F3DC' }}>
            Credito, casa, carro, remesas, taxes y derechos
          </div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#FFB703' }}>
          3 dias gratis | Luego $20 de por vida
        </div>
      </div>
    ),
    size
  )
}
