import { createContext, useEffect, useMemo, useState } from "react"

const AuthContext = createContext<any>(null)

interface AuthProviderInterface {
	children: React.ReactNode
}
const setLocalStorage = (key: any, value: any) => {
	try {
		window.localStorage.setItem(key, JSON.stringify(value))
	} catch (e) {
		console.log(e)
	}
}
const getLocalStorage = (key: any, initialValue: any) => {
	try {
		const value = window.localStorage.getItem(key)
		return value ? JSON.parse(value) : initialValue
	} catch (e) {
		return initialValue
	}
}

export const AuthProvider = ({ children }: AuthProviderInterface) => {
	const [user, setUser] = useState(() => getLocalStorage("user", null))
	useEffect(() => {
		setLocalStorage("user", user)

		const cleanup = () => {
			if (user === "") {
				setUser(null)
			}
		}
		cleanup()
	}, [user])

	const providerValue = useMemo(() => ({ user, setUser }), [user])

	return (
		<AuthContext.Provider value={providerValue}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext }
