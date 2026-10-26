import { FileText, ShieldCheck, Users, Wrench } from 'lucide-react'

const ITEMS = [
  [ShieldCheck, 'Verified Tenants', 'Background checks & screening'],
  [Users, 'On-ground Team', 'Trusted local professionals'],
  [FileText, 'Transparent Reporting', 'Photos, updates & financial statements'],
  [Wrench, 'End-to-End Support', 'From rentals to renovations'],
] as const

export function WhyAegis() {
  return (
    <div className="rounded-2xl border border-sc-line bg-white p-5 shadow-card">
      <h2 className="font-display text-2xl font-bold text-sc-marine">Why Choose Aegis</h2>
      <ul className="mt-5 space-y-5">
        {ITEMS.map(([Icon, t, d]) => (
          <li key={t} className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sc-mist"><Icon aria-hidden className="h-5 w-5 text-sc-marine" /></span><span><b className="block text-sc-marine">{t}</b><span className="text-sm text-slate-600">{d}</span></span></li>
        ))}
      </ul>
    </div>
  )
}
