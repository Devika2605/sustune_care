import { MessageCircle } from 'lucide-react'
import { Button } from './Button'
import { Section } from './Section'
import { waLink } from '@/lib/config'
import Image from 'next/image'
import { StarRule } from './Ornament'

export function CtaBand({ title, sub, interest, waText }: { title: string; sub: string; interest: 'aegis' | 'sparsh' | 'both'; waText: string }) {
  return (
    <Section tone="navy" className="relative overflow-hidden grain">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(212,175,55,.16),transparent)]" />
      <Image src="/brand/emblem-mark.png" alt="" width={184} height={256} aria-hidden className="pointer-events-none absolute -right-6 -bottom-10 hidden h-64 w-auto -rotate-6 opacity-[0.12] lg:block" />
      <div className="relative mx-auto max-w-2xl text-center">
        <StarRule className="mb-5 justify-center" />
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
        <p className="mt-4 text-lg text-slate-200">{sub}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={`/contact?interest=${interest}`} variant="gold" arrow>Book a free consultation</Button>
          <Button href={waLink(waText)} external variant="light"><MessageCircle aria-hidden className="h-4 w-4" />Chat on WhatsApp</Button>
        </div>
      </div>
    </Section>
  )
}