import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Archived from './pages/Archived'
import Login from './pages/Login'
import Notes from './pages/Notes'
import Register from './pages/Register'
import Unpublished from './pages/Unpublished'
import useUserStore from './stores/authstore'

function PrivateRoute({ children }: any) {
	const user = useUserStore()

	if (user.currentUser?.token === null) {
		return <Navigate to="/login" />
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
						path="/unpublished"
						element={
							<PrivateRoute>
								<Unpublished />
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
