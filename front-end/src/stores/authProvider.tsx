import { createContext, useMemo, useState } from "react"

const AuthContext = createContext<any>(null)

interface AuthProviderInterface {
	children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderInterface) => {
	const [user, setUser] = useState(null)
	const value = useMemo(() => ({ user, setUser }), [user])
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext }
