import type { Experience } from '@/types'

export const EXPERIENCES: Experience[] = [
  {
    id: 'rally-village',
    index: '01',
    name: 'Rally Village',
    tagline: 'The beating heart of the weekend',
    description:
      'A living paddock town of teams, makers and music. Wander the open service park, watch mechanics rebuild a Rally1 car in ninety seconds, then lose the evening to the main-stage line-up.',
    tags: ['Open Access', 'Live Music', 'Service Park'],
    image: 'exp-village',
    cta: 'Explore the Village',
  },
  {
    id: 'fan-zone',
    index: '02',
    name: 'Fan Zone',
    tagline: 'Closer than the barriers allow',
    description:
      'Autograph sessions, driver Q&As and the trophy wall. Get your pace-note book signed and stand where the crews stage before every run.',
    tags: ['Autographs', 'Driver Talks', 'Family'],
    image: 'exp-fanzone',
    cta: 'Meet the Drivers',
  },
  {
    id: 'simulator',
    index: '03',
    name: 'Simulator Zone',
    tagline: 'Drive the stage yourself',
    description:
      'Twelve motion rigs running the exact stage geometry the pros face. Set a time on the leaderboard and the fastest amateur of the weekend rides shotgun on Sunday.',
    tags: ['Motion Rigs', 'Leaderboard', 'Esports'],
    image: 'exp-sim',
    cta: 'Set a Lap Time',
  },
  {
    id: 'vip-lounge',
    index: '04',
    name: 'VIP Lounge',
    tagline: 'The view from above the action',
    description:
      'An elevated glass terrace over the super-special stage. Chef-led dining, an open cellar and a live timing wall — hospitality with the engines still howling below.',
    tags: ['Fine Dining', 'Terrace', 'Concierge'],
    image: 'exp-vip',
    cta: 'Reserve the Lounge',
  },
  {
    id: 'pit-experience',
    index: '05',
    name: 'Pit Experience',
    tagline: 'Inside the garage doors',
    description:
      'A guided walk through a factory service bay during a live tyre change. Feel the heat, hear the impact guns, and stand on the marks with the crew chief.',
    tags: ['Guided', 'Behind Scenes', 'Limited'],
    image: 'exp-pit',
    cta: 'Go Behind the Ropes',
  },
  {
    id: 'food',
    index: '06',
    name: 'Food Experience',
    tagline: 'Fuel worthy of the finish line',
    description:
      'Thirty regional kitchens and a night market that runs until the last stage light fades. Highland coffee, open-flame satay and a champagne bar at parc fermé.',
    tags: ['Night Market', 'Regional', 'Bars'],
    image: 'exp-food',
    cta: 'See the Menu',
  },
]
