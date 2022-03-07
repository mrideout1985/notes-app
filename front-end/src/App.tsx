import React, { useMemo, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/layout"
import { Login } from "./pages/login"
import { Notes } from "./pages/notes"
import { Register } from "./pages/register"
import { Profile } from "./pages/profile"
import { RequireAuth } from "./components/requireAuth/requireAuth"
import { useAuth } from "./hooks/useAuth"

function App() {
	const { user, setUser } = useAuth()

	return (
		<Layout>
			<Routes>
				{/* Public Routes */}
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/notes' element={<Notes />} />
				{/* Protected Routes */}
				<Route element={<RequireAuth />}></Route>

				{/* Catch All */}
			</Routes>
		</Layout>
	)
}

export default App
