'use client'
import { useState } from 'react'
import { AlertCircle, CheckCircle2, FileText, ImageIcon, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Tabs, TabPanel } from '@/components/ui/Tabs'
import { SampleBadge } from '@/components/ui/SampleBadge'
import { INSPECTION, PREVIEW_DOCS, PREVIEW_TICKETS, REPORT_OVERVIEW } from '@/lib/content'
import { inr } from '@/lib/pricing'

const TABS = [{ id: 'overview', label: 'Overview' }, { id: 'photos', label: 'Photos' }, { id: 'maintenance', label: 'Maintenance' }, { id: 'documents', label: 'Documents' }] as const
const PHOTO_LABELS = ['Living room', 'Kitchen', 'Master suite', 'Terrace', 'Meter readings', 'Main door']
const good = <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-900">Good</span>

export function ReportCard() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('overview')
  const [full, setFull] = useState(false)
  const [room, setRoom] = useState(INSPECTION.rooms[0].id)
  const r = INSPECTION.rooms.find((x) => x.id === room) ?? INSPECTION.rooms[0]
  return (
    <div id="report" className="scroll-mt-24 rounded-2xl border border-sc-line bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-2"><h2 className="font-display text-2xl font-bold text-sc-marine">Sample Inspection Report</h2><SampleBadge>Sample</SampleBadge></div>
      <div className="mt-4 flex items-start justify-between rounded-lg border border-sc-line p-3">
        <div><p className="font-semibold text-sc-marine">Property Inspection Report</p><p className="text-xs text-slate-600">2 BHK Apartment, Hyderabad</p></div>{good}
      </div>
      <Tabs items={TABS} value={tab} onChange={setTab} label="Report sections" idPrefix="rep" variant="underline" className="mt-4" />
      <TabPanel idPrefix="rep" active={tab} className="mt-3 min-h-[250px]">
        {tab === 'overview' && (
          <ul className="divide-y divide-sc-line text-sm">
            {REPORT_OVERVIEW.map(([k]) => <li key={k} className="flex items-center justify-between py-2.5"><span className="flex items-center gap-2"><CheckCircle2 aria-hidden className="h-4 w-4 text-sc-emerald" />{k}</span>{good}</li>)}
            <li className="flex items-center justify-between py-2.5"><span>Next inspection</span><span className="rounded-full bg-sc-mist px-2.5 py-0.5 text-xs font-semibold">15 Jan 2027</span></li>
          </ul>
        )}
        {tab === 'photos' && (
          <ul className="grid grid-cols-3 gap-2">
            {PHOTO_LABELS.map((l) => <li key={l} className="flex aspect-[4/3] flex-col items-center justify-center rounded-lg bg-gradient-to-br from-sc-mist to-sc-line text-center text-[11px] text-slate-600"><ImageIcon aria-hidden className="mb-1 h-5 w-5" />{l}<span className="text-[10px]">sample photo</span></li>)}
          </ul>
        )}
        {tab === 'maintenance' && (
          <ul className="divide-y divide-sc-line text-sm">
            {PREVIEW_TICKETS.map((t) => <li key={t.id} className="flex items-start justify-between gap-3 py-2.5"><span className="flex gap-2"><Wrench aria-hidden className="mt-0.5 h-4 w-4 text-sc-bronze" /><span><b>{t.title}</b><br /><span className="text-xs text-slate-600">{t.id} · {inr(t.cost)}</span></span></span><span className="shrink-0 text-xs font-semibold text-sc-marine">{t.status}</span></li>)}
          </ul>
        )}
        {tab === 'documents' && (
          <ul className="divide-y divide-sc-line text-sm">
            {PREVIEW_DOCS.map(([n, t, d]) => <li key={n} className="flex items-center gap-3 py-2.5"><FileText aria-hidden className="h-4 w-4 shrink-0 text-sc-cerulean" /><span className="flex-1">{n}<br /><span className="text-xs text-slate-600">{t} · {d} · sample</span></span></li>)}
          </ul>
        )}
      </TabPanel>
      <Button variant="dark" arrow className="mt-3 w-full" onClick={() => setFull(true)}>View Full Report</Button>
      <Modal open={full} onClose={() => setFull(false)} title={`Inspection report ${INSPECTION.id}`} wide>
        <p className="text-sm text-slate-600">{INSPECTION.property} · inspected {INSPECTION.date} · overall score <b className="text-sc-marine">{INSPECTION.score}/100</b> · moisture {INSPECTION.moisture}. Sample data.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-[220px_1fr]">
          <Tabs items={INSPECTION.rooms.map((x) => ({ id: x.id, label: `${x.name} · ${x.score}` }))} value={room} onChange={setRoom} label="Rooms" idPrefix="room" className="!flex-col !rounded-xl" />
          <TabPanel idPrefix="room" active={room}>
            <h3 className="font-display text-xl font-bold text-sc-marine">{r.name}, {r.score}/100</h3>
            <ul className="mt-2 divide-y divide-sc-line text-sm">
              {r.items.map(([k, v]) => { const flag = /loose|due/i.test(v); return (
                <li key={k} className="flex items-start gap-3 py-2.5">{flag ? <AlertCircle aria-label="Needs attention" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /> : <CheckCircle2 aria-label="Pass" className="mt-0.5 h-5 w-5 shrink-0 text-sc-emerald" />}<span><b>{k}</b><br /><span className="text-slate-600">{v}</span></span></li>) })}
            </ul>
            <p className="mt-3 rounded-lg bg-sc-goldtint p-3 text-sm"><b>Steward’s note:</b> {r.note}</p>
          </TabPanel>
        </div>
      </Modal>
    </div>
  )
}
