import { Home, Users, Star, MapPin } from 'lucide-react'
import { SHOW_SAMPLE_PROOF } from '@/lib/config'
import { STATS_REAL, STATS_SAMPLE } from '@/lib/content'
import { cn } from '@/lib/cn'

const ICONS = [Home, Users, Star, MapPin]

export function StatsBar({ className }: { className?: string }) {
  const stats = SHOW_SAMPLE_PROOF ? STATS_SAMPLE : STATS_REAL
  return (
    <div className={cn("relative z-20 mx-auto max-w-page px-5 sm:px-8", className)}>
      <dl className="grid grid-cols-2 rounded-2xl border border-white/10 bg-[#0B1B3D]/80 text-white shadow-lift backdrop-blur-md lg:grid-cols-4 lg:divide-x lg:divide-white/10 [&>div]:border-white/10 [&>div:nth-child(-n+2)]:border-b lg:[&>div:nth-child(-n+2)]:border-b-0 [&>div:nth-child(odd)]:border-r lg:[&>div:nth-child(odd)]:border-r-0">
        {stats.map(([n, l], i) => {
          const Icon = ICONS[i]
          return (
            <div key={l} className="flex items-center gap-3 sm:gap-4 py-[22px] sm:py-[24px] px-3.5 sm:px-6 min-w-0">
              <Icon aria-hidden className="h-7 w-7 sm:h-9 sm:w-9 shrink-0 text-sc-gold" strokeWidth={1.3} />
              <div className="min-w-0 flex flex-col justify-center">
                <dd
                  className="font-display text-[1.5rem] sm:text-[1.75rem] font-bold tracking-tight text-white leading-none"
                  style={{ fontVariantNumeric: 'lining-nums', fontFeatureSettings: '"lnum" 1' }}
                >
                  {n}
                </dd>
                <dt className="text-[13px] sm:text-[14px] leading-snug text-slate-100 font-normal mt-1 break-words">{l}</dt>
              </div>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
