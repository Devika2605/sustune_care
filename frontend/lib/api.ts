// Browser -> Next.js -> FastAPI. Auth lives in an httpOnly cookie set by the API, so there is no token in JS.
export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
  }
}

async function req<T>(path: string, opts: { method?: string; body?: unknown } = {}): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: opts.method ?? 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    credentials: 'same-origin',
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const detail = typeof err.detail === 'string' ? err.detail : res.status === 429 ? 'Too many attempts. Please wait a minute and try again.' : 'Something went wrong. Please try again.'
    throw new ApiError(detail, res.status)
  }
  return res.json() as Promise<T>
}

export type LeadInput = {
  name: string; email: string; phone: string; country: string
  interest: 'aegis' | 'sparsh' | 'both'; city: string
  preferred_slot: string; message: string; quote_monthly_usd: number | null
  consent: boolean; website: string
}
export type Lead = Omit<LeadInput, 'consent' | 'website'> & { id: number; status: string; created_at: string }
export type PortalData = {
  client: { name: string; country: string }
  properties: { id: number; name: string; city: string; monthly_rent_inr: number; tenant: string; rent_status: string; last_inspection: string; inspection_score: number }[]
  parents: { id: number; name: string; age: number; city: string; companion: string
    vitals: { recorded_at: string; bp: string; pulse: number; spo2: number; sugar: number | null; note: string }[]
    appointments: { id: number; doctor: string; hospital: string; when: string; status: string; summary: string }[] }[]
}

export const api = {
  createLead: (body: LeadInput) => req<Lead>('/leads', { method: 'POST', body }),
  login: (body: { email: string; password: string }) =>
    req<{ user: { name: string; role: 'admin' | 'client' } }>('/auth/login', { method: 'POST', body }),
  logout: () => req<{ ok: boolean }>('/auth/logout', { method: 'POST' }),
  portalMe: () => req<PortalData>('/portal/me'),
  leads: () => req<Lead[]>('/admin/leads'),
  setLeadStatus: (id: number, status: string) => req<Lead>(`/admin/leads/${id}`, { method: 'PATCH', body: { status } }),
}
