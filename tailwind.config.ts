import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4332',
          mid: '#2D6A4F',
          light: '#40916C',
        },
        pale: '#D8F3DC',
        accent: {
          DEFAULT: '#F4A261',
          dark: '#E76F51',
        },
        gold: '#FFB703',
        danger: '#D62828',
        warning: '#F77F00',
        success: '#52B788',
        dark: '#1A1A2E',
        muted: '#6B7280',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #40916C 100%)',
      },
      minHeight: {
        'touch': '48px',
      },
      minWidth: {
        'touch': '48px',
      },
    },
  },
  plugins: [],
}

export default config
