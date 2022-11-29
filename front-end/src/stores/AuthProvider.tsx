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
	register: (email: string, password: string) => Promise<any>
	login: (email: string, password: string) => Promise<Response>
	logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps | null>(null)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<string | null>(null)

	const register = async (email: string, password: string): Promise<any> => {
		return await fetch(`http://localhost:3000/users/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ email, password }),
		})
	}

	const login = async (email: string, password: string): Promise<any> => {
		return await fetch(`http://localhost:3000/users/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ email, password }),
		})
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
			login,
		}),
		[user]
	)

	return (
		<AuthContext.Provider value={providerValue}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
