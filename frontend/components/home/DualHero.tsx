'use client'
import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Building2, HeartPulse, ShieldCheck, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Tabs, TabPanel } from '@/components/ui/Tabs'
import { HUBS } from '@/lib/config'

type Mode = 'both' | 'aegis' | 'sparsh'
const MODES = [
  { id: 'both', label: 'Dual-Shield' },
  { id: 'aegis', label: 'Aegis (property)' },
  { id: 'sparsh', label: 'Sparsh (parental care)' },
] as const

const PANELS: Record<Mode, { icon: typeof Building2; title: string; kicker: string; points: string[]; href: string; cta: string; interest: string }> = {
  both: { icon: ShieldCheck, title: 'Both, with one team', kicker: 'One monthly review, one portal, one number to call.', points: ['A named steward for the property', 'A named companion for your parents', 'Bundle discount when you take both'], href: '/#estimator', cta: 'Estimate your plan', interest: 'both' },
  aegis: { icon: Building2, title: 'Aegis: your property', kicker: 'For homes you own in India and do not live in.', points: ['Verified tenants and digital leases', 'Rent in escrow, paid out on a fixed date', 'Quarterly inspection reports with photos'], href: '/aegis', cta: 'See how Aegis works', interest: 'aegis' },
  sparsh: { icon: HeartPulse, title: 'Sparsh: your parents', kicker: 'For parents who live on their own in India.', points: ['24/7 emergency SOS coordination', 'A companion at every doctor visit', 'Regular visits, errands and vitals checks'], href: '/sparsh', cta: 'See how Sparsh works', interest: 'sparsh' },
}

export function DualHero() {
  const [mode, setMode] = useState<Mode>('both')
  const reduce = useReducedMotion()
  const p = PANELS[mode]
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sc-marine to-sc-deep text-white">
      <div className="mx-auto grid max-w-page items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sc-gold/50 px-3 py-1 text-sm text-sc-gold">
            <Image src="/brand/emblem.png" alt="" width={20} height={20} className="h-5 w-auto" />
            For NRIs in the USA, UK, UAE, Australia and Canada
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.12] tracking-[-0.025em] sm:text-[3.25rem]">
            Care for your property.<br />Care for your parents.<br />Peace of mind for you.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">
            You should not have to choose between your life abroad and what you left behind. Sustune Care looks after your home and your parents in {HUBS.join(', ')}, and shows you what happened.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" variant="gold">Book a free consultation</Button>
            <Button href="/portal-preview" variant="light">Explore the portal demo</Button>
          </div>
        </div>

        <div>
          <Tabs items={MODES} value={mode} onChange={setMode} label="Choose a service" idPrefix="hero" dark />
          <TabPanel idPrefix="hero" active={mode} className="mt-4 rounded-xl focus-visible:outline-offset-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-sc-gold/60 bg-white/[0.06] p-6 backdrop-blur"
              >
                <p.icon aria-hidden className="h-8 w-8 text-sc-gold" />
                <h2 className="mt-3 font-display text-2xl font-semibold">{p.title}</h2>
                <p className="mt-1 text-slate-200">{p.kicker}</p>
                <ul className="mt-5 space-y-2.5">
                  {p.points.map((x) => <li key={x} className="flex gap-2.5"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-sc-gold" /><span>{x}</span></li>)}
                </ul>
                <Button href={p.href} variant="gold" className="mt-6">{p.cta}</Button>
              </motion.div>
            </AnimatePresence>
          </TabPanel>
        </div>
      </div>
    </section>
  )
}
