'use client'
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

// Uses the native <dialog> element: focus is trapped, Escape closes it, and the page behind is inert.
export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog ref={ref} onClose={onClose} onClick={(e) => { if (e.target === ref.current) onClose() }}
      className="rounded-2xl p-0 shadow-lift backdrop:bg-sc-deep/70" style={{ width: wide ? 'min(92vw, 860px)' : 'min(92vw, 520px)' }} aria-label={title}>
      {open && (
        <div className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-sc-marine">{title}</h2>
            <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1.5 text-slate-600 hover:bg-sc-mist"><X aria-hidden className="h-5 w-5" /></button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  )
}
