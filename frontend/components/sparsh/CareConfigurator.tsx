'use client'
import { useMemo, useState } from 'react'
import { Check, Heart, HeartPulse, Siren, Stethoscope, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { waLink } from '@/lib/config'
import { COMPANION_VISIT_INR, CURRENCIES, ESCORT_VISIT_INR, SOS_INR, VITALS, fmt, sparshPlan, type Currency, type VitalsFreq } from '@/lib/pricing'
import { cn } from '@/lib/cn'

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)}
      className={cn('relative h-7 w-12 shrink-0 rounded-full transition-colors', on ? 'bg-sc-emerald' : 'bg-slate-300')}>
      <span className={cn('absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all', on ? 'left-6' : 'left-1')} />
    </button>
  )
}

function Row({ Icon, title, sub, price, on, onChange, children }: { Icon: LucideIcon; title: string; sub: string; price: number; on: boolean; onChange: (v: boolean) => void; children?: React.ReactNode }) {
  return (
    <li className="py-4">
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sc-mist"><Icon aria-hidden className="h-5 w-5 text-sc-marine" /></span>
        <div className="flex-1"><p className="font-semibold text-sc-marine">{title}</p><p className="text-xs text-slate-600">{sub}</p></div>
        <Toggle on={on} onChange={onChange} label={`Include ${title}`} />
        <p className="w-24 shrink-0 text-right text-sm font-semibold text-sc-marine">{on ? `₹${price.toLocaleString('en-IN')}` : '–'}<span className="block text-xs font-normal text-slate-600">/ month</span></p>
      </div>
      {on && children && <div className="ml-[60px] mt-3">{children}</div>}
    </li>
  )
}

const sel = 'rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm'

export function CareConfigurator() {
  const [both, setBoth] = useState(false)
  const [sos, setSos] = useState(true)
  const [vitalsOn, setVitalsOn] = useState(true)
  const [vitals, setVitals] = useState<VitalsFreq>('biweekly')
  const [escortOn, setEscortOn] = useState(true)
  const [escorts, setEscorts] = useState(2)
  const [visitOn, setVisitOn] = useState(true)
  const [visits, setVisits] = useState(4)
  const [pills, setPills] = useState(false)
  const [cur, setCur] = useState<Currency>('INR')

  const plan = useMemo(() => sparshPlan({ sos, vitals: vitalsOn ? vitals : 'off', escorts: escortOn ? escorts : 0, visits: visitOn ? visits : 0, pills, both }), [sos, vitalsOn, vitals, escortOn, escorts, visitOn, visits, pills, both])

  return (
    <Section id="plan" tone="white" className="pt-6">
      <div className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-sc-line bg-white p-6 shadow-card">
          <h2 className="font-display text-3xl font-bold text-sc-marine">Build a Care Plan</h2>
          <p className="text-slate-600">Customize a plan that fits your parent’s needs.</p>
          <fieldset className="mt-5">
            <legend className="sr-only">Who is covered</legend>
            <div className="inline-flex rounded-full bg-sc-mist p-1" role="group" aria-label="Who is covered">
              {[[false, 'One parent'], [true, 'Both parents']].map(([v, l]) => (
                <button key={String(l)} type="button" aria-pressed={both === v} onClick={() => setBoth(v as boolean)} className={cn('rounded-full px-5 py-2 text-sm font-semibold', both === v ? 'bg-sc-marine text-white' : 'text-slate-700')}>{l as string}</button>
              ))}
            </div>
          </fieldset>
          <ul className="mt-2 divide-y divide-sc-line">
            <Row Icon={Siren} title="Emergency Support" sub="24/7 SOS & emergency response" price={SOS_INR} on={sos} onChange={setSos} />
            <Row Icon={HeartPulse} title="Routine Vitals Check" sub="Blood pressure, sugar, oxygen and pulse" price={VITALS[vitals].inr} on={vitalsOn} onChange={setVitalsOn}>
              <label className="text-sm text-slate-700">How often <select className={cn(sel, 'ml-2')} value={vitals} onChange={(e) => setVitals(e.target.value as VitalsFreq)}>{(Object.keys(VITALS) as VitalsFreq[]).map((k) => <option key={k} value={k}>{VITALS[k].label}</option>)}</select></label>
            </Row>
            <Row Icon={Stethoscope} title="Doctor Escort" sub="Hospital visits & appointments" price={escorts * ESCORT_VISIT_INR} on={escortOn} onChange={setEscortOn}>
              <label className="text-sm text-slate-700">Visits a month <select className={cn(sel, 'ml-2')} value={escorts} onChange={(e) => setEscorts(+e.target.value)}>{[1, 2, 4, 6].map((n) => <option key={n}>{n}</option>)}</select></label>
            </Row>
            <Row Icon={Users} title="Companionship Visits" sub="Regular home visits, errands & activities" price={visits * COMPANION_VISIT_INR} on={visitOn} onChange={setVisitOn}>
              <label className="text-sm text-slate-700">Visits a month <select className={cn(sel, 'ml-2')} value={visits} onChange={(e) => setVisits(+e.target.value)}>{[2, 4, 8, 12].map((n) => <option key={n}>{n}</option>)}</select></label>
            </Row>
          </ul>
          <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-lg bg-sc-mist p-3 text-sm"><input type="checkbox" checked={pills} onChange={(e) => setPills(e.target.checked)} className="h-5 w-5 accent-sc-emerald" /><span><b className="text-sc-marine">Add colour-coded pill sorting</b> (₹800 a month)</span></label>
        </div>

        <div className="rounded-2xl bg-sc-emerald p-6 text-white shadow-lift">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-2xl font-bold text-sc-gold">Your Monthly Care Plan</h3>
            <div><label htmlFor="sp-cur" className="sr-only">Currency</label>
              <select id="sp-cur" value={cur} onChange={(e) => setCur(e.target.value as Currency)} className="rounded-md border border-white/30 bg-transparent px-2 py-1 text-xs">{(Object.keys(CURRENCIES) as Currency[]).map((c) => <option key={c} value={c} className="text-sc-slate">{c}</option>)}</select></div>
          </div>
          <div aria-live="polite">
            <p className="mt-2 font-display text-5xl font-bold">{fmt(plan.total, cur)}<span className="text-lg font-normal text-slate-200"> / month</span></p>
            <ul className="mt-4 space-y-1 text-sm text-slate-100">
              {plan.lines.map((l) => <li key={l.label} className="flex justify-between gap-3"><span>{l.label}</span><span>{fmt(l.inr, cur)}</span></li>)}
              {both && <li className="flex justify-between gap-3"><span>Second parent (35% of routine care)</span><span>{fmt(plan.second, cur)}</span></li>}
              {plan.lines.length === 0 && <li>Switch on at least one service.</li>}
            </ul>
          </div>
          <ul className="mt-5 space-y-2 border-t border-white/20 pt-4 text-sm">
            {['Personalised care plan', 'Regular family updates', 'Dedicated care manager', '24/7 emergency support'].map((b) => <li key={b} className="flex gap-2"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-sc-gold" />{b}</li>)}
          </ul>
          <Button variant="gold" arrow className="mt-6 w-full" href={`/contact?interest=sparsh&quote=${plan.total}`}>Get Started</Button>
          <Button variant="light" external href={waLink(`Hi Sustune Care, I built a Sparsh plan for my parents at about ₹${plan.total.toLocaleString('en-IN')}/month. Can we talk?`)} className="mt-3 w-full">Send this plan on WhatsApp</Button>
          <p className="mt-3 text-xs text-slate-200">Indicative only. Pause or change the plan with 30 days’ notice.</p>
        </div>
      </div>
      <ul className="mt-8 grid gap-3 rounded-2xl bg-sc-mist p-4 sm:grid-cols-2 lg:grid-cols-4">
        {[[Heart, 'Dignity', 'in every interaction'], [Check, 'Safety', 'at every step'], [Users, 'Transparency', 'in all updates'], [HeartPulse, 'Trust', 'across generations']].map(([I, t, d]) => {
          const Icon = I as LucideIcon
          return <li key={t as string} className="flex items-center gap-3 p-2"><Icon aria-hidden className="h-6 w-6 text-sc-bronze" /><span><b className="block text-sc-marine">{t as string}</b><span className="text-sm text-slate-600">{d as string}</span></span></li>
        })}
      </ul>
    </Section>
  )
}
