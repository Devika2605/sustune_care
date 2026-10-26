'use client'
import { useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Home, Users } from 'lucide-react'
import { Section, Eyebrow } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { ModuleGrid } from '@/components/ui/ModuleCard'
import Image from 'next/image'
import { AEGIS_MODULES, SPARSH_PILLARS } from '@/lib/content'
import { cn } from '@/lib/cn'

type P = 'aegis' | 'sparsh'
const DATA = {
  aegis: { n: '01', Icon: Home, name: 'Aegis', sub: 'Institutional Property Stewardship', blurb: 'Professional management for your most valuable assets, so you can stay focused on what matters, no matter where you are.', pts: ['Tenant Scouting & Verification', 'Rental Management', 'Maintenance & Turnkey Interiors', 'Global Sourcing & Reporting'], href: '/aegis', cta: 'Learn About Aegis', bg: 'from-sc-marine to-sc-ink', modules: AEGIS_MODULES },
  sparsh: { n: '02', Icon: Users, name: 'Sparsh', sub: 'Family & Elder Care', blurb: 'A trusted presence for your loved ones back home with professional support, regular care and complete peace of mind.', pts: ['24/7 Emergency SOS', 'Doctor Escort & Appointments', 'Daily Errands & Daily Living Support', 'Regular Companionship Visits'], href: '/sparsh', cta: 'Learn About Sparsh', bg: 'from-sc-emerald to-sc-emeraldDark', modules: SPARSH_PILLARS },
} as const

export function Pillars() {
  const [focus, setFocus] = useState<P>('aegis')
  const other = () => setFocus(focus === 'aegis' ? 'sparsh' : 'aegis')
  const d = DATA[focus]
  return (
    <Section id="pillars" tone="white" className="pb-10 pt-4">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Our two pillars</Eyebrow>
          <h2 className="font-display text-4xl font-bold text-sc-marine sm:text-[2.6rem]">Complete Care. One Partner.</h2>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden max-w-xs text-sm text-slate-600 md:block">Two specialized services. A unified commitment: your peace of mind.</p>
          <div className="flex gap-2">
            <button type="button" onClick={other} aria-label="Show the other pillar" className="flex h-10 w-10 items-center justify-center rounded-full border border-sc-line bg-white text-sc-marine hover:bg-sc-mist"><ChevronLeft aria-hidden className="h-5 w-5" /></button>
            <button type="button" onClick={other} aria-label="Show the other pillar" className="flex h-10 w-10 items-center justify-center rounded-full border border-sc-gold text-sc-marine hover:bg-sc-goldtint"><ChevronRight aria-hidden className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {(Object.keys(DATA) as P[]).map((k) => {
          const c = DATA[k]
          return (
            <article key={k} onClick={() => setFocus(k)} className={cn('relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br p-7 text-white shadow-lift transition-all sm:p-9', c.bg, focus === k ? 'ring-2 ring-sc-gold ring-offset-4 ring-offset-sc-canvas' : 'opacity-95')}>
              {k === 'aegis'
                ? <Image src="/brand/aegis-card.webp" alt="" width={1100} height={657} sizes="(max-width: 1024px) 80vw, 40vw" className="pointer-events-none absolute -bottom-3 -right-4 h-auto w-[78%] opacity-90" />
                : <Image src="/brand/sparsh-card.webp" alt="" width={760} height={796} sizes="(max-width: 1024px) 60vw, 30vw" className="pointer-events-none absolute -bottom-6 -right-4 h-auto w-[52%] opacity-90" />}
              <span className="absolute right-6 top-5 text-sm text-slate-300">{c.n}</span>
              <div className="relative">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-sc-gold"><c.Icon aria-hidden className="h-6 w-6 text-sc-gold" /></span>
                  <div><h3 className="font-display text-3xl font-bold">{c.name}</h3><p className="font-display text-sm font-semibold text-slate-100">{c.sub}</p></div>
                </div>
                <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-100">{c.blurb}</p>
                <ul className="mt-5 space-y-2.5 text-sm">
                  {c.pts.map((p) => <li key={p} className="flex items-center gap-3"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-sc-gold text-sc-marine"><ArrowRight aria-hidden className="h-3 w-3" /></span>{p}</li>)}
                </ul>
                <Button href={c.href} arrow className="mt-7">{c.cta}</Button>
              </div>
            </article>
          )
        })}
      </div>
      <div aria-live="polite" className="mt-12">
        <h3 className="mb-5 font-display text-2xl font-bold text-sc-marine">What {d.name} covers</h3>
        <ModuleGrid modules={[...d.modules]} cols={4} />
      </div>
    </Section>
  )
}
