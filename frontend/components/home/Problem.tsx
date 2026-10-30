import Image from 'next/image'
import { Clock, MapPinOff, EyeOff, Heart } from 'lucide-react'
import { Section, Eyebrow } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

const CARDS = [
  [Clock, 'Time zone challenges', "Difficult to coordinate property care and your parents' needs from abroad."],
  [MapPinOff, 'Unreliable local support', 'Inconsistent property maintenance and support for your parents.'],
  [EyeOff, 'Lack of transparency', 'Few timely updates or confirmation that tasks and visits are completed.'],
  [Heart, 'Emotional stress', 'Constant worry about your property and parents back home.'],
] as const

// Where the NRI hubs sit on the globe artwork (percent of the 1983x793 picture). Decorative only.
const HUBS = [
  { name: 'USA', x: 54.5, y: 69, side: 'left' },
  { name: 'UK', x: 68.6, y: 58.5, side: 'left' },
  { name: 'Australia', x: 95.3, y: 88.5, side: 'left' },
] as const

// /public/brand/nri-world.webp is a transparent cut-out (1983x793): gold ribbons and a plane across the top,
// the globe rising from the bottom right. It is pinned to the bottom of the section at its natural ratio, so the
// globe is never cropped, and the copy and cards sit on the clear space above the globe.
export function Problem() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FCFAF4] pb-0 pt-14 sm:pt-20 lg:min-h-[40vw]">
      <div className="relative z-10 grid gap-10 pb-10 lg:grid-cols-[0.8fr_1.6fr] lg:pb-24">
        <div>
          <Eyebrow>The NRI reality</Eyebrow>
          <h2 className="font-display text-4xl font-bold leading-tight text-sc-marine sm:text-5xl">Distance shouldn’t mean uncertainty.</h2>
          <p className="mt-5 max-w-sm text-lg text-slate-700">Focus on your life abroad while we take care of what matters most back home: your property and your loved ones.</p>
          <Button href="/about" arrow className="mt-7">Learn More</Button>
        </div>
        <ul className="grid gap-4 self-start sm:grid-cols-2 xl:grid-cols-4">
          {CARDS.map(([Icon, t, d]) => (
            <li key={t} className="rounded-xl border border-white/70 bg-white/80 p-5 shadow-card backdrop-blur-md">
              <Icon aria-hidden className="h-7 w-7 text-[#C9A227]" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-lg font-bold leading-snug text-sc-marine">{t}</h3>
              <p className="mt-1.5 text-sm text-slate-600">{d}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* The artwork breaks out of the page container to run edge to edge along the bottom of the section. */}
      <div aria-hidden className="relative -mx-5 sm:-mx-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mx-0">
        <Image src="/brand/nri-world.webp" alt="" width={1983} height={793} sizes="100vw" className="h-auto w-full" />
        {HUBS.map((h) => (
          <span key={h.name} className="absolute hidden -translate-y-1/2 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 [text-shadow:0_1px_4px_rgba(5,13,32,.9)] sm:flex lg:text-xs" style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-100%, -50%)' }}>
            {h.name}<i className="block h-1.5 w-1.5 translate-x-[3px] rounded-full bg-sc-gold shadow-[0_0_8px_2px_rgba(212,175,55,.8)]" />
          </span>
        ))}
      </div>
    </Section>
  )
}
