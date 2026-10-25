import { MessageCircle } from 'lucide-react'
import { Button } from './Button'
import { Section } from './Section'
import { waLink } from '@/lib/config'

export function CtaBand({ title, sub, interest, waText }: { title: string; sub: string; interest: 'aegis' | 'sparsh' | 'both'; waText: string }) {
  return (
    <Section tone="navy">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight">{title}</h2>
        <p className="mt-4 text-lg text-slate-200">{sub}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={`/contact?interest=${interest}`} variant="gold">Book a free consultation</Button>
          <Button href={waLink(waText)} external variant="light"><MessageCircle aria-hidden className="h-4 w-4" />Chat on WhatsApp</Button>
        </div>
      </div>
    </Section>
  )
}
