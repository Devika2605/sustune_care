'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { api, ApiError, type Lead } from '@/lib/api'

const STATUSES = ['new', 'contacted', 'scheduled', 'won', 'lost']

export default function Admin() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState('')
  const [err, setErr] = useState('')
  useEffect(() => {
    api.leads().then(setLeads).catch((e) => { if (e instanceof ApiError && (e.status === 401 || e.status === 403)) router.replace('/login'); else setErr(e.message) })
  }, [router])
  async function change(id: number, status: string) {
    try { const u = await api.setLeadStatus(id, status); setLeads((ls) => ls.map((l) => (l.id === id ? u : l))) } catch (e) { setErr(e instanceof Error ? e.message : 'Update failed') }
  }
  async function out() { await api.logout().catch(() => {}); router.push('/') }
  const shown = filter ? leads.filter((l) => l.status === filter) : leads
  return (
    <Section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold text-sc-marine">Leads ({shown.length})</h1>
        <div className="flex gap-3">
          <label className="sr-only" htmlFor="flt">Filter by status</label>
          <select id="flt" value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-md border border-slate-300 bg-white px-3 py-2"><option value="">All statuses</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
          <Button variant="outline" onClick={out}>Sign out</Button>
        </div>
      </div>
      {err && <p role="alert" className="mb-4 text-red-700">{err}</p>}
      <div className="overflow-x-auto rounded-xl border border-sc-line">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-sc-mist"><tr>{['When', 'Name', 'Contact', 'Lives in', 'Interest', 'City', 'Quote', 'Slot and message', 'Status'].map((h) => <th key={h} scope="col" className="p-3 font-semibold">{h}</th>)}</tr></thead>
          <tbody>{shown.map((l) => (
            <tr key={l.id} className="border-t border-sc-line align-top">
              <td className="p-3">{new Date(l.created_at).toLocaleString()}</td><td className="p-3">{l.name}</td>
              <td className="p-3">{l.email}<br />{l.phone}</td><td className="p-3">{l.country}</td><td className="p-3">{l.interest}</td><td className="p-3">{l.city}</td>
              <td className="p-3">{l.quote_monthly_usd ? `$${l.quote_monthly_usd}/mo` : '–'}</td>
              <td className="p-3"><b>{l.preferred_slot}</b><br />{l.message}</td>
              <td className="p-3"><label className="sr-only" htmlFor={`st-${l.id}`}>Status for {l.name}</label><select id={`st-${l.id}`} value={l.status} onChange={(e) => change(l.id, e.target.value)} className="rounded-md border border-slate-300 bg-white px-2 py-1">{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </Section>
  )
}
