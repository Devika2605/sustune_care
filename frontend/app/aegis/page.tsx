import type { Metadata } from 'next'
import Image from 'next/image'
import { ClipboardList, Globe2, Home, Wrench } from 'lucide-react'
import { Section, Heading } from '@/components/ui/Section'
import { ModuleGrid } from '@/components/ui/ModuleCard'
import { CtaBand } from '@/components/ui/CtaBand'
import { VideoPlayer } from '@/components/ui/VideoPlayer'
import { IconStrip, PageHero } from '@/components/ui/PageHero'
import { PlansTable } from '@/components/aegis/PlansTable'
import { ReportCard } from '@/components/aegis/ReportCard'
import { WhyAegis } from '@/components/aegis/WhyAegis'
import { AEGIS_MODULES } from '@/lib/content'
import { AEGIS_VIDEO } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Aegis property stewardship',
  description: 'Tenant scouting, rental management, maintenance and interiors for NRI-owned property in Hyderabad, Bengaluru and Delhi NCR.',
}

export default function AegisPage() {
  return (
    <>
      <PageHero tag="Aegis" title="Institutional Property Stewardship" sub="Professional management for your most valuable assets, so you can stay focused on what matters, no matter where you are." art={<Image src="/brand/aegis-hero.webp" alt="" width={1530} height={917} priority sizes="(max-width: 1280px) 44vw, 560px" className="h-auto w-full" />}>
        <IconStrip items={[[Home, 'Tenant Scouting & Verification'], [ClipboardList, 'Active Rental Management'], [Wrench, 'Maintenance & Turnkey Interiors'], [Globe2, 'Global Sourcing & Reporting']]} />
      </PageHero>
      <Section className="pt-6">
        <div className="grid items-start gap-6 lg:grid-cols-[1.4fr_1fr_0.8fr]">
          <PlansTable /><ReportCard /><WhyAegis />
        </div>
      </Section>
      <Section id="modules" tone="mist">
        <Heading title="Four modules, one steward" sub="Use the ones you need. Each is delivered by the same named steward." />
        <ModuleGrid modules={AEGIS_MODULES} />
      </Section>
      <Section id="video">
        <div className="mx-auto max-w-3xl">
          <Heading title="See Aegis in action" sub="How we look after a property while you are abroad." />
          <VideoPlayer src={AEGIS_VIDEO} title="See Aegis in action" ratio="tall" />
        </div>
      </Section>
      <CtaBand title="Have a property in India?" sub="Book a free call and we will walk through your property, your rent and what Aegis would cover." interest="aegis" waText="Hi Sustune Care, I have a property in India and would like to know about Aegis." />
    </>
  )
}