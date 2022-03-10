import React from "react"
import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/layout"
import { Notes } from "./pages/notes"
import { Profile } from "./pages/profile"
import { RequireAuth } from "./components/requireAuth/requireAuth"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
	return (
		<>
			<Layout>
				<Routes>
					{/* Protected Routes */}
					<Route path='profile' element={<Profile />} />
					<Route path='notes' element={<Notes />} />
					<Route element={<RequireAuth />}></Route>
					{/* Catch All */}
				</Routes>
			</Layout>
		</>
	)
}

export default App
