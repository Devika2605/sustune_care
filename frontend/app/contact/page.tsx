import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Phone, Mail, MessageCircle, Globe, MapPin } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { PageHero } from '@/components/ui/PageHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { OFFICES, SITE, waLink } from '@/lib/config'

export const metadata: Metadata = { title: 'Contact', description: 'Tell us about your property or your parents. A Sustune Care director will respond within 24 hours, at a time that suits your time zone.' }

export default function ContactPage() {
  return (
    <>
      <PageHero tag="Get in touch" title="Let’s Start Your Peace of Mind Journey" sub="Tell us about your needs and we’ll get back to you within 24 hours." className="[&>div]:pb-2" />
      <Section className="pt-4">
        <div className="grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
          <Suspense fallback={<p>Loading form…</p>}><ContactForm /></Suspense>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-sc-line bg-white p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-sc-marine">Our Offices</h2>
              <ul className="mt-4 space-y-4">{OFFICES.map((o) => <li key={o.city} className="flex gap-3"><MapPin aria-hidden className="mt-1 h-5 w-5 shrink-0 text-sc-bronze" /><span><b className="block text-sc-marine">{o.city}</b><span className="text-sm text-slate-600">{o.line1}<br />{o.line2}</span></span></li>)}</ul>
            </div>
            <div className="rounded-2xl border border-sc-line bg-white p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-sc-marine">Quick Contact</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3"><Phone aria-hidden className="h-4 w-4 text-sc-bronze" /><a className="hover:underline" href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></li>
                <li className="flex items-center gap-3"><MessageCircle aria-hidden className="h-4 w-4 text-sc-bronze" /><a className="hover:underline" href={waLink('Hi Sustune Care')} target="_blank" rel="noreferrer">{SITE.whatsappDisplay}</a></li>
                <li className="flex items-center gap-3"><Mail aria-hidden className="h-4 w-4 text-sc-bronze" /><a className="hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
                <li className="flex items-center gap-3"><Globe aria-hidden className="h-4 w-4 text-sc-bronze" /><a className="hover:underline" href={`https://${SITE.web}`}>{SITE.web}</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
