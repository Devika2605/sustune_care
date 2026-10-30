'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { VideoPlayer } from '@/components/ui/VideoPlayer'
import { HERO_IMAGE, INTRO_VIDEO } from '@/lib/config'
import { StatsBar } from '@/components/home/StatsBar'

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

// Fade the left edge more aggressively (wider fade keeps artwork away from nav/copy) and fade the bottom edge.
const FADE = 'linear-gradient(to right, transparent 0%, #000 22%), linear-gradient(to bottom, #000 88%, transparent 100%)'

export function Hero() {
  const [video, setVideo] = useState(false)
  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden text-white pb-16 lg:pb-20 border-0 m-0" style={{ background: BACKDROP }}>
      {/* Keeps the headline readable where it crosses the arch. Sits above the artwork, below the copy, and runs the full height so it leaves no edge. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-[5] hidden w-[62%] bg-gradient-to-r from-sc-deep/75 via-sc-deep/40 to-transparent lg:block" />
      <div className="relative mx-auto flex w-full max-w-[1800px] flex-1 flex-col lg:block">
        {/* Copy: Explicit top padding pt-36 md:pt-44 keeps text well below the absolute Navbar */}
        <div className="relative z-10 order-1">
          <div className="relative mx-auto w-full max-w-page px-5 pt-36 sm:px-8 md:pt-44">
            <div className="max-w-2xl">
              <h1 className="font-serif font-display text-3xl font-semibold leading-[1.3] text-white md:text-4xl lg:text-[40px]">
                Sustune Care bridges the anxiety of distance for Global Indians with trusted property stewardship and compassionate elderly care in India.
              </h1>
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button href="#pillars" arrow className="px-6 py-3.5 text-base">Explore Our Services</Button>
                <button type="button" onClick={() => setVideo(true)} className="group flex items-center gap-3 text-left">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-sc-gold/70 bg-sc-deep/40 text-white transition-colors group-hover:bg-sc-gold group-hover:text-sc-marine"><Play aria-hidden className="h-5 w-5 fill-current" /></span>
                  <span><span className="block text-sm font-semibold">Watch Our Story</span><span className="block text-xs text-slate-300">2 min</span></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Artwork: image wrapper with mt-12 lg:mt-20, staying below navbar and Talk to Us button */}
        <div className="relative order-2 mx-auto mt-12 w-full max-w-[520px] overflow-hidden md:max-w-[640px] lg:absolute lg:right-0 lg:top-0 lg:mt-20 lg:w-[48%] lg:max-w-[700px] xl:w-[46%] xl:max-w-[740px] lg:overflow-visible">
          <Image
            src={HERO_SRC} alt="Sustune Care emblem" width={1672} height={941} priority sizes="(max-width: 1024px) 100vw, 48vw"
            className="h-auto w-full object-contain"
            style={{ WebkitMaskImage: FADE, maskImage: FADE, WebkitMaskComposite: 'source-in', maskComposite: 'intersect' }}
          />
        </div>
      </div>

      {/* Stats bar cleanly positioned inside the dark navy hero section */}
      <div className="relative z-20 mt-auto pt-10 sm:pt-14 lg:pt-16">
        <StatsBar />
      </div>

      <Modal open={video} onClose={() => setVideo(false)} title="Our story" wide>
        <VideoPlayer src={INTRO_VIDEO} title="Sustune Care: our story" ratio="tall" />
      </Modal>
    </section>
  )
}