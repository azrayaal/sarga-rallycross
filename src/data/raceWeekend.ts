import type { RaceDay } from '@/types'

export const RACE_WEEKEND: RaceDay[] = [
  {
    id: 'shakedown',
    day: 'FRI',
    date: '13 NOV',
    phase: 'Shakedown & Practice',
    title: 'Reconnaissance Day',
    description:
      'Crews run the shakedown stage back-to-back, dialling in suspension and pace notes before the clock goes live. First look at the machinery in anger.',
    sessions: [
      { time: '09:00', label: 'Service Park Opens' },
      { time: '13:30', label: 'Shakedown Stage' },
      { time: '17:00', label: 'Ceremonial Start' },
    ],
    venue: 'Highlands Service Park',
    status: 'upcoming',
    image: 'weekend-practice',
  },
  {
    id: 'qualifying',
    day: 'SAT',
    date: '14 NOV',
    phase: 'Qualifying',
    title: 'Stage Rush',
    description:
      'Six timed special stages set the running order. Every tenth counts as drivers fight for road position and the coveted power-stage bonus points.',
    sessions: [
      { time: '08:15', label: 'SS1 — Ridgeline' },
      { time: '11:40', label: 'SS3 — Volcano Pass' },
      { time: '15:20', label: 'Super Special (Arena)' },
    ],
    venue: 'North Loop — Gravel',
    status: 'upcoming',
    image: 'weekend-qualifying',
  },
  {
    id: 'race-day',
    day: 'SUN',
    date: '15 NOV',
    phase: 'Race Day',
    title: 'The Long Loop',
    description:
      'The marathon leg. Ten stages, 210 competitive kilometres and a single service window. Tyre strategy and nerve decide who survives to Sunday night.',
    sessions: [
      { time: '07:30', label: 'SS8 — Canyon' },
      { time: '12:00', label: 'Remote Service' },
      { time: '16:45', label: 'SS15 — Night Stage' },
    ],
    venue: 'Grand Loop — Mixed',
    status: 'upcoming',
    image: 'weekend-race',
  },
  {
    id: 'final',
    day: 'MON',
    date: '16 NOV',
    phase: 'Final Event',
    title: 'Power Stage & Podium',
    description:
      'The season finale. A single, televised power stage under lights crowns the champion, followed by the fireworks podium and the closing Rally Village concert.',
    sessions: [
      { time: '14:00', label: 'Power Stage (Live)' },
      { time: '16:30', label: 'Champion Podium' },
      { time: '19:00', label: 'Finale Concert' },
    ],
    venue: 'Main Arena — Floodlit',
    status: 'upcoming',
    image: 'weekend-final',
  },
]
