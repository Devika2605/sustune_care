import { cn } from '@/lib/cn'

const tones = { white: 'bg-white', mist: 'bg-sc-mist', navy: 'bg-sc-marine text-white' } as const

export function Section({ id, tone = 'white', className, children }: { id?: string; tone?: keyof typeof tones; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn('scroll-mt-24 py-16 sm:py-20', tones[tone], className)}>
      <div className="mx-auto max-w-page px-5 sm:px-8">{children}</div>
    </section>
  )
}

export function Heading({ title, sub, tone = 'light', as: Tag = 'h2', className }: { title: string; sub?: string; tone?: 'light' | 'dark'; as?: 'h1' | 'h2'; className?: string }) {
  return (
    <div className={cn('mb-10 max-w-2xl', className)}>
      <Tag className={cn('font-display text-[1.75rem] font-bold leading-tight tracking-[-0.015em] sm:text-4xl', tone === 'dark' ? 'text-white' : 'text-sc-marine')}>{title}</Tag>
      {sub && <p className={cn('mt-4 text-lg leading-relaxed', tone === 'dark' ? 'text-slate-200' : 'text-slate-600')}>{sub}</p>}
    </div>
  )
}
