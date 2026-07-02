import type { StandingRow } from '@/types'

export const DRIVER_STANDINGS: StandingRow[] = [
  { position: 1, name: 'Reza Adnan', team: 'SARGA Works', nationality: 'IDN', flag: '🇮🇩', points: 268, wins: 14, delta: 0, color: '#da291c' },
  { position: 2, name: 'Lena Hovda', team: 'Nordkraft', nationality: 'NOR', flag: '🇳🇴', points: 251, wins: 12, delta: 1, color: '#3b82f6' },
  { position: 3, name: 'Mateo Rossi', team: 'Aterra', nationality: 'ITA', flag: '🇮🇹', points: 214, wins: 9, delta: -1, color: '#ffcd00' },
  { position: 4, name: 'Amara Diallo', team: 'Sahara', nationality: 'SEN', flag: '🇸🇳', points: 199, wins: 8, delta: 2, color: '#22c55e' },
  { position: 5, name: 'Kenji Mori', team: 'Tokamak', nationality: 'JPN', flag: '🇯🇵', points: 188, wins: 7, delta: 0, color: '#a855f7' },
  { position: 6, name: 'Sofia Marín', team: 'Rioja', nationality: 'ESP', flag: '🇪🇸', points: 171, wins: 6, delta: 1, color: '#ef4444' },
  { position: 7, name: 'Noah Fischer', team: 'Alpenwerk', nationality: 'DEU', flag: '🇩🇪', points: 158, wins: 5, delta: -2, color: '#00a9ce' },
  { position: 8, name: 'Ayla Demir', team: 'Bosphorus', nationality: 'TUR', flag: '🇹🇷', points: 142, wins: 4, delta: 0, color: '#f23325' },
]

export const TEAM_STANDINGS: StandingRow[] = [
  { position: 1, name: 'SARGA Works Motorsport', points: 441, wins: 19, delta: 0, color: '#da291c' },
  { position: 2, name: 'Nordkraft Rally', points: 402, wins: 15, delta: 1, color: '#3b82f6' },
  { position: 3, name: 'Scuderia Aterra', points: 358, wins: 12, delta: -1, color: '#ffcd00' },
  { position: 4, name: 'Sahara Dynamics', points: 311, wins: 10, delta: 0, color: '#22c55e' },
  { position: 5, name: 'Tokamak Racing', points: 289, wins: 8, delta: 2, color: '#a855f7' },
  { position: 6, name: 'Rioja Rallye Team', points: 254, wins: 7, delta: -1, color: '#ef4444' },
]
