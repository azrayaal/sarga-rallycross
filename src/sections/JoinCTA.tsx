import { motion } from 'framer-motion'
import { Ticket, Flag } from 'lucide-react'
import { EVENT } from '@/data/event'
import { Countdown } from '@/components/ui/Countdown'
import { Button } from '@/components/ui/Button'
import { SmartImage } from '@/components/ui/SmartImage'

export function JoinCTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0">
        <SmartImage seed="cta-grid" alt="" duotone className="h-full w-full" />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink" />
        <div className="motif-grid absolute inset-0 opacity-60" />
        <div
          className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, var(--color-crimson) 0%, transparent 62%)' }}
        />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative mx-auto flex max-w-[112rem] flex-col items-center px-5 py-28 text-center sm:px-8 sm:py-36 lg:px-12">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kicker text-molten"
        >
          {EVENT.dateLabel} — {EVENT.region}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-4xl text-display text-5xl leading-[0.9] sm:text-7xl lg:text-8xl"
        >
          Don't watch the season end.
          <span className="block text-gradient-molten">Be there when it does.</span>
        </motion.h2>

        <p className="mt-6 max-w-xl text-base text-ash sm:text-lg">
          The 2026 title is decided under the highland floodlights. Secure your
          place before the gates — and the grid — fill up.
        </p>

        <div className="mt-10">
          <Countdown target={EVENT.startISO} showSeconds={false} className="justify-center" />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button as="a" href="#tickets" size="lg" icon={<Ticket className="h-4 w-4" />}>
            Buy Tickets
          </Button>
          <Button as="a" href="#tickets" variant="outline" size="lg" icon={<Flag className="h-4 w-4" />}>
            Join the Event
          </Button>
        </div>
      </div>
    </section>
  )
}
