import create from "zustand"
import { devtools, persist } from "zustand/middleware"

type State = {
	email?: string | null
}

type Actions = {
	setEmail: (email: string | null) => void
}

export const useUserStore = create<State & Actions>()(
	devtools(
		persist(
			set => ({
				email: null,
				setEmail: email => set({ email }),
			}),
			{
				name: "user-store",
			}
		)
	)
)
