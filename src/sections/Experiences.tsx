import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { EXPERIENCES } from '@/data/experiences'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionDecor } from '@/components/ui/SectionDecor'
import { SmartImage } from '@/components/ui/SmartImage'
import { cn } from '@/utils/cn'
import type { Experience } from '@/types'

function ExperienceRow({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const reversed = index % 2 === 1

  return (
    <div
      ref={ref}
      className={cn(
        'group grid items-center gap-8 lg:grid-cols-2 lg:gap-16',
        reversed && 'lg:[direction:rtl]',
      )}
    >
      {/* Visual */}
      <div className="relative aspect-[4/3] overflow-hidden lg:[direction:ltr]">
        <motion.div style={{ y }} className="absolute inset-[-12%]">
          <SmartImage seed={exp.image} alt={exp.name} duotone className="h-full w-full" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        <span className="absolute right-5 top-5 font-display text-7xl font-black text-bone/10">
          {exp.index}
        </span>
      </div>

      {/* Copy */}
      <div className="flex flex-col lg:[direction:ltr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-bold text-molten">{exp.index}</span>
            <span className="h-px w-8 bg-molten" />
            <span className="kicker text-ash">Experience Zone</span>
          </div>
          <h3 className="mt-5 text-display text-4xl leading-none sm:text-5xl">{exp.name}</h3>
          <p className="mt-3 font-display text-lg font-medium text-molten">{exp.tagline}</p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ash">{exp.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {exp.tags.map((t) => (
              <span key={t} className="border border-bone/15 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-ash">
                {t}
              </span>
            ))}
          </div>

          <a
            href="#tickets"
            className="group/cta mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-bone"
          >
            <span className="flex h-11 w-11 items-center justify-center border border-bone/20 transition-colors group-hover/cta:border-molten group-hover/cta:bg-molten">
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:rotate-45" />
            </span>
            {exp.cta}
          </a>
        </motion.div>
      </div>
    </div>
  )
}



export function Experiences() {
  return (
    <section id="experiences" className="relative overflow-hidden bg-teal-night py-24 sm:py-32">
      <SectionDecor motif="diagonal" accent="var(--color-teal)" ornament="contour" glow="tl" />
      <div className="relative z-10 mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="04"
          kicker="Experience Zones"
          title={
            <>
              More than a race.
              <br />
              <span className="text-gradient-molten">A weekend to live in.</span>
            </>
          }
          intro="Eight worlds inside the circuit gates. Wander the Rally Village, set a time in the simulator zone, or watch the sport unfold from the VIP terrace."
        />

        <div className="mt-20 flex flex-col gap-24 lg:gap-32">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceRow key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
