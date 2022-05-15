import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/layout"
import { Notes } from "./pages/notes"
import { Profile } from "./pages/profile"
import { RequireAuth } from "./components/requireAuth/requireAuth"
import "bootstrap/dist/css/bootstrap.min.css"
import { FormProvider, useForm } from "react-hook-form"
import { useAuth } from "./hooks/useAuth"
import { Unauthorized } from "./pages/unauthorized"

function App() {
	const methods = useForm()
	const user = useAuth()

	return (
		<>
			<FormProvider {...methods}>
				<Layout>
					<Routes>
						<Route
							path='/notes'
							element={
								<RequireAuth user={user}>
									<Notes />
								</RequireAuth>
							}
						/>
						<Route
							path='/profile'
							element={
								<RequireAuth user={user}>
									<Profile />
								</RequireAuth>
							}
						/>
						<Route
							path='/unauthorized'
							element={<Unauthorized />}
						/>
					</Routes>
				</Layout>
			</FormProvider>
		</>
	)
}

export default App
