// Indicative pricing. These constants are PLACEHOLDERS until the business owner signs them off.
// The same numbers live in backend/app/pricing.py so server quotes match what visitors see.
import type { Hub } from './config'

export const USD_INR = 84.75
export const CITY_FACTOR: Record<Hub, number> = { Bengaluru: 1, Hyderabad: 0.95, 'Delhi NCR': 1.05 }
export const AEGIS_RATE = 0.08
export const AEGIS_MIN_USD = 50
export const SCOUTING_RENT_DAYS = 15
export const BUNDLE_DISCOUNT = 0.15

export const CURRENCIES = {
  USD: { rate: 1, symbol: '$' },
  GBP: { rate: 0.79, symbol: '£' },
  AED: { rate: 3.67, symbol: 'AED ' },
  AUD: { rate: 1.52, symbol: 'A$' },
  CAD: { rate: 1.36, symbol: 'C$' },
} as const
export type Currency = keyof typeof CURRENCIES

export const SPARSH_TIERS = {
  essential: { name: 'Essential', desc: '24/7 SOS with a monthly vitals check', usd: 59 },
  comprehensive: { name: 'Comprehensive', desc: 'Doctor escorts, fortnightly vitals and weekly visits', usd: 118 },
  full: { name: 'Full concierge', desc: 'Unlimited escorts, three visits a week and a dedicated nurse', usd: 210 },
} as const
export type SparshTier = keyof typeof SPARSH_TIERS

export const inrToUsd = (inr: number) => inr / USD_INR

export function aegisMonthlyUsd(rentInr: number, city: Hub) {
  const raw = inrToUsd(rentInr) * AEGIS_RATE * CITY_FACTOR[city]
  return Math.max(AEGIS_MIN_USD, Math.round(raw))
}

export function scoutingOneTimeInr(rentInr: number) {
  return Math.round((rentInr / 30) * SCOUTING_RENT_DAYS)
}

export function estimate(o: { city: Hub; aegis: boolean; sparsh: boolean; rentInr: number; tier: SparshTier }) {
  const aegis = o.aegis ? aegisMonthlyUsd(o.rentInr, o.city) : 0
  const sparsh = o.sparsh ? Math.round(SPARSH_TIERS[o.tier].usd * CITY_FACTOR[o.city]) : 0
  const discount = o.aegis && o.sparsh ? Math.round((aegis + sparsh) * BUNDLE_DISCOUNT) : 0
  return { aegis, sparsh, discount, net: aegis + sparsh - discount }
}

export function money(usd: number, cur: Currency) {
  const c = CURRENCIES[cur]
  return `${c.symbol}${Math.round(usd * c.rate).toLocaleString('en-US')}`
}
export const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')

// ---- Sparsh configurator ----
export const VITALS = {
  monthly: { label: 'Monthly', note: 'Basic monitoring', usd: 15 },
  biweekly: { label: 'Every two weeks', note: 'Most families choose this', usd: 30 },
  weekly: { label: 'Weekly', note: 'For chronic conditions', usd: 55 },
} as const
export type VitalsFreq = keyof typeof VITALS
export const ESCORT_VISIT_USD = 18
export const COMPANION_VISIT_USD = 9
export const PILL_SORTING_USD = 12
export const SOS_USD = 40
export const SECOND_PARENT_FACTOR = 0.35

export function sparshPlan(o: { both: boolean; vitals: VitalsFreq; escorts: number; visits: number; pills: boolean }) {
  const lines = [
    { label: '24/7 SOS and emergency coordination', usd: SOS_USD },
    { label: `Vitals check (${VITALS[o.vitals].label.toLowerCase()})`, usd: VITALS[o.vitals].usd },
    { label: `Doctor escorts (${o.escorts} a month)`, usd: o.escorts * ESCORT_VISIT_USD },
    { label: `Companionship and errands (${o.visits} a month)`, usd: o.visits * COMPANION_VISIT_USD },
    ...(o.pills ? [{ label: 'Colour-coded pill sorting', usd: PILL_SORTING_USD }] : []),
  ]
  const single = lines.reduce((s, l) => s + l.usd, 0)
  const second = o.both ? Math.round((single - SOS_USD) * SECOND_PARENT_FACTOR) : 0
  return { lines, second, total: single + second }
}
