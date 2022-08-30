import create from "zustand"
import { persist } from "zustand/middleware"

type State = {
	currentUser: any
}

type Actions = {
	setCurrentUser: any
	logOut: any
}

const useUserStore = create<State & Actions>()(
	persist(
		(set, get) => ({
			currentUser: null,
			setCurrentUser: (currentUser: string) => {
				set({ currentUser })
			},
			logOut: () => {
				set({
					currentUser: null,
				})
			},
		}),
		{ name: "storage" }
	)
)

export default useUserStore
