import React from "react"
import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/layout"
import { Login } from "./pages/login"
import { Notes } from "./pages/notes"
import { Register } from "./pages/register"
import { Profile } from "./pages/profile"
import { RequireAuth } from "./components/requireAuth/requireAuth"
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from "./hooks/useAuth"

function App() {
	return (
		<>
			<Layout>
				<Routes>
					{/* Public Routes */}
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
					{/* Protected Routes */}
					<Route element={<RequireAuth />}>
						<Route path='profile' element={<Profile />} />
						<Route path='notes' element={<Notes />} />
					</Route>
					{/* Catch All */}
				</Routes>
			</Layout>
		</>
	)
}

export default App
