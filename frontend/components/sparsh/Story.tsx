import { Section, Heading } from '@/components/ui/Section'
import { VideoPlayer } from '@/components/ui/VideoPlayer'
import { TYPICAL_DAY } from '@/lib/content'
import { STORY_VIDEO } from '@/lib/config'

export function Story() {
  return (
    <Section id="story">
      <Heading title="A trusted presence back home" sub="Technology lets you talk to your parents. A person who turns up lets you stop worrying between calls." />
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <VideoPlayer src={STORY_VIDEO} title="A trusted presence back home" />
        <div>
          <h3 className="font-display text-xl font-semibold text-sc-marine">A typical visiting day</h3>
          <ol className="mt-5 space-y-5 border-l-2 border-sc-gold pl-6">
            {TYPICAL_DAY.map(([time, title, text]) => (
              <li key={time} className="relative">
                <span aria-hidden className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-sc-gold" />
                <p className="text-sm font-semibold text-sc-bronze">{time}</p>
                <p className="font-display font-semibold text-sc-marine">{title}</p>
                <p className="mt-1 text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}