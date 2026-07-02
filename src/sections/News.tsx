import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Calendar } from 'lucide-react'
import { NEWS, NEWS_PORTAL_URL } from '@/data/news'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionDecor } from '@/components/ui/SectionDecor'
import { SmartImage } from '@/components/ui/SmartImage'
import type { NewsItem } from '@/types'

function FeaturedCard({ item }: { item: NewsItem }) {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden border border-bone/10 bg-carbon transition-colors hover:border-molten/50"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          seed={item.image}
          alt={item.title}
          className="h-full w-full transition-transform duration-[1.2s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/20 to-transparent" />
        <span className="absolute left-4 top-4 kicker bg-molten px-2.5 py-1 text-white">{item.category}</span>
        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-bone/30 bg-ink/40 backdrop-blur-md transition-all group-hover:border-molten group-hover:bg-molten">
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="flex items-center gap-2 text-xs text-smoke">
          <Calendar className="h-3.5 w-3.5 text-molten" />
          {item.date}
        </span>
        <h3 className="font-display text-2xl font-extrabold leading-tight text-bone sm:text-3xl">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-ash">{item.excerpt}</p>
      </div>
    </motion.a>
  )
}

function ListItem({ item, index }: { item: NewsItem; index: number }) {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group flex gap-4 border-b border-bone/10 py-4 first:pt-0"
    >
      <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden sm:h-24 sm:w-24">
        <SmartImage seed={item.image} alt={item.title} duotone className="h-full w-full transition-transform duration-700 group-hover:scale-110" />
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-1.5">
        <div className="flex items-center gap-3">
          <span className="kicker text-molten">{item.category}</span>
          <span className="text-xs text-smoke">{item.date}</span>
        </div>
        <h4 className="line-clamp-2 font-display text-base font-bold leading-snug text-bone transition-colors group-hover:text-molten sm:text-lg">
          {item.title}
        </h4>
      </div>
    </motion.a>
  )
}

export function News() {
  const featured = NEWS.find((n) => n.featured) ?? NEWS[0]
  const rest = NEWS.filter((n) => n.id !== featured.id).slice(0, 5)

  return (
    <section id="news" className="relative overflow-hidden bg-void py-24 sm:py-32">
      <SectionDecor motif="vlines" accent="var(--color-crimson)" ornament="rings" glow="tl" />

      <div className="relative z-10 mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            index="07"
            kicker="From the Paddock"
            title={
              <>
                Latest news
                <br />
                <span className="text-gradient-molten">&amp; stories.</span>
              </>
            }
            intro="Reports, results and features straight from the SARGA newsroom."
          />
          <a
            href={NEWS_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-3 border border-bone/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-bone transition-colors hover:border-molten hover:text-molten"
          >
            See all news
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <FeaturedCard item={featured} />
          <div className="flex flex-col">
            {rest.map((item, i) => (
              <ListItem key={item.id} item={item} index={i} />
            ))}
            <a
              href={NEWS_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.14em] text-molten"
            >
              Read more on news.sarga.co
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
