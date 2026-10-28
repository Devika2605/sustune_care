import { cn } from '@/lib/cn'

export function Card({ className, dark, children }: { className?: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <div className={cn('group relative rounded-2xl border p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift', dark ? 'border-sc-gold/40 bg-sc-marine text-slate-100' : 'border-sc-line bg-sc-card', className)}>
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-2xl bg-gradient-to-r from-sc-gold via-[#F1D77A] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
      {children}
    </div>
  )
}