import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'outline' | 'gold' | 'light' | 'dark'
const styles: Record<Variant, string> = {
  primary: 'bg-sc-gold text-sc-marine hover:bg-sc-goldhover shadow-sm',   // navy text on gold, never white
  gold: 'bg-sc-gold text-sc-marine hover:bg-sc-goldhover shadow-sm',
  secondary: 'bg-sc-emerald text-white hover:bg-sc-emeraldDark',
  dark: 'bg-sc-marine text-white hover:bg-sc-ink',
  outline: 'border border-sc-marine/30 text-sc-marine hover:bg-sc-mist',
  light: 'border border-white/40 text-white hover:bg-white/10',
}

type Props = { variant?: Variant; arrow?: boolean; className?: string; children: React.ReactNode } & (
  | ({ href: string; external?: boolean } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
)

export function Button({ variant = 'primary', arrow, className, children, ...rest }: Props) {
  const cls = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
    styles[variant], className,
  )
  const inner = <>{children}{arrow && <ArrowRight aria-hidden className="h-4 w-4" />}</>
  if ('href' in rest && rest.href !== undefined) {
    const { href, external, ...a } = rest as { href: string; external?: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>
    return external ? <a href={href} target="_blank" rel="noreferrer" className={cls} {...a}>{inner}</a> : <Link href={href} className={cls} {...a}>{inner}</Link>
  }
  return <button type="button" className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>{inner}</button>
}
