import React, { useMemo, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/layout"
import { Login } from "./pages/login"
import { Notes } from "./pages/notes"
import { Register } from "./pages/register"
import { UserContext } from "./stores/userContext"
import { Profile } from "./pages/profile"

function App() {
	const [user, setUser] = useState(null)

	const value = useMemo(() => ({ user, setUser }), [user, setUser])
	return (
		<UserContext.Provider value={value}>
			<Layout>
				{console.log(user)}
				<Routes>
					{user && user ? (
						<>
							<Route path='/' element={<Profile />} />
							<Route path='/notes' element={<Notes />} />
						</>
					) : (
						<>
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
						</>
					)}
				</Routes>
			</Layout>
		</UserContext.Provider>
	)
}

export default App
