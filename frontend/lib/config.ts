// Single source of truth for contact details. Values are copied from the approved business cards.
export const SITE = {
  name: 'Sustune Care',
  legalName: 'Sustune Care', // TODO: replace with the registered entity name once confirmed
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sustunecare.com',
  tagline: 'Protected Care. Sustained Dignity.',
  heroLine: 'Care for your property. Care for your parents. Peace of mind for you.',
  phoneDisplay: '+91 89856 34239',
  phoneTel: '+918985634239',
  whatsappDisplay: '+1 206 713 6114',
  whatsappNumber: '12067136114', // digits only, used by wa.me
  email: 'contact@sustunecare.com',
  location: 'Hyderabad, Telangana, India',
}

export const HUBS = ['Hyderabad', 'Bengaluru', 'Delhi NCR'] as const
export type Hub = (typeof HUBS)[number]

export const RESIDENCE = ['USA', 'UK', 'UAE', 'Australia', 'Canada', 'Other'] as const

export const INTRO_VIDEO = process.env.NEXT_PUBLIC_INTRO_VIDEO_URL || '/intro.mp4'
export const STORY_VIDEO = process.env.NEXT_PUBLIC_STORY_VIDEO_URL || '/sparsh.mp4'
export const AEGIS_VIDEO = process.env.NEXT_PUBLIC_AEGIS_VIDEO_URL || '/aegis.mp4'
export const SHOW_SAMPLE_PROOF = process.env.NEXT_PUBLIC_SHOW_SAMPLE_PROOF !== 'false'

export function waLink(text: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`
}

export const NAV = [
  { href: '/aegis', label: 'Aegis property', note: 'Real estate' },
  { href: '/sparsh', label: 'Sparsh care', note: 'Parental health' },
  { href: '/portal-preview', label: 'Client portal', note: 'Demo' },
  { href: '/about', label: 'About', note: '' },
] as const