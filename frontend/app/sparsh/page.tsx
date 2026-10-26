import type { Metadata } from 'next'
import { Phone, CalendarPlus, ShoppingBag, Users } from 'lucide-react'
import { Section, Heading } from '@/components/ui/Section'
import { ModuleGrid } from '@/components/ui/ModuleCard'
import { CtaBand } from '@/components/ui/CtaBand'
import Image from 'next/image'
import { IconStrip, PageHero } from '@/components/ui/PageHero'
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
      <PageHero tag="Sparsh" title="Compassionate Care. Everyday Support." sub="A trusted presence for your loved ones back home. Person-centred care, professional support, and complete peace of mind for your family." art={<Image src="/brand/sparsh-hero.webp" alt="" width={1100} height={748} priority sizes="(max-width: 1024px) 0px, 540px" className="h-auto w-full" />}>
        <IconStrip items={[[Phone, '24/7 Emergency SOS'], [CalendarPlus, 'Doctor Escort & Appointments'], [ShoppingBag, 'Daily Errands & Daily Living Support'], [Users, 'Regular Companionship Visits']]} />
      </PageHero>
      <CareConfigurator />
      <Section id="pillars" tone="mist">
        <Heading title="Four ways Sparsh helps" sub="Each is delivered by the same companion, so your parents come to know and trust them." />
        <ModuleGrid modules={SPARSH_PILLARS} />
        <p className="mt-8 rounded-lg border border-sc-gold bg-sc-goldtint p-4 text-sm text-sc-slate"><b>In a life-threatening emergency, call 112 first.</b> Sparsh coordinates the response, the hospital and the family, but it does not replace the national emergency number.</p>
      </Section>
      <Story />
      <CtaBand title="Give your parents someone to rely on." sub="Book a free call. We start with a gentle assessment of their health, routine and preferences." interest="sparsh" waText="Hi Sustune Care, I would like to discuss care for my parents in India." />
    </>
  )
}
