'use client'
import { useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Tabs, TabPanel } from '@/components/ui/Tabs'
import { Button } from '@/components/ui/Button'
import { HUBS, type Hub } from '@/lib/config'
import { AEGIS_RATE, BUNDLE_DISCOUNT, CARE_PRESETS, CURRENCIES, PROPERTY_TYPES, aegisMonthlyInr, fmt, scoutingOneTimeInr, sparshPlan, type AegisService, type CareLevel, type Currency } from '@/lib/pricing'

const TABS = [{ id: 'aegis', label: 'Property Management (Aegis)' }, { id: 'sparsh', label: 'Elder Care (Sparsh)' }] as const
const field = 'mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sc-slate'
const BULLETS = {
  aegis: ['Professional tenant screening', 'Regular maintenance', 'On-time rent collection', 'Transparent reporting'],
  sparsh: ['Personalised care plan', 'Regular family updates', 'Dedicated care manager', '24/7 emergency support'],
}

export function Calculator() {
  const [tab, setTab] = useState<'aegis' | 'sparsh'>('aegis')
  const [cur, setCur] = useState<Currency>('INR')
  // Aegis
  const [ptype, setPtype] = useState<string>('2bhk')
  const [city, setCity] = useState<Hub>('Hyderabad')
  const [rentText, setRentText] = useState('35000')
  const [service, setService] = useState<AegisService>('complete')
  // Sparsh
  const [both, setBoth] = useState(false)
  const [level, setLevel] = useState<CareLevel>('comprehensive')
  const [pills, setPills] = useState(false)

  const rent = Math.min(5_000_000, Math.max(0, Math.round(Number(rentText) || 0)))
  const aegisFee = aegisMonthlyInr(rent, city)
  const scouting = scoutingOneTimeInr(rent)
  const plan = useMemo(() => {
    const p = CARE_PRESETS[level]
    return sparshPlan({ sos: p.sos, vitals: p.vitals, escorts: p.escorts, visits: p.visits, pills: p.pills || pills, both })
  }, [level, pills, both])

  function pickType(id: string) {
    setPtype(id)
    const t = PROPERTY_TYPES.find((x) => x.id === id)
    if (t) setRentText(String(t.rent))
  }

  return (
    <Section id="calculator" tone="white" className="pt-4">
      <div className="rounded-3xl border border-sc-line bg-white p-5 shadow-card sm:p-8">
        <h2 className="font-display text-3xl font-bold text-sc-marine">Calculate Your Peace of Mind</h2>
        <p className="mt-1 text-slate-600">See how much value Sustune Care brings to your life.</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Tabs items={TABS} value={tab} onChange={setTab} label="Calculator type" idPrefix="calc" className="w-full sm:w-auto" />
            <TabPanel idPrefix="calc" active={tab} className="mt-6">
              {tab === 'aegis' ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  <div><label htmlFor="c-type" className="font-semibold text-sc-marine">Property type</label>
                    <select id="c-type" className={field} value={ptype} onChange={(e) => pickType(e.target.value)}>{PROPERTY_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</select></div>
                  <div><label htmlFor="c-city" className="font-semibold text-sc-marine">City</label>
                    <select id="c-city" className={field} value={city} onChange={(e) => setCity(e.target.value as Hub)}>{HUBS.map((h) => <option key={h}>{h}</option>)}</select></div>
                  <div><label htmlFor="c-rent" className="font-semibold text-sc-marine">Expected monthly rent (₹)</label>
                    <input id="c-rent" type="number" inputMode="numeric" min={0} max={5000000} step={500} className={field} value={rentText} onChange={(e) => setRentText(e.target.value)} /></div>
                  <div><label htmlFor="c-svc" className="font-semibold text-sc-marine">Service type</label>
                    <select id="c-svc" className={field} value={service} onChange={(e) => setService(e.target.value as AegisService)}><option value="complete">Complete Management</option><option value="scouting">Tenant Scouting Only</option></select></div>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  <div><label htmlFor="c-par" className="font-semibold text-sc-marine">Parents covered</label>
                    <select id="c-par" className={field} value={both ? '2' : '1'} onChange={(e) => setBoth(e.target.value === '2')}><option value="1">One parent</option><option value="2">Both parents</option></select></div>
                  <div><label htmlFor="c-lvl" className="font-semibold text-sc-marine">Care level</label>
                    <select id="c-lvl" className={field} value={level} onChange={(e) => setLevel(e.target.value as CareLevel)}>{(Object.keys(CARE_PRESETS) as CareLevel[]).map((k) => <option key={k} value={k}>{CARE_PRESETS[k].label}</option>)}</select></div>
                  <div className="sm:col-span-2 rounded-lg bg-sc-mist p-4 text-sm text-slate-700">
                    <b className="text-sc-marine">What is in {CARE_PRESETS[level].label}:</b>
                    <ul className="mt-1 list-inside list-disc">{plan.lines.map((l) => <li key={l.label}>{l.label}</li>)}</ul>
                  </div>
                  <label className="flex cursor-pointer items-center gap-3 sm:col-span-2"><input type="checkbox" checked={pills} disabled={CARE_PRESETS[level].pills} onChange={(e) => setPills(e.target.checked)} className="h-5 w-5 accent-sc-gold" /><span>Add colour-coded pill sorting</span></label>
                </div>
              )}
            </TabPanel>
          </div>

          <div className="rounded-2xl bg-sc-marine p-6 text-white">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-slate-200">{tab === 'aegis' ? (service === 'complete' ? 'Annual rent we look after' : 'Rent you are placing') : 'Estimated monthly care plan'}</p>
              <div><label htmlFor="c-cur" className="sr-only">Currency</label>
                <select id="c-cur" value={cur} onChange={(e) => setCur(e.target.value as Currency)} className="rounded-md border border-white/30 bg-transparent px-2 py-1 text-xs text-white">
                  {(Object.keys(CURRENCIES) as Currency[]).map((c) => <option key={c} value={c} className="text-sc-slate">{c}</option>)}
                </select></div>
            </div>
            <div aria-live="polite">
              <p className="mt-1 font-display text-4xl font-bold text-sc-gold sm:text-5xl">{tab === 'aegis' ? fmt(rent * 12, cur) : fmt(plan.total, cur)}{tab === 'sparsh' && <span className="text-lg font-normal text-slate-200"> / month</span>}</p>
              <p className="mt-1 text-sm text-slate-300">
                {tab === 'aegis'
                  ? (service === 'complete' ? `Collected, tracked and reported for you. Aegis fee about ${fmt(aegisFee, cur)} a month (${Math.round(AEGIS_RATE * 100)}% of rent, minimum applies).` : `One-time scouting fee about ${fmt(scouting, cur)}, due when the lease is signed.`)
                  : `About ${fmt(plan.total * 12, cur)} a year. ${both ? 'Second parent at 35% of routine care.' : ''}`}
              </p>
            </div>
            <ul className="mt-5 space-y-2 text-sm">{BULLETS[tab].map((b) => <li key={b} className="flex gap-2"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-sc-gold" />{b}</li>)}</ul>
            <Button variant="gold" arrow className="mt-6 w-full" href={tab === 'aegis' ? `/contact?interest=aegis&city=${encodeURIComponent(city)}&quote=${service === 'complete' ? aegisFee : ''}` : `/contact?interest=sparsh&quote=${plan.total}`}>Get Detailed Estimate</Button>
            <p className="mt-3 text-xs text-slate-300">Indicative only. Exchange rates are approximate. Taking both services? <a className="text-sc-gold underline" href="/contact?interest=both">Save {Math.round(BUNDLE_DISCOUNT * 100)}% on the bundle</a>.</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
