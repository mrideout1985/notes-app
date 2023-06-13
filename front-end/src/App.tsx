import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Typography, Box } from '@mui/material'
import Layout from './components/layout/Layout'
import Archived from './pages/Archived'
import Login from './pages/Login'
import Notes from './pages/Notes'
import Register from './pages/Register'
import useUserStore from './stores/authstore'
import './index.scss'
import Profile from './pages/Profile'

function PrivateRoute({ children }: any) {
	const user = useUserStore()

	if (user.currentUser?.token === undefined) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center">
				<Typography color="hotpink" variant="h2">
					HALT PEASANT!
				</Typography>
				<Navigate to="/login" />
			</Box>
		)
	}
	return children
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Notes />
							</PrivateRoute>
						}
					/>
					<Route
						path="/archived"
						element={
							<PrivateRoute>
								<Archived />
							</PrivateRoute>
						}
					/>
					<Route
						path="/profile"
						element={
							<PrivateRoute>
								<Profile />
							</PrivateRoute>
						}
					/>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
