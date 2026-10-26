// Indicative pricing in rupees. These numbers are PLACEHOLDERS until the business owner signs them off.
// backend/app/pricing.py mirrors them so server quotes match what visitors see.
import type { Hub } from './config'

export const USD_INR = 84.75
export const CITY_FACTOR: Record<Hub, number> = { Bengaluru: 1, Hyderabad: 0.95, 'Delhi NCR': 1.05 }
export const AEGIS_RATE = 0.08
export const AEGIS_MIN_INR = 2500
export const SCOUTING_RENT_DAYS = 15
export const BUNDLE_DISCOUNT = 0.15

// Units of each currency per 1 rupee (approximate; shown as indicative).
export const CURRENCIES = {
  INR: { rate: 1, symbol: '₹', locale: 'en-IN' },
  USD: { rate: 1 / USD_INR, symbol: '$', locale: 'en-US' },
  GBP: { rate: 0.79 / USD_INR, symbol: '£', locale: 'en-GB' },
  AED: { rate: 3.67 / USD_INR, symbol: 'AED ', locale: 'en-US' },
  AUD: { rate: 1.52 / USD_INR, symbol: 'A$', locale: 'en-US' },
  CAD: { rate: 1.36 / USD_INR, symbol: 'C$', locale: 'en-US' },
} as const
export type Currency = keyof typeof CURRENCIES

export function fmt(amountInr: number, cur: Currency = 'INR') {
  const c = CURRENCIES[cur]
  return `${c.symbol}${Math.round(amountInr * c.rate).toLocaleString(c.locale)}`
}
export const inr = (n: number) => fmt(n, 'INR')
export const inrToUsd = (n: number) => Math.round(n / USD_INR)

export const PROPERTY_TYPES = [
  { id: '1bhk', label: '1 BHK Apartment', rent: 20000 },
  { id: '2bhk', label: '2 BHK Apartment', rent: 35000 },
  { id: '3bhk', label: '3 BHK Apartment', rent: 55000 },
  { id: 'villa', label: 'Villa or independent house', rent: 90000 },
] as const

export type AegisService = 'complete' | 'scouting'
export function aegisMonthlyInr(rent: number, city: Hub) {
  return Math.max(AEGIS_MIN_INR, Math.round(rent * AEGIS_RATE * CITY_FACTOR[city]))
}
export function scoutingOneTimeInr(rent: number) {
  return Math.round((rent / 30) * SCOUTING_RENT_DAYS)
}

// ---- Sparsh care plan ----
export const VITALS = {
  monthly: { label: 'Monthly', note: 'Basic monitoring', inr: 1200 },
  biweekly: { label: 'Every two weeks', note: 'Most families choose this', inr: 2000 },
  weekly: { label: 'Weekly', note: 'For chronic conditions', inr: 3500 },
} as const
export type VitalsFreq = keyof typeof VITALS
export const SOS_INR = 3000
export const ESCORT_VISIT_INR = 1000
export const COMPANION_VISIT_INR = 500
export const PILL_SORTING_INR = 800
export const SECOND_PARENT_FACTOR = 0.35

export type CareConfig = { sos: boolean; vitals: VitalsFreq | 'off'; escorts: number; visits: number; pills: boolean; both: boolean }

export function sparshPlan(c: CareConfig) {
  const lines: { label: string; inr: number }[] = []
  if (c.sos) lines.push({ label: '24/7 SOS and emergency response', inr: SOS_INR })
  if (c.vitals !== 'off') lines.push({ label: `Routine vitals check (${VITALS[c.vitals].label.toLowerCase()})`, inr: VITALS[c.vitals].inr })
  if (c.escorts > 0) lines.push({ label: `Doctor escorts (${c.escorts} a month)`, inr: c.escorts * ESCORT_VISIT_INR })
  if (c.visits > 0) lines.push({ label: `Companionship visits (${c.visits} a month)`, inr: c.visits * COMPANION_VISIT_INR })
  if (c.pills) lines.push({ label: 'Colour-coded pill sorting', inr: PILL_SORTING_INR })
  const single = lines.reduce((s, l) => s + l.inr, 0)
  const second = c.both ? Math.round((single - (c.sos ? SOS_INR : 0)) * SECOND_PARENT_FACTOR) : 0
  return { lines, second, total: single + second }
}

export const CARE_PRESETS = {
  essential: { label: 'Essential', sos: true, vitals: 'monthly', escorts: 0, visits: 0, pills: false },
  comprehensive: { label: 'Comprehensive', sos: true, vitals: 'biweekly', escorts: 2, visits: 4, pills: false },
  full: { label: 'Full concierge', sos: true, vitals: 'weekly', escorts: 4, visits: 8, pills: true },
} as const
export type CareLevel = keyof typeof CARE_PRESETS
