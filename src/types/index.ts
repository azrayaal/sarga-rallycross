/**
 * SARGA Rally — Domain types.
 * Kept intentionally close to a future REST/GraphQL contract so the
 * static `data/` layer can be swapped for network fetches without
 * touching component code.
 */

export interface NavItem {
  label: string
  href: string
}

export interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
  hint?: string
}

export interface TimelineEntry {
  year: string
  title: string
  description: string
  image?: string
}

export type RaceDayStatus = 'upcoming' | 'live' | 'done'

export interface RaceDay {
  id: string
  day: string // "FRI"
  date: string // "14 NOV"
  phase: string // "Practice Day"
  title: string
  description: string
  sessions: { time: string; label: string }[]
  venue: string
  status: RaceDayStatus
  image: string
}

export interface Experience {
  id: string
  index: string
  name: string
  tagline: string
  description: string
  tags: string[]
  image: string
  cta: string
}

export interface Driver {
  id: string
  number: string
  name: string
  team: string
  teamColor: string
  nationality: string
  flag: string
  image: string
  stats: {
    wins: number
    podiums: number
    points: number
    stages: number
  }
  quote: string
}

export interface StandingRow {
  position: number
  name: string
  team?: string
  nationality?: string
  flag?: string
  points: number
  wins: number
  delta: number // change vs previous round
  color: string
}

export type MediaCategory =
  | 'Highlights'
  | 'Behind The Scenes'
  | 'Interviews'
  | 'Shorts'
  | 'Gallery'

export interface MediaItem {
  id: string
  title: string
  category: MediaCategory
  duration: string
  thumbnail: string
  videoUrl?: string
  featured?: boolean
}

export interface TicketTier {
  id: string
  name: string
  price: number
  currency: string
  period: string
  seat: string
  tagline: string
  benefits: string[]
  featured?: boolean
  soldPercent: number
  accent: string
}

export interface Sponsor {
  name: string
  tier: 'Title' | 'Global' | 'Official' | 'Technical'
}

export interface FaqItem {
  q: string
  a: string
  category: string
}

export interface NewsItem {
  id: string
  title: string
  category: string
  date: string
  excerpt: string
  image: string
  href: string
  featured?: boolean
}

export interface InstaPost {
  id: string
  caption: string
  image: string
  likes: number
  comments: number
  isReel?: boolean
  href: string
}

export type EventStatus = 'open' | 'fast' | 'soon'

export interface EventItem {
  id: string
  title: string
  category: string
  categoryColor: string
  status: EventStatus
  dateLabel: string
  startISO: string
  location: string
  priceLabel: string
  image: string
  href: string
}
