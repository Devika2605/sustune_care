import { Phone, MessageCircle } from 'lucide-react'
import { SITE, HUBS, waLink } from '@/lib/config'

export function TopBar() {
  return (
    <div className="bg-sc-marine text-xs text-slate-200">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2 sm:px-8">
        <p>Desks in {HUBS.join(', ')}</p>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-1.5 hover:text-white"><Phone aria-hidden className="h-3.5 w-3.5 text-sc-gold" />India {SITE.phoneDisplay}</a>
          <a href={waLink('Hi Sustune Care, I would like to speak with someone.')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white"><MessageCircle aria-hidden className="h-3.5 w-3.5 text-sc-gold" />WhatsApp {SITE.whatsappDisplay}</a>
        </p>
      </div>
    </div>
  )
}
