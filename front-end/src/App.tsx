import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/layout"
import { Notes } from "./pages/notes"
import { Profile } from "./pages/profile"
import { RequireAuth } from "./components/requireAuth/requireAuth"
import { FormProvider, useForm } from "react-hook-form"
import { Unauthorized } from "./pages/unauthorized"
import useUserStore from "./stores/store"

function App() {
	const methods = useForm()
	const { currentUser } = useUserStore(store => store)

	return (
		<>
			<FormProvider {...methods}>
				<Layout>
					<Routes>
						<Route
							path='/notes'
							element={
								<RequireAuth user={currentUser}>
									<Notes />
								</RequireAuth>
							}
						/>
						<Route
							path='/profile'
							element={
								<RequireAuth user={currentUser}>
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
