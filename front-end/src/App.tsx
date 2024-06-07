import { Box, Typography } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Archived from './pages/Archived/Archived'
import Login from './pages/Login/Login'
import Notes from './pages/Notes/Notes'
import Register from './pages/Register/Register'
import useUserStore from './stores/authstore'
import { PropsWithChildren } from 'react'

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const user = useUserStore()
	console.log(user)

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
