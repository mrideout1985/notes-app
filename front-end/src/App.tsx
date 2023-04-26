import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import Notes from './pages/Notes'
import Register from './pages/Register'
import TrashBin from './pages/Trash'
import Unpublished from './pages/Unpublished'

function PrivateRoute({ children }: any) {
	if (localStorage.key(1) !== 'token') {
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
						path="/trashbin"
						element={
							<PrivateRoute>
								<TrashBin />
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
