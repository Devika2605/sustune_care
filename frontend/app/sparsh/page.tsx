import type { Metadata } from 'next'
import { Section, Heading } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { ModuleGrid } from '@/components/ui/ModuleCard'
import { CtaBand } from '@/components/ui/CtaBand'
import { CareConfigurator } from '@/components/sparsh/CareConfigurator'
import { Story } from '@/components/sparsh/Story'
import { SPARSH_PILLARS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Sparsh parental care',
  description: '24/7 emergency SOS, doctor escorts, daily errands and regular companionship for your parents in Hyderabad, Bengaluru and Delhi NCR.',
}

export default function SparshPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sc-marine to-sc-deep text-white">
        <div className="mx-auto max-w-page px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.12] tracking-[-0.025em] sm:text-[3.25rem]">A caring presence for your parents, while you are far away</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200">Sparsh pairs your parents with a named, verified care companion who handles emergencies, hospital visits, errands and company, and keeps you informed.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#plan" variant="gold">Build a care plan</Button>
            <Button href="#story" variant="light">See a typical day</Button>
          </div>
        </div>
      </section>
      <Section id="pillars">
        <Heading title="Four ways Sparsh helps" sub="Each is delivered by the same companion, so your parents come to know and trust them." />
        <ModuleGrid modules={SPARSH_PILLARS} />
        <p className="mt-8 rounded-lg border border-sc-gold bg-sc-goldtint p-4 text-sm text-sc-slate">
          <b>In a life-threatening emergency, call 112 first.</b> Sparsh coordinates the response, the hospital and the family, but it does not replace the national emergency number.
        </p>
      </Section>
      <CareConfigurator />
      <Story />
      <CtaBand title="Give your parents someone to rely on." sub="Book a free call. We start with a gentle assessment of their health, routine and preferences." interest="sparsh" waText="Hi Sustune Care, I would like to discuss care for my parents in India." />
    </>
  )
}
