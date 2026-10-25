'use client'
import { useState } from 'react'
import { Play } from 'lucide-react'

function toEmbed(url: string) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`
  const vm = url.match(/vimeo\.com\/(\d+)/)
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`
  return url
}

// Local files: drop mp4s in frontend/public/videos/ and pass "/videos/name.mp4". YouTube/Vimeo links also work.
// Host the mp4 on a CDN (S3 + CloudFront) or use a YouTube/Vimeo embed URL. Never commit 70 MB files to git.
export function VideoPlayer({ src, title, caption }: { src?: string; title: string; caption?: string }) {
  const [playing, setPlaying] = useState(false)
  const isEmbed = !!src && /youtube\.com|youtu\.be|vimeo\.com/.test(src)
  if (!src) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-sc-gold bg-sc-goldtint p-6 text-center text-sc-marine">
        <Play aria-hidden className="h-8 w-8" />
        <p className="font-semibold">{title}</p>
        <p className="max-w-sm text-sm text-slate-600">Video not added yet. Set the video URL in the environment variables to show it here.</p>
      </div>
    )
  }
  return (
    <figure>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-sc-deep">
        {isEmbed ? (
          <iframe src={toEmbed(src)} title={title} loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="h-full w-full" />
        ) : playing ? (
          <video src={src} controls autoPlay playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover" aria-label={title} />
        ) : (
          <>
            <video src={`${src}#t=0.1`} preload="metadata" muted playsInline aria-hidden className="absolute inset-0 h-full w-full object-cover" />
            <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 flex items-center justify-center" aria-label={`Play video: ${title}`}>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sc-gold text-sc-slate transition-transform group-hover:scale-105"><Play aria-hidden className="h-7 w-7" /></span>
            </button>
          </>
        )}
      </div>
      {caption && <figcaption className="mt-2 text-sm text-slate-600">{caption}</figcaption>}
    </figure>
  )
}