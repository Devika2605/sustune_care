import { Check } from 'lucide-react'
import { Card } from './Card'
import type { Module } from '@/lib/content'

export function ModuleGrid({ modules, cols = 2 }: { modules: Module[]; cols?: 2 | 4 }) {
  return (
    <div className={cols === 4 ? 'grid gap-5 sm:grid-cols-2 xl:grid-cols-4' : 'grid gap-5 md:grid-cols-2'}>
      {modules.map((m) => (
        <Card key={m.title} className="transition-shadow hover:shadow-lift">
          <m.icon aria-hidden className="h-7 w-7 text-sc-cerulean" />
          <h3 className="mt-4 font-display text-xl font-semibold text-sc-marine">{m.title}</h3>
          <p className="mt-2 text-slate-600">{m.lead}</p>
          <ul className="mt-4 space-y-2 text-sm text-sc-slate">
            {m.points.map((p) => (
              <li key={p} className="flex gap-2"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-sc-emerald" /><span>{p}</span></li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  )
}
