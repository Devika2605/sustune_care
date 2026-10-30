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

// Soft bottom pedestal fade
const FADE = 'linear-gradient(to bottom, #000 92%, transparent 100%)'

export function Hero() {
  const [video, setVideo] = useState(false)
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden text-white border-0 m-0 box-border" style={{ background: BACKDROP }}>
      {/* Subtle glow overlay on left to maintain text contrast */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-[5] hidden w-[55%] bg-gradient-to-r from-sc-deep/80 via-sc-deep/30 to-transparent lg:block" />
      
      {/* Content Area: flex: 1, 58% / 42% grid on desktop, vertically centered in space between navbar and stats bar */}
      <div className="relative mx-auto grid w-full max-w-page flex-1 items-center gap-6 xl:gap-10 grid-cols-1 lg:grid-cols-[58%_42%] px-5 sm:px-8 pt-[88px] lg:pt-[92px] min-w-0">
        
        {/* Left Column (58%): Headline, Paragraph, Buttons */}
        <div className="relative z-10 py-2 sm:py-4 min-w-0">
          <div className="max-w-[620px] min-w-0">
            {/* 1. HEADLINE: clamp(2rem, min(3.4vw, 6vh), 3.5rem), nowrap on desktop, line-height 1.15, margin 0 */}
            <h1
              className="font-display font-serif font-bold text-white tracking-tight m-0 p-0 text-[clamp(1.75rem,5.5vw,2.6rem)] lg:text-[clamp(2rem,min(3.4vw,6vh),3.5rem)]"
              style={{ lineHeight: 1.15 }}
            >
              <span className="block m-0 p-0 whitespace-normal lg:whitespace-nowrap">Care for your property.</span>
              <span className="block m-0 p-0 whitespace-normal lg:whitespace-nowrap">Care for your parents.</span>
              <span className="block m-0 p-0 text-sc-gold whitespace-normal lg:whitespace-nowrap">Peace of mind for you.</span>
            </h1>

            {/* 2. PARAGRAPH: clamp(1rem, 1.15vw, 1.15rem), line-height 1.6, max-width 620px, mt: 24px, mb: 28px */}
            <p
              className="mt-[24px] mb-[28px] max-w-[620px] font-normal text-[clamp(1rem,1.15vw,1.15rem)]"
              style={{
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.82)',
              }}
            >
              Sustune Care bridges the anxiety of distance for Global Indians with trusted property stewardship and compassionate elderly care in India.
            </p>

            {/* 3. BUTTONS: height about 56px, 20-24px gap, vertically aligned */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[16px] sm:gap-[24px]">
              <Button
                href="#pillars"
                arrow
                className="h-[56px] min-h-[56px] px-7 text-[15px] sm:text-[16px] font-semibold rounded-lg shadow-md flex items-center justify-center"
              >
                Explore Our Services
              </Button>
              <button
                type="button"
                onClick={() => setVideo(true)}
                className="group flex h-[56px] min-h-[56px] items-center gap-3.5 text-left px-2"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sc-gold/70 bg-sc-deep/60 text-white transition-colors group-hover:bg-sc-gold group-hover:text-sc-marine shadow-md">
                  <Play aria-hidden className="h-4 w-4 fill-current ml-0.5" />
                </span>
                <span>
                  <span className="block text-[15px] sm:text-[16px] font-semibold text-white leading-tight">Watch Our Story</span>
                  <span className="block text-[13px] sm:text-[14px] text-slate-300 leading-tight mt-0.5">2 min</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (42%): Emblem, vertically centered with text block, 100% of column, fully visible */}
        <div className="relative order-2 lg:order-none flex items-center justify-center lg:justify-end w-full py-2 sm:py-4">
          <div className="relative w-full max-w-full flex items-center justify-center">
            <Image
              src={HERO_SRC} alt="Sustune Care emblem" width={1672} height={941} priority sizes="(max-width: 1024px) 100vw, 42vw"
              className="h-auto w-full max-w-full object-contain drop-shadow-2xl"
              style={{ WebkitMaskImage: FADE, maskImage: FADE }}
            />
          </div>
        </div>
      </div>

      {/* Stats bar sitting at the bottom inside hero with 32px space under it */}
      <div className="relative z-20 mt-auto mb-[32px]">
        <StatsBar />
      </div>

      <Modal open={video} onClose={() => setVideo(false)} title="Our story" wide>
        <VideoPlayer src={INTRO_VIDEO} title="Sustune Care: our story" ratio="tall" />
      </Modal>
    </section>
  )
}