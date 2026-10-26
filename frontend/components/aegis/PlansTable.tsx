'use client'
import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AEGIS_MATRIX } from '@/lib/content'
import { AEGIS_RATE, AEGIS_MIN_INR, SCOUTING_RENT_DAYS, aegisMonthlyInr, inr, scoutingOneTimeInr } from '@/lib/pricing'

export function PlansTable() {
  const [rentText, setRentText] = useState('35000')
  const rent = Math.min(5_000_000, Math.max(0, Math.round(Number(rentText) || 0)))
  return (
    <div id="pricing" className="scroll-mt-24 rounded-2xl border border-sc-line bg-white p-5 shadow-card">
      <h2 className="font-display text-2xl font-bold text-sc-marine">Service Plans &amp; Pricing</h2>
      <p className="text-sm text-slate-600">Transparent pricing. Exceptional value.</p>
      <div className="mt-4">
        <label htmlFor="plan-rent" className="text-sm font-semibold text-sc-marine">Your monthly rent (₹)</label>
        <input id="plan-rent" type="number" inputMode="numeric" min={0} max={5000000} step={500} value={rentText} onChange={(e) => setRentText(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5" />
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-left text-sm">
          <caption className="sr-only">Comparison of Tenant Scouting Only and Complete Aegis Management</caption>
          <thead>
            <tr className="bg-sc-mist text-xs text-sc-marine"><th scope="col" className="p-3 font-semibold">Features</th><th scope="col" className="p-3 text-center font-semibold">Tenant Scouting Only</th><th scope="col" className="p-3 text-center font-semibold">Complete Aegis Management</th></tr>
          </thead>
          <tbody>
            {AEGIS_MATRIX.map(([label, a, b]) => (
              <tr key={label} className="border-t border-sc-line">
                <th scope="row" className="p-2.5 text-[13px] font-normal leading-snug text-sc-slate">{label}</th>
                {[a, b].map((v, i) => (
                  <td key={i} className="p-2.5 text-center">{v ? <><Check aria-hidden className="mx-auto h-4 w-4 text-sc-emerald" /><span className="sr-only">Included</span></> : <><X aria-hidden className="mx-auto h-4 w-4 text-red-600" /><span className="sr-only">Not included</span></>}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-sc-line bg-sc-mist align-top">
              <th scope="row" className="p-3 font-bold text-sc-marine">Fee</th>
              <td className="p-3 text-center"><b className="font-display text-lg text-sc-marine">{inr(scoutingOneTimeInr(rent))}</b><span className="block text-xs text-slate-600">one time ({SCOUTING_RENT_DAYS} days of rent)</span></td>
              <td className="p-3 text-center"><b className="font-display text-lg text-sc-marine">{inr(aegisMonthlyInr(rent, 'Bengaluru'))}</b><span className="block text-xs text-slate-600">per month ({Math.round(AEGIS_RATE * 100)}% of rent, min {inr(AEGIS_MIN_INR)})</span></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-600">Indicative, before city adjustment. Your consultation confirms the final quote.</p>
      <Button href="/contact?interest=aegis" arrow className="mt-4 w-full">Enquire about Aegis</Button>
    </div>
  )
}
