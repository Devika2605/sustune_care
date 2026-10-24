'use client'
import { useMemo, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Section, Heading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { HUBS, waLink, type Hub } from '@/lib/config'
import { CURRENCIES, SPARSH_TIERS, estimate, inr, money, type Currency, type SparshTier } from '@/lib/pricing'
import { cn } from '@/lib/cn'

const chip = (on: boolean) => cn('rounded-lg border px-4 py-2 text-sm font-medium transition-colors', on ? 'border-sc-gold bg-sc-marine text-white' : 'border-sc-line bg-white text-sc-slate hover:border-sc-gold')

export function Estimator() {
  const [city, setCity] = useState<Hub>('Hyderabad')
  const [aegis, setAegis] = useState(true)
  const [sparsh, setSparsh] = useState(true)
  const [rent, setRent] = useState(65000)
  const [tier, setTier] = useState<SparshTier>('comprehensive')
  const [cur, setCur] = useState<Currency>('USD')
  const q = useMemo(() => estimate({ city, aegis, sparsh, rentInr: rent, tier }), [city, aegis, sparsh, rent, tier])
  const interest = aegis && sparsh ? 'both' : aegis ? 'aegis' : 'sparsh'
  const none = !aegis && !sparsh

  return (
    <Section id="estimator">
      <Heading title="Estimate your monthly cost" sub="Indicative figures in your currency. Your consultation confirms the final quote." />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="space-y-7">
          <fieldset>
            <legend className="font-display font-semibold text-sc-marine">Where in India?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {HUBS.map((h) => <button key={h} type="button" aria-pressed={city === h} onClick={() => setCity(h)} className={chip(city === h)}>{h}</button>)}
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-display font-semibold text-sc-marine">What do you need?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" aria-pressed={aegis} onClick={() => setAegis(!aegis)} className={chip(aegis)}>Aegis (property)</button>
              <button type="button" aria-pressed={sparsh} onClick={() => setSparsh(!sparsh)} className={chip(sparsh)}>Sparsh (parental care)</button>
            </div>
          </fieldset>
          {aegis && (
            <div>
              <label htmlFor="rent" className="font-display font-semibold text-sc-marine">Monthly rent: {inr(rent)}</label>
              <input id="rent" type="range" min={25000} max={250000} step={5000} value={rent} onChange={(e) => setRent(+e.target.value)} className="mt-3 w-full accent-sc-cerulean" />
              <div className="flex justify-between text-xs text-slate-600"><span>₹25,000</span><span>₹2,50,000</span></div>
            </div>
          )}
          {sparsh && (
            <fieldset>
              <legend className="font-display font-semibold text-sc-marine">Sparsh plan</legend>
              <div className="mt-3 space-y-2">
                {(Object.keys(SPARSH_TIERS) as SparshTier[]).map((k) => (
                  <label key={k} className={cn('flex cursor-pointer items-start gap-3 rounded-lg border bg-white p-3', tier === k ? 'border-sc-gold ring-1 ring-sc-gold' : 'border-sc-line')}>
                    <input type="radio" name="tier" checked={tier === k} onChange={() => setTier(k)} className="mt-1 accent-sc-cerulean" />
                    <span><b className="text-sc-marine">{SPARSH_TIERS[k].name}</b><span className="block text-sm text-slate-600">{SPARSH_TIERS[k].desc}</span></span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          <div>
            <label htmlFor="cur" className="font-display font-semibold text-sc-marine">Show prices in</label>
            <select id="cur" value={cur} onChange={(e) => setCur(e.target.value as Currency)} className="mt-2 block w-40 rounded-md border border-slate-300 bg-white px-3 py-2">
              {(Object.keys(CURRENCIES) as Currency[]).map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </Card>

        <Card dark className="self-start">
          <h3 className="font-display text-xl font-semibold">Your estimate</h3>
          {none ? <p className="mt-4 text-slate-200">Choose Aegis, Sparsh or both to see a price.</p> : (
            <div aria-live="polite">
              <dl className="mt-4 divide-y divide-white/15">
                {aegis && <div className="flex justify-between py-2"><dt>Aegis stewardship</dt><dd>{money(q.aegis, cur)}/mo</dd></div>}
                {sparsh && <div className="flex justify-between py-2"><dt>Sparsh ({SPARSH_TIERS[tier].name.toLowerCase()})</dt><dd>{money(q.sparsh, cur)}/mo</dd></div>}
                {q.discount > 0 && <div className="flex justify-between py-2 text-sc-gold"><dt>Bundle discount (15%)</dt><dd>-{money(q.discount, cur)}/mo</dd></div>}
              </dl>
              <p className="mt-5 text-sm text-slate-200">Estimated monthly total</p>
              <p className="font-display text-5xl font-extrabold text-sc-gold">{money(q.net, cur)}<span className="text-lg font-medium text-slate-200"> / month</span></p>
              <p className="mt-3 text-sm text-slate-300">Indicative only. Exchange rates are approximate. Billed quarterly or annually, with 30 days’ notice to pause or cancel.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={`/contact?interest=${interest}&city=${encodeURIComponent(city)}&quote=${q.net}`} variant="gold">Book a call about this plan</Button>
                <Button external href={waLink(`Hi Sustune Care, my estimate for ${city} is about $${q.net}/month. I would like to discuss it.`)} variant="light"><MessageCircle aria-hidden className="h-4 w-4" />Send on WhatsApp</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Section>
  )
}
