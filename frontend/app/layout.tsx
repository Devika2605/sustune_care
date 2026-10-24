import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/inter'
import '@fontsource-variable/plus-jakarta-sans'
import './globals.css'
import { TopBar } from '@/components/layout/TopBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { QuickDesk } from '@/components/layout/QuickDesk'
import { SITE } from '@/lib/config'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Sustune Care | Property and parental care for NRIs in India', template: '%s | Sustune Care' },
  description: 'Care for your property. Care for your parents. Peace of mind for you. Aegis property stewardship and Sparsh parental care in Hyderabad, Bengaluru and Delhi NCR.',
  keywords: ['NRI property management India', 'elder care for NRIs', 'parental care India', 'Sustune Care', 'Aegis', 'Sparsh'],
  openGraph: { type: 'website', siteName: 'Sustune Care', locale: 'en_IN', title: 'Sustune Care | Protected Care. Sustained Dignity.' },
  twitter: { card: 'summary_large_image' },
}
export const viewport: Viewport = { themeColor: '#0D3B66', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-semibold">Skip to main content</a>
        <TopBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <QuickDesk />
      </body>
    </html>
  )
}
