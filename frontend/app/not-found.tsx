import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-lg text-center">
        <h1 className="font-display text-4xl font-bold text-sc-marine">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you were looking for has moved or does not exist.</p>
        <Button href="/" className="mt-6">Back to the home page</Button>
      </div>
    </Section>
  )
}
