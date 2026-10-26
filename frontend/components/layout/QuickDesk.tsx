import { MessageCircle } from 'lucide-react'
import { waLink } from '@/lib/config'

export function QuickDesk() {
  return (
    <a href={waLink('Hi Sustune Care, I would like to speak with an NRI care manager.')} target="_blank" rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-sc-gold bg-sc-marine p-3.5 sm:px-4 sm:py-3 text-sm font-semibold text-white shadow-lift hover:bg-sc-ink">
      <MessageCircle aria-hidden className="h-4 w-4 text-sc-gold" />
      <span className="sr-only sm:not-sr-only">Chat on WhatsApp</span>
    </a>
  )
}
