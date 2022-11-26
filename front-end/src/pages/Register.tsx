import { useContext } from "react"
import { useForm } from "react-hook-form"
import AuthForm from "../components/auth/AuthForm"
import { AuthContext } from "../stores/AuthProvider"

export type AuthValues = {
	email: string
	password: string
}

const Register = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
		reset,
	} = useForm<AuthValues>()

	const auth = useContext(AuthContext)

	const onRegisterSubmit = handleSubmit(data => {
		auth?.register(data.email, data.password).then(res => {
			setError("email", {
				type: "validate",
				message: res.error?.message,
			})
		})
	})

	return (
		<div>
			<AuthForm
				errors={errors}
				onSubmit={onRegisterSubmit}
				legend='Register'
				register={register}
				reset={reset}
			/>
		</div>
	)
}

export default Register
