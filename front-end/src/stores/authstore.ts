import create from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
	email: string
	token: string
	id: number
}

export type State = {
	currentUser: User | null
	setCurrentUser: (email: string, token: string, id: number) => void
}

const useUserStore = create<State>()(
	persist(
		(set) => ({
			currentUser: null,
			setCurrentUser: (email: string, token: string, id: number) =>
				set({
					currentUser: {
						email,
						token,
						id,
					},
				}),
		}),
		{ name: 'storage' },
	),
)

export default useUserStore
