import Link from 'next/link'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'outline' | 'gold' | 'light'
const styles: Record<Variant, string> = {
  primary: 'bg-sc-cerulean text-white hover:bg-sc-marine',
  secondary: 'bg-sc-emerald text-white hover:bg-sc-emeraldDark',
  outline: 'border border-sc-gold text-sc-marine hover:bg-sc-goldtint',
  gold: 'bg-sc-gold text-sc-slate hover:bg-[#b8872c]', // slate text on gold, never white (brand rule)
  light: 'border border-white/40 text-white hover:bg-white/10',
}

type Props = { variant?: Variant; className?: string; children: React.ReactNode } & (
  | ({ href: string; external?: boolean } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
)

export function Button({ variant = 'primary', className, children, ...rest }: Props) {
  const cls = cn(
    'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed',
    styles[variant],
    className,
  )
  if ('href' in rest && rest.href !== undefined) {
    const { href, external, ...a } = rest as { href: string; external?: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>
    return external ? (
      <a href={href} target="_blank" rel="noreferrer" className={cls} {...a}>{children}</a>
    ) : (
      <Link href={href} className={cls} {...a}>{children}</Link>
    )
  }
  return <button type="button" className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>
}
