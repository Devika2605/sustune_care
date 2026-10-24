import { DualHero } from '@/components/home/DualHero'
import { Problem } from '@/components/home/Problem'
import { ServiceMatrix } from '@/components/home/ServiceMatrix'
import { Estimator } from '@/components/home/Estimator'
import { Proof } from '@/components/home/Proof'
import { CtaBand } from '@/components/ui/CtaBand'

export default function Home() {
  return (
    <>
      <DualHero />
      <Problem />
      <ServiceMatrix />
      <Estimator />
      <Proof />
      <CtaBand title="Stop worrying across time zones." sub="Speak to a care director about your property, your parents, or both. The first call is free." interest="both" waText="Hi Sustune Care, I would like to book a consultation." />
    </>
  )
}
