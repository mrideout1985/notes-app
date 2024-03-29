import { Box, Typography } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Archived from './pages/archived/Archived'
import Login from './pages/login/Login'
import Notes from './pages/notes/Notes'
import Register from './pages/register/Register'
import useUserStore from './stores/authstore'

function PrivateRoute({ children }: any) {
	const user = useUserStore()

	if (user.currentUser?.token === undefined) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				width="100%"
			>
				<Typography variant="h4">
					You are not logged in. Redirecting
				</Typography>
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
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
