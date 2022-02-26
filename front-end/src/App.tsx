import React, { useMemo, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/layout"
import { Login } from "./pages/login"
import { Notes } from "./pages/notes"
import Profile from "./pages/profile"
import { Register } from "./pages/register"
import { UserContext } from "./stores/userContext"

function App() {
	const [user, setUser] = useState(null)
	const value = useMemo(() => ({ user, setUser }), [user, setUser])
	return (
		<UserContext.Provider value={value}>
			<Layout>
				<Routes>
					<Route path='/' element={<Profile />} />
					<Route path='/notes' element={<Notes />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</Layout>
		</UserContext.Provider>
	)
}

export default App
