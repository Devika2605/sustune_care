'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { api } from '@/lib/api'

export default function Login() {
  const router = useRouter()
  const [f, setF] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(''); setBusy(true)
    try {
      const r = await api.login(f)
      router.push(r.user.role === 'admin' ? '/admin' : '/portal')
    } catch (x) { setErr(x instanceof Error ? x.message : 'Sign-in failed.') } finally { setBusy(false) }
  }
  return (
    <Section>
      <div className="mx-auto max-w-md">
        <h1 className="font-display text-3xl font-bold text-sc-marine">Client login</h1>
        <form onSubmit={submit} className="mt-6 space-y-4 rounded-xl border border-sc-line bg-sc-card p-6 shadow-card">
          <div><label htmlFor="em">Email</label><input id="em" type="email" required autoComplete="username" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5" /></div>
          <div><label htmlFor="pw">Password</label><input id="pw" type="password" required autoComplete="current-password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5" /></div>
          {err && <p role="alert" className="font-medium text-red-700">{err}</p>}
          <Button type="submit" disabled={busy} className="w-full">{busy ? 'Signing in…' : 'Sign in'}</Button>
          <p className="text-sm text-slate-600">Want a look first? <a className="underline" href="/portal-preview">Open the portal demo</a>.</p>
        </form>
      </div>
    </Section>
  )
}
