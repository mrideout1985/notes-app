import { FormProvider, useForm } from "react-hook-form"
import { Route, Routes } from "react-router-dom"
import useUserStore from "./stores/store"

function App() {
	const methods = useForm()
	const { currentUser } = useUserStore(store => store)

	return (
		<>
			<FormProvider {...methods}>
				<Routes>
					<Route path='/notes' />
					<Route path='/profile' />
				</Routes>
			</FormProvider>
		</>
	)
}

export default App
