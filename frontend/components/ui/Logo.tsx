import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

// Brand rule: never below 48px tall on screen. Replace /public/brand/emblem.png with the true vector or
// high-resolution file (keep the file name) and nothing else changes.
export function Logo({ size = 52, light, className }: { size?: number; light?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-3', className)} aria-label="Sustune Care home">
      <Image src="/brand/emblem.png" alt="" width={size} height={size} priority className="h-auto" style={{ width: size }} />
      <span className="leading-none">
        <span className={cn('block font-display text-xl font-bold tracking-wide', light ? 'text-white' : 'text-sc-marine')}>SUSTUNE <span className={light ? 'text-sc-gold' : 'text-sc-bronze'}>CARE</span></span>
        <span className={cn('mt-1.5 block whitespace-nowrap text-[8.5px] font-medium uppercase tracking-[0.12em] sm:text-[10px] sm:tracking-[0.16em]', light ? 'text-slate-300' : 'text-slate-600')}>Protected Care · Sustained Dignity</span>
      </span>
    </Link>
  )
}
