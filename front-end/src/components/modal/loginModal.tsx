import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import styles from "./loginModal.module.scss"
import { useAuth } from "../../hooks/useAuth"
import { userService } from "../../services/userService"
import { useNavigate } from "react-router-dom"

const LoginModal = () => {
	const { user, setUser } = useAuth()
	const [email, setEmail] = useState("")
	const [displayLoginButton, setDisplayLoginButton] = useState(false)
	const [password, setPassword] = useState("")
	const [toggled, setToggled] = useState(false)
	let navigate = useNavigate()

	const handleLogin = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		await userService.login(email, password).then(() => {
			userService.getLoggedInUser().then(res => setUser(res))
		})
		setToggled(false)
		navigate("/notes")
	}

	const handleLogout = () => {
		userService.logout()
		setUser(null)
		window.localStorage.clear()
		navigate("/")
	}

	const handleSignUp = (e: React.SyntheticEvent) => {
		userService.signUp(email, password).then(() => {
			setDisplayLoginButton(true)
		})
	}
	return (
		<>
			<ButtonGroup className={styles["btnGroup"]}>
				{user ? <Button onClick={handleLogout}>Logout</Button> : null}
				{user ? null : (
					<>
						<Button onClick={() => setToggled(true)}>Login</Button>
						<Button onClick={() => setToggled(true)}>
							Sign Up
						</Button>
					</>
				)}
			</ButtonGroup>
			<Modal
				// dialogClassName={styles.modal}
				show={toggled}
				backdrop='static'
				centered={true}
				keyboard={false}
				size='sm'
			>
				<Form className={"123"}>
					<Form.Group className={"123"} controlId='formGroupEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							onChange={e => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className={"123"} controlId='formGroupPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
							onChange={e => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Button
						variant='secondary'
						onClick={() => setToggled(false)}
					>
						Close
					</Button>
					<Button
						variant='primary'
						type='submit'
						onClick={handleLogin}
					>
						Submit
					</Button>
				</Form>
			</Modal>
		</>
	)
}

export { LoginModal }
