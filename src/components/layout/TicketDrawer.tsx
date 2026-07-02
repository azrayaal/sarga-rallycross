import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Check, ShieldCheck, Ticket } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { EVENT } from '@/data/event'
import { formatPrice } from '@/utils/format'
import { Button } from '@/components/ui/Button'

/** Slide-over cart/checkout summary for the selected ticket tier. */
export function TicketDrawer() {
  const tier = useUIStore((s) => s.cartTier)
  const selectTier = useUIStore((s) => s.selectTier)
  const open = tier !== null

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const fees = tier ? Math.round(tier.price * 0.08) : 0
  const total = tier ? tier.price + fees : 0

  return (
    <AnimatePresence>
      {tier && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => selectTier(null)}
            className="fixed inset-0 z-[70] bg-ink/80 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-[71] flex h-full w-full max-w-md flex-col border-l border-bone/10 bg-carbon"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-bone/10 p-6">
              <div className="flex items-center gap-3">
                <Ticket className="h-5 w-5 text-molten" />
                <span className="kicker text-bone">Your Selection</span>
              </div>
              <button
                onClick={() => selectTier(null)}
                className="flex h-10 w-10 items-center justify-center border border-bone/15 text-bone transition-colors hover:border-molten hover:text-molten"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <span className="h-10 w-1.5" style={{ background: tier.accent }} />
              <h3 className="mt-4 font-display text-3xl font-extrabold uppercase text-bone">{tier.name}</h3>
              <p className="mt-1 text-sm text-molten">{tier.period}</p>

              <div className="mt-6 flex flex-col gap-3 border-y border-bone/10 py-5 text-sm text-ash">
                <div className="flex justify-between">
                  <span className="text-smoke">Event</span>
                  <span className="text-bone">{EVENT.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-smoke">Dates</span>
                  <span className="text-bone">{EVENT.dateLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-smoke">Venue</span>
                  <span className="text-right text-bone">{EVENT.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-smoke">Seating</span>
                  <span className="text-right text-bone">{tier.seat}</span>
                </div>
              </div>

              <span className="mt-6 block kicker text-molten">What's included</span>
              <ul className="mt-3 flex flex-col gap-2.5">
                {tier.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-ash">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* footer / totals */}
            <div className="border-t border-bone/10 p-6">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-ash">
                  <span>Pass price</span>
                  <span>{formatPrice(tier.price, tier.currency)}</span>
                </div>
                <div className="flex justify-between text-ash">
                  <span>Booking fee</span>
                  <span>{formatPrice(fees, tier.currency)}</span>
                </div>
                <div className="mt-2 flex items-baseline justify-between border-t border-bone/10 pt-3">
                  <span className="font-display text-sm font-bold uppercase text-bone">Total</span>
                  <span className="font-display text-3xl font-extrabold text-bone">
                    {formatPrice(total, tier.currency)}
                  </span>
                </div>
              </div>

              <Button size="lg" className="mt-5 w-full" icon={<ArrowRightMini />}>
                Continue to Checkout
              </Button>
              <p className="mt-3 flex items-center justify-center gap-2 text-xs text-smoke">
                <ShieldCheck className="h-3.5 w-3.5 text-acid" />
                Secure checkout — demo only, no charge
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function ArrowRightMini() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  )
}
