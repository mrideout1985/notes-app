import React, { SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { userService } from "../services/userService"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { setUser } = useAuth()
	const navigate = useNavigate()
	const submit = async (e: SyntheticEvent) => {
		e.preventDefault()
		userService.login(email, password)
		userService.getLoggedInUser().then(res => {
			setUser(() => setUser(res.email))
			navigate("/notes")
		})
	}

	return (
		<>
			<form
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
				onSubmit={submit}
			>
				<h1>Please sign in</h1>
				<input
					type='email'
					placeholder='Email address'
					required
					onChange={e => setEmail(e.target.value)}
				/>

				<input
					type='password'
					placeholder='Password'
					required
					onChange={e => setPassword(e.target.value)}
				/>

				<button onClick={submit} type='submit'>
					Sign in
				</button>
			</form>
			<button onClick={(e: SyntheticEvent) => userService.logout()}>
				Log Out
			</button>
		</>
	)
}

export { Login }
