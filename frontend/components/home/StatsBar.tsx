import { Home, Users, Star, MapPin } from 'lucide-react'
import { SHOW_SAMPLE_PROOF } from '@/lib/config'
import { STATS_REAL, STATS_SAMPLE } from '@/lib/content'

const ICONS = [Home, Users, Star, MapPin]

// Floats over the bottom edge of the hero (the hero leaves 3.5rem of padding for it, the bar rides 5rem up).
export function StatsBar() {
  const stats = SHOW_SAMPLE_PROOF ? STATS_SAMPLE : STATS_REAL
  return (
    <div className="relative z-20 mx-auto -mt-20 max-w-page px-5 sm:px-8">
      <dl className="grid grid-cols-2 rounded-2xl border border-sc-gold/40 bg-sc-marine/95 text-white shadow-lift backdrop-blur-md lg:grid-cols-4 [&>div]:border-white/10 [&>div:nth-child(-n+2)]:border-b lg:[&>div:nth-child(-n+2)]:border-b-0 lg:[&>div+div]:border-l [&>div:nth-child(odd)]:border-r lg:[&>div:nth-child(odd)]:border-r-0">
        {stats.map(([n, l], i) => {
          const Icon = ICONS[i]
          return (
            <div key={l} className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6">
              <Icon aria-hidden className="h-8 w-8 shrink-0 text-sc-gold sm:h-10 sm:w-10" strokeWidth={1.3} />
              <div className="min-w-0"><dd className="font-display text-xl font-bold sm:text-2xl">{n}</dd><dt className="text-[11px] leading-snug text-slate-300 sm:text-xs">{l}</dt></div>
            </div>
          )
        })}
      </dl>
      {SHOW_SAMPLE_PROOF && <p className="mt-2 text-xs text-slate-600"></p>}
    </div>
  )
}
