import create from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
   id: number
   email: string
   token: string
}

export type State = {
   currentUser: User | null
   setCurrentUser: (id: number, email: string, token: string) => void
}

const useUserStore = create<State>()(
   persist(
      (set, get) => ({
         currentUser: null,
         setCurrentUser: (id: number, email: string, token: string) =>
            set({
               currentUser: {
                  id,
                  email,
                  token,
               },
            }),
      }),
      { name: 'storage' },
   ),
)

export default useUserStore
