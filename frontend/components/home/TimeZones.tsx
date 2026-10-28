'use client'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

// Live clocks for the places our clients call from, against our Hyderabad desk.
// The whole point of the brand is the gap between those clocks, so we show it.
const ZONES = [
  { city: 'Hyderabad', tz: 'Asia/Kolkata', tag: 'Our desk', home: true },
  { city: 'New York', tz: 'America/New_York', tag: 'USA' },
  { city: 'London', tz: 'Europe/London', tag: 'UK' },
  { city: 'Dubai', tz: 'Asia/Dubai', tag: 'UAE' },
  { city: 'Singapore', tz: 'Asia/Singapore', tag: 'Singapore' },
  { city: 'Sydney', tz: 'Australia/Sydney', tag: 'Australia' },
] as const

function parts(tz: string, d: Date) {
  const f = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', weekday: 'short' })
  const o: Record<string, string> = {}
  f.formatToParts(d).forEach((p) => { o[p.type] = p.value })
  return o
}
function offsetMin(tz: string, d: Date) {
  const o = parts(tz, d)
  return (Date.UTC(+o.year, +o.month - 1, +o.day, +o.hour, +o.minute) - Math.floor(d.getTime() / 60000) * 60000) / 60000
}
const gap = (m: number) => { const a = Math.abs(m); const h = Math.floor(a / 60); const r = a % 60; return `${h}h${r ? ` ${r}m` : ''}` }

export function TimeZones() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => { setNow(new Date()); const t = setInterval(() => setNow(new Date()), 15000); return () => clearInterval(t) }, [])
  const hyd = now ? offsetMin('Asia/Kolkata', now) : 0

  return (
    <section className="relative overflow-hidden bg-sc-deep py-16 text-white grain sm:py-24" aria-labelledby="tz-title">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(36,84,170,.35),transparent)]" />
      <div className="relative mx-auto max-w-page px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center"><Eyebrow dark>Across time zones</Eyebrow></div>
          <h2 id="tz-title" className="font-display text-3xl font-bold sm:text-5xl">Whatever your clock says, <span className="text-shimmer animate-shimmer">someone is on it.</span></h2>
          <p className="mt-4 text-lg text-slate-300">The gap between your clock and your family’s is the problem we exist to close. Here it is, live.</p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {ZONES.map((z, i) => {
            const o = now ? parts(z.tz, now) : null
            const h = o ? +o.hour : 12
            const day = h >= 6 && h < 19
            const time = o ? `${String(h).padStart(2, '0')}:${o.minute.padStart(2, '0')}` : '--:--'
            const diff = now ? hyd - offsetMin(z.tz, now) : 0
            return (
              <Reveal key={z.city} as="li" delay={i * 0.07} y={18}>
                <div className={cn('relative h-full rounded-2xl border p-5 text-center backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1',
                  'home' in z ? 'border-sc-gold/70 bg-sc-gold/10 shadow-[0_0_40px_-8px_rgba(212,175,55,.45)]' : 'border-white/10 bg-white/[0.04]')}>
                  {'home' in z && <span aria-hidden className="absolute right-3 top-3 h-2 w-2 animate-pulsering rounded-full bg-sc-gold" />}
                  <p className={cn('text-[10px] font-semibold uppercase tracking-[0.2em]', 'home' in z ? 'text-sc-gold' : 'text-slate-400')}>{z.tag}</p>
                  <p className="mt-3 font-display text-3xl font-bold tabular-nums">{time}</p>
                  <p className="mt-1 text-sm font-medium text-slate-200">{z.city}</p>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                    {day ? <Sun aria-hidden className="h-3.5 w-3.5 text-sc-gold" /> : <Moon aria-hidden className="h-3.5 w-3.5 text-slate-300" />}
                    {'home' in z ? '24/7 SOS desk' : now ? `Hyderabad is ${gap(diff)} ahead` : 'Hyderabad is ahead'}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}