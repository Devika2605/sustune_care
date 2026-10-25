import Image from 'next/image'
import Link from 'next/link'

// Brand rule: never below 48px tall on screen. Replace /public/brand/emblem.png with the true vector
// (01_Vector_Assets_SVG_EPS) when you have it; keep the file name and nothing else changes.
export function Logo({ size = 48, light, className }: { size?: number; light?: boolean; className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className ?? ''}`} aria-label="Sustune Care home">
      <Image src="/brand/emblem.png" alt="" width={size} height={size} priority className="h-auto" style={{ width: size }} />
      <span className="leading-tight">
        <span className={`block font-display text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-sc-marine'}`}>Sustune Care</span>
        <span className={`block text-xs ${light ? 'text-sc-gold' : 'text-sc-bronze'}`}>Protected Care. Sustained Dignity.</span>
      </span>
    </Link>
  )
}
