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
  const link = (href: string) => cn('rounded-md px-3 py-2 text-sm font-medium', path === href ? 'text-sc-cerulean' : 'text-sc-slate hover:text-sc-cerulean')
  return (
    <header className="sticky top-0 z-50 border-b border-sc-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-page items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => <Link key={n.href} href={n.href} className={link(n.href)} aria-current={path === n.href ? 'page' : undefined}>{n.label}</Link>)}
          <Button href="/login" variant="outline" className="ml-2">Portal login</Button>
          <Button href="/contact" className="ml-1">Book consultation</Button>
        </nav>
        <button type="button" className="rounded-md p-2 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-sc-line bg-white px-5 py-4 lg:hidden" onClick={() => setOpen(false)}>
          <ul className="flex flex-col gap-1">
            {NAV.map((n) => <li key={n.href}><Link href={n.href} className={cn(link(n.href), 'block')}>{n.label}</Link></li>)}
            <li><Link href="/login" className={cn(link('/login'), 'block')}>Portal login</Link></li>
            <li className="pt-2"><Button href="/contact" className="w-full">Book consultation</Button></li>
          </ul>
        </nav>
      )}
    </header>
  )
}
