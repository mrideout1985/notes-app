import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useMemo,
	useState,
} from "react"

interface UserContextProps {
	user: string | null
	setUser: Dispatch<SetStateAction<string | null>>
	userAuth: (a: string, b: string, c: string) => Promise<void>
	logout: () => Promise<void>
}

export const UserContext = createContext<UserContextProps>({
	user: "",
	setUser: () => {},
	userAuth: async () => {},
	logout: async () => {},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<string | null>(null)
	const [loading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<Error | undefined>()

	const userAuth = async (
		authEndPoint: string,
		email: string,
		password: string
	) => {
		setIsLoading(true)
		await fetch(`http://localhost:3000/users/auth/${authEndPoint}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ email, password }),
		})
			.then((response: Response) => {
				return response.json()
			})
			.then(data => {
				setUser(data.user.email)
				setIsLoading(false)
				setError(undefined)
			})
			.catch((error: Error) => {
				setError(error)
			})
	}

	const logout = async () => {
		setIsLoading(true)
		await fetch("http://localhost:3000/users/auth/logout", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		})
			.then(() => {
				setUser(null)
				setIsLoading(false)
				setError(undefined)
			})
			.catch((error: Error) => {
				setError(error)
			})
	}

	const providerValue = useMemo(
		() => ({
			user,
			setUser,
			userAuth,
			loading,
			error,
			setIsLoading,
			setError,
			logout,
		}),
		[error, loading, user]
	)

	return (
		<UserContext.Provider value={providerValue}>
			{children}
		</UserContext.Provider>
	)
}

export default AuthProvider
