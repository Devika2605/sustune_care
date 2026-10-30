import { Hero } from '@/components/home/Hero'
import { Problem } from '@/components/home/Problem'
import { Pillars } from '@/components/home/Pillars'
import { Calculator } from '@/components/home/Calculator'
import { Testimonials } from '@/components/home/Testimonials'
import { CtaBand } from '@/components/ui/CtaBand'

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Pillars />
      <Calculator />
      <Testimonials />
      <CtaBand title="Stop worrying across time zones." sub="Speak to a care director about your property, your parents, or both. The first call is free." interest="both" waText="Hi Sustune Care, I would like to book a consultation." />
    </>
  )
}
