import create from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
	email: string
	token: string
	id: string
}

export type State = {
	currentUser: User | null
	setCurrentUser: ({ email, token, id }: User) => void
}

const useUserStore = create<State>()(
	persist(
		(set) => ({
			currentUser: null,
			setCurrentUser: ({ email, token, id }) =>
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
