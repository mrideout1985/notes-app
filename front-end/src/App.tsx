import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/layout"
import { Notes } from "./pages/notes"
import { Profile } from "./pages/profile"
import { RequireAuth } from "./components/requireAuth/requireAuth"
import "bootstrap/dist/css/bootstrap.min.css"
import { FormProvider, useForm } from "react-hook-form"
// import { Unauthorized } from "./pages/unauthorized"

function App() {
	const methods = useForm()

	return (
		<>
			<FormProvider {...methods}>
				<Layout>
					<Routes>
						{/* <Route path='unauthorized' element={<Unauthorized />} /> */}

						{/* Protected Routes */}
						<Route path='profile' element={<Profile />} />
						<Route path='notes' element={<Notes />} />
						<Route element={<RequireAuth />}></Route>
						<Route path='/dicks' />
						{/* Catch All */}
					</Routes>
				</Layout>
			</FormProvider>
		</>
	)
}

export default App
