import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
	email: string
	token: string
	id: string
}

export type State = {
	currentUser: User | null
	setCurrentUser: ({ email, token, id }: User) => void
	resetUser: () => void
	replaceState: (newState: State) => void
	isAuthorized: boolean
}

const useUserStore = create<State>()(
	persist(
		(set, get) => ({
			currentUser: null,
			setCurrentUser: ({ email, token, id }) =>
				set({
					currentUser: {
						email,
						token,
						id,
					},
				}),
			resetUser: () => set({ currentUser: null }),
			replaceState: (newState: State) => set({ ...get(), ...newState }),
			isAuthorized: false,
		}),
		{ name: 'storage' },
	),
)

export default useUserStore
