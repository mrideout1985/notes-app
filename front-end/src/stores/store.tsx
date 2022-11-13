import create from "zustand"
import { persist } from "zustand/middleware"

type State = {
	currentUser: any
}

type Actions = {
	logIn: any
	logOut: any
}

const useUserStore = create<State & Actions>()(
	persist(
		(set, get) => ({
			currentUser: null,
			logIn: async (email: string, password: string) => {
				await fetch("http://localhost:3000/users/auth/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify({ email, password }),
				})
					.then(response => {
						if (response.status === 201) {
							return response.json()
						}
						set({
							currentUser: null,
						})
					})
					.then(data => {
						set({ currentUser: data.user.email })
					})
			},
			logOut: async () => {
				await fetch("http://localhost:3000/users/auth/logout", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				})
				set({
					currentUser: null,
				})
			},
		}),
		{ name: "storage" }
	)
)

export default useUserStore
