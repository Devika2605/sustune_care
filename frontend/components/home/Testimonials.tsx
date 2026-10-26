'use client'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { SampleBadge } from '@/components/ui/SampleBadge'
import { Stars } from '@/components/ui/Art'
import { COMMITMENTS, SAMPLE_TESTIMONIALS } from '@/lib/content'
import { SHOW_SAMPLE_PROOF } from '@/lib/config'

export function Testimonials() {
  const rail = useRef<HTMLUListElement>(null)
  const scroll = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * (rail.current.clientWidth * 0.8), behavior: 'smooth' })
  return (
    <>
      {SHOW_SAMPLE_PROOF && (
        <Section tone="white" className="pt-2">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_2fr]">
            <div>
              <h2 className="font-display text-3xl font-bold text-sc-marine">Trusted by Global Indians</h2>
              <p className="mt-2 text-slate-600">Real stories. Real peace of mind.</p>
              <div className="mt-4"><SampleBadge>Sample testimonials. Replace with real client feedback.</SampleBadge></div>
              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => scroll(-1)} aria-label="Previous testimonials" className="flex h-10 w-10 items-center justify-center rounded-full border border-sc-line bg-white hover:bg-sc-mist"><ChevronLeft aria-hidden className="h-5 w-5" /></button>
                <button type="button" onClick={() => scroll(1)} aria-label="Next testimonials" className="flex h-10 w-10 items-center justify-center rounded-full border border-sc-gold hover:bg-sc-goldtint"><ChevronRight aria-hidden className="h-5 w-5" /></button>
              </div>
            </div>
            <ul ref={rail} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3">
              {SAMPLE_TESTIMONIALS.map((t) => (
                <li key={t.quote} className="w-[85%] shrink-0 snap-start sm:w-[46%] xl:w-[32%]">
                  <Card className="h-full">
                    <span aria-hidden className="font-display text-4xl leading-none text-sc-gold">“</span>
                    <p className="mt-1 text-sm text-sc-slate">{t.quote}</p>
                    <div className="mt-4"><Stars /></div>
                    <p className="mt-2 text-sm font-semibold text-sc-marine">{t.who}</p><p className="text-sm text-slate-600">{t.where}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}
      <Section tone="mist">
        <h2 className="font-display text-3xl font-bold text-sc-marine">What you can hold us to</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COMMITMENTS.map(([t, d]) => (
            <Card key={t}><ShieldCheck aria-hidden className="h-6 w-6 text-sc-emerald" /><h3 className="mt-3 font-display text-lg font-bold text-sc-marine">{t}</h3><p className="mt-2 text-sm text-slate-600">{d}</p></Card>
          ))}
        </div>
      </Section>
    </>
  )
}
