export function SampleBadge({ children = 'Sample data' }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-sc-gold bg-sc-goldtint px-3 py-1 text-xs font-semibold text-sc-bronze">
      {children}
    </span>
  )
}
