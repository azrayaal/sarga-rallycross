import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, MessageCircleQuestion } from 'lucide-react'
import { FAQ } from '@/data/faq'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionDecor } from '@/components/ui/SectionDecor'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

function Item({ q, a, category, open, onToggle, index }: {
  q: string
  a: string
  category: string
  open: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className={cn('border-b border-bone/10 transition-colors', open && 'bg-bone/[0.02]')}
    >
      <button onClick={onToggle} className="flex w-full items-start gap-5 py-6 text-left">
        <span className="mt-1 shrink-0 kicker text-molten">{category}</span>
        <span className="flex-1 font-display text-lg font-bold text-bone sm:text-xl">{q}</span>
        <span
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center border border-bone/20 transition-all duration-300',
            open ? 'rotate-45 border-molten bg-molten text-white' : 'text-bone',
          )}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pl-0 text-sm leading-relaxed text-ash sm:pl-[calc(5rem)] sm:text-base">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <SectionDecor motif="diagonal" accent="var(--color-yellow)" ornament="rings" glow="br" />
      <div className="relative z-10 mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              index="09"
              kicker="Good to Know"
              title={
                <>
                  Questions,
                  <br />
                  answered.
                </>
              }
              intro="Everything you need to plan your rally weekend. Still stuck? Our team is on hand."
            />
            <div className="mt-8 flex items-center gap-4 border border-bone/10 bg-carbon p-5">
              <MessageCircleQuestion className="h-8 w-8 shrink-0 text-molten" />
              <div className="flex-1">
                <p className="font-display text-sm font-bold text-bone">Still have a question?</p>
                <p className="text-xs text-smoke">We reply within one business day.</p>
              </div>
              <Button size="sm" variant="outline">
                Contact
              </Button>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="border-t border-bone/10">
            {FAQ.map((f, i) => (
              <Item
                key={f.q}
                {...f}
                index={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
