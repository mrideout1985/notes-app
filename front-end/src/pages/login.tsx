import React, { SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { userService } from "../services/userService"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import styles from "../styles/pagestyles/auth.module.scss"

const Login = (props: any) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [show, setShow] = useState<boolean>(false)
	const { setUser, user } = useAuth()
	const navigate = useNavigate()
	const submit = async (e: SyntheticEvent) => {
		e.preventDefault()
		await userService.login(email, password).then(res => {
			if (res.status === 201) {
				try {
					userService.getLoggedInUser().then(res => {
						if (res.status === 200) {
							try {
								setUser(res)
							} catch {
								throw new Error("Unable to get user")
							}
						}
					})
				} catch {
					throw new Error("Error")
				}
			}
		})
		if (user) {
			try {
				navigate("/notes")
			} catch {
				navigate("/login")
			}
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.btncontainer}>
				<Button variant='primary' onClick={() => setShow(true)}>
					Login
				</Button>
			</div>
			<Modal
				dialogClassName={styles.modal}
				show={show}
				backdrop='static'
				centered={true}
				keyboard={false}
				size='sm'
				onHide={() => setShow(false)}
			>
				<Form onSubmit={submit} className={styles.form}>
					<Form.Group
						className={styles.formGroup}
						controlId='formGroupEmail'
					>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							onChange={e => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group
						className={styles.formGroup}
						controlId='formGroupPassword'
					>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
							onChange={e => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Button variant='secondary' onClick={() => setShow(false)}>
						Close
					</Button>
					<Button variant='primary' type='submit' onClick={submit}>
						Submit
					</Button>
				</Form>
			</Modal>
		</div>
	)
}

export { Login }
