import create from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
	email: string
	token: string
}

export type State = {
	currentUser: User | null
	setCurrentUser: (email: string, token: string) => void
}

const useUserStore = create<State>()(
	persist(
		(set, get) => ({
			currentUser: null,
			setCurrentUser: (email: string, token: string) =>
				set({
					currentUser: {
						email,
						token,
					},
				}),
		}),
		{ name: 'storage' },
	),
)

export default useUserStore
