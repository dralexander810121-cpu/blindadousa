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
          DEFAULT: '#0a0e14',
          mid: '#0f1723',
          light: '#134e63',
        },
        pale: '#0f2330',
        accent: {
          DEFAULT: '#22d3ee',
          dark: '#0e7490',
        },
        gold: '#67e8f9',
        danger: '#ef4444',
        warning: '#f59e0b',
        success: '#10b981',
        dark: '#02060c',
        muted: '#94a3b8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #22d3ee 0%, #0e7490 50%, #134e63 100%)',
      },
      minHeight: {
        touch: '48px',
      },
      minWidth: {
        touch: '48px',
      },
    },
  },
  plugins: [],
}

export default config
