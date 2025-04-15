// authStore.ts
import { create } from 'zustand'
import {getMe, type Me} from "~/models/me"

type AuthState = {
  me: null | Me
  meLoaded: boolean
  resetMe: () => void
  fetchMe: () => Promise<Me | null>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  me: null,
  meLoaded: false,
  fetchMe: async (): Promise<Me | null> => {
    if (!get().meLoaded) {
      const loadedMe = await getMe()
      set({ "me": loadedMe, meLoaded: true })
    }
    return get().me
  },
  resetMe: () => set({ me: null, meLoaded: false }),
}))
