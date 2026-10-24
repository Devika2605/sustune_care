import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { ContactForm } from '@/components/contact/ContactForm'
import { SITE, waLink } from '@/lib/config'

export const metadata: Metadata = { title: 'Book a consultation', description: 'Tell us about your property or your parents. A Sustune Care director will call at a time that suits your time zone.' }

export default function ContactPage() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-sc-marine sm:text-4xl">Book a free consultation</h1>
          <p className="mb-8 mt-3 max-w-xl text-lg text-slate-600">Tell us where you live and what you need. We reply within one business day, at a time that works in your time zone.</p>
          <Suspense fallback={<p>Loading form…</p>}><ContactForm /></Suspense>
        </div>
        <aside className="space-y-5 self-start rounded-xl border border-sc-line bg-sc-mist p-6">
          <h2 className="font-display text-lg font-semibold text-sc-marine">Prefer to talk now?</h2>
          <p className="flex items-start gap-3"><Phone aria-hidden className="mt-1 h-5 w-5 text-sc-cerulean" /><span>India<br /><a className="font-semibold underline" href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></span></p>
          <p className="flex items-start gap-3"><MessageCircle aria-hidden className="mt-1 h-5 w-5 text-sc-cerulean" /><span>WhatsApp<br /><a className="font-semibold underline" href={waLink('Hi Sustune Care')} target="_blank" rel="noreferrer">{SITE.whatsappDisplay}</a></span></p>
          <p className="flex items-start gap-3"><Mail aria-hidden className="mt-1 h-5 w-5 text-sc-cerulean" /><span>Email<br /><a className="font-semibold underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></span></p>
          <p className="flex items-start gap-3"><MapPin aria-hidden className="mt-1 h-5 w-5 text-sc-cerulean" /><span>Based in<br /><b>{SITE.location}</b></span></p>
        </aside>
      </div>
    </Section>
  )
}
