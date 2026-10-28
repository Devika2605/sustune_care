import { cn } from '@/lib/cn'

// The four-point guiding star from the emblem. It is the brand's one repeating motif.
export function Star4({ className, glow, style }: { className?: string; glow?: boolean; style?: React.CSSProperties }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" style={style} className={cn('inline-block h-3.5 w-3.5 fill-current', glow && 'drop-shadow-[0_0_6px_rgba(212,175,55,.9)]', className)}>
      <path d="M12 0c.9 6.6 4.9 10.6 12 12-7.1 1.4-11.1 5.4-12 12-.9-6.6-4.9-10.6-12-12C7.1 10.6 11.1 6.6 12 0z" />
    </svg>
  )
}

// Hairline gold divider with the star in the middle.
export function StarRule({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('flex items-center gap-3 text-sc-gold', className)}>
      <span className="gold-line h-px w-16 opacity-70" /><Star4 /><span className="gold-line h-px w-16 opacity-70" />
    </div>
  )
}