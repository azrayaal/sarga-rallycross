import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { TicketDrawer } from '@/components/layout/TicketDrawer'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { RaceWeekend } from '@/sections/RaceWeekend'
import { Drivers } from '@/sections/Drivers'
import { Leaderboard } from '@/sections/Leaderboard'
import { Media } from '@/sections/Media'
import { News } from '@/sections/News'
import { Sponsors } from '@/sections/Sponsors'
import { Faq } from '@/sections/Faq'
import { JoinCTA } from '@/sections/JoinCTA'

export function HomePage() {
  return (
    <div className="relative min-h-screen bg-ink">
      <Navbar />
      <main>
        <Hero />
        <About />
        <RaceWeekend />
        <Drivers />
        <Leaderboard />
        <Media />
        <News />
        {/* <Tickets /> */}
        <Sponsors />
        <Faq />
        <JoinCTA />
      </main>
      <Footer />
      <TicketDrawer />
    </div>
  )
}
