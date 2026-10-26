'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { api, type LeadInput } from '@/lib/api'
import { HUBS, RESIDENCE, SITE, waLink } from '@/lib/config'
import { inr, inrToUsd } from '@/lib/pricing'
import { cn } from '@/lib/cn'

const INTERESTS = [
  { id: 'aegis', label: 'Aegis (Property Management)' },
  { id: 'sparsh', label: 'Sparsh (Elder Care)' },
  { id: 'both', label: 'Combined Bundle (Both)' },
] as const
const input = 'mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sc-slate placeholder:text-slate-400'

export function ContactForm() {
  const sp = useSearchParams()
  const qi = sp.get('interest'); const qc = sp.get('city'); const quoteInr = Number(sp.get('quote')) || null
  const [f, setF] = useState<LeadInput>({
    name: '', email: '', phone: '', country: '', interest: qi === 'aegis' || qi === 'sparsh' ? qi : 'both',
    city: HUBS.includes(qc as (typeof HUBS)[number]) ? (qc as string) : 'Hyderabad',
    preferred_slot: '', message: '', quote_monthly_usd: quoteInr ? inrToUsd(quoteInr) : null, consent: false, website: '',
  })
  const [state, setState] = useState({ busy: false, done: false, error: '' })
  const set = <K extends keyof LeadInput>(k: K, v: LeadInput[K]) => setF((p) => ({ ...p, [k]: v }))
  const interestLabel = f.interest === 'both' ? 'Aegis and Sparsh' : f.interest === 'aegis' ? 'Aegis' : 'Sparsh'
  const waText = `Hi Sustune Care, I am ${f.name || 'a prospective client'}${f.country ? ` in ${f.country}` : ''}. I am interested in ${interestLabel} in ${f.city}.${f.message ? ` ${f.message}` : ''}`

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setState({ busy: true, done: false, error: '' })
    try { await api.createLead(f); setState({ busy: false, done: true, error: '' }) }
    catch (err) { setState({ busy: false, done: false, error: err instanceof Error ? err.message : 'Something went wrong.' }) }
  }

  if (state.done) return (
    <div role="status" className="rounded-2xl border border-sc-emerald bg-emerald-50 p-8">
      <CheckCircle2 aria-hidden className="h-8 w-8 text-sc-emerald" />
      <h2 className="mt-3 font-display text-2xl font-bold text-sc-marine">Request received</h2>
      <p className="mt-2 text-slate-700">A care director will contact you within 24 hours, at a time that suits your time zone. Want a faster reply? Message us on WhatsApp now.</p>
      <Button external href={waLink(waText)} variant="secondary" className="mt-5"><MessageCircle aria-hidden className="h-4 w-4" />Continue on WhatsApp ({SITE.whatsappDisplay})</Button>
    </div>
  )

  return (
    <form onSubmit={submit} className="rounded-2xl border border-sc-line bg-white p-6 shadow-card sm:p-8">
      <h2 className="font-display text-2xl font-bold text-sc-marine">Enquiry Form</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <div><label htmlFor="name">Full name <span aria-hidden className="text-red-600">*</span></label><input id="name" required minLength={2} autoComplete="name" placeholder="Enter your full name" className={input} value={f.name} onChange={(e) => set('name', e.target.value)} /></div>
        <div><label htmlFor="email">Email address <span aria-hidden className="text-red-600">*</span></label><input id="email" required type="email" autoComplete="email" placeholder="your@email.com" className={input} value={f.email} onChange={(e) => set('email', e.target.value)} /></div>
        <div><label htmlFor="phone">Phone number <span aria-hidden className="text-red-600">*</span></label><input id="phone" required type="tel" autoComplete="tel" placeholder="+1 123 456 7890" className={input} value={f.phone} onChange={(e) => set('phone', e.target.value)} /></div>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="country">NRI location <span aria-hidden className="text-red-600">*</span></label>
          <select id="country" required className={input} value={f.country} onChange={(e) => set('country', e.target.value)}><option value="" disabled>Select your country</option>{RESIDENCE.map((c) => <option key={c}>{c}</option>)}</select>
          <label htmlFor="city" className="mt-5 block">Property or parents are in</label>
          <select id="city" className={input} value={f.city} onChange={(e) => set('city', e.target.value)}>{HUBS.map((c) => <option key={c}>{c}</option>)}</select>
        </div>
        <fieldset>
          <legend className="text-sm font-medium">I am interested in <span aria-hidden className="text-red-600">*</span></legend>
          <div className="mt-2 space-y-2.5">
            {INTERESTS.map((o) => (
              <label key={o.id} className={cn('flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5', f.interest === o.id ? 'border-sc-gold bg-sc-goldtint' : 'border-sc-line')}>
                <input type="radio" name="interest" value={o.id} checked={f.interest === o.id} onChange={() => set('interest', o.id)} className="h-4 w-4 accent-sc-marine" />{o.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_2fr]">
        <div><label htmlFor="slot">Best time to call (with time zone)</label><input id="slot" placeholder="Saturday 9 am PST" className={input} value={f.preferred_slot} onChange={(e) => set('preferred_slot', e.target.value)} /></div>
        <div><label htmlFor="msg">Message (optional)</label><textarea id="msg" rows={2} placeholder="Tell us more about your requirements..." className={input} value={f.message} onChange={(e) => set('message', e.target.value)} /></div>
      </div>

      {/* Honeypot: real visitors never see or fill this. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website', e.target.value)} /></label></div>

      {quoteInr && <p className="mt-4 text-sm text-slate-600">Your estimate of about <b>{inr(quoteInr)}{sp.get('interest') === 'aegis' || sp.get('interest') === 'sparsh' ? ' a month' : ''}</b> will be attached to this request.</p>}
      <label className="mt-5 flex items-start gap-3 text-sm text-slate-700">
        <input type="checkbox" required checked={f.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-1 h-5 w-5 accent-sc-marine" />
        <span>I agree that Sustune Care may contact me about this request and store these details for that purpose, as described in the <a href="/privacy" className="underline">privacy policy</a>.</span>
      </label>
      {state.error && <p role="alert" className="mt-4 font-medium text-red-700">{state.error}</p>}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit" disabled={state.busy} arrow>{state.busy ? 'Sending…' : 'Send Message'}</Button>
        <Button external href={waLink(waText)} variant="secondary"><MessageCircle aria-hidden className="h-4 w-4" />Chat on WhatsApp</Button>
      </div>
    </form>
  )
}
