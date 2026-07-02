import type { Stat } from '@/types'

/** Master event metadata. In production this would come from a CMS endpoint. */
export const EVENT = {
  name: 'SARGA Rally',
  edition: 'Round 07 — Grand Finale',
  season: '2026 World Series',
  tagline: 'Experience the Ultimate Rally Weekend',
  location: 'Sentul Highlands Circuit',
  region: 'West Java, Indonesia',
  /** Lights-out for the countdown. */
  startISO: '2026-11-13T18:00:00+07:00',
  dateLabel: '13—16 November 2026',
  round: 7,
  totalRounds: 12,
}

export const HERO_STATS: Stat[] = [
  { value: 62, suffix: 'KM', label: 'Special Stages' },
  { value: 4, label: 'Days of Racing' },
  { value: 24, label: 'Works Drivers' },
]

export const ABOUT_STATS: Stat[] = [
  { value: 12, label: 'Championship Rounds', hint: 'across four continents' },
  { value: 24, label: 'Works Drivers', hint: 'from 11 nations' },
  { value: 9, label: 'Factory Teams', hint: 'Rally1 & Rally2 class' },
  { value: 18, label: 'Host Countries', hint: 'gravel, tarmac & snow' },
  { value: 2.4, suffix: 'M', label: 'Trackside Spectators', hint: 'season attendance' },
]
