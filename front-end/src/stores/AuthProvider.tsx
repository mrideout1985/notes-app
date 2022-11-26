import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useMemo,
	useState,
} from "react"

interface AuthContextProps {
	user: string | null
	setUser: Dispatch<SetStateAction<string | null>>
	register: (
		email: string,
		password: string
	) => Promise<{ loading: boolean; error: Error | undefined }>
	login: (
		email: string,
		password: string
	) => Promise<{ loading: boolean; error: Error | undefined }>
	logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps | null>(null)

interface User {
	user: {
		email: string
		notes: []
		_id: string
	}
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<string | null>(null)
	const [loading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<Error>()

	const register = async (email: string, password: string) => {
		setIsLoading(true)
		await fetch(`http://localhost:3000/users/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ email, password }),
		})
			.then(res => res.json())
			.then(result => {
				if (result.status === 403) {
					throw new Error(result.error)
				} else {
					throw new Error("Something went wrong")
				}
			})
			.catch(error => {
				setError(error)
			})

		return {
			loading,
			error,
		}
	}

	const login = async (email: string, password: string) => {
		setIsLoading(true)
		await fetch(`http://localhost:3000/users/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ email, password }),
		})
			.then(res => {
				if (!res.ok) {
					return console.log("failed", res.body)
				}
				return res.json()
			})
			.then((user: User) => {
				setUser(user.user.email)
			})
			.catch((responseError: Error) => {})
			.finally(() => {
				setIsLoading(false)
			})
		return {
			loading,
			error,
		}
	}

	const logout = async () => {
		await fetch("http://localhost:3000/users/auth/logout", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		})
	}

	const providerValue = useMemo(
		() => ({
			user,
			setUser,
			register,
			logout,
			loading,
			error,
			setIsLoading,
			setError,
			login,
		}),
		[error, loading, user]
	)

	return (
		<AuthContext.Provider value={providerValue}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
