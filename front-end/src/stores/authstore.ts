import create from "zustand"
import { devtools, persist } from "zustand/middleware"

type State = {
	currentUser: string | null
}

type Actions = {
	setUser: (email: string | null) => void
}

export const useUserStore = create<State & Actions>()(
	devtools(
		persist(
			(set, get) => ({
				currentUser: null,
				setUser: email => {
					set({ currentUser: email })
				},
			}),
			{
				name: "user-store",
			}
		)
	)
)
