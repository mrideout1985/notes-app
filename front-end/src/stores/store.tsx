import create from "zustand"
import { persist } from "zustand/middleware"

type State = {
	currentUser: string | null
}

type Actions = {
	setUser: (email: string | null) => void
}

const useUserStore = create<State & Actions>()(
	persist(set => ({
		currentUser: null,
		setUser: email => {
			set({ currentUser: email })
		},
	}))
)

export default useUserStore
