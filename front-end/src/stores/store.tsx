import create from "zustand"
import { persist } from "zustand/middleware"
import { userService } from "../services/userService"

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
				await fetch("http://localhost:3000/users/login", {
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
				await fetch("http://localhost:3000/users/logout", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				})
				set({
					currentUser: null,
				})
			},
			signUp: async (email: string, password: string) => {
				await fetch("http://localhost:3000/users/register", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				})
			},
		}),
		{ name: "storage" }
	)
)

export default useUserStore
