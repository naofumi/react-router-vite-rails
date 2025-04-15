// authStore.ts
import { create } from 'zustand'
import {getMe, type Me} from "~/models/me"

type AuthState = {
  me: null | Me
  meLoaded: boolean
  resetMe: () => void
  initMe: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  me: null,
  meLoaded: false,
  initMe: () => {
    getMe().then(me => set({ me, meLoaded: true }))
  },
  resetMe: () => set({ me: null, meLoaded: false }),
}))
