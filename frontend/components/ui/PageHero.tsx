import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

// Light page hero used on Aegis, Sparsh and Contact (matches the mockups).
export function PageHero({ tag, title, sub, art, children, className }: { tag: string; title: string; sub: string; art?: React.ReactNode; children?: React.ReactNode; className?: string }) {
  return (
    <section className={cn('relative overflow-hidden bg-gradient-to-br from-white via-sc-canvas to-[#E9EEF7]', className)}>
      <div className="mx-auto max-w-page px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
        <span className="inline-block rounded-md bg-sc-mist px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-sc-marine">{tag}</span>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.1] text-sc-marine sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-xl text-lg text-slate-600">{sub}</p>
        {children}
      </div>
      {art && <div aria-hidden className="pointer-events-none absolute right-0 top-4 hidden w-[44%] max-w-[560px] lg:block">{art}</div>}
    </section>
  )
}

export function IconStrip({ items }: { items: readonly (readonly [LucideIcon, string])[] }) {
  return (
    <ul className="mt-9 grid max-w-3xl grid-cols-2 divide-sc-line rounded-2xl border border-sc-line bg-white p-2 shadow-card sm:grid-cols-4 sm:divide-x">
      {items.map(([Icon, label]) => (
        <li key={label} className="flex flex-col items-center gap-2 px-3 py-4 text-center text-sm font-medium text-sc-marine"><Icon aria-hidden className="h-7 w-7" strokeWidth={1.5} />{label}</li>
      ))}
    </ul>
  )
}
