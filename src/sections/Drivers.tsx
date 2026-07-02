import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Keyboard, Mousewheel } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import 'swiper/css'
import { DRIVERS } from '@/data/drivers'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionDecor } from '@/components/ui/SectionDecor'
import { SmartImage } from '@/components/ui/SmartImage'
import type { Driver } from '@/types'

function DriverCard({ driver }: { driver: Driver }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-bone/10 bg-carbon transition-colors hover:border-bone/25">
      {/* Portrait */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <SmartImage
          seed={driver.image}
          alt={driver.name}
          duotone
          className="h-full w-full transition-transform duration-[1.2s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/10 to-transparent" />

        {/* Team colour spine */}
        <div className="absolute left-0 top-0 h-full w-1" style={{ background: driver.teamColor }} />

        {/* Giant number */}
        <span
          className="absolute -right-2 top-2 font-display text-8xl font-black leading-none"
          style={{ color: driver.teamColor, opacity: 0.9, WebkitTextStroke: '0px' }}
        >
          {driver.number}
        </span>

        {/* Name block */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">{driver.flag}</span>
            <span className="kicker text-ash">{driver.nationality}</span>
          </div>
          <h3 className="mt-1 font-display text-2xl font-extrabold uppercase leading-none text-bone">
            {driver.name}
          </h3>
          <p className="mt-1 text-sm font-medium" style={{ color: driver.teamColor }}>
            {driver.team}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 divide-x divide-bone/10 border-t border-bone/10">
        {[
          { k: 'Wins', v: driver.stats.wins },
          { k: 'Podiums', v: driver.stats.podiums },
          { k: 'Points', v: driver.stats.points },
          { k: 'Stages', v: driver.stats.stages },
        ].map((s) => (
          <div key={s.k} className="flex flex-col items-center py-3">
            <span className="font-display text-xl font-extrabold tabular-nums text-bone">{s.v}</span>
            <span className="mt-0.5 text-[0.58rem] font-semibold uppercase tracking-wider text-smoke">
              {s.k}
            </span>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="flex items-start gap-3 bg-graphite/60 p-4">
        <Quote className="h-4 w-4 shrink-0 text-molten" />
        <p className="text-xs italic leading-relaxed text-ash">“{driver.quote}”</p>
      </div>
    </article>
  )
}

export function Drivers() {
  const swiperRef = useRef<SwiperClass | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = (s: SwiperClass) => {
    setAtStart(s.isBeginning)
    setAtEnd(s.isEnd)
  }

  return (
    <section id="drivers" className="relative overflow-hidden bg-void py-24 sm:py-32">
      <SectionDecor motif="grid-sm" accent="var(--color-yellow)" ornament="chevrons" glow="br" watermark="24" />
      <div className="relative z-10 mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            index="04"
            kicker="The Grid"
            title={
              <>
                Twenty-four crews.
                <br />
                <span className="text-outline">One champion.</span>
              </>
            }
            intro="The best rally drivers on the planet, chasing the 2026 crown across gravel, tarmac and snow."
          />
          <div className="flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={atStart}
              className="flex h-12 w-12 items-center justify-center border border-bone/15 text-bone transition-colors hover:border-molten hover:text-molten disabled:opacity-30"
              aria-label="Previous driver"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={atEnd}
              className="flex h-12 w-12 items-center justify-center border border-bone/15 text-bone transition-colors hover:border-molten hover:text-molten disabled:opacity-30"
              aria-label="Next driver"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-14 pl-5 sm:pl-8 lg:pl-[max(3rem,calc((100vw-112rem)/2+3rem))]">
        <Swiper
          modules={[Navigation, Keyboard, Mousewheel]}
          onSwiper={(s) => {
            swiperRef.current = s
            sync(s)
          }}
          onSlideChange={sync}
          keyboard={{ enabled: true }}
          grabCursor
          spaceBetween={20}
          slidesPerView={1.15}
          breakpoints={{
            520: { slidesPerView: 1.8 },
            768: { slidesPerView: 2.4 },
            1024: { slidesPerView: 3.3 },
            1440: { slidesPerView: 4.2 },
          }}
          className="!overflow-visible !pr-5"
        >
          {DRIVERS.map((d) => (
            <SwiperSlide key={d.id} className="h-auto">
              <DriverCard driver={d} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
