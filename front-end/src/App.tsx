import { FormProvider, useForm } from "react-hook-form"
import Layout from "./components/layout/Layout"
import AuthProvider from "./stores/AuthProvider"

function App() {
	const methods = useForm()

	return (
		<AuthProvider>
			<FormProvider {...methods}>
				<Layout>
					<div>Screwball scramble</div>
				</Layout>
			</FormProvider>
		</AuthProvider>
	)
}

export default App
