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
      keyframes: {
        shimmer: { '0%': { backgroundPosition: '200% center' }, '100%': { backgroundPosition: '-200% center' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        twinkle: { '0%,100%': { opacity: '.25', transform: 'scale(.7) rotate(0deg)' }, '50%': { opacity: '1', transform: 'scale(1.1) rotate(45deg)' } },
        drawline: { '0%': { transform: 'scaleX(0)' }, '100%': { transform: 'scaleX(1)' } },
        pulsering: { '0%': { boxShadow: '0 0 0 0 rgba(212,175,55,.55)' }, '100%': { boxShadow: '0 0 0 12px rgba(212,175,55,0)' } },
      },
      animation: {
        shimmer: 'shimmer 7s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        twinkle: 'twinkle 3.2s ease-in-out infinite',
        pulsering: 'pulsering 2s ease-out infinite',
      },
      boxShadow: {
        card: '0 1px 3px rgba(11,27,61,.07), 0 6px 18px -8px rgba(11,27,61,.10)',
        lift: '0 14px 34px -10px rgba(11,27,61,.22)',
      },
    },
  },
  plugins: [],
}
export default config