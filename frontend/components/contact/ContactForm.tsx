'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { api, type LeadInput } from '@/lib/api'
import { HUBS, RESIDENCE, SITE, waLink } from '@/lib/config'
import { cn } from '@/lib/cn'

const INTERESTS = [
  { id: 'aegis', label: 'Aegis', sub: 'Property stewardship' },
  { id: 'sparsh', label: 'Sparsh', sub: 'Parental care' },
  { id: 'both', label: 'Combined bundle', sub: 'Both, with a discount' },
] as const
const input = 'mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sc-slate focus-visible:border-sc-cerulean'

export function ContactForm() {
  const sp = useSearchParams()
  const qi = sp.get('interest')
  const qc = sp.get('city')
  const qq = Number(sp.get('quote')) || null
  const [f, setF] = useState<LeadInput>({
    name: '', email: '', phone: '', country: '', interest: qi === 'aegis' || qi === 'sparsh' ? qi : 'both',
    city: HUBS.includes(qc as (typeof HUBS)[number]) ? (qc as string) : 'Hyderabad',
    preferred_slot: '', message: '', quote_monthly_usd: qq, consent: false, website: '',
  })
  const [state, setState] = useState<{ busy: boolean; done: boolean; error: string }>({ busy: false, done: false, error: '' })
  const set = <K extends keyof LeadInput>(k: K, v: LeadInput[K]) => setF((p) => ({ ...p, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState({ busy: true, done: false, error: '' })
    try {
      await api.createLead(f)
      setState({ busy: false, done: true, error: '' })
    } catch (err) {
      setState({ busy: false, done: false, error: err instanceof Error ? err.message : 'Something went wrong.' })
    }
  }

  if (state.done) {
    const text = `Hi Sustune Care, I am ${f.name} in ${f.country}. I just requested a consultation about ${f.interest === 'both' ? 'Aegis and Sparsh' : f.interest} in ${f.city}.`
    return (
      <div role="status" className="rounded-xl border border-sc-emerald bg-emerald-50 p-8">
        <CheckCircle2 aria-hidden className="h-8 w-8 text-sc-emerald" />
        <h2 className="mt-3 font-display text-2xl font-bold text-sc-marine">Request received</h2>
        <p className="mt-2 text-slate-700">A care director will contact you within one business day, at a time that suits your time zone. Want a faster reply? Message us on WhatsApp now.</p>
        <Button external href={waLink(text)} variant="secondary" className="mt-5"><MessageCircle aria-hidden className="h-4 w-4" />Continue on WhatsApp ({SITE.whatsappDisplay})</Button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-6 rounded-xl border border-sc-line bg-sc-card p-6 shadow-card sm:p-8">
      <fieldset>
        <legend className="font-display font-semibold text-sc-marine">What do you need help with?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {INTERESTS.map((o) => (
            <label key={o.id} className={cn('cursor-pointer rounded-lg border bg-white p-3', f.interest === o.id ? 'border-sc-gold ring-1 ring-sc-gold' : 'border-sc-line')}>
              <input type="radio" name="interest" value={o.id} checked={f.interest === o.id} onChange={() => set('interest', o.id)} className="mr-2 accent-sc-cerulean" />
              <b className="text-sc-marine">{o.label}</b><span className="block pl-6 text-sm text-slate-600">{o.sub}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="name">Full name</label><input id="name" required minLength={2} autoComplete="name" className={input} value={f.name} onChange={(e) => set('name', e.target.value)} /></div>
        <div><label htmlFor="email">Email</label><input id="email" required type="email" autoComplete="email" className={input} value={f.email} onChange={(e) => set('email', e.target.value)} /></div>
        <div><label htmlFor="phone">Phone or WhatsApp, with country code</label><input id="phone" type="tel" autoComplete="tel" placeholder="+1 206 555 0100" className={input} value={f.phone} onChange={(e) => set('phone', e.target.value)} /></div>
        <div>
          <label htmlFor="country">Where do you live?</label>
          <select id="country" required className={input} value={f.country} onChange={(e) => set('country', e.target.value)}>
            <option value="" disabled>Select a country</option>
            {RESIDENCE.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="city">Where in India?</label>
          <select id="city" className={input} value={f.city} onChange={(e) => set('city', e.target.value)}>{HUBS.map((c) => <option key={c}>{c}</option>)}</select>
        </div>
        <div><label htmlFor="slot">Best time to call, with time zone</label><input id="slot" placeholder="Saturday 9 am PST" className={input} value={f.preferred_slot} onChange={(e) => set('preferred_slot', e.target.value)} /></div>
      </div>
      <div><label htmlFor="msg">Tell us about your property or parents (optional)</label><textarea id="msg" rows={4} className={input} value={f.message} onChange={(e) => set('message', e.target.value)} /></div>

      {/* Honeypot: real visitors never see or fill this. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website', e.target.value)} /></label></div>

      {f.quote_monthly_usd && <p className="text-sm text-slate-600">Your estimate of about <b>${f.quote_monthly_usd}/month</b> will be attached to this request.</p>}
      <label className="flex items-start gap-3 text-sm text-slate-700">
        <input type="checkbox" required checked={f.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-1 h-5 w-5 accent-sc-cerulean" />
        <span>I agree that Sustune Care may contact me about this request and store these details for that purpose, as described in the <a href="/privacy" className="underline">privacy policy</a>.</span>
      </label>
      {state.error && <p role="alert" className="font-medium text-red-700">{state.error}</p>}
      <Button type="submit" disabled={state.busy} className="w-full sm:w-auto">{state.busy ? 'Sending…' : 'Book my consultation'}</Button>
    </form>
  )
}
