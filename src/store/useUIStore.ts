import { create } from 'zustand'
import type { TicketTier } from '@/types'

interface UIState {
  // Mobile navigation
  menuOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void

  // Ticket checkout drawer
  cartTier: TicketTier | null
  selectTier: (tier: TicketTier | null) => void

  // Active section (scroll spy)
  activeSection: string
  setActiveSection: (id: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  menuOpen: false,
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),

  cartTier: null,
  selectTier: (tier) => set({ cartTier: tier }),

  activeSection: 'home',
  setActiveSection: (id) => set({ activeSection: id }),
}))
