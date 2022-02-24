import React, { SyntheticEvent, useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { userService } from "../services/userService"
import { UserContext } from "../stores/userContext"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [redirect, setRedirect] = useState(false)
	const { setUser } = useContext(UserContext)

	useEffect(() => {}, [redirect, setUser])
	const submit = async (e: SyntheticEvent) => {
		e.preventDefault()
		userService.login(email, password)
		setRedirect(true)
	}

	if (redirect) {
		return <Navigate to='/' />
	}

	return (
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

			<button className='w-100 btn btn-lg btn-primary' type='submit'>
				Sign in
			</button>
		</form>
	)
}

export { Login }
