import { cn } from '@/lib/cn'
import { Star4 } from '@/components/ui/Ornament'

const tones = { white: 'bg-sc-canvas', mist: 'bg-sc-mist', navy: 'bg-sc-marine text-white' } as const

export function Section({ id, tone = 'white', className, children }: { id?: string; tone?: keyof typeof tones; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn('scroll-mt-24 py-14 sm:py-20', tones[tone], className)}>
      <div className="mx-auto max-w-page px-5 sm:px-8">{children}</div>
    </section>
  )
}

export function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={cn('mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]', dark ? 'text-sc-gold' : 'text-sc-bronze')}>
      <Star4 className="h-3 w-3" />{children}<span aria-hidden className="gold-line h-px w-12 opacity-60" />
    </p>
  )
}

export function Heading({ title, sub, eyebrow, tone = 'light', as: Tag = 'h2', className }: { title: string; sub?: string; eyebrow?: string; tone?: 'light' | 'dark'; as?: 'h1' | 'h2'; className?: string }) {
  return (
    <div className={cn('mb-10 max-w-2xl', className)}>
      {eyebrow && <Eyebrow dark={tone === 'dark'}>{eyebrow}</Eyebrow>}
      <Tag className={cn('font-display text-3xl font-bold leading-tight sm:text-4xl', tone === 'dark' ? 'text-white' : 'text-sc-marine')}>{title}</Tag>
      {sub && <p className={cn('mt-4 text-lg leading-relaxed', tone === 'dark' ? 'text-slate-200' : 'text-slate-600')}>{sub}</p>}
    </div>
  )
}