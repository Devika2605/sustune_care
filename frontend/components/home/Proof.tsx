import { ShieldCheck } from 'lucide-react'
import { Section, Heading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { SampleBadge } from '@/components/ui/SampleBadge'
import { VideoPlayer } from '@/components/ui/VideoPlayer'
import { COMMITMENTS, SAMPLE_METRICS, SAMPLE_TESTIMONIALS } from '@/lib/content'
import { INTRO_VIDEO, SHOW_SAMPLE_PROOF } from '@/lib/config'

export function Proof() {
  return (
    <Section tone="mist">
      <Heading title="What you can hold us to" sub="Four commitments that do not depend on numbers we have not earned yet." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {COMMITMENTS.map(([t, d]) => (
          <Card key={t}><ShieldCheck aria-hidden className="h-6 w-6 text-sc-emerald" /><h3 className="mt-3 font-display text-lg font-semibold text-sc-marine">{t}</h3><p className="mt-2 text-sm text-slate-600">{d}</p></Card>
        ))}
      </div>

      {INTRO_VIDEO && <div className="mx-auto mt-14 max-w-3xl"><VideoPlayer src={INTRO_VIDEO} title="Meet Sustune Care" caption="An introduction to Sustune Care" /></div>}

      {SHOW_SAMPLE_PROOF && (
        <div className="mt-14">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl font-bold text-sc-marine">Trusted across time zones</h3>
            <SampleBadge>Illustrative sample. Replace with real client feedback before launch.</SampleBadge>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SAMPLE_METRICS.map(([n, l]) => (
              <div key={n} className="rounded-xl border border-sc-line bg-white p-5"><dt className="text-sm text-slate-600">{l}</dt><dd className="mt-1 font-display text-2xl font-bold text-sc-marine">{n}</dd></div>
            ))}
          </dl>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {SAMPLE_TESTIMONIALS.map((t) => (
              <Card key={t.quote}><p className="text-sc-slate">“{t.quote}”</p><p className="mt-4 text-sm font-semibold text-sc-marine">{t.who}</p><p className="text-sm text-slate-600">{t.where} · {t.tag}</p></Card>
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}
