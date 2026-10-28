'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { NAV } from '@/lib/config'
import { cn } from '@/lib/cn'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const path = usePathname()
  const home = path === '/'
  const active = (href: string) => (href === '/' ? path === '/' : path.startsWith(href))
  const link = (href: string) => cn('relative px-1 py-2 text-sm font-medium',
    home ? (active(href) ? 'text-sc-gold' : 'text-white hover:text-sc-gold') : (active(href) ? 'text-sc-marine' : 'text-slate-700 hover:text-sc-marine'),
    active(href) && "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-sc-gold")
  return (
    <header className={cn('z-50 transition-all duration-300', home ? cn('fixed inset-x-0 top-0', scrolled && 'border-b border-sc-gold/25 bg-sc-deep/85 shadow-lift backdrop-blur-xl') : 'sticky top-0 border-b border-sc-line bg-white/95 backdrop-blur')}>
      <div className={cn('mx-auto flex max-w-page items-center justify-between px-5 transition-all duration-300 sm:px-8', scrolled ? 'h-[76px]' : 'h-[92px]')}>
        <Logo light={home} />
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => <Link key={n.href} href={n.href} className={link(n.href)} aria-current={active(n.href) ? 'page' : undefined}>{n.label}</Link>)}
        </nav>
        <div className="hidden lg:block"><Button href="/contact" arrow>Talk to Us</Button></div>
        <button type="button" className={cn('rounded-md p-2 lg:hidden', home ? 'text-white' : 'text-sc-marine')} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-sc-line bg-white px-5 py-4 lg:hidden" onClick={() => setOpen(false)}>
          <ul className="flex flex-col gap-1">
            {NAV.map((n) => <li key={n.href}><Link href={n.href} className="block rounded-md px-3 py-2.5 font-medium text-sc-marine hover:bg-sc-mist">{n.label}</Link></li>)}
            <li><Link href="/login" className="block rounded-md px-3 py-2.5 font-medium text-sc-marine hover:bg-sc-mist">Client login</Link></li>
            <li className="pt-2"><Button href="/contact" className="w-full" arrow>Talk to Us</Button></li>
          </ul>
        </nav>
      )}
    </header>
  )
}