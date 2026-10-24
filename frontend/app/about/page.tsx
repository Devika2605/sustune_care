import type { Metadata } from 'next'
import Image from 'next/image'
import { Section, Heading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { CtaBand } from '@/components/ui/CtaBand'
import { SITE } from '@/lib/config'

export const metadata: Metadata = { title: 'About', description: 'Who is behind Sustune Care and what the emblem stands for.' }

const MEANING = [
  ['Guiding star', 'A fixed point to navigate by: clear standards and honest reporting.'],
  ['Sheltering roof', 'Home. The property you own and the parents who live in it.'],
  ['The S ribbon', 'Continuity: care that keeps moving, month after month.'],
  ['Supporting hands', 'The person at the bedside. Warmth and dignity come before process.'],
]

export default function About() {
  return (
    <>
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <h1 className="max-w-2xl font-display text-4xl font-extrabold tracking-[-0.025em] text-sc-marine">Protected care. Sustained dignity.</h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600">Sustune Care exists for families whose lives are in one country and whose roots, homes and parents are in another. We combine careful oversight with people who treat your family’s home and your parents as they would their own.</p>
            <p className="mt-4 max-w-2xl text-slate-600">We are based in {SITE.location}, and our executive team brings more than 20 years of combined professional experience.</p>
          </div>
          <Image src="/brand/emblem.png" alt="Sustune Care emblem: a shield holding a house, an S ribbon and supporting hands" width={220} height={220} className="mx-auto h-auto w-48 lg:w-56" />
        </div>
      </Section>
      <Section tone="mist">
        <Heading title="What the emblem says about us" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MEANING.map(([t, d]) => <Card key={t}><h3 className="font-display text-lg font-semibold text-sc-marine">{t}</h3><p className="mt-2 text-sm text-slate-600">{d}</p></Card>)}
        </div>
      </Section>
      {/* TODO: add leadership names, photos and short bios here when the team approves them. */}
      <CtaBand title="Talk to the team" sub="Tell us about your property or your parents. We will tell you honestly whether we can help." interest="both" waText="Hi Sustune Care, I would like to know more about your team." />
    </>
  )
}
