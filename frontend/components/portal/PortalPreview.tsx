'use client'
import { useState } from 'react'
import { Building2, HeartPulse, Pill } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Tabs, TabPanel } from '@/components/ui/Tabs'
import { SampleBadge } from '@/components/ui/SampleBadge'
import { Button } from '@/components/ui/Button'
import { PREVIEW as P } from '@/lib/content'
import { inr } from '@/lib/pricing'
import { cn } from '@/lib/cn'

const TABS = [{ id: 'estate', label: 'Real estate portfolio' }, { id: 'health', label: 'Parent health hub' }] as const
const badge = (s: string) => cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', s === 'Completed' || s === 'Paid out' ? 'bg-emerald-100 text-emerald-900' : s === 'Scheduled' || s === 'Held in escrow' ? 'bg-blue-100 text-blue-900' : 'bg-amber-100 text-amber-900')

export function PortalPreview() {
  const [tab, setTab] = useState<'estate' | 'health'>('estate')
  return (
    <Section tone="mist">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-sc-marine sm:text-4xl">Welcome back</h1>
          <p className="mt-1 text-slate-600">{P.client}</p>
        </div>
        <SampleBadge>Sample data. This is a demo, not a live account.</SampleBadge>
      </div>
      <Tabs items={TABS} value={tab} onChange={setTab} label="Portal sections" idPrefix="portal" />
      <TabPanel idPrefix="portal" active={tab} className="mt-6">
        {tab === 'estate' ? (
          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="lg:col-span-2">
              <div className="flex items-center gap-2"><Building2 aria-hidden className="h-5 w-5 text-sc-cerulean" /><h2 className="font-display text-lg font-semibold text-sc-marine">{P.property.name}</h2></div>
              <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-4">
                <div><dt className="text-slate-600">Tenant</dt><dd className="font-semibold">{P.property.tenant}</dd></div>
                <div><dt className="text-slate-600">Lease</dt><dd className="font-semibold">{P.property.lease}</dd></div>
                <div><dt className="text-slate-600">Deposit in escrow</dt><dd className="font-semibold">{inr(P.property.deposit)}</dd></div>
                <div><dt className="text-slate-600">Last inspection</dt><dd className="font-semibold">{P.property.score}/100</dd></div>
              </dl>
            </Card>
            <Card>
              <h2 className="font-display text-lg font-semibold text-sc-marine">Rent ledger</h2>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <caption className="sr-only">Monthly rent ledger</caption>
                  <thead><tr className="text-slate-600"><th scope="col" className="py-2 font-medium">Month</th><th scope="col" className="font-medium">Rent</th><th scope="col" className="font-medium">Status</th><th scope="col" className="font-medium">Payout</th></tr></thead>
                  <tbody>{P.ledger.map(([m, a, s, d]) => <tr key={m} className="border-t border-sc-line"><th scope="row" className="py-2.5 font-normal">{m}</th><td>{inr(a)}</td><td><span className={badge(s)}>{s}</span></td><td>{d}</td></tr>)}</tbody>
                </table>
              </div>
            </Card>
            <Card>
              <h2 className="font-display text-lg font-semibold text-sc-marine">Maintenance tickets</h2>
              <ul className="mt-3 divide-y divide-sc-line">
                {P.tickets.map((t) => (
                  <li key={t.id} className="flex items-start justify-between gap-3 py-3 text-sm">
                    <span><b>{t.title}</b><br /><span className="text-slate-600">{t.id} · {inr(t.cost)}</span></span>
                    <span className={badge(t.status)}>{t.status}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="lg:col-span-2">
              <div className="flex items-center gap-2"><HeartPulse aria-hidden className="h-5 w-5 text-sc-emerald" /><h2 className="font-display text-lg font-semibold text-sc-marine">{P.parent.name}</h2></div>
              <p className="mt-1 text-sm text-slate-600">Care companion: {P.parent.companion}</p>
            </Card>
            <Card>
              <h2 className="font-display text-lg font-semibold text-sc-marine">Recent vitals</h2>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[360px] text-left text-sm">
                  <caption className="sr-only">Recent vitals readings</caption>
                  <thead><tr className="text-slate-600"><th scope="col" className="py-2 font-medium">Date</th><th scope="col" className="font-medium">BP</th><th scope="col" className="font-medium">Pulse</th><th scope="col" className="font-medium">SpO₂</th><th scope="col" className="font-medium">Sugar</th></tr></thead>
                  <tbody>{P.vitals.map(([d, bp, pu, sp, su]) => <tr key={d} className="border-t border-sc-line"><th scope="row" className="py-2.5 font-normal">{d}</th><td>{bp}</td><td>{pu}</td><td>{sp}%</td><td>{su}</td></tr>)}</tbody>
                </table>
              </div>
            </Card>
            <Card>
              <h2 className="font-display text-lg font-semibold text-sc-marine">Doctor notes</h2>
              <ul className="mt-3 space-y-3 text-sm">{P.notes.map(([t, n]) => <li key={t}><b>{t}</b><br /><span className="text-slate-600">{n}</span></li>)}</ul>
            </Card>
            <Card className="lg:col-span-2">
              <div className="flex items-center gap-2"><Pill aria-hidden className="h-5 w-5 text-sc-cerulean" /><h2 className="font-display text-lg font-semibold text-sc-marine">Medication delivery</h2></div>
              <ul className="mt-3 divide-y divide-sc-line text-sm">{P.meds.map(([m, a, b]) => <li key={m} className="flex flex-wrap justify-between gap-2 py-2.5"><b>{m}</b><span className="text-slate-600">{a} · {b}</span></li>)}</ul>
            </Card>
          </div>
        )}
      </TabPanel>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/contact?interest=both">Book a consultation</Button>
        <Button href="/login" variant="outline">Client login</Button>
      </div>
    </Section>
  )
}
