import React from "react"
import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/layout"
import { Dashboard } from "./pages/dashboard"
import { Notes } from "./pages/notes"
import Profile from "./pages/profile"
import Settings from "./pages/settings"
import { UserContext } from "./stores/userContext"

function App() {
	return (
		<UserContext.Provider value={"n/a"}>
			<Layout>
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/notes' element={<Notes />} />
					<Route path='/settings' element={<Settings />} />
					<Route path='/profile' element={<Profile />} />
				</Routes>
			</Layout>
		</UserContext.Provider>
	)
}

export default App
