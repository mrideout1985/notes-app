import { createContext, useEffect, useMemo, useState } from "react"
import { userService } from "../services/userService"

const AuthContext = createContext<any>(null)

interface AuthProviderInterface {
	children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderInterface) => {
	const [user, setUser] = useState(() => getLocalStorage("user", null))

	function getLocalStorage(key: any, initialValue: any) {
		try {
			const value = window.localStorage.getItem(key)
			return value ? JSON.parse(value) : initialValue
		} catch (e) {
			// if error, return initial value
			return initialValue
		}
	}
	function setLocalStorage(key: any, value: any) {
		try {
			window.localStorage.setItem(key, JSON.stringify(value))
		} catch (e) {
			// catch possible errors:
			// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
		}
	}
	useEffect(() => {
		userService.getLoggedInUser().then(res => {
			setUser(res)
			setLocalStorage("user", user)
		})
	}, [])

	const userLogout = () => {
		userService.logout()
		setUser(null)
	}
	const providerValue = useMemo(() => ({ user, setUser, userLogout }), [user])

	return (
		<AuthContext.Provider value={providerValue}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext }
