import { FormProvider, useForm } from "react-hook-form"

function App() {
	const methods = useForm()

	return (
		<>
			<FormProvider {...methods}>
				<div>Hello</div>
			</FormProvider>
		</>
	)
}

export default App
