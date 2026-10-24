'use client'
import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { Section, Heading } from '@/components/ui/Section'
import { Tabs, TabPanel } from '@/components/ui/Tabs'
import { SampleBadge } from '@/components/ui/SampleBadge'
import { INSPECTION } from '@/lib/content'

export function InspectionViewer() {
  const [room, setRoom] = useState(INSPECTION.rooms[0].id)
  const r = INSPECTION.rooms.find((x) => x.id === room) ?? INSPECTION.rooms[0]
  return (
    <Section id="report">
      <Heading title="A sample quarterly inspection report" sub="Every quarter you receive a room-by-room report like this, with dated photos, in your portal." />
      <div className="overflow-hidden rounded-xl border border-sc-line shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-sc-marine p-6 text-white">
          <div className="flex items-center gap-4">
            <Image src="/brand/emblem.png" alt="" width={48} height={48} className="h-12 w-auto" />
            <div>
              <p className="font-display text-lg font-semibold">{INSPECTION.property}</p>
              <p className="text-sm text-slate-200">Inspected {INSPECTION.date} · Report {INSPECTION.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SampleBadge>Sample report</SampleBadge>
            <div className="text-right"><p className="font-display text-4xl font-extrabold text-sc-gold">{INSPECTION.score}<span className="text-lg text-slate-200">/100</span></p><p className="text-xs text-slate-200">Moisture {INSPECTION.moisture}</p></div>
          </div>
        </div>
        <div className="grid gap-0 md:grid-cols-[240px_1fr]">
          <div className="border-b border-sc-line bg-sc-mist p-4 md:border-b-0 md:border-r">
            <Tabs items={INSPECTION.rooms.map((x) => ({ id: x.id, label: `${x.name} · ${x.score}` }))} value={room} onChange={setRoom} label="Rooms" idPrefix="room" className="w-full flex-col !border-0 !bg-transparent" />
          </div>
          <TabPanel idPrefix="room" active={room} className="p-6">
            <h3 className="font-display text-xl font-semibold text-sc-marine">{r.name}, {r.score}/100</h3>
            <ul className="mt-4 divide-y divide-sc-line">
              {r.items.map(([k, v]) => {
                const flag = /loose|due/i.test(v)
                return (
                  <li key={k} className="flex items-start gap-3 py-3">
                    {flag ? <AlertCircle aria-label="Needs attention" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /> : <CheckCircle2 aria-label="Pass" className="mt-0.5 h-5 w-5 shrink-0 text-sc-emerald" />}
                    <span><b className="text-sc-slate">{k}</b><br /><span className="text-slate-600">{v}</span></span>
                  </li>
                )
              })}
            </ul>
            <p className="mt-4 rounded-lg bg-sc-goldtint p-4 text-sm text-sc-slate"><b>Steward’s note:</b> {r.note}</p>
          </TabPanel>
        </div>
      </div>
    </Section>
  )
}
