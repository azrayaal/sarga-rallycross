import { motion } from 'framer-motion'
import { MapPin, ArrowRight, ArrowUpRight } from 'lucide-react'
import { EVENTS, EVENTS_URL } from '@/data/events'
import { useCountdown } from '@/hooks/useCountdown'
import { pad } from '@/utils/format'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionDecor } from '@/components/ui/SectionDecor'
import { SmartImage } from '@/components/ui/SmartImage'
import { cn } from '@/utils/cn'
import type { EventItem, EventStatus } from '@/types'

const STATUS: Record<EventStatus, { label: string; className: string }> = {
  open: { label: 'Registration Open', className: 'bg-emerald-500 text-white' },
  fast: { label: 'Selling Fast', className: 'bg-amber-400 text-ink' },
  soon: { label: 'Coming Soon', className: 'bg-steel text-ash' },
}

function MiniCountdown({ target }: { target: string }) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(target)
  if (isComplete) {
    return <span className="font-display text-sm font-bold uppercase text-molten">Happening now</span>
  }
  const cells = [
    { v: days, l: 'Days' },
    { v: hours, l: 'Hrs' },
    { v: minutes, l: 'Min' },
    { v: seconds, l: 'Sec' },
  ]
  return (
    <div className="flex items-start gap-4">
      {cells.map((c) => (
        <div key={c.l} className="flex flex-col items-start">
          <span className="font-display text-xl font-extrabold tabular-nums leading-none text-bone">
            {c.l === 'Days' ? c.v : pad(c.v)}
          </span>
          <span className="mt-1 text-[0.55rem] font-semibold uppercase tracking-wider text-smoke">{c.l}</span>
        </div>
      ))}
    </div>
  )
}

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const status = STATUS[event.status]
  return (
    <motion.a
      href={event.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden border border-bone/10 bg-carbon transition-all duration-500 hover:border-molten/50"
    >
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          seed={event.image}
          alt={event.title}
          className="h-full w-full transition-transform duration-[1.2s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />

        {/* Category badge */}
        <span
          className="absolute left-4 top-4 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white"
          style={{ backgroundColor: event.categoryColor }}
        >
          {event.category}
        </span>

        {/* Status badge */}
        <span className={cn('absolute right-4 top-4 px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.12em]', status.className)}>
          {status.label}
        </span>

        {/* Date chip */}
        <span className="absolute bottom-4 left-4 bg-ink/80 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-wider text-bone backdrop-blur-sm">
          {event.dateLabel}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="font-display text-xl font-extrabold uppercase leading-tight text-bone transition-colors group-hover:text-molten">
            {event.title}
          </h3>
          <span className="mt-2 flex items-center gap-2 text-xs text-ash">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-molten" />
            {event.location}
          </span>
        </div>

        <div className="mt-auto">
          <MiniCountdown target={event.startISO} />
        </div>

        <div className="flex items-center justify-between border-t border-bone/10 pt-4">
          <div className="flex flex-col">
            <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-smoke">From</span>
            <span className="font-display text-lg font-extrabold text-molten">{event.priceLabel}</span>
          </div>
          <span className="flex h-10 w-10 items-center justify-center border border-bone/20 text-bone transition-colors group-hover:border-molten group-hover:bg-molten group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.a>
  )
}

export function RaceWeekend() {
  return (
    <section id="race-weekend" className="relative overflow-hidden bg-abyss py-24 sm:py-32">
      <SectionDecor motif="grid" accent="var(--color-blue)" ornament="chevrons" glow="br" watermark="26" />

      <div id="events" className="relative z-10 mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            index="03"
            kicker="SARGA Ecosystem"
            title={
              <>
                Every event.
                <br />
                One ecosystem.
              </>
            }
            intro="Register, grab tickets and relive the highlights — horse racing, rallycross and motorsport, all in one place."
          />
          <a
            href={EVENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-3 border border-bone/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-bone transition-colors hover:border-molten hover:text-molten"
          >
            See all events
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>

        <div id="schedule" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
