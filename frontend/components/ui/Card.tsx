import { cn } from '@/lib/cn'

export function Card({ className, dark, children }: { className?: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <div className={cn('rounded-2xl border p-6 shadow-card', dark ? 'border-sc-gold/40 bg-sc-marine text-slate-100' : 'border-sc-line bg-sc-card', className)}>
      {children}
    </div>
  )
}
