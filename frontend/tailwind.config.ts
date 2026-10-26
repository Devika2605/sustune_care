import type { Config } from 'tailwindcss'

// Tokens come straight from the Sustune Care brand guidelines (SC-BGM-2026, section 2.2 and 2.3).
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette taken from the approved visual mockups.
        sc: {
          marine: '#0B1B3D',      // deep royal navy
          deep: '#060F24',
          ink: '#10264F',
          gold: '#D4AF37',        // champagne gold (backgrounds, borders, text on navy)
          goldhover: '#E3C85F',
          bronze: '#8A6A12',      // gold-coloured text on light backgrounds (passes AA)
          goldtint: '#FBF6E6',
          emerald: '#0F5132',     // Sparsh green
          emeraldDark: '#0A3B25',
          cerulean: '#0073B7',
          slate: '#1E293B',
          canvas: '#FBFBFB',
          mist: '#F2F4F8',
          card: '#FFFFFF',
          line: '#E5E7EB',
        },
      },
      fontFamily: {
        display: ['"Playfair Display Variable"', 'Georgia', 'serif'],
        body: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '1280px' },
      boxShadow: {
        card: '0 1px 3px rgba(11,27,61,.07), 0 6px 18px -8px rgba(11,27,61,.10)',
        lift: '0 14px 34px -10px rgba(11,27,61,.22)',
      },
    },
  },
  plugins: [],
}
export default config
