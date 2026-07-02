import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Ticket, ChevronRight, MapPin, ArrowDown } from 'lucide-react'
import { EVENT } from '@/data/event'
import { HERO_VIDEO_SOURCES } from '@/utils/assets'
import { VideoBackground } from '@/components/ui/VideoBackground'
import { Countdown } from '@/components/ui/Countdown'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <section ref={ref} id="home" className="relative h-[100svh] min-h-[720px] w-full overflow-hidden">
      {/* Parallax video background */}
      <motion.div style={{ y: yBg, scale }} className="absolute inset-0">
        <VideoBackground sources={HERO_VIDEO_SOURCES} posterSeed="hero-rally" />
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
      <div className="grain absolute inset-0" />

      {/* Content */}
      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 mx-auto flex h-full max-w-[112rem] flex-col justify-end px-5 pb-32 pt-28 sm:pb-36 sm:px-8 lg:px-12"
      >
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <span className="flex items-center gap-2 border border-molten/40 bg-molten/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse bg-molten pulse-ring" />
              <span className="kicker text-molten">{EVENT.edition}</span>
            </span>
            <span className="flex items-center gap-2 text-sm text-ash">
              <MapPin className="h-4 w-4 text-molten" />
              {EVENT.location} — {EVENT.dateLabel}
            </span>
          </motion.div>

          {/* Mega title */}
          <h1 className="text-display text-[15.5vw] leading-[0.82] sm:text-[15vw] lg:text-[12rem] xl:text-[13rem]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-bone"
              >
                SARGA
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="block text-gradient-molten"
              >
                RALLY
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-xl text-base text-ash sm:text-xl"
          >
            {EVENT.tagline}. Four days of gravel, tarmac and floodlit night stages
            where a world championship is won.
          </motion.p>

          {/* Countdown + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}
            className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="flex flex-col gap-3">
              <span className="kicker text-smoke">Lights out in</span>
              <Countdown target={EVENT.startISO} showSeconds={false} />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button as="a" href="#tickets" size="lg" icon={<Ticket className="h-4 w-4" />}>
                Buy Tickets
              </Button>
              <Button as="a" href="#race-weekend" variant="outline" size="lg" icon={<ChevronRight className="h-4 w-4" />}>
                Explore Race
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="kicker text-smoke">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce text-molten" />
      </motion.div>

      {/* Bottom stat marquee ribbon */}
      {/* <div className="absolute inset-x-0 bottom-0 z-10 border-t border-bone/10 bg-ink/60 backdrop-blur-sm">
        <Marquee
          items={HERO_STATS.flatMap((s) => [
            <span className="font-display text-sm font-bold uppercase tracking-wide text-bone">
              {s.value}
              {s.suffix ? ` ${s.suffix}` : ''} <span className="text-molten">{s.label}</span>
            </span>,
          ])}
          className="py-3"
          separator={<span className="mx-8 text-steel">/</span>}
        />
      </div> */}
    </section>
  )
}
