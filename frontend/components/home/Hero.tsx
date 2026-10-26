'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { VideoPlayer } from '@/components/ui/VideoPlayer'
import { HERO_IMAGE, INTRO_VIDEO } from '@/lib/config'

// /public/brand/hero.webp is a transparent cut-out (1672x941): the emblem sculpture, arches, trees and the
// gold waves, with no background. The navy backdrop is painted by this component, so the artwork is never
// cropped or zoomed. It is shown at its natural aspect ratio and the hero grows to fit it.
const HERO_SRC = HERO_IMAGE || '/brand/hero.webp'

// Navy backdrop with a soft blue glow behind the emblem and a faint gold glow on the floor.
const BACKDROP = [
  'radial-gradient(ellipse 52% 70% at 71% 42%, rgba(36,84,170,.55) 0%, rgba(20,48,110,.28) 45%, transparent 72%)',
  'radial-gradient(ellipse 60% 22% at 70% 92%, rgba(212,175,55,.14) 0%, transparent 70%)',
  'linear-gradient(180deg, #050D20 0%, #0A1A3C 55%, #08163A 100%)',
].join(',')

// Fade the left edge (wave tip on very wide screens) and the bottom edge (the platform is cut flat) into the navy.
const FADE = 'linear-gradient(to right, transparent 0%, #000 12%), linear-gradient(to bottom, #000 88%, transparent 100%)'

export function Hero() {
  const [video, setVideo] = useState(false)
  return (
    <section className="relative overflow-hidden pb-14 text-white" style={{ background: BACKDROP }}>
      {/* Keeps the headline readable where it crosses the arch. Sits above the artwork, below the copy, and runs the full height so it leaves no edge. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-[5] hidden w-[62%] bg-gradient-to-r from-sc-deep/75 via-sc-deep/40 to-transparent lg:block" />
      <div className="relative mx-auto flex max-w-[1800px] flex-col lg:block">
        {/* Copy. Phones and tablets: above the artwork. Desktop: laid over the empty left of the artwork. */}
        <div className="relative z-10 order-1 lg:absolute lg:inset-0 lg:flex lg:items-center lg:pt-12">
          <div className="relative mx-auto w-full max-w-page px-5 pb-6 pt-32 sm:px-8 lg:pb-0 lg:pt-0">
            <div className="max-w-[40rem]">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300 sm:text-xs">For NRIs. For your loved ones.</p>
              <h1 className="font-display text-[2.35rem] font-bold leading-[1.12] sm:text-5xl lg:text-[3.1rem] xl:text-[3.5rem]">
                Care for your property.<br />Care for your parents.<br /><span className="text-sc-gold">Peace of mind for you.</span>
              </h1>
              <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-slate-200 sm:text-lg">
                Sustune Care bridges the anxiety of distance for Global Indians with trusted property stewardship and compassionate elderly care in India.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button href="#pillars" arrow className="px-6 py-3.5">Explore Our Services</Button>
                <button type="button" onClick={() => setVideo(true)} className="group flex items-center gap-3 text-left">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-sc-gold/70 bg-sc-deep/40 text-white transition-colors group-hover:bg-sc-gold group-hover:text-sc-marine"><Play aria-hidden className="h-5 w-5 fill-current" /></span>
                  <span><span className="block text-sm font-semibold">Watch Our Story</span><span className="block text-xs text-slate-300">2 min</span></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Artwork. On phones it is enlarged and centred on the emblem; from tablet up it spans the hero.
            On desktop its width is also capped by the screen height so the stats bar stays in view. */}
        <div className="relative order-2 -mt-4 overflow-hidden md:-mt-14 lg:ml-auto lg:mt-0 lg:w-[min(100%,calc((100svh_-_2rem)*1.777))] lg:min-w-[880px] lg:overflow-visible">
          <Image
            src={HERO_SRC} alt="" width={1672} height={941} priority sizes="(max-width: 768px) 150vw, 100vw"
            className="-ml-[50%] h-auto w-[150%] max-w-none md:ml-0 md:w-full"
            style={{ WebkitMaskImage: FADE, maskImage: FADE, WebkitMaskComposite: 'source-in', maskComposite: 'intersect' }}
          />
        </div>
      </div>

      <ul aria-hidden className="absolute right-8 top-44 z-10 hidden space-y-2 text-right text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300 xl:block">
        <li>Trust</li><li>Safety</li><li>Care</li><li>Always near</li>
      </ul>
      <Modal open={video} onClose={() => setVideo(false)} title="Our story" wide>
        <VideoPlayer src={INTRO_VIDEO} title="Sustune Care: our story" ratio="tall" />
      </Modal>
    </section>
  )
}