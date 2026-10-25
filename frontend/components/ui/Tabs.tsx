'use client'
import { cn } from '@/lib/cn'

export function Tabs<T extends string>({ items, value, onChange, label, idPrefix, dark, className }: {
  items: readonly { id: T; label: string }[]
  value: T
  onChange: (id: T) => void
  label: string
  idPrefix: string
  dark?: boolean
  className?: string
}) {
  function onKey(e: React.KeyboardEvent, i: number) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length
    onChange(items[next].id)
    document.getElementById(`${idPrefix}-${items[next].id}`)?.focus()
  }
  return (
    <div role="tablist" aria-label={label} className={cn('inline-flex flex-wrap gap-1 rounded-xl border p-1', dark ? 'border-white/20 bg-white/5' : 'border-sc-line bg-white', className)}>
      {items.map((t, i) => {
        const on = value === t.id
        return (
          <button
            key={t.id} id={`${idPrefix}-${t.id}`} role="tab" type="button"
            aria-selected={on} aria-controls={`${idPrefix}-panel`} tabIndex={on ? 0 : -1}
            onClick={() => onChange(t.id)} onKeyDown={(e) => onKey(e, i)}
            className={cn('rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
              on ? 'bg-sc-gold text-sc-slate' : dark ? 'text-slate-200 hover:bg-white/10' : 'text-slate-700 hover:bg-sc-mist')}
          >
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
