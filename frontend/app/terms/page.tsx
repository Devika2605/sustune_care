import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { SITE } from '@/lib/config'

export const metadata: Metadata = { title: 'Terms of service' }

export default function Terms() {
  return (
    <Section>
      <article className="mx-auto max-w-3xl space-y-4 text-slate-700">
        <h1 className="font-display text-3xl font-bold text-sc-marine">Terms of service</h1>
        <p className="rounded-lg border border-sc-gold bg-sc-goldtint p-4 text-sm"><b>Draft for legal review.</b> Replace with terms drafted by your advisor, including the service agreements for Aegis and Sparsh.</p>
        <h2 className="pt-2 font-display text-xl font-semibold text-sc-marine">Using this website</h2>
        <p>The information on this site is general and the prices shown are indicative. A written service agreement, signed after your consultation, sets out the actual services and fees.</p>
        <h2 className="pt-2 font-display text-xl font-semibold text-sc-marine">Emergencies</h2>
        <p>Sparsh coordinates emergency response but does not replace the national emergency number (112) or a doctor’s advice.</p>
        <h2 className="pt-2 font-display text-xl font-semibold text-sc-marine">Contact</h2>
        <p>Questions about these terms: <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </article>
    </Section>
  )
}
