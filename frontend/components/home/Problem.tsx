import { X, Check } from 'lucide-react'
import { Section, Heading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ANXIETY_TODAY, ANXIETY_WITH } from '@/lib/content'

export function Problem() {
  return (
    <Section>
      <Heading title="The anxiety of distance, and what changes" sub="Most families cope with favours, phone calls and guesswork. It works until it does not. Sustune Care replaces that with a team that is accountable to you." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-red-200 bg-red-50/60">
          <h3 className="font-display text-xl font-semibold text-sc-marine">How it works today</h3>
          <ul className="mt-5 space-y-4">
            {ANXIETY_TODAY.map(([t, d]) => (
              <li key={t} className="flex gap-3"><X aria-hidden className="mt-1 h-5 w-5 shrink-0 text-red-700" /><span><b className="text-sc-slate">{t}</b><br /><span className="text-slate-600">{d}</span></span></li>
            ))}
          </ul>
        </Card>
        <Card dark>
          <h3 className="font-display text-xl font-semibold text-white">With Sustune Care</h3>
          <ul className="mt-5 space-y-4">
            {ANXIETY_WITH.map(([t, d]) => (
              <li key={t} className="flex gap-3"><Check aria-hidden className="mt-1 h-5 w-5 shrink-0 text-sc-gold" /><span><b className="text-white">{t}</b><br /><span className="text-slate-200">{d}</span></span></li>
            ))}
          </ul>
          <Button href="/portal-preview" variant="gold" className="mt-6">See the client portal</Button>
        </Card>
      </div>
    </Section>
  )
}
