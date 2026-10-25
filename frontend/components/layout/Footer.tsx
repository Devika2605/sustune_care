import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { SITE, HUBS, waLink } from '@/lib/config'

const col = (title: string, items: [string, string][]) => (
  <div>
    <h3 className="font-display text-sm font-semibold text-sc-gold">{title}</h3>
    <ul className="mt-3 space-y-2 text-sm">
      {items.map(([label, href]) => <li key={label}><Link href={href} className="text-slate-300 hover:text-white">{label}</Link></li>)}
    </ul>
  </div>
)

export function Footer() {
  return (
    <footer className="bg-sc-deep text-slate-300">
      <div className="mx-auto grid max-w-page gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">Property stewardship and parental care for non-resident Indians in {HUBS.join(', ')}.</p>
          <address className="mt-4 space-y-1 text-sm not-italic">
            <p><a href={`tel:${SITE.phoneTel}`} className="hover:text-white">{SITE.phoneDisplay}</a> (India)</p>
            <p><a href={waLink('Hi Sustune Care')} target="_blank" rel="noreferrer" className="hover:text-white">{SITE.whatsappDisplay}</a> (WhatsApp)</p>
            <p><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></p>
            <p>{SITE.location}</p>
          </address>
        </div>
        {col('Aegis property', [['Tenant scouting', '/aegis#modules'], ['Rental management', '/aegis#modules'], ['Maintenance and interiors', '/aegis#modules'], ['Pricing', '/aegis#pricing'], ['Sample inspection report', '/aegis#report']])}
        {col('Sparsh care', [['24/7 emergency SOS', '/sparsh#pillars'], ['Doctor escort', '/sparsh#pillars'], ['Daily errands', '/sparsh#pillars'], ['Companionship', '/sparsh#pillars'], ['Care plan builder', '/sparsh#plan']])}
        {col('Company', [['About', '/about'], ['Care estimator', '/#estimator'], ['Portal demo', '/portal-preview'], ['Contact', '/contact'], ['Privacy policy', '/privacy'], ['Terms', '/terms']])}
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-page px-5 py-5 text-xs sm:px-8">© {new Date().getFullYear()} {SITE.legalName}. All rights reserved. {SITE.tagline}</p>
      </div>
    </footer>
  )
}
