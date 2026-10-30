import { MessageCircle } from 'lucide-react'
import { waLink } from '@/lib/config'

export function QuickDesk() {
  return (
    <a href={waLink('Hi Sustune Care, I would like to speak with an NRI care manager.')} target="_blank" rel="noreferrer"
      className="fixed bottom-[24px] right-[24px] z-50 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-[#0B1B3D]/95 px-4 py-2.5 text-[14px] font-medium text-white shadow-lift backdrop-blur hover:bg-[#10264F] transition-all">
      <MessageCircle aria-hidden className="h-4 w-4 text-emerald-400" />
      <span>Chat on WhatsApp</span>
    </a>
  )
}
