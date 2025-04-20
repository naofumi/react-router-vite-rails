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
import {getMe} from "~/models/me"

type dataType = Awaited<ReturnType<typeof getMe>>

type AuthState = {
  data: dataType
  isCached: boolean
  reset: () => void
  fetch: () => Promise<dataType>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  data: null,
  isCached: false,
  fetch: async (): Promise<dataType> => {
    if (!get().isCached) {
      const newData = await getMe()
      set({ "data": newData, isCached: true })
    }
    return get().data
  },
  reset: () => set({ data: null, isCached: false }),
}))
