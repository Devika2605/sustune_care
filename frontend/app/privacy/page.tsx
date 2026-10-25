import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { SITE } from '@/lib/config'

export const metadata: Metadata = { title: 'Privacy policy' }

export default function Privacy() {
  return (
    <Section>
      <article className="prose-sc mx-auto max-w-3xl space-y-4 text-slate-700">
        <h1 className="font-display text-3xl font-bold text-sc-marine">Privacy policy</h1>
        <p className="rounded-lg border border-sc-gold bg-sc-goldtint p-4 text-sm"><b>Draft for legal review.</b> Replace this text with a policy approved by your advisor before launch. It is written around India’s Digital Personal Data Protection Act, 2023.</p>
        <h2 className="pt-2 font-display text-xl font-semibold text-sc-marine">What we collect</h2>
        <p>The details you enter in our forms (name, email, phone, country, city and your message), and, once you are a client, the property and health information needed to provide the service.</p>
        <h2 className="pt-2 font-display text-xl font-semibold text-sc-marine">Why we use it</h2>
        <p>To respond to your request, provide the services you choose, and meet legal obligations. We do not sell personal data.</p>
        <h2 className="pt-2 font-display text-xl font-semibold text-sc-marine">Health information</h2>
        <p>We collect and share health information only with the consent of the person it concerns, and only with the people they have named.</p>
        <h2 className="pt-2 font-display text-xl font-semibold text-sc-marine">Your rights</h2>
        <p>You can ask to access, correct or delete your data, or withdraw consent, by writing to <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </article>
    </Section>
  )
}
