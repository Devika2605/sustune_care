'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { NAV } from '@/lib/config'
import { cn } from '@/lib/cn'

export function Header() {
  const [open, setOpen] = useState(false)
  const path = usePathname()
  const home = path === '/'
  const active = (href: string) => (href === '/' ? path === '/' : path.startsWith(href))
  const link = (href: string) => cn('relative px-1 py-2 text-[16px] font-medium transition-colors',
    home ? (active(href) ? 'text-sc-gold font-semibold' : 'text-white hover:text-sc-gold') : (active(href) ? 'text-sc-marine font-semibold' : 'text-slate-700 hover:text-sc-marine'))
  return (
    <header className={cn('z-50', home ? 'absolute inset-x-0 top-0' : 'sticky top-0 border-b border-sc-line bg-white/95 backdrop-blur')}>
      <div className="mx-auto flex min-h-[84px] max-w-page items-center justify-between px-5 py-2 sm:px-8">
        <Logo light={home} />
        <nav aria-label="Main" className="hidden shrink items-center gap-8 xl:gap-9 max-[1200px]:gap-6 lg:flex">
          {NAV.map((n) => <Link key={n.href} href={n.href} className={link(n.href)} aria-current={active(n.href) ? 'page' : undefined}>{n.label}</Link>)}
        </nav>
        <div className="hidden shrink-0 ml-8 lg:ml-9 lg:block">
          <Button href="/contact" arrow className="px-5 py-2.5 text-sm font-semibold rounded-lg shadow-sm">Talk to Us</Button>
        </div>
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
