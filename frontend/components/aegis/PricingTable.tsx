'use client'
import { useState } from 'react'
import { Check, Minus } from 'lucide-react'
import { Section, Heading } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { AEGIS_MATRIX } from '@/lib/content'
import { AEGIS_MIN_USD, AEGIS_RATE, SCOUTING_RENT_DAYS, USD_INR, aegisMonthlyUsd, inr, scoutingOneTimeInr } from '@/lib/pricing'

export function PricingTable() {
  const [rent, setRent] = useState(65000)
  const oneTime = scoutingOneTimeInr(rent)
  const monthly = aegisMonthlyUsd(rent, 'Hyderabad')
  return (
    <Section id="pricing" tone="mist">
      <Heading title="Tenant scouting only, or complete Aegis management" sub="Move the slider to your monthly rent to see both prices. Figures are indicative until your consultation." />
      <div className="mb-8 rounded-xl border border-sc-line bg-white p-5">
        <label htmlFor="aegis-rent" className="font-display font-semibold text-sc-marine">Monthly rent: {inr(rent)}</label>
        <input id="aegis-rent" type="range" min={25000} max={250000} step={5000} value={rent} onChange={(e) => setRent(+e.target.value)} className="mt-3 w-full accent-sc-cerulean" />
      </div>

      <div className="overflow-x-auto rounded-xl border border-sc-line bg-white shadow-card">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">Comparison of Tenant Scouting Only and Complete Aegis Management</caption>
          <thead>
            <tr className="align-top">
              <th scope="col" className="w-1/2 p-5 font-display text-base text-sc-marine">What is included</th>
              <th scope="col" className="p-5">
                <span className="font-display text-base text-sc-marine">Tenant scouting only</span>
                <span className="mt-1 block font-display text-2xl font-extrabold text-sc-marine">{inr(oneTime)}</span>
                <span className="block text-xs font-normal text-slate-600">one time, {SCOUTING_RENT_DAYS} days of rent, payable when the lease is signed</span>
              </th>
              <th scope="col" className="bg-sc-goldtint p-5">
                <span className="font-display text-base text-sc-marine">Complete Aegis management</span>
                <span className="mt-1 block font-display text-2xl font-extrabold text-sc-marine">${monthly}<span className="text-sm font-medium"> / month</span></span>
                <span className="block text-xs font-normal text-slate-600">{AEGIS_RATE * 100}% of rent (about {inr(Math.round(monthly * USD_INR))}), minimum ${AEGIS_MIN_USD}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {AEGIS_MATRIX.map(([label, a, b]) => (
              <tr key={label} className="border-t border-sc-line">
                <th scope="row" className="p-4 font-normal text-sc-slate">{label}</th>
                <td className="p-4">{a ? <><Check aria-hidden className="h-5 w-5 text-sc-emerald" /><span className="sr-only">Included</span></> : <><Minus aria-hidden className="h-5 w-5 text-slate-400" /><span className="sr-only">Not included</span></>}</td>
                <td className="bg-sc-goldtint/60 p-4">{b ? <><Check aria-hidden className="h-5 w-5 text-sc-emerald" /><span className="sr-only">Included</span></> : <><Minus aria-hidden className="h-5 w-5 text-slate-400" /><span className="sr-only">Not included</span></>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/contact?interest=aegis">Ask about scouting</Button>
        <Button href="/contact?interest=aegis" variant="secondary">Enrol in complete Aegis</Button>
      </div>
    </Section>
  )
}
