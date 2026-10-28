'use client'
import { motion, useReducedMotion } from 'framer-motion'

// Fades and lifts its children in once, as they scroll into view. Does nothing for reduced-motion users.
const TAGS = { div: motion.div, li: motion.li, section: motion.section, article: motion.article } as const

export function Reveal({ children, delay = 0, y = 26, as = 'div', className }: {
  children: React.ReactNode; delay?: number; y?: number; as?: keyof typeof TAGS; className?: string
}) {
  const reduce = useReducedMotion()
  const Tag = TAGS[as]
  if (reduce) return <Tag className={className}>{children}</Tag>
  return (
    <Tag className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </Tag>
  )
}