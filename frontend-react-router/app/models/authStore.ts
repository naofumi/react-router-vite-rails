/*
* authStore.ts
*
* We use zustand to store global state.
* In the current app, we cache the result of calling `getMe()` for authentication.
*
* With ReactRouter, you will often want to keep business/application logic inside the loaders and actions,
* which are outside the React context and cannot access any `useContext` state.
*
* Instead, we use Zustand which is a lightweight global state management library that works outside of React.
*
* */
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
