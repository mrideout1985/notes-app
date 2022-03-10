import React, { SyntheticEvent, useState } from "react"
import { userService } from "../services/userService"
import { useNavigate } from "react-router-dom"

const Register = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	let navigate = useNavigate()

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault()
		await userService
			.signUp(email, password)
			.then(res => {
				if (res.status === 201) {
					navigate("/login")
				}
			})
			.catch(err => {
				if (err) {
					navigate("/register")
					alert("Already registered")
				}
			})
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
