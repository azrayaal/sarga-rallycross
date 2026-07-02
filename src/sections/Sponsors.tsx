import { motion } from 'framer-motion'
import { SPONSORS } from '@/data/sponsors'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionDecor } from '@/components/ui/SectionDecor'
import { Marquee } from '@/components/ui/Marquee'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/utils/cn'

function LogoMark({ name, size = 'md' }: { name: string; size?: 'lg' | 'md' | 'sm' }) {
  return (
    <span
      className={cn(
        'font-display font-black uppercase tracking-tight text-ash/60 transition-colors duration-300 hover:text-bone',
        size === 'lg' && 'text-4xl sm:text-5xl',
        size === 'md' && 'text-2xl sm:text-3xl',
        size === 'sm' && 'text-xl',
      )}
    >
      {name}
    </span>
  )
}

export function Sponsors() {
  const title = SPONSORS.find((s) => s.tier === 'Title')
  const global = SPONSORS.filter((s) => s.tier === 'Global')
  const wall = SPONSORS.filter((s) => s.tier === 'Official' || s.tier === 'Technical')

  return (
    <section id="sponsors" className="relative overflow-hidden border-y border-bone/10 bg-teal-night py-24 sm:py-28">
      <SectionDecor motif="dots" accent="var(--color-teal)" glow="tl" />
      <div className="relative z-10 mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <SectionHeader
          align="center"
          index="08"
          kicker="Partners & Sponsors"
          title="Powered by the best in the paddock"
          intro="Backed by Indonesia's biggest brands — fuelling the championship, the technology and the show."
        />

        {/* Title partner spotlight */}
        {title && (
          <Reveal className="mt-14">
            <div className="relative flex flex-col items-center gap-3 border border-bone/10 bg-carbon/40 py-12">
              <div className="grain absolute inset-0" />
              <span className="relative kicker text-molten">Title Partner</span>
              <span className="relative font-display text-5xl font-black uppercase tracking-tight text-bone sm:text-7xl">
                {title.name}
              </span>
            </div>
          </Reveal>
        )}

        {/* Global partners */}
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-4">
          {global.concat(global).slice(0, 4).map((s, i) => (
            <motion.div
              key={s.name + i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center justify-center bg-void py-10"
            >
              <LogoMark name={s.name} size="lg" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee wall of official + technical partners */}
      <div className="relative z-10 mt-12 border-y border-bone/10 py-8">
        <Marquee
          items={wall.map((s) => <LogoMark name={s.name} size="md" />)}
          separator={<span className="mx-10 text-steel">◆</span>}
        />
      </div>
      <div className="relative z-10 mt-4">
        <Marquee
          slow
          items={[...wall].reverse().map((s) => <LogoMark name={s.name} size="sm" />)}
          separator={<span className="mx-8 text-steel">/</span>}
        />
      </div>
    </section>
  )
}
