import { FormProvider, useForm } from "react-hook-form"
import Layout from "./components/layout/Layout"

function App() {
	const methods = useForm()

	return (
		<>
			<FormProvider {...methods}>
				<Layout>
					<div>Wank Me Off Son</div>
				</Layout>
			</FormProvider>
		</>
	)
}

export default App
