// Decorative line art used behind hero sections. All of it is aria-hidden.
export function BuildingsArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 420 300" fill="none" className={className}>
      <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D4AF37" /><stop offset="1" stopColor="#8A6A12" /></linearGradient></defs>
      <g stroke="url(#bg)" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M60 280V120l70-24v184M130 96l60 24v160M190 120V50l90-30 70 40v220M280 20v260M60 280h330" />
        <path d="M80 140h30M80 170h30M80 200h30M80 230h30M210 90h50M210 120h50M210 150h50M210 180h50M210 210h50M300 80h30M300 110h30M300 140h30M300 170h30M300 200h30M300 230h30" strokeWidth="1" />
        <path d="M20 280h390" /><path d="M340 280c-20-30 10-50 0-70M360 280c20-26 0-44 8-62" strokeWidth="1" />
      </g>
    </svg>
  )
}

export function CareArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 420 300" fill="none" className={className}>
      <defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D4AF37" /><stop offset="1" stopColor="#8A6A12" /></linearGradient></defs>
      <g stroke="url(#cg)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M210 250c-60-40-80-70-80-100a45 45 0 0 1 80-24 45 45 0 0 1 80 24c0 30-20 60-80 100z" />
        <path d="M120 230c-30-10-60 6-86 34 40 22 80 18 120-8M300 230c30-10 60 6 86 34-40 22-80 18-120-8" />
        <circle cx="210" cy="92" r="26" /><path d="M170 190c10-30 70-30 80 0" />
        <path d="M80 80c20-30 60-34 80-10M340 60c-24-26-60-24-80 0" strokeWidth="1.2" />
      </g>
    </svg>
  )
}

export function Stars({ n = 5 }: { n?: number }) {
  return (
    <span aria-label={`${n} out of 5 stars`} className="inline-flex gap-0.5 text-sc-gold">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} aria-hidden viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path d="m10 1.5 2.5 5.6 6 .6-4.5 4 1.3 6-5.3-3.2-5.3 3.2 1.3-6-4.5-4 6-.6z" /></svg>
      ))}
    </span>
  )
}
