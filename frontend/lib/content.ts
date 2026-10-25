import type { LucideIcon } from 'lucide-react'
import {
  Siren, Stethoscope, ShoppingBag, HeartHandshake, UserCheck, Wallet, Wrench, Globe2,
} from 'lucide-react'

export type Module = { icon: LucideIcon; title: string; lead: string; points: string[] }

// The spec lists these four Aegis modules. "Global sourcing" is written as interiors, fittings and
// appliances sourced to the owner's spec (including items from abroad). Confirm this reading with the client.
export const AEGIS_MODULES: Module[] = [
  {
    icon: UserCheck, title: 'Tenant scouting',
    lead: 'We find and verify the tenant before the keys change hands.',
    points: ['Credit and employment checks', 'Police verification through the local station', 'Accompanied viewings and staged listing photos', 'Digital lease drafting and e-stamping by a partner advocate'],
  },
  {
    icon: Wallet, title: 'Active rental management',
    lead: 'Rent, bills and paperwork handled in your time zone.',
    points: ['Rent collected into escrow and sent on a fixed date', 'TDS working and Form 15CA/CB support through a partner CA', 'Society, electricity and water bill reconciliation', 'Written notices if rent is late'],
  },
  {
    icon: Wrench, title: 'Maintenance and turnkey interiors',
    lead: 'Vetted tradespeople, itemised quotes, your approval first.',
    points: ['Electrical, plumbing and AC servicing on a rate card', 'Pre-monsoon waterproofing checks', 'Deep clean and repaint between tenants', 'Modular kitchen and wardrobe installation'],
  },
  {
    icon: Globe2, title: 'Global sourcing',
    lead: 'Fittings, furniture and appliances sourced to your brief, from India or abroad.',
    points: ['Quotes compared before you commit', 'Import and customs coordination for items shipped from abroad', 'Delivery, installation and snag list sign-off', 'Photo proof at each stage in your portal'],
  },
]

export const SPARSH_PILLARS: Module[] = [
  {
    icon: Siren, title: '24/7 emergency SOS',
    lead: 'Someone responds when your parents press the button.',
    points: ['Smart SOS button and wearable option', 'A coordinator calls your parents and you', 'Ambulance and partner-hospital coordination', 'A care companion meets them at the hospital'],
  },
  {
    icon: Stethoscope, title: 'Doctor escort',
    lead: 'A trained companion goes to every appointment.',
    points: ['Door-to-door cab with a companion', 'Registration, queues and billing handled', 'The consultation is noted, and prescriptions are scanned', 'A voice or written summary reaches you the same day'],
  },
  {
    icon: ShoppingBag, title: 'Daily errands',
    lead: 'The small tasks that become hard with age.',
    points: ['Medicine and grocery pick-up', 'Bank, pension and KYC visits with an escort', 'Utility bills and household repairs arranged', 'Colour-coded pill organisers refilled on schedule'],
  },
  {
    icon: HeartHandshake, title: 'Regular companionship',
    lead: 'A familiar face, on a schedule you choose.',
    points: ['Visits for tea, conversation and walks', 'Help with video calls and phone apps', 'Festival and birthday visits', 'Photo and voice updates sent to you'],
  },
]

export const ANXIETY_TODAY = [
  ['A missed call at 3 a.m.', 'You wonder whether your mother took her medicine, or whether she is hiding a bad night.'],
  ['“Beta, we are fine.”', 'Parents play down chest pain or dizziness so that you do not worry from abroad.'],
  ['Favours from relatives', 'Cousins and neighbours give up whole mornings in hospital queues, and the favour is never quite repayable.'],
  ['A house you cannot see', 'A tenant who pays late, a leak nobody reports, a bill that lapses.'],
]
export const ANXIETY_WITH = [
  ['One accountable team', 'A named Aegis steward for the property and a named Sparsh companion for your parents.'],
  ['Proof, not promises', 'Inspection photos, visit notes and vitals arrive in one private portal.'],
  ['Your time zone', 'Updates by WhatsApp and a monthly review call that fits your evening.'],
  ['Clear costs', 'Itemised quotes and approvals before any repair or purchase.'],
]

export const COMMITMENTS = [
  ['Named people', 'Every client has a named steward and a named companion, so there is always someone to call.'],
  ['Verified staff', 'Background and police verification for field staff, with first-aid training for companions.'],
  ['Consent first', 'Health information is shared only with the people your parents agree to, in line with India’s DPDP Act.'],
  ['Itemised costs', 'No repair or purchase goes ahead without your written approval.'],
]

// Illustrative content only. Shown behind a visible "sample" badge and hidden by NEXT_PUBLIC_SHOW_SAMPLE_PROOF=false.
export const SAMPLE_METRICS = [
  ['Hyderabad', 'Hub, headquarters'],
  ['Bengaluru', 'Hub'],
  ['Delhi NCR', 'Hub'],
  ['6 time zones', 'Updates aligned to the client'],
] as const
export const SAMPLE_TESTIMONIALS = [
  { quote: 'I used to dread phone calls home. Now I open the portal and see what happened that day.', who: 'Sample client', where: 'USA · Hub: Hyderabad', tag: 'Bundle' },
  { quote: 'The inspection report showed me a leak before it became a repair bill.', who: 'Sample client', where: 'UK · Hub: Bengaluru', tag: 'Aegis' },
  { quote: 'Our companion remembers how Amma likes her tea. That matters more than any dashboard.', who: 'Sample client', where: 'UAE · Hub: Delhi NCR', tag: 'Sparsh' },
]

// ---- Aegis pricing matrix ----
export const AEGIS_MATRIX: [string, boolean, boolean][] = [
  ['Credit, employment and police verification', true, true],
  ['Staged photos and multi-portal listing', true, true],
  ['Digital lease drafting and e-stamping', true, true],
  ['Rent escrow and fixed-date payout', false, true],
  ['TDS working and Form 15CA/CB support', false, true],
  ['Quarterly 80-point inspection report', false, true],
  ['Emergency maintenance dispatch', false, true],
  ['Property tax and Khata/Patta follow-up', false, true],
  ['Named steward and portal access', false, true],
  ['Tenant replacement if the tenancy ends early (first 12 months)', false, true],
]

// ---- Sample inspection report ----
export const INSPECTION = {
  id: 'SAMPLE-HYD-Q3',
  property: 'Sample apartment, Gachibowli, Hyderabad',
  date: '2 October 2026', auditor: 'Sample auditor', score: 96, moisture: '0.4%',
  rooms: [
    { id: 'living', name: 'Living room', score: 98, note: 'No action needed. Next check in January.', items: [['Flooring', 'No cracks or grout wear'], ['Cove lighting', 'All 18 points working'], ['Main door and smart lock', 'Battery at 92%, latch smooth'], ['Walls and paint', 'No marks or damp']] },
    { id: 'master', name: 'Master suite', score: 95, note: 'Replace one wardrobe hinge at next visit.', items: [['Wardrobe', 'One hinge loose'], ['Windows', 'Seals intact'], ['Electrical', 'Sockets tested'], ['Walls and paint', 'No marks']] },
    { id: 'kitchen', name: 'Kitchen', score: 94, note: 'Descale the water purifier before winter.', items: [['Chimney and hob', 'Working'], ['Plumbing', 'No leaks under the sink'], ['Cabinets', 'Doors aligned'], ['Water purifier', 'Service due in 60 days']] },
    { id: 'terrace', name: 'Terrace and drainage', score: 96, note: 'Clear drains before the monsoon.', items: [['Waterproofing', 'No seepage'], ['Drains', 'Clear'], ['Parapet', 'No cracks'], ['Water tank', 'Clean']] },
  ],
}

// ---- Sparsh story timeline ----
export const TYPICAL_DAY = [
  ['8:30 am', 'Morning check-in', 'The companion checks blood pressure and oxygen, confirms breakfast and sets out the day’s medicines.'],
  ['11:00 am', 'Hospital escort', 'A private cab, registration, the doctor’s consultation and the pharmacy, all with your parent.'],
  ['4:30 pm', 'Walk and conversation', 'A slow walk in the park and some conversation. No agenda.'],
  ['8:00 pm', 'Your update', 'A note, prescription photos and a short voice message land in your portal.'],
]

// ---- Portal preview (static sample data) ----
export const PREVIEW = {
  client: 'Demo client, Seattle, USA',
  property: { name: 'Sample apartment, Gachibowli', tenant: 'Sample tenant (verified)', lease: 'Aug 2025 to Jul 2027', deposit: 255000, rent: 85000, score: 96 },
  ledger: [
    ['October 2026', 85000, 'Held in escrow', 'Payout due 5 Nov'],
    ['September 2026', 85000, 'Paid out', '5 Oct'],
    ['August 2026', 85000, 'Paid out', '5 Sep'],
    ['July 2026', 85000, 'Paid out', '5 Aug'],
  ] as [string, number, string, string][],
  tickets: [
    { id: 'TK-882', title: 'Replace water purifier membrane', status: 'Completed', cost: 2450 },
    { id: 'TK-904', title: 'AC service before winter', status: 'Scheduled', cost: 1800 },
    { id: 'TK-911', title: 'Fix loose wardrobe hinge', status: 'Awaiting approval', cost: 600 },
  ],
  parent: { name: 'Sample parent, age 71', companion: 'Sample companion' },
  vitals: [
    ['14 Oct', '128/82', 74, 98, 112],
    ['30 Sep', '134/86', 78, 97, 126],
    ['16 Sep', '126/80', 72, 98, 108],
  ] as [string, string, number, number, number][],
  notes: [
    ['Cardiology review', 'Blood pressure stable. Continue current medicines. Repeat lipid panel in three months.'],
    ['General physician', 'Mild seasonal cough. Rest, fluids, review in a week if it continues.'],
  ],
  meds: [
    ['Amlodipine 5 mg', 'Delivered 2 Oct', 'Next: 30 Oct'],
    ['Metformin 500 mg', 'Delivered 2 Oct', 'Next: 30 Oct'],
    ['Vitamin D3', 'Scheduled', 'Arrives 28 Oct'],
  ],
}
