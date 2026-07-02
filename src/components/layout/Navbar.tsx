import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Ticket, Flag } from 'lucide-react'
import { NAV_ITEMS } from '@/data/navigation'
import { EVENT } from '@/data/event'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/utils/cn'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const { scrolled, progress } = useScrollProgress()
  const { menuOpen, toggleMenu, closeMenu } = useUIStore()

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-bone/10 bg-ink/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-gradient-to-b from-ink/60 to-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-[112rem] items-center justify-between gap-6 px-5 sm:h-[4.6rem] sm:px-8 lg:px-12">
          <Logo />

          <nav className="hidden items-center gap-8 xl:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ash transition-colors hover:text-bone"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-molten transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Button
                as="a"
                href="#tickets"
                variant="ghost"
                size="sm"
                icon={<Flag className="h-3.5 w-3.5" />}
              >
                Join Event
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button
                as="a"
                href="#tickets"
                variant="primary"
                size="sm"
                icon={<Ticket className="h-3.5 w-3.5 mr-3" />}
              >
                Buy Tickets
              </Button>
            </div>
            <button
              onClick={toggleMenu}
              className="flex h-10 w-10 items-center justify-center border border-bone/15 text-bone transition-colors hover:border-molten hover:text-molten xl:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Scroll progress hairline */}
        <div className="relative h-px w-full bg-transparent">
          <motion.div
            className="h-full origin-left bg-molten"
            style={{ scaleX: progress }}
          />
        </div>
      </header>

      {/* Mobile / tablet full menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-ink/98 backdrop-blur-2xl xl:hidden"
          >
            <div className="grain absolute inset-0" />
            <div className="relative flex flex-1 flex-col justify-center px-8 pt-20">
              <span className="kicker mb-8 text-molten">{EVENT.dateLabel}</span>
              <nav className="flex flex-col">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-baseline gap-4 border-b border-bone/10 py-4"
                  >
                    <span className="font-display text-xs font-bold text-smoke">
                      0{i + 1}
                    </span>
                    <span className="font-display text-3xl font-extrabold uppercase text-bone transition-colors group-hover:text-molten sm:text-4xl">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </nav>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button as="a" href="#tickets" size="md" className="flex-1" icon={<Ticket className="h-4 w-4" />}>
                  Buy Tickets
                </Button>
                <Button as="a" href="#tickets" variant="outline" size="md" className="flex-1">
                  Join Event
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
