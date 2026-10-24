import type { Metadata } from 'next'
import { PortalPreview } from '@/components/portal/PortalPreview'

export const metadata: Metadata = {
  title: 'Client portal demo',
  description: 'A preview of the Sustune Care client portal: rent ledger, maintenance tickets, parent vitals, doctor notes and medication deliveries.',
}
export default function Page() { return <PortalPreview /> }
