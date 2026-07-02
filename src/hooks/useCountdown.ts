import { useEffect, useState } from 'react'

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
}

function compute(target: number): Countdown {
  const diff = Math.max(0, target - Date.now())
  const seconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    isComplete: diff <= 0,
  }
}

/** Live countdown to an ISO date string or timestamp. */
export function useCountdown(target: string | number): Countdown {
  const targetMs = typeof target === 'string' ? new Date(target).getTime() : target
  const [state, setState] = useState<Countdown>(() => compute(targetMs))

  useEffect(() => {
    const id = window.setInterval(() => setState(compute(targetMs)), 1000)
    return () => window.clearInterval(id)
  }, [targetMs])

  return state
}
