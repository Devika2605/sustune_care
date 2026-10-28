import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

// emblem-mark.png is the emblem trimmed to its real edges (368x512), so it is never squeezed into a square box.
// Width and height are both set from the true ratio and the image cannot shrink in a flex row.
// Brand rule: never below 48px tall on screen.
const RATIO = 368 / 512

export function Logo({ height = 56, light, className }: { height?: number; light?: boolean; className?: string }) {
  const h = Math.max(height, 48)
  const w = Math.round(h * RATIO)
  return (
    <Link href="/" className={cn('flex items-center gap-3.5', className)} aria-label="Sustune Care home">
      <Image src="/brand/emblem-mark.png" alt="" width={w} height={h} priority
        className={cn('shrink-0 object-contain', light && 'drop-shadow-[0_2px_12px_rgba(212,175,55,.35)]')} style={{ width: w, height: h, minWidth: w }} />
      <span className="leading-none">
        <span className={cn('block font-display text-xl font-bold tracking-wide sm:text-[1.4rem]', light ? 'text-white' : 'text-sc-marine')}>SUSTUNE <span className={light ? 'text-sc-gold' : 'text-sc-bronze'}>CARE</span></span>
        <span className={cn('mt-1.5 block whitespace-nowrap text-[8.5px] font-medium uppercase tracking-[0.12em] sm:text-[10px] sm:tracking-[0.16em]', light ? 'text-slate-300' : 'text-slate-600')}>Protected Care · Sustained Dignity</span>
      </span>
    </Link>
  )
}