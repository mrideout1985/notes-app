import React, { SyntheticEvent, useState } from "react"
import { userService } from "../services/userService"
import { Navigate } from "react-router-dom"

const Register = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [redirect, setRedirect] = useState(false)

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault()
		userService.signUp(email, password)
		setRedirect(true)
	}

	if (redirect) {
		return <Navigate to='/login' />
	}

	return (
		<form onSubmit={submit}>
			<h1 className='h3 mb-3 fw-normal'>Please register</h1>

			<input
				type='email'
				className='form-control'
				placeholder='Email address'
				required
				onChange={e => setEmail(e.target.value)}
			/>

			<input
				type='password'
				className='form-control'
				placeholder='Password'
				required
				onChange={e => setPassword(e.target.value)}
			/>

			<button className='w-100 btn btn-lg btn-primary' type='submit'>
				Submit
			</button>
		</form>
	)
}

export { Register }
