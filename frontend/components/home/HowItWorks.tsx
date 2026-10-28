import { PhoneCall, UserCheck, Camera } from 'lucide-react'
import { Section, Heading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const STEPS = [
  [PhoneCall, 'Tell us what you need', 'A free call with a care director. Property, parents, or both. We tell you honestly whether we can help.'],
  [UserCheck, 'Meet your named team', 'Every client has a named steward and a named companion, so there is always someone to call.'],
  [Camera, 'See proof, not promises', 'Photos, itemised costs and reports land in your portal. Nothing is spent without your written approval.'],
] as const

export function HowItWorks() {
  return (
    <Section tone="white" className="relative overflow-hidden">
      <Heading eyebrow="How it works" title="Three steps from worry to calm." sub="No long onboarding. You talk to a person on day one." />
      <div className="relative">
        {/* The gold path that links the steps (desktop). */}
        <div aria-hidden className="gold-line absolute left-[16.6%] right-[16.6%] top-[34px] hidden h-px origin-left animate-[drawline_1.4s_ease-out_both] lg:block" />
        <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {STEPS.map(([Icon, t, d], i) => (
            <Reveal key={t} as="li" delay={i * 0.12} className="relative text-center">
              <span className="relative mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-full border border-sc-gold bg-white shadow-card">
                <Icon aria-hidden className="h-7 w-7 text-sc-marine" strokeWidth={1.5} />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-sc-marine font-display text-xs font-bold text-sc-gold">{i + 1}</span>
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-sc-marine">{t}</h3>
              <p className="mx-auto mt-2 max-w-xs text-slate-600">{d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  )
}