// Single source of truth for contact details. Values are copied from the approved business cards.
export const SITE = {
  name: 'Sustune Care',
  legalName: 'Sustune Care', // TODO: replace with the registered entity name once confirmed
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sustunecare.com',
  tagline: 'Protected Care. Sustained Dignity.',
  phoneDisplay: '+91 89856 34239',
  phoneTel: '+918985634239',
  whatsappDisplay: '+1 206 713 6114',
  whatsappNumber: '12067136114', // digits only, used by wa.me
  email: 'contact@sustunecare.com',
  web: 'www.sustunecare.com',
  location: 'Hyderabad, Telangana, India',
}

export const HUBS = ['Hyderabad', 'Bengaluru', 'Delhi NCR'] as const
export type Hub = (typeof HUBS)[number]

export const RESIDENCE = ['USA', 'UK', 'UAE', 'Australia', 'Canada', 'Germany', 'Singapore', 'Other'] as const

// Office addresses come from the design mockup. TODO: confirm each is a real, staffed office before launch.
export const OFFICES = [
  { city: 'Hyderabad', line1: 'Banjara Hills, Hyderabad', line2: 'Telangana, India' },
  { city: 'Bengaluru', line1: 'Koramangala, Bengaluru', line2: 'Karnataka, India' },
  { city: 'Delhi NCR', line1: 'Gurugram, Haryana', line2: 'India' },
]

export const INTRO_VIDEO = process.env.NEXT_PUBLIC_INTRO_VIDEO_URL || '/intro.mp4'
export const STORY_VIDEO = process.env.NEXT_PUBLIC_STORY_VIDEO_URL || '/sparsh.mp4'
export const AEGIS_VIDEO = process.env.NEXT_PUBLIC_AEGIS_VIDEO_URL || '/aegis.mp4'
export const HERO_IMAGE = process.env.NEXT_PUBLIC_HERO_IMAGE || ''
export const SHOW_SAMPLE_PROOF = process.env.NEXT_PUBLIC_SHOW_SAMPLE_PROOF !== 'false'

export function waLink(text: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`
}

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/aegis', label: 'Aegis' },
  { href: '/sparsh', label: 'Sparsh' },
  { href: '/portal-preview', label: 'Portal' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const