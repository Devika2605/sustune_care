'use client'
import { useState } from 'react'
import { Section, Heading } from '@/components/ui/Section'
import { Tabs, TabPanel } from '@/components/ui/Tabs'
import { ModuleGrid } from '@/components/ui/ModuleCard'
import { Button } from '@/components/ui/Button'
import { AEGIS_MODULES, SPARSH_PILLARS } from '@/lib/content'

const TABS = [{ id: 'aegis', label: 'Aegis (property)' }, { id: 'sparsh', label: 'Sparsh (parental care)' }] as const

export function ServiceMatrix() {
  const [tab, setTab] = useState<'aegis' | 'sparsh'>('aegis')
  const modules = tab === 'aegis' ? AEGIS_MODULES : SPARSH_PILLARS
  return (
    <Section tone="mist" id="services">
      <Heading title="Two services, one accountable team" sub="Take them separately, or together with a bundle discount." />
      <Tabs items={TABS} value={tab} onChange={setTab} label="Service division" idPrefix="svc" />
      <TabPanel idPrefix="svc" active={tab} className="mt-6">
        <ModuleGrid modules={modules} />
        <div className="mt-6">
          <Button href={tab === 'aegis' ? '/aegis' : '/sparsh'} variant="outline">{tab === 'aegis' ? 'Explore Aegis in detail' : 'Explore Sparsh in detail'}</Button>
        </div>
      </TabPanel>
    </Section>
  )
}
