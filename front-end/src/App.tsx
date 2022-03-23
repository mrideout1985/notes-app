import React from "react"
import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/layout"
import { Notes } from "./pages/notes"
import { Profile } from "./pages/profile"
import { RequireAuth } from "./components/requireAuth/requireAuth"
import "bootstrap/dist/css/bootstrap.min.css"
// import { Unauthorized } from "./pages/unauthorized"

function App() {
	return (
		<>
			<Layout>
				<Routes>
					{/* <Route path='unauthorized' element={<Unauthorized />} /> */}
					<Route path='profile' element={<Profile />} />
					<Route path='notes' element={<Notes />} />

					{/* Protected Routes */}
					<Route element={<RequireAuth />}></Route>
					{/* Catch All */}
				</Routes>
			</Layout>
		</>
	)
}

export default App
