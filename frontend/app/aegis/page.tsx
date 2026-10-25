import type { Metadata } from 'next'
import { Section, Heading } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { ModuleGrid } from '@/components/ui/ModuleCard'
import { CtaBand } from '@/components/ui/CtaBand'
import { PricingTable } from '@/components/aegis/PricingTable'
import { InspectionViewer } from '@/components/aegis/InspectionViewer'
import { VideoPlayer } from '@/components/ui/VideoPlayer'
import { AEGIS_MODULES } from '@/lib/content'
import { AEGIS_VIDEO } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Aegis property stewardship',
  description: 'Tenant scouting, rental management, maintenance and interiors for NRI-owned property in Hyderabad, Bengaluru and Delhi NCR.',
}

export default function AegisPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sc-marine to-sc-deep text-white">
        <div className="mx-auto max-w-page px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.12] tracking-[-0.025em] sm:text-[3.25rem]">Your property in India, looked after like you live next door</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200">Aegis finds and verifies your tenant, collects rent into escrow, keeps the house in good repair, and sends you a photographed report every quarter.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#pricing" variant="gold">Compare plans</Button>
            <Button href="#report" variant="light">See a sample report</Button>
          </div>
        </div>
      </section>
      <Section id="modules">
        <Heading title="Four modules, one steward" sub="Use the ones you need. Each is delivered by the same named steward." />
        <ModuleGrid modules={AEGIS_MODULES} />
      </Section>
      <Section id="video" tone="mist">
        <div className="mx-auto max-w-3xl">
          <Heading title="See Aegis in action" sub="How we look after a property while you are abroad." />
          <VideoPlayer src={AEGIS_VIDEO} title="See Aegis in action" />
        </div>
      </Section>
      <PricingTable />
      <InspectionViewer />
      <CtaBand title="Have a property in India?" sub="Book a free call and we will walk through your property, your rent and what Aegis would cover." interest="aegis" waText="Hi Sustune Care, I have a property in India and would like to know about Aegis." />
    </>
  )
}