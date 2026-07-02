import { useState } from 'react'
import { Instagram, Youtube, Twitter, Facebook, ArrowRight, MapPin, Mail } from 'lucide-react'
import { EVENT } from '@/data/event'
import { Logo } from '@/components/ui/Logo'
import { Marquee } from '@/components/ui/Marquee'

const ECOSYSTEM = [
  { label: 'Race Weekend', href: '#race-weekend' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Drivers', href: '#drivers' },
  { label: 'Championship', href: '#leaderboard' },
  { label: 'Media Hub', href: '#media' },
]
const VISIT = [
  { label: 'Tickets', href: '#tickets' },
  { label: 'Hospitality', href: '#tickets' },
  { label: 'Getting There', href: '#faq' },
  { label: 'Accessibility', href: '#faq' },
  { label: 'FAQ', href: '#faq' },
]
const CONNECT = [
  { label: 'Partners', href: '#sponsors' },
  { label: 'Careers', href: '#' },
  { label: 'Press Office', href: '#' },
  { label: 'Volunteer', href: '#' },
  { label: 'Contact', href: '#' },
]

const SOCIALS = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Twitter, label: 'X' },
  { icon: Facebook, label: 'Facebook' },
]

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="kicker text-molten">{title}</span>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-ash transition-colors hover:text-bone"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-void">
      {/* Big marquee band */}
      <div className="border-b border-bone/10 py-6">
        <Marquee
          slow
          items={Array.from({ length: 6 }).map(() => (
            <span className="text-outline text-4xl font-extrabold uppercase sm:text-6xl">
              SARGA Rally
            </span>
          ))}
          separator={<span className="mx-6 text-molten">◆</span>}
        />
      </div>

      <div className="mx-auto max-w-[112rem] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-ash">
              The premium rally destination. Sport, spectacle and stage — brought
              together for one unforgettable weekend in the highlands.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email) setSent(true)
              }}
              className="mt-2"
            >
              <span className="kicker text-smoke">Get race-week intel</span>
              <div className="mt-3 flex items-center border border-bone/15 bg-carbon focus-within:border-molten">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full bg-transparent px-4 py-3 text-sm text-bone placeholder:text-smoke focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-full items-center justify-center bg-molten px-4 py-3.5 text-white transition-colors hover:bg-molten-hot"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {sent && (
                <p className="mt-2 text-xs text-acid">You’re on the grid. Check your inbox.</p>
              )}
            </form>
          </div>

          <Column title="Ecosystem" links={ECOSYSTEM} />
          <Column title="Visit" links={VISIT} />
          <Column title="Connect" links={CONNECT} />
        </div>

        {/* Contact + socials */}
        <div className="mt-14 flex flex-col gap-8 border-t border-bone/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
            <span className="flex items-center gap-2 text-sm text-ash">
              <MapPin className="h-4 w-4 text-molten" />
              {EVENT.location}, {EVENT.region}
            </span>
            <span className="flex items-center gap-2 text-sm text-ash">
              <Mail className="h-4 w-4 text-molten" />
              hello@sargarally.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center border border-bone/15 text-ash transition-all hover:border-molten hover:text-molten"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 SARGA Rally. All rights reserved. A fictional showcase.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-ash">Privacy</a>
            <a href="#" className="hover:text-ash">Terms</a>
            <a href="#" className="hover:text-ash">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
