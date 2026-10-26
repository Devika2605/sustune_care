'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Building2, CalendarPlus, ClipboardCheck, FileText, FolderOpen, HeartPulse, Home, IndianRupee, LayoutDashboard, Pill, Plus, Stethoscope, Ticket, UserCheck, Users, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Tabs } from '@/components/ui/Tabs'
import { Button } from '@/components/ui/Button'
import { SampleBadge } from '@/components/ui/SampleBadge'
import { Modal } from '@/components/ui/Modal'
import { HUBS } from '@/lib/config'
import { PREVIEW_ACTIVITY, PREVIEW_DOCS, PREVIEW_PARENT, PREVIEW_PROPERTIES, PREVIEW_REPORTS, PREVIEW_TICKETS, type PreviewProperty, type Ticket as TicketT } from '@/lib/content'
import { inr } from '@/lib/pricing'
import { cn } from '@/lib/cn'

type Tab = 'estate' | 'health'
type Act = readonly [string, string, string, string]
const TABS = [{ id: 'estate', label: 'Real Estate Portfolio' }, { id: 'health', label: 'Parent Health Hub' }] as const
const ESTATE_NAV: [string, string, LucideIcon][] = [['dashboard', 'Dashboard', LayoutDashboard], ['properties', 'Properties', Building2], ['tenants', 'Tenants', Users], ['maintenance', 'Maintenance', Wrench], ['documents', 'Documents', FolderOpen], ['reports', 'Reports', FileText]]
const HEALTH_NAV: [string, string, LucideIcon][] = [['dashboard', 'Dashboard', LayoutDashboard], ['vitals', 'Vitals', HeartPulse], ['appointments', 'Appointments', Stethoscope], ['medication', 'Medication', Pill], ['team', 'Care team', UserCheck]]
const ICON: Record<string, LucideIcon> = { rent: IndianRupee, wrench: Wrench, check: ClipboardCheck, user: UserCheck, heart: HeartPulse, pill: Pill, home: Home }
const input = 'mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5'
const pill = (s: string) => cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', /Occupied|Completed|Paid|Delivered|Scheduled/.test(s) ? 'bg-emerald-100 text-emerald-900' : /Vacant|Awaiting|Open/.test(s) ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700')

function Panel({ title, action, children, className }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return <section className={cn('rounded-2xl border border-sc-line bg-white p-5 shadow-card', className)}><div className="mb-3 flex items-center justify-between gap-3"><h2 className="font-display text-lg font-bold text-sc-marine">{title}</h2>{action}</div>{children}</section>
}
const Tile = ({ v, l }: { v: string; l: string }) => <div className="rounded-xl border border-sc-line bg-white p-4 shadow-card"><p className="font-display text-2xl font-bold text-sc-marine">{v}</p><p className="text-sm text-slate-600">{l}</p></div>

function Activity({ items, all, onAll }: { items: readonly Act[]; all: boolean; onAll: () => void }) {
  const shown = all ? items : items.slice(0, 4)
  return (
    <Panel title="Recent Activity" action={items.length > 4 ? <button type="button" onClick={onAll} className="text-sm font-semibold text-sc-cerulean hover:underline">{all ? 'Show less' : 'View All'}</button> : null}>
      <ul className="space-y-3">
        {shown.map(([t, s, w, ic], i) => { const I = ICON[ic] ?? ClipboardCheck; return (
          <li key={`${t}${i}`} className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sc-mist"><I aria-hidden className="h-4 w-4 text-sc-marine" /></span><span className="flex-1 text-sm"><b className="block text-sc-marine">{t}</b><span className="text-slate-600">{s}</span></span><span className="shrink-0 text-xs text-slate-500">{w}</span></li>) })}
      </ul>
    </Panel>
  )
}
function Quick({ actions }: { actions: [string, LucideIcon, () => void][] }) {
  return (
    <Panel title="Quick Actions">
      <div className="grid grid-cols-3 gap-2">{actions.map(([l, I, fn]) => <button key={l} type="button" onClick={fn} className="flex flex-col items-center gap-2 rounded-xl border border-sc-line p-3 text-center text-xs font-medium text-sc-marine hover:border-sc-gold hover:bg-sc-goldtint"><I aria-hidden className="h-6 w-6 text-sc-bronze" />{l}</button>)}</div>
    </Panel>
  )
}

export function PortalPreview() {
  const [tab, setTab] = useState<Tab>('estate')
  const [view, setView] = useState('dashboard')
  const [props, setProps] = useState<PreviewProperty[]>(PREVIEW_PROPERTIES)
  const [tickets, setTickets] = useState<TicketT[]>(PREVIEW_TICKETS)
  const [estAct, setEstAct] = useState<Act[]>([...PREVIEW_ACTIVITY])
  const [healthAct, setHealthAct] = useState<Act[]>([...PREVIEW_PARENT.activity])
  const [appts, setAppts] = useState(PREVIEW_PARENT.appts)
  const [allAct, setAllAct] = useState(false)
  const [modal, setModal] = useState<null | 'prop' | 'ticket' | 'appt' | 'visit'>(null)
  const [msg, setMsg] = useState('')

  const occupied = props.filter((p) => p.status === 'Occupied')
  const income = occupied.reduce((s, p) => s + p.rent, 0)
  const occupancy = props.length ? Math.round((occupied.length / props.length) * 100) : 0
  const nav = tab === 'estate' ? ESTATE_NAV : HEALTH_NAV
  const changeTab = (t: Tab) => { setTab(t); setView('dashboard'); setAllAct(false); setMsg('') }
  const done = (text: string) => { setModal(null); setMsg(text) }

  function addProp(f: FormData) {
    const p: PreviewProperty = { id: Date.now(), name: String(f.get('name')), city: String(f.get('city')), rent: Number(f.get('rent')) || 0, status: 'Vacant', tenant: 'Vacant, scouting to begin', lease: 'n/a' }
    setProps((x) => [...x, p]); setEstAct((a) => [['Property added', `${p.name}, ${p.city}`, 'Just now', 'home'], ...a]); done('Property added to the demo. Nothing is saved.')
  }
  function addTicket(f: FormData) {
    const t: TicketT = { id: `TK-${900 + tickets.length + 12}`, title: String(f.get('title')), property: String(f.get('property')), status: 'Open', cost: 0 }
    setTickets((x) => [t, ...x]); setEstAct((a) => [['Maintenance ticket raised', t.title, 'Just now', 'wrench'], ...a]); done('Ticket raised in the demo. Nothing is saved.')
  }
  function addAppt(f: FormData) {
    const a = { id: Date.now(), doctor: String(f.get('doctor')), place: String(f.get('place')), when: String(f.get('when')) || 'Date to be confirmed', status: 'Scheduled' }
    setAppts((x) => [a, ...x]); setHealthAct((h) => [['Appointment booked', a.doctor, 'Just now', 'check'], ...h]); done('Appointment added to the demo. Nothing is saved.')
  }
  function addVisit(f: FormData) {
    setHealthAct((h) => [['Visit requested', String(f.get('kind')), 'Just now', 'user'], ...h]); done('Visit requested in the demo. Nothing is saved.')
  }

  const estateQuick: [string, LucideIcon, () => void][] = [['Add Property', Home, () => setModal('prop')], ['Raise Ticket', Ticket, () => setModal('ticket')], ['View Reports', FileText, () => setView('reports')]]
  const healthQuick: [string, LucideIcon, () => void][] = [['Book Appointment', CalendarPlus, () => setModal('appt')], ['Request Visit', UserCheck, () => setModal('visit')], ['View Vitals', HeartPulse, () => setView('vitals')]]
  const pa = PREVIEW_PARENT

  const PropCards = () => (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {props.map((p) => (
        <li key={p.id} className="overflow-hidden rounded-xl border border-sc-line bg-white shadow-card">
          <div className="flex h-24 items-center justify-center bg-gradient-to-br from-[#DCE7F8] to-[#BFD1EE]"><Building2 aria-hidden className="h-10 w-10 text-sc-marine/60" strokeWidth={1.2} /></div>
          <div className="p-4"><p className="font-semibold text-sc-marine">{p.name}</p><p className="text-sm text-slate-600">{p.city}</p><p className="mt-1 text-sm font-semibold">{inr(p.rent)}/month</p><span className={cn(pill(p.status), 'mt-2 inline-block')}>{p.status}</span></div>
        </li>
      ))}
    </ul>
  )

  return (
    <Section tone="white" className="pb-20">
      <div className="mb-8 grid items-center gap-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight text-sc-marine sm:text-5xl">Your World Connected in One Secure Portal</h1>
          <p className="mt-3 text-lg text-slate-600">Real-time updates. Complete transparency. Total peace of mind.</p>
          <div className="mt-5"><SampleBadge>Demo with sample data. Nothing you enter is saved.</SampleBadge></div>
        </div>
        <Image src="/brand/portal-laptop.webp" alt="" width={1268} height={722} priority sizes="(max-width: 1024px) 0px, 560px" className="hidden h-auto w-full max-w-[560px] justify-self-end drop-shadow-[0_24px_30px_rgba(11,27,61,0.22)] lg:block" />
      </div>
      <Tabs items={TABS} value={tab} onChange={changeTab} label="Portal sections" idPrefix="ptab" />
      <div role="tabpanel" id="ptab-panel" aria-labelledby={`ptab-${tab}`} className="mt-6 grid gap-5 rounded-3xl border border-sc-line bg-sc-canvas p-4 shadow-card md:grid-cols-[210px_1fr] sm:p-6">
        <nav aria-label="Portal menu" className="rounded-2xl bg-white p-3 shadow-card md:self-start">
          <ul className="flex gap-1 overflow-x-auto md:flex-col">
            {nav.map(([id, label, I]) => (
              <li key={id}><button type="button" onClick={() => { setView(id); setMsg('') }} aria-current={view === id ? 'page' : undefined} className={cn('flex w-full items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium', view === id ? 'bg-sc-marine text-white' : 'text-slate-700 hover:bg-sc-mist')}><I aria-hidden className="h-4 w-4" />{label}</button></li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0">
          {msg && <p role="status" className="mb-4 rounded-lg border border-sc-emerald bg-emerald-50 p-3 text-sm text-emerald-900">{msg}</p>}
          {tab === 'estate' && view === 'dashboard' && (
            <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
              <div className="space-y-5">
                <Panel title="Properties Overview" action={<Button onClick={() => setModal('prop')} className="px-4 py-2"><Plus aria-hidden className="h-4 w-4" />Add Property</Button>}>
                  <div className="grid gap-3 sm:grid-cols-3"><Tile v={String(props.length)} l="Total Properties" /><Tile v={inr(income)} l="Monthly Rental Income" /><Tile v={`${occupancy}%`} l="Occupancy Rate" /></div>
                  <div className="mt-4"><PropCards /></div>
                </Panel>
              </div>
              <div className="space-y-5"><Activity items={estAct} all={allAct} onAll={() => setAllAct(!allAct)} /><Quick actions={estateQuick} /></div>
            </div>
          )}
          {tab === 'estate' && view === 'properties' && <Panel title="Properties" action={<Button onClick={() => setModal('prop')} className="px-4 py-2"><Plus aria-hidden className="h-4 w-4" />Add Property</Button>}><PropCards /></Panel>}
          {tab === 'estate' && view === 'tenants' && (
            <Panel title="Tenants"><div className="overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><thead><tr className="text-slate-600"><th scope="col" className="py-2 font-medium">Property</th><th scope="col" className="font-medium">Tenant</th><th scope="col" className="font-medium">Lease</th><th scope="col" className="font-medium">Rent</th></tr></thead>
              <tbody>{props.map((p) => <tr key={p.id} className="border-t border-sc-line"><th scope="row" className="py-3 font-normal">{p.name}, {p.city}</th><td>{p.tenant}</td><td>{p.lease}</td><td>{inr(p.rent)}</td></tr>)}</tbody></table></div></Panel>
          )}
          {tab === 'estate' && view === 'maintenance' && (
            <Panel title="Maintenance tickets" action={<Button onClick={() => setModal('ticket')} className="px-4 py-2"><Ticket aria-hidden className="h-4 w-4" />Raise Ticket</Button>}>
              <ul className="divide-y divide-sc-line">{tickets.map((t) => <li key={t.id} className="flex flex-wrap items-start justify-between gap-3 py-3 text-sm"><span><b className="text-sc-marine">{t.title}</b><br /><span className="text-slate-600">{t.id} · {t.property}{t.cost ? ` · ${inr(t.cost)}` : ''}</span></span><span className={pill(t.status)}>{t.status}</span></li>)}</ul>
            </Panel>
          )}
          {tab === 'estate' && view === 'documents' && <Panel title="Documents"><ul className="divide-y divide-sc-line text-sm">{PREVIEW_DOCS.map(([n, t, d]) => <li key={n} className="flex items-center gap-3 py-3"><FileText aria-hidden className="h-5 w-5 text-sc-cerulean" /><span className="flex-1"><b>{n}</b><br /><span className="text-slate-600">{t} · {d}</span></span><span className="text-xs text-slate-500">sample</span></li>)}</ul></Panel>}
          {tab === 'estate' && view === 'reports' && <Panel title="Reports"><ul className="divide-y divide-sc-line text-sm">{PREVIEW_REPORTS.map(([n, f]) => <li key={n} className="flex items-center justify-between gap-3 py-3"><span><b>{n}</b><br /><span className="text-slate-600">{f}</span></span><span className="text-xs text-slate-500">sample, not downloadable</span></li>)}</ul></Panel>}

          {tab === 'health' && view === 'dashboard' && (
            <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
              <div className="space-y-5">
                <Panel title={pa.name} action={<span className="text-sm text-slate-600">{pa.city} · Companion: {pa.companion}</span>}>
                  <div className="grid gap-3 sm:grid-cols-3"><Tile v={pa.vitals[0][1]} l="Latest blood pressure" /><Tile v={`${pa.vitals[0][2]} bpm`} l="Pulse" /><Tile v={`${pa.vitals[0][3]}%`} l="Oxygen (SpO₂)" /></div>
                </Panel>
                <Panel title="Doctor notes"><ul className="space-y-3 text-sm">{pa.notes.map(([t, n]) => <li key={t}><b className="text-sc-marine">{t}</b><br /><span className="text-slate-600">{n}</span></li>)}</ul></Panel>
                <Panel title="Medication delivery"><ul className="divide-y divide-sc-line text-sm">{pa.meds.map(([m, a, b]) => <li key={m} className="flex flex-wrap justify-between gap-2 py-2.5"><b>{m}</b><span className="text-slate-600">{a} · {b}</span></li>)}</ul></Panel>
              </div>
              <div className="space-y-5"><Activity items={healthAct} all={allAct} onAll={() => setAllAct(!allAct)} /><Quick actions={healthQuick} /></div>
            </div>
          )}
          {tab === 'health' && view === 'vitals' && <Panel title="Vitals history"><div className="overflow-x-auto"><table className="w-full min-w-[420px] text-left text-sm"><caption className="sr-only">Recent vitals readings</caption><thead><tr className="text-slate-600"><th scope="col" className="py-2 font-medium">Date</th><th scope="col" className="font-medium">BP</th><th scope="col" className="font-medium">Pulse</th><th scope="col" className="font-medium">SpO₂</th><th scope="col" className="font-medium">Sugar</th></tr></thead><tbody>{pa.vitals.map(([d, bp, pu, sp, su]) => <tr key={d} className="border-t border-sc-line"><th scope="row" className="py-3 font-normal">{d}</th><td>{bp}</td><td>{pu}</td><td>{sp}%</td><td>{su}</td></tr>)}</tbody></table></div></Panel>}
          {tab === 'health' && view === 'appointments' && <Panel title="Appointments" action={<Button onClick={() => setModal('appt')} className="px-4 py-2"><CalendarPlus aria-hidden className="h-4 w-4" />Book</Button>}><ul className="divide-y divide-sc-line text-sm">{appts.map((a) => <li key={a.id} className="flex flex-wrap items-start justify-between gap-3 py-3"><span><b className="text-sc-marine">{a.doctor}</b>, {a.place}<br /><span className="text-slate-600">{a.when}</span></span><span className={pill(a.status)}>{a.status}</span></li>)}</ul></Panel>}
          {tab === 'health' && view === 'medication' && <Panel title="Medication delivery"><ul className="divide-y divide-sc-line text-sm">{pa.meds.map(([m, a, b]) => <li key={m} className="flex flex-wrap justify-between gap-2 py-3"><b>{m}</b><span className="text-slate-600">{a} · {b}</span></li>)}</ul></Panel>}
          {tab === 'health' && view === 'team' && <Panel title="Care team"><p className="text-sm"><b className="text-sc-marine">{pa.companion}</b>, your parent’s named companion. Reachable on WhatsApp during visiting hours, with a 24/7 coordinator behind them.</p></Panel>}
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3"><Button href="/contact?interest=both" arrow>Book a consultation</Button><Button href="/login" variant="outline">Client login</Button></div>

      <Modal open={modal === 'prop'} onClose={() => setModal(null)} title="Add property">
        <form onSubmit={(e) => { e.preventDefault(); addProp(new FormData(e.currentTarget)) }} className="space-y-4">
          <div><label htmlFor="pn">Property name</label><input id="pn" name="name" required defaultValue="2 BHK Apartment" className={input} /></div>
          <div><label htmlFor="pc">City</label><select id="pc" name="city" className={input}>{HUBS.map((h) => <option key={h}>{h}</option>)}</select></div>
          <div><label htmlFor="pr">Expected monthly rent (₹)</label><input id="pr" name="rent" type="number" min={0} required defaultValue={35000} className={input} /></div>
          <Button type="submit" className="w-full">Add property</Button>
        </form>
      </Modal>
      <Modal open={modal === 'ticket'} onClose={() => setModal(null)} title="Raise a maintenance ticket">
        <form onSubmit={(e) => { e.preventDefault(); addTicket(new FormData(e.currentTarget)) }} className="space-y-4">
          <div><label htmlFor="tp">Property</label><select id="tp" name="property" className={input}>{props.map((p) => <option key={p.id}>{p.name}, {p.city}</option>)}</select></div>
          <div><label htmlFor="tt">What needs attention?</label><input id="tt" name="title" required placeholder="Leaking tap in kitchen" className={input} /></div>
          <Button type="submit" className="w-full">Raise ticket</Button>
        </form>
      </Modal>
      <Modal open={modal === 'appt'} onClose={() => setModal(null)} title="Book an appointment">
        <form onSubmit={(e) => { e.preventDefault(); addAppt(new FormData(e.currentTarget)) }} className="space-y-4">
          <div><label htmlFor="ad">Doctor or department</label><input id="ad" name="doctor" required placeholder="Cardiologist" className={input} /></div>
          <div><label htmlFor="ah">Hospital</label><input id="ah" name="place" required placeholder="Preferred hospital" className={input} /></div>
          <div><label htmlFor="aw">Preferred date and time</label><input id="aw" name="when" placeholder="Next Saturday morning" className={input} /></div>
          <Button type="submit" className="w-full">Book appointment</Button>
        </form>
      </Modal>
      <Modal open={modal === 'visit'} onClose={() => setModal(null)} title="Request a visit">
        <form onSubmit={(e) => { e.preventDefault(); addVisit(new FormData(e.currentTarget)) }} className="space-y-4">
          <div><label htmlFor="vk">Type of visit</label><select id="vk" name="kind" className={input}><option>Companionship visit</option><option>Errand or pharmacy run</option><option>Extra vitals check</option></select></div>
          <Button type="submit" className="w-full">Request visit</Button>
        </form>
      </Modal>
    </Section>
  )
}
