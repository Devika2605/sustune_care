'use client'
import { cn } from '@/lib/cn'

type Variant = 'navy' | 'gold' | 'underline'
const wrap: Record<Variant, string> = {
  navy: 'inline-flex flex-wrap gap-1 rounded-full bg-sc-mist p-1',
  gold: 'inline-flex flex-wrap gap-1 rounded-xl border border-white/20 bg-white/5 p-1',
  underline: 'flex gap-x-5 overflow-x-auto border-b border-sc-line',
}
const btn = (v: Variant, on: boolean) =>
  v === 'navy' ? cn('rounded-full px-5 py-2.5 text-sm font-semibold transition-colors', on ? 'bg-sc-marine text-white' : 'text-slate-700 hover:bg-white')
  : v === 'gold' ? cn('rounded-lg px-4 py-2 text-sm font-semibold transition-colors', on ? 'bg-sc-gold text-sc-marine' : 'text-slate-200 hover:bg-white/10')
  : cn('-mb-px whitespace-nowrap border-b-2 py-2.5 text-sm transition-colors', on ? 'border-sc-gold font-semibold text-sc-marine' : 'border-transparent text-slate-600 hover:text-sc-marine')

export function Tabs<T extends string>({ items, value, onChange, label, idPrefix, variant = 'navy', className }: {
  items: readonly { id: T; label: string }[]; value: T; onChange: (id: T) => void; label: string; idPrefix: string; variant?: Variant; className?: string
}) {
  function onKey(e: React.KeyboardEvent, i: number) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length
    onChange(items[next].id)
    document.getElementById(`${idPrefix}-${items[next].id}`)?.focus()
  }
  return (
    <div role="tablist" aria-label={label} className={cn(wrap[variant], className)}>
      {items.map((t, i) => {
        const on = value === t.id
        return (
          <button key={t.id} id={`${idPrefix}-${t.id}`} role="tab" type="button" aria-selected={on} aria-controls={`${idPrefix}-panel`}
            tabIndex={on ? 0 : -1} onClick={() => onChange(t.id)} onKeyDown={(e) => onKey(e, i)} className={btn(variant, on)}>
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

export function TabPanel({ idPrefix, active, children, className }: { idPrefix: string; active: string; children: React.ReactNode; className?: string }) {
  return <div role="tabpanel" id={`${idPrefix}-panel`} aria-labelledby={`${idPrefix}-${active}`} tabIndex={0} className={className}>{children}</div>
}
