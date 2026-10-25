import type { Config } from 'tailwindcss'

// Tokens come straight from the Sustune Care brand guidelines (SC-BGM-2026, section 2.2 and 2.3).
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sc: {
          gold: '#C99738',
          bronze: '#8B601C', // use for gold-coloured text on white (passes AA)
          goldtint: '#FDF8EC',
          cerulean: '#0073B7',
          marine: '#0D3B66',
          deep: '#082542',
          emerald: '#0A8754',
          emeraldDark: '#075F3B',
          slate: '#1E293B',
          mist: '#F1F5F9',
          card: '#F8FAFC',
          line: '#E2E8F0',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans Variable"', 'system-ui', 'sans-serif'],
        body: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '1280px' },
      boxShadow: {
        card: '0 1px 2px rgba(13,59,102,.06)',
        lift: '0 8px 24px -6px rgba(13,59,102,.14)',
      },
    },
  },
  plugins: [],
}
export default config
