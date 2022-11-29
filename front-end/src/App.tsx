import { FormProvider, useForm } from "react-hook-form"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Login from "./pages/Login"
import Notes from "./pages/Notes"
import Register from "./pages/Register"
import AuthProvider from "./stores/AuthProvider"

function App() {
	const formMethods = useForm()

	return (
		<AuthProvider>
			<FormProvider {...formMethods}>
				<BrowserRouter>
					<Routes>
						<Route element={<Layout />}>
							<Route path='/' element={<Notes />} />
							<Route path='/register' element={<Register />} />
							<Route path='/login' element={<Login />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</FormProvider>
		</AuthProvider>
	)
}

export default App
