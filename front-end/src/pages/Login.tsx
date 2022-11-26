import { useContext } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../stores/AuthProvider"
import { AuthValues } from "./Register"

const Login = () => {
	const { register, handleSubmit } = useForm<AuthValues>()

	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const onLoginSubmit = handleSubmit(async data => {
		try {
			await auth?.login(data.email, data.password)
		} catch (error) {}
	})

	return (
		<div>
			<form onSubmit={onLoginSubmit}>
				<input
					style={{ color: "white" }}
					type='text'
					{...register("email")}
				/>
				<input
					style={{ color: "white" }}
					type='text'
					{...register("password")}
				/>
				<input type='submit' />
			</form>
		</div>
	)
}

export default Login
