import create from "zustand"
import { devtools, persist } from "zustand/middleware"

type State = {
	currentUser: string | null
}

type Actions = {
	setToken: (token: string | null) => void
}

export const useUserStore = create<State & Actions>()(
	devtools(
		persist(
			set => ({
				currentUser: null,
				setToken: token => {
					set({ currentUser: token })
				},
			}),
			{
				name: "user-store",
			}
		)
	)
)
