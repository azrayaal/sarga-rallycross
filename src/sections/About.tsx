import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Play, ArrowUpRight } from 'lucide-react'
import { ABOUT_STATS } from '@/data/event'
import { TIMELINE } from '@/data/timeline'
import { SmartImage } from '@/components/ui/SmartImage'
import { StatCounter } from '@/components/ui/StatCounter'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionDecor } from '@/components/ui/SectionDecor'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/utils/cn'

function EcosystemStory() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      {/* Editorial copy */}
      <div className="flex flex-col justify-center">
        <SectionHeader
          index="01"
          kicker="Who we are"
          title={
            <>
              We are
              <br />
              <span className="text-outline-molten">SARGA Rallycross.</span>
            </>
          }
        />
        <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-ash md:text-lg">
          <Reveal delay={0.05}>
            <p>
              SARGA Rallycross is an Indonesian motorsport organisation and
              community built around one belief — that rallycross should be for
              everyone. We bring together drivers, teams, engineers and fans
              under a single banner, promoting and running the sport from
              grassroots up to the national stage.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-bone">
              More than a promoter, we are the people who live this sport: a
              home for the next generation of Indonesian talent, a platform that
              turns raw passion into professional racing, and a movement putting
              rallycross firmly on the map.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <a
            href="#race-weekend"
            className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-bone"
          >
            <span className="flex h-11 w-11 items-center justify-center border border-bone/20 transition-colors group-hover:border-molten group-hover:bg-molten">
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </span>
            What we stand for
          </a>
        </Reveal>
      </div>

      {/* Large media with parallax + play affordance */}
      <Reveal delay={0.1} className="relative">
        <div ref={ref} className="relative aspect-[4/5] overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-[-8%]">
            <SmartImage seed="about-hero" alt="SARGA Rally car mid-stage" duotone className="h-full w-full" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

          {/* Floating play button */}
          <button className="group absolute left-6 top-6 flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-bone/30 bg-ink/40 backdrop-blur-md transition-all group-hover:border-molten group-hover:bg-molten">
              <Play className="h-5 w-5 fill-bone text-bone transition-colors group-hover:fill-white" />
            </span>
            <span className="kicker text-bone">Watch our story</span>
          </button>

          {/* Corner caption */}
          <div className="absolute bottom-6 left-6 right-6">
            <span className="kicker text-molten">Est. 2016</span>
            <p className="mt-2 font-display text-2xl font-extrabold text-bone">
              By racers, for racers.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function StatBand() {
  return (
    <div className="mt-24 border-y border-bone/10 py-14">
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
        {ABOUT_STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <StatCounter
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              hint={s.hint}
              decimals={s.value % 1 !== 0 ? 1 : 0}
            />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

function InteractiveTimeline() {
  const [active, setActive] = useState(TIMELINE.length - 1)
  const entry = TIMELINE[active]

  return (
    <div className="mt-24">
      <SectionHeader index="02" kicker="History & Vision" title="A decade in the dirt" />

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Year rail */}
        <div className="flex flex-col">
          {TIMELINE.map((t, i) => {
            const isActive = i === active
            return (
              <button
                key={t.year}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  'group relative flex items-center gap-6 border-b border-bone/10 py-5 text-left transition-colors',
                  isActive ? 'text-bone' : 'text-smoke hover:text-ash',
                )}
              >
                <span
                  className={cn(
                    'font-display text-3xl font-extrabold tabular-nums transition-colors sm:text-4xl',
                    isActive ? 'text-molten' : 'text-inherit',
                  )}
                >
                  {t.year}
                </span>
                <span className="font-display text-xl font-bold uppercase tracking-tight sm:text-2xl">
                  {t.title}
                </span>
                <motion.span
                  className="ml-auto h-px bg-molten"
                  animate={{ width: isActive ? 40 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </button>
            )
          })}
        </div>

        {/* Active panel */}
        <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={entry.year}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <SmartImage seed={entry.image ?? 'timeline'} alt={entry.title} duotone className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="font-display text-6xl font-extrabold text-molten/90 sm:text-7xl">
                  {entry.year}
                </span>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-bone sm:text-3xl">
                  {entry.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ash sm:text-base">
                  {entry.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <SectionDecor motif="dots" accent="var(--color-crimson)" ornament="rings" glow="tl" />
      <div className="relative z-10 mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <EcosystemStory />
        <StatBand />
        <InteractiveTimeline />
      </div>
    </section>
  )
}
