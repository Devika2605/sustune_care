import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

// Brand rule: never below 48px tall on screen. Replace /public/brand/emblem.png with the true vector or
// high-resolution file (keep the file name) and nothing else changes.
export function Logo({ light, className }: { size?: number; light?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-3', className)} aria-label="Sustune Care home">
      <div className="relative shrink-0 flex items-center justify-center">
        <Image
          src="/brand/emblem.png"
          alt="Sustune Care emblem"
          width={48}
          height={48}
          priority
          className="h-12 w-auto object-contain"
        />
      </div>
      <span className="flex flex-col justify-center leading-tight">
        <span className={cn('block font-display text-xl sm:text-2xl font-bold tracking-wide leading-none', light ? 'text-white' : 'text-sc-marine')}>
          SUSTUNE CARE
        </span>
        <span className={cn('mt-0.5 block text-xs md:text-sm font-medium leading-tight', light ? 'text-amber-200/90' : 'text-slate-600')}>
          Care for your property, care for your parents, care for your peace of mind.
        </span>
      </span>
    </Link>
  )
}
