'use client'
import { useMemo, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Section, Heading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { waLink } from '@/lib/config'
import { CURRENCIES, VITALS, money, sparshPlan, type Currency, type VitalsFreq } from '@/lib/pricing'
import { cn } from '@/lib/cn'

const opt = (on: boolean) => cn('rounded-lg border px-4 py-3 text-left text-sm transition-colors', on ? 'border-sc-gold bg-sc-marine text-white' : 'border-sc-line bg-white text-sc-slate hover:border-sc-gold')

export function CareConfigurator() {
  const [both, setBoth] = useState(false)
  const [vitals, setVitals] = useState<VitalsFreq>('biweekly')
  const [escorts, setEscorts] = useState(2)
  const [visits, setVisits] = useState(4)
  const [pills, setPills] = useState(true)
  const [cur, setCur] = useState<Currency>('USD')
  const plan = useMemo(() => sparshPlan({ both, vitals, escorts, visits, pills }), [both, vitals, escorts, visits, pills])

  return (
    <Section id="plan" tone="mist">
      <Heading title="Build your parents’ care plan" sub="Emergency cover is always included. Choose the routine care and companionship that fits." />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="space-y-7">
          <fieldset>
            <legend className="font-display font-semibold text-sc-marine">Who is covered?</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <button type="button" aria-pressed={!both} onClick={() => setBoth(false)} className={opt(!both)}><b>One parent</b></button>
              <button type="button" aria-pressed={both} onClick={() => setBoth(true)} className={opt(both)}><b>Both parents</b><span className="block opacity-80">Second parent at 35% of routine care</span></button>
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-display font-semibold text-sc-marine">Vitals check at home</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {(Object.keys(VITALS) as VitalsFreq[]).map((k) => (
                <button key={k} type="button" aria-pressed={vitals === k} onClick={() => setVitals(k)} className={opt(vitals === k)}><b>{VITALS[k].label}</b><span className="block opacity-80">{VITALS[k].note}</span></button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-display font-semibold text-sc-marine">Doctor escorts a month</legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[1, 2, 4].map((n) => <button key={n} type="button" aria-pressed={escorts === n} onClick={() => setEscorts(n)} className={opt(escorts === n)}><b>{n} {n === 1 ? 'visit' : 'visits'}</b></button>)}
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-display font-semibold text-sc-marine">Companionship and errand visits a month</legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[2, 4, 8].map((n) => <button key={n} type="button" aria-pressed={visits === n} onClick={() => setVisits(n)} className={opt(visits === n)}><b>{n} visits</b></button>)}
            </div>
          </fieldset>
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-sc-line bg-white p-3">
            <input type="checkbox" checked={pills} onChange={(e) => setPills(e.target.checked)} className="h-5 w-5 accent-sc-cerulean" />
            <span><b className="text-sc-marine">Colour-coded pill sorting</b><span className="block text-sm text-slate-600">Morning, noon and night pouches, refilled with each delivery</span></span>
          </label>
          <div>
            <label htmlFor="sp-cur" className="font-display font-semibold text-sc-marine">Show prices in</label>
            <select id="sp-cur" value={cur} onChange={(e) => setCur(e.target.value as Currency)} className="mt-2 block w-40 rounded-md border border-slate-300 bg-white px-3 py-2">
              {(Object.keys(CURRENCIES) as Currency[]).map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </Card>

        <Card dark className="self-start">
          <h3 className="font-display text-xl font-semibold">Your care plan</h3>
          <div aria-live="polite">
            <dl className="mt-4 divide-y divide-white/15 text-sm">
              {plan.lines.map((l) => <div key={l.label} className="flex justify-between gap-4 py-2"><dt>{l.label}</dt><dd className="shrink-0">{money(l.usd, cur)}</dd></div>)}
              {both && <div className="flex justify-between gap-4 py-2"><dt>Second parent</dt><dd>{money(plan.second, cur)}</dd></div>}
            </dl>
            <p className="mt-5 text-sm text-slate-200">Estimated monthly total</p>
            <p className="font-display text-5xl font-extrabold text-sc-gold">{money(plan.total, cur)}<span className="text-lg font-medium text-slate-200"> / month</span></p>
          </div>
          <p className="mt-3 text-sm text-slate-300">Indicative only. Your parents keep the same named companion for continuity. Pause or change the plan with 30 days’ notice.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={`/contact?interest=sparsh&quote=${plan.total}`} variant="gold">Book a call about this plan</Button>
            <Button external href={waLink(`Hi Sustune Care, I built a Sparsh plan for my parents at about $${plan.total}/month. Can we talk?`)} variant="light"><MessageCircle aria-hidden className="h-4 w-4" />WhatsApp</Button>
          </div>
        </Card>
      </div>
    </Section>
  )
}
