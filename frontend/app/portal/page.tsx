'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { api, ApiError, type PortalData } from '@/lib/api'
import { inr } from '@/lib/pricing'

const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Portal() {
  const router = useRouter()
  const [d, setD] = useState<PortalData | null>(null)
  const [err, setErr] = useState('')
  useEffect(() => {
    api.portalMe().then(setD).catch((e) => { if (e instanceof ApiError && e.status === 401) router.replace('/login'); else setErr(e.message) })
  }, [router])
  async function out() { await api.logout().catch(() => {}); router.push('/') }
  if (err) return <Section><p role="alert" className="text-red-700">{err}</p></Section>
  if (!d) return <Section><p>Loading…</p></Section>
  return (
    <Section tone="mist">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold text-sc-marine">Welcome, {d.client.name}</h1>
        <Button variant="outline" onClick={out}>Sign out</Button>
      </div>
      <h2 className="font-display text-xl font-semibold text-sc-marine">Properties</h2>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {d.properties.map((p) => (
          <Card key={p.id}>
            <h3 className="font-display font-semibold text-sc-marine">{p.name}</h3><p className="text-sm text-slate-600">{p.city}</p>
            <dl className="mt-3 divide-y divide-sc-line text-sm">
              {[['Monthly rent', inr(p.monthly_rent_inr)], ['Tenant', p.tenant], ['Rent status', p.rent_status], ['Last inspection', `${p.last_inspection} · ${p.inspection_score}/100`]].map(([k, v]) => <div key={k} className="flex justify-between gap-4 py-2"><dt className="text-slate-600">{k}</dt><dd className="text-right font-medium">{v}</dd></div>)}
            </dl>
          </Card>
        ))}
      </div>
      {d.parents.map((pr) => (
        <div key={pr.id} className="mt-10">
          <h2 className="font-display text-xl font-semibold text-sc-marine">{pr.name}, {pr.age} ({pr.city})</h2>
          <p className="text-sm text-slate-600">Care companion: {pr.companion || 'being assigned'}</p>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <Card>
              <h3 className="font-display font-semibold text-sc-marine">Recent vitals</h3>
              <div className="mt-3 overflow-x-auto"><table className="w-full min-w-[360px] text-left text-sm">
                <thead><tr className="text-slate-600"><th scope="col" className="py-2 font-medium">Date</th><th scope="col" className="font-medium">BP</th><th scope="col" className="font-medium">Pulse</th><th scope="col" className="font-medium">SpO₂</th><th scope="col" className="font-medium">Sugar</th></tr></thead>
                <tbody>{pr.vitals.map((v, i) => <tr key={i} className="border-t border-sc-line"><td className="py-2">{fmt(v.recorded_at)}</td><td>{v.bp}</td><td>{v.pulse}</td><td>{v.spo2}%</td><td>{v.sugar ?? '–'}</td></tr>)}</tbody>
              </table></div>
            </Card>
            <Card>
              <h3 className="font-display font-semibold text-sc-marine">Appointments</h3>
              <ul className="mt-3 divide-y divide-sc-line text-sm">{pr.appointments.map((a) => <li key={a.id} className="py-3"><b>{a.doctor}</b>, {a.hospital}<br /><span className="text-slate-600">{fmt(a.when)} · {a.status}</span>{a.summary && <p className="mt-1">{a.summary}</p>}</li>)}</ul>
            </Card>
          </div>
        </div>
      ))}
    </Section>
  )
}
