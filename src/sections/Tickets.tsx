import { motion } from 'framer-motion'
import { Check, Armchair, ArrowRight, Star } from 'lucide-react'
import { TICKETS } from '@/data/tickets'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionDecor } from '@/components/ui/SectionDecor'
import { useUIStore } from '@/store/useUIStore'
import { formatPrice } from '@/utils/format'
import { cn } from '@/utils/cn'
import type { TicketTier } from '@/types'

function TicketCard({ tier, index }: { tier: TicketTier; index: number }) {
  const selectTier = useUIStore((s) => s.selectTier)
  const featured = tier.featured

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative flex flex-col border transition-all duration-500',
        featured
          ? 'border-molten bg-gradient-to-b from-molten/[0.12] to-carbon lg:-my-4 lg:shadow-[0_30px_80px_-30px_rgba(218,41,28,0.5)]'
          : 'border-bone/10 bg-carbon hover:border-bone/30',
      )}
    >
      {featured && (
        <span className="absolute -top-px left-1/2 flex -translate-x-1/2 items-center gap-1.5 bg-molten px-4 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white">
          <Star className="h-3 w-3 fill-white" />
          Most Popular
        </span>
      )}

      <div className="flex flex-col gap-4 p-6 pt-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-extrabold uppercase text-bone">{tier.name}</h3>
            <p className="mt-1 text-xs text-smoke">{tier.period}</p>
          </div>
          <span className="h-8 w-1" style={{ background: tier.accent }} />
        </div>

        <p className="min-h-[2.5rem] text-sm leading-relaxed text-ash">{tier.tagline}</p>

        <div className="flex items-end gap-1">
          <span className="font-display text-5xl font-extrabold tabular-nums text-bone">
            {formatPrice(tier.price, tier.currency)}
          </span>
        </div>

        <div className="flex items-center gap-2 border-y border-bone/10 py-3 text-xs text-ash">
          <Armchair className="h-4 w-4 shrink-0 text-molten" />
          {tier.seat}
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-3 px-6 pb-6">
        {tier.benefits.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm text-ash">
            <Check className={cn('mt-0.5 h-4 w-4 shrink-0', featured ? 'text-molten' : 'text-acid')} />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 p-6 pt-0">
        {/* availability */}
        <div>
          <div className="flex items-center justify-between text-[0.62rem] uppercase tracking-wider text-smoke">
            <span>Availability</span>
            <span className={cn(tier.soldPercent > 80 ? 'text-ember' : 'text-ash')}>
              {tier.soldPercent > 80 ? 'Selling fast' : `${100 - tier.soldPercent}% left`}
            </span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden bg-slate">
            <motion.div
              className="h-full"
              style={{ background: tier.accent }}
              initial={{ width: 0 }}
              whileInView={{ width: `${tier.soldPercent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        <button
          onClick={() => selectTier(tier)}
          className={cn(
            'group/btn flex items-center justify-center gap-2 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-all clip-angle',
            featured
              ? 'bg-molten text-white hover:bg-molten-hot'
              : 'border border-bone/20 text-bone hover:border-molten hover:text-molten',
          )}
        >
          Select {tier.name.split(' ')[0]}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
        </button>
      </div>
    </motion.article>
  )
}


export function Tickets() {
  return (
    <section id="tickets" className="relative overflow-hidden bg-oxblood py-24 sm:py-32">
      <SectionDecor motif="grid" accent="var(--color-crimson)" ornament="checker" glow="both" />
      {/* hazard stripe accent */}
      <div className="hazard-yellow absolute inset-x-0 top-0 z-10 h-2 opacity-80" />

      <div className="relative z-10 mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <SectionHeader
          align="center"
          index="08"
          kicker="Tickets & Hospitality"
          title={
            <>
              Choose how you
              <br />
              <span className="text-gradient-molten">experience the weekend.</span>
            </>
          }
          intro="From roaming the public stages to the trackside Paddock Club — every pass covers all four days of racing."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {TICKETS.map((t, i) => (
            <TicketCard key={t.id} tier={t} index={i} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-smoke">
          Prices in USD. Under-12s enter free in General Admission.{' '}
          <a href="#faq" className="text-molten underline-offset-4 hover:underline">
            See ticketing FAQ
          </a>
        </p>
      </div>
    </section>
  )
}
